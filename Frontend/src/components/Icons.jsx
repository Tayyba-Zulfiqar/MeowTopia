import React from 'react';

export const PawPrint = ({ size = 24, color = "currentColor", style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color} 
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8Z" />
    <path d="M19.5 12C21.433 12 23 10.433 23 8.5C23 6.567 21.433 5 19.5 5C17.567 5 16 6.567 16 8.5C16 10.433 17.567 12 19.5 12Z" />
    <path d="M4.5 12C6.433 12 8 10.433 8 8.5C8 6.567 6.433 5 4.5 5C2.567 5 1 6.567 1 8.5C1 10.433 2.567 12 4.5 12Z" />
    <path d="M12 11.5C9.33333 11.5 5.5 12 4.5 16C3.5 20 6.5 22.5 12 22.5C17.5 22.5 20.5 20 19.5 16C18.5 12 14.6667 11.5 12 11.5Z" />
  </svg>
);

export const DoublePaw = ({ size = 24, color = "currentColor" }) => (
  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
    <PawPrint size={size * 0.7} color={color} style={{ transform: 'rotate(-15deg)', marginBottom: '4px' }} />
    <PawPrint size={size} color={color} />
  </div>
);
