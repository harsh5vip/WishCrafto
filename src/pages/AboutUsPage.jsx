import React from 'react';
import { Heart, Sparkles, Shield, Smartphone, BookOpen, Users, Award, ArrowLeft, CheckCircle2 } from 'lucide-react';
import '../styles/LegalPages.css';

export default function AboutUsPage({ onNavigate }) {
  return (
    <div className="legal-page-container">
      {/* Back button */}
      <button 
        onClick={() => onNavigate('/')}
        className="legal-back-btn"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <header className="legal-header">
        <span className="legal-badge">
          <Sparkles size={14} /> Our Mission & Story
        </span>
        <h1>About WishCrafto</h1>
        <p>
          Empowering millions across India and the global diaspora to celebrate 365 days of festivals, share uplifting daily suvichar, and cherish sacred cultural heritage—with 0 MB phone storage consumed.
        </p>
        <div className="legal-meta-bar">
          <span className="legal-meta-item">
            <Heart size={14} color="#e11d48" /> Made with ❤️ for India
          </span>
          <span className="legal-meta-item">
            <Users size={14} /> Built for Families & Creators
          </span>
          <span className="legal-meta-item">
            <Shield size={14} /> Privacy-First Architecture
          </span>
        </div>
      </header>

      {/* Core Values 4-Grid */}
      <div className="about-values-grid">
        <div className="about-value-card">
          <div className="about-value-icon">
            <Smartphone size={24} />
          </div>
          <h3>0 MB Phone Space</h3>
          <p>
            No heavy 40MB app downloads. Everything runs instantly in your browser as a fast Progressive Web App (PWA).
          </p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">
            <Shield size={24} />
          </div>
          <h3>100% Client-Side Privacy</h3>
          <p>
            Your family photos are composited locally on your phone's memory. We never store or upload your personal images to any server.
          </p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">
            <BookOpen size={24} />
          </div>
          <h3>Vedic Cultural Heritage</h3>
          <p>
            Authentic mythological stories, Sanskrit shlokas, and precise astronomical Panchang muhurat timings for every sacred festival.
          </p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">
            <Award size={24} />
          </div>
          <h3>Free for Everyone</h3>
          <p>
            Whether you are a college student, an elder parent, or a local shopkeeper, our high-resolution cards are completely free to customize and share.
          </p>
        </div>
      </div>

      <div className="legal-card">
        {/* The Origin Story */}
        <div className="legal-section">
          <h2>The WishCrafto Story</h2>
          <p>
            In modern India, festival celebrations and daily greetings have moved into the digital realm. Every morning, millions of parents, grandparents, siblings, and friends exchange "Good Morning" suvichar and heartfelt festival wishes on WhatsApp and social media.
          </p>
          <p>
            However, we noticed a widespread problem: most existing greeting apps in the Indian market demanded invasive device permissions, cluttered users' smartphone storage with massive APK downloads, bombarded screens with intrusive video paywalls, or charged subscription fees just to remove an unsightly watermark. For elderly family members and users on budget smartphones with limited storage, this created unnecessary frustration.
          </p>
          <p>
            <strong>WishCrafto was created in 2026 to change that.</strong> We engineered a high-performance web platform that delivers the fluid, tactile experience of a native smartphone app directly through any mobile browser (Chrome, Safari, Samsung Internet, Firefox), taking up <strong>zero megabytes of phone storage</strong>.
          </p>
        </div>

        {/* What We Offer */}
        <div className="legal-section">
          <h2>What We Offer</h2>
          <div className="legal-highlight-box">
            <p>
              WishCrafto combines modern web canvas engineering with rich Indian cultural storytelling to offer a comprehensive celebratory suite:
            </p>
          </div>
          <ul>
            <li>
              <strong>Daily Status Feed (Crafto-Style):</strong> Fresh, inspiring Good Morning quotes, soothing Good Night wishes, and uplifting daily Hindi suvichar updated daily with 1-tap WhatsApp sharing.
            </li>
            <li>
              <strong>Drag-and-Drop Photo Customization:</strong> An intuitive, zero-fuss badge editor that allows anyone to add their photo and name directly on festive status cards in under 5 seconds.
            </li>
            <li>
              <strong>Dedicated All-Season Festival Hubs:</strong> A dynamic, year-round cultural calendar covering all major Indian and global celebrations—including <strong>Diwali &amp; Lakshmi Puja, Chhath Puja, Navratri &amp; Durga Puja, Dussehra, Karwa Chauth, Dhanteras, Christmas, New Year, Makar Sankranti, Republic Day, Maha Shivratri, Holi, Eid, Ganesh Chaturthi, Shri Krishna Janmashtami, Raksha Bandhan</strong>, and <strong>15 August Independence Day</strong>. Upcoming seasonal celebrations are dynamically spotlighted ahead of time, while past festival histories remain permanently accessible in our cultural archives.
            </li>
            <li>
              <strong>Bilingual Authentic Storytelling:</strong> Every festival on WishCrafto includes meticulously researched mythological origins, historical context (such as Rabindranath Tagore's 1905 Rakhi Unity movement), and spiritual significance presented in both Hindi and English.
            </li>
            <li>
              <strong>Local Business & Personal Modes:</strong> Options for retail shop owners, insurance advisors, and small entrepreneurs to add their shop name and contact details to connect with customers professionally on festive occasions.
            </li>
          </ul>
        </div>

        {/* Editorial Standards & Cultural Authenticity */}
        <div className="legal-section">
          <h2>Our Editorial & Cultural Standards</h2>
          <p>
            At WishCrafto, we treat Indian cultural traditions with the utmost reverence and devotion:
          </p>
          <ul>
            <li>
              <strong>Panchang & Muhurat Accuracy:</strong> Festival dates and auspicious puja timings (such as Nishita Kaal Puja Muhurat for Janmashtami or Bhadra Kaal avoidance for Raksha Bandhan) are cross-referenced with established Indian Panchang standards.
            </li>
            <li>
              <strong>Respectful Imagery:</strong> All artwork depicting Hindu deities (Lord Krishna, Lord Ganesha, Goddess Lakshmi, Lord Shiva) is curated to be sacred, artistic, and spiritually uplifting.
            </li>
            <li>
              <strong>Inclusive Indian Heritage:</strong> From national celebrations like Swatantrata Diwas (15 August) to sacred regional festivities, we celebrate the diverse unity of India's cultural mosaic.
            </li>
          </ul>
        </div>

        {/* How We Sustain Our Platform */}
        <div className="legal-section">
          <h2>How We Keep WishCrafto Free</h2>
          <p>
            WishCrafto is independently maintained and funded through non-intrusive contextual advertising, including <strong>Google AdSense</strong>. This advertising revenue allows us to maintain high-speed servers, create brand-new high-definition artwork, license festive music, and expand our festival catalog without ever charging our users a single rupee.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="legal-section" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem' }}>
          <h2>Connect With Us</h2>
          <p>
            We are always eager to hear from our community! Whether you want to suggest a new festival category, report an error, or collaborate on cultural artwork:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button 
              onClick={() => onNavigate('/contact-us')}
              className="gold-button"
              style={{ padding: '0.65rem 1.4rem' }}
            >
              Contact Our Editorial Team ➔
            </button>
            <button 
              onClick={() => onNavigate('/privacy-policy')}
              className="ghost-button"
              style={{ padding: '0.65rem 1.4rem' }}
            >
              Read Our Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
