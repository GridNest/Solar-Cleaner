'use client';

import { Phone, MessageCircle, Calendar } from 'lucide-react';

export default function MobileStickyBar({ phone = "919648847816" }) {
  return (
    <aside className="mobile-bar" aria-label="Quick Actions">
      <div className="mobile-bar-actions">
        <a 
          href={`tel:+${phone}`} 
          className="mobile-bar-btn call-btn"
          aria-label="Call directly"
        >
          <Phone size={18} />
          <span>Call Now</span>
        </a>

        <a 
          href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi, I want solar panel cleaning.")}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="mobile-bar-btn wa-btn"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

        <a 
          href="#book" 
          className="mobile-bar-btn book-btn"
          aria-label="Book visit"
        >
          <Calendar size={18} />
          <span>Book Visit</span>
        </a>
      </div>

      <style jsx>{`
        .mobile-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: var(--surface);
          border-top: 1px solid var(--line);
          padding: 8px 12px calc(8px + env(safe-area-inset-bottom, 0px));
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
        }

        .mobile-bar-actions {
          display: flex;
          gap: 8px;
          max-width: 480px;
          margin: 0 auto;
        }

        .mobile-bar-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 8px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.85rem;
          transition: transform 0.15s ease;
        }

        .mobile-bar-btn:active {
          transform: scale(0.97);
        }

        .call-btn {
          background: var(--bg);
          border: 1px solid var(--line);
          color: var(--text);
        }

        .wa-btn {
          background: #25d366;
          color: #ffffff;
        }

        .book-btn {
          background: var(--accent);
          color: var(--accent-text);
        }

        @media (max-width: 768px) {
          .mobile-bar {
            display: block;
          }
        }
      `}</style>
    </aside>
  );
}
