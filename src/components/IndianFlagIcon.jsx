import React from 'react';

export default function IndianFlagIcon({ size = 22, className = '' }) {
  const width = size;
  const height = Math.round(size * 0.67);
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 200" 
      className={className} 
      style={{ 
        borderRadius: '3px', 
        display: 'inline-block', 
        verticalAlign: 'middle',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
      }}
    >
      {/* Saffron Top Band */}
      <rect width="300" height="66.6" fill="#FF9933"/>
      {/* White Middle Band */}
      <rect y="66.6" width="300" height="66.6" fill="#FFFFFF"/>
      {/* Green Bottom Band */}
      <rect y="133.3" width="300" height="66.6" fill="#138808"/>
      
      {/* Ashok Chakra Navy Blue Circle */}
      <circle cx="150" cy="100" r="24" fill="none" stroke="#000080" strokeWidth="4"/>
      <circle cx="150" cy="100" r="4" fill="#000080"/>
      
      {/* 24 Spokes of Ashok Chakra */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x2 = 150 + 24 * Math.cos(angle);
        const y2 = 100 + 24 * Math.sin(angle);
        return (
          <line
            key={i}
            x1="150"
            y1="100"
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}
