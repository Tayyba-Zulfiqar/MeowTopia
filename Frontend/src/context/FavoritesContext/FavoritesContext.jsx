import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { apiGetFavorites, apiAddFavorite, apiRemoveFavorite } from '../../api/api';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favoriteCatIds, setFavoriteCatIds] = useState([]);

  // Fetch favorites from API when user logs in
  useEffect(() => {
    if (user) {
      apiGetFavorites()
        .then(({ catIds }) => setFavoriteCatIds(catIds))
        .catch(() => setFavoriteCatIds([]));
    } else {
      setFavoriteCatIds([]);
    }
  }, [user]);

  const toggleFavorite = async (catId) => {
    if (!user) return;
    const isFav = favoriteCatIds.includes(catId);
    // Optimistic update
    setFavoriteCatIds((prev) =>
      isFav ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
    try {
      if (isFav) {
        await apiRemoveFavorite(catId);
      } else {
        await apiAddFavorite(catId);
      }
    } catch {
      // Revert on failure
      setFavoriteCatIds((prev) =>
        isFav ? [...prev, catId] : prev.filter((id) => id !== catId)
      );
    }
  };

  const isCatFavorite = (catId) => favoriteCatIds.includes(catId);

  return (
    <FavoritesContext.Provider value={{ favoriteCatIds, toggleFavorite, isCatFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
