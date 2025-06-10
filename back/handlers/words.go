package handlers

import (
	"context"
	"database/sql"
	"net/http"
	"language_app/db"

	"github.com/gin-gonic/gin"
)

func GetWords(c *gin.Context){
	rows, err := db.DB.Query(context.Background(), `SELECT id, word, translation, example, "translation_example", category, pronunciation, picture FROM words`)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch words",
			"details": err.Error(),
		})
	return 
	}

	defer rows.Close()

	// TODO: more on the syntax
	var words []map[string]interface{}

	for rows.Next(){
		var id int
		var word, translation, category string
		var example, translationExample, pronunciation, picture sql.NullString

		// throws error if we failed scanning the table
		// & used to write the values from the database into those variables. if function is to modify a variable, pass a pointer to it
		err := rows.Scan(&id, &word, &translation, &example, &translationExample, &category, &pronunciation, &picture)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan words"})
			return
		}

		words = append(words, gin.H{
			"id": id,
			"word": word,
			"translation": translation,
			"example": example.String,
			"translationExample": translationExample.String,
			"category": category,
			"pronunciation": pronunciation.String,
			"picture": picture.String,

		})
	}
// fmt.Println("🥳 WORDS: ", words)
	c.JSON(http.StatusOK, words)
}
