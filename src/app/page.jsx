'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Commercial from '../components/Commercial';
import HowItWorks from '../components/HowItWorks';
import EstimateCalculator from '../components/EstimateCalculator';
import BookingForm from '../components/BookingForm';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import MobileStickyBar from '../components/MobileStickyBar';

export default function Home() {
  // Default configurations (these will connect dynamically to MongoDB Atlas CMS in Phase 2)
  const siteConfig = {
    phone: "919648847816",
    city: "Lucknow",
    ratePerKw: 100,
    minCharge: 500,
    gstin: ""
  };

  return (
    <main>
      <Navbar phone={siteConfig.phone} city={siteConfig.city} />
      <Hero city={siteConfig.city} />
      <Services />
      <Commercial phone={siteConfig.phone} city={siteConfig.city} />
      <HowItWorks />
      <EstimateCalculator 
        ratePerKw={siteConfig.ratePerKw} 
        minCharge={siteConfig.minCharge} 
        city={siteConfig.city} 
        phone={siteConfig.phone} 
      />
      <BookingForm phone={siteConfig.phone} city={siteConfig.city} />
      <ContactSection phone={siteConfig.phone} city={siteConfig.city} />
      <Footer gstin={siteConfig.gstin} city={siteConfig.city} />
      <MobileStickyBar phone={siteConfig.phone} />
    </main>
  );
}
