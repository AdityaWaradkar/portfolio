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
	w.Header().Set("Content-Type", "application/json")

	var form ContactForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"Invalid JSON"}`))
		return
	}

	// Validation
	if form.Name == "" || form.Email == "" || form.Message == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"All fields required"}`))
		return
	}
	if !strings.Contains(form.Email, "@") || !strings.Contains(form.Email, ".") {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error","message":"Invalid email"}`))
		return
	}

	// Send email
	subject := fmt.Sprintf("Portfolio Contact from %s", form.Name)
	body := fmt.Sprintf("Name: %s\nEmail: %s\n\nMessage:\n%s", form.Name, form.Email, form.Message)

	if err := sendEmail(subject, body); err != nil {
		log.Println("❌ Email failed:", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"status":"error","message":"Failed to send email"}`))
		return
	}

	// Save to DB async (non-blocking)
	go saveContact(form)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"success","message":"Message sent!"}`))
}

func saveContact(form ContactForm) {
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
		log.Println("⚠️ Failed to save contact to DB:", err)
	}
}

func sendEmail(subject, body string) error {
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PASS")
	to := os.Getenv("EMAIL_RECIPIENT")

	if from == "" || password == "" || to == "" {
		return fmt.Errorf("email credentials missing")
	}

	smtpHost := "smtp.gmail.com"
	auth := smtp.PlainAuth("", from, password, smtpHost)

	msg := []byte(fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n%s\r\n", from, to, subject, body))

	// Timeout for SMTP
	errChan := make(chan error, 1)
	go func() {
		errChan <- smtp.SendMail(smtpHost+":587", auth, from, []string{to}, msg)
	}()

	select {
	case err := <-errChan:
		if err == nil {
			log.Println("✅ Email sent")
		}
		return err
	case <-time.After(10 * time.Second):
		return fmt.Errorf("SMTP timeout")
	}
}