import React from 'react';
import '../../styles/components/footer.css';

export default function Footer() {
  return (
    <footer className="footer glass-panel-heavy">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">ॐ</span>
          <h4 className="heading-display">WishCrafto</h4>
          <p className="footer-tagline">Connecting modern minds to eternal traditions.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h5>Discover</h5>
            <a href="#home">Timeline</a>
            <a href="#stories">Cultural Stories</a>
            <a href="#chants">Meditation Audio</a>
          </div>
          <div className="link-group">
            <h5>Creative Tools</h5>
            <a href="#creator">Greeting Generator</a>
            <a href="#gallery">Premium Wallpapers</a>
            <a href="#about">About Platform</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WishCrafto. Handcrafted with reverence and modern engineering.</p>
      </div>
    </footer>
  );
}
