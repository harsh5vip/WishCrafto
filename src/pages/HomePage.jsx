import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Wand2, Heart, BookOpen, 
  Image as ImageIcon, Calendar, ChevronDown, Copy, Check, Star, Share2, Camera, Download, Edit3, User, ShieldCheck, Zap, HeartHandshake, Globe
} from 'lucide-react';
import { DAILY_STATUS_CATEGORIES, DAILY_STATUS_FEED } from '../data/dailyStatusData';

const faqs = [
  {
    question: 'Is WishCrafto for users in India only?',
    answer:
      'No! WishCrafto is a global platform built for users worldwide (USA, UK, Canada, UAE, Australia, and India). We support all major Indian festivals (Janmashtami, Raksha Bandhan, Diwali, Navratri) as well as US & global festivals (Thanksgiving, Christmas, New Year, Halloween, Mother\'s Day, Father\'s Day) with localized photo card templates.',
  },
  {
    question: 'How can I create a custom Good Morning or Festival Card with my photo & name?',
    answer:
      'WishCrafto makes card creation instant and free without downloading any app: (1) Click "अपनी फोटो लगाएं / बदलें", (2) Select your photo with easy drag & zoom, (3) Enter your name and custom wish, and (4) Instantly share on WhatsApp or download in 4K HD.',
  },
  {
    question: 'Why does WishCrafto take 0% space on my phone compared to playstore apps?',
    answer:
      'WishCrafto is built as a next-generation Web App (PWA). You get all app features—daily suvichar, HD wallpapers, custom photo status maker, 1-tap WhatsApp sharing—directly inside your mobile browser without installing 40MB apps or consuming phone memory.',
  },
  {
    question: 'Where can I find daily Good Morning, Suvichar, and Motivational Quotes for WhatsApp?',
    answer:
      'WishCrafto updates fresh daily Good Morning greetings, inspirational Hindi suvichar, Geeta updesh, birthday wishes, and motivational status messages every single day with 1-tap WhatsApp sharing.',
  },
  {
    question: 'Can shopkeepers and business owners add their shop logo and phone number?',
    answer:
      'Yes! Local business owners, shopkeepers, jewelers, and professionals can add their company name, phone number, and shop logo to send customized festival and daily morning greetings to their clients.',
  }
];

export default function HomePage({ onNavigate, onOpenCardModal }) {
  const [activeTab, setActiveTab] = useState('good-morning');
  const [cardIndex, setCardIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Active status list & card item
  const currentFeedList = DAILY_STATUS_FEED[activeTab] || DAILY_STATUS_FEED['good-morning'];
  const currentCard = currentFeedList[cardIndex % currentFeedList.length];

  // 10-Second Auto Popup Trigger for First-Time Visitors
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenCardStudioModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('hasSeenCardStudioModal', 'true');
        onOpenCardModal();
      }, 10000); // 10 Seconds

      return () => clearTimeout(timer);
    }
  }, [onOpenCardModal]);

  const handleTabSwitch = (tabId) => {
    if (tabId === 'janmashtami') {
      onNavigate('/janmashtami');
    } else {
      setActiveTab(tabId);
      setCardIndex(0);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleWhatsAppShare = () => {
    const shareText = `*${currentCard.title}*\n\n"${currentCard.quote}"\n\n✨ Create your photo status card free on WishCrafto:\nhttps://wishcrafto.com/`;
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div 
      className="home-page" 
      style={{ 
        position: 'relative', 
        background: 'linear-gradient(180deg, #ffffff 0%, #f5f3ff 50%, #ede9fe 100%)', 
        color: '#1e1b4b', 
        minHeight: '100vh',
        marginBottom: 0,
        paddingBottom: '2rem'
      }}
    >
      {/* ── 1. Crafto-Style Main App Feed Stage ── */}
      <section className="crafto-feed-container">
        {/* Top Category Pill Bar */}
        <nav className="crafto-category-bar" aria-label="Status Categories">
          {DAILY_STATUS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`crafto-pill-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleTabSwitch(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Status Card Feed Stage (Crafto Interface) */}
        <div className="crafto-card-stage">
          <div 
            className="crafto-card-canvas"
            style={{
              backgroundImage: `url('${currentCard.image}')`
            }}
          >
            {/* Top Category Badge */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="crafto-card-badge">{currentCard.category} • {currentCard.title}</span>
            </div>

            {/* Central Quote Text */}
            <div className="crafto-card-content">
              <p className="crafto-card-quote">"{currentCard.quote}"</p>
            </div>

            {/* User Personalized Badge Overlay (Bottom Left) */}
            <div className="crafto-user-overlay" onClick={() => onOpenCardModal(currentCard.quote, currentCard.image)}>
              <div className="crafto-user-avatar">
                <User size={22} />
              </div>
              <span className="crafto-user-name">Your Photo & Name</span>
            </div>
          </div>

          {/* Crafto Action Bar */}
          <div className="crafto-action-bar">
            <div className="crafto-action-buttons">
              <button className="crafto-btn-whatsapp" onClick={handleWhatsAppShare}>
                <Share2 size={18} />
                <span>Share</span>
              </button>

              <button className="crafto-btn-download" onClick={() => onOpenCardModal(currentCard.quote, currentCard.image)}>
                <Download size={16} />
                <span>Download</span>
              </button>

              <button className="crafto-btn-edit" onClick={() => onOpenCardModal(currentCard.quote, currentCard.image)}>
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
            </div>

            {/* Primary Big CTA Button */}
            <button 
              className="crafto-btn-primary-photo"
              onClick={() => onOpenCardModal(currentCard.quote, currentCard.image)}
            >
              <Camera size={20} />
              <span>अपनी फोटो लगाएं / बदलें (Free Card Maker)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Quick Feature Grid ── */}
      <section className="section" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span 
            style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.85rem',
              boxShadow: '0 4px 12px rgba(109, 40, 217, 0.25)'
            }}
          >
            🌎 Global 365-Day Daily Status & Festival Hub
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.8rem', letterSpacing: '-0.5px' }}>
            Daily Suvichar, Global Festivals & Photo Cards (No App Needed)
          </h2>
          <p style={{ color: '#475569', maxWidth: '680px', margin: '0.8rem auto 0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            We take 0 space on your phone to share your daily inspiration, Suvichar, motivational quotes, Birthday, Good Morning and global festival messages with your photo & name.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 1rem'
          }}
        >
          <div 
            onClick={() => handleTabSwitch('good-morning')}
            style={{
              background: '#ffffff',
              border: '1px solid #ddd6fe',
              borderRadius: '20px',
              padding: '1.8rem',
              boxShadow: '0 8px 25px rgba(109, 40, 217, 0.08)',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, boxShadow 0.25s ease'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌅</div>
            <h3 style={{ color: '#1e1b4b', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>Good Morning & Suvichar</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>1000+ inspirational thoughts, Hindi suvichar, and morning greetings with 1-tap WhatsApp sharing.</p>
          </div>

          <div 
            onClick={() => onNavigate('/janmashtami')}
            style={{
              background: '#ffffff',
              border: '1px solid #ddd6fe',
              borderRadius: '20px',
              padding: '1.8rem',
              boxShadow: '0 8px 25px rgba(109, 40, 217, 0.08)',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, boxShadow 0.25s ease'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🦚</div>
            <h3 style={{ color: '#1e1b4b', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>Shri Krishna Janmashtami</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>Bal Gopal festival wishes, Geeta updesh, Nishita Kaal puja timing, and HD Krishna photo card templates.</p>
          </div>

          <div 
            onClick={() => onNavigate('/raksha-bandhan-cards')}
            style={{
              background: '#ffffff',
              border: '1px solid #ddd6fe',
              borderRadius: '20px',
              padding: '1.8rem',
              boxShadow: '0 8px 25px rgba(109, 40, 217, 0.08)',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, boxShadow 0.25s ease'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🖼️</div>
            <h3 style={{ color: '#1e1b4b', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>Card Studio & 4K Wallpapers</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>Design high-resolution photo greeting cards, add your photo & name, and browse 4K festive status backgrounds.</p>
          </div>
        </div>
      </section>

      {/* ── 3. High-Converting Global Homepage Master Article ── */}
      <section style={{ maxWidth: '1000px', margin: '2rem auto 3rem auto', padding: '0 1rem' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #c4b5fd',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            boxShadow: '0 10px 35px rgba(109, 40, 217, 0.08)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#6d28d9', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              ABOUT WISHCRAFTO GLOBAL PLATFORM
            </span>
            <h2 style={{ fontSize: '2rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.4rem' }}>
              WishCrafto: Global Daily Suvichar, Greetings & Festival Photo Card Hub
            </h2>
          </div>

          <div style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Welcome to <strong>WishCrafto</strong>, a leading global 365-day festival and daily motivation platform designed for users worldwide across the <strong>USA, UK, Canada, UAE, Australia, and India</strong>. WishCrafto empowers you to create personalized status greeting cards with <strong>your photo and name</strong> in seconds—without downloading any heavy mobile app!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', margin: '1rem 0' }}>
              <div style={{ background: '#faf5ff', padding: '1.2rem', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 0.4rem 0', fontWeight: '700', fontSize: '1.1rem' }}>🌅 Daily Good Morning & Suvichar</h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                  Start every day with positive Hindi suvichar, motivational quotes, and morning blessings personalized with your photo for WhatsApp status.
                </p>
              </div>

              <div style={{ background: '#faf5ff', padding: '1.2rem', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 0.4rem 0', fontWeight: '700', fontSize: '1.1rem' }}>🌙 Good Night & Geeta Updesh</h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                  Send peaceful Good Night messages, Srimad Bhagavad Gita wisdom, and evening greetings with your custom name badge.
                </p>
              </div>

              <div style={{ background: '#faf5ff', padding: '1.2rem', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 0.4rem 0', fontWeight: '700', fontSize: '1.1rem' }}>🌎 Global & Indian Festivals</h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                  Celebrate Indian festivals (Janmashtami, Rakhi, Diwali, Navratri) plus Global & US events (Thanksgiving, Christmas, New Year, Halloween, Mother's Day, Father's Day).
                </p>
              </div>

              <div style={{ background: '#faf5ff', padding: '1.2rem', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                <h4 style={{ color: '#1e1b4b', margin: '0 0 0.4rem 0', fontWeight: '700', fontSize: '1.1rem' }}>📱 0% Phone Memory PWA</h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                  Enjoy all features of a mobile app directly in your browser. Takes 0 MB memory space on your phone!
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                onClick={() => onOpenCardModal("शुभ प्रभात! आपका दिन मंगलमय हो! 🌅✨", "/HD Wallpapers/krishna_flute_divine_wishes.jpg")}
                style={{
                  background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.85rem 2rem',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 4px 18px rgba(109, 40, 217, 0.3)'
                }}
              >
                <Camera size={20} />
                <span>अपनी फोटो लगाएं / बदलें (Free Card Maker)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. High-Contrast FAQ Section ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto 2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span 
            style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              background: 'rgba(109, 40, 217, 0.12)',
              color: '#6d28d9',
              fontWeight: '700',
              fontSize: '0.85rem',
              border: '1px solid rgba(109, 40, 217, 0.25)'
            }}
          >
            💬 Frequently Asked Questions
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.8rem' }}>Everything You Need to Know</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                border: '1px solid #c4b5fd',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 4px 15px rgba(109, 40, 217, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onClick={() => toggleFaq(index)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <h3 style={{ color: '#1e1b4b', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{faq.question}</h3>
                <ChevronDown 
                  size={22} 
                  style={{ 
                    color: '#6d28d9', 
                    transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0
                  }} 
                />
              </div>
              {openFaqIndex === index && (
                <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid #f1f5f9' }}>
                  <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.6', margin: 0 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
