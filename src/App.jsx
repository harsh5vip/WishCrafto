import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Image as ImageIcon, BookOpen, Wand2 } from 'lucide-react';
import HomePage from './pages/HomePage';
import WishesPage from './pages/WishesPage';
import StudioPage from './pages/StudioPage';
import HistoryPage from './pages/HistoryPage';
import IndependencePage from './pages/IndependencePage';
import IndianFlagIcon from './components/IndianFlagIcon';
import CardGeneratorModal from './components/CardGeneratorModal';
import FestiveAudioToggle from './components/FestiveAudioToggle';
import './Hero.css';
import Navbar from './components/Navbar';

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
    let title = 'WishCrafto | Download Free Customizable Festival Wishes & Cards with photo & name, Daily Festival status , 4K wallpaper and Festival stories';
    let desc = 'Download free customizable festival wishes & greeting cards with your photo & name. Daily festival status, 1000+ Hindi & English quotes, festival stories & 4K wallpapers for all Indian & global festivals.';

    if (currentPath === '/raksha-bandhan') {
      title = 'WishCrafto | Raksha Bandhan Wishes, Greeting Cards & 4K Wallpapers 2026';
      desc = 'Download free Raksha Bandhan wishes with your photo & name. 100+ Hindi & English Rakhi quotes, Bhai Behan shayari, 4K wallpapers & shubh muhurat timings 2026.';
    } else if (currentPath === '/independence-day' || currentPath === '/15-august') {
      title = '15 August Independence Day Wishes, Quotes & Photo Cards 2026 | WishCrafto';
      desc = 'Download 500+ patriotic 15 August wishes, Tiranga Shayari, and create custom Swatantrata Diwas greeting cards with photo and name for free.';
    } else if (currentPath === '/wishes' || currentPath === '/raksha-bandhan-wishes' || currentPath === '/raksha-bandhan/wishes') {
      title = 'Raksha Bandhan Wishes 2026 | 650+ Best Quotes & Shayari for Brother & Sister';
      desc = 'Browse 650+ beautiful Raksha Bandhan wishes, Hindi shayari, brother-sister quotes, and Sanskrit shlokas 2026. Copy in 1 tap or share on WhatsApp.';
    } else if (currentPath === '/wish-cards' || currentPath === '/greeting-cards') {
      title = 'Raksha Bandhan Wish Cards & Personalized Photo Greetings 2026 | WishCrafto';
      desc = 'Download free ready-made Raksha Bandhan wish cards, emotional shayari photos, and customizable greeting cards with your photo & name.';
    } else if (currentPath === '/wallpapers' || currentPath === '/raksha-bandhan-wallpapers' || currentPath === '/raksha-bandhan/wallpapers') {
      title = 'Raksha Bandhan HD Wallpapers & 4K Backgrounds 2026 | WishCrafto';
      desc = 'Download 85+ ultra HD 4K Raksha Bandhan wallpapers for mobile and desktop screens or customize them as greeting cards.';
    } else if (currentPath === '/images' || currentPath === '/studio' || currentPath === '/raksha-bandhan-cards' || currentPath === '/raksha-bandhan/cards') {
      title = 'Raksha Bandhan Card Studio: Custom Photo Cards & 4K Wallpapers | WishCrafto';
      desc = 'Create personalized Raksha Bandhan greeting cards with your photo & name in seconds, download ready-made wish cards, and browse 4K festive wallpapers.';
    } else if (currentPath === '/history' || currentPath === '/raksha-bandhan-stories' || currentPath === '/raksha-bandhan/history') {
      title = 'History of Raksha Bandhan | Divine Stories & Sacred Legends | WishCrafto';
      desc = 'Discover the authentic sacred legends of Raksha Bandhan: Lord Krishna & Draupadi, Goddess Lakshmi & King Bali, Rani Karnavati & Humayun, Yamraj & Yamuna.';
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
    if (canonical) {
      const canonicalPath = (currentPath === '/raksha-bandhan' || currentPath === '') ? '/' : currentPath;
      canonical.setAttribute('href', `https://wishcrafto.com${canonicalPath}`);
    }
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

  const isStudioRoute = ['/images', '/studio', '/wish-cards', '/greeting-cards', '/wallpapers', '/raksha-bandhan/cards', '/raksha-bandhan-cards', '/raksha-bandhan/wallpapers', '/raksha-bandhan/studio'].includes(currentPath);
  const isWishesRoute = ['/wishes', '/raksha-bandhan/wishes', '/raksha-bandhan-wishes', '/rakhi/wishes', '/rakhi-wishes'].includes(currentPath);
  const isHistoryRoute = ['/history', '/raksha-bandhan/history', '/raksha-bandhan-stories', '/rakhi/history', '/rakhi-stories'].includes(currentPath);
  const isWallpapersRoute = ['/wallpapers', '/raksha-bandhan/wallpapers', '/raksha-bandhan-wallpapers'].includes(currentPath);
  const isIndepRoute = currentPath === '/independence-day' || currentPath === '/15-august';
  const isRakhiRoute = currentPath === '/' || currentPath === '/rakhi' || currentPath === '/raksha-bandhan';

  return (
    <div className="festival-page">
      <Navbar navigateTo={navigateTo} currentPath={currentPath} onOpenCardModal={handleOpenCardModal} />
      

      {/* Main View Router */}
      <main>
        {isWishesRoute && (
          <WishesPage onOpenCardModal={handleOpenCardModal} />
        )}
        {isStudioRoute && !isWallpapersRoute && (
          <StudioPage
            initialTab="cards"
            onOpenCardModal={handleOpenCardModal}
            onNavigate={navigateTo}
          />
        )}
        {isWallpapersRoute && (
          <StudioPage
            initialTab="wallpapers"
            onOpenCardModal={handleOpenCardModal}
            onNavigate={navigateTo}
          />
        )}
        {isHistoryRoute && (
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

      {/* Mobile Bottom Navigation Pill Bar (Clean 4-Tab Core) */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
        <button
          className={`mobile-tab ${isRakhiRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/raksha-bandhan')}
        >
          <Sparkles size={18} />
          <span>Rakhi</span>
        </button>

        <button
          className={`mobile-tab ${isWishesRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/raksha-bandhan-wishes')}
        >
          <Heart size={18} />
          <span>Wishes</span>
        </button>

        <button
          className={`mobile-tab ${isStudioRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/raksha-bandhan-cards')}
        >
          <ImageIcon size={18} />
          <span>Studio</span>
        </button>

        <button
          className={`mobile-tab ${isHistoryRoute ? 'active' : ''}`}
          onClick={() => navigateTo('/raksha-bandhan-stories')}
        >
          <BookOpen size={18} />
          <span>Stories</span>
        </button>
      </nav>

      {/* Ambient Divine Flute BGM Controller */}
      <FestiveAudioToggle />

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
