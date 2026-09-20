import React from 'react';
import { FileText, Calendar, Scale, AlertCircle, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import '../styles/LegalPages.css';

export default function TermsPage({ onNavigate }) {
  const lastUpdated = 'September 12, 2026';

  return (
    <div className="legal-page-container">
      {/* Back button */}
      <button 
        onClick={() => onNavigate('/')}
        className="legal-back-btn"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <header className="legal-header">
        <span className="legal-badge">
          <Scale size={14} /> Legal Terms & Usage
        </span>
        <h1>Terms of Service & Disclaimer</h1>
        <p>
          Please review the terms, usage guidelines, and cultural content disclaimers governing the use of WishCrafto.
        </p>
        <div className="legal-meta-bar">
          <span className="legal-meta-item">
            <Calendar size={14} /> Last Modified: {lastUpdated}
          </span>
          <span className="legal-meta-item">
            <Shield size={14} /> Fair Use & Devotional Standards
          </span>
        </div>
      </header>

      <div className="legal-card">
        {/* Section 1: Agreement */}
        <div className="legal-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or utilizing <strong>WishCrafto</strong> (https://wishcrafto.com), whether via desktop web browsers or mobile devices, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our <button onClick={() => onNavigate('/privacy-policy')} style={{ background: 'none', border: 'none', color: '#7c3aed', cursor: 'pointer', fontWeight: 700, padding: 0 }}>Privacy Policy</button>. If you do not agree with any of these terms, you are requested not to access the service.
          </p>
        </div>

        {/* Section 2: Permitted Use */}
        <div className="legal-section">
          <h2>2. Permitted Use & Cultural Greeting Card Creation</h2>
          <p>
            WishCrafto provides free web-based utilities that enable visitors to:
          </p>
          <ul>
            <li>Browse and copy motivational Good Morning suvichar, Good Night thoughts, and festive greetings.</li>
            <li>Composite personal photographs and sender names locally onto celebratory greeting templates.</li>
            <li>Share customized cards and wallpapers across social communication channels (including WhatsApp, Facebook, Instagram, Twitter, and Telegram) for personal, family, and non-commercial celebratory purposes.</li>
            <li>Local retail store owners and professionals may use our "Business PRO Mode" to add their business name and festive message to connect respectfully with their clients.</li>
          </ul>
        </div>

        {/* Section 3: Prohibited Conduct */}
        <div className="legal-section">
          <h2>3. Prohibited Conduct & Community Respect</h2>
          <p>
            As WishCrafto celebrates sacred Indian festivals and uplifting moral values, all visitors agree to uphold dignity and respect. You strictly agree <strong>NOT</strong> to:
          </p>
          <ul>
            <li>Attach offensive, defamatory, obscene, sexually suggestive, or communally inflammatory photographs or names to any card depicting sacred deities (such as Lord Krishna, Lord Ganesha, or Goddess Lakshmi).</li>
            <li>Use automated scripts, bots, scrapers, or crawlers to extract high-resolution assets or burden our web server bandwidth excessively.</li>
            <li>Reverse engineer, decompile, or attempt to compromise the integrity of our client-side canvas generation systems.</li>
            <li>Engage in abusive, fraudulent, or unlawful behavior that impairs the experience of other visitors.</li>
          </ul>
        </div>

        {/* Section 4: Intellectual Property & Fair Use Disclaimer */}
        <div className="legal-section">
          <h2>4. Intellectual Property & Fair Use Policy</h2>
          <p>
            WishCrafto honors the intellectual property rights of artists, photographers, and content creators:
          </p>
          <ul>
            <li>
              <strong>Platform Assets:</strong> The layout, UI design, logos, original editorial writings, story translations, and custom code of WishCrafto are the intellectual property of WishCrafto.
            </li>
            <li>
              <strong>Cultural & Devotional Artwork:</strong> Deities, traditional temple artwork, and Vedic folklore depictions featured across our greeting cards are either original creations, licensed creative commons assets, or traditional devotional representations shared in good faith under the <strong>Doctrine of Fair Use</strong> for non-commercial religious, cultural, and educational celebrations.
            </li>
            <li>
              <strong>User-Uploaded Content:</strong> Users retain 100% full ownership of any personal photographs they attach to their cards. Because user photos are processed locally on the client's browser and never stored on our cloud servers, WishCrafto claims zero ownership, license, or copyright over your private family photos.
            </li>
          </ul>
        </div>

        {/* Section 5: DMCA / Copyright Takedown */}
        <div className="legal-section">
          <h2>5. DMCA & Copyright Takedown Policy</h2>
          <p>
            If you are an artist, photographer, or copyright holder and believe that any specific background artwork on WishCrafto infringes upon your copyright, please inform us immediately. We strictly adhere to fair takedown standards and will gladly review and remove or attribute the content promptly:
          </p>
          <div className="legal-highlight-box">
            <strong>Submit a Takedown Request:</strong>
            <p>
              Send an email to <a href="mailto:harshnotbeniwal@gmail.com" style={{ color: '#7c3aed' }}>harshnotbeniwal@gmail.com</a> with the exact image URL, evidence of your copyright ownership, and your contact details. We resolve all valid copyright requests within <strong>24 to 48 hours</strong>.
            </p>
          </div>
        </div>

        {/* Section 6: Festival Dates & Muhurat Disclaimer */}
        <div className="legal-section">
          <h2>6. Panchang, Muhurat & Astrological Disclaimer</h2>
          <div className="legal-highlight-box">
            <strong>⚠️ Astronomical & Regional Variations:</strong>
            <p>
              Auspicious puja timings (Muhurat), tithi schedules, and festival calendar dates displayed on WishCrafto are curated diligently based on standard Indian Vedic Panchang references (such as Drik Panchang). However, because planetary alignments and local sunrise timings vary across different geographic coordinates and regional sampradayas (e.g. Smartha vs Vaishnava traditions), visitors are advised to verify specific rituals with their local family priests or regional temples. WishCrafto provides muhurat data for general devotional guidance only.
            </p>
          </div>
        </div>

        {/* Section 7: Third-Party Advertising & External Links */}
        <div className="legal-section">
          <h2>7. Third-Party Advertising & External Links</h2>
          <p>
            WishCrafto displays advertisements served by third-party networks, including <strong>Google AdSense</strong>. We do not endorse or assume responsibility for any products, services, or claims advertised through third-party ad banners. Clicking on external links or advertisements directs you to third-party web domains governed by their own independent terms and privacy guidelines.
          </p>
        </div>

        {/* Section 8: Limitation of Liability */}
        <div className="legal-section">
          <h2>8. Limitation of Liability & Warranty</h2>
          <p>
            WishCrafto is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express or implied. In no event shall WishCrafto, its developers, or editorial contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, our service, download cards, or rely on festival dates.
          </p>
        </div>

        {/* Section 9: Jurisdiction */}
        <div className="legal-section">
          <h2>9. Governing Law & Jurisdiction</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>. Any legal dispute, claim, or controversy arising out of or relating to WishCrafto shall be subject to the exclusive jurisdiction of the competent courts located in <strong>New Delhi, India</strong>.
          </p>
        </div>

        {/* Section 10: Changes to Terms */}
        <div className="legal-section">
          <h2>10. Modifications to These Terms</h2>
          <p>
            We reserve the right to revise or update these Terms of Service periodically to reflect platform updates, regulatory changes, or new festive features. Continued use of WishCrafto following any posted modifications constitutes your binding acceptance of the updated terms.
          </p>
        </div>
      </div>
    </div>
  );
}
