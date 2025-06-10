package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)
var DB *pgxpool.Pool

//WORKS: gets db access
func  InitDB(){
	// IMPORTANT:
	// run this locally
	// err := godotenv.Load("../../.env")
	
	// run this in docker
	err := godotenv.Load("/app/.env")

	if err != nil {
		log.Fatal("Error with .env file")
	}

	dsn := os.Getenv("DATABASE_URL")
	var errConn error
	DB, errConn = pgxpool.New(context.Background(), dsn)
	if errConn != nil{
		log.Fatal("Unable to connect to db: ", errConn)
	}
	log.Println("Connected to db")
}