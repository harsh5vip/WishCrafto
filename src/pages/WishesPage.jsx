import React, { useState } from 'react';
import { Copy, Check, Sparkles, Heart, ArrowRight, Wand2, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { RAKHI_WISHES, WISHES_CATEGORIES } from '../data/rakhiData';

const WISHES_PER_PAGE = 6;

export default function WishesPage({ onOpenCardModal, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('hindi');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const filteredWishes = activeCategory === 'all'
    ? RAKHI_WISHES
    : RAKHI_WISHES.filter((w) => w.category === activeCategory);

  const totalPages = Math.ceil(filteredWishes.length / WISHES_PER_PAGE);

  // Reset to page 1 whenever category changes
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const el = document.querySelector('.wishes-page-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startIndex = (currentPage - 1) * WISHES_PER_PAGE;
  const currentWishes = filteredWishes.slice(startIndex, startIndex + WISHES_PER_PAGE);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (text) => {
    const siteUrl = 'https://wishcrafto.com';
    const viralText = `🌸 *Happy Raksha Bandhan 2026!* 🪔\n\n"${text}"\n\n👉 *Apna personalized photo wish card yahan se banayein:*\n🔗 ${siteUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(viralText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="wishes-page-container section">
      {/* Past Festival Concluded Banner (Unlocking 2027) */}
      <div 
        style={{
          margin: '0 auto 1.5rem auto',
          maxWidth: '1240px',
          padding: '0.9rem 1.2rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.95), rgba(76, 29, 149, 0.95))',
          border: '1px solid rgba(196, 181, 253, 0.5)',
          boxShadow: '0 8px 25px rgba(109, 40, 217, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🪔</span>
          <div>
            <p style={{ margin: 0, fontWeight: '700', color: '#f3d187', fontSize: '0.95rem' }}>
              ✨ Raksha Bandhan 2026 Concluded! Next 2027 Festivities Unlocking Soon
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>
              Abhi LIVE Festival 🦚 Shri Krishna Janmashtami 2026 ke Photo Cards banayein!
            </p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate && onNavigate('/janmashtami')}
          style={{
            background: 'linear-gradient(135deg, #ffb936, #e78216)',
            color: '#110d0a',
            fontWeight: '800',
            padding: '0.5rem 1.2rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            boxShadow: '0 4px 15px rgba(255,185,54,0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          🦚 Live Janmashtami 2026
        </button>
      </div>
      
      {/* Header */}
      <div className="section-heading text-center">
        <h1>Happy Raksha Bandhan <span>Wishes &amp; Quotes 2026</span></h1>
        <p>Best Raksha Bandhan wishes, Hindi shayari, brother-sister emotional quotes &amp; Sanskrit blessings for WhatsApp.</p>
      </div>

      {/* Category Pills */}
      <div className="category-pills-bar">
        {WISHES_CATEGORIES.map((cat) => {
          const count = cat.id === 'all'
            ? RAKHI_WISHES.length
            : RAKHI_WISHES.filter((w) => w.category === cat.id).length;
          return (
            <button
              key={cat.id}
              className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Wishes Grid */}
      <div className="wishes-grid">
        {currentWishes.map((wish) => (
          <article className="wish-card-premium" key={wish.id}>
            <div className="wish-card-header">
              <span className="wish-tag">{wish.tag}</span>
              <small className="sanskrit-text">{wish.sanskrit}</small>
            </div>
            <p className="wish-text">"{wish.text}"</p>
            
            <div className="wish-card-actions">
              <button
                className={`action-btn copy-btn ${copiedId === wish.id ? 'copied' : ''}`}
                onClick={() => handleCopy(wish.id, wish.text)}
              >
                {copiedId === wish.id ? (
                  <>
                    <Check size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Wish
                  </>
                )}
              </button>

              <button
                className="action-btn whatsapp-icon-btn"
                onClick={() => handleWhatsAppShare(wish.text)}
              >
                <WhatsAppIcon size={14} /> WhatsApp
              </button>

              <button
                className="action-btn card-btn"
                onClick={() => onOpenCardModal(wish.text)}
              >
                <Wand2 size={14} /> Create Card
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="wishes-pagination" aria-label="Wishes Pagination">
          <button
            className="pagination-btn pagination-prev"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <div className="pagination-numbers">
            {(() => {
              const pages = [];
              const maxVisible = 5; // e.g. 1 2 3 ... 85
              
              if (totalPages <= maxVisible) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                let start = Math.max(1, currentPage - 1);
                let end = Math.min(totalPages, currentPage + 1);
                
                if (currentPage <= 2) {
                  start = 1;
                  end = 3;
                } else if (currentPage >= totalPages - 1) {
                  start = totalPages - 2;
                  end = totalPages;
                }
                
                if (start > 1) {
                  pages.push(1);
                  if (start > 2) pages.push('...');
                }
                
                for (let i = start; i <= end; i++) pages.push(i);
                
                if (end < totalPages) {
                  if (end < totalPages - 1) pages.push('...');
                  pages.push(totalPages);
                }
              }
              
              return pages.map((pageNum, index) => {
                if (pageNum === '...') {
                  return <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>;
                }
                return (
                  <button
                    key={pageNum}
                    className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              });
            })()}
          </div>

          <button
            className="pagination-btn pagination-next"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
          >
            Next <ChevronRight size={16} />
          </button>
        </nav>
      )}

      {/* Cross-Engagement Banner */}
      <div className="cross-loop-banner">
        <div>
          <h3>Want to turn a wish into a personalized greeting card?</h3>
          <p>Add your sibling's name, choose a wallpaper, and download a custom HD greeting card in 5 seconds.</p>
        </div>
        <button className="gold-button" onClick={() => onOpenCardModal()}>
          <Wand2 size={16} /> Open Greeting Studio
        </button>
      </div>
    </div>
  );
}
