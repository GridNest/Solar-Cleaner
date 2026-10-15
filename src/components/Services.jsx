'use client';

import { Home, Building2, Users, CalendarCheck2, ArrowUpRight } from 'lucide-react';

const servicesData = [
  {
    icon: Home,
    title: 'Home rooftops',
    description: 'One-time or monthly periodic cleaning for 1–10 kW residential home solar systems.',
    tag: 'Popular for Homes',
    link: '#estimate'
  },
  {
    icon: Building2,
    title: 'Housing societies & RWAs',
    description: 'Solar for lifts, pumps and common lights cleaned on a fixed monthly visit, with proper invoices for the committee.',
    tag: 'Gated Communities',
    link: '#book'
  },
  {
    icon: Users,
    title: 'Neighbour group booking',
    description: 'Get 5 or more homes in your colony or street together and everyone gets a guaranteed group discount rate.',
    tag: 'Group Discount',
    link: '#book'
  },
  {
    icon: CalendarCheck2,
    title: 'Annual contracts (AMC)',
    description: 'Fixed scheduled visits per year at a deeply discounted rate, with before/after generation health reports.',
    tag: 'Best Value',
    link: '#estimate'
  }
];

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <span>Tailored Solutions</span>
          </div>
          <h2>Our Cleaning Services</h2>
          <p>
            Whether it is an individual villa, an apartment complex, or an entire neighbourhood group, 
            we provide professional, safe, and scheduled solar maintenance.
          </p>
        </div>

        <div className="grid-4">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="card service-card">
                <div className="card-top-row">
                  <div className="card-icon">
                    <Icon size={24} />
                  </div>
                  <span className="service-tag">{service.tag}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href={service.link} className="service-action-link">
                  <span>Calculate or Book</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .service-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #b45309;
          background: var(--accent-light);
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        :global(:root[data-theme="dark"]) .service-tag {
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.15);
        }

        .service-card h3 {
          margin-top: 6px;
        }

        .service-card p {
          flex-grow: 1;
          margin-bottom: 16px;
        }

        .service-action-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent-hover);
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .service-action-link:hover {
          gap: 9px;
        }
      `}</style>
    </section>
  );
}
