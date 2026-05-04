package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"backend/storage"
	"go.mongodb.org/mongo-driver/bson"
)

type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("📨 Contact request received")
	w.Header().Set("Content-Type", "application/json")

	var form ContactForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Printf("❌ JSON error: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "message": "Invalid JSON"})
		return
	}

	// Validation
	if form.Name == "" || form.Email == "" || form.Message == "" {
		log.Printf("❌ Missing fields")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "message": "All fields required"})
		return
	}

	if !strings.Contains(form.Email, "@") || !strings.Contains(form.Email, ".") {
		log.Printf("❌ Invalid email: %s", form.Email)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "message": "Invalid email format"})
		return
	}

	// Send email via SendGrid
	if err := sendEmailSendGrid(form); err != nil {
		log.Printf("❌ SendGrid error: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "message": "Failed to send message"})
		return
	}

	// Save to DB in background
	go saveContact(form)

	log.Printf("✅ Contact processed successfully")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success", "message": "Message sent successfully!"})
}

func sendEmailSendGrid(form ContactForm) error {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	fromEmail := os.Getenv("FROM_EMAIL")
	toEmail := os.Getenv("TO_EMAIL")

	log.Printf("📧 SendGrid config - From: %s, To: %s, API Key set: %v", fromEmail, toEmail, apiKey != "")

	if apiKey == "" || fromEmail == "" || toEmail == "" {
		return fmt.Errorf("SendGrid credentials missing")
	}

	// Prepare email payload
	emailData := map[string]interface{}{
		"personalizations": []map[string]interface{}{
			{
				"to": []map[string]string{{"email": toEmail}},
			},
		},
		"from": map[string]string{"email": fromEmail},
		"subject": fmt.Sprintf("Portfolio Contact from %s", form.Name),
		"content": []map[string]string{
			{
				"type":  "text/plain",
				"value": fmt.Sprintf("Name: %s\nEmail: %s\n\nMessage:\n%s", form.Name, form.Email, form.Message),
			},
		},
	}

	jsonData, err := json.Marshal(emailData)
	if err != nil {
		return fmt.Errorf("failed to marshal email data: %v", err)
	}

	req, err := http.NewRequest("POST", "https://api.sendgrid.com/v3/mail/send", bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("❌ SendGrid request failed: %v", err)
		return fmt.Errorf("network error: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		log.Printf("✅ SendGrid email sent successfully")
		return nil
	}

	// Read error response
	var errResponse map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&errResponse)
	log.Printf("❌ SendGrid error response: %v", errResponse)
	return fmt.Errorf("SendGrid returned status %d", resp.StatusCode)
}

func saveContact(form ContactForm) {
	if storage.Client == nil {
		log.Printf("⚠️ MongoDB client not initialized")
		return
	}

	log.Printf("💾 Saving contact to MongoDB")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := storage.Client.Database("portfolio").Collection("contacts")
	_, err := collection.InsertOne(ctx, bson.M{
		"name":      form.Name,
		"email":     form.Email,
		"message":   form.Message,
		"submitted": time.Now(),
	})
	if err != nil {
		log.Printf("⚠️ Failed to save to DB: %v", err)
	} else {
		log.Printf("✅ Contact saved to MongoDB")
	}
}