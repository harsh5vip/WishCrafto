import React from 'react';
import '../../styles/components/glasscard.css';

export default function GlassCard({ children, className = '', glow = false, hoverEffect = true, onClick }) {
  return (
    <div 
      className={`glass-card glass-panel ${hoverEffect ? 'glass-border-hover' : ''} ${glow ? 'card-glow' : ''} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {glow && <div className="glow-backing" />}
      <div className="glass-card-content">
        {children}
      </div>
    </div>
  );
}
