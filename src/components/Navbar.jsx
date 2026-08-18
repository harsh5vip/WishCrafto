import React, { useState, useRef } from 'react';
import { Menu, X, Sparkles, ChevronDown, Check, Heart, Image as ImageIcon, BookOpen } from 'lucide-react';
import IndianFlagIcon from './IndianFlagIcon';
import './Navbar.css';

export default function Navbar({ navigateTo, currentPath, onOpenCardModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalDropdownOpen, setFestivalDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef(null);

  // Festival categories for dropdown
  const activeFestival = { name: 'Raksha Bandhan 2026', path: '/raksha-bandhan', active: true };
  const pastFestivals = [
    { name: '15 August (Independence Day)', path: '/15-august', date: '15 Aug 2026', isIndep: true }
  ];
  const upcomingFestivals = [
    { name: 'Janmashtami' },
    { name: 'Ganesh Chaturthi' },
    { name: 'Navratri' },
    { name: 'Diwali' },
  ];

  const handleNav = (path) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    if (navigateTo) navigateTo(path);
    setMobileMenuOpen(false);
    setFestivalDropdownOpen(false);
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setFestivalDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => {
      setFestivalDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="festival-nav">
      {/* Logo – always returns to home */}
      <button
        className="brand brand-btn"
        onClick={() => handleNav('/')}
        aria-label="WishCrafto home"
      >
        <Sparkles size={24} className="gold-text" />
        <span>WishCrafto</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="desktop-nav" aria-label="Primary navigation">
        {/* Festival Dropdown */}
        <div
          className="festival-dropdown-container"
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveDropdown}
        >
          <button
            className={`festival-toggle ${(currentPath === '/' || currentPath === '/raksha-bandhan' || currentPath === '/rakhi') ? 'active' : ''}`}
            onClick={() => handleNav('/raksha-bandhan')}
            aria-haspopup="true"
            aria-expanded={festivalDropdownOpen}
          >
            Raksha Bandhan <ChevronDown size={16} className={`chevron-icon ${festivalDropdownOpen ? 'open' : ''}`} />
          </button>
          <ul className={`festival-dropdown ${festivalDropdownOpen ? 'visible' : ''}`}>
            {/* Live Active Festival */}
            <li className="festival-item active">
              <button className="festival-link active-link" onClick={() => handleNav('/raksha-bandhan')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} className="check-icon" /> Raksha Bandhan 2026
                </span>
                <span className="live-pill-badge">LIVE</span>
              </button>
            </li>

            {/* Past Festivals */}
            <li className="dropdown-section-header">Past Festivals</li>
            {pastFestivals.map((fest) => (
              <li key={fest.name} className="festival-item past">
                <button className="festival-link past-link" onClick={() => handleNav(fest.path)}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <IndianFlagIcon size={16} /> {fest.name}
                  </span>
                  <span className="past-date-badge">{fest.date}</span>
                </button>
              </li>
            ))}

            {/* Upcoming Festivals */}
            <li className="dropdown-section-header">Upcoming</li>
            {upcomingFestivals.map((fest) => (
              <li key={fest.name} className="festival-item coming-soon">
                <span className="festival-link disabled" title="Coming Soon">
                  <span>{fest.name}</span>
                  <span className="coming-soon-badge">Coming Soon</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Nav Buttons (Festival-Specific & SEO Flat Keywords) */}
        <button
          className={['/wishes', '/raksha-bandhan/wishes', '/raksha-bandhan-wishes', '/rakhi/wishes', '/rakhi-wishes'].includes(currentPath) ? 'active' : ''}
          onClick={() => handleNav('/raksha-bandhan-wishes')}
        >
          <Heart size={15} /> Rakhi Wishes
        </button>
        <button
          className={['/images', '/studio', '/wish-cards', '/greeting-cards', '/wallpapers', '/raksha-bandhan/cards', '/raksha-bandhan-cards', '/raksha-bandhan/wallpapers', '/raksha-bandhan-wallpapers', '/raksha-bandhan/studio'].includes(currentPath) ? 'active' : ''}
          onClick={() => handleNav('/raksha-bandhan-cards')}
        >
          <ImageIcon size={15} /> Card Studio
        </button>
        <button
          className={['/history', '/raksha-bandhan/history', '/raksha-bandhan-stories', '/rakhi/history', '/rakhi-stories'].includes(currentPath) ? 'active' : ''}
          onClick={() => handleNav('/raksha-bandhan-stories')}
        >
          <BookOpen size={15} /> Rakhi Stories
        </button>
      </nav>

      {/* Mobile Toggle */}
      <button
        className="mobile-toggle-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <ul className="mobile-links">
            <li className="mobile-festival">
              <span className="mobile-festival-title">Festival</span>
              <ul className="mobile-festival-list">
                <li className="mobile-festival-item">
                  <button className="mobile-festival-link active-link" onClick={() => handleNav('/raksha-bandhan')}>
                    <Check size={12} className="check-icon" /> Raksha Bandhan 2026
                  </button>
                </li>
                <li className="mobile-festival-item">
                  <button className="mobile-festival-link" onClick={() => handleNav('/15-august')}>
                    <IndianFlagIcon size={14} /> 15 August (15 Aug 2026)
                  </button>
                </li>
                {upcomingFestivals.map((fest) => (
                  <li key={fest.name} className="mobile-festival-item">
                    <span className="mobile-festival-link disabled" title="Coming Soon">
                      {fest.name}
                      <span className="coming-soon-badge">Coming Soon</span>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNav('/raksha-bandhan-wishes')}>
                <Heart size={16} /> Rakhi Wishes
              </button>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNav('/raksha-bandhan-cards')}>
                <ImageIcon size={16} /> Card Studio
              </button>
            </li>
            <li>
              <button className="mobile-nav-link" onClick={() => handleNav('/raksha-bandhan-stories')}>
                <BookOpen size={16} /> Rakhi Stories
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
