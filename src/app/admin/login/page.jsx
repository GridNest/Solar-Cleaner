'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('solar_admin_auth', data.token);
        router.push('/admin');
      } else {
        setError(data.message || 'Incorrect password');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-badge">
            <Sparkles size={24} />
          </div>
          <h1>Solar<span>Cleaner</span></h1>
          <p>Admin Portal &amp; Leads Management</p>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="admin-pass">Master Admin Password</label>
            <div className="password-input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="admin-pass"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                className="show-hide-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-lg login-btn">
            <span>{loading ? 'Authenticating...' : 'Sign in to Dashboard'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer">
          <p>Default security password: <code>admin@solar2026</code></p>
          <a href="/" className="back-link">← Return to Website</a>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: var(--bg);
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .login-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .logo-badge {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--accent);
          color: #1d2433;
          display: grid;
          place-items: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .login-header h1 {
          font-size: 1.8rem;
          margin-bottom: 4px;
        }

        .login-header h1 span {
          color: var(--accent);
        }

        .login-header p {
          font-size: 0.95rem;
          color: var(--muted);
          margin: 0;
        }

        .error-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input-wrapper input {
          padding-left: 42px;
          padding-right: 42px;
          font-size: 1rem;
          color: #0f172a !important;
          background: #ffffff !important;
          border: 1.5px solid #cbd5e1 !important;
          font-weight: 600 !important;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--muted);
          pointer-events: none;
        }

        .show-hide-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--muted);
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 4px;
        }

        .login-btn {
          width: 100%;
          justify-content: center;
          margin-top: 24px;
        }

        .login-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          text-align: center;
          font-size: 0.85rem;
          color: var(--muted);
        }

        .login-footer code {
          background: var(--hero);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          color: var(--text);
        }

        .back-link {
          display: inline-block;
          margin-top: 14px;
          color: var(--muted);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: var(--accent-hover);
        }
      `}</style>
    </div>
  );
}
