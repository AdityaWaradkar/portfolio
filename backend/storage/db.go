package storage

import (
	"context"
	"fmt"
	"log"
	"os"
	"sync"
	"time"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client     *mongo.Client
	once       sync.Once
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

		Client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
		if err != nil {
			return
		}

		err = Client.Ping(ctx, nil)
		if err != nil {
			return
		}

		log.Println("✅ Connected to MongoDB!")
	})
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
