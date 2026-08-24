import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, ArrowRight, Image as ImageIcon, Heart } from 'lucide-react';
import { RAKHI_WISH_CARDS, RAKHI_WALLPAPERS } from '../data/rakhiData';
import WishCardsGrid from '../components/Studio/WishCardsGrid';
import WallpaperGrid from '../components/Studio/WallpaperGrid';

export default function StudioPage({
  onOpenCardModal,
  onNavigate,
  initialTab = 'cards',
  festivalName = 'Raksha Bandhan'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [lang, setLang] = useState('hi');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

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
          fontSize: '0.85rem',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: lang === 'hi' ? 'linear-gradient(135deg, #ffb936, #e78216)' : 'transparent',
          color: lang === 'hi' ? '#0d0907' : '#ded4c5'
        }}
      >
        🇮🇳 हिंदी
      </button>
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        style={{
          padding: '6px 18px',
          borderRadius: '50px',
          fontSize: '0.85rem',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: lang === 'en' ? 'linear-gradient(135deg, #ffb936, #e78216)' : 'transparent',
          color: lang === 'en' ? '#0d0907' : '#ded4c5'
        }}
      >
        🇬🇧 English
      </button>
    </div>
  );

  return (
    <div className="studio-page-container section">
      {/* Page Header */}
      <div className="section-heading text-center">
        <h2>
          {festivalName} <span>Wishes, Cards &amp; Wallpapers</span>
        </h2>
        <p>
          Download ready-made wishes images, create personalized greeting cards, or explore ultra HD festive wallpapers.
        </p>
      </div>

      {/* 2. Premium Segmented Tabs Section */}
      <section className="segmented-hub-section" aria-label="Content Selection">
        <div className="hub-header text-center">
          <h3 className="hub-subtitle">
            Create, download, and personalize everything for {festivalName}
          </h3>
        </div>

        <div className="segmented-cards-container">
          {/* Tab 1: Wish Cards (Default Primary Focus) */}
          <button
            className={`segmented-tab-card ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => handleTabChange('cards')}
            role="tab"
            aria-selected={activeTab === 'cards'}
          >
            <div className="tab-card-indicator" />
            <div className="tab-card-header">
              <span className="tab-icon-emoji">💌</span>
              <div className="tab-title-wrap">
                <h4>Wish Cards &amp; Greetings</h4>
                <span className="tab-count-badge">{RAKHI_WISH_CARDS.length} Ready Designs</span>
              </div>
            </div>
          </button>

          {/* Tab 2: HD Wallpapers */}
          <button
            className={`segmented-tab-card ${activeTab === 'wallpapers' ? 'active' : ''}`}
            onClick={() => handleTabChange('wallpapers')}
            role="tab"
            aria-selected={activeTab === 'wallpapers'}
          >
            <div className="tab-card-indicator" />
            <div className="tab-card-header">
              <span className="tab-icon-emoji">🖼️</span>
              <div className="tab-title-wrap">
                <h4>HD Wallpapers</h4>
                <span className="tab-count-badge">{RAKHI_WALLPAPERS.length} Ultra HD</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 3 & 4. Enclosed Content Panel Connected to Active Tab */}
      <div className={`studio-content-panel active-${activeTab}`}>
        {activeTab === 'cards' ? (
          <div className="tab-pane-view tab-pane-active">
            <div className="gallery-section-title">
              <div className="title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <h3>Ready-to-Share Wish Cards</h3>
                {renderLanguageToggle()}
              </div>
            </div>
            <WishCardsGrid
              cards={RAKHI_WISH_CARDS}
              onOpenCardModal={onOpenCardModal}
              festivalName={festivalName}
              lang={lang}
            />
          </div>
        ) : (
          <div className="tab-pane-view tab-pane-active">
            <div className="gallery-section-title">
              <div className="title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <h3>HD Wallpaper &amp; Sacred Art Collection</h3>
                {renderLanguageToggle()}
              </div>
            </div>
            <WallpaperGrid
              wallpapers={RAKHI_WALLPAPERS}
              onOpenCardModal={onOpenCardModal}
              festivalName={festivalName}
              lang={lang}
            />
          </div>
        )}
      </div>

      {/* 5. SEO Popular Search Keywords */}
      <section className="seo-popular-searches" style={{ marginTop: '3rem', marginBottom: '2rem', padding: '1.5rem', background: 'rgba(20, 15, 10, 0.6)', borderRadius: '16px', border: '1px solid rgba(255, 185, 54, 0.15)' }}>
        <h4 style={{ color: '#ffb936', fontSize: '1rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={14} /> Popular Raksha Bandhan Searches 2026
        </h4>
        <div className="seo-tags-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            'Raksha Bandhan Wishes with Images',
            'Rakhi WhatsApp Status 2026',
            'Raksha Bandhan Hindi Shayari Photo',
            'HD 4K Rakhi Wallpapers Download',
            'Lord Krishna Rakhi Greeting Cards',
            'Custom Rakhi Card Maker with Name & Photo',
            'Bhaiya Bhabhi Rakhi Wishes',
            'Sister Protection Vow Cards',
            'Free Raksha Bandhan Wallpapers HD',
            'Vedic Rakhi Shlokas Images'
          ].map((tag, idx) => (
            <span key={idx} style={{
              fontSize: '0.78rem',
              color: '#d4c7b5',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 185, 54, 0.2)',
              borderRadius: '20px',
              padding: '4px 12px'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* 6. Cross-Engagement Loop to History */}
      <div className="cross-loop-banner secondary">
        <div>
          <h3>Curious about the ancient origins of {festivalName}?</h3>
          <p>Discover the sacred stories of Krishna &amp; Draupadi, Rani Karnavati, and Lakshmi &amp; Bali.</p>
        </div>
        <button className="ghost-button" onClick={() => onNavigate('/raksha-bandhan-stories')}>
          Read Sacred History <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
