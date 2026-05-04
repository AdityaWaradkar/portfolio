package storage

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
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
			err = fmt.Errorf("MONGO_URI not set")
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		Client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
		if err != nil {
			return
		}

		if err = Client.Ping(ctx, nil); err != nil {
			return
		}

		_ = createIndexes(ctx) // Non-critical, continue on error
		log.Println("✅ MongoDB connected")
	})
	return err
}

func createIndexes(ctx context.Context) error {
	collection := Client.Database("portfolio").Collection("visitors")
	indexModel := mongo.IndexModel{
		Keys:    bson.M{"ip": 1},
		Options: options.Index().SetUnique(true).SetName("unique_ip"),
	}

	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil && strings.Contains(err.Error(), "E11000") {
		log.Println("⚠️ Duplicate IPs found, index not created")
		return nil
	}
	return err
}

func DisconnectMongo() error {
	if Client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		return Client.Disconnect(ctx)
	}
	return nil
}