import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, BookOpen, Music, Edit3, Image, Menu, X, Star } from 'lucide-react';
import '../../styles/components/navbar.css';

export default function Navbar() {
  const { activeTab, setActiveTab, bookmarks, accentColor, setAccentColor } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Timeline', icon: Compass },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'chants', label: 'Chants', icon: Music },
    { id: 'creator', label: 'Creator', icon: Edit3 },
    { id: 'gallery', label: 'Gallery', icon: Image },
  ];

  const accents = [
    { id: 'saffron', label: 'Saffron', color: 'hsl(28, 92%, 54%)' },
    { id: 'gold', label: 'Gold', color: 'hsl(43, 85%, 60%)' },
    { id: 'vermillion', label: 'Vermillion', color: 'hsl(3, 82%, 53%)' },
  ];

  return (
    <nav className="navbar glass-panel-heavy">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
          <span className="brand-logo animate-spin-slow">ॐ</span>
          <span className="brand-name heading-display">WishCrafto</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <li 
                key={item.id}
                className={`nav-item ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        {/* Actions (Accent Selector & Bookmarks Count) */}
        <div className="navbar-actions">
          {/* Accent Color Circles */}
          <div className="accent-picker">
            {accents.map((acc) => (
              <button
                key={acc.id}
                className={`accent-circle ${accentColor === acc.id ? 'active' : ''}`}
                style={{ backgroundColor: acc.color }}
                onClick={() => setAccentColor(acc.id)}
                title={`Switch to ${acc.label} theme`}
              />
            ))}
          </div>

          {/* Bookmarks Counter */}
          <div className="bookmark-counter" title="Bookmarked Festivals">
            <Star size={18} fill={bookmarks.length > 0 ? "currentColor" : "none"} />
            <span className="count-badge">{bookmarks.length}</span>
          </div>

          {/* Mobile Toggle Button */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-panel-heavy animate-fade-in-up">
          <ul className="mobile-nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <li 
                  key={item.id}
                  className={`mobile-nav-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon size={20} className="nav-icon" />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
