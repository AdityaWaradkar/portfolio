package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"backend/storage"           // your storage package with Mongo client
	"go.mongodb.org/mongo-driver/bson"
)

type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	var form ContactForm

	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	if form.Name == "" || form.Email == "" || form.Message == "" {
		http.Error(w, "All fields (name, email, message) are required", http.StatusBadRequest)
		return
	}

	// --- New code: Save contact form data to MongoDB ---
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
		log.Println("❌ Failed to save contact form to DB:", err)
		http.Error(w, "Failed to save contact form", http.StatusInternalServerError)
		return
	}
	// --- End MongoDB save ---

	subject := fmt.Sprintf("New Contact from %s", form.Name)
	body := fmt.Sprintf("Name: %s\nEmail: %s\n\nMessage:\n%s", form.Name, form.Email, form.Message)

	err = sendEmail(subject, body)
	if err != nil {
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"success","message":"Message sent successfully!"}`))
}

func sendEmail(subject, body string) error {
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PASS")
	to := "adityawaradkar1801@gmail.com"

	if from == "" || password == "" {
		log.Println("❌ Missing GMAIL_USER or GMAIL_PASS environment variables")
		return fmt.Errorf("SMTP credentials not set")
	}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	msg := []byte("To: " + to + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body + "\r\n")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	log.Println("📨 Attempting to send email via Gmail SMTP...")
	log.Printf("From: %s | To: %s | SMTP Host: %s:%s\n", from, to, smtpHost, smtpPort)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
	if err != nil {
		log.Println("❌ Error sending email:", err)
		return err
	}

	log.Println("✅ Email sent successfully!")
	return nil
}
