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

	// Insert only if IP doesn't exist
	_, err := collection.UpdateOne(
		ctx,
		bson.M{"ip": ip},
		bson.M{"$setOnInsert": bson.M{"ip": ip, "visited": time.Now()}},
		options.Update().SetUpsert(true),
	)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Count unique visitors
	total, err := collection.CountDocuments(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Failed to count", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(fmt.Sprintf(`{"visits": %d}`, total)))
}

func getIP(r *http.Request) string {
	// Check proxy headers first
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		return strings.TrimSpace(strings.Split(xff, ",")[0])
	}
	if xrip := r.Header.Get("X-Real-IP"); xrip != "" {
		return xrip
	}
	// Fallback to RemoteAddr
	addr := r.RemoteAddr
	if colon := strings.LastIndex(addr, ":"); colon != -1 {
		return addr[:colon]
	}
	return addr
}