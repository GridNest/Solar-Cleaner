'use client';

import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function ContactSection({ 
  phone = "919648847816", 
  city = "Lucknow" 
}) {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card">
          <div className="contact-text">
            <div className="section-badge">
              <MapPin size={15} />
              <span>Serving {city} &amp; Surrounding Regions</span>
            </div>
            <h2>Get in Touch With Our Cleaning Crew</h2>
            <p>
              Have questions about our water filtration, scheduling an AMC, or need a customized quote for your housing society? We are just a phone call or WhatsApp message away.
            </p>
            
            <div className="contact-badges">
              <div className="badge-item">
                <Clock size={16} />
                <span>Mon – Sun: 7:00 AM – 7:00 PM</span>
              </div>
              <div className="badge-item">
                <ShieldCheck size={16} />
                <span>Zero Hard Chemicals Used</span>
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
                className="btn btn-secondary action-btn"
              >
                <Phone size={18} />
                <span>Call Now</span>
              </a>
              <a 
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi SolarCleaner, I'd like to ask a few questions about solar panel cleaning.")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-wa action-btn"
              >
                <MessageCircle size={18} />
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
          padding: 60px 0;
        }

        .contact-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: 40px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 36px;
          align-items: center;
          box-shadow: var(--card-shadow);
        }

        .contact-text p {
          margin-bottom: 20px;
        }

        .contact-badges {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.86rem;
          color: var(--muted);
          font-weight: 600;
        }

        .contact-actions-box {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .direct-reach-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .phone-big-link {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
          margin-bottom: 18px;
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

        @media (max-width: 800px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 24px;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
