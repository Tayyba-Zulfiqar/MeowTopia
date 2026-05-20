import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export const AdoptionContext = createContext();

export const AdoptionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [adoptedCatIds, setAdoptedCatIds] = useState([]);

  // Fetch adopted cats for specific logged-in user
  useEffect(() => {
    if (user && user.email) {
      const userKey = `meowtopia_adopted_cats_${user.email}`;
      const stored = localStorage.getItem(userKey);
      if (stored) {
        setAdoptedCatIds(JSON.parse(stored));
      } else {
        setAdoptedCatIds([]);
      }
    } else {
      setAdoptedCatIds([]);
    }
  }, [user]);

  // Adopt a cat specifically for this user
  const adoptCat = (catId) => {
    if (!user || !user.email) return;
    const userKey = `meowtopia_adopted_cats_${user.email}`;
    const updated = [...adoptedCatIds, catId];
    setAdoptedCatIds(updated);
    localStorage.setItem(userKey, JSON.stringify(updated));
  };

  const isCatAdopted = (catId) => {
    return adoptedCatIds.includes(catId);
  };

  return (
    <AdoptionContext.Provider value={{ adoptedCatIds, adoptCat, isCatAdopted }}>
      {children}
    </AdoptionContext.Provider>
  );
};
