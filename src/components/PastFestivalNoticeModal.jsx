import React from 'react';
import { X, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function PastFestivalNoticeModal({
  isOpen,
  onClose,
  onNavigate,
  festivalName = 'Raksha Bandhan'
}) {
  if (!isOpen) return null;

  const handleExploreLive = () => {
    onClose();
    if (onNavigate) {
      onNavigate('/janmashtami');
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 7, 5, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          background: 'linear-gradient(145deg, #1f1610 0%, #150f0a 100%)',
          borderRadius: '24px',
          border: '1.5px solid rgba(255, 185, 54, 0.35)',
          padding: '2.2rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 185, 54, 0.15)',
          color: '#ffffff',
          textAlign: 'center'
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
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#e5e7eb',
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

        {/* Header Badge */}
        <div style={{ marginBottom: '1.2rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.4rem 1.1rem',
              borderRadius: '50px',
              background: 'rgba(255, 185, 54, 0.12)',
              border: '1px solid rgba(255, 185, 54, 0.3)',
              color: '#ffb936',
              fontSize: '0.82rem',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}
          >
            🪔 Season Concluded • सीजन समाप्त
          </span>
        </div>

        {/* Main Title */}
        <h3 style={{ fontSize: '1.45rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '0.75rem', color: '#fffdfa' }}>
          {festivalName} Card Studio Will Re-open Next Year!
        </h3>
        
        <p style={{ color: '#e78216', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>
          रक्षाबंधन 2026 का पावन पर्व समाप्त हो चुका है।
        </p>

        {/* Description Body */}
        <p style={{ color: '#d1c7b7', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          रक्षाबंधन के लिए कार्ड कस्टमाइजेशन अब अगले साल (2027 सीजन) में दोबारा सक्रिय किया जाएगा। आप अभी भी इस पेज पर राखी की पौराणिक कथाएं पढ़ सकते हैं और शुभकामनाएं कॉपी कर सकते हैं।
        </p>

        {/* Live Festival Highlight Box (Royal Purple & Gold) */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(76, 29, 149, 0.25) 100%)',
            border: '1.5px solid rgba(192, 132, 252, 0.4)',
            borderRadius: '18px',
            padding: '1.2rem',
            marginBottom: '1.8rem',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🦚</span>
            <strong style={{ color: '#fde047', fontSize: '1rem' }}>Celebrate Janmashtami 2026 (LIVE Now!)</strong>
            <span 
              style={{
                marginLeft: 'auto',
                background: '#22c55e',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '50px',
                letterSpacing: '0.5px'
              }}
            >
              LIVE
            </span>
          </div>
          <p style={{ color: '#e9d5ff', fontSize: '0.86rem', margin: 0, lineHeight: '1.5' }}>
            श्री कृष्ण जन्माष्टमी की 16+ दिव्य तस्वीरें, प्रामाणिक कथाएं और अपनी फोटो-नाम वाले कस्टम विश कार्ड्स अभी लाइव हैं!
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleExploreLive}
            style={{
              width: '100%',
              padding: '0.85rem 1.5rem',
              borderRadius: '50px',
              border: 'none',
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e78216 100%)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 25px rgba(124, 58, 237, 0.45)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <Sparkles size={18} style={{ color: '#fde047' }} /> Explore Janmashtami Cards (LIVE) <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              padding: '0.7rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'transparent',
              color: '#ded4c5',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={15} /> Browse Rakhi Archive (कथाएं व संदेश पढ़ें)
          </button>
        </div>
      </div>
    </div>
  );
}
