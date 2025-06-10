//  A way to let Docker know about the .envs

package environment

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func Mount(){
	//  IMPORTANT:
	// use this to run locally
	// er := godotenv.Load("../.env")
	// use this to run in Docker
	er := godotenv.Load("/app/.env")

	if er != nil {
		log.Fatal(".env couldn't be read")
	}

	dbURL := os.Getenv("DATABASE_URL")
	user := os.Getenv("DB_USER");
	pass := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")

	// has to be log as fmt mightn't be picked up by Docker
	log.Println("🌁 MOUNTING ENVIRONMENT")
	log.Printf("App running on Port & Host %s, %s\n", port, host)
    log.Printf("Database name: %s\n", dbname)
	log.Printf("Database URL: %s\n", dbURL)
    log.Printf("Secret Key & User: %s, %s\n", pass, user)
	log.Println("~~~~~~~~~~~~~~~~~~")
}