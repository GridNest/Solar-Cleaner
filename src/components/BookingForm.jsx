'use client';

import { useState, useId } from 'react';
import { MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const CUSTOMER_TYPES = [
  'Home owner',
  'Housing society / RWA',
  'Business / factory / commercial building'
];

export default function BookingForm({ phone = "919648847816", city = "Lucknow" }) {
  const nameId = useId();
  const phoneId = useId();
  const typeId = useId();
  const sizeId = useId();
  const addressId = useId();

  const [formData, setFormData] = useState({
    name: '',
    customerPhone: '',
    type: 'Home owner',
    size: '',
    address: '',
    locationCoords: '',
  });

  const [locationStatus, setLocationStatus] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Location is not supported on this device. Please type your full address.');
      return;
    }

    setIsGettingLocation(true);
    setLocationStatus('Acquiring high-accuracy GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const acc = Math.round(position.coords.accuracy);
        const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
        
        setFormData((prev) => ({ ...prev, locationCoords: mapUrl }));
        setLocationStatus(`Location verified (Accuracy: ~${acc}m). Google Maps link attached.`);
        setIsGettingLocation(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationStatus('Could not access location. Please check browser permissions or enter your address below.');
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const generateWhatsAppMessage = () => {
    return (
      `Hi, I want solar panel cleaning in ${city}.\n` +
      `• Name: ${formData.name || '-'}\n` +
      `• Phone: ${formData.customerPhone || '-'}\n` +
      `• Customer Type: ${formData.type}\n` +
      `• Plant Size: ${formData.size ? `${formData.size} kW` : 'Not sure'}\n` +
      `• Address/Landmark: ${formData.address || '-'}` +
      (formData.locationCoords ? `\n• GPS Location: ${formData.locationCoords}` : '')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Phase 1: Store lead locally to guarantee zero data loss & ready for Phase 2 API
      const newLead = {
        ...formData,
        city,
        submittedAt: new Date().toISOString(),
        id: 'LEAD-' + Date.now()
      };
      
      const existingLeads = JSON.parse(localStorage.getItem('solar_local_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('solar_local_leads', JSON.stringify(existingLeads));

      // Attempt to post to backend API if ready (Phase 2 bridge)
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        });
      } catch (e) {
        // Soft fallback for Phase 1
      }

      setSubmittedSuccess(true);

      // Open WhatsApp with pre-filled message
      const text = generateWhatsAppMessage();
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="book-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Send size={15} />
            <span>Fast Rooftop Booking</span>
          </div>
          <h2>Book a Cleaning Visit</h2>
          <p>
            Fill out your details below. You will be connected directly on WhatsApp with our service team in {city}.
          </p>
        </div>

        <div className="booking-wrapper">
          <div className="card booking-card">
            {submittedSuccess ? (
              <div className="success-state">
                <CheckCircle2 size={56} className="success-icon" />
                <h3>Booking Request Received!</h3>
                <p>
                  Thank you, <strong>{formData.name || 'valued customer'}</strong>. Our cleaning team will contact you shortly to confirm your scheduled slot.
                </p>
                <button 
                  type="button" 
                  onClick={() => setSubmittedSuccess(false)}
                  className="btn btn-secondary"
                  style={{ marginTop: '16px' }}
                >
                  Book Another Visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor={nameId}>Your Name *</label>
                  <input
                    id={nameId}
                    name="name"
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor={phoneId}>Phone / WhatsApp Number *</label>
                  <input
                    id={phoneId}
                    name="customerPhone"
                    required
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.customerPhone}
                    onChange={handleChange}
                  />
                </div>

                {/* Type of Customer */}
                <div className="form-group">
                  <label htmlFor={typeId}>Customer Category</label>
                  <select
                    id={typeId}
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    {CUSTOMER_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* System Size */}
                <div className="form-group">
                  <label htmlFor={sizeId}>Plant Size in kW (if known)</label>
                  <input
                    id={sizeId}
                    name="size"
                    type="number"
                    min="1"
                    placeholder="e.g. 5"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </div>

                {/* Address / Landmark */}
                <div className="form-group">
                  <label htmlFor={addressId}>Address / Colony / Society Landmark *</label>
                  <input
                    id={addressId}
                    name="address"
                    required
                    placeholder="e.g. Gomti Nagar, Indira Nagar, etc."
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Location GPS Button */}
                <div className="location-box">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="btn btn-secondary btn-location"
                  >
                    {isGettingLocation ? (
                      <>
                        <Loader2 size={18} className="spinner" />
                        <span>Detecting GPS Location...</span>
                      </>
                    ) : (
                      <>
                        <MapPin size={18} className="location-pin-icon" />
                        <span>Share my precise GPS location</span>
                      </>
                    )}
                  </button>
                  <small className="location-status-text">
                    {locationStatus || 'Optional. Helps our field crew locate your building roof accurately.'}
                  </small>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-wa btn-lg full-btn"
                >
                  <MessageCircle size={20} />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send booking on WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .book-section {
          background: var(--surface);
          border-bottom: 1px solid var(--line);
        }

        .booking-wrapper {
          max-width: 600px;
          margin: 0 auto;
        }

        .booking-card {
          padding: 32px;
        }

        .location-box {
          margin: 6px 0 24px;
        }

        .btn-location {
          width: 100%;
          border-style: dashed;
        }

        .location-pin-icon {
          color: #ef4444;
        }

        .location-status-text {
          display: block;
          margin-top: 8px;
          color: var(--muted);
          font-size: 0.84rem;
        }

        .full-btn {
          width: 100%;
          justify-content: center;
        }

        .success-state {
          text-align: center;
          padding: 30px 10px;
        }

        .success-icon {
          color: #10b981;
          margin-bottom: 16px;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .booking-card {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
