import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, ArrowRight, ArrowLeft, Wand2, Heart, Sparkles, 
  ChevronDown, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import { RAKHI_LEGENDS } from '../data/rakhiData';
import './History.css';

const STORY_SLIDES = {
  'krishna-draupadi': [
    { step: 1, image: '/HistoryImages/krishna_draupadi_1.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HistoryImages/krishna_draupadi_2.png', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HistoryImages/krishna_draupadi_3.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'rani-karnavati-humayun': [
    { step: 1, image: '/HistoryImages/rani_humayun_1.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HistoryImages/rani_humayun_2.png', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HistoryImages/rani_humayun_3.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'goddess-lakshmi-king-bali': [
    { step: 1, image: '/HistoryImages/lakshmi_bali_1.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HistoryImages/lakshmi_bali_2.png', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HistoryImages/lakshmi_bali_3.png', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'yamraj-yamuna': [
    { step: 1, image: '/HD Wallpapers/yamraj_yamuna_rakhi_1.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HD Wallpapers/yama_yamuna_rakhi.jpg', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HD Wallpapers/divine_blessings_raksha_bandhan.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ],
  'indra-sachi': [
    { step: 1, image: '/HD Wallpapers/all_gods_blessing_rakhi_1.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
    { step: 2, image: '/HD Wallpapers/heavenly_gods_rakhi_2.jpg', fallbackImage: '/HomepageImages/rakhi_siblings.jpg' },
    { step: 3, image: '/HD Wallpapers/garuda_celestial_raksha_bandhan.jpg', fallbackImage: '/HomepageImages/rakhi_hero.png' },
  ]
};

const SHORT_TITLES = {
  'krishna-draupadi': 'Krishna & Draupadi',
  'rani-karnavati-humayun': 'Rani Karnavati',
  'goddess-lakshmi-king-bali': 'Lakshmi & Bali',
  'yamraj-yamuna': 'Yamraj & Yamuna',
  'indra-sachi': 'Indra & Sachi',
};

const HISTORY_FAQS_EN = [
  {
    question: "What is the authentic origin of Raksha Bandhan according to scriptures?",
    answer: "According to the Bhavishya Purana and Mahabharata, Raksha Bandhan originated as 'Raksha Sutra', a sacred protective amulet tied to safeguard kings, warriors, and loved ones. The most famous sibling legend is Draupadi tying a piece of her saree around Lord Krishna's wounded finger, which Krishna honored by granting her infinite protection during the cheer-haran."
  },
  {
    question: "Why is Rakhi celebrated on Shravana Purnima?",
    answer: "Shravana Purnima is one of the most sacred full-moon days in the Hindu calendar. It marks the culmination of the holy month of Shravana and coincides with Upakarma and Gayatri Jayanti, making it spiritually ideal for protective vows and tying sacred threads."
  },
  {
    question: "Did Rani Karnavati actually send a Rakhi to Emperor Humayun?",
    answer: "Yes, 16th-century Rajasthani historical archives and court records document that Queen Mother Rani Karnavati of Mewar sent a sacred Rakhi to Mughal Emperor Humayun in 1535 AD seeking brotherly defense against Sultan Bahadur Shah of Gujarat. Humayun accepted the bond and dispatched his imperial army to Chittorgarh."
  },
  {
    question: "How did Rabindranath Tagore use Raksha Bandhan in the freedom movement?",
    answer: "During the 1905 British Partition of Bengal, Nobel laureate Rabindranath Tagore organized the Rakhi Mahotsav, leading thousands of Hindus and Muslims to tie yellow rakhis on each other's wrists on the banks of the Ganges as an unbreakable symbol of national unity."
  }
];

const HISTORY_FAQS_HI = [
  {
    question: "शास्त्रों के अनुसार रक्षाबंधन की असली उत्पत्ति क्या है?",
    answer: "भविष्य पुराण और महाभारत के अनुसार रक्षाबंधन की शुरुआत 'रक्षा सूत्र' के रूप में हुई थी। यह राजाओं और योद्धाओं की सुरक्षा के लिए बांधा जाने वाला पवित्र धागा था। भाई-बहन की सबसे प्रसिद्ध कथा श्री कृष्ण और द्रौपदी की है, जब द्रौपदी ने कृष्ण की उंगली पर अपनी साड़ी का टुकड़ा बांधा था और कृष्ण ने चीर हरण के समय उनकी लाज बचाई।"
  },
  {
    question: "रक्षाबंधन श्रावण पूर्णिमा को ही क्यों मनाया जाता है?",
    answer: "श्रावण पूर्णिमा हिंदू वैदिक कैलेंडर का सबसे पवित्र दिन माना जाता है। यह पवित्र श्रावण महीने का अंतिम दिन होता है और इसी दिन उपाकर्म व गायत्री जयंती भी मनाई जाती है, जो रक्षा सूत्र बांधने के लिए सबसे शुभ समय होता है।"
  },
  {
    question: "क्या रानी कर्णावती ने सच में हुमायूं को राखी भेजी थी?",
    answer: "हाँ, 16वीं शताब्दी के राजस्थानी इतिहास और मुग़ल दरबार के अभिलेखों में यह दर्ज है कि 1535 ई. में जब गुजरात के बहादुर शाह ने चित्तौड़गढ़ पर आक्रमण किया, तो रानी कर्णावती ने हुमायूं को राखी भेजकर रक्षा की गुहार लगाई थी और हुमायूं ने अपनी सेना चित्तौड़ की रक्षा के लिए भेजी थी।"
  },
  {
    question: "रवींद्रनाथ टैगोर ने स्वतंत्रता संग्राम में रक्षाबंधन का उपयोग कैसे किया?",
    answer: "1905 में अंग्रेजों द्वारा बंगाल विभाजन के समय रवींद्रनाथ टैगोर ने 'राखी महोत्सव' का आयोजन किया था, जहाँ लाखों हिंदुओं और मुसलमानों ने गंगा किनारे एक-दूसरे की कलाई पर रक्षा सूत्र बांधकर राष्ट्रीय एकता का संदेश दिया था।"
  }
];

function LegendAutoSlideshow({ 
  legend, 
  slides, 
  onNavigate, 
  onOpenCardModal, 
  prevLegend, 
  nextLegend, 
  onSelectStory 
}) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Automatic 6-Second Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <article className="legend-card" id={legend.id}>
      <div className="legend-content split-layout">
        {/* Left Side: Pure Image Slideshow */}
        <div className="split-image-side">
          <div className="pure-slideshow-container premium-frame">
            {slides.map((slide, idx) => (
              <img
                key={slide.step}
                src={slide.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = slide.fallbackImage;
                }}
                alt={`${legend.title} Scene ${slide.step}`}
                className={`pure-slide-img ${idx === activeSceneIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Story Text */}
        <div className="split-text-side">
          <span className="legend-subtitle">{legend.subtitle}</span>
          <h2>{legend.title}</h2>
          <blockquote className="legend-quote">"{legend.quote}"</blockquote>
          <p className="legend-summary">{legend.summary}</p>

          {/* Cultural Moral */}
          <div className="legend-moral">
            <strong>Cultural Essence:</strong> {legend.moral}
          </div>

          {/* Action Buttons */}
          <div className="legend-action-bar">
            <button
              className="gold-button-sm"
              onClick={() => {
                const currentImg = (slides && slides[activeSceneIndex]?.image) || (slides && slides[0]?.image) || '/HistoryImages/krishna_draupadi_1.png';
                onOpenCardModal(legend.cardWish || legend.quote, currentImg);
              }}
            >
              <Wand2 size={14} /> Create Card
            </button>
            <button
              className="ghost-button-sm"
              onClick={() => onNavigate('/raksha-bandhan-wishes')}
            >
              <Heart size={14} /> Send Wish <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Story Next / Previous Navigation Footer */}
      <div className="story-card-footer-nav">
        {prevLegend ? (
          <button 
            type="button" 
            className="story-footer-nav-btn prev"
            onClick={() => onSelectStory(prevLegend.id)}
          >
            <ArrowLeft size={15} />
            <span>Prev: {SHORT_TITLES[prevLegend.id] || prevLegend.title}</span>
          </button>
        ) : <div />}

        {nextLegend ? (
          <button 
            type="button" 
            className="story-footer-nav-btn next"
            onClick={() => onSelectStory(nextLegend.id)}
          >
            <span>Next: {SHORT_TITLES[nextLegend.id] || nextLegend.title}</span>
            <ArrowRight size={15} />
          </button>
        ) : <div />}
      </div>
    </article>
  );
}

export default function HistoryPage({ onNavigate, onOpenCardModal }) {
  const [activeStoryId, setActiveStoryId] = useState(RAKHI_LEGENDS[0]?.id || 'krishna-draupadi');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [articleLang, setArticleLang] = useState('hi');

  const isProgrammaticScroll = useRef(false);
  const tabsNavRef = useRef(null);

  const currentIndex = RAKHI_LEGENDS.findIndex((l) => l.id === activeStoryId);
  const currentLegend = RAKHI_LEGENDS[currentIndex >= 0 ? currentIndex : 0] || RAKHI_LEGENDS[0];

  // High-Performance IntersectionObserver for 60 FPS viewport tracking
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

    RAKHI_LEGENDS.forEach((legend) => {
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
    const prevIdx = (currentIndex - 1 + RAKHI_LEGENDS.length) % RAKHI_LEGENDS.length;
    scrollToStory(RAKHI_LEGENDS[prevIdx].id);
  };

  const handleNextStory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % RAKHI_LEGENDS.length;
    scrollToStory(RAKHI_LEGENDS[nextIdx].id);
  };

  const activeFaqs = articleLang === 'hi' ? HISTORY_FAQS_HI : HISTORY_FAQS_EN;

  return (
    <div className="history-page-container section">
      {/* Header */}
      <div className="section-heading text-center">
        <h1>
          History and Origin of <span>Raksha Bandhan</span>
        </h1>
        <p>
          Discover why we celebrate Raksha Bandhan: From ancient Vedic roots &amp; Krishna-Draupadi's divine promise to Rani Karnavati's royal letter &amp; Tagore's 1905 freedom movement. Read authentic history &amp; origin facts.
        </p>
      </div>

      <div className="history-layout-wrapper">
        {/* Left Sidebar on Desktop / Interactive Sticky Story Switcher on Mobile */}
        <aside className="history-sidebar">
          <div className="sidebar-sticky">
            
            {/* Mobile / Tablet Quick Switcher Bar with Dropdown & Prev/Next Arrows */}
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

              <div className="story-dropdown-wrapper">
                <button 
                  type="button" 
                  className="story-dropdown-toggle"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="story-num-pill">
                    {activeStoryId === 'full-history-article' ? '6/6' : `${currentIndex + 1}/6`}
                  </span>
                  <span className="story-current-label">
                    {activeStoryId === 'full-history-article' ? 'Rakhi History' : (SHORT_TITLES[currentLegend.id] || currentLegend.title)}
                  </span>
                  <ChevronDown size={15} className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="story-dropdown-menu">
                    {RAKHI_LEGENDS.map((legend, idx) => (
                      <button
                        key={`drop-${legend.id}`}
                        type="button"
                        className={`story-dropdown-item ${activeStoryId === legend.id ? 'active' : ''}`}
                        onClick={() => scrollToStory(legend.id)}
                      >
                        <span className="drop-index">{idx + 1}.</span>
                        <span className="drop-title">{legend.title}</span>
                        {activeStoryId === legend.id && <Check size={14} className="gold-check" />}
                      </button>
                    ))}
                    <button
                      key="drop-full-history-article"
                      type="button"
                      className={`story-dropdown-item ${activeStoryId === 'full-history-article' ? 'active' : ''}`}
                      onClick={() => scrollToStory('full-history-article')}
                    >
                      <span className="drop-index">6.</span>
                      <span className="drop-title">Rakhi History</span>
                      {activeStoryId === 'full-history-article' && <Check size={14} className="gold-check" />}
                    </button>
                  </div>
                )}
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
            <h3 className="sidebar-title desktop-only-title">✨ Sacred Legends</h3>
            
            {/* Horizontal / Vertical Tabs List (Desktop) */}
            <div className="history-tabs-container">
              <nav className="history-tabs" ref={tabsNavRef}>
                {RAKHI_LEGENDS.map((legend, idx) => (
                  <button
                    key={`tab-${legend.id}`}
                    type="button"
                    onClick={() => scrollToStory(legend.id)}
                    className={`history-tab-link ${activeStoryId === legend.id ? 'active' : ''}`}
                  >
                    <span className="tab-idx-num">{idx + 1}.</span> {SHORT_TITLES[legend.id] || legend.title}
                  </button>
                ))}
                <button
                  key="tab-full-history-article"
                  type="button"
                  onClick={() => scrollToStory('full-history-article')}
                  className={`history-tab-link ${activeStoryId === 'full-history-article' ? 'active' : ''}`}
                >
                  <span className="tab-idx-num">6.</span> Rakhi History
                </button>
              </nav>
            </div>

          </div>
        </aside>

        {/* Main Stories List */}
        <div className="legends-list">
          {RAKHI_LEGENDS.map((legend, idx) => (
            <LegendAutoSlideshow
              key={legend.id}
              legend={legend}
              slides={STORY_SLIDES[legend.id] || STORY_SLIDES['krishna-draupadi']}
              onNavigate={onNavigate}
              onOpenCardModal={onOpenCardModal}
              prevLegend={idx > 0 ? RAKHI_LEGENDS[idx - 1] : null}
              nextLegend={idx < RAKHI_LEGENDS.length - 1 ? RAKHI_LEGENDS[idx + 1] : null}
              onSelectStory={scrollToStory}
            />
          ))}
        </div>
      </div>

      {/* =========================================================
         EDITORIAL PILLAR ARTICLE (CLEAN PURE WHITE BILINGUAL ARTICLE)
      ========================================================= */}
      <article className="history-editorial-pillar" id="full-history-article" aria-label="Editorial Article on Raksha Bandhan History">
        
        {/* Utility Bar: Hindi/English Switcher Only */}
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
              <>रक्षाबंधन का संपूर्ण इतिहास, वैदिक उत्पत्ति व <span>सांस्कृतिक विकास</span></>
            ) : (
              <>The Complete History, Vedic Origins &amp; <span>Cultural Evolution of Raksha Bandhan</span></>
            )}
          </h2>
          <p className="editorial-read-time">
            📖 {articleLang === 'hi' ? '7 मिनट का गहन अध्ययन • वैदिक ग्रंथों व ऐतिहासिक अभिलेखों से शोधित' : '7 Min In-Depth Read • Researched from Vedic Scriptures & Historical Archives'}
          </p>
        </header>

        {articleLang === 'hi' ? (
          /* ── HINDI VERSION ── */
          <>
            {/* 1. वैदिक उत्पत्ति */}
            <section className="editorial-chapter">
              <h3>1. शब्द उत्पत्ति और प्राचीन वैदिक मूल</h3>
              <p>
                रक्षाबंधन का पवित्र त्योहार 3,000 वर्षों से भी अधिक प्राचीन वैदिक सभ्यता से चला आ रहा है। संस्कृत भाषा के शब्द <strong>"रक्षा"</strong> का अर्थ सुरक्षा या संरक्षण होता है, जबकि <strong>"बंधन"</strong> का तात्पर्य एक पवित्र और अटूट धागे या गांठ से है।
              </p>
              <p>
                <strong>भविष्य पुराण</strong> के अनुसार, वैदिक काल में इस पर्व को <em>"रक्षा सूत्र"</em> कहा जाता था। श्रावण पूर्णिमा के शुभ अवसर पर राजपुरोहित अपने राजाओं और योद्धाओं की कलाई पर हल्दी और कच्चे सूत से बना पवित्र धागा बांधते थे ताकि उन्हें नकारात्मक शक्तियों से बचाया जा सके और विजय प्राप्त हो।
              </p>

              <div className="shloka-card">
                <div className="shloka-text">
                  येन बद्धो बलि राजा दानवेन्द्रो महाबलः।<br />
                  तेन त्वामनुबध्नामि रक्षे मा चल मा चल॥
                </div>
                <div className="shloka-meaning">
                  "जिस रक्षा सूत्र से महाबली दानवेंद्र राजा बलि को बांधा गया था, उसी पवित्र सूत्र से मैं तुम्हें बांधता हूँ। हे रक्षा सूत्र! तुम सदैव स्थिर और अटल रहना।"
                </div>
              </div>
            </section>

            {/* 2. पौराणिक प्रसंग */}
            <section className="editorial-chapter">
              <h3>2. पाँच दिव्य पौराणिक गाथाएं</h3>
              <p>
                भारतीय पौराणिक धरोहर में कई ऐसी पावन गाथाएं दर्ज हैं जिन्होंने रक्षाबंधन को केवल धागा बांधने की रस्म से उठाकर दुनिया का सबसे भावुक और पवित्र पर्व बना दिया:
              </p>

              <h4>I. भगवान श्री कृष्ण और द्रौपदी (महाभारत)</h4>
              <p>
                राजसूय यज्ञ के दौरान जब श्री कृष्ण ने शिशुपाल का वध किया, तो उनके सुदर्शन चक्र से उनकी दिव्य उंगली कट गई और रक्त बहने लगा। जब सब लोग कपड़े की पट्टी ढूंढ रहे थे, तभी द्रौपदी ने तुरंत अपनी रेशमी साड़ी का आंचल फाड़कर कृष्ण की उंगली पर बांध दिया। भावुक होकर कृष्ण ने 'अक्षयम्' का वरदान दिया। बाद में जब कौरवों की सभा में द्रौपदी का चीर हरण होने लगा, तो श्री कृष्ण ने असीम साड़ी बढ़ाकर उनकी लाज बचाई।
              </p>

              <h4>II. माता लक्ष्मी और राजा बलि</h4>
              <p>
                जब भगवान विष्णु ने वामन अवतार में राजा बलि से तीनों लोक नाप लिए, तब बलि की भक्ति से प्रसन्न होकर विष्णु जी उनके पाताल लोक के द्वारपाल बन गए। वैकुंठ में लक्ष्मी जी व्याकुल हो गईं। वे एक गरीब ब्राह्मणी का रूप धरकर बलि के पास पहुंचीं और उनकी कलाई पर रक्षा सूत्र बांधा। बलि ने बहन मानकर इच्छा मांगने को कहा, तब लक्ष्मी जी ने अपने वास्तविक रूप में आकर भगवान विष्णु को मांग लिया।
              </p>

              <h4>III. यमराज और देवी यमुना</h4>
              <p>
                मृत्यु के देवता यमराज 12 वर्षों तक अपनी बहन यमुना से मिलने नहीं जा पाए थे। जब वे पहुंचे, तो यमुना ने उनका भव्य सत्कार किया, माथे पर तिलक लगाया और राखी बांधी। यमराज ने प्रसन्न होकर वरदान दिया कि आज के दिन जो भाई अपनी बहन से राखी बंधवाएगा, उसे अकाल मृत्यु और यमलोक का भय नहीं रहेगा।
              </p>
            </section>

            {/* 3. ऐतिहासिक राजवंश */}
            <section className="editorial-chapter">
              <h3>3. भारतीय इतिहास और राजवंशों के प्रामाणिक प्रसंग</h3>
              <p>
                पुराणों के अलावा भारतीय इतिहास में कई ऐसे दर्ज अध्याय हैं जहाँ राखी ने धर्म और सीमाओं से परे जाकर सुरक्षा का वचन निभाया:
              </p>

              <h4>मेवाड़ की रानी कर्णावती व मुग़ल सम्राट हुमायूं (1535 ई.)</h4>
              <p>
                1535 ई. में जब गुजरात के सुल्तान बहादुर शाह ने चित्तौड़गढ़ पर आक्रमण किया, तो मेवाड़ की विधवा राजमाता रानी कर्णावती ने अपने राज्य की रक्षा के लिए दिल्ली के मुग़ल सम्राट हुमायूं को एक पवित्र राखी और पत्र भेजा। हुमायूं ने राजपूत परंपरा का सम्मान करते हुए तुरंत अपनी सेना चित्तौड़ की रक्षा के लिए रवाना की और बहादुर शाह को पीछे हटने पर मजबूर किया।
              </p>

              <h4>सिकंदर और राजा पुरु (326 ई.पू.)</h4>
              <p>
                326 ई.पू. में झेलम नदी के तट पर सिकंदर और राजा पुरु (पोरस) के युद्ध के समय सिकंदर की पत्नी रुखसाना (रोक्साना) ने राजा पुरु को राखी भेजी थी। युद्ध के मैदान में जब पुरु का सामना सिकंदर से हुआ, तो उन्होंने हाथ में बंधी राखी को याद कर सिकंदर पर जानलेवा वार नहीं किया।
              </p>
            </section>

            {/* 4. 1905 बंगाल विभाजन */}
            <section className="editorial-chapter">
              <h3>4. 1905 बंगाल विभाजन: रवींद्रनाथ टैगोर का राखी आंदोलन</h3>
              <p>
                1905 में जब ब्रिटिश वाइसरॉय लॉर्ड कर्जन ने बंगाल को हिंदू और मुस्लिम आधार पर विभाजित करने का फैसला किया, तब नोबेल पुरस्कार विजेता <strong>रवींद्रनाथ टैगोर</strong> ने रक्षाबंधन को राष्ट्रीय एकता का प्रतीक बनाया। 16 अक्टूबर 1905 को कोलकाता में लाखों हिंदुओं और मुसलमानों ने गंगा स्नान कर एक-दूसरे की कलाई पर पीला रक्षा सूत्र बांधा और यह संदेश दिया कि ब्रिटिश हुकूमत हमारी एकता को तोड़ नहीं सकती।
              </p>
            </section>

            {/* 5. पूजा विधि */}
            <section className="editorial-chapter">
              <h3>5. रक्षाबंधन की पावन पूजा विधि व थाली</h3>
              <p>
                <strong>1. पूजनीय थाली:</strong> थाली में रोली (कुमकुम), अक्षत (चावल), आरती के लिए दीपक, मिठाई और पवित्र राखी रखी जाती है।<br />
                <strong>2. शुभ तिलक:</strong> बहन अपने भाई के माथे पर कुमकुम और अक्षत का तिलक लगाती है जो विजय और ज्ञान का प्रतीक है।<br />
                <strong>3. राखी बांधना व आरती:</strong> दाहिनी कलाई पर राखी बांधकर भाई की दीर्घायु के लिए आरती उतारी जाती है।<br />
                <strong>4. शगुन व सुरक्षा का वचन:</strong> भाई अपनी बहन को मिठाई खिलाता है, उपहार (शगुन) देता है और जीवनभर रक्षा का वचन देता है।
              </p>
            </section>
          </>
        ) : (
          /* ── ENGLISH VERSION ── */
          <>
            {/* 1. Vedic Roots */}
            <section className="editorial-chapter">
              <h3>1. The Etymology and Ancient Vedic Roots</h3>
              <p>
                The sacred festival of <strong>Raksha Bandhan</strong> traces its roots back over 3,000 years into ancient Vedic civilization. Derived from classical Sanskrit, the word <em>"Raksha"</em> translates to eternal protection or safeguarding, while <em>"Bandhan"</em> signifies an unbreakable spiritual knot or bond.
              </p>
              <p>
                In Vedic times, as documented in the <strong>Bhavishya Purana</strong>, the ritual was originally known as <em>"Raksha Sutra"</em> (रक्षा सूत्र). Royal priests (Kul-Gurus) tied sacred consecrated threads woven with raw silk and turmeric around the wrists of kings, warriors, and householders on the auspicious day of Shravana Purnima to shield them against negative energies and bring prosperity.
              </p>

              <div className="shloka-card">
                <div className="shloka-text">
                  येन बद्धो बलि राजा दानवेन्द्रो महाबलः।<br />
                  तेन त्वामनुबध्नामि रक्षे मा चल मा चल॥
                </div>
                <div className="shloka-meaning">
                  "The sacred thread by which the mighty King Bali was bound, with that same thread I bind you for protection. O sacred thread, stay firm and steadfast forever."
                </div>
              </div>
            </section>

            {/* 2. Mythological Epics */}
            <section className="editorial-chapter">
              <h3>2. The Five Divine Mythological Epics</h3>
              <p>
                Indian spiritual heritage chronicles several monumental legends that elevated Raksha Bandhan from a ritualistic thread-tying ceremony into the world's most emotional celebration of sibling love:
              </p>

              <h4>I. Lord Krishna &amp; Draupadi (The Mahabharata)</h4>
              <p>
                During the grand Rajasuya Yajna, when Lord Krishna severed Shishupala's head with His Sudarshana Chakra, His divine finger was cut and began to bleed. While queens and attendants rushed for bandages, Princess Draupadi immediately tore a piece of her royal silk saree (Aanchal) and lovingly tied it around Krishna's bleeding hand. Deeply touched, Krishna uttered the eternal word <em>"Akshayam"</em> (may this never diminish) and promised lifelong protection. When Dushasana attempted to disrobe Draupadi in the Kaurava royal court, Krishna honored this sacred bond by supplying an infinite length of saree, safeguarding her honor.
              </p>

              <h4>II. Goddess Lakshmi &amp; King Bali</h4>
              <p>
                When Lord Vishnu in His Vamana avatar claimed the three worlds from the benevolent Asura King Bali, Bali requested Vishnu to reside in his palace in the netherworld (Sutala). Longing for Her consort's return to Vaikuntha, Goddess Lakshmi disguised Herself as a humble Brahmin woman, visited Bali on Shravana Purnima, and tied a cotton thread on his wrist. Deeply moved, Bali granted Her any wish. Lakshmi revealed Her divine form and requested Vishnu's release, teaching humanity that a sister's wish tied with love possesses limitless grace.
              </p>

              <h4>III. Yamraj (God of Death) &amp; Goddess Yamuna</h4>
              <p>
                The God of Death, Yamraj, had not visited his sister Yamuna for over twelve years. When he finally arrived, Yamuna prepared a royal feast, welcomed him with a holy Tilak, and tied a protective silk thread on his wrist. Overcome with joy, Yamraj granted her a boon: any brother who receives a Rakhi from his sister on this sacred day and promises her protection shall be blessed with longevity, health, and freedom from premature death.
              </p>
            </section>

            {/* 3. Royal History */}
            <section className="editorial-chapter">
              <h3>3. Historical Chronology Across Indian Dynasties</h3>
              <p>
                Beyond mythology, Indian history is filled with documented royal accounts where Raksha Bandhan crossed political, geographical, and religious boundaries:
              </p>

              <h4>Rani Karnavati of Mewar &amp; Mughal Emperor Humayun (1535 AD)</h4>
              <p>
                One of the most celebrated historical accounts occurred in 1535 AD. Following the demise of Rana Sanga, the fortress of Chittorgarh in Mewar was besieged by Sultan Bahadur Shah of Gujarat. Recognizing the imminent danger to her people, Queen Mother Rani Karnavati sent a sacred Rakhi along with an emotional letter to Mughal Emperor Humayun in Delhi, seeking brotherly assistance.
              </p>
              <p>
                Moved by the sacred Rajput tradition, Humayun set aside ongoing military campaigns in Bengal and rode swiftly with his imperial army toward Chittor to defend his sister. Although he arrived just after the brave Rajput women had performed Jauhar, Humayun drove Bahadur Shah out of Malwa and restored Chittor's throne to Karnavati's son, Vikramaditya.
              </p>

              <h4>Alexander the Great &amp; King Porus (326 BC)</h4>
              <p>
                Historical folklore from the Greco-Indian war in 326 BC recounts that Alexander’s wife, Roxana (Rukhsana), sent a sacred thread to King Porus (Puru) of Punjab, pleading with him not to harm her husband in personal combat. During the fierce Battle of the Hydaspes (Jhelum River), when Porus encountered Alexander face-to-face, he remembered the sacred thread on his wrist and refrained from delivering a fatal blow.
              </p>
            </section>

            {/* 4. 1905 Freedom Unity */}
            <section className="editorial-chapter">
              <h3>4. The 1905 Bengal Partition: Tagore's Unity Movement</h3>
              <p>
                During the height of British colonial rule in 1905, Viceroy Lord Curzon issued the controversial Partition of Bengal to divide the nationalist movement along religious lines between Hindus and Muslims.
              </p>
              <p>
                In response, Nobel laureate <strong>Rabindranath Tagore</strong> transformed the traditional Raksha Bandhan festival into a massive nationwide movement of solidarity and communal brotherhood. On October 16, 1905, thousands of Hindus, Muslims, and Sikhs walked through the streets of Kolkata, bathed in the sacred Ganges, and tied yellow rakhis onto each other’s wrists, declaring that no imperial border could sever their cultural and spiritual unity.
              </p>
            </section>

            {/* 5. Sacred Rituals & Thali */}
            <section className="editorial-chapter">
              <h3>5. The Sacred Rituals of Rakhi Day</h3>
              <p>
                Today, Raksha Bandhan is celebrated across India and global diaspora communities with time-honored rituals:
              </p>
              <p>
                <strong>1. The Sacred Thali:</strong> Prepared with Roli (kumkum vermilion), Akshat (unbroken rice grains), an earthen oil Diya for Aarti, sacred Rakhi threads, and traditional Indian sweets (Mithai).<br />
                <strong>2. The Auspicious Tilak:</strong> The sister applies a vermilion Tilak and unbroken rice grains on her brother’s forehead, symbolizing victory, wisdom, and intellectual brilliance.<br />
                <strong>3. Tying the Rakhi:</strong> Tied on the right wrist, followed by performing the sacred Aarti to ward off evil eyes.<br />
                <strong>4. Sweet Offering &amp; Shagun:</strong> The sister feeds sweets to her brother, who reciprocates with gifts (Shagun) and a solemn vow of lifelong emotional and physical protection.
              </p>
            </section>
          </>
        )}

        {/* 6. Frequently Asked Questions */}
        <section className="faq-section" style={{ padding: '1rem 0' }}>
          <div className="faq-header" style={{ marginBottom: '1.5rem' }}>
            <h2>{articleLang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}</h2>
            <p className="faq-subtitle">
              {articleLang === 'hi' ? 'रक्षाबंधन के इतिहास व परंपरा से जुड़ी मुख्य जानकारियों के उत्तर।' : 'Everything you need to know about the history and origins of Raksha Bandhan.'}
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

      {/* Engagement Loop Banner */}
      <div className="cross-loop-banner gold-border">
        <div>
          <h3>Celebrate these timeless values today</h3>
          <p>
            Send a warm message or create a custom greeting card for your brother or sister now.
          </p>
        </div>
        <div className="banner-buttons">
          <button className="gold-button" onClick={() => {
            const currentImg = (STORY_SLIDES[currentLegend.id] && STORY_SLIDES[currentLegend.id][0]?.image) || '/HistoryImages/krishna_draupadi_1.png';
            onOpenCardModal(currentLegend.cardWish || currentLegend.quote, currentImg);
          }}>
            <Wand2 size={16} /> Create Card
          </button>
          <button
              className="ghost-button"
              onClick={() => onNavigate('/raksha-bandhan-wishes')}
            >
              Explore Rakhi Wishes <ArrowRight size={15} />
            </button>
        </div>
      </div>
    </div>
  );
}
