import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Image as ImageIcon, BookOpen, Wand2 } from 'lucide-react';
import HomePage from './pages/HomePage';
import WishesPage from './pages/WishesPage';
import StudioPage from './pages/StudioPage';
import HistoryPage from './pages/HistoryPage';
import IndependencePage from './pages/IndependencePage';
import IndianFlagIcon from './components/IndianFlagIcon';
import CardGeneratorModal from './components/CardGeneratorModal';
import './Hero.css';
import Navbar from './components/Navbar';
import './styles/CardModal.css';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialWish, setModalInitialWish] = useState('');
  const [modalInitialImage, setModalInitialImage] = useState(null);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO Document Title dynamically based on current route
  useEffect(() => {
    let title = 'WishCrafto | Raksha Bandhan Wishes, Greeting Cards & 4K Wallpapers 2026';
    let desc = 'Celebrate Raksha Bandhan 2026 with heartfelt wishes, custom greeting cards with photo, HD wallpapers, auspicious muhurats, and sacred stories.';

    if (currentPath === '/independence-day' || currentPath === '/15-august') {
      title = '15 August Independence Day Wishes, Quotes & Photo Cards 2026 | WishCrafto';
      desc = 'Download 250+ patriotic 15 August wishes, Hindi Shayari, and create custom Swatantrata Diwas greeting cards with photo and name for free.';
    } else if (currentPath === '/wishes') {
      title = 'Raksha Bandhan Wishes 2026 | Best Messages for Brother & Sister';
      desc = 'Browse 50+ beautiful Raksha Bandhan wishes, Hindi shayari, and Sanskrit blessings. Copy text or generate a custom card in 1 tap.';
    } else if (currentPath === '/wish-cards' || currentPath === '/greeting-cards') {
      title = 'Raksha Bandhan Wishes with Images & Greeting Cards 2026 | WishCrafto';
      desc = 'Download free ready-made Raksha Bandhan wish cards, emotional shayari photos, and customizable greeting cards for brothers and sisters.';
    } else if (currentPath === '/wallpapers') {
      title = 'Raksha Bandhan HD Wallpapers & 4K Backgrounds 2026 | WishCrafto';
      desc = 'Download ultra HD Raksha Bandhan wallpapers for mobile and desktop screens or customize them as greeting cards.';
    } else if (currentPath === '/images' || currentPath === '/studio') {
      title = 'Raksha Bandhan Studio: Wish Cards & HD Wallpapers | WishCrafto';
      desc = 'Create personalized Raksha Bandhan greeting cards in seconds, download ready-made wish cards, and browse 4K festive wallpapers.';
    } else if (currentPath === '/history') {
      title = 'History of Raksha Bandhan | Divine Stories & Sacred Legends';
      desc = 'Discover the ancient history of Raksha Bandhan: Krishna & Draupadi, Rani Karnavati, Goddess Lakshmi & King Bali.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://wishcrafto.com${currentPath}`);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://wishcrafto.com${currentPath}`);
  }, [currentPath]);

  // Fast SPA Navigation helper
  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCardModal = (wishText = '', imageSrc = null) => {
    setModalInitialWish(wishText);
    setModalInitialImage(imageSrc);
    setIsModalOpen(true);
  };

  const isStudioRoute = ['/images', '/studio', '/wish-cards', '/greeting-cards', '/wallpapers'].includes(currentPath);
  const isIndepRoute = currentPath === '/independence-day' || currentPath === '/15-august';
  const isRakhiRoute = currentPath === '/' || currentPath === '/rakhi' || currentPath === '/raksha-bandhan';

  return (
    <div className="festival-page">
      <Navbar navigateTo={navigateTo} currentPath={currentPath} onOpenCardModal={handleOpenCardModal} />
      

      {/* Main View Router */}
      <main>
        {currentPath === '/wishes' && (
          <WishesPage onOpenCardModal={handleOpenCardModal} />
        )}
        {(currentPath === '/images' || currentPath === '/studio' || currentPath === '/wish-cards' || currentPath === '/greeting-cards') && (
          <StudioPage
            initialTab="cards"
            onOpenCardModal={handleOpenCardModal}
            onNavigate={navigateTo}
          />
        )}
        {currentPath === '/wallpapers' && (
          <StudioPage
            initialTab="wallpapers"
            onOpenCardModal={handleOpenCardModal}
            onNavigate={navigateTo}
          />
        )}
        {currentPath === '/history' && (
          <HistoryPage
            onNavigate={navigateTo}
            onOpenCardModal={handleOpenCardModal}
          />
        )}
        {isRakhiRoute && (
          <HomePage
            onNavigate={navigateTo}
            onOpenCardModal={handleOpenCardModal}
          />
        )}
        {isIndepRoute && (
          <IndependencePage
            onOpenCardModal={handleOpenCardModal}
            onOpenRakhiModal={() => handleOpenCardModal('', null)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Pill Bar */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
        <button
          className={`mobile-tab ${isRakhiRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/')}
        >
          <Sparkles size={18} />
          <span>Rakhi</span>
        </button>

        <button
          className={`mobile-tab ${currentPath === '/wishes' ? 'active' : ''}`}
          onClick={() => navigateTo('/wishes')}
        >
          <Heart size={18} />
          <span>Wishes</span>
        </button>

        <button
          className={`mobile-tab ${isStudioRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/images')}
        >
          <ImageIcon size={18} />
          <span>Studio</span>
        </button>

        <button
          className={`mobile-tab ${currentPath === '/history' ? 'active' : ''}`}
          onClick={() => navigateTo('/history')}
        >
          <BookOpen size={18} />
          <span>History</span>
        </button>

        <button
          className={`mobile-tab ${isIndepRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/15-august')}
        >
          <IndianFlagIcon size={16} />
          <span>15 Aug</span>
        </button>
      </nav>

      {/* Interactive Card Generator Modal (Raksha Bandhan) */}
      <CardGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialWish={modalInitialWish}
        initialImage={modalInitialImage}
      />

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-brand">
          <button className="brand brand-btn" onClick={() => navigateTo('/')}>
            <Sparkles size={20} className="gold-text" />
            <span>WishCrafto</span>
          </button>
          <p>Celebrating India's festivals beautifully.</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <button onClick={() => navigateTo('/wishes')}>Wishes</button>
          <button onClick={() => navigateTo('/images')}>Studio</button>
          <button onClick={() => navigateTo('/history')}>History</button>
        </div>

        <div className="footer-col">
          <h3>Upcoming</h3>
          <span>Janmashtami</span>
          <span>Ganesh Chaturthi</span>
          <span>Navratri</span>
          <span>Diwali</span>
        </div>

        <div className="footer-bottom">
          © 2026 WishCrafto. Made with ❤️ in India.
        </div>
      </footer>
    </div>
  );
}
