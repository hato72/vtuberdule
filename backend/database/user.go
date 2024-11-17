package database

import (
	"backend/config"
	"backend/models"
	"context"
	"fmt"
)

// GetUserByEmail はメールアドレスでユーザーを取得します
func GetUserByEmail(email string) (models.User, error) {
	var user models.User
	err := config.DB.QueryRow(context.Background(), "SELECT * FROM users WHERE email = $1", email).Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		return models.User{}, fmt.Errorf("ユーザーが見つかりません: %w", err)
	}
	return user, nil
}

func CreateUser(user models.User) error {
	_, err := config.DB.Exec(context.Background(), "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", user.Username, user.Email, user.Password)
	if err != nil {
		fmt.Println("Database error:", err) // エラーログ
	}
	return err
}
