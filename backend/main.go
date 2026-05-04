package main

import (
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
		allowedOriginsStr := os.Getenv("ALLOWED_ORIGIN")
		origin := r.Header.Get("Origin")

		// Log incoming request
		if origin != "" {
			log.Printf("🔍 CORS Check - Method: %s, Path: %s, Origin: %q", r.Method, r.URL.Path, origin)
		}

		// Set CORS headers for allowed origins
		if allowedOriginsStr != "" && origin != "" {
			allowedOrigins := strings.Split(allowedOriginsStr, ",")
			for _, o := range allowedOrigins {
				o = strings.TrimSpace(o)
				if o == origin || o == "*" {
					w.Header().Set("Access-Control-Allow-Origin", origin)
					log.Printf("✅ CORS allowed for origin: %s", origin)
					break
				}
			}
		}

		// Fallback for development
		if w.Header().Get("Access-Control-Allow-Origin") == "" && allowedOriginsStr == "" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
		}

		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight
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
	w.Write([]byte(`{"status":"healthy"}`))
}

func main() {
	_ = godotenv.Load()

	// Log environment status
	log.Printf("🚀 Starting server...")
	log.Printf("📝 ALLOWED_ORIGIN: %s", os.Getenv("ALLOWED_ORIGIN"))
	log.Printf("📧 SendGrid configured: %v", os.Getenv("SENDGRID_API_KEY") != "")
	log.Printf("🍃 MongoDB configured: %v", os.Getenv("MONGO_URI") != "")

	// Connect to MongoDB
	if err := storage.ConnectMongo(); err != nil {
		log.Fatal("❌ MongoDB connection failed:", err)
	}
	defer storage.DisconnectMongo()
	log.Printf("✅ MongoDB connected successfully")

	// Setup router
	r := mux.NewRouter()
	r.HandleFunc("/health", healthHandler).Methods("GET")
	r.HandleFunc("/api/visits", handlers.VisitHandler).Methods("GET")
	r.HandleFunc("/api/contact", handlers.ContactHandler).Methods("POST")

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, enableCORS(r)))
}