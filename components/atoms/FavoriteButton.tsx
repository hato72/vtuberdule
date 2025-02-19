import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoriteButtonProps {
  vtuberId: string;
  vtuberName: string;
  organization: string;
}

interface Favorite {
  id: number;
  vtuber_id: string;
  vtuber_name: string;
  organization: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  vtuberId,
  vtuberName,
  organization,
}) => {
  const { isAuthenticated, token } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchFavoriteStatus();
    }
  }, [isAuthenticated, vtuberId, token]);

  const fetchFavoriteStatus = async () => {
    if (!isAuthenticated || !token) return;
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || 'お気に入り情報の取得に失敗しました');
      }

      const favorites: Favorite[] = await response.json();
      if (!Array.isArray(favorites)) {
        setIsFavorite(false);
        setFavoriteId(null);
        return;
      }

      const favorite = favorites.find((f) => f.vtuber_id === vtuberId);
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.id);
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    } catch (error) {
      console.error('Error fetching favorite status:', error);
      setError(error instanceof Error ? error.message : 'エラーが発生しました');
    }
  };

  const toggleFavorite = async () => {
    if (!isAuthenticated || !token) {
      setError('お気に入り登録にはログインが必要です');
      return;
    }

    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      if (isFavorite && favoriteId) {
        // お気に入り解除
        const response = await fetch(`http://localhost:8080/api/favorites/${favoriteId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Network error' }));
          throw new Error(errorData.error || 'お気に入り解除に失敗しました');
        }

        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        // お気に入り登録
        const response = await fetch('http://localhost:8080/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            vtuber_id: vtuberId,
            vtuber_name: vtuberName,
            organization: organization,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Network error' }));
          throw new Error(errorData.error || 'お気に入り登録に失敗しました');
        }

        const data = await response.json();
        setIsFavorite(true);
        setFavoriteId(data.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError(error instanceof Error ? error.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  // エラーメッセージを3秒後に自動的に消す
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative">
      <button
        onClick={toggleFavorite}
        disabled={isLoading}
        className={`p-2 rounded-full transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          isFavorite
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        title={isFavorite ? 'お気に入り解除' : 'お気に入り登録'}
      >
        <svg
          className={`w-6 h-6 ${isFavorite ? 'text-white' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      )}
      {error && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-red-500 text-white text-sm rounded shadow-lg whitespace-nowrap z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default FavoriteButton;