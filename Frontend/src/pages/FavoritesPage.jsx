import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { catData } from '../data/cats';
import CatIllustration from '../components/CatIllustration';
import { FavoritesContext } from '../context/FavoritesContext/FavoritesContext';
import { Heart, ArrowLeft, Star } from 'lucide-react';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favoriteCatIds, toggleFavorite } = useContext(FavoritesContext);

  // Filter cats that are favorited by the logged-in user
  const favoriteCats = catData.filter(cat => favoriteCatIds.includes(cat.id));

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/cats')}
        className="favorites-back-btn"
      >
        <ArrowLeft size={20} /> Back to all kitties
      </button>

      <div className="favorites-header-section">
        <h1 className="favorites-main-title">My Favorite Buddies</h1>
        <p className="favorites-subtitle">
          Here are the sweethearts you've clicked with. Ready to give one a forever home?
        </p>
      </div>

      {favoriteCats.length === 0 ? (
        <div className="empty-favorites glass-panel">
          <div className="empty-star-icon">
            <Star size={48} fill="#FFE3EC" color="var(--primary-pink)" />
          </div>
          <h2>Your favorites list is empty</h2>
          <p>Go explore our adorable kitties and find your perfect matching friend!</p>
          <button onClick={() => navigate('/cats')} className="btn btn-pink" style={{ marginTop: '20px' }}>
            Find a Kitty
          </button>
        </div>
      ) : (
        <div className="pets-grid">
          {favoriteCats.map(cat => (
            <div
              key={cat.id}
              className="pet-card"
              onClick={() => navigate(`/cats/${cat.id}`)}
            >
              {/* Favorite Button */}
              <button
                className="pet-fav-btn is-favorite"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(cat.id);
                }}
                aria-label="Remove from Favorites"
              >
                <Heart
                  size={18}
                  fill="var(--primary-pink)"
                  color="var(--primary-pink)"
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
      )}
    </div>
  );
};

export default FavoritesPage;
