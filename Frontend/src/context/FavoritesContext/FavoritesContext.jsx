import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favoriteCatIds, setFavoriteCatIds] = useState([]);

  // Fetch favorite cats for specific logged-in user on mount or user change
  useEffect(() => {
    if (user && user.email) {
      const userKey = `meowtopia_favorite_cats_${user.email}`;
      const stored = localStorage.getItem(userKey);
      if (stored) {
        setFavoriteCatIds(JSON.parse(stored));
      } else {
        setFavoriteCatIds([]);
      }
    } else {
      setFavoriteCatIds([]);
    }
  }, [user]);

  // Toggle favorite status for a cat
  const toggleFavorite = (catId) => {
    if (!user || !user.email) return;
    const userKey = `meowtopia_favorite_cats_${user.email}`;
    let updated;
    if (favoriteCatIds.includes(catId)) {
      updated = favoriteCatIds.filter(id => id !== catId);
    } else {
      updated = [...favoriteCatIds, catId];
    }
    setFavoriteCatIds(updated);
    localStorage.setItem(userKey, JSON.stringify(updated));
  };

  const isCatFavorite = (catId) => {
    return favoriteCatIds.includes(catId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteCatIds, toggleFavorite, isCatFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};