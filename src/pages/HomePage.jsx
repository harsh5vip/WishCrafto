import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Wand2, Heart, BookOpen, 
  Image as ImageIcon, Calendar, ChevronDown, Copy, Check, Star, Share2
} from 'lucide-react';
import { RAKHI_COUNTDOWN } from '../data/rakhiData';
import FloatingRakhiBackground from '../components/FloatingRakhiBackground';

function useCountdown(targetDateStr) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = Math.max(new Date(targetDateStr).getTime() - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return timeLeft;
}

const upcomingFestivals = [
  { name: 'Janmashtami', icon: '🦚', date: 'Coming Soon' },
  { name: 'Ganesh Chaturthi', icon: '🪔', date: 'Coming Soon' },
  { name: 'Navratri', icon: '🌸', date: 'Coming Soon' },
  { name: 'Diwali', icon: '✨', date: 'Coming Soon' },
];

const TRENDING_WISH_TEMPLATES = [
  {
    id: 't-1',
    category: '🌸 Sibling Love Special',
    tag: 'Trending #1',
    wish: 'फूलों का तारों का सबका कहना है, एक हज़ारों में मेरी बहना है! रक्षाबंधन की ढेरों शुभकामनाएं मेरी प्यारी बहना!',
    image: '/HD Wallpapers/brother_sister_rakhi_1.jpg',
    author: 'For Sister'
  },
  {
    id: 't-2',
    category: '🪔 Divine Vedic Blessing',
    tag: 'Trending #2',
    wish: 'May the holy thread of Rakhi protect you from all harm and bring boundless success, health, and joy in your life.',
    image: '/HD Wallpapers/divine_blessings_raksha_bandhan.jpg',
    author: 'Divine Wishes'
  },
  {
    id: 't-3',
    category: '👑 Royal Gold Shubh Rakhi',
    tag: 'Trending #3',
    wish: 'सूरज की किरणें, खुशियों की बहार, चांद की चांदनी, अपनों का प्यार। मुबारक हो आपको रक्षाबंधन का पावन त्योहार!',
    image: '/HD Wallpapers/royal_thali_rakhi_celebration.jpg',
    author: 'Hindi Wishes'
  }
];

const faqs = [
  {
    question: 'When is Raksha Bandhan 2026? What is the exact Shubh Muhurat for tying Rakhi?',
    answer:
      'Raksha Bandhan will be celebrated on Friday, August 28, 2026 (Shravana Purnima). The auspicious Rakhi tying muhurat begins from early sunrise at 05:57 AM and extends up to 09:48 AM IST. The Shubh Choghadiya provides an auspicious time window for brother-sister ceremonies. You can track the live countdown and auspicious muhurat right on this page.',
  },
  {
    question: 'What is Bhadra Kaal on Raksha Bandhan 2026, and why is Rakhi not tied during Bhadra?',
    answer:
      'According to Vedic astrology and Hindu scriptures, Bhadra is the daughter of Lord Surya and sister of Shani Dev. Performing auspicious rituals like tying Rakhi during Bhadra Kaal is strictly avoided as it is believed to bring discord. Fortunately, on Raksha Bandhan 2026 (August 28), Bhadra concludes before sunrise, leaving the morning completely auspicious and free from Bhadra shadow.',
  },
  {
    question: 'How can I create a personalized Raksha Bandhan photo greeting card online for free?',
    answer:
      'On WishCrafto, you can create a custom Raksha Bandhan greeting card with your own photo and names in seconds: (1) Click "Create Wish Card Free", (2) Choose your favorite festive wallpaper, (3) Upload brother/sister photo with easy drag & zoom, (4) Personalize with heartfelt Hindi/English wishes and names, and (5) Instantly download in high-definition HD or share directly on WhatsApp.',
  },
  {
    question: 'Where can I find the best Raksha Bandhan wishes and shayari in Hindi for brothers & sisters?',
    answer:
      'WishCrafto offers a curated collection of 100+ heartfelt Raksha Bandhan wishes, emotional Hindi shayari, Sanskrit shlokas, and short sweet quotes. Categories include wishes for elder brother (Bhaiya), younger sister (Behna), cute sibling banter, divine blessings, and long-distance siblings with instant 1-tap copy.',
  },
  {
    question: 'What are the authentic mythological stories and legends behind Raksha Bandhan?',
    answer:
      'The sacred festival of Raksha Bandhan is rooted in timeless Vedic lore: (1) Draupadi tying a strip of her saree on Lord Krishna’s wounded finger, after which Krishna protected her eternally, (2) Goddess Lakshmi tying Rakhi to King Bali to free Lord Vishnu from Sutala, (3) Goddess Yamuna tying Rakhi to Yamraj (God of Death) granting the boon of immortality and protection to all brothers, and (4) Goddess Sachi tying a protective amulet around Lord Indra for divine victory.',
  },
  {
    question: 'Can a sister tie Rakhi to a younger brother, elder brother, or another sister?',
    answer:
      'Yes! Raksha Bandhan is a celebration of universal love, care, and mutual protection. Sisters tie Rakhi to elder brothers, younger brothers, cousins, and even to each other (Sister-to-Sister Rakhi). In modern celebrations, Rakhi signifies lifelong emotional support and blessings across all family members.',
  },
  {
    question: 'What items should be kept in a traditional Rakhi Pooja Thali?',
    answer:
      'A sacred Rakhi Pooja Thali traditionally contains: Roli (kumkum or vermilion) and Akshat (unbroken rice grains) for the auspicious Tilak, an earthen Diya for Aarti, sacred Rakhi threads, fresh sweets (Mithai) for offering, a glass of water, and a shagun gift envelope. The sister applies the Tilak, performs Aarti, ties the Rakhi on the right wrist, and feeds sweets.',
  },
  {
    question: 'What is a Lumba Rakhi and why is it tied to the sister-in-law (Bhabhi)?',
    answer:
      'Lumba Rakhi originated in Marwari and Rajasthani traditions where sisters tie a hanging decorative Rakhi (Lumba) to their brother’s wife (Bhabhi). It symbolizes welcoming the sister-in-law as an integral pillar of the household, wishing her marital prosperity, and fostering deep affection between sisters-in-law.',
  },
  {
    question: 'How can I send virtual Rakhi greeting cards to long-distance brothers living abroad?',
    answer:
      'If your brother lives in another city or country (such as USA, UK, Canada, Australia), you can design a high-resolution personalized photo card on WishCrafto within 10 seconds. You can write a personal message, add childhood photos, and send it instantly across WhatsApp, Facebook, Instagram, or Email with zero cost.',
  },
  {
    question: 'What are the best Raksha Bandhan gift ideas for sisters in 2026?',
    answer:
      'Popular Rakhi gifts for sisters include customized photo cards, jewelry pieces, electronics, personalized keepsakes, gift vouchers, luxury sweet hampers, educational books, and traditional shagun envelopes accompanied by a sincere promise of lifelong support and love.',
  },
  {
    question: 'How can shopkeepers and local businesses create Raksha Bandhan promotional cards?',
    answer:
      'Using WishCrafto’s built-in "Business PRO Mode", local business owners, sweet shops, jewelers, clothing stores, and startups can add their shop name, company logo, phone number, and festive promotional greetings to send professional festival wishes to their customers on WhatsApp.',
  },
  {
    question: 'Can I download 4K HD Raksha Bandhan wallpapers and images for free?',
    answer:
      'Yes! WishCrafto provides free downloads of premium 4K Ultra HD Raksha Bandhan wallpapers featuring Lord Krishna, traditional Rakhi thalis, divine blessings, and aesthetic festive backgrounds perfect for mobile screens, desktop wallpapers, and WhatsApp status updates.',
  },
];

export default function HomePage({ onNavigate, onOpenCardModal }) {
  const timeLeft = useCountdown(RAKHI_COUNTDOWN.date);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleCopyWish = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="home-page" style={{ position: 'relative' }}>
      {/* Full Page Animated Moving Raksha Bandhan Festive Aura & Floating Rakhis Background */}
      <div className="rakhi-festive-animated-bg" aria-hidden="true" />
      <FloatingRakhiBackground />

      {/* ── 1. Hero Section with Live Featured Wish Card Preview (Like 123Greetings) ── */}
      <section className="hero">
        <div className="hero-bg" />
        
        <div className="hero-grid-container">
          {/* Left Column: Headlines & Actions */}
          <div className="hero-content">
            <h1>
              Celebrate the <span>Bond</span>
              <br />
              That Lasts
              <br />
              <span>Forever</span>
            </h1>

            <p>
              Create personalized Raksha Bandhan greeting cards <span className="floating-color-highlight" title="Click to Upload Photo &amp; Create Card" onClick={() => onOpenCardModal()}>📸 with your own photo &amp; name</span>, browse ready-made Hindi/English greetings, discover heartfelt wishes, download 4K HD wallpapers, and explore authentic festival stories—all in one place.
            </p>

            <div className="hero-actions">
              <button className="ghost-button" onClick={() => onOpenCardModal()}>
                <Wand2 size={18} /> Create Wish Card Free
              </button>
              <button className="ghost-button" onClick={() => onNavigate('/wishes')}>
                Explore 100+ Wishes <ArrowRight size={16} />
              </button>
            </div>

            {/* Countdown & Muhurat Card */}
            <div className="countdown-card">
              <img src="/HomepageImages/rakhi_hero.png" alt="Rakhi Festival" />
              <div className="countdown-content">
                <div className="countdown-header">
                  <strong>{RAKHI_COUNTDOWN.title}</strong>
                  <small className="muhurat-badge">{RAKHI_COUNTDOWN.muhurat}</small>
                </div>
                <div className="time-grid">
                  {Object.entries(timeLeft).map(([label, value]) => (
                    <div className="time-box" key={label}>
                      <span>{String(value).padStart(2, '0')}</span>
                      <small>{label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Featured Interactive Wish Showcase Card */}
          <div className="hero-featured-card-wrapper">
            <div 
              className="featured-live-card"
              onClick={() => onOpenCardModal('तू सलामत रहे, तू मुस्कुराती रहे, हर साल यह रक्षाबंधन हमारे प्यार को ऐसे ही बढ़ाती रहे। हैप्पी राखी 2026!', '/HD Wallpapers/krishna_draupadi_sacred_thread.jpg')}
              role="button"
              tabIndex={0}
              title="Click to customize this divine featured card with your photo & name!"
            >
              <div className="featured-card-badge">
                <Star size={13} fill="#FFD700" color="#FFD700" /> Featured Wish of the Day
              </div>

              <div className="featured-card-img-container">
                <img 
                  src="/HD Wallpapers/krishna_draupadi_sacred_thread.jpg" 
                  alt="Featured Divine Krishna Subhadra Draupadi Raksha Bandhan Card" 
                  className="featured-card-bg-img"
                />
                <div className="featured-card-gradient-overlay" />
                
                {/* Sample Photo Placeholder Badge */}
                <div className="featured-card-photo-pill">
                  <span>📸 Your Photo Here</span>
                </div>

                <div className="featured-card-content-overlay">
                  <span className="featured-card-tag">🌸 For My Lovely Sister (सुभद्रा)</span>
                  <p className="featured-card-quote">
                    "तू सलामत रहे, तू मुस्कुराती रहे, हर साल यह रक्षाबंधन हमारे प्यार को ऐसे ही बढ़ाती रहे। हैप्पी राखी 2026!"
                  </p>
                  
                  <div className="featured-card-footer">
                    <span className="featured-card-names">From: श्री कृष्ण</span>
                    <button className="featured-card-cta-btn">
                      <Wand2 size={14} /> Personalize &amp; Send ✨
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trending Wishes & Ready Card Templates Showcase (Like 123Greetings) ── */}
      <section className="section trending-wishes-section">
        <div className="trending-header">
          <div className="trending-header-left">
            <span className="eyebrow">
              <Sparkles size={14} /> TRENDING FESTIVE WISHES
            </span>
            <h2>Most Popular Raksha Bandhan Wishes &amp; Cards</h2>
            <p className="trending-subtitle">
              Choose any wish template below to personalize with your photo and names, or copy text in 1 tap.
            </p>
          </div>
          <button className="ghost-button view-all-btn" onClick={() => onNavigate('/wishes')}>
            View All 85+ Wishes <ArrowRight size={15} />
          </button>
        </div>

        <div className="trending-wishes-grid">
          {TRENDING_WISH_TEMPLATES.map((item) => (
            <div className="trending-wish-card" key={item.id}>
              {/* Card Image Thumbnail */}
              <div 
                className="trending-card-thumb-wrapper"
                onClick={() => onOpenCardModal(item.wish, item.image)}
                role="button"
                tabIndex={0}
                title="Click to customize this wish card"
              >
                <img src={item.image} alt={item.category} className="trending-card-thumb" />
                <div className="trending-card-overlay">
                  <span className="trending-tag-pill">{item.tag}</span>
                  <span className="trending-tap-hint">
                    <Wand2 size={13} /> Tap to Create Card
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="trending-card-body">
                <span className="trending-card-category">{item.category}</span>
                <p className="trending-card-text">"{item.wish}"</p>
                
                <div className="trending-card-actions">
                  <button 
                    className="btn-personalize-wish"
                    onClick={() => onOpenCardModal(item.wish, item.image)}
                  >
                    <Wand2 size={14} /> Personalize &amp; Send
                  </button>
                  
                  <button 
                    className="btn-copy-wish"
                    onClick={() => handleCopyWish(item.id, item.wish)}
                    title="Copy wish text"
                  >
                    {copiedId === item.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copiedId === item.id ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Why WishCrafto (Interactive Platform Features) ── */}
      <section className="section about-platform-section">
        <div className="about-platform-header">
          <span className="eyebrow">
            <Sparkles size={14} /> WHY WISHCRAFTO
          </span>
          <h2>Why Choose WishCrafto?</h2>
          <p className="about-platform-desc">
            WishCrafto is your all-in-one destination to create personalized festival wish cards, discover heartfelt wishes, download HD wallpapers, and explore authentic festival stories.
          </p>
        </div>

        <div className="platform-feature-cards-grid">
          {/* 1. Personalized Greeting Cards -> Opens Create Card Modal */}
          <div 
            className="platform-feature-card featured-highlight interactive-card"
            onClick={() => onOpenCardModal()}
            role="button"
            tabIndex={0}
          >
            <div className="p-card-header">
              <span className="p-card-icon">
                <span className="p-card-emoji">🎨</span>
              </span>
              <h3>Personalized Cards ✨</h3>
            </div>
            <p>Design custom greeting cards with your names &amp; wishes in seconds.</p>
            <div className="p-card-action">
              <span>Create Card Now</span>
              <ArrowRight size={13} />
            </div>
          </div>

          {/* 2. Ready-to-Share Greetings -> Navigates to Studio/Greetings */}
          <div 
            className="platform-feature-card interactive-card"
            onClick={() => onNavigate('/images')}
            role="button"
            tabIndex={0}
          >
            <div className="p-card-header">
              <span className="p-card-icon">
                <span className="p-card-emoji">💌</span>
              </span>
              <h3>Ready Greetings 🖼️</h3>
            </div>
            <p>Pick curated ready-made greetings and share instantly with loved ones.</p>
            <div className="p-card-action">
              <span>Browse Greetings</span>
              <ArrowRight size={13} />
            </div>
          </div>

          {/* 3. Wishes & Messages -> Navigates to Wishes Page */}
          <div 
            className="platform-feature-card interactive-card"
            onClick={() => onNavigate('/wishes')}
            role="button"
            tabIndex={0}
          >
            <div className="p-card-header">
              <span className="p-card-icon">
                <span className="p-card-emoji">💖</span>
              </span>
              <h3>Wishes &amp; Messages 📜</h3>
            </div>
            <p>Explore heartfelt Hindi, English &amp; Sanskrit wishes with 1-tap copy.</p>
            <div className="p-card-action">
              <span>Explore Wishes</span>
              <ArrowRight size={13} />
            </div>
          </div>

          {/* 4. Stories & Traditions -> Navigates to History Page */}
          <div 
            className="platform-feature-card interactive-card"
            onClick={() => onNavigate('/history')}
            role="button"
            tabIndex={0}
          >
            <div className="p-card-header">
              <span className="p-card-icon">
                <span className="p-card-emoji">📖</span>
              </span>
              <h3>Stories &amp; Traditions 🪔</h3>
            </div>
            <p>Explore authentic sacred legends and cultural significance of festivals.</p>
            <div className="p-card-action">
              <span>Read Stories</span>
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Frequently Asked Questions (Accordion) ── */}
      <section className="section faq-section">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-subtitle">Everything you need to know about the celebration and our platform.</p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                className={`faq-item ${isOpen ? 'active' : ''}`}
                key={faq.question}
                onClick={() => toggleFaq(index)}
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

      {/* ── 4. Upcoming Festivals ── */}
      <section className="section upcoming-festivals-section">
        <div className="upcoming-festivals-header">
          <span className="eyebrow">
            <Calendar size={14} /> Coming Soon to WishCrafto
          </span>
          <p className="upcoming-subtitle">More Indian festivals will be added soon.</p>
        </div>

        <div className="upcoming-festivals-grid">
          {upcomingFestivals.map((fest) => (
            <div className="upcoming-fest-card" key={fest.name}>
              <span className="upcoming-fest-icon">{fest.icon}</span>
              <div className="upcoming-fest-info">
                <strong>{fest.name}</strong>
                <small>{fest.date}</small>
              </div>
              <span className="upcoming-fest-badge">Coming Soon</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
