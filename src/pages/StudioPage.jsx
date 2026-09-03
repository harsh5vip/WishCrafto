import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, Heart } from 'lucide-react';
import { RAKHI_WISH_CARDS } from '../data/rakhiData';
import WishCardsGrid from '../components/Studio/WishCardsGrid';

export default function StudioPage({
  onOpenCardModal,
  onNavigate,
  festivalName = 'Raksha Bandhan'
}) {
  const [lang, setLang] = useState('hi');

  const renderLanguageToggle = () => (
    <div className="language-toggle-pill" style={{
      display: 'inline-flex',
      background: 'rgba(20, 15, 10, 0.85)',
      border: '1.5px solid rgba(255, 185, 54, 0.35)',
      borderRadius: '50px',
      padding: '4px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      <button
        className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
        onClick={() => setLang('hi')}
        style={{
          padding: '6px 18px',
          borderRadius: '50px',
          border: 'none',
          background: lang === 'hi' ? 'linear-gradient(135deg, #ffb936, #e78216)' : 'transparent',
          color: lang === 'hi' ? '#110d0a' : '#ded4c5',
          fontWeight: lang === 'hi' ? '800' : '600',
          cursor: 'pointer',
          fontSize: '0.85rem',
          transition: 'all 0.2s ease'
        }}
      >
        हिंदी (Hindi)
      </button>
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        style={{
          padding: '6px 18px',
          borderRadius: '50px',
          border: 'none',
          background: lang === 'en' ? 'linear-gradient(135deg, #ffb936, #e78216)' : 'transparent',
          color: lang === 'en' ? '#110d0a' : '#ded4c5',
          fontWeight: lang === 'en' ? '800' : '600',
          cursor: 'pointer',
          fontSize: '0.85rem',
          transition: 'all 0.2s ease'
        }}
      >
        English
      </button>
    </div>
  );

  return (
    <div className="studio-page section">
      {/* 1. Live Janmashtami Navigation Notice */}
      <div 
        style={{
          margin: '0 auto 2rem auto',
          maxWidth: '1240px',
          padding: '0.9rem 1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.95), rgba(109, 40, 217, 0.95))',
          border: '1.5px solid rgba(192, 132, 252, 0.4)',
          boxShadow: '0 8px 25px rgba(109, 40, 217, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🦚</span>
          <div>
            <p style={{ margin: 0, fontWeight: '700', color: '#f3d187', fontSize: '0.95rem' }}>
              Shri Krishna Janmashtami 2026 Live Now!
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>
              Create instant Bal Gopal greeting photo cards with your photo & name!
            </p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate && onNavigate('/janmashtami')}
          style={{
            background: 'linear-gradient(135deg, #ffb936, #e78216)',
            color: '#110d0a',
            fontWeight: '800',
            padding: '0.55rem 1.2rem',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            boxShadow: '0 4px 15px rgba(255,185,54,0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          🦚 Explore Janmashtami
        </button>
      </div>

      {/* Page Header */}
      <div className="section-heading text-center" style={{ marginBottom: '2.5rem' }}>
        <h2>
          {festivalName} <span>Wish Cards &amp; Greetings Studio</span>
        </h2>
        <p>
          Download ready-made festive wish cards or personalize greetings with your name and photo in seconds.
        </p>
      </div>

      {/* Content Panel */}
      <div className="studio-content-panel active-cards">
        <div className="tab-pane-view tab-pane-active">
          <div className="gallery-section-title">
            <div className="title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem' }}>💌</span>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: 'var(--festival-gold)' }}>
                  Ready-to-Share Wish Cards ({RAKHI_WISH_CARDS.length} Designs)
                </h3>
              </div>
              {renderLanguageToggle()}
            </div>
          </div>
          <WishCardsGrid
            cards={RAKHI_WISH_CARDS}
            onOpenCardModal={(wish, img, photo, name) => onOpenCardModal(wish, img, photo, name, 'rakhi')}
            festivalName={festivalName}
            lang={lang}
          />
        </div>
      </div>

      {/* SEO Popular Search Keywords */}
      <section className="seo-popular-searches" style={{ marginTop: '3rem', marginBottom: '2rem', padding: '1.5rem', background: 'rgba(20, 15, 10, 0.6)', borderRadius: '16px', border: '1px solid rgba(255, 185, 54, 0.15)' }}>
        <h4 style={{ color: '#ffb936', fontSize: '1rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={14} /> Popular Raksha Bandhan Searches 2026
        </h4>
        <div className="seo-tags-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            'Raksha Bandhan Wishes with Images',
            'Rakhi WhatsApp Status 2026',
            'Free Rakhi Greeting Cards',
            'Brother Sister Rakhi Photo Card',
            'Lord Krishna Raksha Bandhan Blessings',
            'Shri Ram & Avatars Rakhi Greetings',
            'Lord Shiva Mahadev Rakhi Cards',
            'Vedic Raksha Sutra Wishes'
          ].map((tag) => (
            <span 
              key={tag} 
              className="seo-tag-pill"
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '50px',
                background: 'rgba(255, 185, 54, 0.08)',
                color: 'var(--festival-gold-soft)',
                border: '1px solid rgba(255, 185, 54, 0.2)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
