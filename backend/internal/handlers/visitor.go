package handlers

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"backend/storage"
	"go.mongodb.org/mongo-driver/bson"
)

func VisitHandler(w http.ResponseWriter, r *http.Request) {
	ip := getIP(r)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := storage.Client.Database("portfolio").Collection("visitors")

	filter := bson.M{"ip": ip}

	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if count == 0 {
		_, err := collection.InsertOne(ctx, bson.M{
			"ip":      ip,
			"visited": time.Now(),
		})
		if err != nil {
			http.Error(w, "Failed to add visitor", http.StatusInternalServerError)
			return
		}
	}

	total, err := collection.CountDocuments(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Failed to count visitors", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf(`{"visits": %d}`, total)))
}

func getIP(r *http.Request) string {
	xff := r.Header.Get("X-Forwarded-For")
	if xff != "" {
		ips := strings.Split(xff, ",")
		return strings.TrimSpace(ips[0])
	}
	addr := r.RemoteAddr
	if colon := strings.LastIndex(addr, ":"); colon != -1 {
		return addr[:colon]
	}
	return addr
}
