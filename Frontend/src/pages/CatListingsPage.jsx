import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { catData } from '../data/cats';
import CatIllustration from '../components/CatIllustration';
import { FavoritesContext } from '../context/FavoritesContext/FavoritesContext';
import { Heart } from 'lucide-react';
import './CatListingsPage.css';

const CatListingsPage = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isCatFavorite } = useContext(FavoritesContext);

  return (
    <div className="page-container">
      <div className="pets-header-section">
        <h1 className="pets-main-title">Meet our sweethearts</h1>
        <p className="pets-subtitle">
          Tap any kitty to learn more. Every one of them is health-checked and ready for cuddles.
        </p>
      </div>

      {/* 4-Column Card Grid */}
      <div className="pets-grid">
        {catData.map(cat => (
          <div 
            key={cat.id} 
            className="pet-card"
            onClick={() => navigate(`/cats/${cat.id}`)}
          >
            {/* Favorite Button */}
            <button 
              className={`pet-fav-btn ${isCatFavorite(cat.id) ? 'is-favorite' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(cat.id);
              }}
              aria-label="Toggle Favorite"
            >
              <Heart 
                size={18} 
                fill={isCatFavorite(cat.id) ? "var(--primary-pink)" : "none"} 
                color={isCatFavorite(cat.id) ? "var(--primary-pink)" : "var(--text-gray)"} 
              />
            </button>
            {/* Colored Circle Graphic */}
            <div className="pet-circle-container" style={{ backgroundColor: cat.circleBg }}>
              <CatIllustration 
                {...cat.illustration} 
                scale={0.58} 
                style={{ 
                  marginTop: '45px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }} 
              />
            </div>

            <h3 className="pet-card-name">{cat.name}</h3>
            <p className="pet-card-info">{cat.breed} • {cat.age}</p>
            
            <span 
              className="pet-card-tag" 
              style={{ backgroundColor: cat.tagColor, color: cat.tagTextColor }}
            >
              {cat.tag}
            </span>

            <button className="pet-card-btn">
              Meet {cat.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatListingsPage;
