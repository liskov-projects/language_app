package models

import (
	"time"

	"github.com/google/uuid"
)

type Word struct {
	ID                 int
	Word               string
	Translation        string
	Example            *string
	TranslationExample *string
	Category           string
	Pronunciation      string
	Picture            *string
}

type User struct {
	ID           uuid.UUID `json:"id"`       //these field are used to unmarshal
	Username     string    `json:"username"` // the frontend data
	Password     string    `json:"password"` // and fill the with it these fields
	LastLoggedIn time.Time `json:"lastLoggedIn"`
}

type UserProgress struct {
	UserID       uuid.UUID      `json:"userID"`
	WordProgress []WordProgress `json:"wordsProgress"`
}

type WordProgress struct {
	Word         string    `json:"word"`
	Box          int       `json:"box"`
	Category     string    `json:"category"`
	LastReviewed time.Time `json:"lastReviewed"`
	NextReview   time.Time `json:"nextReview"`
}

// OLD:
// type LessonResult struct {
// 	Word   string `json:"word"`
// 	Result bool   `json:"result"`
// }
