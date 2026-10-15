'use client';

import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function ContactSection({ 
  phone = "919648847816", 
  city = "Lucknow",
  workingHours = "Mon – Sun: 7:00 AM – 7:00 PM"
}) {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card">
          <div className="contact-text">
            <div className="section-badge">
              <MapPin size={13} />
              <span>{city} &amp; Surrounding Areas</span>
            </div>
            <h2>Quick Cleaning Support</h2>
            <p className="contact-desc">
              Have questions regarding RO water filtration, booking an AMC, or need a committee quotation for your housing society? Reach out directly.
            </p>
            
            <div className="contact-badges">
              <div className="badge-item">
                <Clock size={15} />
                <span>{workingHours}</span>
              </div>
              <div className="badge-item">
                <ShieldCheck size={15} />
                <span>Zero Harsh Chemicals</span>
              </div>
            </div>
          </div>

          <div className="contact-actions-box">
            <span className="direct-reach-label">Direct Hotline / WhatsApp</span>
            <a href={`tel:+${phone}`} className="phone-big-link">
              +{phone}
            </a>

            <div className="action-buttons-group">
              <a 
                href={`tel:+${phone}`} 
                className="btn btn-secondary btn-sm action-btn"
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>
              <a 
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi SolarCleaner, I'd like to ask a few questions about solar panel cleaning.")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-wa btn-sm action-btn"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          background: var(--hero);
          border-bottom: 1px solid var(--line);
          padding: 42px 0;
        }

        .contact-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: 28px 34px;
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 28px;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .contact-text h2 {
          font-size: 1.55rem;
          margin-bottom: 6px;
        }

        .contact-desc {
          font-size: 0.95rem;
          line-height: 1.55;
          margin-bottom: 14px;
        }

        .contact-badges {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 600;
        }

        .contact-actions-box {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 20px 22px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .direct-reach-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          font-weight: 700;
          margin-bottom: 4px;
        }

        .phone-big-link {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }

        .phone-big-link:hover {
          color: var(--accent-hover);
        }

        .action-buttons-group {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        .action-btn {
          flex: 1;
          justify-content: center;
        }

        @media (max-width: 820px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 22px;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
