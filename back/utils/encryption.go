package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"os"

	"golang.org/x/crypto/bcrypt"

	"github.com/joho/godotenv"
)

// This function performs AES-256 and hashing encode
func EncodePassword(password string) (string, error) {
	encryptedPassword, err := aes128Encrypt(password)
	if err != nil {
		return "", err
	}
	hashedPassword, err := HashPassword(encryptedPassword)
	if err != nil {
		return "", err
	}
	return hashedPassword, nil
}

func ComparePassword(password string, encodedPassword string) (bool, error) {
	encryptedPassword, err := aes128Encrypt(password)
	if err != nil {
		return false, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(encodedPassword), []byte(encryptedPassword)); err != nil {
		return false, err
	}
	return true, nil
}

// AES 128 Encryption
func aes128Encrypt(text string) (string, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return "", err
	}

	// Load encryption key from .env file for securing passwords
	key := os.Getenv("ENC_KEY")
	iv := os.Getenv("ENC_IV")

	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		panic(err)
	}

	padded := pkcs7Pad([]byte(text), aes.BlockSize)
	ciphertext := make([]byte, len(padded))
	mode := cipher.NewCBCEncrypter(block, []byte(iv))
	mode.CryptBlocks(ciphertext, padded)

	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

func pkcs7Pad(data []byte, blockSize int) []byte {
	padding := blockSize - len(data)%blockSize
	padtext := bytesRepeat(byte(padding), padding)
	return append(data, padtext...)
}

func bytesRepeat(b byte, count int) []byte {
	buf := make([]byte, count)
	for i := range buf {
		buf[i] = b
	}
	return buf
}
