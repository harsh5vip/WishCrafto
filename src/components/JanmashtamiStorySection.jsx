import React, { useState } from 'react';
import { BookOpen, Sparkles, Camera, ArrowRight, Share2, Heart, Award } from 'lucide-react';
import { JANMASTHAMI_STORIES } from '../data/janmashtamiStoryData';

export default function JanmashtamiStorySection({ onOpenCardModal }) {
  const [lang, setLang] = useState('hi'); // 'hi' | 'en'
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const storyData = JANMASTHAMI_STORIES[lang];
  const activeChapter = storyData.chapters[activeChapterIndex];

  return (
    <section 
      style={{ 
        maxWidth: '1100px', 
        margin: '2rem auto 4rem auto', 
        padding: '0 1rem' 
      }}
    >
      {/* Outer Reading Container: Pure White High Contrast Card */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #ddd6fe',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(109, 40, 217, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Header & Bilingual Switcher Bar */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '1rem',
            borderBottom: '2px solid #f1f5f9',
            paddingBottom: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          <div>
            <span 
              style={{
                display: 'inline-block',
                padding: '0.35rem 1rem',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.8rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}
            >
              🦚 Sacred History & Verified Legends
            </span>
            <h2 style={{ fontSize: '2rem', color: '#1e1b4b', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              {storyData.title}
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', margin: '0.4rem 0 0 0', maxWidth: '750px' }}>
              {storyData.subtitle}
            </p>
          </div>

          {/* 1-Tap Bilingual Language Switcher Button */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: '#f1f5f9', 
              padding: '4px', 
              borderRadius: '50px',
              border: '1px solid #cbd5e1'
            }}
          >
            <button
              onClick={() => setLang('hi')}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '50px',
                border: 'none',
                background: lang === 'hi' ? 'linear-gradient(135deg, #6d28d9, #4c1d95)' : 'transparent',
                color: lang === 'hi' ? '#ffffff' : '#475569',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('en')}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '50px',
                border: 'none',
                background: lang === 'en' ? 'linear-gradient(135deg, #6d28d9, #4c1d95)' : 'transparent',
                color: lang === 'en' ? '#ffffff' : '#475569',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              English
            </button>
          </div>
        </div>

        {/* Story Grid: Left Interactive Chapter Tabs + Right Reading Stage */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(260px, 1fr) 2.2fr', 
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {/* Left Chapter Nav Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {storyData.chapters.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => setActiveChapterIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.8rem',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: activeChapterIndex === idx ? '2px solid #6d28d9' : '1px solid #e2e8f0',
                  background: activeChapterIndex === idx ? '#faf5ff' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeChapterIndex === idx ? '0 4px 15px rgba(109, 40, 217, 0.12)' : 'none'
                }}
              >
                <span 
                  style={{ 
                    color: activeChapterIndex === idx ? '#6d28d9' : '#94a3b8', 
                    fontWeight: '800', 
                    fontSize: '1rem',
                    minWidth: '24px'
                  }}
                >
                  {chap.number}
                </span>
                <div>
                  <h4 
                    style={{ 
                      color: activeChapterIndex === idx ? '#1e1b4b' : '#334155', 
                      fontSize: '0.95rem', 
                      fontWeight: '700', 
                      margin: 0 
                    }}
                  >
                    {chap.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>

          {/* Right Main Reading Content Stage */}
          <div 
            style={{ 
              background: '#fcfbfe', 
              border: '1px solid #f1f5f9', 
              borderRadius: '20px', 
              padding: '2rem' 
            }}
          >
            <span style={{ color: '#6d28d9', fontWeight: '800', fontSize: '0.85rem' }}>
              CHAPTER {activeChapter.number}
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.3rem', marginBottom: '1rem' }}>
              {activeChapter.title}
            </h3>

            {/* Summary Box */}
            <div 
              style={{ 
                background: '#faf5ff', 
                borderLeft: '4px solid #6d28d9', 
                padding: '0.9rem 1.2rem', 
                borderRadius: '0 12px 12px 0', 
                marginBottom: '1.5rem' 
              }}
            >
              <p style={{ margin: 0, color: '#4c1d95', fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.5' }}>
                💡 <strong>{lang === 'hi' ? 'संक्षेप:' : 'Summary:'}</strong> {activeChapter.summary}
              </p>
            </div>

            {/* Chapter Body Content */}
            <div style={{ color: '#1c1917', fontSize: '1.05rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {activeChapter.content}
            </div>

            {/* Embedded 1-Tap Photo Card Generator CTA */}
            <div 
              style={{ 
                marginTop: '2rem', 
                paddingTop: '1.5rem', 
                borderTop: '2px dashed #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: '#1e1b4b', fontSize: '0.95rem' }}>
                  🦚 {lang === 'hi' ? 'बाल गोपाल के साथ अपनी फोटो का कार्ड बनाएं' : 'Create Krishna Photo Card with Your Name'}
                </p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.82rem' }}>
                  {lang === 'hi' ? '100% निशुल्क - बिना कोई ऐप डाउनलोड किए 5 सेकंड में बनाएं' : '100% Free - Create in 5 seconds with 0% phone space'}
                </p>
              </div>

              <button
                onClick={() => onOpenCardModal("माखन चोर, नंद किशोर! श्री कृष्ण जन्माष्टमी की हार्दिक शुभकामनाएं! 🦚✨", "/HD Wallpapers/young_krishna_peacock_rakhi.jpg")}
                style={{
                  background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.75rem 1.4rem',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(109, 40, 217, 0.3)',
                  transition: 'all 0.25s ease'
                }}
              >
                <Camera size={18} />
                <span>{lang === 'hi' ? 'अपनी फोटो लगाएं / बदलें' : 'Create Photo Card Free'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
