import React, { useEffect, useRef, useState } from 'react';
import { Download, Sparkles, X, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import IndianFlagIcon from './IndianFlagIcon';
import { INDEPENDENCE_WALLPAPERS, INDEPENDENCE_HINDI_WISHES } from '../data/independenceData';

export default function IndependenceCardModal({ isOpen, onClose, initialWish = '', initialImage = null }) {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [senderName, setSenderName] = useState('');
  const [mode, setMode] = useState('personal'); // 'personal' | 'business'
  const [businessName, setBusinessName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [selectedWish, setSelectedWish] = useState(initialWish || INDEPENDENCE_HINDI_WISHES[0].text);
  const [selectedImage, setSelectedImage] = useState('/HomepageImages/independence_template.jpg');
  const [customPhoto, setCustomPhoto] = useState(null);
  const [photoZoom, setPhotoZoom] = useState(1.0);
  const [photoOffsetX, setPhotoOffsetX] = useState(0);
  const [photoOffsetY, setPhotoOffsetY] = useState(0);
  const [nameYOffset, setNameYOffset] = useState(0);

  // Adsterra Interstitial Wait Timer State
  const [isAdVisible, setIsAdVisible] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [adPurpose, setAdPurpose] = useState('photo');

  const photoPosRef = useRef({ x: null, y: null });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const bgImgRef = useRef(null);
  const userImgRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    setAdPurpose('photo');
    setAdCountdown(5);
    setIsAdVisible(true);
  };

  const triggerPopunder = () => {
    try {
      window.open('https://www.effectivecpmnetwork.com/qc6vt9i70b?key=f18b5b3aaa94fab6bd5580a8dae66967', '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.log('Popunder trigger', e);
    }
  };

  const triggerBusinessMode = () => {
    if (mode === 'business') return;
    
    // Check if Smartlink was already triggered in this session
    const hasSeenOffer = sessionStorage.getItem('wc_biz_offer_seen');
    
    if (!hasSeenOffer) {
      // 1st Time in Session: Trigger High-Paying Smartlink Offer + DIRECT Instant Mode Switch (NO 5-sec Timer!)
      sessionStorage.setItem('wc_biz_offer_seen', 'true');
      setMode('business');
      triggerPopunder();
    } else {
      // 2nd Time / Repeat in Same Session: Show 5-second 300x250 Display Banner countdown
      setAdPurpose('business');
      setAdCountdown(5);
      setIsAdVisible(true);
    }
  };

  useEffect(() => {
    if (isAdVisible && adCountdown > 0) {
      const timer = setTimeout(() => setAdCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdVisible, adCountdown]);

  const handleSkipAd = () => {
    setIsAdVisible(false);
    if (adPurpose === 'photo') {
      fileInputRef.current?.click();
    } else if (adPurpose === 'business') {
      setMode('business');
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialWish) setSelectedWish(initialWish);
      setSelectedImage('/HomepageImages/independence_template.jpg');
    }
  }, [isOpen, initialWish]);

  useEffect(() => {
    if (!isOpen) return;
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    };

    const loadAssets = async () => {
      bgImgRef.current = await loadImage(selectedImage);
      if (customPhoto) {
        userImgRef.current = await loadImage(customPhoto);
      } else {
        userImgRef.current = null;
      }
      renderCanvas();
    };
    loadAssets();
  }, [isOpen, selectedImage, customPhoto]);

  useEffect(() => {
    if (!isOpen) return;
    renderCanvas();
  }, [senderName, selectedWish, mode, businessName, businessPhone, photoZoom, photoOffsetX, photoOffsetY, nameYOffset]);

  const renderCanvas = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || !bgImgRef.current) return;
      const ctx = canvas.getContext('2d');
      
      const bgImg = bgImgRef.current;
      const userImg = userImgRef.current;

      const targetW = bgImg.width || 1200;
      const targetH = bgImg.height || 800;
      if (canvas.width !== targetW) canvas.width = targetW;
      if (canvas.height !== targetH) canvas.height = targetH;

      // Clear Canvas to transparent/clean
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Template Background
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 1b. Draw Outer Edge Elegant Border Frame
    ctx.save();
    // Outer Emerald Green Border
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#138808';
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Middle Pure White Border
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.restore();

    // Circle Frame Center & Dimensions on Template (Stationary)
    const defaultCX = canvas.width * 0.252;
    const defaultCY = canvas.height * 0.412;
    const cx = defaultCX;
    const cy = defaultCY;
    const radius = canvas.width * 0.198; // Circle radius to completely cover template placeholder

    // 2. Draw Uploaded User Photo inside the Left Circle Frame
    if (userImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.closePath();
      
      // Draw Triple Tiranga Border (Orange, White, Green)
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#FF9933';
      ctx.stroke();

      ctx.clip(); // Mask photo strictly inside the circle!

      const baseScale = Math.max((radius * 2) / userImg.width, (radius * 2) / userImg.height);
      const uScale = baseScale * photoZoom;
      
      // Offset user photo position inside the circle clip mask
      const ux = cx - (userImg.width / 2) * uScale + photoOffsetX;
      const uy = cy - (userImg.height / 2) * uScale + photoOffsetY;

      ctx.drawImage(userImg, ux, uy, userImg.width * uScale, userImg.height * uScale);
      ctx.restore();

      // Outer Saffron / Orange Ring (Thick & Bold)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 9, 0, Math.PI * 2);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#FF9933';
      ctx.stroke();

      // Middle Pure White Ring (Thick)
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Inner Emerald Green Ring (Thick)
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 5, 0, Math.PI * 2);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#138808';
      ctx.stroke();

      // Draw Royal Waving Indian Flag Badge at Top Center of Photo Circle
      const flagW = 52;
      const flagH = 32;
      const flagX = cx - flagW / 2;
      const flagY = cy - radius - 26;

      // Flag Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      // Outer Gold Frame
      ctx.fillStyle = '#FFB936';
      ctx.fillRect(flagX - 2, flagY - 2, flagW + 4, flagH + 4);

      // Top Saffron Band
      ctx.fillStyle = '#FF9933';
      ctx.fillRect(flagX, flagY, flagW, 10.6);

      // Middle White Band
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(flagX, flagY + 10.6, flagW, 10.6);

      // Bottom Green Band
      ctx.fillStyle = '#138808';
      ctx.fillRect(flagX, flagY + 21.2, flagW, 10.6);

      // Ashok Chakra in center of White Band
      ctx.beginPath();
      ctx.arc(cx, flagY + 15.9, 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#000080';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }

    // 3. Draw Name inside the Gold Box below Photo Circle
    const baseNameY = canvas.height * 0.785 + nameYOffset;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b180e'; // Saffron/Redish Gold contrast color

    if (mode === 'personal') {
      ctx.font = 'bold 26px Hind, "Noto Sans Devanagari", sans-serif';
      ctx.fillText(senderName.trim() || 'आपका नाम यहाँ', defaultCX, baseNameY);
    } else {
      const shopName = businessName.trim() || 'आपकी दुकान का नाम';
      const phoneStr = businessPhone.trim() ? ` (${businessPhone.trim()})` : '';
      const fullText = `${shopName}${phoneStr}`;

      // Adjust font size dynamically so long business text fits cleanly inside the gold box
      const fontSize = fullText.length > 25 ? 19 : fullText.length > 18 ? 21 : 24;
      ctx.font = `bold ${fontSize}px Hind, "Noto Sans Devanagari", sans-serif`;
      ctx.fillText(fullText, defaultCX, baseNameY);
    }

    // 4. Draw Branding Watermark at Bottom Right for Viral Shares
    ctx.save();
    ctx.font = 'bold 20px Inter, sans-serif';
    const watermarkText = '✨ Created FREE on WishCrafto.com';
    const textWidth = ctx.measureText(watermarkText).width;
    const paddingX = 14;
    const boxWidth = textWidth + (paddingX * 2);
    const boxHeight = 34;
    const boxX = canvas.width - boxWidth - 20; // 20px margin from right
    const boxY = canvas.height - boxHeight - 20; // 20px margin from bottom
    
    ctx.fillStyle = 'rgba(10, 8, 6, 0.9)';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#FF9933';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.fillStyle = '#FF9933';
    ctx.textAlign = 'left';
    ctx.fillText(watermarkText, boxX + paddingX, boxY + 24);
    ctx.restore();
    } catch (err) {
      console.error('Canvas render error:', err);
    }
  };

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const handlePointerDown = (e) => {
    if (!customPhoto) return;
    const pos = getPointerPos(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width * 0.252;
    const cy = canvas.height * 0.412;
    const radius = canvas.width * 0.22;
    if (Math.hypot(pos.x - cx, pos.y - cy) <= radius) {
      isDraggingRef.current = true;
      dragOffsetRef.current = { x: pos.x - photoOffsetX, y: pos.y - photoOffsetY };
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !customPhoto) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    setPhotoOffsetX(Math.round(pos.x - dragOffsetRef.current.x));
    setPhotoOffsetY(Math.round(pos.y - dragOffsetRef.current.y));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const ADSTERRA_DIRECT_LINK = 'https://www.effectivecpmnetwork.com/qc6vt9i70b?key=f18b5b3aaa94fab6bd5580a8dae66967';

  const triggerDirectLinkAd = () => {
    try {
      window.open(ADSTERRA_DIRECT_LINK, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.log('Ad trigger', e);
    }
  };

  const downloadImageFile = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const namePrefix = senderName.trim() ? senderName.trim().replace(/\s+/g, '-') : '15-August';
    const timestamp = Date.now();
    const link = document.createElement('a');
    link.download = `WishCrafto.com-15-August-${namePrefix}-${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownload = () => {
    downloadImageFile();
    setTimeout(triggerDirectLinkAd, 400);
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const shareText = `🇮🇳 *15 August Swatantrata Diwas ki Hardik Shubhkamnaye!* 🇮🇳\n\n😱 *Dekhiye maine apna Tiranga Photo Card banaya hai!* \n👉 Aap bhi apni photo aur naam ke sath FREE Card banayein:\n🔗 https://wishcrafto.com/`;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'WishCrafto-Independence-Card.png', { type: 'image/png' });

        // Native Mobile Share with Image Attachment + Text
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: '15 August Independence Day Card - WishCrafto.com',
            text: shareText,
            files: [file]
          });
        } else {
          // PC fallback: Open WhatsApp Web
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        }
      }, 'image/png');
    } catch (err) {
      console.log('Share error', err);
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card-modal independence-card-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />

        <div className="modal-header independence-modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianFlagIcon size={24} />
            <h3>15 August Swatantrata Diwas Card Maker</h3>
          </div>
          <button className="icon-close-btn" onClick={onClose} aria-label="Close modal" style={{ color: '#fff' }}>
            <X size={20} />
          </button>
        </div>

        {isAdVisible ? (
          <div style={{
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '380px',
            background: 'rgba(15, 10, 6, 0.95)'
          }}>
            <span style={{
              background: '#FF9933', color: '#000', fontSize: '0.8rem', fontWeight: 'bold',
              padding: '6px 14px', borderRadius: '4px', textTransform: 'uppercase',
              letterSpacing: '1px', marginBottom: '1.5rem', display: 'inline-block'
            }}>
              {adPurpose === 'business' ? '💼 UNLOCKING BUSINESS PRO' : 'SPONSORED ADVERTISEMENT'}
            </span>

            <div style={{
              width: '100%', maxWidth: '340px', minHeight: '260px', background: '#050302',
              borderRadius: '12px', border: '1px solid rgba(255, 153, 51, 0.3)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', padding: '10px', overflow: 'hidden'
            }}>
              {/* Adsterra 300x250 High-Paying Display Banner */}
              <iframe
                title="Sponsored 300x250 Display Ad"
                scrolling="no"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        html, body { margin:0; padding:0; width:300px; height:250px; overflow:hidden; background:transparent; display:flex; justify-content:center; align-items:center; }
                      </style>
                    </head>
                    <body>
                      <script type="text/javascript">
                        atOptions = {
                          'key' : 'c668cca989403020a337b63a470001b8',
                          'format' : 'iframe',
                          'height' : 250,
                          'width' : 300,
                          'params' : {}
                        };
                      </script>
                      <script type="text/javascript" src="https://www.highperformanceformat.com/c668cca989403020a337b63a470001b8/invoke.js"></script>
                    </body>
                  </html>
                `}
                style={{ width: '300px', height: '250px', border: 'none', overflow: 'hidden', background: 'transparent' }}
              />

              {adCountdown > 0 ? (
                <>
                  <div style={{
                    width: '36px', height: '36px', border: '4px solid rgba(255,153,51,0.2)',
                    borderTopColor: '#FF9933', borderRadius: '50%', animation: 'spin 1s linear infinite',
                    margin: '12px 0'
                  }} />
                  <p style={{ color: '#aaa', margin: 0, fontSize: '1rem' }}>
                    {adPurpose === 'business' ? 'Unlocking Business PRO Branding...' : 'Loading Partner Message...'}
                  </p>
                </>
              ) : (
                <p style={{ color: '#FF9933', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                  {adPurpose === 'business' ? '🎉 Business PRO Unlocked!' : '🎉 Ready to Upload!'}
                </p>
              )}
            </div>

            {adCountdown > 0 ? (
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Please wait {adCountdown} seconds...
              </h3>
            ) : (
              <button className="gold-button" onClick={handleSkipAd} style={{ padding: '0.8rem 2rem', background: '#FF9933', color: '#000' }}>
                <Check size={18} /> Continue Now
              </button>
            )}
          </div>
        ) : (
          <div className="modal-body">
            <div className="canvas-container" style={{ width: '100%' }}>
              <canvas 
                ref={canvasRef} 
                className="preview-canvas" 
                style={{ width: '100%', height: 'auto', borderRadius: '12px', cursor: customPhoto ? (isDraggingRef.current ? 'grabbing' : 'grab') : 'default', touchAction: 'none' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
                onTouchCancel={handlePointerUp}
              />
            </div>

            <div className="modal-controls">
              <div className="mode-toggle" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button 
                  className="ghost-button flex-1"
                  style={{ backgroundColor: mode === 'personal' ? 'rgba(255, 153, 51, 0.2)' : 'transparent', borderColor: mode === 'personal' ? '#FF9933' : 'rgba(255,255,255,0.1)' }}
                  onClick={() => setMode('personal')}
                >
                  👦 Personal
                </button>
                <button 
                  className="ghost-button flex-1"
                  style={{ backgroundColor: mode === 'business' ? 'rgba(255, 153, 51, 0.2)' : 'transparent', borderColor: mode === 'business' ? '#FF9933' : 'rgba(255,255,255,0.1)' }}
                  onClick={triggerBusinessMode}
                >
                  💼 Business <span style={{fontSize: '10px', backgroundColor: '#FF9933', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px', fontWeight: 'bold'}}>PRO</span>
                </button>
              </div>

              {mode === 'personal' ? (
                <div className="input-group">
                  <label>आपका नाम (Your Name)</label>
                  <input type="text" placeholder="उदा. रमेश कुमार" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="input-group flex-1">
                    <label>दुकान / बिज़नेस का नाम (Shop Name)</label>
                    <input type="text" placeholder="उदा. शर्मा स्वीट्स" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                  </div>
                  <div className="input-group flex-1">
                    <label>मोबाइल नंबर (Contact Number)</label>
                    <input type="text" placeholder="उदा. 9876543210" value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>अपनी फोटो लगाएं (Upload Your Photo)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="ghost-button flex-1" onClick={triggerPhotoUpload}>
                    📸 Upload Photo (फोटो अपलोड करें)
                  </button>
                  {customPhoto && (
                    <button className="ghost-button" onClick={() => setCustomPhoto(null)} style={{ padding: '0 1rem' }}>❌</button>
                  )}
                </div>
              </div>

              {/* Adjustments: Photo Zoom, Left/Right (X), Up/Down (Y) & Name Position */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,153,51,0.2)', marginBottom: '15px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#FF9933', display: 'block', marginBottom: '4px' }}>🔍 Photo Zoom ({Math.round(photoZoom * 100)}%)</label>
                  <input type="range" min="0.5" max="2.5" step="0.05" value={photoZoom} onChange={(e) => setPhotoZoom(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#FF9933', display: 'block', marginBottom: '4px' }}>↔️ Photo Left/Right ({photoOffsetX}px)</label>
                  <input type="range" min="-120" max="120" step="2" value={photoOffsetX} onChange={(e) => setPhotoOffsetX(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#FF9933', display: 'block', marginBottom: '4px' }}>↕️ Photo Up/Down ({photoOffsetY}px)</label>
                  <input type="range" min="-120" max="120" step="2" value={photoOffsetY} onChange={(e) => setPhotoOffsetY(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#FF9933', display: 'block', marginBottom: '4px' }}>↕️ Name Position ({nameYOffset > 0 ? `+${nameYOffset}` : nameYOffset}px)</label>
                  <input type="range" min="-40" max="40" step="2" value={nameYOffset} onChange={(e) => setNameYOffset(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="btn-primary flex-1" onClick={handleDownload} style={{ background: 'linear-gradient(135deg, #FF9933, #138808)', color: '#fff' }}>
                  <Download size={18} /> Download HD Card
                </button>
                <button className="ghost-button flex-1 whatsapp-btn" onClick={handleShare}>
                  <WhatsAppIcon size={18} /> Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
