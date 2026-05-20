import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Mail, Lock, Heart } from 'lucide-react';
import { loginSchema, signupSchema } from '../validations/authSchema';
import CatIllustration from '../components/CatIllustration';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.mode !== 'signup');
  const { login, signup } = useContext(AuthContext);
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    mode: 'onTouched'
  });

  // Track location mode state changes
  useEffect(() => {
    if (location.state?.mode) {
      setIsLogin(location.state.mode !== 'signup');
    }
  }, [location.state]);

  // Reset form errors/fields when toggling between login and signup
  useEffect(() => {
    reset();
    setAuthError('');
  }, [isLogin, reset]);

  const onSubmit = (data) => {
    setAuthError('');
    if (isLogin) {
      const result = login(data.email, data.password);
      if (result.success) {
        navigate('/cats');
      } else {
        setAuthError(result.message);
      }
    } else {
      const result = signup(data.email, data.password);
      if (result.success) {
        navigate('/cats');
      } else {
        setAuthError(result.message);
      }
    }
  };

  return (
    <div className="auth-container">
      {/* Left Column: Landing Page Pink Cat */}
      <div className="auth-graphic-side">
        <CatIllustration
          primaryColor="#FAD2E1"
          blushColor="#F381B9"
          bowColor="#C1B0F4"
          hasBow={true}
          scale={1.2}
          style={{ position: 'relative', zIndex: 2, marginRight: 'auto', marginLeft: '160px', marginTop: '-30px' }}
        />
      </div>

      {/* Right Column: Facebook Style Glass Form */}
      <div className="auth-form-side">
        <div className="glass-panel auth-form">
          <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', fontWeight: 800 }}>
            {isLogin ? 'Welcome Back' : 'Join MeowTopia'}
          </h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px', fontSize: '1rem', fontWeight: 500 }}>
            {isLogin ? 'Sign in to find your new best friend.' : 'Create an account to adopt a cat.'}
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {authError && (
              <div style={{ 
                color: '#E63946', 
                background: '#FCE8E6', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                fontSize: '0.95rem', 
                marginBottom: '20px', 
                fontWeight: 600, 
                border: '1px solid rgba(230, 57, 70, 0.15)',
                textAlign: 'left'
              }}>
                {authError}
              </div>
            )}
            {/* Email Input Group */}
            <div className="input-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--primary-pink)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ paddingLeft: '44px' }}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p style={{ color: '#E63946', fontSize: '0.85rem', marginTop: '6px', fontWeight: 600 }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input Group */}
            <div className="input-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--primary-pink)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  style={{ paddingLeft: '44px' }}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p style={{ color: '#E63946', fontSize: '0.85rem', marginTop: '6px', fontWeight: 600 }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}>
              <Heart size={20} fill="white" />
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div style={{ marginTop: '24px' }}>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: 'var(--primary-pink)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
