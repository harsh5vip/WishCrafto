import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, Camera, ArrowRight, ArrowLeft, 
  Share2, Heart, ChevronLeft, ChevronRight, ChevronDown, Check, Wand2, Star, ShieldCheck
} from 'lucide-react';
import { JANMASTHAMI_LEGENDS, JANMASTHAMI_STORIES } from '../data/janmashtamiStoryData';

export default function JanmashtamiStorySection({ onOpenCardModal }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openVedicChapter, setOpenVedicChapter] = useState(null);

  const currentLegend = JANMASTHAMI_LEGENDS[activeStoryIndex] || JANMASTHAMI_LEGENDS[0];
  const slides = currentLegend.slides || [];
  const currentScene = slides[activeSceneIndex] || slides[0];

  // Auto 5-Second Crossfade Loop for Scenes
  useEffect(() => {
    setActiveSceneIndex(0);
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeStoryIndex, slides.length]);

  const handleNextStory = () => {
    setActiveStoryIndex((prev) => (prev + 1) % JANMASTHAMI_LEGENDS.length);
    setActiveSceneIndex(0);
    setIsDropdownOpen(false);
  };

  const handlePrevStory = () => {
    setActiveStoryIndex((prev) => (prev - 1 + JANMASTHAMI_LEGENDS.length) % JANMASTHAMI_LEGENDS.length);
    setActiveSceneIndex(0);
    setIsDropdownOpen(false);
  };

  const handleWhatsAppShare = () => {
    const title = lang === 'hi' ? currentLegend.titleHi : currentLegend.title;
    const body = lang === 'hi' ? currentLegend.paragraphsHi.join('\n\n') : currentLegend.paragraphs.join('\n\n');
    const text = `🦚 *${title}* 🦚\n\n"${body}"\n\n✨ Read authentic Janmashtami stories & make photo cards free:\nhttps://wishcrafto.com/janmashtami`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const prevLegend = activeStoryIndex > 0 ? JANMASTHAMI_LEGENDS[activeStoryIndex - 1] : null;
  const nextLegend = activeStoryIndex < JANMASTHAMI_LEGENDS.length - 1 ? JANMASTHAMI_LEGENDS[activeStoryIndex + 1] : null;

  const vedicData = JANMASTHAMI_STORIES[lang] || JANMASTHAMI_STORIES['en'];

  return (
    <section className="janmashtami-story-section" style={{ width: '100%', margin: '1rem auto 4rem auto' }}>
      {/* ── SECTION HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.4rem 1.2rem',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '0.85rem',
            boxShadow: '0 4px 15px rgba(109, 40, 217, 0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          <Sparkles size={15} style={{ color: '#fbbf24' }} /> Sacred Krishna Lore & Legends
        </span>
        <h2 style={{ fontSize: '2.4rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.8rem', letterSpacing: '-0.5px' }}>
          {lang === 'hi' ? 'श्री कृष्ण जन्मोत्सव की अमर गाथाएं' : 'The Sacred Legends of Shri Krishna'}
        </h2>
        <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '720px', margin: '0.8rem auto 0 auto', lineHeight: '1.6' }}>
          {lang === 'hi'
            ? 'मथुरा कारागार से गोकुल की बाल लीलाओं, माखन चोरी और गोवर्धन पर्वत धारण तक की प्रामाणिक पौराणिक गाथा।'
            : 'Explore the authentic sacred stories of Lord Krishna: The miraculous prison birth, the beloved butter thief in Gokul, and the lifting of Govardhan Hill.'}
        </p>
      </div>

      {/* ── RAKHI-STYLE SPLIT LAYOUT (SIDEBAR + STORY STAGE) ── */}
      <div className="janmashtami-story-wrapper">
        
        {/* ── LEFT SIDEBAR (CHAPTER NAVIGATION) ── */}
        <aside className="janmashtami-story-sidebar">
          {/* Mobile Switcher Bar with Arrows & Dropdown */}
          <div className="mobile-story-header-bar">
            <button 
              type="button" 
              className="story-arrow-btn" 
              onClick={handlePrevStory}
              aria-label="Previous Story"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="story-dropdown-wrapper">
              <button 
                type="button" 
                className="story-dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="story-num-pill">{activeStoryIndex + 1}/3</span>
                <span className="story-current-label">
                  {lang === 'hi' ? currentLegend.shortTitleHi : currentLegend.shortTitle}
                </span>
                <ChevronDown size={15} className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="story-dropdown-menu">
                  {JANMASTHAMI_LEGENDS.map((l, idx) => (
                    <button
                      key={l.id}
                      className={`story-dropdown-item ${activeStoryIndex === idx ? 'active' : ''}`}
                      onClick={() => {
                        setActiveStoryIndex(idx);
                        setActiveSceneIndex(0);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span>{l.number}. {lang === 'hi' ? l.shortTitleHi : l.shortTitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              type="button" 
              className="story-arrow-btn" 
              onClick={handleNextStory}
              aria-label="Next Story"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="janmashtami-chapters-list">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.4rem 0.6rem 0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📖 Sacred Chapters ({JANMASTHAMI_LEGENDS.length})
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>
                Auto-Slideshow
              </span>
            </div>

            {JANMASTHAMI_LEGENDS.map((legend, idx) => {
              const isActive = activeStoryIndex === idx;
              return (
                <button
                  key={legend.id}
                  className={`janmashtami-chapter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveStoryIndex(idx);
                    setActiveSceneIndex(0);
                  }}
                >
                  <span className="janmashtami-num-badge">
                    {legend.number}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: '700', color: isActive ? '#ffffff' : '#1e1b4b', lineHeight: '1.4' }}>
                      {lang === 'hi' ? legend.shortTitleHi : legend.shortTitle}
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: isActive ? 'rgba(255,255,255,0.85)' : '#64748b' }}>
                      {lang === 'hi' ? legend.categoryHi : legend.category} • 3 Scenes
                    </p>
                  </div>
                  {isActive && <Check size={18} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />}
                </button>
              );
            })}

            {/* Quick Link to Vedic Scriptures below */}
            <div 
              style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '16px',
                background: '#faf5ff',
                border: '1px dashed #c4b5fd',
                textAlign: 'center'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700', color: '#5b21b6' }}>
                📜 Deep Vedic Chapters Below
              </p>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#6b7280' }}>
                Read full historical texts & Nishita Kaal timing
              </p>
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN STORY STAGE ── */}
        <main className="janmashtami-story-card">
          {/* Top Bar: Category Pill & Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', borderBottom: '1.5px solid #f1f5f9', paddingBottom: '1.2rem' }}>
            <span 
              style={{
                display: 'inline-block',
                padding: '0.35rem 0.9rem',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #6d28d9, #4c1d95)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.78rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              🦚 {lang === 'hi' ? currentLegend.categoryHi : currentLegend.category}
            </span>

            {/* Language Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '3px', borderRadius: '50px', border: '1px solid #e2e8f0' }}>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '0.35rem 0.9rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: lang === 'en' ? 'linear-gradient(135deg, #6d28d9, #4c1d95)' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : '#475569',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                style={{
                  padding: '0.35rem 0.9rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: lang === 'hi' ? 'linear-gradient(135deg, #6d28d9, #4c1d95)' : 'transparent',
                  color: lang === 'hi' ? '#ffffff' : '#475569',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Split Stage: Left Slideshow + Right Story Text */}
          <div className="janmashtami-story-split">
            
            {/* Left Slideshow Column */}
            <div>
              <div className="janmashtami-slideshow-box">
                {slides.map((slide, idx) => (
                  <img
                    key={slide.step}
                    src={slide.image}
                    alt={slide.caption}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = slide.fallbackImage;
                    }}
                    className={`janmashtami-slide-img ${idx === activeSceneIndex ? 'active' : ''}`}
                  />
                ))}

                {/* Bottom Step Caption Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(15, 10, 25, 0.92) 100%)',
                    padding: '2rem 1rem 0.8rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    zIndex: 2
                  }}
                >
                  <span style={{ color: '#f3d187' }}>Scene {activeSceneIndex + 1} of 3:</span> {currentScene.caption}
                </div>
              </div>

              {/* Scene Navigation Buttons */}
              <div className="janmashtami-scene-pills">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.step}
                    className={`janmashtami-scene-pill ${idx === activeSceneIndex ? 'active' : ''}`}
                    onClick={() => setActiveSceneIndex(idx)}
                  >
                    Scene {slide.step}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Story Text Column */}
            <div className="janmashtami-story-text">
              <span style={{ color: '#6d28d9', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'hi' ? currentLegend.subtitleHi : currentLegend.subtitle}
              </span>
              <h2 style={{ fontSize: '1.85rem', color: '#1e1b4b', fontWeight: '800', margin: '0.4rem 0 0.6rem 0', lineHeight: '1.3' }}>
                {lang === 'hi' ? currentLegend.titleHi : currentLegend.title}
              </h2>

              {/* Quote Blockquote */}
              <div className="janmashtami-quote-box">
                "{lang === 'hi' ? currentLegend.quoteHi : currentLegend.quote}"
              </div>

              {/* Exact Story Paragraphs */}
              <div style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.8' }}>
                {(lang === 'hi' ? currentLegend.paragraphsHi : currentLegend.paragraphs).map((p, i) => (
                  <p key={i} style={{ margin: '0 0 1rem 0' }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Cultural Essence / Moral */}
              <div className="janmashtami-moral-badge">
                <Star size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>
                  <strong>{lang === 'hi' ? 'सांस्कृतिक संदेश:' : 'Cultural Essence:'}</strong>{' '}
                  {lang === 'hi' ? currentLegend.moralHi : currentLegend.moral}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="janmashtami-story-actions">
                <button
                  onClick={() => onOpenCardModal(currentLegend.cardWish, currentScene.image)}
                  style={{
                    background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.8rem 1.5rem',
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(109, 40, 217, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Wand2 size={16} />
                  <span>{lang === 'hi' ? 'इस कथा से फोटो कार्ड बनाएं' : 'Create Card with this Legend'}</span>
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.8rem 1.4rem',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Share2 size={16} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Story Next/Prev Navigation */}
          <div className="janmashtami-footer-nav">
            {prevLegend ? (
              <button
                onClick={() => {
                  setActiveStoryIndex(activeStoryIndex - 1);
                  setActiveSceneIndex(0);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '30px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={15} /> Prev: {lang === 'hi' ? prevLegend.shortTitleHi : prevLegend.shortTitle}
              </button>
            ) : <div />}

            {nextLegend ? (
              <button
                onClick={() => {
                  setActiveStoryIndex(activeStoryIndex + 1);
                  setActiveSceneIndex(0);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'linear-gradient(135deg, #6d28d9, #4c1d95)',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '0.5rem 1.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(109, 40, 217, 0.25)'
                }}
              >
                Next: {lang === 'hi' ? nextLegend.shortTitleHi : nextLegend.shortTitle} <ArrowRight size={15} />
              </button>
            ) : <div />}
          </div>
        </main>
      </div>

      {/* ── DEEP VEDIC SCRIPTURES & PUJA ACCORDION (PREVIOUS DATA 100% PRESERVED) ── */}
      <div 
        style={{
          background: '#ffffff',
          border: '1.5px solid #ddd6fe',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 8px 30px rgba(109, 40, 217, 0.08)',
          marginTop: '3.5rem'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span 
            style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              borderRadius: '50px',
              background: '#f5f3ff',
              color: '#6d28d9',
              fontWeight: '800',
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              border: '1px solid #ddd6fe'
            }}
          >
            📜 Vedic Scriptures & Detailed History
          </span>
          <h3 style={{ fontSize: '1.8rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.6rem' }}>
            {vedicData.title}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.98rem', maxWidth: '750px', margin: '0.4rem auto 0 auto' }}>
            {vedicData.subtitle}
          </p>
        </div>

        {/* Accordion Chapter Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {vedicData.chapters.map((chap, idx) => {
            const isOpen = openVedicChapter === idx;
            return (
              <div 
                key={chap.id}
                style={{
                  border: isOpen ? '1.5px solid #a855f7' : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  background: isOpen ? '#faf5ff' : '#ffffff',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => setOpenVedicChapter(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.4rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span 
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: isOpen ? '#6d28d9' : '#f1f5f9',
                        color: isOpen ? '#ffffff' : '#6d28d9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: '800'
                      }}
                    >
                      {chap.number}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#1e1b4b' }}>
                      {chap.title}
                    </h4>
                  </div>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      color: '#6d28d9', 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s ease' 
                    }} 
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.4rem 1.4rem 1.4rem', borderTop: '1px solid #f3e8ff' }}>
                    <div style={{ background: '#f5f3ff', padding: '0.8rem 1rem', borderRadius: '10px', margin: '0.8rem 0 1rem 0' }}>
                      <p style={{ margin: 0, color: '#5b21b6', fontSize: '0.9rem', fontWeight: '600' }}>
                        💡 <strong>Summary:</strong> {chap.summary}
                      </p>
                    </div>
                    <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                      {chap.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
