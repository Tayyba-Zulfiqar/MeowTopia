import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Validation helpers
const validateEmail = (email) => {
  if (!email || email.trim() === '') return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
};

const validatePassword = (password) => {
  if (!password || password.trim() === '') return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user data on load
    const storedUser = localStorage.getItem('meowtopia_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.email) {
          setUser(parsed);
        } else {
          localStorage.removeItem('meowtopia_user');
          setUser(null);
        }
      } catch (e) {
        localStorage.removeItem('meowtopia_user');
        setUser(null);
      }
    }
  }, []);

  const signup = (email, password) => {
    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) return { success: false, message: emailError };
    if (passwordError) return { success: false, message: passwordError };

    let users = [];
    try {
      const storedUsers = localStorage.getItem('meowtopia_registered_users');
      users = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (e) {
      users = [];
    }

    // Check if user already exists
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'Email is already registered!' };
    }

    // Add new user
    const newUser = { email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('meowtopia_registered_users', JSON.stringify(updatedUsers));

    // Auto log in after sign up
    const userData = { email, isLoggedIn: true };
    setUser(userData);
    localStorage.setItem('meowtopia_user', JSON.stringify(userData));
    return { success: true };
  };

  const login = (email, password) => {
    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) return { success: false, message: emailError };
    if (passwordError) return { success: false, message: passwordError };

    let users = [];
    try {
      const storedUsers = localStorage.getItem('meowtopia_registered_users');
      users = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (e) {
      users = [];
    }

    const matchedUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      return { success: false, message: 'Invalid email or password!' };
    }

    const userData = { email, isLoggedIn: true };
    setUser(userData);
    localStorage.setItem('meowtopia_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meowtopia_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};