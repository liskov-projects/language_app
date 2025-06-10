package handlers

import (
	"context"
	"fmt"
	"net/http"
	"time"
	"language_app/db"
	"language_app/models"
	"language_app/utils"

	"github.com/gin-gonic/gin"
)

func GetUserProgress(c *gin.Context){
//gets hold of the request payload
	userID := c.Param("user_id")
	//WORKS: fmt.Print("USER ID ", userID)
	
	// userID, err := uuid.Parse(userIDStr)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"error": "user_id invalid or missing",
	// 		"details": err.Error(),
	// 	})
	// }

	//  query the db to get the progress + word details
	rows, er := db.DB.Query(context.Background(), 
	`SELECT up.user_id, up.word, up.box, up.last_reviewed,
	up.next_review,	words.word, words.category 
	FROM user_progress AS up 
	JOIN words ON up.word = CAST(words.word AS text)
	WHERE up.user_id = $1`, userID) 

	if er != nil {
		fmt.Println("QUERY ERROR:", er)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch user progress",
			"details": er.Error(),
		})
		return
	}

	defer rows.Close()

	// collects tables data in here
	var wordsProgress  make([]map[string]interface{}, 0)

	// loops to collect
	for rows.Next(){
		// declares the fields
		var userIDStr string
		var wordStr string
		var word models.Word
		var box int

		var lastReviewed, nextReview time.Time
		
		// maps the data to the vars
		er := rows.Scan(
			&userIDStr,        
			&wordStr,          
			&box,              
			&lastReviewed,     
			&nextReview,       
			&word.Word,        
			&word.Category,    
		)
		
		if er != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error reading progress data", "details": er.Error()})
			return
		}

		wordsProgress = append(wordsProgress, map[string]interface{}{
			"word": word.Word,
			"box": box,
			"category": word.Category,
			"lastReviewed": lastReviewed.Format(time.RFC3339),
			"nextReview":   nextReview.Format(time.RFC3339),
		})
	}

	// reponse object for the front
	response := gin.H{
		"userID": userID,
		"wordsProgress": wordsProgress, 
	}

	fmt.Print(response)
	// sending response to the front
	c.JSON(http.StatusOK, response)
}

func SaveUserProgress(c *gin.Context) {

	userID := c.Param("user_id")
	err := utils.InspectFrontEndData(c.Request)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to inspect request"})
		return
	}

	now := time.Now()
	// var lessonResults []models.LessonResult
	var userProgresses models.UserProgress

	// deserialises the JSON from the front into a struct lesson result
	if err := c.ShouldBindJSON(&userProgresses); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	for _, word := range userProgresses.WordProgress {
		// targetRow, er := db.DB.Query(context.Background(),
		// 	`SELECT * FROM user_progress
		// 	WHERE user_id = $1 AND word = $2
		// 	LIMIT 1`, userID, result.Word)
		// if er != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{
		// 		"error":   "failed to fetch user progress",
		// 		"details": er.Error(),
		// 	})
		// 	return
		// }
		// defer targetRow.Close()

		// var userProgress models.UserProgress
		// var id int

		// // If the target user's progress exists in the database, retrieve the data
		// found := false
		// for targetRow.Next() {
		// 	found = true
		// 	// maps the data to the vars
		// 	er := targetRow.Scan(
		// 		&id,
		// 		&userProgress.UserID,
		// 		&userProgress.Word,
		// 		&userProgress.Box,
		// 		&userProgress.LastReviewed,
		// 		&userProgress.NextReview,
		// 	)
		// 	if er != nil {
		// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "error reading progress data", "details": er.Error()})
		// 		return
		// 	}
		// }

		// // If there is no target user's progress, create one
		// if !found {
		// 	parsedUUID, parseErr := uuid.Parse(userID)
		// 	if parseErr != nil {
		// 		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user_id", "details": parseErr.Error()})
		// 		return
		// 	}
		// 	userProgress = models.UserProgress{
		// 		UserID:       parsedUUID,
		// 		Word:         result.Word,
		// 		Box:          1,
		// 		LastReviewed: now,
		// 		NextReview:   now,
		// 	}
		// }

		// if result.Result {
		// 	if userProgress.Box < 5 {
		// 		userProgress.Box = userProgress.Box + 1
		// 	}
		// } else {
		// 	if 1 < userProgress.Box {
		// 		userProgress.Box = userProgress.Box - 1
		// 	}
		// }

		word.LastReviewed = now
		reviewDate := 1
		if word.Box == 2 {
			reviewDate = 3
		} else if word.Box == 3 {
			reviewDate = 5
		} else if word.Box == 4 {
			reviewDate = 9
		} else if word.Box == 5 {
			reviewDate = 14
		}
		word.NextReview = now.AddDate(0, 0, reviewDate)

		// Update if matching row exists; otherwise, insert
		_, err := db.DB.Exec(context.Background(),
			`INSERT INTO user_progress (user_id, word, box, last_reviewed, next_review)
			VALUES ($1, $2, $3, $4, $5)
			ON CONFLICT (user_id, word)
			DO UPDATE SET
				box = EXCLUDED.box,
				last_reviewed = EXCLUDED.last_reviewed,
				next_review = EXCLUDED.next_review`,
			userID,
			word.Word,
			word.Box,
			word.LastReviewed,
			word.NextReview,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error updating user progress", "details": err.Error()})
			return
		}
	}

	// sending response to the front
	c.JSON(http.StatusOK, "User progress updated successfully.")
}
