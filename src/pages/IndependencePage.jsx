import React, { useState } from 'react';
import { Copy, Check, Wand2, Search, HelpCircle, ChevronLeft, ChevronRight, ChevronDown, X, Lock } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import IndianFlagIcon from '../components/IndianFlagIcon';
import { 
  INDEPENDENCE_WALLPAPERS, 
  INDEPENDENCE_HINDI_WISHES, 
  INDEPENDENCE_ENGLISH_WISHES, 
  INDEPENDENCE_FAQS 
} from '../data/independenceData';

const WISHES_PER_PAGE = 6;

export default function IndependencePage({ onOpenCardModal, onOpenRakhiModal, onNavigate }) {
  const [langTab, setLangTab] = useState('hi'); // 'hi' | 'en'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Event Notice State for Past Festival
  const [showEventNotice, setShowEventNotice] = useState(false);

  const wishes = langTab === 'hi' ? INDEPENDENCE_HINDI_WISHES : INDEPENDENCE_ENGLISH_WISHES;

  const filteredWishes = wishes.filter(w => 
    w.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWishes.length / WISHES_PER_PAGE);
  const startIndex = (currentPage - 1) * WISHES_PER_PAGE;
  const currentWishes = filteredWishes.slice(startIndex, startIndex + WISHES_PER_PAGE);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (text) => {
    const shareText = `🇮🇳 *Happy Independence Day 2026!* 🇮🇳\n\n"${text}"\n\n😱 *Maine apni photo aur naam ke sath Tiranga Card banaya hai!* \n👉 Aap bhi apna FREE Photo Card banayein yahan se:\n🔗 https://wishcrafto.com/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const openModal = () => {
    setShowEventNotice(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="independence-page" style={{ position: 'relative', padding: '2rem 1.5rem 5rem', maxWidth: '1240px', margin: '0 auto' }}>
      
      {/* Top Live Festival Janmashtami Promo Banner */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        marginBottom: '1.5rem',
        padding: '0.9rem 1.2rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(46, 16, 101, 0.95), rgba(76, 29, 149, 0.95))',
        border: '1.5px solid rgba(192, 132, 252, 0.5)',
        boxShadow: '0 8px 25px rgba(76, 29, 149, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🦚</span>
          <div>
            <p style={{ margin: 0, fontWeight: '700', color: '#FFD700', fontSize: '0.95rem' }}>
              ✨ Live Festival: Shri Krishna Janmashtami 2026 is LIVE!
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
              Apne aur Parivar ke liye custom Krishna Photo Cards &amp; 52+ Wishes abhi banayein
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('/janmashtami')}
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            fontWeight: '800',
            padding: '0.5rem 1.2rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
            transition: 'transform 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🦚 Create Janmashtami Card Now 👉
        </button>
      </div>

      {/* Full Page Animated Waving Flag Background Effect */}
      <div className="full-page-waving-flag" />

      {/* Schema.org FAQ Structured Data for Google Search Ranking */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": INDEPENDENCE_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />

      {/* SEO Hero Header */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.22) 0%, rgba(10, 10, 15, 0.92) 50%, rgba(19, 136, 8, 0.22) 100%)',
        border: '1px solid rgba(255, 153, 51, 0.4)',
        marginBottom: '3rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 18px',
          borderRadius: '999px',
          background: 'linear-gradient(90deg, #FF9933, #FFFFFF, #138808)',
          color: '#000',
          fontWeight: '800',
          fontSize: '0.85rem',
          marginBottom: '1rem',
          letterSpacing: '1px'
        }}>
          <IndianFlagIcon size={20} className="floating-tiranga-icon" />
          <span>15 AUGUST SPECIAL 2026</span>
          <IndianFlagIcon size={20} className="floating-tiranga-icon" />
        </div>

        <h1 style={{
          fontFamily: 'var(--display-font)',
          fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
          fontWeight: '700',
          margin: '0.5rem 0 1rem',
          lineHeight: '1.25',
          background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          15 August Independence Day Wishes, Quotes & Custom Photo Card Generator
        </h1>

        <p style={{ color: '#d1c7b7', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Explore <strong>250 Hindi + 250 English</strong> patriotic <strong>15 august independence day wishes</strong>, Hindi Shayari, and Slogans. 
          Create your custom <strong>wishes for independence day</strong> greeting cards with photo and name for FREE!
        </p>

        <button
          className="gold-button"
          style={{
            background: 'linear-gradient(135deg, #FF9933, #138808)',
            color: '#fff',
            fontSize: '1.1rem',
            padding: '1rem 2.5rem',
            borderRadius: '999px',
            border: 'none',
            fontWeight: 'bold',
            boxShadow: '0 8px 30px rgba(255, 153, 51, 0.45)',
            cursor: 'pointer'
          }}
          onClick={() => openModal()}
        >
          <Wand2 size={20} /> 🇮🇳 Create Swatantrata Diwas Photo Card
        </button>
      </div>

      {/* Language Tab Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => { setLangTab('hi'); setCurrentPage(1); }}
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '999px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '1px solid #FF9933',
            background: langTab === 'hi' ? '#FF9933' : 'transparent',
            color: langTab === 'hi' ? '#000' : '#FF9933',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          🇮🇳 250 Hindi Wishes & Shayari
        </button>
        <button
          onClick={() => { setLangTab('en'); setCurrentPage(1); }}
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '999px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '1px solid #138808',
            background: langTab === 'en' ? '#138808' : 'transparent',
            color: langTab === 'en' ? '#fff' : '#138808',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          🇮🇳 250 English Wishes & Quotes
        </button>
      </div>

      {/* Search Input */}
      <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem', position: 'relative' }}>
        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9e9ea7' }} />
        <input 
          type="text" 
          placeholder={`Search among 250 ${langTab === 'hi' ? 'Hindi' : 'English'} wishes...`}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          style={{
            width: '100%',
            padding: '0.9rem 1rem 0.9rem 3rem',
            borderRadius: '999px',
            border: '1px solid rgba(255,153,51,0.3)',
            background: 'rgba(15, 10, 6, 0.8)',
            color: '#fff',
            fontSize: '1rem'
          }}
        />
      </div>

      {/* Wishes Grid (Max 6 Wishes Per Page) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {currentWishes.map((wish) => (
          <div
            key={wish.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255, 153, 51, 0.25)',
              background: 'rgba(15, 10, 6, 0.85)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,153,51,0.15)', color: '#FF9933', padding: '4px 10px', borderRadius: '4px', display: 'inline-block', marginBottom: '0.8rem', fontWeight: 'bold' }}>
                {wish.category}
              </span>
              <p style={{ fontSize: '1.05rem', color: '#fff6e7', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                "{wish.text}"
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="action-btn"
                onClick={() => handleCopy(wish.id, wish.text)}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                {copiedId === wish.id ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>

              <button
                className="action-btn whatsapp-icon-btn"
                onClick={() => handleWhatsAppShare(wish.text)}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                <WhatsAppIcon size={14} /> Share
              </button>

              <button
                className="action-btn card-btn"
                onClick={() => openModal(wish.text)}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                <Wand2 size={14} /> Make Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls (Max 6 Per Page) */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '4rem' }}>
          <button 
            className="action-btn" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          
          <span style={{ color: '#FF9933', fontWeight: 'bold', padding: '0 12px' }}>
            Page {currentPage} of {totalPages} ({filteredWishes.length} Total Wishes)
          </span>

          <button 
            className="action-btn" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ── 3. Frequently Asked Questions (Accordion - Matching HomePage Style) ── */}
      <section className="section faq-section" style={{ marginTop: '2rem' }}>
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-subtitle">Everything you need to know about 15 August Independence Day wishes & Tiranga cards.</p>
        </div>

        <div className="faq-accordion">
          {INDEPENDENCE_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                className={`faq-item ${isOpen ? 'active' : ''}`}
                key={faq.question}
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                style={{ border: '1px solid rgba(255, 153, 51, 0.25)' }}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text" style={{ color: isOpen ? '#FF9933' : '#fff' }}>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p style={{ color: '#d1c7b7', lineHeight: '1.6' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Pre-Festival Raksha Bandhan Promo Banner */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        marginTop: '3rem',
        padding: '1.2rem 1.5rem',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(160, 26, 42, 0.95), rgba(70, 10, 20, 0.95))',
        border: '1px solid rgba(255, 215, 0, 0.5)',
        boxShadow: '0 12px 35px rgba(160, 26, 42, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '2rem' }}>🪔</span>
          <div>
            <h3 style={{ margin: '0 0 4px', fontWeight: '800', color: '#FFD700', fontSize: '1.1rem' }}>
              ✨ Raksha Bandhan 2026 ki Taiyari Abhi Se Karein!
            </h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>
              Bhai-Behan ke liye personalized Greeting Card aur WhatsApp Wishes free banayein.
            </p>
          </div>
        </div>
        <button 
          onClick={onOpenRakhiModal}
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            fontWeight: '800',
            padding: '0.7rem 1.6rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.92rem',
            boxShadow: '0 4px 15px rgba(255,215,0,0.35)',
            transition: 'transform 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🎁 Create Raksha Bandhan Card 👉
        </button>
      </div>

      {/* Past Festival Event Notice Modal */}
      {showEventNotice && (
        <div className="modal-backdrop" onClick={() => setShowEventNotice(false)} style={{ zIndex: 99999 }}>
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: 'linear-gradient(135deg, rgba(20, 14, 10, 0.96), rgba(10, 7, 5, 0.98))',
              border: '1.5px solid rgba(255, 185, 54, 0.5)',
              borderRadius: '22px',
              padding: '2.2rem 2rem',
              maxWidth: '480px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 185, 54, 0.2)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              position: 'relative',
              animation: 'tabContentFadeIn 0.25s ease-out'
            }}
          >
            <button
              onClick={() => setShowEventNotice(false)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>🇮🇳</div>
            
            <h3 style={{ color: '#FFD700', fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.4rem', margin: '0 0 0.5rem' }}>
              Independence Day 2026
            </h3>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 185, 54, 0.15)',
              border: '1px solid rgba(255, 185, 54, 0.4)',
              color: '#FFD700',
              fontWeight: '700',
              fontSize: '0.85rem',
              marginBottom: '1rem'
            }}>
              <Lock size={14} /> Only available at the time of event
            </div>

            <p style={{ color: '#ded4c5', fontSize: '0.9rem', lineHeight: '1.55', margin: '0 0 1.6rem' }}>
              This custom photo card creator was live for <strong>15th August 2026</strong>. Instant card customization will reopen during the next Independence Day celebration.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setShowEventNotice(false);
                  if (onNavigate) onNavigate('/janmashtami');
                }}
                className="gold-button"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
                }}
              >
                🦚 Explore Live Janmashtami 2026 Cards &amp; Wishes 👉
              </button>
              <button
                onClick={() => setShowEventNotice(false)}
                className="ghost-button"
                style={{ width: '100%', padding: '0.65rem', fontSize: '0.86rem' }}
              >
                Close &amp; Read 15 Aug Wishes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
