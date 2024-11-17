package models

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"` // メールアドレスフィールドを追加
	Password string `json:"password"`
}
