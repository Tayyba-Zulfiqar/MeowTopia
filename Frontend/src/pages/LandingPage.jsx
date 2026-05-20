import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { DoublePaw } from '../components/Icons';
import CatIllustration from '../components/CatIllustration';
import { Heart } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleAction = () => {
    if (user) {
      navigate('/cats');
    } else {
      navigate('/auth');
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-text-side">
          <h1 className="hero-heading">
            Find your <span>purr-fect</span> best friend.
          </h1>
          <p className="hero-subtitle">
            Meowtopia is a sweet little home on the internet where rescued kitties meet the families they've been dreaming of. Browse, meet, and adopt — with love at every step.
          </p>
          <div className="hero-actions">
            <button onClick={handleAction} className="btn btn-pink btn-large">
              <span className="paw-icon"><DoublePaw size={16} color="#302030" /></span>
              Find Your Pet Now
            </button>
          </div>
        </div>
        
        <div className="hero-graphics-side" style={{ position: 'relative' }}>
          {/* Main Pink Cat */}
          <CatIllustration 
            primaryColor="#FAD2E1" 
            blushColor="#F381B9" 
            bowColor="#C1B0F4"
            hasBow={true}
            scale={1.1}
            style={{ position: 'relative', zIndex: 2, marginLeft: 'auto', marginRight: '0px', marginTop: '10px' }}
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="how-it-works-section">
        <h2 className="how-heading">How it works</h2>
        <p className="how-subtitle">Three soft steps from hello to home.</p>

        <div className="how-steps">
          {/* Step 1: Browse */}
          <div className="step-card">
            <div className="circle-frame pink">
              <CatIllustration 
                primaryColor="#FAD2E1" 
                blushColor="#F381B9" 
                bowColor="#C1B0F4"
                hasBow={true}
                scale={0.58}
                style={{ marginTop: '45px' }}
              />
            </div>
            <div className="step-number">1</div>
            <h3>Browse</h3>
            <p>Explore profiles of cuddly cats from trusted shelters near you.</p>
          </div>

          {/* Step 2: Meet */}
          <div className="step-card">
            <div className="circle-frame purple">
              <CatIllustration 
                primaryColor="#E2D4F0" 
                blushColor="#C1B0F4" 
                bowColor="#FAD2E1"
                hasBow={true}
                scale={0.58}
                style={{ marginTop: '45px' }}
              />
            </div>
            <div className="step-number">2</div>
            <h3>Meet</h3>
            <p>Schedule a sweet little visit and see if it's a whisker match.</p>
          </div>

          {/* Step 3: Adopt */}
          <div className="step-card">
            <div className="circle-frame green">
              <CatIllustration 
                primaryColor="#D2F1E4" 
                blushColor="#9CE3C6" 
                bowColor="#C1B0F4"
                hasBow={true}
                scale={0.58}
                style={{ marginTop: '45px' }}
              />
            </div>
            <div className="step-number">3</div>
            <h3>Adopt</h3>
            <p>Bring your new best friend home with our cozy adoption guide.</p>
          </div>
        </div>
      </div>

      {/* Happy Tails Section */}
      <div id="stories" className="happy-tails-section">
        <h2 className="tails-heading">Happy tails</h2>
        <p className="tails-subtitle">Little love notes from our adopters.</p>

        <div className="tails-steps">
          {/* Story 1 */}
          <div className="tail-card">
            <div className="heart-frame pink">
              <Heart size={20} fill="#302030" color="#302030" />
            </div>
            <p>"Adopting Mochi through Meowtopia felt like a warm hug. The team checked in even after she came home!"</p>
            <div className="tail-author">— Ayesha & Mochi</div>
          </div>

          {/* Story 2 */}
          <div className="tail-card">
            <div className="heart-frame purple">
              <Heart size={20} fill="#302030" color="#302030" />
            </div>
            <p>"So gentle, so easy. Within a week we were curled up with our new tiny roommate."</p>
            <div className="tail-author">— Mariam & Luna</div>
          </div>

          {/* Story 3 */}
          <div className="tail-card">
            <div className="heart-frame green">
              <Heart size={20} fill="#302030" color="#302030" />
            </div>
            <p>"The cutest, most professional adoption experience. We tell every friend about Meowtopia."</p>
            <div className="tail-author">— Hamza & Pesto</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
