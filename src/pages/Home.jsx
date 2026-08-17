import React, { useState } from 'react';
import { festivalsData } from '../data/festivals';
import { getDaysCountdown, formatDateString } from '../utils/dateHelper';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/Common/GlassCard';
import { Star, Calendar, Clock, Bell, ArrowRight } from 'lucide-react';
import '../styles/pages/home.css';

export default function Home() {
  const { bookmarks, toggleBookmark, setActiveTab } = useApp();
  const [selectedFestival, setSelectedFestival] = useState(festivalsData[0]);

  // Sort festivals by days remaining (closest first)
  const sortedFestivals = [...festivalsData].sort((a, b) => {
    return getDaysCountdown(a.date) - getDaysCountdown(b.date);
  });

  const nextFeatured = sortedFestivals[0];
  const countdownDays = getDaysCountdown(nextFeatured.date);

  return (
    <div className="home-page animate-fade-in-up">
      {/* 1. Immersive Hero Section */}
      <section className="hero-section">
        <div className="cosmic-glow hero-glow" />
        <div className="hero-content">
          <span className="badge-premium heading-display">Samskara & Kala</span>
          <h1 className="hero-title heading-display">WishCrafto</h1>
          <p className="hero-subtitle">
            Experience the divine geometry, sacred sounds, and rich mythological narratives of India's cultural tapestry in an immersive digital format.
          </p>
        </div>
      </section>

      {/* 2. Nearest Featured Festival (Apple-inspired Banner) */}
      <section className="featured-section">
        <GlassCard className="featured-banner" glow={true} hoverEffect={false}>
          <div className="featured-image-wrapper">
            <img src={nextFeatured.image} alt={nextFeatured.name} className="featured-bg-image" />
            <div className="featured-image-overlay" />
          </div>
          <div className="featured-content">
            <div className="featured-top">
              <span className="featured-badge">Next Sacred Occasion</span>
              <button 
                className="bookmark-btn" 
                onClick={() => toggleBookmark(nextFeatured.id)}
                title="Bookmark occasion"
              >
                <Star 
                  size={20} 
                  fill={bookmarks.includes(nextFeatured.id) ? "var(--accent-gold)" : "none"} 
                  color={bookmarks.includes(nextFeatured.id) ? "var(--accent-gold)" : "#fff"} 
                />
              </button>
            </div>
            <div className="featured-body">
              <span className="sanskrit-title">{nextFeatured.sanskritName}</span>
              <h2 className="heading-display">{nextFeatured.name}</h2>
              <p className="featured-tagline">{nextFeatured.tagline}</p>
              
              {/* Giant Countdown Clock */}
              <div className="countdown-display">
                <div className="countdown-number-block">
                  <span className="number">{countdownDays}</span>
                  <span className="label">Days Remaining</span>
                </div>
                <div className="countdown-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{formatDateString(nextFeatured.date)}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{nextFeatured.muhurat}</span>
                  </div>
                </div>
              </div>

              <div className="featured-actions">
                <button 
                  className="btn-premium btn-primary"
                  onClick={() => setSelectedFestival(nextFeatured)}
                >
                  View Auspicious Timings
                </button>
                <button 
                  className="btn-premium btn-secondary"
                  onClick={() => setActiveTab('stories')}
                >
                  Read Story <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 3. Sliding Reels (Netflix Style) */}
      <section className="timeline-reel-section">
        <h3 className="section-title heading-display">Sacred Calendar Timeline</h3>
        <div className="reel-container">
          {sortedFestivals.map((fest) => {
            const daysLeft = getDaysCountdown(fest.date);
            const isBookmarked = bookmarks.includes(fest.id);
            const isSelected = selectedFestival.id === fest.id;

            return (
              <GlassCard 
                key={fest.id} 
                className={`reel-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedFestival(fest)}
              >
                <div className="reel-card-img-container">
                  <img src={fest.image} alt={fest.name} />
                  <div className="reel-card-overlay" />
                  <div className="reel-card-days">
                    <span className="day-count">{daysLeft}</span>
                    <span className="day-label">days left</span>
                  </div>
                </div>
                <div className="reel-card-info">
                  <div className="reel-card-header">
                    <h4>{fest.name}</h4>
                    <button 
                      className="inline-bookmark"
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(fest.id); }}
                    >
                      <Star size={16} fill={isBookmarked ? "var(--accent-gold)" : "none"} color={isBookmarked ? "var(--accent-gold)" : "#c9c0aa"} />
                    </button>
                  </div>
                  <p className="reel-sanskrit">{fest.sanskritName}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. Selected Festival Detail / Muhurat Dashboard */}
      <section className="details-dashboard-section">
        <div className="dashboard-grid">
          <GlassCard className="dashboard-muhurat" hoverEffect={false}>
            <h4 className="heading-display text-accent-gold">Auspicious Muhurats</h4>
            <div className="detail-meta-list">
              <div className="meta-card">
                <Calendar className="meta-icon" size={24} />
                <div>
                  <span className="meta-title">Festivity Date</span>
                  <span className="meta-value">{formatDateString(selectedFestival.date)}</span>
                </div>
              </div>
              <div className="meta-card">
                <Clock className="meta-icon" size={24} />
                <div>
                  <span className="meta-title">Auspicious Window</span>
                  <span className="meta-value">{selectedFestival.muhurat}</span>
                </div>
              </div>
            </div>
            <p className="muhurat-description">
              Follow clean traditional purification and timing guidelines for chanting, prayer (Puja), and meditating during these sacred alignments.
            </p>
          </GlassCard>

          <GlassCard className="dashboard-significance" hoverEffect={false}>
            <h4 className="heading-display text-accent-saffron">Significance & Rituals</h4>
            <p className="significance-text">{selectedFestival.significance}</p>
            <p className="description-text">{selectedFestival.description}</p>
            <div className="quick-action-strip">
              <button 
                className="btn-premium btn-primary"
                onClick={() => setActiveTab('creator')}
              >
                Send Greeting Card
              </button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
