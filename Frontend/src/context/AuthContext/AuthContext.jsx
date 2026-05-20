import { createContext, useState, useEffect } from 'react';
import { apiLogin, apiSignup, apiGetMe } from '../../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, verify stored token and restore session
  useEffect(() => {
    const token = localStorage.getItem('meowtopia_token');
    if (!token) {
      setLoading(false);
      return;
    }
    apiGetMe()
      .then(({ user }) => setUser(user))
      .catch(() => {
        localStorage.removeItem('meowtopia_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signup = async (email, password) => {
    try {
      const { token, user } = await apiSignup(email, password);
      localStorage.setItem('meowtopia_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const { token, user } = await apiLogin(email, password);
      localStorage.setItem('meowtopia_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('meowtopia_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
