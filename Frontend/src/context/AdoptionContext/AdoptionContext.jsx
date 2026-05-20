import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { apiGetAdoptions, apiAdoptCat } from '../../api/api';

export const AdoptionContext = createContext();

export const AdoptionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [adoptedCatIds, setAdoptedCatIds] = useState([]);

  // Fetch adoptions from API when user logs in
  useEffect(() => {
    if (user) {
      apiGetAdoptions()
        .then(({ catIds }) => setAdoptedCatIds(catIds))
        .catch(() => setAdoptedCatIds([]));
    } else {
      setAdoptedCatIds([]);
    }
  }, [user]);

  const adoptCat = async (catId) => {
    if (!user) return;
    try {
      await apiAdoptCat(catId);
      setAdoptedCatIds((prev) => [...prev, catId]);
    } catch (error) {
      console.error('Adoption failed:', error.message);
    }
  };

  const isCatAdopted = (catId) => adoptedCatIds.includes(catId);

  return (
    <AdoptionContext.Provider value={{ adoptedCatIds, adoptCat, isCatAdopted }}>
      {children}
    </AdoptionContext.Provider>
  );
};
