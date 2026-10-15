'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Commercial from '../components/Commercial';
import WorkGallery from '../components/WorkGallery';
import HowItWorks from '../components/HowItWorks';
import EstimateCalculator from '../components/EstimateCalculator';
import BookingForm from '../components/BookingForm';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import MobileStickyBar from '../components/MobileStickyBar';

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: '5 kW Residential Rooftop De-soiling',
    capacity: '5 kW System',
    location: 'Gomti Nagar, Lucknow',
    image: '/projects/solar_home.jpg',
    description: 'Thick dust and pollution film removed using demineralized RO water and soft rotary brushes. Generation boosted by 28%.',
    ctaText: 'Book Similar Home Cleaning',
  },
  {
    id: 'proj-2',
    title: '120 kW Industrial Warehouse Rooftop',
    capacity: '120 kW Industrial',
    location: 'Transport Nagar, Lucknow',
    image: '/projects/solar_commercial.jpg',
    description: 'Scheduled multi-technician shift with safety harnesses during non-operational hours. Full generation audit & GST tax invoice provided.',
    ctaText: 'Request Factory Survey',
  },
  {
    id: 'proj-3',
    title: '45 kW Apartment Society Common Solar',
    capacity: '45 kW RWA Plant',
    location: 'Amar Shaheed Path, Lucknow',
    image: '/projects/solar_society.jpg',
    description: 'Regular monthly AMC service for common lifts & water pumps solar system. High-resolution before & after photo report sent to RWA committee.',
    ctaText: 'Get Housing Society AMC',
  },
];

export default function Home() {
  const [siteConfig, setSiteConfig] = useState({
    phone: "919648847816",
    city: "Lucknow",
    ratePerKw: 100,
    minCharge: 500,
    gstin: "",
    workingHours: "Mon – Sun: 7:00 AM – 7:00 PM",
    heroBadge: "Professional Solar Panel Cleaning in Lucknow",
    heroTitle: "Clean panels.",
    heroTitleHighlight: "More power. Lower bills.",
    heroDescription: "Dust, bird droppings and pollution quietly cut your solar generation by up to 30%. We clean home rooftops, housing societies and commercial solar plants safely, with soft brushes and treated demineralized water, on a schedule that suits you.",
    heroStat1Title: "Up to 30% Boost",
    heroStat1Sub: "In daily energy output",
    heroStat2Title: "Treated RO Water",
    heroStat2Sub: "Soft scratch-free brushes",
    heroStat3Title: "GST Invoices",
    heroStat3Sub: "& WhatsApp photo reports",
    projects: DEFAULT_PROJECTS,
  });

  // Dynamically sync with MongoDB Atlas CMS settings
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setSiteConfig((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch((err) => {
        console.warn('Using default site settings:', err);
      });
  }, []);

  return (
    <main>
      <Navbar phone={siteConfig.phone} city={siteConfig.city} />
      
      <Hero 
        city={siteConfig.city}
        badge={siteConfig.heroBadge}
        title={siteConfig.heroTitle}
        titleHighlight={siteConfig.heroTitleHighlight}
        description={siteConfig.heroDescription}
        stat1Title={siteConfig.heroStat1Title}
        stat1Sub={siteConfig.heroStat1Sub}
        stat2Title={siteConfig.heroStat2Title}
        stat2Sub={siteConfig.heroStat2Sub}
        stat3Title={siteConfig.heroStat3Title}
        stat3Sub={siteConfig.heroStat3Sub}
      />

      <Services />

      <WorkGallery 
        projects={siteConfig.projects} 
        phone={siteConfig.phone} 
        city={siteConfig.city} 
      />

      <Commercial phone={siteConfig.phone} city={siteConfig.city} />
      
      <HowItWorks />
      
      <EstimateCalculator 
        ratePerKw={siteConfig.ratePerKw} 
        minCharge={siteConfig.minCharge} 
        city={siteConfig.city} 
        phone={siteConfig.phone} 
      />
      
      <BookingForm phone={siteConfig.phone} city={siteConfig.city} />
      
      <ContactSection 
        phone={siteConfig.phone} 
        city={siteConfig.city} 
        workingHours={siteConfig.workingHours} 
      />
      
      <Footer gstin={siteConfig.gstin} city={siteConfig.city} />
      
      <MobileStickyBar phone={siteConfig.phone} />
    </main>
  );
}
