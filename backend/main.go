package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"backend/internal/handlers"
	"backend/storage"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get allowed origins from environment
		allowedOrigins := os.Getenv("ALLOWED_ORIGIN")
		origin := r.Header.Get("Origin")

		// Set CORS headers
		if allowedOrigins != "" {
			// Check if origin is allowed
			origins := strings.Split(allowedOrigins, ",")
			allowed := false
			for _, o := range origins {
				if strings.TrimSpace(o) == origin || strings.TrimSpace(o) == "*" {
					allowed = true
					break
				}
			}
			if allowed {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			}
		} else {
			// Default to allowing all in development
			w.Header().Set("Access-Control-Allow-Origin", "*")
		}

		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"healthy","message":"Server is running"}`))
}

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ No .env file found or failed to load")
	}

	// Connect to MongoDB
	err = storage.ConnectMongo()
	if err != nil {
		log.Fatal("❌ Failed to connect to MongoDB:", err)
	}
	defer func() {
		if err := storage.DisconnectMongo(); err != nil {
			log.Println("⚠️ Error disconnecting MongoDB:", err)
		}
	}()

	// Create router
	r := mux.NewRouter()

	// Health check endpoint
	r.HandleFunc("/health", healthHandler).Methods("GET")

	// API routes
	r.HandleFunc("/api/visits", handlers.VisitHandler).Methods("GET")
	r.HandleFunc("/api/contact", handlers.ContactHandler).Methods("POST")

	// Apply CORS middleware
	handler := enableCORS(r)

	// Get port from environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	fmt.Printf("🚀 Server running on port %s\n", port)
	fmt.Printf("📝 Allowed origins: %s\n", os.Getenv("ALLOWED_ORIGIN"))
	log.Fatal(http.ListenAndServe(":"+port, handler))
}