package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"vtuberdule/middleware"
	"vtuberdule/routes"
)

func main() {
	// 環境変数の読み込み
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// データベース接続情報
	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	// PostgreSQL接続文字列
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPass, dbName)

	// データベース接続
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// 接続テスト
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()

	// CORS設定
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	config.AddAllowHeaders("Access-Control-Allow-Headers", "Authorization")
	r.Use(cors.New(config))

	// ルーティング設定
	r.POST("/api/register", routes.RegisterHandler(db))
	r.POST("/api/login", routes.LoginHandler(db))
	r.GET("/api/favorites", middleware.AuthMiddleware(), routes.GetFavoritesHandler(db))
	r.POST("/api/favorites", middleware.AuthMiddleware(), routes.AddFavoriteHandler(db))
	r.DELETE("/api/favorites/:id", middleware.AuthMiddleware(), routes.DeleteFavoriteHandler(db))

	// サーバー起動
	r.Run(":8080")
}
