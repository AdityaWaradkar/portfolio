package storage

import (
	"context"
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client *mongo.Client
	once   sync.Once
)

func ConnectMongo() error {
	var err error
	once.Do(func() {
		mongoURI := os.Getenv("MONGO_URI")
		if mongoURI == "" {
			err = fmt.Errorf("MONGO_URI not set in environment")
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		// Connect to MongoDB
		Client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
		if err != nil {
			return
		}

		// Ping the database
		err = Client.Ping(ctx, nil)
		if err != nil {
			return
		}

		// Create unique index on visitors collection
		err = createIndexes(ctx)
		if err != nil {
			log.Println("⚠️ Warning: Failed to create indexes:", err)
			// Don't return error, continue anyway
		}

		log.Println("✅ Connected to MongoDB!")
	})
	return err
}

func createIndexes(ctx context.Context) error {
    visitorsCollection := Client.Database("portfolio").Collection("visitors")

    // Try to create unique index, but don't fail if duplicates exist
    indexModel := mongo.IndexModel{
        Keys:    bson.M{"ip": 1},
        Options: options.Index().SetUnique(true).SetName("unique_ip").SetSparse(true),
    }

    _, err := visitorsCollection.Indexes().CreateOne(ctx, indexModel)
    if err != nil {
        // Check if it's a duplicate key error
        if strings.Contains(err.Error(), "E11000") {
            log.Println("⚠️ Warning: Duplicate IPs found in visitors collection. Please clean them manually.")
            log.Println("   The server will continue without the unique index.")
            return nil // Don't return error, just continue
        }
        return fmt.Errorf("failed to create unique index on visitors: %v", err)
    }

    log.Println("✅ Database indexes created successfully")
    return nil
}

func DisconnectMongo() error {
	if Client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		return Client.Disconnect(ctx)
	}
	return nil
}