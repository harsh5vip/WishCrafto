import React, { useState, useMemo, memo } from 'react';
import { Download, Share2, Wand2, Sparkles, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { generateGreetingCardDataUrl } from '../../utils/cardRenderer';

function WishCardsGrid({ cards = [], onOpenCardModal, festivalName = 'Raksha Bandhan', lang = 'hi' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All Wish Cards' },
    { id: 'Brother', label: 'For Brother' },
    { id: 'Sister', label: 'For Sister' },
    { id: 'Emotional', label: 'Emotional & Sweet' },
    { id: 'Spiritual', label: 'Divine & Vedic' },
    { id: 'Hindi', label: 'Hindi Shayari' },
  ];

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const filteredCards = useMemo(() => {
    return selectedCategory === 'all'
      ? cards
      : cards.filter(card => card.category === selectedCategory || card.badge.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [cards, selectedCategory]);

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  const paginatedCards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCards.slice(start, start + itemsPerPage);
  }, [filteredCards, currentPage, itemsPerPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    const gridEl = document.querySelector('.wish-cards-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleDownloadCard = async (card) => {
    try {
      setDownloadingId(card.id);
      showToast(lang === 'hi' ? '🎨 कार्ड तैयार किया जा रहा है...' : '🎨 Rendering custom greeting card...');
      const cardDataUrl = await generateGreetingCardDataUrl(card, festivalName, lang);
      
      const link = document.createElement('a');
      link.href = cardDataUrl;
      link.download = `WishCrafto-${festivalName.replaceAll(' ', '-')}-Wish-Card-${card.title.replaceAll(' ', '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast(lang === 'hi' ? '✨ HD ग्रीटिंग कार्ड डाउनलोड हो गया!' : '✨ HD Greeting Card downloaded with wishes & design!');
    } catch (err) {
      console.error('Download error:', err);
      // Fallback
      const link = document.createElement('a');
      link.href = card.image;
      link.download = `WishCrafto-${festivalName.replaceAll(' ', '-')}-${card.title.replaceAll(' ', '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✨ Card image downloaded!');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = async (card) => {
    try {
      showToast(lang === 'hi' ? 'शेयर करने के लिए कार्ड तैयार हो रहा है...' : 'Preparing card to share...');
      const siteUrl = 'https://wishcrafto.com';
      const activeWish = (lang === 'hi' && card.wishTextHindi) ? card.wishTextHindi : card.wishText;
      const viralText = `🌸 *Happy Raksha Bandhan 2026!* 🪔\n\n"${activeWish}"\n\n👉 *Apna personalized photo wish card yahan se banayein:*\n🔗 ${siteUrl}`;
      
      const cardDataUrl = await generateGreetingCardDataUrl(card, festivalName, lang);

      // Check if Web Share API with files is supported
      if (navigator.share && navigator.canShare) {
        const res = await fetch(cardDataUrl);
        const blob = await res.blob();
        const file = new File([blob], `GreetingCard-${card.title.replaceAll(' ', '-')}.jpg`, { type: 'image/jpeg' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${card.title} | WishCrafto`,
            text: viralText,
            files: [file],
          });
          showToast('💌 Shared successfully with card artwork!');
          return;
        }
      }

      // Desktop/Fallback: Download the image automatically, then open WhatsApp Web
      handleDownloadCard(card);
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(viralText)}`;
      window.open(whatsappUrl, '_blank');
      showToast('💌 Shared successfully!');
    } catch (err) {
      if (err.name !== 'AbortError') {
        const siteUrl = 'https://wishcrafto.com';
        const activeWish = (lang === 'hi' && card.wishTextHindi) ? card.wishTextHindi : card.wishText;
        const viralText = `💖 Maine tumhare liye ek special Raksha Bandhan Card banaya hai!\n\n"${activeWish}"\n\nAap bhi apna custom card yahan banayein: ${siteUrl}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(viralText)}`;
        window.open(whatsappUrl, '_blank');
      }
    }
  };

  const copyToClipboard = (card) => {
    const activeWish = (lang === 'hi' && card.wishTextHindi) ? card.wishTextHindi : card.wishText;
    const textToCopy = `${activeWish}\n\n— Celebrate ${festivalName} on WishCrafto: ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy);
    showToast('✨ Wish message & link copied to clipboard!');
  };

  return (
    <div className="wish-cards-section">
      {/* Category Filter Bar */}
      <div className="crafto-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`crafto-filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Crafto / Pinterest Aesthetic Grid */}
      <div className="crafto-cards-grid">
        {paginatedCards.map((card) => {
          const titleText = (lang === 'hi' && card.titleHindi) ? card.titleHindi : card.title;
          const subtitleText = (lang === 'hi' && card.subtitleHindi) ? card.subtitleHindi : card.subtitle;
          const quoteText = (lang === 'hi' && card.quoteHindi) ? card.quoteHindi : card.quote;
          const wishText = (lang === 'hi' && card.wishTextHindi) ? card.wishTextHindi : card.wishText;

          return (
            <article className="crafto-card" key={card.id}>
              {/* Card Visual with Tag */}
              <div className="crafto-card-media">
                <img src={card.image} loading="lazy" decoding="async" alt={titleText} loading="lazy" decoding="async" />
                <div className="crafto-card-gradient" />
                
                <span className="crafto-badge" style={{ borderColor: card.accentColor }}>
                  <Sparkles size={12} className="gold-text" /> {card.badge}
                </span>

                <span className="watermark-badge">Created with WishCrafto.com</span>

                {/* Hover Quick Action overlay */}
                <div className="crafto-overlay-actions">
                  <button
                    className="crafto-quick-btn gold"
                    title="Customize this Card"
                    onClick={() => onOpenCardModal(wishText, card.image)}
                  >
                    <Wand2 size={16} /> Customize Design
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="crafto-card-body">
                <h3 className="crafto-card-title">{titleText}</h3>
                <p className="crafto-card-subtitle">{subtitleText}</p>
                
                <blockquote className="crafto-card-quote">
                  "{quoteText}"
                </blockquote>

                {/* Bottom Action Row */}
                <div className="crafto-card-footer">
                  <button
                    className="crafto-btn-primary"
                    onClick={() => onOpenCardModal(wishText, card.image)}
                  >
                    <Wand2 size={15} /> Customize
                  </button>

                  <div className="crafto-icon-actions">
                    <button
                      className="crafto-btn-icon"
                      title="Download Formatted Greeting Card"
                      onClick={() => handleDownloadCard(card)}
                      disabled={downloadingId === card.id}
                      aria-label="Download Card"
                    >
                      {downloadingId === card.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Download size={16} />
                      )}
                    </button>
                    <button
                      className="crafto-btn-icon whatsapp-icon-btn"
                      title="Share on WhatsApp"
                      onClick={() => handleShare(card)}
                      aria-label="Share on WhatsApp"
                    >
                      <WhatsAppIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="wishes-pagination" aria-label="Wish Cards Pagination" style={{ marginTop: '2.5rem' }}>
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
              const maxVisible = 5;
              
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

      {/* Floating Share Toast */}
      {toastMessage && (
        <div className="share-toast-notification">
          <Check size={18} className="gold-text" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default memo(WishCardsGrid);
