// IMPORTANT: all seeding happens in the docker container, with seeds.sql

// package main

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"os"

// 	_ "github.com/lib/pq"
// )

// //should be here and look like this with json adds-on to correctly handle the seeding
// type word struct {
// 	Word string `json:"word"`;
// 	Translation string `json:"translation"`;
// 	Example string `json:"example"`;
// 	TranslationExample string `json:"translationExample"`;
// 	Category string `json:"category"`;
// 	Pronunciation string `json:"pronunciation"`;
// 	Picture string `json:"picture"`
// }

// func main(){
// 	// extracts env from terminal
// 	user := os.Getenv("DB_USER")
// 	password := os.Getenv("DB_PASSWORD")
// 	dbname := os.Getenv("DB_NAME")
// 	host := os.Getenv("DB_HOST")
// 	port := os.Getenv("DB_PORT")
	
// 	// connects to db using the connection string
// 	connStr := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable", 
// 		user, password, dbname, host, port)
		
// 	// opens the db connection
// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer db.Close()

// 	// creates the table in the docker container
// 	_, err = db.Exec(`
// 		CREATE TABLE IF NOT EXISTS words (
// 			id SERIAL PRIMARY KEY,
// 			word TEXT NOT NULL,
// 			translation TEXT NOT NULL,
// 			example TEXT,
// 			translationExample TEXT,
// 			category TEXT,
// 			pronunciation TEXT,
// 			picture TEXT
// 		);
// 	`)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	// reads the JSON
// 	data, err := os.ReadFile("seeds.json")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	// parses the JSON into GO struct
// 	var words []word
// 	err = json.Unmarshal(data, &words)
// 	if err != nil{
// 		log.Fatal(err)
// 	}

// 	// inserts data into the db
// 	for _, word := range words {
// 		_, err := db.Exec("INSERT INTO words (word, translation, example, translationExample, category, pronunciation, picture) Values ($1, $2, $3, $4, $5, $6, $7)", word.Word, word.Translation, word.Example, word.TranslationExample, word.Category, word.Pronunciation, word.Picture)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 	}

// 	fmt.Println("DB populated")
// }