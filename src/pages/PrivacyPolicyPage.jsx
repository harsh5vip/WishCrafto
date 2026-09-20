import React from 'react';
import { ShieldCheck, Calendar, Lock, Cookie, Eye, UserCheck, Mail, ArrowLeft } from 'lucide-react';
import '../styles/LegalPages.css';

export default function PrivacyPolicyPage({ onNavigate }) {
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
          <ShieldCheck size={14} /> Trust & Transparency
        </span>
        <h1>Privacy Policy</h1>
        <p>
          Learn how WishCrafto handles user privacy, zero-cloud photo processing, cookies, and Google AdSense compliance across our 365-day festival and daily greeting platform.
        </p>
        <div className="legal-meta-bar">
          <span className="legal-meta-item">
            <Calendar size={14} /> Effective Date: {lastUpdated}
          </span>
          <span className="legal-meta-item">
            <Lock size={14} /> Zero-Cloud Photo Processing
          </span>
        </div>
      </header>

      <div className="legal-card">
        {/* Section 1: Introduction */}
        <div className="legal-section">
          <h2>1. Introduction & Overview</h2>
          <p>
            Welcome to <strong>WishCrafto</strong> (accessible via <code>https://wishcrafto.com</code>). 
            WishCrafto is an Indian cultural platform and digital greeting card studio dedicated to helping individuals, families, and local business owners create, personalize, and share celebratory wishes, daily motivational suvichar, and authentic cultural folklore stories across all major Indian and global festivals throughout the year (including <strong>Diwali, Navratri, Dussehra, Chhath Puja, Christmas, New Year, Holi, Eid, Ganesh Chaturthi, Krishna Janmashtami, Raksha Bandhan, Independence Day, Republic Day</strong>, and daily Good Morning/Good Night status).
          </p>
          <p>
            We take your privacy exceptionally seriously. Unlike traditional mobile applications that require hefty 40MB+ APK downloads and demand intrusive camera or contact permissions, WishCrafto functions as a lightweight, zero-install Progressive Web App (PWA). This Privacy Policy document transparently outlines the types of information we collect, how it is handled, and your rights as a valued user.
          </p>
        </div>

        {/* Section 2: Zero-Cloud Client-Side Photo Processing */}
        <div className="legal-section">
          <h2>2. Zero-Cloud Personal Photo Processing Guarantee</h2>
          <div className="legal-highlight-box">
            <strong>🔒 100% In-Browser Privacy Guarantee:</strong>
            <p>
              When you select your photo to attach to any Good Morning card, festival wish, or celebratory greeting, your photo is <strong>NEVER</strong> uploaded to, processed by, or stored on our web servers or any cloud database.
            </p>
          </div>
          <p>
            All photo rendering, cropping, resizing, draggable avatar placements, and watermark embeddings occur strictly on your device's browser memory via the <strong>HTML5 Canvas API</strong>:
          </p>
          <ul>
            <li><strong>Local Image Manipulation:</strong> The image file you select remains exclusively inside your device's local memory. When you click "Download" or "Share", the final image is composited entirely within your web browser.</li>
            <li><strong>No Facial Recognition or Bio-Data:</strong> WishCrafto does not scan, analyze, extract biometric points, or profile any faces or individuals appearing in uploaded photographs.</li>
            <li><strong>Local Storage Option:</strong> For your convenience, if you choose to reuse your name or photo across multiple visits, your name and chosen avatar may be saved in your browser's local sandbox (<code>localStorage</code> under keys <code>wishcrafto_user_name</code> and <code>wishcrafto_user_photo</code>). You can permanently erase this data at any second by simply clearing your browser cache.</li>
          </ul>
        </div>

        {/* Section 3: Google AdSense & Third-Party Advertising */}
        <div className="legal-section">
          <h2>3. Google AdSense & Third-Party Advertising Vendors</h2>
          <p>
            To keep WishCrafto 100% free for millions of celebratory users without requiring paid subscriptions or paywalls, we partner with third-party advertising platforms, including <strong>Google AdSense</strong>.
          </p>
          <h3>Google DoubleClick DART Cookie Compliance:</h3>
          <ul>
            <li>Google, as a third-party vendor, uses cookies to serve ads on WishCrafto.</li>
            <li>Google's use of advertising cookies (such as the DoubleClick DART cookie) enables it and its partners to serve personalized advertisements to our users based on their prior visits to WishCrafto and other websites on the Internet.</li>
            <li>These cookies do not collect personally identifiable information such as your name, email address, physical address, or telephone number.</li>
            <li>
              <strong>Opt-Out Instructions:</strong> Users may opt out of personalized advertising by visiting the official{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', fontWeight: 600 }}>
                Google Ads Settings
              </a>. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting{' '}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', fontWeight: 600 }}>
                www.aboutads.info
              </a>.
            </li>
          </ul>
        </div>

        {/* Section 4: Web Analytics */}
        <div className="legal-section">
          <h2>4. Web Analytics (Google Analytics 4)</h2>
          <p>
            We utilize <strong>Google Analytics 4 (Measurement ID: G-GX7Y74GVDX)</strong> to observe aggregate platform metrics, including total page views, general regional distribution (country/city level), browser types, screen resolutions, and average session duration.
          </p>
          <p>
            Google Analytics operates with anonymized IP addresses and aggregate reporting. This telemetry is collected solely to optimize page load speeds, verify mobile viewport responsiveness, and ensure smooth performance across various smartphone models.
          </p>
        </div>

        {/* Section 5: Cookies & Local Web Technologies */}
        <div className="legal-section">
          <h2>5. Cookies & Local Storage Breakdown</h2>
          <div className="legal-table-wrapper">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Essential / Functional</strong></td>
                  <td>Stores active category preferences (e.g. Good Morning vs Ganesh Chaturthi) and background audio mute state.</td>
                  <td>Session / Persistent</td>
                </tr>
                <tr>
                  <td><strong>Browser localStorage</strong></td>
                  <td>Caches your customized sender name and avatar locally so you do not need to retype it on every card.</td>
                  <td>Until cleared by user</td>
                </tr>
                <tr>
                  <td><strong>Google Analytics Cookies</strong></td>
                  <td>Measures aggregated visitor metrics and page performance anonymously.</td>
                  <td>Up to 14 months</td>
                </tr>
                <tr>
                  <td><strong>Advertising Cookies (Google)</strong></td>
                  <td>Serves relevant, non-intrusive contextual advertisements to support platform maintenance.</td>
                  <td>Standard vendor duration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Children's Privacy */}
        <div className="legal-section">
          <h2>6. Children's Information Protection (COPPA)</h2>
          <p>
            Protecting young children online is of paramount importance to us. WishCrafto does not knowingly collect any personally identifiable information from children under the age of 13. As our card generation tools operate locally without user account registration, no child identity profiles are ever generated or stored. If a parent or guardian believes that any child personal data has inadvertently reached our server logs, please reach out immediately and we will promptly purge it.
          </p>
        </div>

        {/* Section 7: Data Protection Rights */}
        <div className="legal-section">
          <h2>7. Your Rights Under DPDPA 2023 & GDPR</h2>
          <p>
            In compliance with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong> and international standards (such as the GDPR and CCPA):
          </p>
          <ul>
            <li><strong>Right to Access:</strong> You have the right to request information regarding any data we hold about you.</li>
            <li><strong>Right to Erasure:</strong> You can delete all your stored client-side preferences by clearing your browser's site data for <code>wishcrafto.com</code> at any time.</li>
            <li><strong>Right to Opt-Out:</strong> You retain complete freedom to disable non-essential cookies via your browser preferences or via Google Ad Settings.</li>
          </ul>
        </div>

        {/* Section 8: Grievance Officer & Contact */}
        <div className="legal-section">
          <h2>8. Grievance Officer & Privacy Inquiries</h2>
          <p>
            In accordance with the Information Technology Act, 2000 (India) and Rules made thereunder, if you have any questions, grievances, or feedback regarding our privacy practices, you may directly contact our designated Grievance Officer:
          </p>
          <div className="legal-highlight-box">
            <p><strong>Official Contact Email:</strong> <a href="mailto:harshnotbeniwal@gmail.com" style={{ color: '#7c3aed' }}>harshnotbeniwal@gmail.com</a></p>
            <p style={{ marginTop: '0.4rem' }}><strong>Platform:</strong> WishCrafto (https://wishcrafto.com)</p>
            <p style={{ marginTop: '0.4rem' }}><strong>Turnaround Time:</strong> We review and resolve all legitimate privacy and data inquiries within 24 to 48 business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
