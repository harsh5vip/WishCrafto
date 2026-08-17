import React, { useState, useMemo } from 'react';
import { Download, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  'All Wallpapers',
  'Lord Krishna',
  'Shri Ram & Avatars',
  'Lord Shiva',
  'Saraswati & Gayatri',
  'Lord Ganesha',
  'Hanuman & Mata Durga',
  'Surya & Agni Dev',
  'Murugan & Shani Dev',
  'Yama & Yamuna',
  'Celestial Deities',
];

export default function WallpaperGrid({ wallpapers = [], onOpenCardModal, festivalName = 'Raksha Bandhan', lang = 'hi' }) {
  const [selectedCategory, setSelectedCategory] = useState('All Wallpapers');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const filteredWallpapers = useMemo(() => {
    if (selectedCategory === 'All Wallpapers') return wallpapers;
    return wallpapers.filter((wp) => wp.category === selectedCategory);
  }, [wallpapers, selectedCategory]);

  const totalPages = Math.ceil(filteredWallpapers.length / itemsPerPage);

  const paginatedWallpapers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWallpapers.slice(start, start + itemsPerPage);
  }, [filteredWallpapers, currentPage, itemsPerPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    const gridEl = document.querySelector('.wallpapers-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadImage = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `WishCrafto-${festivalName.replaceAll(' ', '-')}-${title.replaceAll(' ', '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="wallpapers-section">
      {/* Category Pills for Wallpapers */}
      <div className="crafto-filter-bar" role="tablist" aria-label="Wallpaper categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`crafto-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="wallpaper-grid">
        {paginatedWallpapers.map((wp) => {
          const titleText = (lang === 'hi' && wp.titleHindi) ? wp.titleHindi : wp.title;
          const subtitleText = (lang === 'hi' && wp.subtitleHindi) ? wp.subtitleHindi : wp.subtitle;
          const wishText = (lang === 'hi' && wp.wishTextHindi) ? wp.wishTextHindi : '';

          return (
            <div className="wallpaper-card" key={wp.id}>
              <div className="wallpaper-media">
                <img src={wp.url} alt={titleText} loading="lazy" decoding="async" />
                <span className="watermark-badge">WishCrafto.com</span>
                <div className="wallpaper-overlay">
                  <div className="wallpaper-actions">
                    <button
                      className="icon-action-btn"
                      title="Download HD"
                      onClick={() => handleDownloadImage(wp.url, titleText)}
                    >
                      <Download size={16} /> Download
                    </button>
                    <button
                      className="icon-action-btn gold"
                      title="Customize as Card"
                      onClick={() => onOpenCardModal(wishText, wp.url)}
                    >
                      <Wand2 size={16} /> Customize Card
                    </button>
                  </div>
                </div>
              </div>
              <div className="wallpaper-info">
                <h4>{titleText}</h4>
                <small>{subtitleText}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="wishes-pagination" aria-label="Wallpapers Pagination" style={{ marginTop: '2.5rem' }}>
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
    </div>
  );
}
