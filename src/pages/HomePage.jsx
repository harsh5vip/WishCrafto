import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ArrowRight, Wand2, Heart, BookOpen, 
  Image as ImageIcon, Calendar, ChevronDown, ChevronUp, Copy, Check, Star, Share2, Camera, Download, Edit3, User, ShieldCheck, Zap, HeartHandshake, Globe, Loader2, Crown
} from 'lucide-react';
import { DAILY_STATUS_CATEGORIES, DAILY_STATUS_FEED } from '../data/dailyStatusData';
import WhatsAppIcon from '../components/WhatsAppIcon';
import ProUnlockModal from '../components/ProUnlockModal';
import { triggerPersonalizedNotification } from '../utils/notificationManager';

const faqs = [
  {
    question: 'How can I create and download new Good Morning images with my photo and name?',
    answer:
      'Personalizing and downloading Good Morning images on WishCrafto takes under 5 seconds: (1) Scroll through our daily feed of fresh Good Morning images and quotes, (2) Click "Your Photo" directly on the card to upload your picture from your phone or PC, (3) Type your name or family name, and (4) Click "Download" for HD saving or "Share" directly to WhatsApp. You can even drag your photo anywhere on the card.'
  },
  {
    question: 'How do I make custom Shri Krishna Janmashtami 2026 status with my photo?',
    answer:
      'Select the 🦚 Janmashtami tab on the home feed or visit the Janmashtami Studio to choose from 16+ divine Bal Gopal and sacred story scenes. Add your photo and family name to create high-resolution Janmashtami wishes and WhatsApp status cards in 1 tap for free.'
  },
  {
    question: 'Where can I find fresh daily Hindi Suvichar, motivational quotes, and Good Night status?',
    answer:
      'WishCrafto updates inspiring Hindi suvichar, spiritual shlokas, and soothing Good Night status images every single morning and evening. You can smoothly browse through cards using swipe gestures on mobile or the mouse wheel on desktop.'
  },
  {
    question: 'Why does WishCrafto consume 0 MB phone storage space compared to mobile apps?',
    answer:
      'WishCrafto is built as a next-generation Progressive Web App (PWA). Instead of downloading heavy 40MB+ APKs from app stores that slow down your smartphone and take up storage, WishCrafto gives you a full native status editing and sharing experience directly inside your mobile browser with 0 space used.'
  },
  {
    question: 'Can I create personalized Happy Birthday wishes and festival greeting cards for free?',
    answer:
      'Yes! WishCrafto offers customizable Happy Birthday photo status cards, anniversary greetings, and major Indian festival wishes (Janmashtami, Raksha Bandhan, 15 August, Diwali, Navratri). You can customize them with personal photos, names, and warm blessings.'
  },
  {
    question: 'Can local business owners and shopkeepers add their brand name and phone number?',
    answer:
      'Yes! Retail shopkeepers, local business owners, insurance agents, and professionals can personalize daily Good Morning, Suvichar, and festival greeting images with their business name, phone number, and branding to connect with clients on WhatsApp.'
  }
];

export default function HomePage({ onNavigate, onOpenCardModal }) {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['good-morning', 'good-night', 'janmashtami'].includes(tabParam)) {
        return tabParam;
      }
    } catch (e) {}
    return 'good-morning';
  });
  const [cardIndex, setCardIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('up');
  const [animationKey, setAnimationKey] = useState(0);
  // Sync activeTab with URL ?tab= parameter
  useEffect(() => {
    const handleUrlTab = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam && ['good-morning', 'good-night', 'janmashtami'].includes(tabParam)) {
          setActiveTab(tabParam);
          setCardIndex(0);
        }
      } catch (e) {}
    };
    handleUrlTab();
    window.addEventListener('popstate', handleUrlTab);
    return () => window.removeEventListener('popstate', handleUrlTab);
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState(null); // 'free' | 'pro'
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  // Movable Photo & Name Badge for Good Morning
  const [badgePos, setBadgePos] = useState({ x: 18, y: 89 });
  const [isDraggingBadge, setIsDraggingBadge] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialPosX: 38, initialPosY: 89 });
  const hasMovedRef = useRef(false);

  // In-place photo and name personalization
  const [userPhoto, setUserPhoto] = useState(() => {
    try { return localStorage.getItem('wishcrafto_user_photo') || null; } catch { return null; }
  });
  const [userName, setUserName] = useState(() => {
    try { return localStorage.getItem('wishcrafto_user_name') || ''; } catch { return ''; }
  });
  const fileInputRef = useRef(null);
  
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);
  const isWheelLocked = useRef(false);
  const mouseStartY = useRef(0);
  const isMouseDown = useRef(false);
  const stageRef = useRef(null);
  const canvasCardRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Active status list & card item
  const currentFeedList = DAILY_STATUS_FEED[activeTab] || DAILY_STATUS_FEED['good-morning'];
  const totalCards = currentFeedList.length;
  const currentCard = currentFeedList[cardIndex % totalCards] || currentFeedList[0];

  const handleNext = () => {
    setSlideDirection('up');
    setCardIndex((prev) => (prev + 1) % totalCards);
    setAnimationKey((k) => k + 1);
  };

  const handlePrev = () => {
    setSlideDirection('down');
    setCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setAnimationKey((k) => k + 1);
  };

  const nextHandlerRef = useRef(handleNext);
  const prevHandlerRef = useRef(handlePrev);
  nextHandlerRef.current = handleNext;
  prevHandlerRef.current = handlePrev;

  // Non-passive Native Wheel Listener to STRICTLY prevent full-page scroll when hovering on Card
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheelHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isWheelLocked.current) return;
      if (Math.abs(e.deltaY) > 12) {
        if (e.deltaY > 0) {
          nextHandlerRef.current();
        } else {
          prevHandlerRef.current();
        }
        isWheelLocked.current = true;
        setTimeout(() => {
          isWheelLocked.current = false;
        }, 320);
      }
    };

    stage.addEventListener('wheel', onWheelHandler, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheelHandler);
    };
  }, []);

  // Touch Swipe Handlers for Mobile: Horizontal swipe changes card, leaving vertical page scrolling completely smooth & unconflicted!
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;
    
    // If the movement was horizontal (left/right), change card:
    // deltaX > 40: Swiped left -> Next Card
    // deltaX < -40: Swiped right -> Previous Card
    // If vertical movement is equal or greater, user was scrolling the page, so leave page scrolling unaffected!
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Mouse Drag Handlers for PC
  const handleMouseDown = (e) => {
    mouseStartY.current = e.clientY;
    isMouseDown.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    const deltaY = mouseStartY.current - e.clientY;
    if (deltaY > 35) {
      handleNext();
    } else if (deltaY < -35) {
      handlePrev();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Unified Mouse & Touch Drag Handlers (Directly on Photo/Badge with 1:1 Canvas Ratio)
  const handleBadgeDragStart = (e) => {
    if (e.target.tagName === 'INPUT') return;
    const cardEl = canvasCardRef.current;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();

    isDraggingRef.current = true;
    setIsDraggingBadge(true);
    hasMovedRef.current = false;

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const initialPercentX = badgePos.x;
    const initialPercentY = badgePos.y;

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = moveEvent.clientX - startClientX;
      const deltaY = moveEvent.clientY - startClientY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        hasMovedRef.current = true;
      }

      const percentX = initialPercentX + (deltaX / rect.width) * 100;
      const percentY = initialPercentY + (deltaY / rect.height) * 100;

      const boundedX = Math.max(8, Math.min(88, percentX));
      const boundedY = Math.max(8, Math.min(94, percentY));
      setBadgePos({ x: boundedX, y: boundedY });
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDraggingBadge(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleBadgeTouchStart = (e) => {
    if (e.target.tagName === 'INPUT') return;
    const cardEl = canvasCardRef.current;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const touch = e.touches[0];

    isDraggingRef.current = true;
    setIsDraggingBadge(true);
    hasMovedRef.current = false;

    const startClientX = touch.clientX;
    const startClientY = touch.clientY;
    const initialPercentX = badgePos.x;
    const initialPercentY = badgePos.y;

    const onTouchMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const t = moveEvent.touches[0];
      const deltaX = t.clientX - startClientX;
      const deltaY = t.clientY - startClientY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        hasMovedRef.current = true;
      }

      const percentX = initialPercentX + (deltaX / rect.width) * 100;
      const percentY = initialPercentY + (deltaY / rect.height) * 100;

      const boundedX = Math.max(8, Math.min(88, percentX));
      const boundedY = Math.max(8, Math.min(94, percentY));
      setBadgePos({ x: boundedX, y: boundedY });
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDraggingBadge(false);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  };

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setCardIndex(0);
    setAnimationKey((k) => k + 1);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        setUserPhoto(result);
        try { localStorage.setItem('wishcrafto_user_photo', result); } catch (err) {}
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    try { localStorage.setItem('wishcrafto_user_name', newName); } catch (err) {}
  };

  const handleNameBlur = () => {
    if (userName && userName.trim().length >= 2) {
      const isAlreadyEnabled = localStorage.getItem('wishcrafto_notification_enabled');
      const isGranted = typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
      if (!isAlreadyEnabled && !isGranted) {
        window.dispatchEvent(new CustomEvent('wishcrafto:show-notification-prompt', {
          detail: { name: userName.trim() }
        }));
      }
    }
  };

  const FESTIVAL_QUOTES = {
    janmashtami: [
      "नंद के घर आनंद भयो, जय कन्हैया लाल की! हाथी घोड़ा पालकी, जय कन्हैया लाल की! श्री कृष्ण जन्माष्टमी की हार्दिक शुभकामनाएं!",
      "माखन चुराकर जिसने खाया, बंसी बजाकर जिसने नचाया, खुशी मनाओ उनके जन्मदिन की जिसने दुनिया को प्रेम का पाठ पढ़ाया। शुभ जन्माष्टमी!",
      "गोकुल में जिसने किया निवास, गोपियों संग रचाया रास, देवकी-यशोदा जिनकी मैया, ऐसे हमारे कृष्ण कन्हैया। जन्माष्टमी की हार्दिक बधाई!",
      "कृष्णा तेरी मुरली की धुन सुनकर दिल झूम जाता है, तेरे पावन नाम से हर बिगड़ा काम बन जाता है। जय श्री कृष्णा!",
      "पलकें झुकें और नमन हो जाए, मस्तक झुके और वंदन हो जाए, ऐसी नजर कहां से लाऊं मेरे कन्हैया, कि आपको याद करूं और दर्शन हो जाए। शुभ जन्माष्टमी!"
    ],
    'good-morning': [
      "सदा मुस्कुराते रहिये, आपका दिन शुभ और मंगलमय हो! शुभ प्रभात!",
      "ईश्वर की कृपा आप और आपके परिवार पर सदा बनी रहे। सुप्रभात!",
      "एक नई सुबह, एक नई शुरुआत, आपका हर पल खुशियों से भरा हो। शुभ प्रभात!"
    ],
    'good-night': [
      "शुभ रात्रि! ईश्वर की कृपा से आपकी रात शांतिपूर्ण और सपने मधुर हों।",
      "दिन भर की थकान मिटे, सुकून भरी नींद आए। शुभ रात्रि!"
    ]
  };

  const handleWhatsAppShare = async () => {
    const sender = userName.trim();
    const introLine = sender 
      ? `✨ *${sender} ji* ne aapke liye khaas message bheja hai:` 
      : `✨ Aapke liye ek khaas message bheja gaya hai:`;
    const titlePart = currentCard.title ? `*${currentCard.title}*` : '*श्री कृष्ण जन्माष्टमी*';
    
    // Ensure quote is NEVER empty: if currentCard.quote is empty, pick an authentic festival quote
    const activeQuotesList = FESTIVAL_QUOTES[activeTab] || FESTIVAL_QUOTES.janmashtami;
    const fallbackQuote = activeQuotesList[cardIndex % activeQuotesList.length];
    const finalQuote = (currentCard.quote && currentCard.quote.trim()) ? currentCard.quote.trim() : fallbackQuote;

    const quotePart = `\n\n"${finalQuote}"`;
    const ctaPart = `\n\n👉 *Aap bhi apna personal message yahan banayein:*\n🔗 https://wishcrafto.com/`;
    const shareText = `${introLine}\n\n${titlePart}${quotePart}${ctaPart}`;

    // Try Native Web Share with the actual Image File attached (Android/Mobile)
    try {
      if (navigator.share && navigator.canShare && currentCard?.image) {
        const response = await fetch(currentCard.image);
        const blob = await response.blob();
        const extension = blob.type.includes('jpeg') || blob.type.includes('jpg') ? 'jpg' : (blob.type.includes('webp') ? 'webp' : 'png');
        const file = new File([blob], `WishCrafto-${Date.now()}.${extension}`, { type: blob.type || 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: currentCard.title || 'WishCrafto Status Card',
            text: shareText
          });
          return;
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.log('Native file share fallback', err);
      } else {
        return; // User cancelled share sheet
      }
    }

    // Fallback for Desktop or browsers where file sharing is unsupported
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    triggerPersonalizedNotification(sender);
  };

  const handleProPhotoDownload = () => {
    if (!userPhoto) {
      fileInputRef.current?.click();
      return;
    }
    setIsProModalOpen(true);
  };

  const handleProUnlockSuccess = () => {
    setIsProModalOpen(false);
    handleDirectDownload(true);
  };

  // 1-Tap Direct HD Card Download (withPhoto = true for PRO with photo, false for Free with name only)
  const handleDirectDownload = async (withPhoto = false) => {
    if (isDownloading) return;
    triggerPersonalizedNotification(userName);
    setIsDownloading(true);
    setDownloadType(withPhoto ? 'pro' : 'free');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // 1. Draw Background Image
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = currentCard.image;
      await new Promise((resolve) => {
        bgImg.onload = resolve;
        bgImg.onerror = resolve;
      });

      if (bgImg.width) {
        const scale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height);
        const x = (canvas.width - bgImg.width * scale) / 2;
        const y = (canvas.height - bgImg.height * scale) / 2;
        ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);
      } else {
        ctx.fillStyle = '#1e1035';
        ctx.fillRect(0, 0, 1080, 1080);
      }

      // 2. Gradient Overlay (minimal vignette for cards with embedded text/no quote)
      if (currentCard.hasEmbeddedText || !currentCard.quote) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.12)');
        gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.72, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1080);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        gradient.addColorStop(0.22, 'rgba(0, 0, 0, 0.05)');
        gradient.addColorStop(0.48, 'rgba(0, 0, 0, 0.12)');
        gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.65)');
        gradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.92)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1080);
      }

      // 3. Top Category Badge Pill (Only if quote exists or not embedded art)
      if (currentCard.quote) {
        const badgeText = `${currentCard.category} • ${currentCard.title}`;
        ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const textMetrics = ctx.measureText(badgeText);
        const pillW = Math.min(textMetrics.width + 48, 900);
        const pillH = 46;
        const pillX = (1080 - pillW) / 2;
        const pillY = 48;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 23);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffb936';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, 1080 / 2, pillY + pillH / 2);
        ctx.restore();
      }

      // 4. Frosted Quote Glass Box in Lower Area (Only if quote exists)
      if (currentCard.quote) {
        const boxX = 60;
        const boxY = 620;
        const boxW = 960;
        const boxH = 250;

        ctx.save();
        ctx.fillStyle = 'rgba(15, 10, 25, 0.72)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 22);
        ctx.fill();
        ctx.stroke();

        // Golden accent border on left
        ctx.fillStyle = '#ffb936';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY + 16, 6, boxH - 32, 3);
        ctx.fill();

        // Quote text wrapping
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 34px Georgia, "Playfair Display", "Hind", serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const quoteStr = `"${currentCard.quote}"`;
        const words = quoteStr.split(' ');
        let currentLine = '';
        let lineY = boxY + 32;
        const maxLineWidth = boxW - 64;

        for (let n = 0; n < words.length; n++) {
          const testLine = currentLine + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxLineWidth && n > 0) {
            ctx.fillText(currentLine, boxX + 32, lineY);
            currentLine = words[n] + ' ';
            lineY += 46;
            if (lineY > boxY + boxH - 46) break;
          } else {
            currentLine = testLine;
          }
        }
        ctx.fillText(currentLine, boxX + 32, lineY);
        ctx.restore();
      }

      // 5. Signature & Name Badge (PRO with Photo vs FREE with Name only)
      const isGm = activeTab === 'good-morning' || activeTab === 'good-night' || activeTab === 'janmashtami';
      const displayName = userName.trim() || 'wishcrafto.com';
      const tagText = 'Wish By :';
      const tagFont = '800 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const nameFont = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      const avatarR = 80;
      let avatarCenterX, avatarCenterY;
      if (isGm) {
        avatarCenterX = Math.round((badgePos.x / 100) * 1080);
        avatarCenterY = Math.round((badgePos.y / 100) * 1080);
        avatarCenterX = Math.max(avatarR + 15, Math.min(1080 - avatarR - 15, avatarCenterX));
        avatarCenterY = Math.max(avatarR + 15, Math.min(1080 - avatarR - 12, avatarCenterY));
      } else {
        avatarCenterX = 130;
        avatarCenterY = 920;
      }

      if (withPhoto) {
        // PRO WITH PHOTO: Draw Circular Avatar Ring + Image
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 6;
        ctx.beginPath();
        ctx.arc(avatarCenterX, avatarCenterY, avatarR, 0, Math.PI * 2);
        ctx.fillStyle = '#1e1035';
        ctx.fill();
        ctx.restore();

        if (userPhoto) {
          const uImg = new Image();
          uImg.src = userPhoto;
          await new Promise((res) => {
            uImg.onload = res;
            uImg.onerror = res;
          });

          // Calculate true aspect-ratio centered crop (object-fit: cover) so non-square photos never stretch or tilt
          const imgW = uImg.naturalWidth || uImg.width || 1;
          const imgH = uImg.naturalHeight || uImg.height || 1;
          const minDim = Math.min(imgW, imgH);
          const sx = (imgW - minDim) / 2;
          const sy = (imgH - minDim) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.arc(avatarCenterX, avatarCenterY, avatarR, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(
            uImg,
            sx, sy, minDim, minDim,
            avatarCenterX - avatarR, avatarCenterY - avatarR, avatarR * 2, avatarR * 2
          );
          ctx.restore();

          // Elegant Double Border Ring (White + Gold)
          ctx.save();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(avatarCenterX, avatarCenterY, avatarR, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = '#ffb936';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(avatarCenterX, avatarCenterY, avatarR + 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.save();
          ctx.fillStyle = '#1e1035';
          ctx.strokeStyle = '#ffb936';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(avatarCenterX, avatarCenterY, avatarR, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#ffb936';
          ctx.font = 'bold 54px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✨', avatarCenterX, avatarCenterY);
          ctx.restore();
        }

        // Draw Name badge next to Photo
        const textX = avatarCenterX + avatarR + 24;
        ctx.save();
        ctx.font = tagFont;
        const tagW = ctx.measureText(tagText).width;
        ctx.font = nameFont;
        const nameW = ctx.measureText(displayName).width;
        const maxTextW = Math.max(tagW, nameW);

        const pillPadX = 18;
        const pillX = textX - 8;
        const pillY = avatarCenterY - 48;
        const pillW = maxTextW + pillPadX * 2 + 6;
        const pillH = 96;

        ctx.fillStyle = 'rgba(10, 6, 18, 0.85)';
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.45)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 16);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#ffb936';
        ctx.beginPath();
        ctx.roundRect(pillX, pillY + 12, 5, pillH - 24, 2.5);
        ctx.fill();

        ctx.fillStyle = '#ffd06a';
        ctx.font = tagFont;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tagText, textX + 10, avatarCenterY - 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = nameFont;
        ctx.fillText(displayName, textX + 10, avatarCenterY + 20);
        ctx.restore();

      } else {
        // FREE WITHOUT PHOTO: Left-align the name badge cleanly so NO awkward empty photo gap is left!
        ctx.save();
        ctx.font = tagFont;
        const tagW = ctx.measureText(tagText).width;
        ctx.font = nameFont;
        const nameW = ctx.measureText(displayName).width;
        const maxTextW = Math.max(tagW, nameW);

        const pillPadX = 22;
        const pillX = 55; // Clean left margin instead of offsetting for missing photo
        const pillY = Math.min(1080 - 96 - 40, Math.max(40, avatarCenterY - 48));
        const pillW = maxTextW + pillPadX * 2 + 10;
        const pillH = 96;

        ctx.fillStyle = 'rgba(10, 6, 18, 0.88)';
        ctx.strokeStyle = 'rgba(255, 185, 54, 0.45)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 16);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#ffb936';
        ctx.beginPath();
        ctx.roundRect(pillX, pillY + 12, 5, pillH - 24, 2.5);
        ctx.fill();

        ctx.fillStyle = '#ffd06a';
        ctx.font = tagFont;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tagText, pillX + 22, pillY + 28);

        ctx.fillStyle = '#ffffff';
        ctx.font = nameFont;
        ctx.fillText(displayName, pillX + 22, pillY + 68);
        ctx.restore();
      }

      // 6. Branding Watermark (Always cleanly anchored at Bottom Right)
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fillText('✨ WishCrafto.com', 1080 - 45, 1080 - 35);
      ctx.restore();

      // 7. Instant File Download
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Canvas to Blob failed');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const cleanName = (userName.trim() || 'Status').replace(/[^a-zA-Z0-9]/g, '_');
        link.download = `WishCrafto_${cleanName}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png', 0.95);

    } catch (err) {
      console.error('Download error:', err);
      alert('Card download karne me samasya aayi. Kripya punah prayas karein.');
    } finally {
      setIsDownloading(false);
      setDownloadType(null);
    }
  };

  return (
    <div 
      className="home-page" 
      style={{ 
        position: 'relative', 
        background: 'linear-gradient(180deg, #ffffff 0%, #f5f3ff 50%, #ede9fe 100%)', 
        color: '#1e1b4b', 
        minHeight: '100vh',
        marginBottom: 0,
        paddingBottom: '2rem'
      }}
    >
      {/* Hidden File Input for Instant 1-Tap Photo Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoSelect} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* ── 1. Crafto-Style Main App Feed Stage ── */}
      <section className="crafto-feed-container">
        {/* Top Category Pill Bar */}
        <nav className="crafto-category-bar" aria-label="Status Categories">
          {DAILY_STATUS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`crafto-pill-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleTabSwitch(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Status Card Feed Stage (Crafto Vertical Swipe & PC Mouse Wheel Interface) */}
        <div className="crafto-card-stage-wrapper">
          <div 
            ref={stageRef}
            className="crafto-card-stage"
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
            title="Scroll mouse wheel or swipe up/down for next status"
          >
            {/* Animated Canvas Card with Vertical Slide Transitions */}
            <div 
              ref={canvasCardRef}
              key={animationKey}
              className={`crafto-card-canvas slide-animate-${slideDirection} ${currentCard.hasEmbeddedText || !currentCard.quote ? 'embedded-art' : ''}`}
              style={{
                backgroundImage: `url('${currentCard.image}')`,
                cursor: 'grab'
              }}
            >
              {/* Top Category Badge (only shown if not embedded art or when quote exists) */}
              {currentCard.quote && (
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span className="crafto-card-badge">{currentCard.category} • {currentCard.title}</span>
                </div>
              )}

              {/* Lower Section: Frosted Glass Quote Graphic (Only shown if quote exists) */}
              {currentCard.quote ? (
                <div className="crafto-card-content">
                  <p className="crafto-card-quote">"{currentCard.quote}"</p>
                </div>
              ) : null}

              {/* Interactive In-Place User Photo & Name Badge (Directly Draggable on Card) */}
              <div 
                className={`crafto-user-overlay ${(activeTab === 'good-morning' || activeTab === 'good-night' || activeTab === 'janmashtami') ? 'draggable-overlay' : ''}`}
                style={(activeTab === 'good-morning' || activeTab === 'good-night' || activeTab === 'janmashtami') ? {
                  position: 'absolute',
                  left: `${badgePos.x}%`,
                  top: `${badgePos.y}%`,
                  transform: 'translate(-41px, -41px)',
                  cursor: isDraggingBadge ? 'grabbing' : 'grab',
                  touchAction: 'none'
                } : {}}
                onMouseDown={(activeTab === 'good-morning' || activeTab === 'good-night' || activeTab === 'janmashtami') ? handleBadgeDragStart : undefined}
                onTouchStart={(activeTab === 'good-morning' || activeTab === 'good-night' || activeTab === 'janmashtami') ? handleBadgeTouchStart : undefined}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="crafto-user-avatar-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasMovedRef.current) {
                      fileInputRef.current?.click();
                    }
                  }}
                  title={userPhoto ? "फ़ोटो बदलने के लिए क्लिक करें या ड्रैग करें" : "अपनी फ़ोटो लगाने के लिए क्लिक करें"}
                >
                  {userPhoto ? (
                    <img src={userPhoto} alt="User Uploaded" className="crafto-uploaded-img" />
                  ) : (
                    <div className="crafto-avatar-placeholder">
                      <Camera size={18} />
                    </div>
                  )}
                  <span className="avatar-edit-badge"><Edit3 size={10} /></span>
                </button>

                <div className="crafto-user-meta">
                  <span className="crafto-thought-tag">Wish By :</span>
                  <div className="crafto-name-input-wrapper">
                    <input
                      type="text"
                      value={userName}
                      onChange={handleNameChange}
                      onBlur={handleNameBlur}
                      placeholder="wishcrafto.com"
                      className="crafto-inline-name-input"
                      maxLength={24}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Floating Swipe Controls (Top-Right of Card) */}
            <div className="crafto-vertical-controls" aria-label="Swipe to next status">
              <button 
                className="crafto-swipe-btn" 
                onClick={handlePrev} 
                title="Previous Status (Roll Wheel Up / Click)"
                aria-label="Previous Status"
              >
                <ChevronUp size={14} />
              </button>
              
              <span className="crafto-counter-pill">
                {((cardIndex % totalCards) + 1)} / {totalCards}
              </span>

              <button 
                className="crafto-swipe-btn" 
                onClick={handleNext} 
                title="Next Status (Roll Wheel Down / Click)"
                aria-label="Next Status"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Crafto Action Bar (3 Uniform Equal-Sized Primary Action Buttons) */}
            <div className="crafto-action-bar">
              <div className="crafto-action-buttons">
                <button 
                  className="crafto-btn-whatsapp" 
                  onClick={handleWhatsAppShare}
                  title="WhatsApp status par share karein"
                >
                  <WhatsAppIcon size={18} />
                  <span>Share</span>
                </button>

                <button 
                  className="crafto-btn-download free-download-btn" 
                  onClick={() => handleDirectDownload(false)}
                  disabled={isDownloading}
                  title="Bina photo ke apna naam daalkar Free Download karein"
                >
                  {isDownloading && downloadType === 'free' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  <span>{isDownloading && downloadType === 'free' ? 'Saving...' : 'Free Download'}</span>
                </button>

                <button 
                  className="crafto-btn-download pro-photo-download-btn" 
                  onClick={handleProPhotoDownload} 
                  disabled={isDownloading}
                  title="Apni Photo aur Naam ke sath PRO Card Download karein"
                >
                  {isDownloading && downloadType === 'pro' ? <Loader2 size={16} className="animate-spin" /> : <Crown size={16} style={{ color: '#ffd06a' }} />}
                  <span>{isDownloading && downloadType === 'pro' ? 'Saving...' : <>With Photo <span className="pro-pill-mini">PRO</span></>}</span>
                </button>
              </div>

              {/* Mobile & PC Interaction Hint */}
              <div className="crafto-swipe-hint" onClick={handleNext}>
                <span className="crafto-hint-mobile">👈 Swipe Left/Right ya Arrows se cards badlein 👉</span>
                <span className="crafto-hint-desktop">🖱️ Mouse Wheel Roll karein ya Arrows se cards badlein</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. About WishCrafto & Daily Status Hub (High-Rank SEO & Clean Keywords) ── */}
      <section style={{ maxWidth: '960px', margin: '0 auto 2.5rem auto', padding: '1.5rem 1rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '5px 16px',
            borderRadius: '999px',
            background: '#f3e8ff',
            color: '#7c3aed',
            fontSize: '0.84rem',
            fontWeight: '700',
            marginBottom: '0.8rem',
            border: '1.5px solid #d8b4fe'
          }}>
            ✨ Daily Good Morning Images, Quotes &amp; Festival Status Maker
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#1e1b4b', fontWeight: '800', margin: '0.2rem 0 0.8rem 0' }}>
            WishCrafto: Daily Suvichar, Greetings &amp; Festival Photo Card Hub
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.02rem', maxWidth: '820px', margin: '0 auto 0.8rem auto', lineHeight: '1.7' }}>
            Welcome to WishCrafto, your free one-stop destination for personalized greeting cards and daily WhatsApp status. Download new Good Morning images, quotes, wishes, Good Night wishes, daily Suvichar, and festival wishes with your photo &amp; name in 1 tap without downloading heavy apps.
          </p>
          <p style={{ color: '#4b5563', fontSize: '0.98rem', maxWidth: '820px', margin: '0 auto 0.8rem auto', lineHeight: '1.65' }}>
            Whether you want to celebrate someone's special day with custom Happy Birthday wishes with photo and name, start the day with inspiring Good Morning suvichar, express your feelings with heartfelt Hindi shayari, or share blessings on sacred Indian festivals like Shri Krishna Janmashtami and Raksha Bandhan—WishCrafto is made for you.
          </p>
          <p style={{ color: '#6d28d9', fontSize: '0.98rem', fontWeight: '700', maxWidth: '820px', margin: '0 auto', lineHeight: '1.6' }}>
            Every quote and status image is instantly downloadable with your custom photo and name in seconds, helping you express and connect more personally with zero app download.
          </p>
        </div>
      </section>

      {/* ── 4. Create Your Custom Wishes in 3 Easy Steps (Below Introduction) ── */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '3.5rem' }}>
        <div 
          style={{ 
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', 
            borderRadius: '28px', 
            border: '2px solid #ddd6fe', 
            padding: '3rem 2rem', 
            maxWidth: '1200px', 
            margin: '0 auto',
            boxShadow: '0 20px 40px rgba(109, 40, 217, 0.08)'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#1e1b4b', fontWeight: '800' }}>
              Create Your Custom Wishes in 3 Easy Steps
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', margin: '0.8rem auto 2rem' }}>
              No login required, 100% free forever, works smoothly on every mobile browser.
            </p>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '1.5rem',
                textAlign: 'left',
                marginBottom: '1rem'
              }}
            >
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '18px', border: '1px solid #c4b5fd' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7c3aed' }}>01</span>
                <h4 style={{ color: '#1e1b4b', margin: '0.4rem 0 0.2rem', fontSize: '1.1rem' }}>Choose Status</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.88rem' }}>
                  Scroll up/down or pick Janmashtami, Good Morning, or Good Night tabs.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '18px', border: '1px solid #c4b5fd' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7c3aed' }}>02</span>
                <h4 style={{ color: '#1e1b4b', margin: '0.4rem 0 0.2rem', fontSize: '1.1rem' }}>Add Photo &amp; Name</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.88rem' }}>
                  Click "Your Photo" right on the card and enter your family or shop name.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '18px', border: '1px solid #c4b5fd' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7c3aed' }}>03</span>
                <h4 style={{ color: '#1e1b4b', margin: '0.4rem 0 0.2rem', fontSize: '1.1rem' }}>Share on WhatsApp</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.88rem' }}>
                  Download in HD or share immediately with friends, groups, and family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ Section ── */}
      <section style={{ maxWidth: '960px', margin: '0 auto 2rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#1e1b4b', fontWeight: '800' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1rem', marginTop: '0.4rem' }}>
            Everything you need to know about creating and downloading free status wishes.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                border: '1px solid #c4b5fd',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 4px 15px rgba(109, 40, 217, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onClick={() => toggleFaq(index)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <h3 style={{ color: '#1e1b4b', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{faq.question}</h3>
                <ChevronDown 
                  size={22} 
                  style={{ 
                    color: '#6d28d9', 
                    transform: openFaqIndex === index ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0
                  }} 
                />
              </div>
              {openFaqIndex === index && (
                <p style={{ color: '#4b5563', fontSize: '0.98rem', lineHeight: '1.7', marginTop: '0.9rem', marginBottom: 0 }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pro Studio & UPI Scanner Unlock Modal */}
      <ProUnlockModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onUnlockSuccess={handleProUnlockSuccess}
        cardData={currentCard}
      />
    </div>
  );
}
