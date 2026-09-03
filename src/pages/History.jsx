import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock,
  Gift,
  Heart,
  Image as ImageIcon,
  Mail,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import './History.css';

const heroImage = '/Common/rakhi_hero.png';

const tocItems = [
  { id: 'summary', label: 'Quick Summary' },
  { id: 'origins', label: 'Origins' },
  { id: 'krishna-draupadi', label: 'Krishna and Draupadi' },
  { id: 'lakshmi-bali', label: 'Lakshmi and King Bali' },
  { id: 'yama-yamuna', label: 'Yama and Yamuna' },
  { id: 'karnavati-humayun', label: 'Rani Karnavati and Humayun' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'today', label: 'Why It Is Celebrated Today' },
  { id: 'faqs', label: 'FAQs' },
];

const storySections = [
  {
    id: 'krishna-draupadi',
    eyebrow: 'Mahabharata Tradition',
    title: 'Krishna and Draupadi',
    quote: 'A small act of care became a lifelong promise of protection.',
    body: [
      'One of the most beloved Raksha Bandhan stories comes from the bond between Lord Krishna and Draupadi. According to popular retellings, Draupadi tore a strip from her sari to bandage Krishna when his finger was hurt. Krishna, moved by her affection, promised to protect her whenever she needed him.',
      'The story is often remembered as the emotional heart of Raksha Bandhan: protection is not a transaction, but a sacred response to love, trust, and loyalty.',
    ],
  },
  {
    id: 'lakshmi-bali',
    eyebrow: 'Puranic Tradition',
    title: 'Lakshmi and King Bali',
    quote: 'The rakhi becomes a bridge between devotion, duty, and family.',
    body: [
      'In another popular legend, Goddess Lakshmi ties a sacred thread to King Bali and accepts him as her brother. Bali, honored by this gesture, grants her wish and allows Lord Vishnu to return to Vaikuntha.',
      'This story gives Raksha Bandhan a deeper spiritual meaning. It shows the rakhi as a bond that can create kinship, soften power, and turn obligation into affection.',
    ],
  },
  {
    id: 'yama-yamuna',
    eyebrow: 'Ancient Blessing',
    title: 'Yama and Yamuna',
    quote: 'The festival also carries a blessing for long life and remembrance.',
    body: [
      'The story of Yama and Yamuna connects Raksha Bandhan with longevity and reunion. Yamuna welcomed her brother Yama with affection and tied a protective thread on his wrist. Pleased by her love, Yama blessed that siblings who honor this bond would receive protection and long life.',
      'For many families, this legend explains why the festival is not only about protection, but also about visiting, blessing, and renewing family affection.',
    ],
  },
  {
    id: 'karnavati-humayun',
    eyebrow: 'Medieval Memory',
    title: 'Rani Karnavati and Humayun',
    quote: 'A thread could cross kingdoms when trust needed a language.',
    body: [
      'The story of Rani Karnavati of Mewar and Emperor Humayun is one of the most famous historical memories associated with Raksha Bandhan. In popular tradition, the queen sent a rakhi to Humayun seeking protection during a time of danger.',
      'Historians discuss the details differently, but the story remains culturally powerful because it expresses the festival beyond one household: the rakhi becomes a symbol of honor, alliance, and moral duty.',
    ],
  },
];

const timeline = [
  { era: 'Vedic and Puranic roots', detail: 'Protective threads, blessings, and sacred vows appear across older ritual traditions.' },
  { era: 'Epic storytelling', detail: 'Krishna and Draupadi popularize the emotional meaning of care returned as protection.' },
  { era: 'Medieval memory', detail: 'Stories such as Rani Karnavati and Humayun expand rakhi into a symbol of honor.' },
  { era: 'Modern India', detail: 'Families celebrate with rakhi, sweets, gifts, prayers, calls, photos, and digital greetings.' },
];

const relatedPages = [
  { title: 'Wishes', text: 'Find warm messages for brothers, sisters, cousins, and friends.', icon: Heart, href: '/#wishes' },
  { title: 'Greeting Cards', text: 'Create a premium digital card with your personal Rakhi message.', icon: Mail, href: '/#greeting-card' },
  { title: 'Images', text: 'Browse festive wallpapers and shareable Raksha Bandhan visuals.', icon: ImageIcon, href: '/#images' },
  { title: 'Gift Ideas', text: 'Explore thoughtful gifts that feel personal and memorable.', icon: Gift, href: '/#gift-ideas' },
];

const faqs = [
  {
    question: 'What is the oldest origin of Raksha Bandhan?',
    answer: 'Raksha Bandhan draws from several traditions around protective threads, sibling blessings, and sacred vows. Its modern form brings together ritual, mythology, and family celebration.',
  },
  {
    question: 'Is Raksha Bandhan only for brothers and sisters?',
    answer: 'The most common celebration is between sisters and brothers, but many families also honor cousins, close friends, mentors, and chosen bonds of care.',
  },
  {
    question: 'Why is a rakhi tied on the wrist?',
    answer: 'The wrist is a visible place for a sacred thread. It represents remembrance, protection, blessing, and a promise to stand by one another.',
  },
  {
    question: 'Which story is most associated with Raksha Bandhan?',
    answer: 'Krishna and Draupadi is one of the best-known stories, while Lakshmi and Bali, Yama and Yamuna, and Rani Karnavati and Humayun are also widely remembered.',
  },
];

function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total <= 0 ? 0 : (window.scrollY / total) * 100;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function FestivalNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = useMemo(() => [
    { label: 'Home', href: '/' },
    { label: 'Raksha Bandhan', href: '/#raksha-bandhan', dropdown: true },
    { label: 'Wishes', href: '/#wishes' },
    { label: 'Images', href: '/#images' },
    { label: 'History', href: '/history', active: true },
    { label: 'Greeting Card', href: '/#greeting-card' },
    { label: 'FAQ', href: '/#faq' },
  ], []);

  return (
    <>
      <header className="festival-nav history-nav">
        <a className="brand" href="/" aria-label="WishCrafto home">
          <Sparkles size={24} />
          <span>WishCrafto</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a className={item.active ? 'active' : ''} href={item.href} key={item.label}>
              {item.label}
              {item.dropdown && <ChevronDown size={13} />}
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <label className="nav-search">
            <Search size={15} />
            <input placeholder="Search wishes, stories..." />
          </label>
          <button aria-label="Toggle dark mode"><Moon size={17} /></button>
          <button aria-label="Toggle festive glow"><Sun size={17} /></button>
          <button aria-label="Favorites"><Heart size={17} /></button>
          <button className="menu-button" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer history-footer">
      <div>
        <a className="brand" href="/">
          <Sparkles size={22} />
          <span>WishCrafto</span>
        </a>
        <p>Celebrating India's culture, one festival at a time.</p>
      </div>
      <div>
        <h3>Explore</h3>
        <a href="/">Home</a>
        <a href="/#raksha-bandhan">Raksha Bandhan</a>
        <a href="/#wishes">Wishes</a>
        <a href="/#images">Images</a>
      </div>
      <div>
        <h3>Resources</h3>
        <a href="/#faq">FAQ</a>
        <a href="/#gift-ideas">Gift Ideas</a>
        <a href="/history">History</a>
      </div>
      <div>
        <h3>Made with love for India</h3>
        <p>(c) 2026 WishCrafto. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function HistoryPage() {
  const progress = useReadingProgress();

  useEffect(() => {
    document.title = 'The History of Raksha Bandhan | WishCrafto';

    const description = 'Explore the history of Raksha Bandhan, including Krishna and Draupadi, Lakshmi and King Bali, Yama and Yamuna, Rani Karnavati, and the modern meaning of Rakhi.';
    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', description);
  }, []);

  return (
    <div className="festival-page history-page">
      <a className="skip-link" href="#history-content">Skip to history content</a>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <FestivalNav />

      <main id="history-content">
        <article>
          <header className="history-hero">
            <div className="history-hero-copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <a href="/#raksha-bandhan">Raksha Bandhan</a>
                <span>/</span>
                <strong>History</strong>
              </nav>
              <p className="eyebrow"><BookOpen size={14} /> Festival Guide</p>
              <h1>The History of Raksha Bandhan</h1>
              <p className="history-subtitle">
                A premium guide to the stories, legends, rituals, and cultural memory behind India's beloved festival of sibling love and protection.
              </p>
              <div className="article-meta" aria-label="Article details">
                <span><Clock size={16} /> 8 min read</span>
                <span><CalendarDays size={16} /> Last updated August 3, 2026</span>
              </div>
            </div>

            <figure className="history-hero-media">
              <img src={heroImage} alt="Decorative Rakhi artwork with golden festive lights" loading="eager" />
              <figcaption>Rakhi represents protection, affection, blessing, and lifelong remembrance.</figcaption>
            </figure>
          </header>

          <div className="history-layout">
            <aside className="history-toc" aria-labelledby="toc-heading">
              <h2 id="toc-heading">Table of Contents</h2>
              <nav>
                {tocItems.map((item) => (
                  <a href={`#${item.id}`} key={item.id}>{item.label}</a>
                ))}
              </nav>
            </aside>

            <div className="history-article">
              <section className="quick-summary history-card reveal" id="summary" aria-labelledby="summary-heading">
                <span className="section-kicker">Quick Summary</span>
                <h2 id="summary-heading">Raksha Bandhan at a glance</h2>
                <p>
                  Raksha Bandhan, also called Rakhi, celebrates a sacred bond of care, protection, and responsibility. A sister traditionally ties a rakhi on her brother's wrist, offers prayers for his well-being, and receives a promise of support. Today, the festival also honors cousins, friends, chosen family, and anyone who shares a bond of trust.
                </p>
                <div className="summary-grid" aria-label="Quick facts">
                  <div><strong>Theme</strong><span>Protection and affection</span></div>
                  <div><strong>Month</strong><span>Shravana Purnima</span></div>
                  <div><strong>Rituals</strong><span>Rakhi, tilak, sweets, gifts</span></div>
                </div>
              </section>

              <section className="history-section reveal" id="origins" aria-labelledby="origins-heading">
                <span className="section-kicker">Origins of Raksha Bandhan</span>
                <h2 id="origins-heading">A festival shaped by ritual, story, and family memory</h2>
                <p>
                  The word "Raksha" means protection, and "Bandhan" means bond. Together, Raksha Bandhan points to a relationship protected by affection, duty, and remembrance. The festival is connected with the full moon day of Shravana and carries echoes of older protective-thread customs, blessings, and family rituals.
                </p>
                <p>
                  Over time, its meaning expanded through mythological stories, regional practices, royal legends, and modern family traditions. That layered history is why Raksha Bandhan feels intimate at home while still belonging to India's wider cultural imagination.
                </p>
              </section>

              {storySections.map((story) => (
                <section className="history-section story-section reveal" id={story.id} key={story.id} aria-labelledby={`${story.id}-heading`}>
                  <span className="section-kicker">{story.eyebrow}</span>
                  <h2 id={`${story.id}-heading`}>{story.title}</h2>
                  <blockquote>{story.quote}</blockquote>
                  {story.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <img src={heroImage} alt="" loading="lazy" />
                </section>
              ))}

              <section className="history-section reveal" id="timeline" aria-labelledby="timeline-heading">
                <span className="section-kicker">Timeline</span>
                <h2 id="timeline-heading">How Raksha Bandhan evolved</h2>
                <div className="timeline-list">
                  {timeline.map((item, index) => (
                    <article className="timeline-card" key={item.era}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{item.era}</h3>
                        <p>{item.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="history-section celebration-today reveal" id="today" aria-labelledby="today-heading">
                <span className="section-kicker">Modern Meaning</span>
                <h2 id="today-heading">Why Raksha Bandhan is celebrated today</h2>
                <p>
                  Raksha Bandhan remains meaningful because it turns affection into a visible ritual. The rakhi is small, but the gesture is large: it says, "I remember you, I bless you, and I stand with you." Families celebrate with aarti, tilak, sweets, gifts, shared meals, calls, photos, and digital greetings.
                </p>
                <p>
                  In modern India and across the diaspora, Rakhi has also become a celebration of emotional safety. It honors the people who protect our confidence, keep our memories, and make home feel close even across distance.
                </p>
              </section>

              <section className="history-section faq-section reveal" id="faqs" aria-labelledby="faqs-heading">
                <span className="section-kicker">Frequently Asked Questions</span>
                <h2 id="faqs-heading">Questions about Raksha Bandhan history</h2>
                <div className="faq-list">
                  {faqs.map((faq) => (
                    <details key={faq.question}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section className="history-section related-section reveal" aria-labelledby="related-heading">
                <span className="section-kicker">Related Pages</span>
                <h2 id="related-heading">Continue exploring Raksha Bandhan</h2>
                <div className="related-grid">
                  {relatedPages.map(({ title, text, icon: Icon, href }) => (
                    <a className="related-card" href={href} key={title}>
                      <Icon size={20} />
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <span>Open <ArrowRight size={15} /></span>
                    </a>
                  ))}
                </div>
              </section>

              <section className="newsletter-section reveal" aria-labelledby="newsletter-heading">
                <div>
                  <span className="section-kicker">Newsletter</span>
                  <h2 id="newsletter-heading">Get festival stories before every celebration</h2>
                  <p>Receive curated history, wishes, images, gifting ideas, and ritual notes for upcoming Indian festivals.</p>
                </div>
                <form aria-label="Subscribe to WishCrafto newsletter">
                  <label htmlFor="newsletter-email">Email address</label>
                  <div className="newsletter-control">
                    <input id="newsletter-email" type="email" placeholder="you@example.com" autoComplete="email" />
                    <button type="submit">Subscribe <ArrowRight size={16} /></button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
