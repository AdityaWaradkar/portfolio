package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
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
	// Set content type
	w.Header().Set("Content-Type", "application/json")

	var form ContactForm

	// Decode request body
	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		log.Println("❌ Invalid JSON:", err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"Invalid JSON data"}`))
		return
	}

	// Validate required fields
	if form.Name == "" || form.Email == "" || form.Message == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"All fields are required"}`))
		return
	}

	// Validate email format
	if !strings.Contains(form.Email, "@") || !strings.Contains(form.Email, ".") {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"Invalid email format"}`))
		return
	}

	// Send email first
	subject := fmt.Sprintf("New Contact from %s", form.Name)
	body := fmt.Sprintf("Name: %s\nEmail: %s\n\nMessage:\n%s", form.Name, form.Email, form.Message)

	err = sendEmail(subject, body)
	if err != nil {
		log.Println("❌ Failed to send email:", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"status":"error","message":"Failed to send email. Please try again."}`))
		return
	}

	// Save to MongoDB after email succeeds
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := storage.Client.Database("portfolio").Collection("contacts")
	_, err = collection.InsertOne(ctx, bson.M{
		"name":      form.Name,
		"email":     form.Email,
		"message":   form.Message,
		"submitted": time.Now(),
	})

	if err != nil {
		// Log error but don't fail the response since email was sent
		log.Println("⚠️ Email sent but failed to save to DB:", err)
	}

	// Success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"success","message":"Message sent successfully!"}`))
}

func sendEmail(subject, body string) error {
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PASS")
	to := os.Getenv("EMAIL_RECIPIENT")

	if from == "" || password == "" || to == "" {
		return fmt.Errorf("email credentials not properly configured")
	}

	// Validate email format
	if !strings.Contains(from, "@") || !strings.Contains(to, "@") {
		return fmt.Errorf("invalid email format in configuration")
	}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Create proper email headers
	msg := []byte(fmt.Sprintf("From: %s\r\n"+
		"To: %s\r\n"+
		"Subject: %s\r\n"+
		"MIME-Version: 1.0\r\n"+
		"Content-Type: text/plain; charset=UTF-8\r\n"+
		"\r\n"+
		"%s\r\n", from, to, subject, body))

	auth := smtp.PlainAuth("", from, password, smtpHost)

	log.Printf("📨 Sending email from %s to %s", from, to)

	// Use a timeout channel for SMTP
	errChan := make(chan error, 1)
	go func() {
		errChan <- smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
	}()

	// Wait for email to send with timeout
	select {
	case err := <-errChan:
		if err != nil {
			log.Println("❌ SMTP error:", err)
			return err
		}
		log.Println("✅ Email sent successfully!")
		return nil
	case <-time.After(10 * time.Second):
		return fmt.Errorf("SMTP timeout after 10 seconds")
	}
}