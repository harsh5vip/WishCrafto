// High-Converting Daily Status Data for WishCrafto App Feed Interface

export const DAILY_STATUS_CATEGORIES = [
  { id: 'good-morning', label: '🌅 Good Morning', icon: '🌅' },
  { id: 'good-night', label: '🌙 Good Night', icon: '🌙' },
  { id: 'janmashtami', label: '🦚 Janmashtami', icon: '🦚' },
  { id: 'recent', label: '🕐 Recent', icon: '🕐' }
];

export const DAILY_STATUS_FEED = {
  'good-morning': [
    {
      id: 'gm-1',
      category: 'Good Morning',
      title: 'सुप्रभात सुविचार',
      quote: 'सफलता की शुरुआत हमेशा एक छोटी सी सकारात्मक सोच से होती है। आपका दिन मंगलमय हो!',
      author: 'शुभ प्रभात',
      image: '/HD Wallpapers/krishna_night_lotus_rakhi.jpg',
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      textColor: '#78350f'
    },
    {
      id: 'gm-2',
      category: 'Good Morning',
      title: 'आज का सुविचार',
      quote: 'मुस्कुराहट वो चिराग है जो हर दिल को रोशन कर देती है। हंसते रहिए, मुस्कुराते रहिए! सुप्रभात!',
      author: 'दैनिक प्रेरणा',
      image: '/HD Wallpapers/divine_blessings_raksha_bandhan.jpg',
      bgGradient: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
      textColor: '#7c2d12'
    },
    {
      id: 'gm-3',
      category: 'Good Morning',
      title: 'सकारात्मक सोच',
      quote: 'Every new morning brings a new chance to write a beautiful chapter in your life. Good Morning!',
      author: 'Daily Positive',
      image: '/HD Wallpapers/royal_thali_rakhi_celebration.jpg',
      bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
      textColor: '#1e1b4b'
    }
  ],
  'good-night': [
    {
      id: 'gn-1',
      category: 'Good Night',
      title: 'शुभ रात्रि संदेश',
      quote: 'दिन भर की थकावट के बाद, ईश्वर आपको एक शांत और सुकून भरी नींद प्रदान करे। शुभ रात्रि!',
      author: 'शान्ति संदेश',
      image: '/HD Wallpapers/krishna_moonlit_rakhi_1.jpg',
      bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      textColor: '#f8fafc'
    },
    {
      id: 'gn-2',
      category: 'Good Night',
      title: 'मीठे सपने',
      quote: 'May the stars bring peace to your soul and sweet dreams to your heart. Good Night!',
      author: 'Night Blessing',
      image: '/HD Wallpapers/krishna_night_lotus_rakhi.jpg',
      bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      textColor: '#e0e7ff'
    }
  ],
  'janmashtami': [
    {
      id: 'jk-1',
      category: 'Janmashtami',
      title: 'श्री कृष्ण जन्माष्टमी उत्सव',
      quote: 'माखन चोर, नंद किशोर, जो बांधे सबको प्रेम की डोर! श्री कृष्ण जन्माष्टमी की आप सभी को हार्दिक शुभकामनाएं! जय श्री कृष्णा! 🦚✨',
      author: 'जन्माष्टमी 2026',
      image: '/HD Wallpapers/young_krishna_peacock_rakhi.jpg',
      bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      textColor: '#fbbf24'
    },
    {
      id: 'jk-2',
      category: 'Janmashtami',
      title: 'भगवद गीता उपदेश',
      quote: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। अपने कर्म में विश्वास रखें, सफलता आपके कदम चूमेगी। शुभ जन्माष्टमी!',
      author: 'गीता सार',
      image: '/HD Wallpapers/bal_krishna_ganesha_rakhi_1.jpg',
      bgGradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
      textColor: '#ecfdf5'
    },
    {
      id: 'jk-3',
      category: 'Janmashtami',
      title: 'बाल गोपाल जन्मोत्सव',
      quote: 'May Lord Krishna shower His divine blessings, peace, health and eternal prosperity upon you and your family. Happy Janmashtami! 🦚',
      author: 'Radha Krishna Bhakti',
      image: '/HD Wallpapers/bal_ganesha_krishna_rakhi_3.jpg',
      bgGradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
      textColor: '#fef08a'
    }
  ],
  'recent': [
    {
      id: 'rc-1',
      category: 'Recent',
      title: 'रक्षाबंधन पर्व स्मृति',
      quote: 'रेशम की डोरी, बहनों का प्यार, मुबारक हो आपको रक्षाबंधन का त्योहार! खुशियों से भरा रहे आपका संसार!',
      author: 'Raksha Bandhan Special',
      image: '/HD Wallpapers/brother_sister_rakhi_1.jpg',
      bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
      textColor: '#fef3c7'
    },
    {
      id: 'rc-2',
      category: 'Recent',
      title: '15 अगस्त स्वतंत्रता दिवस',
      quote: 'कुछ नशा तिरंगे की आन का है, कुछ नशा मातृभूमि की शान का है! स्वतंत्रता दिवस की हार्दिक शुभकामनाएं! 🇮🇳',
      author: '15 August Patriotic',
      image: '/HD Wallpapers/divine_blessings_raksha_bandhan.jpg',
      bgGradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
      textColor: '#ffffff'
    }
  ]
};
