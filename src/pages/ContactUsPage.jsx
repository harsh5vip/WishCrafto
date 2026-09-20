import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2, Send, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';
import '../styles/LegalPages.css';

export default function ContactUsPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/harshnotbeniwal@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Category: formData.inquiryType,
          Subject: formData.subject || `WishCrafto Inquiry from ${formData.name}`,
          Message: formData.message,
          _subject: `[WishCrafto Contact] ${formData.subject || formData.inquiryType} from ${formData.name}`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', inquiryType: 'general', subject: '', message: '' });
      } else {
        // Fallback to mailto if submission service returned an error
        const mailtoSubject = encodeURIComponent(`[${formData.inquiryType.toUpperCase()}] ${formData.subject || 'WishCrafto Contact Form'}`);
        const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.inquiryType}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:harshnotbeniwal@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        setIsSubmitted(true);
        setFormData({ name: '', email: '', inquiryType: 'general', subject: '', message: '' });
      }
    } catch (error) {
      // Fallback to mailto client directly if fetch was blocked (e.g. adblocker)
      const mailtoSubject = encodeURIComponent(`[${formData.inquiryType.toUpperCase()}] ${formData.subject || 'WishCrafto Contact Form'}`);
      const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.inquiryType}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:harshnotbeniwal@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', inquiryType: 'general', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <MessageSquare size={14} /> Direct Assistance
        </span>
        <h1>Contact & Support</h1>
        <p>
          Have a question about creating cards, suggesting upcoming festivals, or reporting an issue? Reach out directly to our editorial and support desk.
        </p>
        <div className="legal-meta-bar">
          <span className="legal-meta-item">
            <Clock size={14} /> Response Time: 24–48 Business Hours
          </span>
          <span className="legal-meta-item">
            <MapPin size={14} /> New Delhi, India
          </span>
        </div>
      </header>

      <div className="contact-grid">
        {/* Left: Contact Info Panels */}
        <div className="contact-info-panel">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={22} />
            </div>
            <div className="contact-info-text">
              <h3>Official Support Email</h3>
              <p>For all inquiries, festival suggestions, card creation questions, and copyright concerns:</p>
              <a href="mailto:harshnotbeniwal@gmail.com">harshnotbeniwal@gmail.com</a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Sparkles size={22} />
            </div>
            <div className="contact-info-text">
              <h3>Want to Get Featured or Hired? (Careers &amp; Creators)</h3>
              <p>Are you a digital artist, designer, or creator who wants your artwork featured on WishCrafto's homepage, or want to join our creative team? Email your portfolio / CV to:</p>
              <a href="mailto:harshnotbeniwal@gmail.com?subject=Creator%20Feature%20/%20Career%20Inquiry">harshnotbeniwal@gmail.com</a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Clock size={22} />
            </div>
            <div className="contact-info-text">
              <h3>Operational Hours</h3>
              <p>Monday to Saturday: 9:30 AM – 6:30 PM (IST)</p>
              <p style={{ marginTop: '4px', fontSize: '0.82rem', color: '#94a3b8' }}>
                Closed on major Indian national gazetted holidays.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="contact-form-card">
          {isSubmitted ? (
            <div className="contact-success-banner">
              <CheckCircle2 size={28} />
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '4px' }}>
                  Dhanyavaad! Your message has been received.
                </strong>
                <p style={{ margin: 0, fontSize: '0.88rem' }}>
                  Our editorial support team has logged your inquiry. We typically reply to verified email addresses within 24 to 48 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="ghost-button"
                  style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.5rem' }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Fill out the form below and we will get back to you promptly.
              </p>

              <div className="form-group">
                <label htmlFor="contact-name">Your Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-type">Inquiry Category *</label>
                <select
                  id="contact-type"
                  className="form-select"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                >
                  <option value="general">General Inquiry / User Support</option>
                  <option value="get-featured">🎨 Want to Get Featured on Homepage (Artists &amp; Creators)</option>
                  <option value="careers">💼 Careers / Join the Team (Hiring)</option>
                  <option value="festival-request">Festival or Category Suggestion</option>
                  <option value="business">Business PRO Mode / Corporate Cards</option>
                  <option value="bug-report">Technical Glitch / Bug Report</option>
                  <option value="copyright">Copyright / DMCA Takedown Notice</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject Line</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Brief summary of your inquiry"
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Your Message *</label>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Write your question, suggestion, or feedback here in detail..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending Message...</>
                ) : (
                  <>
                    <Send size={16} /> Submit Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
