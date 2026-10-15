'use client';

import { useState, useId } from 'react';
import { MapPin, MessageCircle, Send, CheckCircle2, Loader2, Check, Calendar, Clock } from 'lucide-react';

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
  const dateId = useId();
  const timeId = useId();
  const addressId = useId();

  const todayDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    customerPhone: '',
    type: 'Home owner',
    size: '',
    address: '',
    preferredDate: '',
    preferredTime: 'Morning (7:00 AM – 10:00 AM)',
    locationCoords: '',
  });

  const [hasLocation, setHasLocation] = useState(false);
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
      setLocationStatus('GPS is not supported on this browser. Please type your full address.');
      return;
    }

    setIsGettingLocation(true);
    setLocationStatus('Pinpointing your exact GPS rooftop coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
        
        // Save silently without displaying raw coordinates
        setFormData((prev) => ({ ...prev, locationCoords: mapUrl }));
        setHasLocation(true);
        setLocationStatus('Exact GPS rooftop coordinates tagged successfully.');
        setIsGettingLocation(false);
      },
      (err) => {
        console.warn('Geolocation warning:', err);
        setLocationStatus('Could not access GPS. Please ensure location is enabled or enter your address below.');
        setIsGettingLocation(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  const generateWhatsAppMessage = () => {
    let msg = `Hi, I want solar panel cleaning in ${city}.\n` +
      `• Name: ${formData.name || '-'}\n` +
      `• Phone: ${formData.customerPhone || '-'}\n` +
      `• Category: ${formData.type}\n` +
      `• Plant Size: ${formData.size ? `${formData.size} kW` : 'Not sure'}\n` +
      `• Preferred Date: ${formData.preferredDate || 'Earliest available'}\n` +
      `• Preferred Time: ${formData.preferredTime || '-'}\n` +
      `• Address/Landmark: ${formData.address || '-'}`;
    
    if (formData.locationCoords) {
      msg += `\n• Google Maps Location: ${formData.locationCoords}`;
    }
    return msg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        customerPhone: formData.customerPhone,
        type: formData.type,
        size: Number(formData.size) || null,
        address: formData.address,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        locationCoords: formData.locationCoords,
        city,
        source: 'Website Booking Form'
      };

      // 1. Post to backend API (saves in MongoDB Atlas and dispatches email alert)
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (apiErr) {
        console.warn('Backend API submission:', apiErr);
      }

      setSubmittedSuccess(true);

      // 2. Open WhatsApp with complete formatted details, scheduled date/time and Google Maps link
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
        <div className="section-head text-center">
          <div className="section-badge">
            <Send size={14} />
            <span>Fast Doorstep Booking</span>
          </div>
          <h2>Schedule a Cleaning Visit</h2>
          <p>
            Choose your preferred date &amp; time slot. Our team will coordinate your doorstep cleaning visit.
          </p>
        </div>

        <div className="booking-wrapper">
          <div className="card booking-card">
            {submittedSuccess ? (
              <div className="success-state">
                <CheckCircle2 size={50} className="success-icon" />
                <h3>Booking Request Received!</h3>
                <p>
                  Thank you, <strong>{formData.name || 'valued customer'}</strong>. Our cleaning crew has logged your appointment for{' '}
                  <strong>{formData.preferredDate || 'the upcoming slot'}</strong> ({formData.preferredTime}).
                </p>
                {formData.locationCoords && (
                  <div className="gps-success-pill">
                    <MapPin size={15} />
                    <span>Google Maps location attached to your booking</span>
                  </div>
                )}
                <div>
                  <button 
                    type="button" 
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setHasLocation(false);
                      setLocationStatus('');
                      setFormData({ 
                        name: '', 
                        customerPhone: '', 
                        type: 'Home owner', 
                        size: '', 
                        address: '', 
                        preferredDate: '', 
                        preferredTime: 'Morning (7:00 AM – 10:00 AM)', 
                        locationCoords: '' 
                      });
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '20px' }}
                  >
                    Book Another Rooftop
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                {/* 1. Name and Phone Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={nameId}>Your Name *</label>
                    <input
                      id={nameId}
                      name="name"
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

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
                </div>

                {/* 2. Customer Category and Plant Size Row */}
                <div className="form-row">
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

                  <div className="form-group">
                    <label htmlFor={sizeId}>Plant Capacity (kW)</label>
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
                </div>

                {/* 3. Preferred Date & Time Slot Row (NEW) */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={dateId} className="flex-label">
                      <Calendar size={15} className="label-icon" />
                      <span>Preferred Cleaning Date</span>
                    </label>
                    <input
                      id={dateId}
                      name="preferredDate"
                      type="date"
                      min={todayDate}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="date-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={timeId} className="flex-label">
                      <Clock size={15} className="label-icon" />
                      <span>Preferred Time Slot</span>
                    </label>
                    <select
                      id={timeId}
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="Morning (7:00 AM – 10:00 AM)">Morning (7:00 AM – 10:00 AM) - Recommended</option>
                      <option value="Late Morning (10:00 AM – 1:00 PM)">Late Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Evening (4:00 PM – 7:00 PM)">Evening (4:00 PM – 7:00 PM)</option>
                      <option value="Flexible / Any Time">Flexible / Any Time</option>
                    </select>
                  </div>
                </div>

                {/* 4. Address */}
                <div className="form-group">
                  <label htmlFor={addressId}>Address / Colony Landmark *</label>
                  <input
                    id={addressId}
                    name="address"
                    required
                    placeholder="e.g. House No 42, Gomti Nagar, Near Post Office"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* 5. Clean GPS Location Tag Button */}
                <div className="gps-action-container">
                  {!hasLocation ? (
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isGettingLocation}
                      className="btn-location"
                    >
                      {isGettingLocation ? (
                        <>
                          <Loader2 size={16} className="spinner" />
                          <span>Pinpointing exact GPS rooftop...</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={16} className="pin-icon" />
                          <span>Share my precise GPS location (1-Click)</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="location-verified-pill">
                      <div className="verified-left">
                        <Check size={16} className="check-icon" />
                        <span>GPS Rooftop Location Tagged</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        className="re-tag-btn"
                        title="Re-capture location"
                      >
                        Update
                      </button>
                    </div>
                  )}

                  {locationStatus && (
                    <span className="location-hint-text">{locationStatus}</span>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-wa btn-lg full-btn"
                >
                  <MessageCircle size={20} />
                  <span>{isSubmitting ? 'Registering Booking...' : 'Send booking on WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .book-section {
          background: var(--bg);
          border-bottom: 1px solid var(--line);
          padding: 55px 0 65px;
        }

        .text-center {
          text-align: center;
          margin-bottom: 28px;
        }

        .booking-wrapper {
          max-width: 680px;
          margin: 0 auto;
        }

        .booking-card {
          padding: 28px 32px;
          border-color: var(--line);
          background: var(--surface);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 5px;
          display: block;
        }

        .flex-label {
          display: flex !important;
          align-items: center;
          gap: 6px;
        }

        .label-icon {
          color: var(--accent);
        }

        input, select {
          padding: 11px 14px;
          font-size: 0.95rem;
          border-radius: var(--radius-md);
        }

        .date-input {
          cursor: pointer;
        }

        .gps-action-container {
          margin: 6px 0 20px;
        }

        .btn-location {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--bg);
          border: 1.5px dashed var(--line);
          color: var(--text);
          font-weight: 600;
          font-size: 0.88rem;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-location:hover {
          border-color: var(--accent);
          background: var(--accent-soft);
          color: var(--accent-hover);
        }

        .pin-icon {
          color: #ef4444;
        }

        .location-verified-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ecfdf5;
          border: 1.5px solid #a7f3d0;
          padding: 9px 14px;
          border-radius: var(--radius-md);
          color: #065f46;
          font-weight: 600;
          font-size: 0.88rem;
        }

        :global(:root[data-theme="dark"]) .location-verified-pill {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.3);
          color: #34d399;
        }

        .verified-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .check-icon {
          color: #10b981;
        }

        .re-tag-btn {
          background: transparent;
          border: none;
          color: #059669;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: underline;
          cursor: pointer;
        }

        .location-hint-text {
          display: block;
          font-size: 0.78rem;
          color: var(--muted);
          margin-top: 5px;
        }

        .full-btn {
          width: 100%;
          justify-content: center;
        }

        .success-state {
          text-align: center;
          padding: 24px 10px;
        }

        .success-icon {
          color: #10b981;
          margin-bottom: 12px;
        }

        .gps-success-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eef2ff;
          color: #4338ca;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          margin-top: 12px;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .booking-card {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
