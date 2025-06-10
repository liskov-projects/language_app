package main

import (
	"net/http"

	"language_app/auth"
	"language_app/db"
	"language_app/environment"
	"language_app/handlers"

	"github.com/gin-gonic/gin"
)

// WORKS: entry point
func main() {
	environment.Mount()

	db.InitDB()
	// closes the connection to avoid exhaustion errors
	defer db.DB.Close()

	// Schedule a timer to check users active in the last 6 months
	handlers.ScheduleUserLoginCheck()

	// initializes Gin router
	router := gin.Default()
	// middleware func ensures the param allows to access the request and response context
	router.Use(func(c *gin.Context) {
		// modifies response with c.Writer
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// defines the home route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to the Endangered Languages conservation API"})
	})
	// we hit the route & trigger a func
	router.GET("/words", handlers.GetWords) //WORKS:
	// defines the categories route
	router.GET("/categories", handlers.GetCategories) //WORKS:
	// defines the users route
	router.GET("/users", handlers.GetUsers) //NEW: untested unfinished
	// NEW: gets user progress
	router.GET("/user/:user_id", handlers.GetUserProgress)
	router.POST("/user_progress/:user_id", handlers.SaveUserProgress)
	// defines POST requests
	router.POST("/users", auth.AddUser)           //WORKS:
	router.POST("/users/signin", auth.SignInUser) //WORKS:
	// starts the server
	router.Run("0.0.0.0:8081")
}
