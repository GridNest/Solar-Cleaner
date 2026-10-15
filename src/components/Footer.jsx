'use client';

import { Sparkles, Shield, MapPin, Heart } from 'lucide-react';

export default function Footer({ gstin = "", city = "Lucknow" }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-group">
              <div className="logo-icon-sm">
                <Sparkles size={16} />
              </div>
              <span className="brand-title">Solar <span>Cleaner</span></span>
            </div>
            <p className="footer-tagline">
              Professional, safe, and scheduled solar panel cleaning for homes, housing societies, RWAs, and factories in {city} &amp; surrounding areas.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Quick Navigation</h5>
              <ul>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#projects">Recent Projects</a></li>
                <li><a href="#commercial">Commercial &amp; Industrial</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#estimate">Instant Calculator</a></li>
                <li><a href="#book">Book a Visit</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                <li><a href="#services">Residential Rooftops</a></li>
                <li><a href="#services">Housing Societies &amp; RWAs</a></li>
                <li><a href="#services">Neighbourhood Bulk Cleaning</a></li>
                <li><a href="#commercial">Factory &amp; Warehouse Solar</a></li>
                <li><a href="#estimate">Annual Maintenance (AMC)</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} Solar Cleaner. All rights reserved.
            {gstin && <span className="gstin-badge"> · GSTIN: {gstin}</span>}
          </p>

          <p className="service-area-badge">
            <MapPin size={14} />
            <span>HQ: {city}, Uttar Pradesh</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          border-top: 1px solid var(--line);
          background: var(--surface);
          padding: 50px 0 30px;
          color: var(--muted);
          font-size: 0.95rem;
          margin-top: auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .logo-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .logo-icon-sm {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--accent);
          color: #1d2433;
          display: grid;
          place-items: center;
        }

        .brand-title {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text);
        }

        .brand-title span {
          color: var(--accent);
        }

        .footer-tagline {
          font-size: 0.92rem;
          line-height: 1.6;
          max-width: 380px;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .footer-col h5 {
          color: var(--text);
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .footer-col a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .footer-col a:hover {
          color: var(--accent-hover);
        }

        .footer-bottom {
          border-top: 1px solid var(--line);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.88rem;
        }

        .gstin-badge {
          color: var(--text);
          font-weight: 600;
        }

        .service-area-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--text);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
