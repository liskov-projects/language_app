package handlers

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"time"

	"language_app/db"
	"language_app/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

//NEW: untested unfinished
func GetUsers(c *gin.Context){
	rows, err := db.DB.Query(context.Background(), "SELECT id, username, password, last_logged_in FROM users")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users from the db"})
		return
	}

	defer rows.Close()
	// do we need userS ? or only one | use this to compare for an existing user to avoid duplicates?
	var users []map[string]interface{}
	for rows.Next(){
		var id uuid.UUID
		var username, password string
		var lastLoggedIn sql.NullTime 

		// processing the extracted data 
		err := rows.Scan(&id, &username, &password, &lastLoggedIn)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to scan user data: %v", err)})
			return
		}
		

		// can do formatting here
		var lastLoggedInStr string
		if lastLoggedIn.Valid{
			lastLoggedInStr = lastLoggedIn.Time.Format("2002-01-02")
		} else {
			lastLoggedInStr = ""
		}

		users = append(users, gin.H{
			"id": id,
			"username": username,
			"password": password,
			"lastLoggedIn": lastLoggedInStr,
		})
	}
	c.JSON(http.StatusOK, users)
}

// REVIEW
func ScheduleUserLoginCheck() {
	go func() {
		for {
			deleteExpiredUsers()
			time.Sleep(24 * time.Hour)
		}
	}()
}

func deleteExpiredUsers() {
	msgTag := "Daily login check routine : "

	// Connect to DB using parameters from .env file
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println(msgTag, "Failed to load the .env file, ", err)
		return
	}
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, pass, dbname, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(msgTag, "Failed to connect to database, ", err)
		return
	}

	// Get users whose last login was over 6 months ago will be removed
	var targetUsers []models.User
	sixMonthsAgo := time.Now().AddDate(0, -6, 0)
	inactiveUsers := db.Table("users").Where("last_logged_in < ?", sixMonthsAgo)
	if inactiveUsers.Error != nil {
		fmt.Println(msgTag, "Failed to get table data, ", err)
		return
	}

	inactiveUsers.Find(&targetUsers)
	if len(targetUsers) == 0 {
		fmt.Println(msgTag, "✔ There are no expired users ✔")
		return
	}

	// Remove user progress that matches the user ID
	for _, user := range targetUsers {
		deleteResult := db.Table("user_progress").Where("user_id = ?", user.ID).Delete(&models.UserProgress{})
		if deleteResult.Error != nil {
			fmt.Println(msgTag, "Failed to delete target user("+user.ID.String()+") progress, ", err)
		}
	}

	// Remove users whose last login was over 6 months ago
	deleteResult := inactiveUsers.Delete(&models.User{})
	if deleteResult.Error != nil {
		fmt.Println(msgTag, "Failed to delete target users, ", err)
	}

	fmt.Println(msgTag, "✔ Deleted all expired users ✔")
}
