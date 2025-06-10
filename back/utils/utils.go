package utils

import (
	"bytes"
	"fmt"
	"io"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string)(string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// debugger to inspect incoming data from the frontend
func InspectFrontEndData(r *http.Request) error{ //r - arg name | after * struct name
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		return fmt.Errorf("🚨 failed to read request body: %w", err)
	}

	fmt.Printf("🌐 Incoming JSON: %s\n", string(bodyBytes))

	r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
	return nil
}
