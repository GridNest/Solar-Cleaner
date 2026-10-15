'use client';

import { useState, useId } from 'react';
import { Calculator, MessageCircle, Check, Sparkles, HelpCircle } from 'lucide-react';

const PLANS = [
  { value: 1, label: 'One-time cleaning', discount: null },
  { value: 0.85, label: 'Monthly contract', discount: '15% OFF' },
  { value: 0.8, label: 'Quarterly AMC', discount: '20% OFF' },
  { value: 0.75, label: 'Housing society monthly contract', discount: '25% OFF' },
];

export default function EstimateCalculator({ 
  ratePerKw = 100, 
  minCharge = 500, 
  city = "Lucknow", 
  phone = "919648847816" 
}) {
  const kwInputId = useId();
  const planSelectId = useId();
  const [kw, setKw] = useState(5);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0].value);

  const plantSize = Math.max(1, Number(kw) || 1);
  const calculatedPrice = Math.max(minCharge, Math.round(plantSize * ratePerKw * selectedPlan));
  const formattedPrice = '₹' + calculatedPrice.toLocaleString('en-IN');

  const selectedPlanObj = PLANS.find(p => p.value === selectedPlan);
  const planName = selectedPlanObj ? selectedPlanObj.label : 'One-time cleaning';

  const waMessage = `Hi, I need solar cleaning for a ${plantSize} kW plant in ${city} (${planName}). Estimate shown on website: ${formattedPrice}`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;

  const presets = [3, 5, 10, 20, 50];

  return (
    <section id="estimate" className="estimate-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Calculator size={15} />
            <span>Instant Pricing</span>
          </div>
          <h2>Instant Cost Estimate</h2>
          <p>
            Choose your solar system size and cleaning schedule for an immediate transparent estimate.
          </p>
        </div>

        <div className="estimate-wrapper">
          <div className="card estimate-card">
            {/* System Size Field */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor={kwInputId}>
                  <span>Plant Capacity (in kW)</span>
                </label>
                <span className="current-kw-tag">{plantSize} kW System</span>
              </div>
              
              <div className="kw-input-container">
                <input
                  id={kwInputId}
                  type="number"
                  min="1"
                  max="500"
                  value={kw}
                  onChange={(e) => setKw(e.target.value)}
                  placeholder="e.g. 5"
                  className="kw-number-input"
                />
              </div>

              {/* Slider for quick adjustments */}
              <div className="slider-wrapper">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={plantSize <= 50 ? plantSize : 50}
                  onChange={(e) => setKw(Number(e.target.value))}
                  className="kw-range-slider"
                  aria-label="Solar capacity slider"
                />
                <div className="slider-markers">
                  <span>1 kW</span>
                  <span>10 kW</span>
                  <span>25 kW</span>
                  <span>50+ kW</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="preset-chips">
                <span className="preset-label">Quick select:</span>
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setKw(val)}
                    className={`preset-btn ${plantSize === val ? 'preset-active' : ''}`}
                  >
                    {val} kW
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Select Field */}
            <div className="form-group">
              <label htmlFor={planSelectId}>Select Frequency / Plan</label>
              <select
                id={planSelectId}
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(Number(e.target.value))}
                className="plan-select"
              >
                {PLANS.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label} {plan.discount ? `(${plan.discount})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Price Display */}
            <div className="price-display-box">
              <div className="price-details">
                <span className="price-label">Approx. per visit estimate:</span>
                <div className="price-amount-wrapper">
                  <span className="price-amount" id="out">{formattedPrice}</span>
                  {selectedPlanObj?.discount && (
                    <span className="discount-pill">{selectedPlanObj.discount} Applied</span>
                  )}
                </div>
                <small className="price-disclaimer">
                  * Indicative only. Minimum visit charge is ₹{minCharge}. Final price verified after rooftop access details.
                </small>
              </div>

              <div className="estimate-actions">
                <a 
                  id="est-wa" 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-wa btn-lg full-btn"
                >
                  <MessageCircle size={20} />
                  <span>Book this Estimate on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="estimate-inclusions">
              <div className="inc-item">
                <Check size={16} className="inc-icon" />
                <span>Demineralized treated water</span>
              </div>
              <div className="inc-item">
                <Check size={16} className="inc-icon" />
                <span>Soft scratch-proof rotary/manual brushes</span>
              </div>
              <div className="inc-item">
                <Check size={16} className="inc-icon" />
                <span>Before &amp; After photo report</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .estimate-section {
          background: var(--bg);
          border-bottom: 1px solid var(--line);
        }

        .estimate-wrapper {
          max-width: 620px;
          margin: 0 auto;
        }

        .estimate-card {
          padding: 32px;
          border-color: var(--line);
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .current-kw-tag {
          font-size: 0.85rem;
          font-weight: 700;
          color: #b45309;
          background: var(--accent-light);
          padding: 2px 10px;
          border-radius: var(--radius-full);
        }

        :global(:root[data-theme="dark"]) .current-kw-tag {
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.15);
        }

        .kw-number-input {
          font-size: 1.15rem;
          font-weight: 700;
          padding: 12px 16px;
        }

        .slider-wrapper {
          margin-top: 14px;
        }

        .kw-range-slider {
          width: 100%;
          accent-color: var(--accent);
          cursor: pointer;
          height: 6px;
          border-radius: 4px;
        }

        .slider-markers {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 4px;
        }

        .preset-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .preset-label {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 600;
        }

        .preset-btn {
          background: var(--bg);
          border: 1px solid var(--line);
          color: var(--text);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-btn:hover {
          border-color: var(--accent);
          color: var(--accent-hover);
        }

        .preset-active {
          background: var(--accent-soft);
          border-color: var(--accent);
          color: #b45309;
        }

        :global(:root[data-theme="dark"]) .preset-active {
          color: #fbbf24;
        }

        .plan-select {
          font-size: 1rem;
          padding: 13px 16px;
          cursor: pointer;
        }

        .price-display-box {
          margin-top: 24px;
          padding: 24px;
          background: var(--hero);
          border-radius: var(--radius-md);
          border: 1px solid var(--line);
        }

        .price-label {
          font-size: 0.95rem;
          color: var(--muted);
          font-weight: 600;
        }

        .price-amount-wrapper {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin: 6px 0 10px;
          flex-wrap: wrap;
        }

        .price-amount {
          font-size: 2.3rem;
          font-weight: 800;
          color: var(--text);
          line-height: 1;
        }

        .discount-pill {
          background: #10b981;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .price-disclaimer {
          display: block;
          color: var(--muted);
          font-size: 0.82rem;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .full-btn {
          width: 100%;
          justify-content: center;
        }

        .estimate-inclusions {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid var(--line);
          padding-top: 18px;
        }

        .inc-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text);
        }

        .inc-icon {
          color: #10b981;
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .estimate-card {
            padding: 20px;
          }
          .price-display-box {
            padding: 18px;
          }
          .price-amount {
            font-size: 1.9rem;
          }
        }
      `}</style>
    </section>
  );
}
