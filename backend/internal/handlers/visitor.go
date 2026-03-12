package handlers

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"backend/storage"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func VisitHandler(w http.ResponseWriter, r *http.Request) {
	ip := getIP(r)
	
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := storage.Client.Database("portfolio").Collection("visitors")

	// Upsert - insert if not exists, don't update if exists
	_, err := collection.UpdateOne(
		ctx,
		bson.M{"ip": ip},
		bson.M{
			"$setOnInsert": bson.M{
				"ip":      ip,
				"visited": time.Now(),
			},
		},
		options.Update().SetUpsert(true),
	)

	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Count total unique visitors
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
	// Check X-Forwarded-For header first (for proxied requests)
	xff := r.Header.Get("X-Forwarded-For")
	if xff != "" {
		ips := strings.Split(xff, ",")
		return strings.TrimSpace(ips[0])
	}

	// Check X-Real-IP header
	xrip := r.Header.Get("X-Real-IP")
	if xrip != "" {
		return xrip
	}

	// Fall back to RemoteAddr
	addr := r.RemoteAddr
	if colon := strings.LastIndex(addr, ":"); colon != -1 {
		return addr[:colon]
	}
	return addr
}