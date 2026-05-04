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
	log.Printf("📨 Contact form request received from %s", r.RemoteAddr)
	w.Header().Set("Content-Type", "application/json")

	var form ContactForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Printf("❌ Invalid JSON: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"Invalid JSON"}`))
		return
	}

	log.Printf("📝 Form data - Name: %s, Email: %s, Message length: %d", form.Name, form.Email, len(form.Message))

	// Validation
	if form.Name == "" || form.Email == "" || form.Message == "" {
		log.Printf("❌ Missing required fields - Name: %q, Email: %q, Message: %q", form.Name, form.Email, form.Message)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"All fields required"}`))
		return
	}
	if !strings.Contains(form.Email, "@") || !strings.Contains(form.Email, ".") {
		log.Printf("❌ Invalid email format: %s", form.Email)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"Invalid email"}`))
		return
	}

	// Check email credentials before sending
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PASS")
	to := os.Getenv("EMAIL_RECIPIENT")

	log.Printf("🔍 Email config check - GMAIL_USER: %q, EMAIL_RECIPIENT: %q, GMAIL_PASS set: %v", from, to, password != "")

	if from == "" || password == "" || to == "" {
		log.Printf("❌ Email credentials missing - FROM: %q, TO: %q, PASS set: %v", from, to, password != "")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"status":"error","message":"Email service not configured"}`))
		return
	}

	// Send email
	subject := fmt.Sprintf("Portfolio Contact from %s", form.Name)
	body := fmt.Sprintf("Name: %s\nEmail: %s\n\nMessage:\n%s", form.Name, form.Email, form.Message)

	log.Printf("📧 Attempting to send email from %s to %s", from, to)
	if err := sendEmail(subject, body); err != nil {
		log.Printf("❌ Email failed: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"status":"error","message":"Failed to send email"}`))
		return
	}
	log.Printf("✅ Email sent successfully")

	// Save to DB async (non-blocking)
	go saveContact(form)
	log.Printf("💾 Contact saved to DB in background")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"success","message":"Message sent!"}`))
}

func saveContact(form ContactForm) {
	log.Printf("💾 Starting to save contact to MongoDB")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := storage.Client.Database("portfolio").Collection("contacts")
	
	doc := bson.M{
		"name":      form.Name,
		"email":     form.Email,
		"message":   form.Message,
		"submitted": time.Now(),
	}
	
	_, err := collection.InsertOne(ctx, doc)
	if err != nil {
		log.Printf("⚠️ Failed to save contact to DB: %v", err)
	} else {
		log.Printf("✅ Contact saved to MongoDB successfully")
	}
}

func sendEmail(subject, body string) error {
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PASS")
	to := os.Getenv("EMAIL_RECIPIENT")

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	
	log.Printf("📧 SMTP Config - Host: %s, Port: %s, From: %s, To: %s", smtpHost, smtpPort, from, to)
	
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Create proper email with headers
	msg := []byte(fmt.Sprintf("From: %s\r\n"+
		"To: %s\r\n"+
		"Subject: %s\r\n"+
		"MIME-Version: 1.0\r\n"+
		"Content-Type: text/plain; charset=UTF-8\r\n"+
		"\r\n"+
		"%s\r\n", from, to, subject, body))

	log.Printf("📧 Email content length: %d bytes", len(msg))

	// Timeout for SMTP
	errChan := make(chan error, 1)
	go func() {
		log.Printf("📧 Connecting to SMTP server...")
		err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
		if err != nil {
			log.Printf("📧 SMTP error detail: %v", err)
		}
		errChan <- err
	}()

	select {
	case err := <-errChan:
		if err == nil {
			log.Printf("✅ Email sent successfully to %s", to)
		} else {
			log.Printf("❌ SMTP send failed: %v", err)
		}
		return err
	case <-time.After(10 * time.Second):
		log.Printf("⏰ SMTP timeout after 10 seconds")
		return fmt.Errorf("SMTP timeout after 10 seconds")
	}
}