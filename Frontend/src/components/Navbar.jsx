import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { PawPrint } from './Icons';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
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
            <button onClick={handleLogout} className="btn btn-pink">
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
  );
};

export default Navbar;
