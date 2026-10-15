'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, MessageCircle, Menu, X, Sparkles, Phone } from 'lucide-react';

export default function Navbar({ phone = "919648847816", city = "Lucknow" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check initial theme or system preference
    const savedTheme = localStorage.getItem('solar_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('solar_theme', newTheme);
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Commercial', href: '#commercial' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Estimate', href: '#estimate' },
    { name: 'Book Visit', href: '#book' },
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="brand-logo" aria-label="SolarCleaner.in Homepage">
          <div className="logo-icon-box">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
          <span className="logo-text">Solar<span>Cleaner</span>.in</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-btn" 
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <a 
            href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi, I'd like to book solar panel cleaning.")}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-wa nav-btn"
          >
            <MessageCircle size={18} />
            <span>WhatsApp Us</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="mobile-nav-divider"></div>
              <a 
                href={`tel:+${phone}`}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone size={18} />
                <span>Call +{phone}</span>
              </a>
              <a 
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi, I'd like to book solar panel cleaning.")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-wa"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg);
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
          padding: 14px 0;
        }

        .navbar-scrolled {
          background: rgba(255, 253, 247, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom-color: var(--line);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
        }

        :global(:root[data-theme="dark"]) .navbar-scrolled {
          background: rgba(16, 20, 28, 0.95);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text);
        }

        .logo-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent);
          display: grid;
          place-items: center;
          color: #1d2433;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.02em;
        }

        .logo-text span {
          color: var(--accent);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          color: var(--muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: var(--accent-hover);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-btn {
          background: var(--surface);
          border: 1px solid var(--line);
          color: var(--text);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .mobile-toggle {
          display: none;
          background: var(--surface);
          border: 1px solid var(--line);
          color: var(--text);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          place-items: center;
          cursor: pointer;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 99;
          animation: fadeIn 0.2s ease;
        }

        .mobile-menu-panel {
          background: var(--surface);
          border-bottom: 1px solid var(--line);
          padding: 24px 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-link {
          color: var(--text);
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid var(--line);
        }

        .mobile-nav-divider {
          height: 8px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 860px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: grid;
          }
          .nav-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
