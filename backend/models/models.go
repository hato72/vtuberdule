package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model        // これにより ID, CreatedAt, UpdatedAt, DeletedAt フィールドが継承されます
	Username   string `json:"username" gorm:"unique;not null"`
	Password   string `json:"-"` // パスワードはJSONレスポンスに含めない
	Favorites  []Favorite
}

type Favorite struct {
	gorm.Model
	UserID       uint   `json:"user_id"`
	VTuberID     string `json:"vtuber_id" gorm:"not null"`
	VTuberName   string `json:"vtuber_name" gorm:"not null"`
	Organization string `json:"organization" gorm:"not null"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type FavoriteRequest struct {
	VTuberID     string `json:"vtuber_id" binding:"required"`
	VTuberName   string `json:"vtuber_name" binding:"required"`
	Organization string `json:"organization" binding:"required"`
}

type TokenResponse struct {
	Token string `json:"token"`
	User  struct {
		ID       uint   `json:"id"`
		Username string `json:"username"`
	} `json:"user"`
}
