import React, { useEffect, useRef, useState } from 'react';
import { Download, Sparkles, X, Check, Share2, Heart, RefreshCw } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { RAKHI_WALLPAPERS, RAKHI_WISHES } from '../data/rakhiData';
import { JANMASTHAMI_WALLPAPERS, JANMASTHAMI_CARD_WISHES, JANMASTHAMI_HISTORY_WALLPAPERS } from '../data/janmashtamiStoryData';
import { GANESH_HISTORY_WALLPAPERS, GANESH_CARD_WISHES } from '../data/ganeshChaturthiStoryData';

export default function CardGeneratorModal({ 
  isOpen, 
  onClose, 
  initialWish = '', 
  initialImage = null,
  initialPhoto = null,
  initialName = '',
  festival = null
}) {
  const canvasRef = useRef(null);
  const selectorStripRef = useRef(null);
  const [senderName, setSenderName] = useState(initialName || '');
  
  useEffect(() => {
    if (initialPhoto) setCustomPhoto(initialPhoto);
    if (initialName) setSenderName(initialName);
    if (initialWish) setSelectedWish(initialWish);
    if (initialImage) {
      if (initialImage.includes('/Janmashtami/') && !initialImage.includes('HistoryImagesJanmashtami')) {
        setSelectedImage('/HistoryImagesJanmashtami/Krishna_Birth1.png');
      } else {
        setSelectedImage(initialImage);
      }
    } else if (festival === 'ganesh') {
      setSelectedImage('/HistoryImagesGanesh/Ganesh_Birth1.png');
      if (!initialWish) {
        setSelectedWish('वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥ गणेश चतुर्थी 2026 की हार्दिक शुभकामनाएं! 🐘✨');
      }
    }
  }, [initialPhoto, initialName, initialWish, initialImage, festival, isOpen]);
  const [recipientName, setRecipientName] = useState('');
  const [mode, setMode] = useState('personal'); // 'personal' | 'business'
  const [businessName, setBusinessName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [selectedWish, setSelectedWish] = useState(
    initialWish || (festival === 'ganesh' 
      ? 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥ गणेश चतुर्थी 2026 की हार्दिक शुभकामनाएं! 🐘✨'
      : 'नन्द के घर आनन्द भयो, जय कन्हैया लाल की! श्रीकृष्ण जन्माष्टमी 2026 की हार्दिक शुभकामनाएं! 🦚✨')
  );
  const [selectedImage, setSelectedImage] = useState(
    initialImage || (festival === 'ganesh' ? '/HistoryImagesGanesh/Ganesh_Birth1.png' : '/HistoryImagesJanmashtami/Krishna_Birth1.png')
  );
  const [copiedToast, setCopiedToast] = useState(false);
  const [customPhoto, setCustomPhoto] = useState(null);
  const [photoZoom, setPhotoZoom] = useState(1.0);
  const [photoOffsetX, setPhotoOffsetX] = useState(0);
  const [photoOffsetY, setPhotoOffsetY] = useState(0);

  const [isAdVisible, setIsAdVisible] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [adPurpose, setAdPurpose] = useState('photo'); // 'photo' | 'business'
  const fileInputRef = useRef(null);
  const photoPosRef = useRef({ x: null, y: null });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const bgImgRef = useRef(null);
  const userImgRef = useRef(null);

  const [cardLayout, setCardLayout] = useState('cinematic'); // 'cinematic' (New style) | 'classic'

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

  const triggerBusinessMode = () => {
    if (mode === 'business') return;
    setAdPurpose('business');
    setAdCountdown(5);
    setIsAdVisible(true);
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

    // Strict festival detection: Ganesh Chaturthi vs Janmashtami vs Raksha Bandhan
  const isGanesh = React.useMemo(() => {
    if (festival === 'ganesh') return true;
    if (festival === 'janmashtami' || festival === 'rakhi') return false;
    if (selectedImage && (
      selectedImage.includes('HistoryImagesGanesh') ||
      selectedImage.toLowerCase().includes('ganesh')
    )) return true;
    if (initialImage && (
      initialImage.includes('HistoryImagesGanesh') ||
      initialImage.toLowerCase().includes('ganesh')
    )) return true;
    if (selectedWish && (
      selectedWish.includes('गणेश') ||
      selectedWish.includes('गणपति') ||
      selectedWish.includes('विनायक') ||
      selectedWish.includes('एकदन्त') ||
      selectedWish.includes('वक्रतुण्ड') ||
      selectedWish.includes('मोदक')
    )) return true;
    return false;
  }, [festival, selectedImage, initialImage, selectedWish]);

  const isJanmashtami = React.useMemo(() => {
    if (festival === 'janmashtami') return true;
    if (festival === 'ganesh' || festival === 'rakhi') return false;
    if (selectedImage && (
      selectedImage.includes('/Janmashtami/') || 
      selectedImage.includes('HistoryImagesJanmashtami') ||
      selectedImage.toLowerCase().includes('krishna')
    )) return true;
    if (initialImage && (
      initialImage.includes('/Janmashtami/') || 
      initialImage.includes('HistoryImagesJanmashtami') ||
      initialImage.toLowerCase().includes('krishna')
    )) return true;
    if (selectedWish && (
      selectedWish.includes('कृष्ण') || 
      selectedWish.includes('कन्हैया') || 
      selectedWish.includes('गोपाल') || 
      selectedWish.includes('जन्माष्टमी')
    )) return true;
    return false;
  }, [festival, selectedImage, initialImage, selectedWish]);

    // Available Wallpapers: Strictly isolated by festival
  const availableWallpapers = React.useMemo(() => {
    if (isGanesh) {
      // ONLY the 9 authentic images used in the Ganesh history stories!
      const list = [...GANESH_HISTORY_WALLPAPERS];
      const unique = [];
      const seen = new Set();
      if (selectedImage && selectedImage.includes('HistoryImagesGanesh')) {
        const found = list.find(item => item.url === selectedImage);
        if (found) {
          unique.push(found);
          seen.add(found.url);
        }
      }
      for (const bg of list) {
        if (!seen.has(bg.url)) {
          seen.add(bg.url);
          unique.push(bg);
        }
      }
      return unique;
    }

    if (isJanmashtami) {
      // ONLY the 9 authentic images used in the Janmashtami history stories!
      const list = [...JANMASTHAMI_HISTORY_WALLPAPERS];
      const unique = [];
      const seen = new Set();
      if (selectedImage && selectedImage.includes('HistoryImagesJanmashtami')) {
        const found = list.find(item => item.url === selectedImage);
        if (found) {
          unique.push(found);
          seen.add(found.url);
        }
      }
      for (const bg of list) {
        if (!seen.has(bg.url)) {
          seen.add(bg.url);
          unique.push(bg);
        }
      }
      return unique;
    }

    // Default: Strictly Raksha Bandhan wallpapers
    const featuredItem = {
      id: 'featured-krishna-sacred',
      title: '⭐ Featured: Shri Krishna & Draupadi Sacred Rakhi',
      url: '/HDWallpapersRakhi/krishna_draupadi_sacred_thread.jpg'
    };
    const list = [featuredItem, ...RAKHI_WALLPAPERS];
    const unique = [];
    const seen = new Set();
    for (const bg of list) {
      if (!seen.has(bg.url)) {
        seen.add(bg.url);
        unique.push(bg);
      }
    }
    if (selectedImage && !seen.has(selectedImage) && selectedImage.includes('HDWallpapersRakhi')) {
      unique.unshift({ id: 'selected-story-img', title: 'Story Scene', url: selectedImage });
    }
    return unique;
  }, [selectedImage, isJanmashtami]);

    useEffect(() => {
    if (isOpen) {
      if (initialWish) {
        setSelectedWish(initialWish);
      } else if (isJanmashtami) {
        setSelectedWish('नन्द के घर आनन्द भयो, जय कन्हैया लाल की! श्रीकृष्ण जन्माष्टमी 2026 की हार्दिक शुभकामनाएं! 🦚✨');
      } else {
        setSelectedWish(RAKHI_WISHES[0].text);
      }

      if (initialImage) {
        setSelectedImage(initialImage);
      } else if (isJanmashtami) {
        setSelectedImage(JANMASTHAMI_HISTORY_WALLPAPERS[0].url);
      } else {
        setSelectedImage(RAKHI_WALLPAPERS[0].url);
      }
    }
  }, [isOpen, initialWish, initialImage, isJanmashtami]);

  useEffect(() => {
    if (isOpen && selectorStripRef.current) {
      setTimeout(() => {
        const selectedEl = selectorStripRef.current?.querySelector('.thumb-btn.selected');
        if (selectedEl) {
          selectedEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }, 50);
    }
  }, [isOpen, selectedImage]);

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
  }, [senderName, recipientName, selectedWish, mode, businessName, businessPhone, cardLayout, photoZoom, photoOffsetX, photoOffsetY]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !bgImgRef.current) return;
    const ctx = canvas.getContext('2d');
    
    // Set 1080x1080 standard 1:1 Square social card dimensions
    canvas.width = 1080;
    canvas.height = 1080;

    const bgImg = bgImgRef.current;
    const userImg = userImgRef.current;

    if (bgImg) {
      ctx.save();
      // Draw background image scaled cover to 1:1 square
      const scale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height);
      const x = (canvas.width / 2) - (bgImg.width / 2) * scale;
      const y = (canvas.height / 2) - (bgImg.height / 2) * scale;
      ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);

      if (cardLayout === 'cinematic') {
        // ── STYLE 1: NEW FEATURED OVERLAY (Artwork 100% visible on top, Glass Quote on bottom) ──
        
        // 1. Smooth Bottom Glass Gradient (Only covers bottom 52%)
        const gradient = ctx.createLinearGradient(0, 460, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.22, 'rgba(8, 5, 3, 0.45)');
        gradient.addColorStop(0.58, 'rgba(6, 4, 2, 0.88)');
        gradient.addColorStop(1, 'rgba(4, 2, 1, 0.98)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 460, canvas.width, canvas.height - 460);

        // 2. Stylish Top Header: Happy Raksha Bandhan 2026
        ctx.save();
        const badgeText = isJanmashtami ? '✨ Happy Krishna Janmashtami 2026 ✨' : '✨ WishCrafto Daily Status & Wishes ✨';
        ctx.font = '800 24px "Cinzel", "Outfit", "Playfair Display", Georgia, sans-serif';
        const bMetrics = ctx.measureText(badgeText);
        const bWidth = bMetrics.width + 44;
        const bHeight = 54;
        const bX = 40;
        const bY = 40;

        // Luxury Dark Gold Glass Pill
        ctx.fillStyle = 'rgba(10, 7, 4, 0.88)';
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(255, 185, 54, 0.5)';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bX, bY, bWidth, bHeight, [27]);
        } else {
          ctx.rect(bX, bY, bWidth, bHeight);
        }
        ctx.fill();
        ctx.stroke();

        // High-Contrast Golden Text
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.fillText(badgeText, bX + bWidth / 2, bY + 36);
        ctx.restore();

        // 3. User Photo with Zoom, Offset and Drag
        if (userImg) {
          ctx.save();
          ctx.beginPath();
          const radius = 90;
          const baseCX = 940;
          const baseCY = 130;
          const cx = photoPosRef.current.x !== null ? photoPosRef.current.x : baseCX;
          const cy = photoPosRef.current.y !== null ? photoPosRef.current.y : baseCY;
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#ffb936';
          ctx.stroke();
          ctx.clip();
          
          const baseScale = Math.max((radius * 2) / userImg.width, (radius * 2) / userImg.height);
          const uScale = baseScale * photoZoom;
          const ux = cx - (userImg.width / 2) * uScale + photoOffsetX;
          const uy = cy - (userImg.height / 2) * uScale + photoOffsetY;
          ctx.drawImage(userImg, ux, uy, userImg.width * uScale, userImg.height * uScale);
          ctx.restore();
        }

        // 4. Dearest Recipient Tag (Covers Brother & Sister)
        ctx.save();
        ctx.font = '700 28px "Hind", "Noto Sans Devanagari", sans-serif';
        ctx.fillStyle = '#ffb936';
        ctx.textAlign = 'left';
        const recText = mode === 'business' 
          ? `🌸 Festive Greetings from ${businessName.trim() || 'Our Business'}` 
          : (recipientName.trim() ? `🌸 Dearest ${recipientName.trim()}` : '🌸 Dearest');
        ctx.fillText(recText, 50, 740);

        // 5. Quoted Wish Text
        ctx.font = '600 32px "Hind", "Noto Sans Devanagari", "Playfair Display", Georgia, serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 12;

        const maxTextWidth = 980;
        const lineHeight = 48;
        const words = selectedWish.split(' ');
        let line = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        lines.slice(0, 4).forEach((l, index) => {
          const textLine = index === 0 ? `"${l.trim()}` : (index === lines.length - 1 || index === 3 ? `${l.trim()}"` : l.trim());
          ctx.fillText(textLine, 50, 795 + (index * lineHeight));
        });

        ctx.shadowBlur = 0;

        // 6. Footer Divider & Signoff
        const footerY = 1000;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50, footerY - 25);
        ctx.lineTo(canvas.width - 50, footerY - 25);
        ctx.stroke();

        if (mode === 'personal') {
          ctx.font = '600 26px "Hind", "Noto Sans Devanagari", sans-serif';
          ctx.fillStyle = '#ffb936';
          ctx.textAlign = 'left';
          ctx.fillText(`From: ${senderName.trim() || 'Your Dearest'}`, 50, footerY + 12);

          ctx.font = '500 18px Inter, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.textAlign = 'right';
          ctx.fillText('✨ Created FREE on WishCrafto.com', canvas.width - 50, footerY + 12);
        } else {
          ctx.font = '700 26px Inter, sans-serif';
          ctx.fillStyle = '#ffb936';
          ctx.textAlign = 'left';
          ctx.fillText(businessName.trim() || 'Festive Greetings', 50, footerY + 12);

          if (businessPhone.trim()) {
            ctx.font = '600 24px Inter, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'right';
            ctx.fillText('📞 ' + businessPhone.trim(), canvas.width - 50, footerY + 12);
          }
        }
        ctx.restore();

      } else {
        // ── STYLE 2: CLASSIC ROYAL GOLD FRAME ──
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(8, 5, 4, 0.55)');
        gradient.addColorStop(0.35, 'rgba(14, 9, 6, 0.76)');
        gradient.addColorStop(0.75, 'rgba(10, 6, 4, 0.85)');
        gradient.addColorStop(1, 'rgba(5, 3, 2, 0.94)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Gold ornamental border
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.55)';
        ctx.lineWidth = 6;
        ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        // Header Tagline
        ctx.font = '600 22px Inter, sans-serif';
        ctx.fillStyle = '#ffb936';
        ctx.textAlign = 'center';
        ctx.fillText(isJanmashtami ? '✨ SHRI KRISHNA JANMASTHAMI BLESSINGS ✨' : '✨ WISHCRAFTO GREETINGS & BLESSINGS ✨', canvas.width / 2, 130);

        // Recipient Header (Dearest)
        if (mode === 'personal') {
          ctx.font = 'italic 700 42px Georgia, serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(recipientName.trim() ? `Dearest ${recipientName.trim()},` : 'Dearest,', canvas.width / 2, 220);
        }

        // Main Wish Text
        ctx.font = '500 34px "Hind", "Noto Sans Devanagari", "Playfair Display", Georgia, serif';
        ctx.fillStyle = '#fff6e7';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 14;

        const maxTextWidth = 840;
        const lineHeight = 54;
        const words = selectedWish.split(' ');
        let line = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        const photoSpace = userImg ? 260 : 0;
        const totalTextHeight = lines.length * lineHeight;
        let contentTop = 190;
        let contentBottom = canvas.height - 140;

        if (mode === 'personal') {
          contentTop = recipientName.trim() ? 270 : 190;
          contentBottom = canvas.height - (senderName.trim() ? (140 + photoSpace) : (90 + photoSpace));
        } else {
          contentBottom = canvas.height - 200 - photoSpace;
        }
        
        const startY = contentTop + Math.max(0, (contentBottom - contentTop - totalTextHeight) / 2) + 30;

        lines.forEach((l, index) => {
          ctx.fillText(l.trim(), canvas.width / 2, startY + (index * lineHeight));
        });

        ctx.shadowBlur = 0;

        // Draw User Photo with Zoom and Move
        if (userImg) {
          ctx.save();
          ctx.beginPath();
          const radius = 100;
          const baseCX = 540;
          const baseCY = 760;
          const cx = photoPosRef.current.x !== null ? photoPosRef.current.x : baseCX;
          const cy = photoPosRef.current.y !== null ? photoPosRef.current.y : baseCY;
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.closePath();
          
          ctx.lineWidth = 6;
          ctx.strokeStyle = '#ffb936';
          ctx.stroke();
          
          ctx.clip();
          const baseScale = Math.max((radius * 2) / userImg.width, (radius * 2) / userImg.height);
          const uScale = baseScale * photoZoom;
          const ux = cx - (userImg.width / 2) * uScale + photoOffsetX;
          const uy = cy - (userImg.height / 2) * uScale + photoOffsetY;
          ctx.drawImage(userImg, ux, uy, userImg.width * uScale, userImg.height * uScale);
          ctx.restore();
        }

        if (mode === 'personal') {
          if (senderName.trim()) {
            ctx.font = 'italic 600 32px Georgia, serif';
            ctx.fillStyle = '#ffb936';
            ctx.fillText(`With endless love, ${senderName.trim()}`, canvas.width / 2, canvas.height - 110);
          }

          ctx.font = '500 18px Inter, sans-serif';
          ctx.fillStyle = 'rgba(255, 246, 231, 0.45)';
          ctx.fillText('Created with WishCrafto.com', canvas.width / 2, canvas.height - 50);
        } else {
          ctx.fillStyle = 'rgba(15, 10, 5, 0.9)';
          ctx.fillRect(0, canvas.height - 140, canvas.width, 140);
          
          ctx.strokeStyle = '#ffb936';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height - 140);
          ctx.lineTo(canvas.width, canvas.height - 140);
          ctx.stroke();

          if (businessName.trim()) {
            ctx.font = '700 38px Inter, sans-serif';
            ctx.fillStyle = '#ffb936';
            ctx.textAlign = 'left';
            ctx.fillText(businessName.trim(), 60, canvas.height - 65);
          }

          if (businessPhone.trim()) {
            ctx.font = '600 34px Inter, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'right';
            ctx.fillText('📞 ' + businessPhone.trim(), canvas.width - 60, canvas.height - 75);
          }

          ctx.font = '500 16px Inter, sans-serif';
          ctx.fillStyle = 'rgba(255, 246, 231, 0.45)';
          ctx.textAlign = 'center';
          ctx.fillText('Created with WishCrafto.com', canvas.width / 2, canvas.height - 22);
        }
      }
      
      ctx.restore();
    }
  };

  const downloadImageFile = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const namePrefix = senderName.trim() ? senderName.trim().replace(/\s+/g, '-') : (isJanmashtami ? 'Janmashtami' : 'WishCrafto');
    const timestamp = Date.now();
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `WishCrafto.com-Raksha-Bandhan-${namePrefix}-${timestamp}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleDownload = () => {
    downloadImageFile();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const siteUrl = 'https://wishcrafto.com';
    const toLine = recipientName.trim() ? `✨ Dearest ${recipientName.trim()},\n\n` : '';
    const fromLine = senderName.trim() ? `\n\n— From: ${senderName.trim()}` : '';
    const festivalGreeting = isJanmashtami ? 'Happy Shri Krishna Janmashtami 2026!' : 'Best Wishes & Greetings!';
    const viralText = `🦚 *${festivalGreeting}* ✨\n\n${toLine}"${selectedWish}"${fromLine}\n\n👉 *Apna personalized photo wish card yahan se banayein:*\n🔗 ${siteUrl}`;
    
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], isJanmashtami ? 'WishCrafto.com-Janmashtami-Card.png' : 'WishCrafto.com-Wish-Card.png', { type: 'image/png' });
        
        // Native Mobile Share with Image Attachment + Text
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: isJanmashtami ? 'Shri Krishna Janmashtami Card - WishCrafto.com' : 'Personalized Wish Card - WishCrafto.com',
            text: viralText,
            files: [file],
          });
        } else {
          // PC Fallback: Direct WhatsApp Web
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(viralText)}`;
          window.open(whatsappUrl, '_blank');
          setCopiedToast(true);
          setTimeout(() => setCopiedToast(false), 2500);
        }
      });
    } catch (err) {
      console.log('Share failed', err);
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(viralText)}`;
      window.open(whatsappUrl, '_blank');
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
    const baseCX = cardLayout === 'cinematic' ? 940 : 540;
    const baseCY = cardLayout === 'cinematic' ? 130 : 760;
    const cx = photoPosRef.current.x !== null ? photoPosRef.current.x : baseCX;
    const cy = photoPosRef.current.y !== null ? photoPosRef.current.y : baseCY;
    if (Math.hypot(pos.x - cx, pos.y - cy) <= 110) {
      isDraggingRef.current = true;
      dragOffsetRef.current = { x: pos.x - cx, y: pos.y - cy };
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !customPhoto) return;
    e.preventDefault(); // Prevent scrolling on touch
    const pos = getPointerPos(e);
    photoPosRef.current = {
      x: pos.x - dragOffsetRef.current.x,
      y: pos.y - dragOffsetRef.current.y
    };
    requestAnimationFrame(renderCanvas);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handlePhotoUpload} 
        />
        <div className="modal-header">
          <div className="modal-title">
            <Sparkles size={20} className="gold-text" />
            <h3>{isJanmashtami ? 'Create Personalized Janmashtami Card' : 'Create Personalized Wish Card'}</h3>
          </div>
          <button className="icon-close-btn" onClick={onClose} aria-label="Close modal">
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
              background: '#ffb936', color: '#000', fontSize: '0.8rem', fontWeight: 'bold',
              padding: '6px 14px', borderRadius: '4px', textTransform: 'uppercase',
              letterSpacing: '1px', marginBottom: '1.5rem', display: 'inline-block'
            }}>
              {adPurpose === 'business' ? '💼 UNLOCKING BUSINESS PRO' : '✨ PREPARING HD PHOTO STUDIO'}
            </span>

            <div style={{
              width: '100%', maxWidth: '360px', minHeight: '220px', background: '#050302',
              borderRadius: '16px', border: '1.5px solid rgba(255, 185, 54, 0.35)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', padding: '1.8rem 1.4rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              {adCountdown > 0 ? (
                <>
                  <div style={{
                    width: '46px', height: '46px', border: '4px solid rgba(255, 185, 54, 0.2)',
                    borderTopColor: '#ffb936', borderRadius: '50%', animation: 'spin 1s linear infinite',
                    margin: '8px 0 16px'
                  }} />
                  <p style={{ color: '#ffffff', margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: '700' }}>
                    {adPurpose === 'business' ? 'Enabling Business Branding...' : 'Configuring HD Canvas Studio...'}
                  </p>
                  <p style={{ color: '#aaa', margin: 0, fontSize: '0.88rem' }}>
                    Preparing your custom canvas in {adCountdown} seconds...
                  </p>
                  {/* Visual Progress Bar */}
                  <div style={{
                    width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px', marginTop: '16px', overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${((5 - adCountdown) / 5) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ffb936, #22c55e)',
                      transition: 'width 1s linear'
                    }} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e',
                    fontSize: '1.6rem', marginBottom: '10px'
                  }}>
                    ✓
                  </div>
                  <p style={{ color: '#ffb936', fontSize: '1.25rem', fontWeight: '800', margin: '4px 0' }}>
                    {adPurpose === 'business' ? '🎉 Business PRO Ready!' : '🎉 Studio Ready!'}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                    100% private in-browser rendering complete.
                  </p>
                </>
              )}
            </div>

            {adCountdown > 0 ? (
              <h3 style={{ color: '#ffd06a', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: '700' }}>
                ⏳ Please wait {adCountdown}s...
              </h3>
            ) : (
              <button
                onClick={handleSkipAd}
                style={{
                  background: 'linear-gradient(135deg, #ffb936, #e78216)', color: '#0d0907',
                  width: '100%', maxWidth: '360px', padding: '14px', fontSize: '1.05rem',
                  fontWeight: '800', cursor: 'pointer', borderRadius: '50px', border: 'none',
                  boxShadow: '0 4px 15px rgba(255, 185, 54, 0.4)'
                }}
              >
                {adPurpose === 'business' ? '💼 Continue to Business PRO' : '📸 Select Photo from Gallery'}
              </button>
            )}
            <p style={{ marginTop: '1.2rem', color: '#9e9ea7', fontSize: '0.82rem' }}>
              Free HD Card Maker • 0 MB Phone Space
            </p>
          </div>
        ) : (
          <div className="modal-body">
          {/* Left Column: Canvas Live Preview with New / Classic Toggle above it */}
          <div className="canvas-container">
            <div className="canvas-header-toggle" style={{ display: 'flex', gap: '8px', marginBottom: '12px', width: '100%' }}>
              <button 
                className="ghost-button flex-1"
                style={{ 
                  backgroundColor: cardLayout === 'cinematic' ? 'rgba(255, 185, 54, 0.22)' : 'rgba(255, 255, 255, 0.04)', 
                  borderColor: cardLayout === 'cinematic' ? '#ffb936' : 'rgba(255,255,255,0.12)',
                  color: cardLayout === 'cinematic' ? '#ffb936' : '#ded4c5',
                  fontSize: '0.88rem',
                  fontWeight: cardLayout === 'cinematic' ? '700' : '500',
                  padding: '8px 14px',
                  borderRadius: '8px'
                }}
                onClick={() => {
                  setCardLayout('cinematic');
                  photoPosRef.current = { x: null, y: null };
                }}
              >
                ✨ New
              </button>
              <button 
                className="ghost-button flex-1"
                style={{ 
                  backgroundColor: cardLayout === 'classic' ? 'rgba(255, 185, 54, 0.22)' : 'rgba(255, 255, 255, 0.04)', 
                  borderColor: cardLayout === 'classic' ? '#ffb936' : 'rgba(255,255,255,0.12)',
                  color: cardLayout === 'classic' ? '#ffb936' : '#ded4c5',
                  fontSize: '0.88rem',
                  fontWeight: cardLayout === 'classic' ? '700' : '500',
                  padding: '8px 14px',
                  borderRadius: '8px'
                }}
                onClick={() => {
                  setCardLayout('classic');
                  photoPosRef.current = { x: null, y: null };
                }}
              >
                🪔 Classic
              </button>
            </div>

            <canvas 
              ref={canvasRef} 
              className="preview-canvas" 
              style={{ cursor: customPhoto ? (isDraggingRef.current ? 'grabbing' : 'grab') : 'default', touchAction: 'none' }}
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

          {/* Form Controls */}
          <div className="modal-controls">
            
            <div className="mode-toggle" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button 
                className="ghost-button flex-1"
                style={{ backgroundColor: mode === 'personal' ? 'rgba(255, 185, 54, 0.15)' : 'transparent', borderColor: mode === 'personal' ? '#ffb936' : 'rgba(255,255,255,0.1)' }}
                onClick={() => setMode('personal')}
              >
                👦 Personal
              </button>
              <button 
                className="ghost-button flex-1"
                style={{ backgroundColor: mode === 'business' ? 'rgba(255, 185, 54, 0.15)' : 'transparent', borderColor: mode === 'business' ? '#ffb936' : 'rgba(255,255,255,0.1)' }}
                onClick={triggerBusinessMode}
              >
                💼 Business <span style={{fontSize: '10px', backgroundColor: '#ffb936', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px', fontWeight: 'bold'}}>PRO</span>
              </button>
            </div>

            {mode === 'personal' ? (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="input-group flex-1">
                  <label>To (Dearest Name)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rahul / Pooja" 
                    value={recipientName} 
                    onChange={(e) => setRecipientName(e.target.value)} 
                  />
                </div>
                <div className="input-group flex-1">
                  <label>From (Your Name)</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={senderName} 
                    onChange={(e) => setSenderName(e.target.value)} 
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="input-group flex-1">
                  <label>Shop / Business Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sharma Sweets" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)} 
                  />
                </div>
                <div className="input-group flex-1">
                  <label>Contact Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 9876543210" 
                    value={businessPhone} 
                    onChange={(e) => setBusinessPhone(e.target.value)} 
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>{mode === 'business' ? 'Upload Business Logo / Owner Photo' : 'Personalize with Photo'}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="ghost-button flex-1" onClick={triggerPhotoUpload}>
                  📸 Upload Your Photo
                </button>
                {customPhoto && (
                  <button className="ghost-button" onClick={() => setCustomPhoto(null)} style={{ padding: '0 1rem' }}>
                    ❌
                  </button>
                )}
              </div>
            </div>

            {/* Photo Adjustments: Zoom, Left/Right (↔️), Up/Down (↕️), and Reset */}
            {customPhoto && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                background: 'rgba(255, 185, 54, 0.06)',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 185, 54, 0.25)',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#ffb936', display: 'block', marginBottom: '4px' }}>
                    🔍 Photo Zoom ({Math.round(photoZoom * 100)}%)
                  </label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.05" 
                    value={photoZoom} 
                    onChange={(e) => setPhotoZoom(parseFloat(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#ffb936', display: 'block', marginBottom: '4px' }}>
                    ↔️ Photo Left/Right ({photoOffsetX}px)
                  </label>
                  <input 
                    type="range" 
                    min="-150" 
                    max="150" 
                    step="2" 
                    value={photoOffsetX} 
                    onChange={(e) => setPhotoOffsetX(parseInt(e.target.value, 10))} 
                    style={{ width: '100%' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#ffb936', display: 'block', marginBottom: '4px' }}>
                    ↕️ Photo Up/Down ({photoOffsetY}px)
                  </label>
                  <input 
                    type="range" 
                    min="-150" 
                    max="150" 
                    step="2" 
                    value={photoOffsetY} 
                    onChange={(e) => setPhotoOffsetY(parseInt(e.target.value, 10))} 
                    style={{ width: '100%' }} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    className="ghost-button" 
                    style={{ width: '100%', fontSize: '0.75rem', padding: '6px 8px' }}
                    onClick={() => {
                      setPhotoZoom(1.0);
                      setPhotoOffsetX(0);
                      setPhotoOffsetY(0);
                      photoPosRef.current = { x: null, y: null };
                    }}
                  >
                    🔄 Reset Photo Pos
                  </button>
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Choose Background Style</label>
              <div className="image-selector-strip" ref={selectorStripRef}>
                {availableWallpapers.map((bg) => (
                  <button
                    key={bg.id || bg.url}
                    className={`thumb-btn ${selectedImage === bg.url ? 'selected' : ''}`}
                    onClick={() => setSelectedImage(bg.url)}
                    title={bg.title}
                  >
                    <img src={bg.url} alt={bg.title} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Choose or Customize Wish</label>
              <textarea
                rows={3}
                value={selectedWish}
                onChange={(e) => setSelectedWish(e.target.value)}
                placeholder="Type your custom message here..."
              />
            </div>

            <div className="preset-wishes-pills">
              <small>Preset Suggestions:</small>
              <div className="pills-scroll">
                {isGanesh ? [
                  {
                    id: 'gp-1',
                    label: '🐘 वक्रतुण्ड महाकाय',
                    text: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥ गणेश चतुर्थी 2026 की हार्दिक शुभकामनाएं! 🐘✨'
                  },
                  {
                    id: 'gp-2',
                    label: '🌸 गणपति बप्पा मोरया',
                    text: 'गणपति बप्पा मोरया! रिद्धि-सिद्धि के दाता भगवान श्री गणेश आपके घर में सुख, शांति और समृद्धि की वर्षा करें! 🌸🙏'
                  },
                  {
                    id: 'gp-3',
                    label: '🍯 एकदन्ताय विद्महे',
                    text: 'एकदन्ताय विद्महे वक्रतुण्डाय धीमहि। तन्नो दन्तिः प्रचोदयात्॥ शुभ विनायक चतुर्थी 2026! 🍯🪔'
                  },
                  {
                    id: 'gp-4',
                    label: '💛 माता-पिता ही संसार',
                    text: 'माता-पिता के चरणों में ही समस्त संसार है! भगवान गणेश जी का आशीर्वाद आप और आपके परिवार पर सदा बना रहे! जय गणेश देवा! 💛'
                  },
                  {
                    id: 'gp-5',
                    label: '✨ मोदक की मिठास',
                    text: 'मोदक की मिठास, बप्पा का दुलार, खुशियों से भर जाए आपका संसार! गणेश उत्सव की कोटिशः बधाई! ✨🐘'
                  },
                  {
                    id: 'gp-6',
                    label: '💼 Shubh / Corporate',
                    text: 'Wishing all our esteemed clients, partners and well-wishers a joyful, blessed and prosperous Ganesh Chaturthi 2026!'
                  }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`preset-pill ${selectedWish === preset.text ? 'active' : ''}`}
                    onClick={() => setSelectedWish(preset.text)}
                  >
                    {preset.label}
                  </button>
                )) : isJanmashtami ? [
                  {
                    id: 'jp-1',
                    label: '🦚 जय कन्हैया लाल की',
                    text: 'नन्द के घर आनन्द भयो, जय कन्हैया लाल की! हाथी घोड़ा पालकी, जय कन्हैया लाल की! श्रीकृष्ण जन्माष्टमी की हार्दिक शुभकामनाएं! 🦚✨'
                  },
                  {
                    id: 'jp-2',
                    label: '🍯 माखन चोर लीला',
                    text: 'माखन का कटोरा, मिश्री की मिठास, कान्हा की कृपा से पूरी हो हर आस! जन्माष्टमी पर्व की सपरिवार मंगलकामनाएं! 🍯🦚'
                  },
                  {
                    id: 'jp-3',
                    label: '✨ गीता उपदेश',
                    text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥ भगवान श्री कृष्ण का आशीर्वाद आप पर सदा बना रहे!'
                  },
                  {
                    id: 'jp-4',
                    label: '🌸 मुरली मनोहर',
                    text: 'मुरली मनोहर कृष्ण कन्हैया, पार करो मेरी जीवन नैया! जन्माष्टमी 2026 की सपरिवार कोटिशः बधाई! ✨🦚'
                  },
                  {
                    id: 'jp-5',
                    label: '🏔️ गोवर्धन लीला',
                    text: 'गोवर्धन धारी श्री कृष्ण आपके जीवन में सुख, शांति और समृद्धि की वर्षा करें! जय श्री कृष्णा! 🏔️🌸'
                  },
                  {
                    id: 'jp-6',
                    label: '💼 Shubh / Corporate',
                    text: 'Wishing all our valued clients, partners and families a very Happy, Auspicious and Blessed Shri Krishna Janmashtami 2026!'
                  }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`preset-pill ${selectedWish === preset.text ? 'active' : ''}`}
                    onClick={() => setSelectedWish(preset.text)}
                  >
                    {preset.label}
                  </button>
                )) : [
                  {
                    id: 'p-bro',
                    label: '👦 For Brother',
                    text: 'You have been my shield against every storm and my partner in every mischief. Blessed to have you as my brother. Happy Rakhi!'
                  },
                  {
                    id: 'p-sis',
                    label: '👧 For Sister',
                    text: 'Having a sister like you is like having an angel who constantly protects my peace and cheers for my dreams. Happy Rakhi, Behna!'
                  },
                  {
                    id: 'p-hin',
                    label: '🌸 Hindi / Emotional',
                    text: 'फूलों का तारों का सबका कहना है, एक हज़ारों में मेरी बहना है! रक्षाबंधन की ढेरों शुभकामनाएं मेरी प्यारी बहना!'
                  },
                  {
                    id: 'p-div',
                    label: '🪔 Divine Blessing',
                    text: 'May the holy thread of Rakhi protect you from all harm and bring boundless success, health, and joy in your life.'
                  },
                  {
                    id: 'p-sht',
                    label: '💖 Short & Sweet',
                    text: 'A thread of love, a lifetime of protection and togetherness. Happy Rakhi 2026!'
                  },
                  {
                    id: 'p-biz',
                    label: '💼 Business PRO',
                    text: 'Wishing all our valued customers, partners, and friends a very Happy, Auspicious and Prosperous Raksha Bandhan 2026!'
                  }
                ].map((w) => (
                  <button
                    key={w.id}
                    className={`preset-pill ${selectedWish === w.text ? 'active' : ''}`}
                    onClick={() => setSelectedWish(w.text)}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button className="gold-button flex-1" onClick={handleDownload}>
                <Download size={18} /> Download Card (HD PNG)
              </button>
              <button 
                className="ghost-button flex-1 whatsapp-btn" 
                onClick={handleShare}
              >
                <WhatsAppIcon size={18} /> Share on WhatsApp
              </button>
            </div>

            {copiedToast && (
              <div className="copied-toast">
                <Check size={16} /> Text copied to clipboard for sharing!
              </div>
            )}
          </div>
        </div>)}
      </div>
    </div>
  );
}
