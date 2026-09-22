import React from 'react';
import { Link } from 'react-router-dom';
import { essaysData } from '../data/essaysData';
import Header from '../components/Header';

export default function Essays() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title Block */}
      <h1 className="page-title">Essays & Personal Writings</h1>
      <p className="page-summary">
        Essays, philosophical frameworks, and working theses on energy and money mechanics, cognitive coherence, emotional loops, and the journey of finding form.
      </p>

      {/* Essays List */}
      <div className="content-section" style={{ marginTop: '2rem' }}>
        <div className="vertical-list">
          {essaysData.map((essay) => {
            const isWorking = essay.status === 'working-thesis';
            return (
              <Link to={`/essays/${essay.id}`} key={essay.id} style={{ textDecoration: 'none' }}>
                <div className="vertical-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <div className="artifact-icon">{essay.category.toUpperCase()} // {essay.date}</div>
                    <span
                      className="status-pill"
                      style={{
                        background: isWorking ? 'var(--accent-amber-light)' : 'var(--accent-purple-light)',
                        color: isWorking ? 'var(--accent-amber)' : 'var(--accent-purple)',
                        borderColor: isWorking ? 'var(--accent-amber-border)' : 'var(--accent-purple-border)',
                        fontWeight: 600
                      }}
                    >
                      {isWorking ? 'Working Thesis ↗' : 'Read Full Essay ↗'}
                    </span>
                  </div>

                  <div className="artifact-name" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {essay.title}
                  </div>

                  <div className="artifact-type" style={{ color: 'var(--text-secondary)' }}>
                    {essay.excerpt}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2026</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
