import React, { useState, useRef } from 'react';
import { Menu, X, Sparkles, ChevronDown, Check, Heart, Image as ImageIcon, BookOpen, ChevronRight, Home } from 'lucide-react';
import IndianFlagIcon from './IndianFlagIcon';
import FestiveAudioToggle from './FestiveAudioToggle';
import './Navbar.css';

export default function Navbar({ navigateTo, currentPath, onOpenCardModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalDropdownOpen, setFestivalDropdownOpen] = useState(false);
  const [rakhiSubmenuOpen, setRakhiSubmenuOpen] = useState(false);
  const dropdownTimerRef = useRef(null);

  const handleNav = (path) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    if (navigateTo) navigateTo(path);
    setMobileMenuOpen(false);
    setFestivalDropdownOpen(false);
    setRakhiSubmenuOpen(false);
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setFestivalDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => {
      setFestivalDropdownOpen(false);
      setRakhiSubmenuOpen(false);
    }, 200);
  };

  // Compute dynamic toggle label based on current route
  const getToggleLabel = () => {
    if (currentPath === '/ganesh-chaturthi') return '🐘 Ganesh Chaturthi 2026';
    if (currentPath === '/janmashtami') return '🦚 Janmashtami 2026';
    if (currentPath === '/15-august') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <IndianFlagIcon size={16} /> Independence Day
        </span>
      );
    }
    if (currentPath.startsWith('/raksha-bandhan')) return '🪔 Raksha Bandhan 2026';
    return 'Festivals';
  };

  return (
    <header className="festival-nav">
      {/* Logo – returns to homepage */}
      <button
        className="brand brand-btn"
        onClick={() => handleNav('/')}
        aria-label="WishCrafto home"
      >
        <Sparkles size={24} className="gold-text" />
        <span>WishCrafto</span>
      </button>

      {/* Center (Desktop / PC): Divine Flute Audio Controller */}
      <div className="nav-center-audio">
        <FestiveAudioToggle />
      </div>

      {/* Desktop Navigation (Right Side in Original Spot) */}
      <nav className="desktop-nav" aria-label="Primary navigation">
        {/* Dynamic Festivals Dropdown */}
        <div
          className="festival-dropdown-container"
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveDropdown}
        >
          <button
            className={`festival-toggle ${currentPath === '/' ? 'active' : ''}`}
            onClick={() => handleNav('/')}
            aria-haspopup="true"
            aria-expanded={festivalDropdownOpen}
          >
            <span>{getToggleLabel()}</span> 
            <ChevronDown size={16} className={`chevron-icon ${festivalDropdownOpen ? 'open' : ''}`} />
          </button>

          <ul className={`festival-dropdown ${festivalDropdownOpen ? 'visible' : ''}`}>
            {/* 1. Home Option at Top */}
            <li className="festival-item">
              <button 
                className={`festival-link ${currentPath === '/' ? 'active-link' : ''}`} 
                onClick={() => handleNav('/')}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                  <Home size={15} /> 🏠 Home
                </span>
              </button>
            </li>

            {/* 2. Live Active Festival (Ganesh Chaturthi 2026) */}
            <li className="festival-item active">
              <button 
                className={`festival-link ${currentPath === '/ganesh-chaturthi' ? 'active-link' : ''}`} 
                onClick={() => handleNav('/ganesh-chaturthi')}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {currentPath === '/ganesh-chaturthi' && <Check size={14} className="check-icon" />} 🐘 Ganesh Chaturthi 2026
                </span>
                <span className="live-pill-badge">LIVE</span>
              </button>
            </li>

            {/* Recent Festivals Section Header */}
            <li className="dropdown-section-header">Recent Festivals</li>

            {/* Janmashtami 2026 */}
            <li className="festival-item past">
              <button 
                className={`festival-link past-link ${currentPath === '/janmashtami' ? 'active-link' : ''}`} 
                onClick={() => handleNav('/janmashtami')}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  🦚 Janmashtami 2026
                </span>
              </button>
            </li>

            {/* Raksha Bandhan Item with Inline Submenu Expansion */}
            <li 
              className="festival-item past has-submenu"
              onMouseEnter={() => setRakhiSubmenuOpen(true)}
              onMouseLeave={() => setRakhiSubmenuOpen(false)}
            >
              <button className="festival-link past-link" onClick={() => handleNav('/raksha-bandhan-wishes')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  🪔 Raksha Bandhan 2026
                </span>
                <ChevronDown size={14} style={{ transform: rakhiSubmenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', opacity: 0.7 }} />
              </button>

              {/* Inline Submenu for Rakhi Pages */}
              {rakhiSubmenuOpen && (
                <ul className="rakhi-inline-submenu">
                  <li>
                    <button onClick={() => handleNav('/raksha-bandhan-wishes')}>
                      <Heart size={14} className="sub-icon" /> Rakhi Wishes
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('/raksha-bandhan-cards')}>
                      <ImageIcon size={14} className="sub-icon" /> Rakhi Card Studio
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('/raksha-bandhan-stories')}>
                      <BookOpen size={14} className="sub-icon" /> Rakhi History & Stories
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Independence Day */}
            <li className="festival-item past">
              <button className="festival-link past-link" onClick={() => handleNav('/15-august')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <IndianFlagIcon size={16} /> Independence Day
                </span>
              </button>
            </li>

            {/* Upcoming Festivals */}
            <li className="dropdown-section-header">Upcoming</li>
            <li className="festival-item coming-soon">
              <span className="festival-link disabled" title="Coming Soon">
                <span>Navratri & Dussehra</span>
                <span className="coming-soon-badge">Coming Soon</span>
              </span>
            </li>
            <li className="festival-item coming-soon">
              <span className="festival-link disabled" title="Coming Soon">
                <span>Diwali</span>
                <span className="coming-soon-badge">Coming Soon</span>
              </span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Right Controls: Mobile Audio + Mobile Menu Toggle */}
      <div className="nav-right-controls">
        <div className="nav-mobile-audio">
          <FestiveAudioToggle />
        </div>
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button className="mobile-nav-link" onClick={() => handleNav('/')}>
            🏠 Home
          </button>
          
          <button className="mobile-nav-link" onClick={() => handleNav('/ganesh-chaturthi')}>
            🐘 Ganesh Chaturthi 2026 (Live)
          </button>
          
          <div className="mobile-drawer-header">Recent Festivals</div>
          <button className="mobile-nav-link" onClick={() => handleNav('/janmashtami')}>
            🦚 Janmashtami 2026
          </button>
          <button className="mobile-nav-link" onClick={() => handleNav('/raksha-bandhan-wishes')}>
            🌸 Rakhi Wishes
          </button>
          <button className="mobile-nav-link" onClick={() => handleNav('/raksha-bandhan-cards')}>
            🖼️ Rakhi Card Studio
          </button>
          <button className="mobile-nav-link" onClick={() => handleNav('/raksha-bandhan-stories')}>
            📜 Rakhi History & Stories
          </button>
          <button className="mobile-nav-link" onClick={() => handleNav('/15-august')}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <IndianFlagIcon size={16} /> Independence Day
            </span>
          </button>

          <div className="mobile-drawer-header">Create Status Card</div>
          <button 
            className="mobile-nav-link primary-cta-mobile" 
            onClick={() => { setMobileMenuOpen(false); onOpenCardModal(); }}
          >
            📷 अपनी फोटो लगाएं / बदलें
          </button>
        </div>
      )}
    </header>
  );
}
