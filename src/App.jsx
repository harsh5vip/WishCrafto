import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Image as ImageIcon, BookOpen, Wand2 } from 'lucide-react';
import HomePage from './pages/HomePage';
import WishesPage from './pages/WishesPage';
import StudioPage from './pages/StudioPage';
import HistoryPage from './pages/HistoryPage';
import IndependencePage from './pages/IndependencePage';
import JanmashtamiPage from './pages/JanmashtamiPage';
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

  // Update SEO Document Title & Canonical meta dynamically based on exact route
  useEffect(() => {
    let title = 'WishCrafto | Status & Quotes with Your Photo';
    let desc = 'We take 0 space on your phone to share your daily inspiration, Suvichar, motivational quotes, Birthday, Good Morning and festival messages with your photo & name.';

    if (currentPath === '/janmashtami') {
      title = 'Shri Krishna Janmashtami Wishes, History & Photo Cards 2026 | WishCrafto';
      desc = 'Read Shri Krishna Janmashtami sacred birth stories, Geeta updesh, Dahi Handi significance, and create custom Bal Gopal photo cards free.';
    } else if (currentPath === '/15-august') {
      title = '15 August Independence Day Wishes, Quotes & Photo Cards 2026 | WishCrafto';
      desc = 'Download 500+ patriotic 15 August wishes, Tiranga Shayari, and create custom Swatantrata Diwas greeting cards with photo and name for free.';
    } else if (currentPath === '/raksha-bandhan-wishes') {
      title = 'Raksha Bandhan Wishes 2026 | 650+ Best Quotes & Shayari for Brother & Sister';
      desc = 'Browse 650+ beautiful Raksha Bandhan wishes, Hindi shayari, brother-sister quotes, and Sanskrit shlokas 2026. Copy in 1 tap or share on WhatsApp.';
    } else if (currentPath === '/raksha-bandhan-cards') {
      title = 'Raksha Bandhan Card Studio: Custom Photo Cards & 4K Wallpapers | WishCrafto';
      desc = 'Create personalized Raksha Bandhan greeting cards with your photo & name in seconds, download ready-made wish cards, and browse 4K festive wallpapers.';
    } else if (currentPath === '/raksha-bandhan-stories') {
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
    if (canonical) canonical.setAttribute('href', `https://wishcrafto.com${currentPath}`);
  }, [currentPath]);

  const navigateTo = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCardModal = (wishText = '', imageUrl = null) => {
    setModalInitialWish(wishText);
    setModalInitialImage(imageUrl);
    setIsModalOpen(true);
  };

  const isWishesRoute = currentPath === '/raksha-bandhan-wishes';
  const isStudioRoute = currentPath === '/raksha-bandhan-cards';
  const isHistoryRoute = currentPath === '/raksha-bandhan-stories';
  const isIndepRoute = currentPath === '/15-august';
  const isJanmashtamiRoute = currentPath === '/janmashtami';
  const isHomeRoute = currentPath === '/';

  return (
    <div className="festival-page">
      <Navbar navigateTo={navigateTo} currentPath={currentPath} onOpenCardModal={handleOpenCardModal} />

      {/* Main View Router */}
      <main>
        {isJanmashtamiRoute && (
          <JanmashtamiPage
            onNavigate={navigateTo}
            onOpenCardModal={handleOpenCardModal}
          />
        )}
        {isWishesRoute && (
          <WishesPage onOpenCardModal={handleOpenCardModal} onNavigate={navigateTo} />
        )}
        {isStudioRoute && (
          <StudioPage
            initialTab="cards"
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
        {isHomeRoute && (
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

      {/* Ambient Divine Flute BGM Controller */}
      <FestiveAudioToggle />

      {/* Interactive Card Generator Modal */}
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
          <p>Celebrating India's festivals & daily suvichar with your photo & name.</p>
        </div>

        <div className="footer-col">
          <h3>Festivals</h3>
          <button onClick={() => navigateTo('/janmashtami')}>🦚 Janmashtami 2026</button>
          <button onClick={() => navigateTo('/raksha-bandhan-wishes')}>🪔 Raksha Bandhan 2026</button>
          <button onClick={() => navigateTo('/15-august')}>🇮🇳 Independence Day</button>
        </div>

        <div className="footer-col">
          <h3>Daily Status</h3>
          <button onClick={() => navigateTo('/')}>🌅 Good Morning Wishes</button>
          <button onClick={() => navigateTo('/')}>🌙 Good Night Status</button>
          <button onClick={() => navigateTo('/')}>✨ Daily Hindi Suvichar</button>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} WishCrafto. All rights reserved. Made with ❤️ for India.</p>
        </div>
      </footer>
    </div>
  );
}
