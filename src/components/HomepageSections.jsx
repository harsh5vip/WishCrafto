import React, { useState } from 'react';
import { BookOpen, Heart, Image as ImageIcon, HelpCircle, Check, Copy } from 'lucide-react';
import './HomepageSections.css';

export default function HomepageSections() {
  const [copiedId, setCopiedId] = useState(null);
  const [cardSender, setCardSender] = useState('');
  const [cardReceiver, setCardReceiver] = useState('');
  const [cardMsg, setCardMsg] = useState('Wishing you a lifetime of happiness, peace, and endless protective love.');

  const quickActions = [
    { title: 'History', icon: BookOpen, href: '#history', desc: 'Origins & Legend of Queen Karnavati & Indra' },
    { title: 'Wishes', icon: Heart, href: '#wishes', desc: 'Heartfelt quotes & warm messages for siblings' },
    { title: 'Greeting Cards', icon: ImageIcon, href: '#greetings', desc: 'Custom digital greeting card maker' },
    { title: 'Images', icon: ImageIcon, href: '#images', desc: 'HD Rakhi illustrations & festive wallpapers' },
    { title: 'FAQ', icon: HelpCircle, href: '#faq', desc: 'Dates, muhurat timings & ritual significance' },
  ];

  const wishesList = [
    { id: 1, text: "Dear Brother, no matter the distance between us, the thread of love binding our hearts will always remain unbreakable and pure." },
    { id: 2, text: "Happy Raksha Bandhan! May the sacred thread of Rakhi protect you from all harm and shower your life with abundance and Joy." },
    { id: 3, text: "To the sister who knows all my secrets and always protects my smile—thank you for being my constant guiding star." },
    { id: 4, text: "May our cherished bond grow stronger with every passing year. Sending you warmth, blessings, and lots of affection!" },
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const faqs = [
    { q: "When is Raksha Bandhan celebrated?", a: "Raksha Bandhan is celebrated on the full moon day (Purnima) of the Hindu lunar month of Shravana." },
    { q: "What is the true significance of Rakhi?", a: "Raksha Bandhan celebrates the eternal duty, unconditional love, and sacred promise of protection between brothers and sisters." },
    { q: "What is the auspicious time (Muhurat) to tie Rakhi?", a: "Rakhi is traditionally tied during Aparahna (afternoon time) or Pradosh time. Avoid tying Rakhi during Bhadra period." },
    { q: "How can I send digital Rakhi cards online?", a: "You can use our live Greeting Card builder on this page to customize sender & receiver names, then download or share it instantly." }
  ];

  return (
    <div className="homepage-sections">
      {/* 4. Quick Action Cards */}
      <section className="section-padding container">
        <h2 className="section-title">Quick Explore</h2>
        <p className="section-subtitle">Jump straight to what you need for this festive celebration.</p>
        
        <div className="quick-cards-grid">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <a href={item.href} key={item.title} className="quick-card glass-panel">
                <div className="quick-icon-wrapper">
                  <Icon size={24} className="quick-icon" />
                </div>
                <h3 className="quick-title">{item.title}</h3>
                <p className="quick-desc">{item.desc}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. Greeting Card Preview Section */}
      <section id="greetings" className="section-padding container">
        <h2 className="section-title">Interactive Greeting Card</h2>
        <p className="section-subtitle">Personalize your Raksha Bandhan card in real-time.</p>

        <div className="card-builder-grid">
          <div className="card-form glass-panel">
            <h3 className="form-title">Customize Card</h3>
            <div className="form-group">
              <label>To (Receiver Name)</label>
              <input 
                type="text" 
                placeholder="e.g. Dearest Sister / Brother" 
                value={cardReceiver}
                onChange={(e) => setCardReceiver(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Personal Message</label>
              <textarea 
                rows="3"
                value={cardMsg}
                onChange={(e) => setCardMsg(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>From (Your Name)</label>
              <input 
                type="text" 
                placeholder="e.g. Rahul" 
                value={cardSender}
                onChange={(e) => setCardSender(e.target.value)}
              />
            </div>
          </div>

          {/* Live Preview Display */}
          <div className="card-preview-container glass-panel">
            <div className="card-preview-inner">
              <div className="card-top-motif">✦ RAKSHA BANDHAN ✦</div>
              <h4 className="card-receiver-text">{cardReceiver || 'Dearest Sibling'}</h4>
              <p className="card-msg-text">"{cardMsg}"</p>
              <div className="card-footer-line">
                <span>With Love & Blessings,</span>
                <strong>{cardSender || 'Your Loving Sibling'}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Popular Wishes Section */}
      <section id="wishes" className="section-padding container">
        <h2 className="section-title">Popular Wishes & Quotes</h2>
        <p className="section-subtitle">Copy heartwarming messages with a single click.</p>

        <div className="wishes-grid">
          {wishesList.map((wish) => (
            <div key={wish.id} className="wish-card glass-panel">
              <p className="wish-text">"{wish.text}"</p>
              <button 
                className="copy-btn"
                onClick={() => handleCopy(wish.id, wish.text)}
              >
                {copiedId === wish.id ? (
                  <>
                    <Check size={16} color="var(--accent-gold)" /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy Wish
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. History Preview Section */}
      <section id="history" className="section-padding container">
        <div className="history-box glass-panel">
          <span className="history-badge">SACRED HERITAGE</span>
          <h2 className="history-heading">The Eternal Promise of Protection</h2>
          <p className="history-text">
            Raksha Bandhan traces its sacred roots back to ancient Vedic lore and historic tales of honor. 
            From Queen Karnavati sending a sacred thread to Emperor Humayun for protection, to Lord Krishna 
            and Draupadi's bond—this day signifies an unbreakable vow of care, devotion, and lifelong loyalty.
          </p>
        </div>
      </section>

      {/* 8. Images Section */}
      <section id="images" className="section-padding container">
        <h2 className="section-title">Festive Visuals</h2>
        <p className="section-subtitle">High definition imagery showcasing the sacred thread of Rakhi.</p>
        <div className="gallery-preview-wrapper glass-panel">
          <img src="/HomepageImages/rakhi_hero.png" alt="Raksha Bandhan HD Visual" className="gallery-main-img" />
        </div>
      </section>

      {/* 9. FAQ Preview Section */}
      <section id="faq" className="section-padding container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about Raksha Bandhan traditions.</p>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item glass-panel">
              <h3 className="faq-question">{faq.q}</h3>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="footer-section">
        <div className="container footer-content">
          <div className="footer-brand">
            <span className="text-gold">✦</span> Raksha Bandhan MVP
          </div>
          <p className="footer-copy">© 2026 Raksha Bandhan Celebration Portal. Dedicated to sibling love.</p>
        </div>
      </footer>
    </div>
  );
}
