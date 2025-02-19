package routes

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Favorite struct {
	ID           int    `json:"id"`
	UserID       int    `json:"user_id"`
	VtuberID     string `json:"vtuber_id"`
	VtuberName   string `json:"vtuber_name"`
	Organization string `json:"organization"`
}

func GetFavoritesHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetInt("user_id")

		rows, err := db.Query(`
            SELECT id, user_id, vtuber_id, vtuber_name, organization 
            FROM favorites 
            WHERE user_id = $1 AND deleted_at IS NULL
        `, userID)

		if err != nil {
			log.Printf("Error fetching favorites: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch favorites"})
			return
		}
		defer rows.Close()

		var favorites []Favorite
		for rows.Next() {
			var f Favorite
			if err := rows.Scan(&f.ID, &f.UserID, &f.VtuberID, &f.VtuberName, &f.Organization); err != nil {
				log.Printf("Error scanning favorite: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan favorites"})
				return
			}
			favorites = append(favorites, f)
		}

		c.JSON(http.StatusOK, favorites)
	}
}

func AddFavoriteHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetInt("user_id")
		var favorite Favorite
		if err := c.ShouldBindJSON(&favorite); err != nil {
			log.Printf("Error binding JSON: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		favorite.UserID = userID

		// UPSERT using ON CONFLICT
		var id int
		err := db.QueryRow(`
        INSERT INTO favorites (user_id, vtuber_id, vtuber_name, organization, deleted_at)
        VALUES ($1, $2, $3, $4, NULL)
        ON CONFLICT (user_id, vtuber_id) 
        DO UPDATE SET 
            deleted_at = NULL,
            vtuber_name = EXCLUDED.vtuber_name,
            organization = EXCLUDED.organization,
            updated_at = CURRENT_TIMESTAMP
        RETURNING id
    `, favorite.UserID, favorite.VtuberID, favorite.VtuberName, favorite.Organization).Scan(&id)

		if err != nil {
			log.Printf("Error adding favorite: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add favorite"})
			return
		}

		favorite.ID = id
		c.JSON(http.StatusCreated, favorite)
	}
}

func DeleteFavoriteHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetInt("user_id")
		favoriteID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			log.Printf("Error parsing favorite ID: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid favorite ID"})
			return
		}

		result, err := db.Exec(`
            UPDATE favorites 
            SET deleted_at = CURRENT_TIMESTAMP 
            WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
        `, favoriteID, userID)

		if err != nil {
			log.Printf("Error deleting favorite: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete favorite"})
			return
		}

		rows, _ := result.RowsAffected()
		if rows == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "Favorite not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Favorite deleted successfully"})
	}
}
