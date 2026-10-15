'use client';

import { Calculator, CalendarCheck, ShieldCheck, Zap, Droplets, ArrowRight } from 'lucide-react';

export default function Hero({ city = "Lucknow" }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="section-badge animate-float">
              <span className="pulse-dot"></span>
              <span>Professional Solar Panel Cleaning in {city}</span>
            </div>

            <h1>
              Clean panels.<br />
              <span className="gradient-highlight">More power.</span> Lower bills.
            </h1>

            <p className="hero-description">
              Dust, bird droppings and pollution quietly cut your solar generation by up to 30%. 
              We clean home rooftops, housing societies and commercial solar plants safely, 
              with soft brushes and treated demineralized water, on a schedule that suits you.
            </p>

            <div className="hero-actions">
              <a href="#estimate" className="btn btn-lg">
                <Calculator size={20} />
                <span>Get instant estimate</span>
              </a>
              <a href="#book" className="btn btn-secondary btn-lg">
                <CalendarCheck size={20} />
                <span>Book a visit</span>
              </a>
              <a href="#services" className="btn btn-outline btn-lg">
                <span>Our services</span>
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Highlights Grid */}
            <div className="hero-features">
              <div className="hero-feature-item">
                <div className="feature-icon">
                  <Zap size={20} />
                </div>
                <div>
                  <strong>Up to 30% Boost</strong>
                  <span>In daily energy output</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="feature-icon">
                  <Droplets size={20} />
                </div>
                <div>
                  <strong>Treated RO Water</strong>
                  <span>Soft scratch-free brushes</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong>GST Invoices</strong>
                  <span>&amp; WhatsApp photo reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          background: var(--hero);
          padding: 60px 0 70px;
          border-bottom: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          max-width: 800px;
        }

        .gradient-highlight {
          color: #d97706;
          position: relative;
        }

        :global(:root[data-theme="dark"]) .gradient-highlight {
          color: #fbbf24;
        }

        .hero-description {
          font-size: 1.18rem;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 30px;
          max-width: 680px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .hero-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 18px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }

        .hero-feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--surface);
          border: 1px solid var(--line);
          display: grid;
          place-items: center;
          color: #b45309;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        :global(:root[data-theme="dark"]) .feature-icon {
          color: #fbbf24;
        }

        .hero-feature-item div {
          display: flex;
          flex-direction: column;
        }

        .hero-feature-item strong {
          color: var(--text);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .hero-feature-item span {
          color: var(--muted);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 0 50px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
