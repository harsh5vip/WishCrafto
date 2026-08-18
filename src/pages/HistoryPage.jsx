import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, ArrowRight, ArrowLeft, Wand2, Heart, Sparkles, 
  ChevronDown, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import { RAKHI_LEGENDS } from '../data/rakhiData';

const STORY_SLIDES = {
  'krishna-draupadi': [
    { step: 1, image: '/HistoryImages/krishna_draupadi_1.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HistoryImages/krishna_draupadi_2.png', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HistoryImages/krishna_draupadi_3.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'rani-karnavati-humayun': [
    { step: 1, image: '/HistoryImages/rani_humayun_1.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HistoryImages/rani_humayun_2.png', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HistoryImages/rani_humayun_3.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'goddess-lakshmi-king-bali': [
    { step: 1, image: '/HistoryImages/lakshmi_bali_1.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HistoryImages/lakshmi_bali_2.png', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HistoryImages/lakshmi_bali_3.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'yamraj-yamuna': [
    { step: 1, image: '/HD Wallpapers/yamraj_yamuna_rakhi_1.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HD Wallpapers/yama_yamuna_rakhi.jpg', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HD Wallpapers/divine_blessings_raksha_bandhan.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'indra-sachi': [
    { step: 1, image: '/HD Wallpapers/all_gods_blessing_rakhi_1.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HD Wallpapers/heavenly_gods_rakhi_2.jpg', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HD Wallpapers/garuda_celestial_raksha_bandhan.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ]
};

const SHORT_TITLES = {
  'krishna-draupadi': 'Krishna & Draupadi',
  'rani-karnavati-humayun': 'Rani Karnavati',
  'goddess-lakshmi-king-bali': 'Lakshmi & Bali',
  'yamraj-yamuna': 'Yamraj & Yamuna',
  'indra-sachi': 'Indra & Sachi',
};

function LegendAutoSlideshow({ 
  legend, 
  slides, 
  onNavigate, 
  onOpenCardModal, 
  prevLegend, 
  nextLegend, 
  onSelectStory 
}) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Automatic 6-Second Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <article className="legend-card" id={legend.id}>
      <div className="legend-content split-layout">
        {/* Left Side: Pure Image Slideshow */}
        <div className="split-image-side">
          <div className="pure-slideshow-container premium-frame">
            {slides.map((slide, idx) => (
              <img
                key={slide.step}
                src={slide.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = slide.fallbackImage;
                }}
                alt={`${legend.title} Scene ${slide.step}`}
                className={`pure-slide-img ${idx === activeSceneIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Story Text */}
        <div className="split-text-side">
          <span className="legend-subtitle">{legend.subtitle}</span>
          <h2>{legend.title}</h2>
          <blockquote className="legend-quote">"{legend.quote}"</blockquote>
          <p className="legend-summary">{legend.summary}</p>

          {/* Cultural Moral */}
          <div className="legend-moral">
            <strong>Cultural Essence:</strong> {legend.moral}
          </div>

          {/* Action Buttons */}
          <div className="legend-action-bar">
            <button
              className="gold-button-sm"
              onClick={() => {
                const currentImg = (slides && slides[activeSceneIndex]?.image) || (slides && slides[0]?.image) || '/HistoryImages/krishna_draupadi_1.png';
                onOpenCardModal(legend.cardWish || legend.quote, currentImg);
              }}
            >
              <Wand2 size={14} /> Create Card
            </button>
            <button
              className="ghost-button-sm"
              onClick={() => onNavigate('/wishes')}
            >
              <Heart size={14} /> Send Wish <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Story Next / Previous Navigation Footer */}
      <div className="story-card-footer-nav">
        {prevLegend ? (
          <button 
            type="button" 
            className="story-footer-nav-btn prev"
            onClick={() => onSelectStory(prevLegend.id)}
          >
            <ArrowLeft size={15} />
            <span>Prev: {SHORT_TITLES[prevLegend.id] || prevLegend.title}</span>
          </button>
        ) : <div />}

        {nextLegend ? (
          <button 
            type="button" 
            className="story-footer-nav-btn next"
            onClick={() => onSelectStory(nextLegend.id)}
          >
            <span>Next: {SHORT_TITLES[nextLegend.id] || nextLegend.title}</span>
            <ArrowRight size={15} />
          </button>
        ) : <div />}
      </div>
    </article>
  );
}

export default function HistoryPage({ onNavigate, onOpenCardModal }) {
  const [activeStoryId, setActiveStoryId] = useState(RAKHI_LEGENDS[0]?.id || 'krishna-draupadi');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const tabsNavRef = useRef(null);

  const currentIndex = RAKHI_LEGENDS.findIndex((l) => l.id === activeStoryId);
  const currentLegend = RAKHI_LEGENDS[currentIndex >= 0 ? currentIndex : 0] || RAKHI_LEGENDS[0];

  // High-Performance IntersectionObserver for 60 FPS viewport tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStoryId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    RAKHI_LEGENDS.forEach((legend) => {
      const el = document.getElementById(legend.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStory = (id) => {
    setActiveStoryId(id);
    setIsDropdownOpen(false);
    isProgrammaticScroll.current = true;

    const element = document.getElementById(id);
    if (element) {
      const navOffset = window.innerWidth <= 1024 ? 135 : 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  };

  const handlePrevStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + RAKHI_LEGENDS.length) % RAKHI_LEGENDS.length;
    scrollToStory(RAKHI_LEGENDS[prevIdx].id);
  };

  const handleNextStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % RAKHI_LEGENDS.length;
    scrollToStory(RAKHI_LEGENDS[nextIdx].id);
  };

  return (
    <div className="history-page-container section">
      {/* Header */}
      <div className="section-heading text-center">
        <span className="eyebrow">
          <BookOpen size={14} /> Sacred History &amp; Traditions
        </span>
        <h2>
          The Story of <span>Raksha Bandhan</span>
        </h2>
        <p>
          Explore the timeless stories and divine origins of India's festival of sibling protection.
        </p>
      </div>

      <div className="history-layout-wrapper">
        {/* Left Sidebar on Desktop / Interactive Sticky Story Switcher on Mobile */}
        <aside className="history-sidebar">
          <div className="sidebar-sticky">
            
            {/* Mobile / Tablet Quick Switcher Bar with Dropdown & Prev/Next Arrows */}
            <div className="mobile-story-header-bar">
              <button 
                type="button"
                className="story-arrow-btn" 
                onClick={handlePrevStory} 
                aria-label="Previous Story"
                title="Previous Story"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="story-dropdown-wrapper">
                <button 
                  type="button" 
                  className="story-dropdown-toggle"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="story-num-pill">{currentIndex + 1}/{RAKHI_LEGENDS.length}</span>
                  <span className="story-current-label">
                    {SHORT_TITLES[currentLegend.id] || currentLegend.title}
                  </span>
                  <ChevronDown size={15} className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="story-dropdown-menu">
                    {RAKHI_LEGENDS.map((legend, idx) => (
                      <button
                        key={`drop-${legend.id}`}
                        type="button"
                        className={`story-dropdown-item ${activeStoryId === legend.id ? 'active' : ''}`}
                        onClick={() => scrollToStory(legend.id)}
                      >
                        <span className="drop-index">{idx + 1}.</span>
                        <span className="drop-title">{legend.title}</span>
                        {activeStoryId === legend.id && <Check size={14} className="gold-check" />}
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
                title="Next Story"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Desktop Title */}
            <h3 className="sidebar-title desktop-only-title">✨ Sacred Stories</h3>
            
            {/* Horizontal / Vertical Tabs List (Desktop) */}
            <div className="history-tabs-container">
              <nav className="history-tabs" ref={tabsNavRef}>
                {RAKHI_LEGENDS.map((legend, idx) => (
                  <button
                    key={`tab-${legend.id}`}
                    type="button"
                    onClick={() => scrollToStory(legend.id)}
                    className={`history-tab-link ${activeStoryId === legend.id ? 'active' : ''}`}
                  >
                    <span className="tab-idx-num">{idx + 1}.</span> {SHORT_TITLES[legend.id] || legend.title}
                  </button>
                ))}
              </nav>
            </div>

          </div>
        </aside>

        {/* Main Stories List */}
        <div className="legends-list">
          {RAKHI_LEGENDS.map((legend, idx) => (
            <LegendAutoSlideshow
              key={legend.id}
              legend={legend}
              slides={STORY_SLIDES[legend.id] || STORY_SLIDES['krishna-draupadi']}
              onNavigate={onNavigate}
              onOpenCardModal={onOpenCardModal}
              prevLegend={idx > 0 ? RAKHI_LEGENDS[idx - 1] : null}
              nextLegend={idx < RAKHI_LEGENDS.length - 1 ? RAKHI_LEGENDS[idx + 1] : null}
              onSelectStory={scrollToStory}
            />
          ))}
        </div>
      </div>

      {/* Engagement Loop Banner */}
      <div className="cross-loop-banner gold-border">
        <div>
          <h3>Celebrate these timeless values today</h3>
          <p>
            Send a warm message or create a custom greeting card for your brother or sister now.
          </p>
        </div>
        <div className="banner-buttons">
          <button className="gold-button" onClick={() => {
            const currentImg = (STORY_SLIDES[currentLegend.id] && STORY_SLIDES[currentLegend.id][0]?.image) || '/HistoryImages/krishna_draupadi_1.png';
            onOpenCardModal(currentLegend.cardWish || currentLegend.quote, currentImg);
          }}>
            <Wand2 size={16} /> Create Card
          </button>
          <button
            className="ghost-button"
            onClick={() => onNavigate('/wishes')}
          >
            Explore Wishes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
