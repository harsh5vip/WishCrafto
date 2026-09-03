import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Share2, Download, Edit3, Heart, ChevronDown, ChevronLeft, ChevronRight, 
  Sparkles, BookOpen, Wand2, ArrowRight, Check, Star, Copy 
} from 'lucide-react';
import { JANMASTHAMI_LEGENDS, JANMASTHAMI_STORIES, JANMASTHAMI_50_WISHES } from '../data/janmashtamiStoryData';
import WhatsAppIcon from '../components/WhatsAppIcon';
import './History.css';

const SHORT_TITLES = {
  hi: {
    'krishna-birth': 'मथुरा जन्म लीला',
    'krishna-butter': 'माखन चोर लीला',
    'krishna-govardhan': 'गोवर्धन पर्वत लीला',
    'full-history-article': 'सम्पूर्ण इतिहास'
  },
  en: {
    'krishna-birth': 'Divine Birth',
    'krishna-butter': 'The Butter Thief',
    'krishna-govardhan': 'Govardhan Hill',
    'full-history-article': 'Janmashtami History'
  }
};

const JANMASTHAMI_FAQS_EN = [
  {
    question: "What is Shri Krishna Janmashtami and why is it celebrated?",
    answer: "Shri Krishna Janmashtami, also known as Gokulashtami or Krishna Jayanti, celebrates the divine birth of Lord Krishna, the eighth avatar of Lord Vishnu. Lord Krishna appeared in Mathura to liberate humanity from King Kansa's tyranny, restore cosmic righteousness (Dharma), and deliver the sacred wisdom of the Bhagavad Gita."
  },
  {
    question: "When is Krishna Janmashtami 2026? What is the auspicious Nishita Kaal Puja Muhurat?",
    answer: "Krishna Janmashtami will be celebrated on Friday, September 4, 2026. The most sacred worship occurs during Nishita Kaal (midnight), between 11:57 PM and 12:43 AM (46-minute auspicious window), which marks the exact moment of Lord Krishna's divine birth."
  },
  {
    question: "Why is Janmashtami celebrated on two different days (Smartha vs Vaishnava)?",
    answer: "Janmashtami is often celebrated over two consecutive days because the Ashtami Tithi and Rohini Nakshatra span across midnight and sunrise. Smartha householders celebrate on the first day when Ashtami prevails at midnight, while Vaishnava traditions (such as ISKCON, Mathura, and Vrindavan) celebrate on the following day based on sunrise Udaya Tithi."
  },
  {
    question: "What is the spiritual significance of the Dahi Handi (Gopal Kala) festival?",
    answer: "Dahi Handi reenacts young Krishna's playful Makhan Chor pastimes in Gokul, where he formed human pyramids with cowherd friends (gopas) to reach earthen pots filled with freshly churned butter hung high by the gopis. It symbolizes unity, joyful devotion, and breaking ego."
  },
  {
    question: "Why did Lord Krishna lift Mount Govardhan on his little finger?",
    answer: "Lord Krishna lifted Mount Govardhan on his left little finger for seven days to protect the villagers, cows, and nature of Braj from rainstorms sent by Indra. This pastime taught that worshiping ecology, cows, and nature is greater than pleasing deities."
  },
  {
    question: "How can I create and download custom Janmashtami wishes with my photo and name?",
    answer: "On WishCrafto, you can choose from 16 authentic Krishna images and sacred story scenes, tap 'Your Photo' to add your picture, type your family or shop name, and download in 1 tap free in HD for WhatsApp status sharing."
  }
];

const JANMASTHAMI_FAQS_HI = [
  {
    question: "श्री कृष्ण जन्माष्टमी क्यों मनाई जाती है और इसका क्या धार्मिक महत्व है?",
    answer: "श्री कृष्ण जन्माष्टमी भगवान श्री हरि विष्णु के आठवें अवतार 'श्री कृष्ण' के प्राकट्य दिवस के रूप में मनाई जाती है। द्वापर युग में मथुरा के क्रूर राजा कंस के अत्याचारों से मुक्ति दिलाने, धर्म की पुनर्स्थापना करने और गीता का अमर उपदेश देने के लिए प्रभु ने अवतार लिया था।"
  },
  {
    question: "कृष्ण जन्माष्टमी 2026 में कब है और निशिता काल पूजा मुहूर्त क्या है?",
    answer: "श्री कृष्ण जन्माष्टमी 2026 का पावन पर्व शुक्रवार, 4 सितंबर 2026 को मनाया जाएगा। मध्यरात्रि में बाल गोपाल के जन्मोत्सव का सबसे पवित्र निशिता काल पूजा मुहूर्त रात 11:57 बजे से 12:43 बजे (46 मिनट का शुभ मुहूर्त) तक रहेगा।"
  },
  {
    question: "जन्माष्टमी दो अलग-अलग दिन (स्मार्त और वैष्णव) क्यों मनाई जाती है?",
    answer: "हिंदू पंचांग के अनुसार भाद्रपद कृष्ण पक्ष की अष्टमी तिथि और रोहिणी नक्षत्र दो दिनों तक व्याप्त रहता है। स्मार्त मत (गृहस्थजन) पहले दिन अर्धरात्रि में अष्टमी तिथि होने पर जन्माष्टमी मनाते हैं, जबकि वैष्णव संप्रदाय (इस्कॉन, मथुरा-वृंदावन संत) अगले दिन उदया तिथि में जन्मोत्सव मनाते हैं।"
  },
  {
    question: "दही-हांडी (गोपाल काला) उत्सव का क्या धार्मिक महत्व है?",
    answer: "दही-हांडी उत्सव भगवान श्री कृष्ण की बाल लीला (माखन चोरी) का पावन प्रतीक है। कान्हा अपने बाल-सखाओं के साथ मानव पिरामिड बनाकर छतों पर टंगी मटकियों से माखन चुराते थे और आपस में बांटते थे। यह उत्सव आपसी सहयोग, एकता और निश्छल प्रेम का संदेश देता है।"
  },
  {
    question: "श्री कृष्ण ने गोवर्धन पर्वत अपनी कनिष्ठा उंगली पर क्यों उठाया था?",
    answer: "देवराज इंद्र के अहंकार को समाप्त करने और मूसलाधार वर्षा से ब्रजवासियों व बेजुबान पशुओं की रक्षा करने के लिए सात वर्ष के बाल कृष्ण ने लगातार 7 दिनों तक गोवर्धन पर्वत को अपनी छोटी उंगली पर उठाए रखा था। इससे प्रकृति और गौ-माता के संरक्षण का अमर संदेश मिला।"
  },
  {
    question: "विशक्राफ्टो पर अपनी फोटो और नाम के साथ जन्माष्टमी विशेज कार्ड कैसे बनाएं?",
    answer: "विशक्राफ्टो पर आप 16 दिव्य कृष्ण छवियों में से मनपसंद इमेज चुनकर, 'Your Photo' पर क्लिक करके अपनी तस्वीर लगा सकते हैं और अपना व परिवार का नाम लिखकर 1-टैप में फ्री में HD कार्ड डाउनलोड करके व्हाट्सएप स्टेटस पर शेयर कर सकते हैं।"
  }
];

const WISHES_PER_PAGE = 6;

function LegendAutoSlideshow({ 
  legend, 
  slides, 
  onNavigate, 
  onOpenCardModal,
  lang = 'hi'
}) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Automatic 6-Second Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const isHi = lang === 'hi';
  const displayTitle = isHi && legend.titleHi ? legend.titleHi : legend.title;
  const displaySubtitle = isHi && legend.subtitleHi ? legend.subtitleHi : legend.subtitle;
  const displayQuote = isHi && legend.quoteHi ? legend.quoteHi : legend.quote;
  const displayParagraphs = isHi && legend.paragraphsHi ? legend.paragraphsHi : legend.paragraphs;
  const displayMoral = isHi && legend.moralHi ? legend.moralHi : legend.moral;
  const displayCardWish = isHi && legend.cardWish ? legend.cardWish : (legend.quoteHi || legend.quote);

  const handleShare = () => {
    let sender = '';
    try { sender = (localStorage.getItem('wishcrafto_user_name') || '').trim(); } catch {}
    const introLine = sender
      ? `✨ *${sender} ji* ne aapke liye Shri Krishna Janmashtami ki khaas katha bheji hai:`
      : `✨ Shri Krishna Janmashtami ki pavitra katha:`;
    const titlePart = `*${displayTitle}.....*`;
    const readPart = `\n📖 पूरी कथा यहाँ पढ़ें 👇\n🔗 https://wishcrafto.com/janmashtami#${legend.id}`;
    const ctaPart = `\n\n👉 *Aap bhi apna personal message yahan banayein:*\n🔗 https://wishcrafto.com/`;
    const text = `${introLine}\n\n${titlePart}${readPart}${ctaPart}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <article className="legend-card janmashtami-purple-card" id={legend.id}>
      <div className="legend-content split-layout">
        {/* Left Side: Pure Image Slideshow (Exact Rakhi 500px aspect-ratio 1:1) */}
        <div className="split-image-side">
          <div className="pure-slideshow-container premium-frame">
            {slides.map((slide, idx) => (
              <img
                key={slide.step || idx}
                src={slide.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = slide.fallbackImage;
                }}
                alt={`${displayTitle} Scene ${slide.step || idx + 1}`}
                className={`pure-slide-img ${idx === activeSceneIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Story Text Aligned with Image (All Purple, No Orange) */}
        <div className="split-text-side">
          <span className="legend-subtitle">{displaySubtitle}</span>
          <h2>{displayTitle}</h2>
          <blockquote className="legend-quote">"{displayQuote}"</blockquote>
          
          <div style={{ marginBottom: '1.1rem' }}>
            {displayParagraphs.map((p, i) => (
              <p key={i} className="legend-summary" style={{ margin: '0 0 0.85rem 0' }}>
                {p}
              </p>
            ))}
          </div>

          {/* Cultural Moral */}
          <div className="legend-moral">
            <strong>{isHi ? 'धार्मिक व सांस्कृतिक सार:' : 'Cultural Essence:'}</strong> {displayMoral}
          </div>

          {/* Action Buttons: Pure Purple Theme (1 Row on Mobile) */}
          <div className="legend-action-bar">
            <button
              className="gold-button-sm"
              onClick={() => {
                const currentImg = (slides && slides[activeSceneIndex]?.image) || (slides && slides[0]?.image) || '/HistoryImagesJanmashtami/Krishna_Birth1.png';
                onOpenCardModal(displayCardWish, currentImg, null, '', 'janmashtami');
              }}
            >
              <Wand2 size={13} /> {isHi ? 'कार्ड बनाएं' : 'Create Card'}
            </button>
            <button
              className="explore-wishes-btn-sm"
              onClick={() => onNavigate('/?tab=janmashtami')}
              title="Explore all Janmashtami status wishes on Home"
            >
              <Sparkles size={13} style={{ color: '#fde047' }} /> {isHi ? 'विशेज' : 'Wishes'}
            </button>
            <button
              className="whatsapp-btn-sm"
              onClick={handleShare}
            >
              <WhatsAppIcon size={14} /> {isHi ? 'शेयर' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function JanmashtamiPage({ onNavigate, onOpenCardModal }) {
  const [activeStoryId, setActiveStoryId] = useState(JANMASTHAMI_LEGENDS[0]?.id || 'krishna-birth');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [articleLang, setArticleLang] = useState('hi');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const isProgrammaticScroll = useRef(false);
  const tabsNavRef = useRef(null);

  const ALL_CHAPTER_IDS = [
    ...JANMASTHAMI_LEGENDS.map((l) => l.id),
    'full-history-article'
  ];

  const currentChapterIndex = ALL_CHAPTER_IDS.indexOf(activeStoryId);
  const activeIndex = currentChapterIndex >= 0 ? currentChapterIndex : 0;
  const currentLegend = JANMASTHAMI_LEGENDS.find((l) => l.id === activeStoryId) || JANMASTHAMI_LEGENDS[0];

  // High-Performance IntersectionObserver for viewport tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStoryId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    JANMASTHAMI_LEGENDS.forEach((legend) => {
      const el = document.getElementById(legend.id);
      if (el) observer.observe(el);
    });

    const fullArticleEl = document.getElementById('full-history-article');
    if (fullArticleEl) observer.observe(fullArticleEl);

    return () => observer.disconnect();
  }, []);

  const scrollToStory = (id) => {
    setActiveStoryId(id);
    setIsDropdownOpen(false);
    isProgrammaticScroll.current = true;

    const element = document.getElementById(id);
    if (element) {
      const navOffset = window.innerWidth <= 1024 ? 135 : 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  };

  const handlePrevStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const prevIdx = (activeIndex - 1 + ALL_CHAPTER_IDS.length) % ALL_CHAPTER_IDS.length;
    scrollToStory(ALL_CHAPTER_IDS[prevIdx]);
  };

  const handleNextStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (activeIndex + 1) % ALL_CHAPTER_IDS.length;
    scrollToStory(ALL_CHAPTER_IDS[nextIdx]);
  };

  const handleWhatsApp = (wish) => {
    let sender = '';
    try { sender = (localStorage.getItem('wishcrafto_user_name') || '').trim(); } catch {}
    const introLine = sender
      ? `✨ *${sender} ji* ne aapke liye khaas message bheja hai:`
      : `✨ Aapke liye ek khaas message bheja gaya hai:`;
    const titlePart = `🦚 *Shri Krishna Janmashtami 2026!* 🦚`;
    const quotePart = `\n\n"${wish}"`;
    const ctaPart = `\n\n👉 *Aap bhi apna personal message yahan banayein:*\n🔗 https://wishcrafto.com/janmashtami`;
    const text = `${introLine}\n\n${titlePart}${quotePart}${ctaPart}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const vedicData = JANMASTHAMI_STORIES[articleLang] || JANMASTHAMI_STORIES['en'];
  const activeFaqs = articleLang === 'hi' ? JANMASTHAMI_FAQS_HI : JANMASTHAMI_FAQS_EN;

  return (
    <div className="history-page janmashtami-history-theme">
      <div className="history-page-container section" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header - White Background with Royal Purple Accent & Language Switcher */}
        <div className="section-heading text-center" style={{ marginBottom: '2.5rem' }}>
          {/* Top Language Switcher Bar */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#6d28d9' }}>
              {articleLang === 'hi' ? 'कथा भाषा:' : 'Story Language:'}
            </span>
            <div className="article-lang-switcher" style={{ margin: 0 }}>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'hi' ? 'active' : ''}`}
                onClick={() => setArticleLang('hi')}
              >
                🇮🇳 हिंदी
              </button>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'en' ? 'active' : ''}`}
                onClick={() => setArticleLang('en')}
              >
                English
              </button>
            </div>
          </div>

          <h1 style={{ color: '#1e1035' }}>
            {articleLang === 'hi' ? (
              <>श्री कृष्ण जन्माष्टमी का <span style={{ color: '#7c3aed', fontStyle: 'italic' }}>पावन इतिहास व कथाएं</span></>
            ) : (
              <>History and Origin of <span style={{ color: '#7c3aed', fontStyle: 'italic' }}>Shri Krishna Janmashtami</span></>
            )}
          </h1>
          <p style={{ color: '#4b5563', maxWidth: '720px', margin: '0.6rem auto 0', lineHeight: '1.6' }}>
            {articleLang === 'hi' 
              ? 'मथुरा के कारागार में प्रभु के दिव्य प्राकट्य से लेकर उफनती यमुना पार करना, गोकुल की मधुर माखन चोरी और गोवर्धन पर्वत उठाने की प्रामाणिक पावन कथाएं।'
              : 'Discover why we celebrate Krishna Janmashtami: From the divine prison birth in Mathura & the miraculous Yamuna crossing to the beloved Butter Thief in Gokul and the lifting of Mount Govardhan.'}
          </p>
        </div>

        {/* Layout Wrapper: Left Sticky Sidebar + Right Legends List */}
        <div className="history-layout-wrapper">
          
          {/* Left Sidebar on Desktop / Interactive Sticky Story Switcher on Mobile */}
          <aside className="history-sidebar">
            <div className="sidebar-sticky janmashtami-purple-sticky">
              
              {/* Mobile / Tablet Quick Switcher Bar with Prev/Next Arrows */}
              <div className="mobile-story-header-bar">
                <button 
                  type="button" 
                  className="story-arrow-btn" 
                  onClick={handlePrevStory} 
                  aria-label="Previous Story"
                  title="Previous Story"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="story-title-display">
                  <span className="story-num-pill">
                    {`${activeIndex + 1}/${ALL_CHAPTER_IDS.length}`}
                  </span>
                  <span className="story-current-label">
                    {activeStoryId === 'full-history-article' 
                      ? (articleLang === 'hi' ? 'सम्पूर्ण इतिहास' : 'Janmashtami History') 
                      : (SHORT_TITLES[articleLang]?.[currentLegend?.id] || currentLegend?.titleHi || currentLegend?.title)}
                  </span>
                </div>

                <button 
                  type="button" 
                  className="story-arrow-btn" 
                  onClick={handleNextStory} 
                  aria-label="Next Story"
                  title="Next Story"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Desktop Title */}
              <h3 className="sidebar-title desktop-only-title">
                {articleLang === 'hi' ? '✨ पावन गाथाएं' : '✨ Sacred Legends'}
              </h3>
              
              {/* Vertical Tabs List (Desktop) on Left */}
              <div className="history-tabs-container">
                <nav className="history-tabs" ref={tabsNavRef}>
                  {JANMASTHAMI_LEGENDS.map((legend, idx) => (
                    <button
                      key={`tab-${legend.id}`}
                      type="button"
                      onClick={() => scrollToStory(legend.id)}
                      className={`history-tab-link ${activeStoryId === legend.id ? 'active' : ''}`}
                    >
                      <span className="tab-idx-num">{idx + 1}.</span> {SHORT_TITLES[articleLang]?.[legend.id] || (articleLang === 'hi' ? legend.titleHi : legend.title)}
                    </button>
                  ))}
                  <button
                    key="tab-full-history-article"
                    type="button"
                    onClick={() => scrollToStory('full-history-article')}
                    className={`history-tab-link ${activeStoryId === 'full-history-article' ? 'active' : ''}`}
                  >
                    <span className="tab-idx-num">4.</span> {articleLang === 'hi' ? 'सम्पूर्ण इतिहास' : 'Janmashtami History'}
                  </button>
                </nav>
              </div>

            </div>
          </aside>

          {/* Main Stories List: ALL 3 STORIES RENDERED IN FEED */}
          <div className="legends-list">
            {JANMASTHAMI_LEGENDS.map((legend) => (
              <LegendAutoSlideshow
                key={legend.id}
                legend={legend}
                slides={legend.slides}
                onNavigate={onNavigate}
                onOpenCardModal={onOpenCardModal}
                lang={articleLang}
              />
            ))}
          </div>

        </div>

        {/* ── EDITORIAL PILLAR ARTICLE (EXACT RAKHI 1040px OPEN CHAPTER STRUCTURE) ── */}
        <article 
          className="history-editorial-pillar" 
          id="full-history-article"
          aria-label="Editorial Article on Shri Krishna Janmashtami History"
        >
          {/* Utility Bar (Lang Toggle) */}
          <div className="article-utility-bar">
            <div className="article-lang-switcher">
              <span className="lang-label">Language / भाषा:</span>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'hi' ? 'active' : ''}`}
                onClick={() => setArticleLang('hi')}
              >
                हिंदी
              </button>
              <button 
                type="button" 
                className={`lang-btn ${articleLang === 'en' ? 'active' : ''}`}
                onClick={() => setArticleLang('en')}
              >
                English
              </button>
            </div>
          </div>

          <header className="editorial-header">
            <h2>
              {articleLang === 'hi' ? (
                <>श्री कृष्ण जन्माष्टमी का संपूर्ण इतिहास, वैदिक उत्पत्ति व <span>जन्मोत्सव कथा</span></>
              ) : (
                <>The Complete History, Vedic Origins &amp; <span>Significance of Janmashtami</span></>
              )}
            </h2>
            <p className="editorial-read-time">
              📖 {articleLang === 'hi' ? '7 मिनट का गहन अध्ययन • श्रीमद्भागवत पुराण व ऐतिहासिक अभिलेखों से शोधित' : '7 Min In-Depth Read • Researched from Srimad Bhagavatam & Vedic Scriptures'}
            </p>
          </header>

          {/* Open Editorial Chapters (NO ACCORDION, CLEAN READING LAYOUT EXACTLY LIKE RAKHI) */}
          {vedicData.chapters.map((chap) => (
            <section className="editorial-chapter" key={chap.id}>
              <h3>{chap.title}</h3>
              <p style={{ fontStyle: 'italic', color: '#6b7280', marginBottom: '0.9rem' }}>
                <strong>{articleLang === 'hi' ? 'संक्षेप:' : 'Summary:'}</strong> {chap.summary}
              </p>
              
              {chap.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} style={{ whiteSpace: 'pre-line' }}>{paragraph}</p>
              ))}

              {/* Shloka Card for Gita Updesh Chapter (Purple Palette) */}
              {chap.id === 'gita-updesh' && (
                <div className="shloka-card">
                  <div className="shloka-text">
                    यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।<br />
                    अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥
                  </div>
                  <div className="shloka-meaning">
                    "जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं धर्म की पुनर्स्थापना और सज्जनों के कल्याण के लिए इस पृथ्वी पर अवतार लेता हूँ।"
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Frequently Asked Questions (At the Bottom of Article, Matching Rakhi) */}
          <section className="faq-section" style={{ padding: '1.5rem 0 0 0', marginTop: '2.5rem', borderTop: '2px solid #f3e8ff' }}>
            <div className="faq-header" style={{ marginBottom: '1.5rem' }}>
              <h2>{articleLang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}</h2>
              <p className="faq-subtitle">
                {articleLang === 'hi' ? 'श्री कृष्ण जन्माष्टमी के इतिहास व परंपरा से जुड़ी मुख्य जानकारियों के उत्तर।' : 'Key insights and scriptural facts about Shri Krishna Janmashtami.'}
              </p>
            </div>
            <div className="faq-accordion">
              {activeFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                    key={faq.question}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </article>

        {/* ── ENGAGEMENT LOOP BANNER (EXACT 1040px ALIGNMENT, NO WALLPAPERS) ── */}
        <div className="cross-loop-banner">
          <div>
            <h3>Celebrate these timeless divine values today</h3>
            <p>
              Send a warm blessing or create a custom Bal Gopal greeting photo card with your family name now.
            </p>
          </div>
          <div className="banner-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <button className="gold-button" onClick={() => {
              onOpenCardModal("नन्द के घर आनन्द भयो, जय कन्हैया लाल की! श्रीकृष्ण जन्माष्टमी 2026 की हार्दिक शुभकामनाएं! 🦚✨", "/HistoryImagesJanmashtami/Krishna_Birth1.png", null, '', 'janmashtami');
            }}>
              <Wand2 size={16} /> Create Photo Card
            </button>
            <button
              className="gold-button"
              style={{ 
                background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', 
                color: '#ffffff', 
                border: 'none',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)'
              }}
              onClick={() => onNavigate('/?tab=janmashtami')}
            >
              <Sparkles size={16} style={{ color: '#fde047' }} /> Explore Wishes
            </button>
            <button
              className="ghost-button"
              style={{
                background: '#25D366',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => handleWhatsApp("नन्द के घर आनन्द भयो, जय कन्हैया लाल की! श्रीकृष्ण जन्माष्टमी 2026 की हार्दिक शुभकामनाएं! 🦚✨")}
            >
              <WhatsAppIcon size={18} /> WhatsApp Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
