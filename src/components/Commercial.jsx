'use client';

import { Factory, School, Mountain, MessageCircle, FileSpreadsheet, ShieldAlert } from 'lucide-react';

const commercialList = [
  {
    icon: Factory,
    title: 'Factories & warehouses',
    description: 'Expansive roof areas cleaned in planned, high-efficiency shifts with minimal disruption to your warehouse operations.'
  },
  {
    icon: School,
    title: 'Schools, hospitals & hotels',
    description: 'Early-morning or off-hours cleaning so students, patients, and guests experience zero noise or disturbance.'
  },
  {
    icon: Mountain,
    title: 'Ground-mount & utility plants',
    description: 'Multi-day specialized crews with industrial-grade soft washing equipment for MW-scale farms on monthly/quarterly contracts.'
  }
];

export default function Commercial({ phone = "919648847816", city = "Lucknow" }) {
  const surveyMessage = `Hi, I'd like a site survey and quote for solar panel cleaning at a commercial/industrial site in ${city}.`;

  return (
    <section id="commercial" className="commercial-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <ShieldAlert size={15} />
            <span>Enterprise &amp; Industrial</span>
          </div>
          <h2>Commercial &amp; Industrial Cleaning</h2>
          <p className="commercial-subtitle">
            Large rooftops and ground-mount plants need a safety-certified crew, fall-arrest harnesses, and a fixed operational schedule. We coordinate visits around your shift hours and supply complete cleaning logs and GST tax invoices.
          </p>
        </div>

        <div className="grid-3">
          {commercialList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="card commercial-card">
                <div className="card-icon">
                  <Icon size={24} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="commercial-banner">
          <div className="banner-info">
            <FileSpreadsheet size={28} className="banner-icon" />
            <div>
              <h4>Need an on-site technical inspection &amp; custom quote?</h4>
              <p>Our project engineer will inspect your roof access, water availability, and panel layout.</p>
            </div>
          </div>
          <a 
            id="com-wa" 
            href={`https://wa.me/${phone}?text=${encodeURIComponent(surveyMessage)}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-lg"
          >
            <MessageCircle size={20} />
            <span>Request a site survey</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .commercial-section {
          background: var(--bg);
          border-bottom: 1px solid var(--line);
        }

        .commercial-subtitle {
          max-width: 680px;
        }

        .commercial-card {
          border-color: var(--line);
        }

        .commercial-banner {
          margin-top: 36px;
          background: var(--surface);
          border: 1.5px dashed var(--accent);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: var(--card-shadow);
        }

        .banner-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .banner-icon {
          color: #b45309;
          flex-shrink: 0;
        }

        :global(:root[data-theme="dark"]) .banner-icon {
          color: #fbbf24;
        }

        .banner-info h4 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }

        .banner-info p {
          font-size: 0.95rem;
          margin: 0;
        }

        @media (max-width: 820px) {
          .commercial-banner {
            flex-direction: column;
            align-items: flex-start;
          }

          .commercial-banner .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
