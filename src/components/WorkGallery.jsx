'use client';

import { Sparkles, MapPin, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function WorkGallery({ 
  projects = [], 
  phone = "919648847816", 
  city = "Lucknow" 
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="gallery-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Sparkles size={15} />
            <span>Proven Track Record</span>
          </div>
          <h2>Recent Solar Cleaning Projects</h2>
          <p>
            Browse real rooftop sites and industrial plants recently serviced by our certified cleaning crews in {city} and neighboring regions.
          </p>
        </div>

        <div className="grid-3 project-grid">
          {projects.map((project, index) => {
            const waText = encodeURIComponent(
              `Hi SolarCleaner, I saw your recent project "${project.title}" (${project.capacity}) in ${project.location || city}. I would like to book a similar cleaning visit for my rooftop.`
            );
            const waLink = `https://wa.me/${phone}?text=${waText}`;

            return (
              <div key={project.id || index} className="card project-card">
                <div className="project-img-wrapper">
                  <img 
                    src={project.image || '/projects/solar_home.jpg'} 
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />
                  <div className="project-badge-row">
                    <span className="capacity-badge">{project.capacity}</span>
                    {project.location && (
                      <span className="location-badge">
                        <MapPin size={12} />
                        <span>{project.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-footer">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-wa btn-sm project-cta-btn"
                    >
                      <MessageCircle size={15} />
                      <span>{project.ctaText || 'Book Similar Service'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .gallery-section {
          background: var(--surface);
          border-bottom: 1px solid var(--line);
        }

        .project-grid {
          gap: 26px;
        }

        .project-card {
          padding: 0;
          overflow: hidden;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          border-color: var(--line);
        }

        .project-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #e2e8f0;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .project-badge-row {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .capacity-badge {
          background: rgba(29, 36, 51, 0.85);
          backdrop-filter: blur(4px);
          color: #f59e0b;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.4);
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          color: #1d2433;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        :global(:root[data-theme="dark"]) .location-badge {
          background: rgba(24, 30, 42, 0.9);
          color: #eef1f7;
        }

        .project-content {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-content h3 {
          font-size: 1.18rem;
          margin-bottom: 8px;
          color: var(--text);
        }

        .project-content p {
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 18px;
          flex-grow: 1;
        }

        .project-footer {
          border-top: 1px solid var(--line);
          padding-top: 14px;
        }

        .project-cta-btn {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .project-content {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  );
}
