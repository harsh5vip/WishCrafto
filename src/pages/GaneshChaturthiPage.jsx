import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Share2, Download, Edit3, Heart, ChevronDown, ChevronLeft, ChevronRight, 
  Sparkles, BookOpen, Wand2, ArrowRight, Check, Star, Copy 
} from 'lucide-react';
import { 
  GANESH_LEGENDS, 
  GANESH_STORIES, 
  GANESH_HISTORY_WALLPAPERS, 
  GANESH_CARD_WISHES, 
  GANESH_FAQS_HI, 
  GANESH_FAQS_EN 
} from '../data/ganeshChaturthiStoryData';
import WhatsAppIcon from '../components/WhatsAppIcon';
import './History.css';

const SHORT_TITLES = {
  hi: {
    'ganesh-birth': 'गणेश रचना व गजमुख',
    'ganesh-wisdom': 'कार्तिकेय संग प्रतियोगिता',
    'ganesh-mahabharata': 'महाभारत व एकदंत त्याग',
    'full-history-article': 'सम्पूर्ण इतिहास'
  },
  en: {
    'ganesh-birth': 'Creation & Elephant Head',
    'ganesh-wisdom': 'Wisdom Contest',
    'ganesh-mahabharata': 'Mahabharata & Ekadanta',
    'full-history-article': 'Ganesh History'
  }
};

function LegendAutoSlideshow({ 
  legend, 
  slides, 
  onNavigate, 
  onOpenCardModal,
  lang = 'hi'
}) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Automatic 6-Second Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const isHi = lang === 'hi';
  const displayTitle = isHi && legend.titleHi ? legend.titleHi : legend.title;
  const displaySubtitle = isHi && legend.subtitleHi ? legend.subtitleHi : legend.subtitle;
  const displayQuote = isHi && legend.quoteHi ? legend.quoteHi : legend.quote;
  const displayParagraphs = isHi && legend.paragraphsHi ? legend.paragraphsHi : legend.paragraphs;
  const displayMoral = isHi && legend.moralHi ? legend.moralHi : legend.moral;
  const displayCardWish = isHi && legend.cardWish ? legend.cardWish : (legend.quoteHi || legend.quote);

  const handleShare = () => {
    let sender = '';
    try { sender = (localStorage.getItem('wishcrafto_user_name') || '').trim(); } catch {}
    const introLine = sender
      ? `✨ *${sender} ji* ne aapke liye Shri Ganesh Chaturthi ki pavitra katha bheji hai:`
      : `✨ Shri Ganesh Chaturthi ki pavitra katha:`;
    const titlePart = `*${displayTitle}.....*`;
    const readPart = `\n📖 पूरी कथा यहाँ पढ़ें 👇\n🔗 https://wishcrafto.com/ganesh-chaturthi#${legend.id}`;
    const ctaPart = `\n\n👉 *Aap bhi apna personal photo status yahan banayein:*\n🔗 https://wishcrafto.com/ganesh-chaturthi`;
    const text = `${introLine}\n\n${titlePart}${readPart}${ctaPart}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <article className="legend-card janmashtami-purple-card" id={legend.id}>
      <div className="legend-content split-layout">
        {/* Left Side: Pure Image Slideshow (Exact 500px aspect-ratio 1:1) */}
        <div className="split-image-side">
          <div className="pure-slideshow-container premium-frame">
            {slides.map((slide, idx) => (
              <img
                key={slide.step || idx}
                src={slide.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = slide.fallbackImage;
                }}
                alt={`${displayTitle} Scene ${slide.step || idx + 1}`}
                className={`pure-slide-img ${idx === activeSceneIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Story Text Aligned with Image */}
        <div className="split-text-side">
          <span className="legend-subtitle">{displaySubtitle}</span>
          <h2>{displayTitle}</h2>
          <blockquote className="legend-quote">"{displayQuote}"</blockquote>
          
          <div style={{ marginBottom: '1.1rem' }}>
            {displayParagraphs.map((p, i) => (
              <p key={i} className="legend-summary" style={{ margin: '0 0 0.85rem 0' }}>
                {p}
              </p>
            ))}
          </div>

          {/* Cultural Moral */}
          <div className="legend-moral">
            <strong>{isHi ? 'धार्मिक व आध्यात्मिक सार:' : 'Spiritual Essence:'}</strong> {displayMoral}
          </div>

          {/* Action Buttons */}
          <div className="legend-action-bar">
            <button
              className="gold-button-sm"
              onClick={() => {
                const currentImg = (slides && slides[activeSceneIndex]?.image) || (slides && slides[0]?.image) || '/HistoryImagesGanesh/Ganesh_Birth1.png';
                onOpenCardModal(displayCardWish, currentImg, null, '', 'ganesh');
              }}
            >
              <Wand2 size={13} /> {isHi ? 'कार्ड बनाएं' : 'Create Card'}
            </button>
            <button
              className="explore-wishes-btn-sm"
              onClick={() => onNavigate('/?tab=ganesh-chaturthi')}
              title="Explore all Ganesh Chaturthi status wishes on Home"
            >
              <Sparkles size={13} style={{ color: '#fde047' }} /> {isHi ? 'विशेज' : 'Wishes'}
            </button>
            <button
              className="whatsapp-btn-sm"
              onClick={handleShare}
            >
              <WhatsAppIcon size={14} /> {isHi ? 'शेयर' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GaneshChaturthiPage({ onNavigate, onOpenCardModal }) {
  const [activeStoryId, setActiveStoryId] = useState(GANESH_LEGENDS[0]?.id || 'ganesh-birth');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [articleLang, setArticleLang] = useState('hi');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const isProgrammaticScroll = useRef(false);
  const tabsNavRef = useRef(null);

  const ALL_CHAPTER_IDS = [
    ...GANESH_LEGENDS.map((l) => l.id),
    'full-history-article'
  ];

  const currentChapterIndex = ALL_CHAPTER_IDS.indexOf(activeStoryId);
  const activeIndex = currentChapterIndex >= 0 ? currentChapterIndex : 0;
  const currentLegend = GANESH_LEGENDS.find((l) => l.id === activeStoryId) || GANESH_LEGENDS[0];

  // High-Performance IntersectionObserver for viewport tracking
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

    GANESH_LEGENDS.forEach((legend) => {
      const el = document.getElementById(legend.id);
      if (el) observer.observe(el);
    });

    const fullArticleEl = document.getElementById('full-history-article');
    if (fullArticleEl) observer.observe(fullArticleEl);

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
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  };

  const handlePrevStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const prevIdx = (activeIndex - 1 + ALL_CHAPTER_IDS.length) % ALL_CHAPTER_IDS.length;
    scrollToStory(ALL_CHAPTER_IDS[prevIdx]);
  };

  const handleNextStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (activeIndex + 1) % ALL_CHAPTER_IDS.length;
    scrollToStory(ALL_CHAPTER_IDS[nextIdx]);
  };

  const handleWhatsApp = (wish) => {
    let sender = '';
    try { sender = (localStorage.getItem('wishcrafto_user_name') || '').trim(); } catch {}
    const introLine = sender
      ? `✨ *${sender} ji* ne aapke liye khaas Ganesh Chaturthi sandesh bheja hai:`
      : `✨ Aapke liye ek khaas Ganesh Chaturthi sandesh bheja gaya hai:`;
    const titlePart = `🐘 *Shri Ganesh Chaturthi 2026!* 🐘`;
    const quotePart = `\n\n"${wish}"`;
    const ctaPart = `\n\n👉 *Aap bhi apna photo status yahan banayein:*\n🔗 https://wishcrafto.com/ganesh-chaturthi`;
    const text = `${introLine}\n\n${titlePart}${quotePart}${ctaPart}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const vedicData = GANESH_STORIES[articleLang] || GANESH_STORIES['en'];
  const activeFaqs = articleLang === 'hi' ? GANESH_FAQS_HI : GANESH_FAQS_EN;

  return (
    <div className="history-page janmashtami-history-theme">
      <div className="history-page-container section" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header - White Background with Royal Purple Accent & Language Switcher */}
        <div className="section-heading text-center" style={{ marginBottom: '2.5rem' }}>
          {/* Top Language Switcher Bar */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#6d28d9' }}>
              {articleLang === 'hi' ? 'कथा भाषा:' : 'Story Language:'}
            </span>
            <div className="article-lang-switcher" style={{ margin: 0 }}>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'hi' ? 'active' : ''}`}
                onClick={() => setArticleLang('hi')}
              >
                🇮🇳 हिंदी
              </button>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'en' ? 'active' : ''}`}
                onClick={() => setArticleLang('en')}
              >
                English
              </button>
            </div>
          </div>

          <h1 style={{ color: '#1e1035' }}>
            {articleLang === 'hi' ? (
              <>श्री गणेश चतुर्थी का <span style={{ color: '#7c3aed', fontStyle: 'italic' }}>पावन इतिहास व कथाएं</span></>
            ) : (
              <>History and Origin of <span style={{ color: '#7c3aed', fontStyle: 'italic' }}>Ganesh Chaturthi</span></>
            )}
          </h1>
          <p style={{ color: '#4b5563', maxWidth: '720px', margin: '0.6rem auto 0', lineHeight: '1.6' }}>
            {articleLang === 'hi' 
              ? 'माता पार्वती द्वारा चंदन लेप से बालक गणेश का निर्माण, द्वार रक्षा, गजमुख का वरदान, कार्तिकेय संग ब्रह्मांड परिक्रमा और महाभारत लेखन में एकदंत त्याग की प्रामाणिक गाथा।'
              : 'Discover why we celebrate Ganesh Chaturthi: From Parvati\'s sandalwood creation & the divine elephant head to the wisdom race with Kartikeya and the sacred Ekadanta Mahabharata sacrifice.'}
          </p>
        </div>

        {/* Layout Wrapper: Left Sticky Sidebar + Right Legends List */}
        <div className="history-layout-wrapper">
          
          {/* Left Sidebar on Desktop / Interactive Sticky Story Switcher on Mobile */}
          <aside className="history-sidebar">
            <div className="sidebar-sticky janmashtami-purple-sticky">
              
              {/* Mobile / Tablet Quick Switcher Bar with Prev/Next Arrows */}
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

                <div className="story-title-display">
                  <span className="story-num-pill">
                    {`${activeIndex + 1}/${ALL_CHAPTER_IDS.length}`}
                  </span>
                  <span className="story-current-label">
                    {activeStoryId === 'full-history-article' 
                      ? (articleLang === 'hi' ? 'सम्पूर्ण इतिहास' : 'Ganesh History') 
                      : (SHORT_TITLES[articleLang]?.[currentLegend?.id] || currentLegend?.titleHi || currentLegend?.title)}
                  </span>
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
              <h3 className="sidebar-title desktop-only-title">
                {articleLang === 'hi' ? '🐘 पावन गाथाएं' : '🐘 Sacred Legends'}
              </h3>
              
              {/* Vertical Tabs List (Desktop) on Left */}
              <div className="history-tabs-container">
                <nav className="history-tabs" ref={tabsNavRef}>
                  {GANESH_LEGENDS.map((legend, idx) => (
                    <button
                      key={`tab-${legend.id}`}
                      type="button"
                      onClick={() => scrollToStory(legend.id)}
                      className={`history-tab-link ${activeStoryId === legend.id ? 'active' : ''}`}
                    >
                      <span className="tab-idx-num">{idx + 1}.</span> {SHORT_TITLES[articleLang]?.[legend.id] || (articleLang === 'hi' ? legend.titleHi : legend.title)}
                    </button>
                  ))}
                  <button
                    key="tab-full-history-article"
                    type="button"
                    onClick={() => scrollToStory('full-history-article')}
                    className={`history-tab-link ${activeStoryId === 'full-history-article' ? 'active' : ''}`}
                  >
                    <span className="tab-idx-num">4.</span> {articleLang === 'hi' ? 'सम्पूर्ण इतिहास' : 'Ganesh History'}
                  </button>
                </nav>
              </div>

            </div>
          </aside>

          {/* Main Stories List: ALL 3 STORIES RENDERED IN FEED */}
          <div className="legends-list">
            {GANESH_LEGENDS.map((legend) => (
              <LegendAutoSlideshow
                key={legend.id}
                legend={legend}
                slides={legend.slides}
                onNavigate={onNavigate}
                onOpenCardModal={onOpenCardModal}
                lang={articleLang}
              />
            ))}
          </div>

        </div>

        {/* ── EDITORIAL PILLAR ARTICLE (EXACT 1040px OPEN CHAPTER STRUCTURE) ── */}
        <article 
          className="history-editorial-pillar" 
          id="full-history-article"
          aria-label="Editorial Article on Shri Ganesh Chaturthi History"
        >
          {/* Utility Bar (Lang Toggle) */}
          <div className="article-utility-bar">
            <div className="article-lang-switcher">
              <span className="lang-label">Language / भाषा:</span>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'hi' ? 'active' : ''}`}
                onClick={() => setArticleLang('hi')}
              >
                हिंदी
              </button>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'en' ? 'active' : ''}`}
                onClick={() => setArticleLang('en')}
              >
                English
              </button>
            </div>
          </div>

          <header className="editorial-header">
            <h2>
              {articleLang === 'hi' ? (
                <>श्री गणेश चतुर्थी का संपूर्ण इतिहास, वैदिक उत्पत्ति व <span>विनायक स्थापना कथा</span></>
              ) : (
                <>The Complete History, Vedic Origins &amp; <span>Significance of Ganesh Chaturthi</span></>
              )}
            </h2>
            <p className="editorial-read-time">
              📖 {articleLang === 'hi' ? '7 मिनट का गहन अध्ययन • शिव पुराण व ऐतिहासिक अभिलेखों से शोधित' : '7 Min In-Depth Read • Researched from Shiva Purana & Vedic Scriptures'}
            </p>
          </header>

          {/* Open Editorial Chapters */}
          {vedicData.chapters.map((chap) => (
            <section className="editorial-chapter" key={chap.id}>
              <h3>{chap.title}</h3>
              <p style={{ fontStyle: 'italic', color: '#6b7280', marginBottom: '0.9rem' }}>
                <strong>{articleLang === 'hi' ? 'संक्षेप:' : 'Summary:'}</strong> {chap.summary}
              </p>
              
              {chap.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} style={{ whiteSpace: 'pre-line' }}>{paragraph}</p>
              ))}

              {/* Shloka Card for Ganesh Puja */}
              {chap.id === 'gajmukh-prathama-pujya' && (
                <div className="shloka-card">
                  <div className="shloka-text">
                    वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
                    निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                  </div>
                  <div className="shloka-meaning">
                    "हे टेढ़ी सूंड वाले, विशालकाय, करोड़ों सूर्यों के समान दिव्य तेजस्वी प्रभु! मेरे समस्त कार्यों को सदा बिना किसी विघ्न-बाधा के निर्विघ्न संपन्न करें।"
                  </div>
                </div>
              )}

              {/* Shloka Card for Ekadanta */}
              {chap.id === 'mahabharata-ekadanta' && (
                <div className="shloka-card">
                  <div className="shloka-text">
                    एकदन्ताय विद्महे वक्रतुण्डाय धीमहि।<br />
                    तन्नो दन्तिः प्रचोदयात्॥
                  </div>
                  <div className="shloka-meaning">
                    "हम उन एकदंत वाले गणाध्यक्ष का ध्यान करते हैं जिनकी सूंड वक्र है। वे विघ्नहर्ता भगवान गणेश हमारी बुद्धि और चेतना को सन्मार्ग की ओर प्रेरित करें।"
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Frequently Asked Questions */}
          <section className="faq-section" style={{ padding: '1.5rem 0 0 0', marginTop: '2.5rem', borderTop: '2px solid #f3e8ff' }}>
            <div className="faq-header" style={{ marginBottom: '1.5rem' }}>
              <h2>{articleLang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}</h2>
              <p className="faq-subtitle">
                {articleLang === 'hi' ? 'श्री गणेश चतुर्थी के इतिहास, शुभ मुहूर्त व परंपरा से जुड़ी मुख्य जानकारियों के उत्तर।' : 'Key insights and scriptural facts about Shri Ganesh Chaturthi.'}
              </p>
            </div>
            <div className="faq-accordion">
              {activeFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                    key={faq.question}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </article>

        {/* ── ENGAGEMENT LOOP BANNER ── */}
        <div className="cross-loop-banner">
          <div>
            <h3>Celebrate Ganesh Chaturthi 2026 with Devotion</h3>
            <p>
              Send heartfelt blessings or create a custom Lord Ganesha greeting photo card with your family name now.
            </p>
          </div>
          <div className="banner-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <button className="gold-button" onClick={() => {
              onOpenCardModal("वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥ गणेश चतुर्थी 2026 की हार्दिक शुभकामनाएं! 🐘✨", "/HistoryImagesGanesh/Ganesh_Birth1.png", null, '', 'ganesh');
            }}>
              <Wand2 size={16} /> Create Photo Card
            </button>
            <button
              className="gold-button"
              style={{ 
                background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', 
                color: '#ffffff', 
                border: 'none',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)'
              }}
              onClick={() => onNavigate('/?tab=ganesh-chaturthi')}
            >
              <Sparkles size={16} style={{ color: '#fde047' }} /> Explore Wishes
            </button>
            <button
              className="ghost-button"
              style={{
                background: '#25D366',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => handleWhatsApp("वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥ गणेश चतुर्थी 2026 की हार्दिक शुभकामनाएं! 🐘✨")}
            >
              <WhatsAppIcon size={18} /> WhatsApp Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
