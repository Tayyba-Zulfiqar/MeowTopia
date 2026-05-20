import React from 'react';

const CatIllustration = ({ 
  primaryColor = '#FAD2DF', 
  blushColor = '#F381B9', 
  bowColor = '#C1B0F4',
  hasBow = false,
  scale = 1,
  flipX = false,
  style = {}
}) => {
  const transform = flipX ? `scaleX(-1)` : `none`;

  return (
    <div style={{ ...style, width: 300 * scale, height: 350 * scale, position: 'relative' }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 300 350" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform, transformOrigin: 'center' }}
      >
        {/* Tail */}
        <path 
          d="M240 250 C290 230, 320 180, 290 140 C270 110, 230 140, 240 180" 
          stroke={primaryColor} 
          strokeWidth="30" 
          strokeLinecap="round" 
        />
        
        {/* Body */}
        <ellipse cx="150" cy="240" rx="120" ry="100" fill={primaryColor} />
        
        {/* Paws */}
        <circle cx="100" cy="330" r="15" fill={primaryColor} />
        <circle cx="200" cy="330" r="15" fill={primaryColor} />
        <circle cx="95" cy="330" r="3" fill="#DFA0BA" />
        <circle cx="105" cy="330" r="3" fill="#DFA0BA" />
        <circle cx="195" cy="330" r="3" fill="#DFA0BA" />
        <circle cx="205" cy="330" r="3" fill="#DFA0BA" />

        {/* Ears */}
        <path d="M70 120 L50 40 L120 70 Z" fill={primaryColor} />
        <path d="M230 120 L250 40 L180 70 Z" fill={primaryColor} />

        {/* Head */}
        <ellipse cx="150" cy="140" rx="100" ry="85" fill={primaryColor} />

        {/* Eyes */}
        <ellipse cx="115" cy="130" rx="8" ry="14" fill="#302030" />
        <ellipse cx="185" cy="130" rx="8" ry="14" fill="#302030" />
        
        {/* Eyecatchlights */}
        <circle cx="113" cy="125" r="3" fill="white" />
        <circle cx="183" cy="125" r="3" fill="white" />

        {/* Cheeks */}
        <circle cx="85" cy="155" r="16" fill={blushColor} opacity="0.6" />
        <circle cx="215" cy="155" r="16" fill={blushColor} opacity="0.6" />

        {/* Whiskers */}
        <path d="M85 150 L55 145" stroke="#8C7A8C" strokeWidth="3" strokeLinecap="round" />
        <path d="M85 160 L55 165" stroke="#8C7A8C" strokeWidth="3" strokeLinecap="round" />
        
        <path d="M215 150 L245 145" stroke="#8C7A8C" strokeWidth="3" strokeLinecap="round" />
        <path d="M215 160 L245 165" stroke="#8C7A8C" strokeWidth="3" strokeLinecap="round" />

        {/* Mouth */}
        <path d="M150 155 L150 165" stroke="#302030" strokeWidth="4" strokeLinecap="round" />
        <path d="M135 175 Q150 185 150 165" stroke="#302030" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M165 175 Q150 185 150 165" stroke="#302030" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <path d="M145 155 Q150 160 155 155 Z" fill="#F381B9" />

        {/* Bow */}
        {hasBow && (
          <g transform="translate(85, 80)">
            <path d="M0 0 L-25 -15 L-25 15 Z" fill={bowColor} />
            <path d="M0 0 L25 -15 L25 15 Z" fill={bowColor} />
            <circle cx="0" cy="0" r="8" fill={bowColor} />
            <path d="M-5 0 C-5 5 -15 10 -15 25" stroke={bowColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M5 0 C5 5 15 10 15 25" stroke={bowColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default CatIllustration;
