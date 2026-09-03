import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('fv_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [accentColor, setAccentColor] = useState('saffron'); // 'saffron' | 'gold' | 'vermillion'

  useEffect(() => {
    localStorage.setItem('fv_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      bookmarks,
      toggleBookmark,
      accentColor,
      setAccentColor
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
