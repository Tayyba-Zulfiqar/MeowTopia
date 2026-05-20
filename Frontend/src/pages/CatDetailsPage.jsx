import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { catData } from '../data/cats';
import { Heart, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import CatIllustration from '../components/CatIllustration';
import { AdoptionContext } from '../context/AdoptionContext/AdoptionContext';
import { FavoritesContext } from '../context/FavoritesContext/FavoritesContext';
import './CatDetailsPage.css';

const CatDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { adoptCat, isCatAdopted } = useContext(AdoptionContext);
  const { toggleFavorite, isCatFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const foundCat = catData.find(c => c.id === parseInt(id));
    if (foundCat) {
      setCat(foundCat);
    }
  }, [id]);

  const handleAdoptClick = () => {
    setShowModal(true);
  };

  const confirmAdoption = () => {
    if (cat) {
      adoptCat(cat.id);
      setShowModal(false);
    }
  };

  const adopted = cat ? isCatAdopted(cat.id) : false;

  if (!cat) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <button 
        onClick={() => navigate('/cats')} 
        style={{ background: 'none', border: 'none', color: 'var(--primary-pink)', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', fontSize: '1.1rem' }}
      >
        <ArrowLeft size={20} /> Back to friends
      </button>

      <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'} }}>
        {adopted && (
          <div className="success-msg" style={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <CheckCircle2 size={24} />
            You have successfully adopted {cat.name}! Thank you for giving them a forever home.
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', backgroundColor: cat.circleBg || '#FFF1F5', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            {cat.illustration ? (
              <CatIllustration 
                {...cat.illustration} 
                scale={1.0}
                style={{ 
                  marginTop: '40px',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }} 
              />
            ) : (
              <img 
                src={cat.image} 
                alt={cat.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} 
              />
            )}
          </div>
          <div style={{ flex: '1 1 300px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <h1 style={{ fontSize: '3rem', margin: 0 }}>{cat.name}</h1>
              <button 
                className={`detail-fav-btn ${isCatFavorite(cat.id) ? 'is-favorite' : ''}`}
                onClick={() => toggleFavorite(cat.id)}
                aria-label="Toggle Favorite"
                style={{
                  background: isCatFavorite(cat.id) ? '#FFF4F7' : 'white',
                  border: `1px solid ${isCatFavorite(cat.id) ? 'var(--primary-pink)' : 'rgba(243, 129, 185, 0.2)'}`,
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 4px 15px rgba(255, 105, 180, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#FFF4F7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = isCatFavorite(cat.id) ? '#FFF4F7' : 'white';
                }}
              >
                <Heart 
                  size={24} 
                  fill={isCatFavorite(cat.id) ? "var(--primary-pink)" : "none"} 
                  color={isCatFavorite(cat.id) ? "var(--primary-pink)" : "var(--text-gray)"} 
                />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <span style={{ background: 'var(--primary-pink)', padding: '5px 15px', borderRadius: '20px', color: 'white', fontWeight: 600 }}>{cat.breed}</span>
              <span style={{ background: cat.tagColor || 'var(--pastel-blue)', padding: '5px 15px', borderRadius: '20px', color: cat.tagTextColor || '#2b7a78', fontWeight: 600 }}>{cat.age}</span>
            </div>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', color: 'var(--text-main)' }}>
              {cat.description}
            </p>

            {!adopted ? (
              <div style={{ marginTop: 'auto' }}>
                <button onClick={handleAdoptClick} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1.3rem', padding: '15px' }}>
                  <Heart fill="white" size={24} />
                  Adopt {cat.name}
                </button>
              </div>
            ) : (
              <button disabled className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#d4edda', color: '#155724', boxShadow: 'none', cursor: 'default' }}>
                <CheckCircle2 size={24} />
                Adopted
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--primary-pink)' }}>Confirm Adoption</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'var(--text-main)' }}>
               Are you sure you want to adopt {cat.name}? They are looking forward to coming home with you!
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowModal(false)} 
                className="btn-primary" 
                style={{ background: 'white', color: 'var(--primary-pink)', border: '2px solid var(--primary-pink)', boxShadow: 'none' }}
              >
                Cancel
              </button>
              <button onClick={confirmAdoption} className="btn-primary">
                Confirm Adoption
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatDetailsPage;
