import React, { useState } from 'react';
import { Camera, Share2, Download, Edit3, Heart, ChevronDown, Sparkles, BookOpen } from 'lucide-react';
import JanmashtamiStorySection from '../components/JanmashtamiStorySection';

const JANMASTHAMI_WISHES = [
  {
    id: 'j-1',
    category: '🦚 Divine Shlok & Blessing',
    wish: 'नन्द के घर आनन्द भयो, जय कन्हैया लाल की! हाथी घोड़ा पालकी, जय कन्हैया लाल की! श्रीकृष्ण जन्माष्टमी की हार्दिक शुभकामनाएं!',
    image: '/HD Wallpapers/young_krishna_peacock_rakhi.jpg'
  },
  {
    id: 'j-2',
    category: '✨ Geeta Updesh',
    wish: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥ भगवान श्री कृष्ण की कृपा आप पर सदा बनी रहे!',
    image: '/HD Wallpapers/krishna_flute_divine_wishes.jpg'
  },
  {
    id: 'j-3',
    category: '🌸 Bal Gopal Wishes',
    wish: 'माखन का कटोरा, मिश्री की मिठास, कान्हा की कृपा से पूरी हो हर आस! जन्माष्टमी पर्व की ढेरों शुभकामनाएं!',
    image: '/HD Wallpapers/divine_blessings_raksha_bandhan.jpg'
  }
];

export default function JanmashtamiPage({ onNavigate, onOpenCardModal }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsApp = (wish) => {
    const text = `🦚 *Shri Krishna Janmashtami 2026!* 🦚\n\n"${wish}"\n\n✨ Create your custom photo card for free on WishCrafto:\nhttps://wishcrafto.com/janmashtami`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      className="janmashtami-page" 
      style={{ 
        background: 'linear-gradient(180deg, #ffffff 0%, #f5f3ff 50%, #ede9fe 100%)', 
        minHeight: '100vh', 
        color: '#1e1b4b',
        padding: '2rem 1rem 5rem 1rem'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Page Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span 
            style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.85rem',
              boxShadow: '0 4px 15px rgba(109, 40, 217, 0.25)'
            }}
          >
            🦚 Shri Krishna Janmashtami 2026 Special
          </span>

          <h1 style={{ fontSize: '2.6rem', color: '#1e1b4b', fontWeight: '800', marginTop: '0.8rem', letterSpacing: '-0.5px' }}>
            श्री कृष्ण जन्माष्टमी: जन्मोत्सव कथा, शुभकामना कार्ड व बधाई संदेश
          </h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '750px', margin: '0.8rem auto 0 auto', lineHeight: '1.6' }}>
            बाल गोपाल की दिव्य लीलाएं, मथुरा जन्म कथा, 1-टैप फोटो कार्ड एडिटर और व्हाट्सऐप स्टेटस संदेश।
          </p>
        </div>

        {/* Create Card Quick CTA Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #6d28d9 100%)',
            borderRadius: '24px',
            padding: '2rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
            boxShadow: '0 12px 35px rgba(76, 29, 149, 0.35)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#f3d187', fontWeight: '700' }}>
              FREE PHOTO CARD MAKER
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0.4rem 0' }}>
              बाल गोपाल के साथ अपनी फोटो और नाम वाला कार्ड बनाएं
            </h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>
              बिना ऐप डाउनलोड किए 5 सेकंड में जन्माष्टमी शुभकामना कार्ड बनाएं व WhatsApp पर शेयर करें।
            </p>
          </div>

          <button
            onClick={() => onOpenCardModal("माखन चोर, नंद किशोर! श्रीकृष्ण जन्माष्टमी की हार्दिक शुभकामनाएं! 🦚✨", "/HD Wallpapers/young_krishna_peacock_rakhi.jpg")}
            style={{
              background: 'linear-gradient(135deg, #ffb936 0%, #e78216 100%)',
              color: '#110d0a',
              fontWeight: '800',
              padding: '0.9rem 1.8rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 4px 18px rgba(255, 185, 54, 0.4)'
            }}
          >
            <Camera size={20} />
            <span>अपनी फोटो लगाएं / बदलें</span>
          </button>
        </div>

        {/* Janmashtami Master Story Section */}
        <JanmashtamiStorySection onOpenCardModal={onOpenCardModal} />

        {/* Janmashtami Wishes Cards Grid */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#1e1b4b', fontWeight: '800' }}>
              🦚 Janmashtami Wishes & Status Cards
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {JANMASTHAMI_WISHES.map((w) => (
              <div 
                key={w.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #ddd6fe',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  boxShadow: '0 6px 20px rgba(109, 40, 217, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6d28d9' }}>{w.category}</span>
                  <p style={{ fontSize: '1.05rem', color: '#1e1b4b', fontWeight: '600', lineHeight: '1.6', marginTop: '0.8rem' }}>
                    "{w.wish}"
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
                  <button
                    onClick={() => handleWhatsApp(w.wish)}
                    style={{
                      flex: 1,
                      background: '#25D366',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.6rem',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Share2 size={16} /> WhatsApp
                  </button>

                  <button
                    onClick={() => onOpenCardModal(w.wish, w.image)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #6d28d9, #4c1d95)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.6rem',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Camera size={16} /> Photo Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
