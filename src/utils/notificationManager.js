// Utility to request notification permission and trigger personalized notification
export async function triggerPersonalizedNotification(customName) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return;
  }

  // If already blocked/denied by user in Chrome settings, do nothing
  if (Notification.permission === 'denied') {
    return;
  }

  try {
    let permission = Notification.permission;
    
    // If not granted yet, ask for permission
    if (permission !== 'granted') {
      try {
        permission = await Notification.requestPermission();
      } catch (e) {
        permission = await new Promise((res) => Notification.requestPermission(res));
      }
    }

    if (permission === 'granted') {
      const name = customName || localStorage.getItem('wishcrafto_user_name') || '';
      const greeting = name && name.trim() ? `${name.trim()} ji, ` : '';

      const title = "WishCrafto ✨";
      const options = {
        body: `${greeting}आपका स्टेटस अलर्ट चालू हो गया है! रोज़ सुबह नए कार्ड्स मिलेंगे। 🦚`,
        icon: "/favicon-192x192.png",
        badge: "/favicon-48x48.png",
        vibrate: [200, 100, 200],
        tag: "welcome-alert",
        renotify: true
      };

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, options);
        }).catch(() => {
          try { new Notification(title, options); } catch {}
        });
      } else {
        try { new Notification(title, options); } catch {}
      }

      localStorage.setItem('wishcrafto_notification_enabled', 'true');
    }
  } catch (err) {
    console.log('Personalized notification error:', err);
  }
}
