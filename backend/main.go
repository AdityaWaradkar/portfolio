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
		allowedOrigins := os.Getenv("ALLOWED_ORIGIN")
		origin := r.Header.Get("Origin")

		// Always set CORS headers for allowed origins
		if allowedOrigins != "" {
			for _, o := range strings.Split(allowedOrigins, ",") {
				o = strings.TrimSpace(o)
				if o == origin || o == "*" {
					w.Header().Set("Access-Control-Allow-Origin", origin)
					break
				}
			}
		}

		// If no match but allowed origins is empty, allow all
		if w.Header().Get("Access-Control-Allow-Origin") == "" && allowedOrigins == "" {
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

	if err := storage.ConnectMongo(); err != nil {
		log.Fatal("❌ MongoDB connection failed:", err)
	}
	defer storage.DisconnectMongo()

	r := mux.NewRouter()
	r.HandleFunc("/health", healthHandler).Methods("GET")
	r.HandleFunc("/api/visits", handlers.VisitHandler).Methods("GET")
	r.HandleFunc("/api/contact", handlers.ContactHandler).Methods("POST")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	log.Printf("📝 Allowed origins: %s", os.Getenv("ALLOWED_ORIGIN"))
	log.Fatal(http.ListenAndServe(":"+port, enableCORS(r)))
}