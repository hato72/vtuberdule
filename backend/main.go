package main

import (
	"backend/config"
	"backend/routes"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	err := config.ConnectDB()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to connect to database: %v\n", err)
		return // サーバーを起動せずに終了
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // 必要に応じてオリジンを追加
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.POST("/login", routes.Login)
	r.POST("/api/register", routes.Register)
	r.GET("/", func(c *gin.Context) {
		c.String(200, "Welcome to the top page!")
	})
	r.GET("/login", func(c *gin.Context) {
		c.String(200, "Welcome to the login page!")
	})

	r.Run(":8080")
}
