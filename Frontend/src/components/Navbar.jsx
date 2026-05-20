import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { PawPrint } from './Icons';
import { LogOut, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleNavLinkClick = (e, path) => {
    e.preventDefault();
    if (path === 'about') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (path === 'how-it-works') {
      if (location.pathname !== '/') {
        navigate('/#how-it-works');
        setTimeout(() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path === 'stories') {
      if (location.pathname !== '/') {
        navigate('/#stories');
        setTimeout(() => {
          const el = document.getElementById('stories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('stories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (!user) {
      navigate('/auth', { state: { mode: 'login' } });
    } else {
      navigate('/cats');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-left" style={{ textDecoration: 'none' }}>
            <div className="logo-circle">
              <PawPrint size={20} color="white" />
            </div>
            <span className="logo-text">Meowtopia</span>
          </Link>
        </div>

        <div className="nav-links">
          <a href="#" onClick={(e) => handleNavLinkClick(e, 'about')} className="nav-link">About</a>
          <a href="#" onClick={(e) => handleNavLinkClick(e, 'how-it-works')} className="nav-link">How it works</a>
          <a href="#" onClick={(e) => handleNavLinkClick(e, 'kitties')} className="nav-link">Kitties</a>
          {user && <Link to="/favorites" className="nav-link">Favorites</Link>}
          <a href="#" onClick={(e) => handleNavLinkClick(e, 'stories')} className="nav-link">Stories</a>
        </div>

        <div className="nav-right">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Hi there!</span>
              <button onClick={() => setShowLogoutModal(true)} className="btn btn-pink">
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => navigate('/auth', { state: { mode: 'login' } })} className="btn btn-purple" style={{ padding: '10px 22px' }}>
                Log In
              </button>
              <button onClick={() => navigate('/auth', { state: { mode: 'signup' } })} className="btn btn-pink" style={{ padding: '10px 22px' }}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="logout-modal-close" onClick={() => setShowLogoutModal(false)}>
              <X size={20} />
            </button>

            <div className="logout-modal-icon">
              <LogOut size={32} color="var(--primary-pink)" />
            </div>

            <h3 className="logout-modal-title">Log Out?</h3>
            <p className="logout-modal-text">
              Are you sure you want to log out of MeowTopia? Your favorites and adoptions are safely saved.
            </p>

            <div className="logout-modal-actions">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="btn"
                style={{
                  background: 'white',
                  color: 'var(--primary-pink)',
                  border: '2px solid var(--primary-pink)',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Stay
              </button>
              <button onClick={handleLogout} className="btn btn-pink" style={{ padding: '12px 28px' }}>
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
