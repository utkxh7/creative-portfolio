import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ className = '', style = {} }) {
  return (
    <footer className={`site-footer ${className}`} style={{ borderTop: '1px solid var(--border-color)', marginTop: '4rem', ...style }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        Utkarsh Gupta © 2026 · Systems & Energy Quantitative Analytics
      </div>
      <div className="footer-links">
        <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
        <a href="https://github.com/utkarshhguptaaa" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
        <Link to="/desktop" className="footer-link" title="Launch Y2K Retro Terminal">Terminal</Link>
      </div>
    </footer>
  );
}

