import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function InstagramArchive() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title Block */}
      <h1 className="page-title">Visual Archive (@utkarshhguptaaa)</h1>
      <p className="page-summary">
        A personal visual notebook capturing atmospheric photography, high-contrast silhouettes, neon room ambiance, and mountain landscapes.
      </p>

      {/* Metadata */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Visual Archive</div>
        </div>
        <div>
          <div className="meta-label">Handle</div>
          <div className="meta-value">@utkarshhguptaaa</div>
        </div>
        <div>
          <div className="meta-label">Medium</div>
          <div className="meta-value">Photography & Stills</div>
        </div>
        <div>
          <div className="meta-label">Status</div>
          <div className="meta-value">
            <span className="status-pill">
              <span className="status-dot"></span>
              Live Profile
            </span>
          </div>
        </div>
        <div>
          <div className="meta-label">Direct Link</div>
          <div className="meta-value">
            <a
              href="https://www.instagram.com/utkarshhguptaaa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', fontWeight: 600 }}
            >
              Open Instagram ↗
            </a>
          </div>
        </div>
      </div>

      {/* Curator Note */}
      <div className="content-section">
        <div className="section-label">Bio & Visual Note</div>
        <div className="quote-card">
          "life's a paradox, mostly — and also i like colors."
        </div>
        <div className="section-body" style={{ marginTop: '1rem' }}>
          <p>
            A curated stream exploring high-contrast backlighting, 35mm black-and-white forest textures, deep red and purple ambient neon, golden hour ocean shorelines, and quiet mountain valley horizons.
          </p>
        </div>
      </div>

      {/* Original Instagram Capture */}
      <div className="content-section">
        <div className="section-label">Instagram Profile Capture</div>
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          marginTop: '1rem',
          background: '#09090B',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
        }}>
          <img
            src="/instagram-feed/utkarsh_profile_grid.png"
            alt="Utkarsh Gupta Instagram Profile Feed (@utkarshhguptaaa)"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </div>

      {/* Clean CTA Button */}
      <div style={{ textAlign: 'center', margin: '3rem 0 2rem 0' }}>
        <a
          href="https://www.instagram.com/utkarshhguptaaa/"
          target="_blank"
          rel="noopener noreferrer"
          className="back-btn"
          style={{
            display: 'inline-block',
            padding: '0.8rem 1.8rem',
            background: 'var(--text-primary)',
            color: '#FFF',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          View Profile on Instagram (@utkarshhguptaaa) ↗
        </a>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2025</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://www.instagram.com/utkarshhguptaaa/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
