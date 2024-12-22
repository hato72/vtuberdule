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
	fmt.Printf("Attempting to find user with email: %s\n", email)

	err := config.DB.QueryRow(
		context.Background(),
		"SELECT id, username, email, password FROM users WHERE email = $1",
		email,
	).Scan(&user.ID, &user.Username, &user.Email, &user.Password)

	if err != nil {
		fmt.Printf("Error finding user: %v\n", err) // エラーログ
		return models.User{}, fmt.Errorf("ユーザーが見つかりません: %w", err)
	}

	fmt.Printf("Found user: %v\n", user.Username) // 成功ログ
	return user, nil
}

func CreateUser(user models.User) error {
	_, err := config.DB.Exec(context.Background(), "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", user.Username, user.Email, user.Password)
	if err != nil {
		fmt.Println("Database error:", err) // エラーログ
	}
	return err
}
