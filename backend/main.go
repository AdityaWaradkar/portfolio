package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/internal/handlers"
	"backend/storage"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow all origins (*). You can restrict this later.
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Allowed headers and methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		
		// For preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ No .env file found or failed to load")
	}

	// Connect to MongoDB
	err = storage.ConnectMongo()
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	defer func() {
		if err := storage.DisconnectMongo(); err != nil {
			log.Println("Error disconnecting MongoDB:", err)
		}
	}()

	r := mux.NewRouter()

	r.HandleFunc("/api/visits", handlers.VisitHandler).Methods("GET")
	r.HandleFunc("/api/contact", handlers.ContactHandler).Methods("POST")
	handler := enableCORS(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("🚀 Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
