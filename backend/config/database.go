package config

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var DB *pgxpool.Pool

func ConnectDB() error {
	// .env ファイルを読み込む
	err := godotenv.Load("C:/Users/hatot/.vscode/vtuberdule/backend/.env")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading .env file: %v\n", err)
	}

	dbURL := os.Getenv("DATABASE_URL") // DATABASE_URL 環境変数を使用
	if dbURL == "" {
		return fmt.Errorf("DATABASE_URL environment variable not set")
	}

	poolConfig, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		return fmt.Errorf("unable to parse config: %w", err)
	}

	DB, err = pgxpool.NewWithConfig(context.Background(), poolConfig)
	if err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}

	// 接続確認
	if err := DB.Ping(context.Background()); err != nil {
		return fmt.Errorf("unable to ping database: %w", err)
	}

	fmt.Println("Successfully connected to the database!")

	// テーブル作成
	if err := createUsersTable(); err != nil {
		return fmt.Errorf("failed to create users table: %w", err)
	}

	if err := CreateFavoritesTable(); err != nil {
		return fmt.Errorf("failed to create favorites table: %w", err)
	}

	return nil
}

func createUsersTable() error {
	// テーブルが存在しない場合に作成
	query := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL
	);
	`
	_, err := DB.Exec(context.Background(), query)
	if err != nil {
		fmt.Println("Error creating users table:", err)
	}
	return err
}

func CreateFavoritesTable() error {
	query := `
		CREATE TABLE IF NOT EXISTS favorites (
			user_id INTEGER NOT NULL,
			vtuber_id TEXT NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id),
			PRIMARY KEY (user_id, vtuber_id)
		);
	`
	_, err := DB.Exec(context.Background(), query)
	if err != nil {
		return fmt.Errorf("お気に入りテーブルの作成に失敗しました: %w", err)
	}
	return nil
}
