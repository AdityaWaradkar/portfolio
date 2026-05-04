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
		log.Printf("🔍 CORS Check - Method: %s, Path: %s, Origin: %q", r.Method, r.URL.Path, origin)
		log.Printf("🔍 Allowed origins from ENV: %q", allowedOriginsStr)

		// Always set CORS headers for allowed origins
		if allowedOriginsStr != "" {
			allowedOrigins := strings.Split(allowedOriginsStr, ",")
			originAllowed := false

			for _, o := range allowedOrigins {
				o = strings.TrimSpace(o)
				log.Printf("🔍 Comparing with: %q", o)
				if o == origin || o == "*" {
					w.Header().Set("Access-Control-Allow-Origin", origin)
					originAllowed = true
					log.Printf("✅ CORS allowed for origin: %s", origin)
					break
				}
			}

			if !originAllowed && origin != "" {
				log.Printf("❌ CORS rejected for origin: %s (not in allowed list)", origin)
			}
		}

		// If no match but allowed origins is empty, allow all
		if w.Header().Get("Access-Control-Allow-Origin") == "" && allowedOriginsStr == "" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			log.Printf("⚠️ CORS: Allowing all origins (ALLOWED_ORIGIN not set)")
		}

		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Log final CORS headers
		log.Printf("📋 Response CORS headers: Access-Control-Allow-Origin=%q", w.Header().Get("Access-Control-Allow-Origin"))

		// Handle preflight
		if r.Method == "OPTIONS" {
			log.Printf("🔄 Preflight request handled successfully")
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
	log.Printf("💚 Health check called from %s", r.RemoteAddr)
}

func main() {
	_ = godotenv.Load()

	// Log all environment variables (mask sensitive ones)
	log.Printf("🔧 Environment variables loaded:")
	log.Printf("   PORT: %q", os.Getenv("PORT"))
	log.Printf("   ALLOWED_ORIGIN: %q", os.Getenv("ALLOWED_ORIGIN"))
	log.Printf("   GMAIL_USER: %q", os.Getenv("GMAIL_USER"))
	log.Printf("   MONGO_URI: %q (masked)", maskString(os.Getenv("MONGO_URI"), 20))

	if err := storage.ConnectMongo(); err != nil {
		log.Fatal("❌ MongoDB connection failed:", err)
	}
	defer storage.DisconnectMongo()
	log.Printf("✅ MongoDB connected successfully")

	r := mux.NewRouter()
	r.HandleFunc("/health", healthHandler).Methods("GET")
	r.HandleFunc("/api/visits", handlers.VisitHandler).Methods("GET")
	r.HandleFunc("/api/contact", handlers.ContactHandler).Methods("POST")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	log.Printf("📝 CORS allowed origins: %s", os.Getenv("ALLOWED_ORIGIN"))
	log.Printf("🌐 Server will accept requests from configured origins only")
	log.Fatal(http.ListenAndServe(":"+port, enableCORS(r)))
}

// Helper function to mask sensitive strings for logging
func maskString(s string, keep int) string {
	if len(s) <= keep {
		return "***"
	}
	return s[:keep] + "..."
}