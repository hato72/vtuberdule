package routes

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		fmt.Printf("JSON binding error: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "リクエストが不正です"})
		return
	}
	fmt.Printf("Login attempt for email: %s\n", user.Email)

	dbUser, err := database.GetUserByEmail(user.Email)
	if err != nil {
		fmt.Printf("Database error: %v\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "メールアドレスまたはパスワードが正しくありません"})
		return
	}

	// パスワードの検証を追加
	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password)); err != nil {
		fmt.Printf("Password verification failed: %v\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "メールアドレスまたはパスワードが正しくありません"})
		return
	}

	// ログイン成功
	fmt.Printf("Login successful for user: %s\n", dbUser.Username)
	c.JSON(http.StatusOK, gin.H{
		"message": "ログインに成功しました",
		"user": gin.H{
			"id":       dbUser.ID,
			"username": dbUser.Username,
			"email":    dbUser.Email,
		},
	})
}

func Register(c *gin.Context) {
	fmt.Println("Register endpoint hit") // デバッグ用ログ
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		fmt.Println("Error binding JSON:", err) // エラーログ
		c.JSON(http.StatusBadRequest, gin.H{"error": "リクエストが不正です"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error generating password hash:", err) // エラーログ
		c.JSON(http.StatusInternalServerError, gin.H{"error": "サーバーエラー"})
		return
	}
	user.Password = string(hashedPassword)

	err = database.CreateUser(user)
	if err != nil {
		fmt.Println("Error creating user:", err) // エラーログ
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ユーザー登録に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ユーザー登録に成功しました"})
}
