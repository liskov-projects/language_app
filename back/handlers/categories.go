package handlers

import (
	"context"
	"net/http"
	"language_app/db"
	"log"
	"github.com/gin-gonic/gin"
)

//WORKS: table words
func GetCategories(c *gin.Context){
	rows, err := db.DB.Query(context.Background(), "SELECT DISTINCT category FROM words")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch categories",
			"details": err.Error(),
		})
	return
	}
	
	defer rows.Close()

	type Category struct {
		Name string `json:"name"`
	}

	var categories []Category
	
	for rows.Next(){

		var category string
		// var translation string

		if err := rows.Scan(&category); err != nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan categories"})
			return
		}
		categories = append(categories, Category{
			Name: category,
			// "translation": translation,
		})
	}

	log.Printf("🌈 returning categories: %+v\n", categories)
	c.JSON(http.StatusOK, categories)
}
