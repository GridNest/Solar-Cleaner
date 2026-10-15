'use client';

import { Calculator, CalendarCheck, Zap, Droplets, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ 
  city = "Lucknow",
  badge = "Professional Solar Panel Cleaning in Lucknow",
  title = "Clean panels.",
  titleHighlight = "More power. Lower bills.",
  description = "Dust, bird droppings and pollution quietly cut your solar generation by up to 30%. We clean home rooftops, housing societies and commercial solar plants safely, with soft brushes and treated demineralized water, on a schedule that suits you.",
  stat1Title = "Up to 30% Boost",
  stat1Sub = "In daily energy output",
  stat2Title = "Treated RO Water",
  stat2Sub = "Soft scratch-free brushes",
  stat3Title = "GST Invoices",
  stat3Sub = "& WhatsApp photo reports",
}) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="section-badge animate-float">
              <span className="pulse-dot"></span>
              <span>{badge}</span>
            </div>

            <h1>
              {title}<br />
              <span className="gradient-highlight">{titleHighlight}</span>
            </h1>

            <p className="hero-description">
              {description}
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
              <a href="#projects" className="btn btn-outline btn-lg">
                <span>Recent Projects</span>
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
                  <strong>{stat1Title}</strong>
                  <span>{stat1Sub}</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="feature-icon">
                  <Droplets size={20} />
                </div>
                <div>
                  <strong>{stat2Title}</strong>
                  <span>{stat2Sub}</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong>{stat3Title}</strong>
                  <span>{stat3Sub}</span>
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
          max-width: 900px;
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
          max-width: 760px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: nowrap;
          margin-bottom: 40px;
        }

        .hero-actions .btn {
          white-space: nowrap;
        }

        .hero-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
          max-width: 860px;
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
