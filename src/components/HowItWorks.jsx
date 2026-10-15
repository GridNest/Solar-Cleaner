'use client';

import { Send, Sparkles, Camera } from 'lucide-react';

const steps = [
  {
    step: '1',
    icon: Send,
    title: 'Request a visit',
    description: 'Message us your location and solar plant size (kW) or use our fast instant booking form below.'
  },
  {
    step: '2',
    icon: Sparkles,
    title: 'We clean',
    description: 'Trained professional crew arrives with soft solar brushes and treated water. Zero harsh chemicals, zero scratching.'
  },
  {
    step: '3',
    icon: Camera,
    title: 'You get a report',
    description: 'High-resolution before and after photos sent straight to your WhatsApp along with power generation inspection notes.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <span>Seamless 3-Step Process</span>
          </div>
          <h2>How It Works</h2>
          <p>
            No complex paperwork. Transparent pricing and hassle-free door-step service.
          </p>
        </div>

        <div className="grid-3 steps-grid">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="card step-card">
                <div className="step-badge-row">
                  <div className="step-number">{item.step}</div>
                  <div className="step-icon-subtle">
                    <Icon size={20} />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .how-it-works-section {
          background: var(--hero);
          border-bottom: 1px solid var(--line);
        }

        .step-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .step-icon-subtle {
          color: var(--muted);
          background: var(--surface);
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
        }

        .step-card {
          border-color: var(--line);
        }

        .step-card h3 {
          margin-top: 4px;
        }
      `}</style>
    </section>
  );
}
