import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { triggerPersonalizedNotification } from '../utils/notificationManager';
import './PWAInstallPrompt.css';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [activeName, setActiveName] = useState(() => {
    try { return localStorage.getItem('wishcrafto_user_name') || ''; } catch { return ''; }
  });

  useEffect(() => {
    // 1. Check if user already granted notification permission or previously enabled
    const isAlreadyEnabled = localStorage.getItem('wishcrafto_notification_enabled');
    const isDismissedThisSession = sessionStorage.getItem('wishcrafto_notification_dismissed');

    // If Notification API exists and is already granted, don't show
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      return;
    }

    const isProduction = typeof window !== 'undefined' && window.location.hostname === 'wishcrafto.com';

    // In production, respect permanent enablement. In local testing, allow re-testing
    if (isProduction && isAlreadyEnabled === 'true') {
      return;
    }
    if (isDismissedThisSession === 'true') {
      return;
    }

    // 2. Listen for beforeinstallprompt in background (fires on HTTPS & localhost)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 3. Show the prompt after 2 seconds so user sees page first (Works on Localhost & Live!)
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2000);

    // 4. Custom event listener to trigger prompt immediately when user enters name
    const handleCustomTrigger = (e) => {
      const name = e.detail?.name || localStorage.getItem('wishcrafto_user_name') || '';
      if (name) setActiveName(name);
      setShowPrompt(true);
    };
    window.addEventListener('wishcrafto:show-notification-prompt', handleCustomTrigger);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('wishcrafto:show-notification-prompt', handleCustomTrigger);
    };
  }, []);

  const handleEnable = async () => {
    setShowPrompt(false);
    sessionStorage.setItem('wishcrafto_notification_dismissed', 'true');
    localStorage.setItem('wishcrafto_notification_enabled', 'true');

    // Trigger PWA install prompt if browser captured it (HTTPS / Localhost)
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch (e) {
        console.log('PWA prompt handled', e);
      }
    }

    // Trigger notification permission and welcome alert with user's name
    await triggerPersonalizedNotification(activeName);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('wishcrafto_notification_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="pwa-install-banner-wrapper" role="dialog" aria-label="Notification prompt">
      <div className="pwa-install-banner">
        <div className="pwa-banner-content">
          <div className="pwa-icon-bell-wrap">
            <Bell size={22} className="pwa-bell-icon" />
          </div>
          <div className="pwa-banner-text-block">
            <h4>दैनिक स्टेटस अपडेट्स 🦚</h4>
            <p>
              {activeName && activeName.trim() ? (
                <><strong>{activeName.trim()} ji</strong>, क्या आप रोज़ सुबह Good Morning और नए त्योहारों के स्टेटस पाना चाहते हैं?</>
              ) : (
                "क्या आप रोज़ सुबह Good Morning और नए त्योहारों के स्टेटस पाना चाहते हैं?"
              )}
            </p>
          </div>
        </div>

        <div className="pwa-banner-buttons-row">
          <button 
            type="button" 
            className="pwa-btn-enable" 
            onClick={handleEnable}
            title="स्टेटस नोटिफिकेशन्स चालू करें"
          >
            🔔 हाँ, चालू करें
          </button>
          <button 
            type="button" 
            className="pwa-btn-later" 
            onClick={handleDismiss}
            title="बाद में याद दिलाएं"
          >
            बाद में
          </button>
        </div>
      </div>
    </div>
  );
}
