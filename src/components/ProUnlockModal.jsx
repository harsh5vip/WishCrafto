import React, { useState, useEffect } from 'react';
import { X, Crown, Sparkles, Check, Zap, PlayCircle, ShieldCheck, Heart, Download } from 'lucide-react';

export default function ProUnlockModal({
  isOpen,
  onClose,
  onUnlockSuccess,
  cardData = null
}) {
  const [adCountdown, setAdCountdown] = useState(null);

  useEffect(() => {
    if (adCountdown !== null && adCountdown > 0) {
      const timer = setTimeout(() => setAdCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (adCountdown === 0) {
      setAdCountdown(null);
      if (onUnlockSuccess) {
        onUnlockSuccess();
      }
    }
  }, [adCountdown, onUnlockSuccess]);

  if (!isOpen) return null;

  const handleStartUnlock = () => {
    setAdCountdown(5);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 6, 18, 0.88)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          background: 'linear-gradient(145deg, #1f142b 0%, #120b1c 100%)',
          borderRadius: '24px',
          border: '1.5px solid rgba(255, 185, 54, 0.45)',
          padding: '2.2rem 1.8rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(124, 58, 237, 0.25)',
          color: '#ffffff',
          textAlign: 'center',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* PRO Crown Badge */}
        <div style={{ marginBottom: '0.8rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 1.2rem',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, rgba(255, 185, 54, 0.2), rgba(124, 58, 237, 0.3))',
              border: '1.5px solid #ffb936',
              color: '#ffd06a',
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.8px',
              boxShadow: '0 4px 15px rgba(255, 185, 54, 0.25)'
            }}
          >
            <Crown size={16} style={{ color: '#ffb936' }} /> VIP PHOTO CARD ACCESS
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0.4rem 0 0.5rem', color: '#ffffff' }}>
          Unlock <span style={{ color: '#ffd06a' }}>Photo Card Download</span>
        </h3>
        
        <p style={{ color: '#e9d5ff', fontSize: '0.92rem', marginBottom: '1.4rem', lineHeight: '1.5' }}>
          Apni Photo aur Name ke sath <strong>4K Ultra-HD Card</strong> export karein — 100% Free &amp; Private in-browser processing!
        </p>

        {/* PRO Perks List */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          border: '1px solid rgba(255, 255, 255, 0.12)', 
          borderRadius: '16px', 
          padding: '0.9rem 1.1rem', 
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#f3e8ff' }}>
              <Check size={15} style={{ color: '#25D366' }} /> <span>Your Photo Included</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#f3e8ff' }}>
              <Check size={15} style={{ color: '#25D366' }} /> <span>4K Ultra-HD Export</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#f3e8ff' }}>
              <Check size={15} style={{ color: '#25D366' }} /> <span>VIP Festival Templates</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#f3e8ff' }}>
              <Check size={15} style={{ color: '#25D366' }} /> <span>100% Free Forever</span>
            </div>
          </div>
        </div>

        {/* Unlock Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1.5px solid rgba(255, 185, 54, 0.45)',
          borderRadius: '18px',
          padding: '1.4rem',
          marginBottom: '1.2rem',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)'
        }}>
          {adCountdown !== null ? (
            <div style={{ padding: '1rem', background: 'rgba(255, 185, 54, 0.18)', borderRadius: '14px', border: '1.5px solid #ffb936' }}>
              <p style={{ margin: '0 0 6px 0', fontWeight: '800', color: '#ffd06a', fontSize: '1.15rem' }}>
                ⏳ Rendering HD Card in {adCountdown}s...
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff' }}>
                Please wait, aapka photo card automatic render ho raha hai!
              </p>
              {/* Progress Bar Animation */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' }}>
                <div style={{
                  width: `${((5 - adCountdown) / 5) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ffd06a, #25D366)',
                  transition: 'width 1s linear'
                }} />
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.92rem', fontWeight: '700', color: '#f3e8ff', marginBottom: '1rem' }}>
                ⚡ Instant 1-Tap karein aur apna high-resolution card download karein:
              </p>
              <button
                onClick={handleStartUnlock}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ffd06a 0%, #f59e0b 50%, #d97706 100%)',
                  color: '#110d0a',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '0.95rem 1rem',
                  fontWeight: '900',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Download size={20} /> Generate &amp; Download 4K Photo Card 👉
              </button>
            </div>
          )}
        </div>

        <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.55)' }}>
          🔒 Instant Download • 100% Free &amp; Safe
        </p>

      </div>
    </div>
  );
}
