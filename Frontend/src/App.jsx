import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import CatListingsPage from './pages/CatListingsPage';
import CatDetailsPage from './pages/CatDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import { AuthProvider, AuthContext } from './context/AuthContext/AuthContext';
import { AdoptionProvider } from './context/AdoptionContext/AdoptionContext';
import { FavoritesProvider } from './context/FavoritesContext/FavoritesContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/cats"
          element={
            <ProtectedRoute>
              <CatListingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <CatListingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cats/:id"
          element={
            <ProtectedRoute>
              <CatDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:id"
          element={
            <ProtectedRoute>
              <CatDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AdoptionProvider>
        <FavoritesProvider>
          <Router>
            <AppRoutes />
          </Router>
        </FavoritesProvider>
      </AdoptionProvider>
    </AuthProvider>
  );
};

export default App;
