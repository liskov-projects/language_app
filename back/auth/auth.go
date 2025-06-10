package auth

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"strings"
	"time"

	// change to the correct path once deployed
	"language_app/db"
	"language_app/models"
	"language_app/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// WORKS: TODO: not allow the same name for new users
func AddUser(c *gin.Context){
	// in case of debugging
	err := utils.InspectFrontEndData(c.Request)
	if err != nil { //assigning the call to the function to err & then do the condition
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to inspect reques"})
		return
	}

	// the func proper
	var newUser models.User
	
	// deserialises the JSON from the front into a struct newUser | frontend data is not seen here
	if err := c.ShouldBindJSON(&newUser); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	if strings.TrimSpace(newUser.Username) == "" || strings.TrimSpace(newUser.Password) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing or empty username or password"})
		return
	}

	// Check if the username is already taken
	userNames, err := db.DB.Query(context.Background(), `SELECT username FROM users`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch user list",
			"details": err.Error(),
		})
		return
	}

	for userNames.Next() {
		var username string
		if err := userNames.Scan(&username); err != nil {
			continue
		}
		if username == newUser.Username {
			c.JSON(http.StatusConflict, gin.H{"error": "Username is already in use"})
			return
		}
	}

	// generate id && hash password here
	newUser.ID = uuid.New()
	encodedPassword, err := utils.EncodePassword(newUser.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to encode password"})
		return
	}

	fmt.Printf("New user: %+v\n", newUser)

	// inserts in the db
	query := `INSERT INTO users (id, username, password, last_logged_in) VALUES ($1, $2, $3, $4)`
	_, err = db.DB.Exec(context.Background(), query, newUser.ID, newUser.Username, encodedPassword, newUser.LastLoggedIn)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to insert user: %v", err)})
		return
	}

	// returns new user data
	c.JSON(http.StatusCreated, gin.H{"user": newUser})
}

// WORKS:
func SignInUser(c *gin.Context){
	var credentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	var id uuid.UUID
	var dbPassword string
	var lastLoggedIn sql.NullTime

	// TODO: add password check to the query string
	query := `SELECT id, password, last_logged_in FROM users WHERE username=$1`
	err := db.DB.QueryRow(context.Background(), query, credentials.Username).Scan(&id, &dbPassword, &lastLoggedIn)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// password check
	matchResult, err := utils.ComparePassword(credentials.Password, dbPassword)
	if !matchResult || err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// updates last_loggen_in
	now := sql.NullTime{Time: time.Now(), Valid: true}
	_, err = db.DB.Exec(context.Background(), `UPDATE users SET last_logged_in=$1 WHERE id=$2`, now.Time, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to updated the login timestamp"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged in OK",
		"id": id,
		"username": credentials.Username,
		"lastLoggedIn": now.Time.Format("2001-02-02 15:09:09"),
	})
}
