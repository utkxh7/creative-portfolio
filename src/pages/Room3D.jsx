import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import Header from '../components/Header';

export default function Room3D() {
  const [activeTab, setActiveTab] = useState('scroll'); // 'scroll' or 'spline'
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title Block */}
      <h1 className="page-title">The Room — 3D Spatial Environment</h1>
      <p className="page-summary">
        My first serious project — a scroll-driven web interaction zooming from a hand-drawn house sketch through the front door directly into an interactive 3D Spline spatial environment.
      </p>

      {/* Metadata */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Scroll-Driven 3D Web App</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">3D Artist & Spatial Developer</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">2025–2026</div>
        </div>
        <div>
          <div className="meta-label">Status</div>
          <div className="meta-value">
            <span className="status-pill">
              <span className="status-dot"></span>
              Functional Prototype
            </span>
          </div>
        </div>
        <div>
          <div className="meta-label">Stack</div>
          <div className="meta-value">React, Spline, Vite, CSS Clip-Path</div>
        </div>
        <div>
          <div className="meta-label">Live App</div>
          <div className="meta-value">
            <a href="/room-site/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 600 }}>
              Launch Full Screen ↗
            </a>
          </div>
        </div>
      </div>

      {/* Mode Switcher Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('scroll')}
          className="back-btn"
          style={{
            background: activeTab === 'scroll' ? 'var(--text-primary)' : 'var(--bg-surface)',
            color: activeTab === 'scroll' ? '#FFF' : 'var(--text-secondary)',
            borderColor: activeTab === 'scroll' ? 'var(--text-primary)' : 'var(--border-color)',
            fontWeight: 600
          }}
        >
          📜 Full Scroll Zoom Experience
        </button>

        <button
          onClick={() => setActiveTab('spline')}
          className="back-btn"
          style={{
            background: activeTab === 'spline' ? 'var(--text-primary)' : 'var(--bg-surface)',
            color: activeTab === 'spline' ? '#FFF' : 'var(--text-secondary)',
            borderColor: activeTab === 'spline' ? 'var(--text-primary)' : 'var(--border-color)',
            fontWeight: 600
          }}
        >
          🎨 Direct 3D Room Orbit Canvas
        </button>
      </div>

      {/* Tab 1: Scroll-Driven Zoom Experience */}
      {activeTab === 'scroll' && (
        <div className="content-section">
          <div className="section-label">Interactive Scroll-Zoom Web App (Scroll inside frame to zoom through door)</div>
          
          <div style={{
            position: 'relative',
            width: '100%',
            height: '560px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: '#000',
            marginTop: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <iframe
              src="/room-site/index.html"
              title="First Serious Project - House to 3D Room Zoom"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
            />
          </div>

          <div style={{
            marginTop: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            justify: 'space-between'
          }}>
            <span>💡 How it works: Scroll down inside the frame to zoom through the front door into the 3D room.</span>
            <a href="/room-site/index.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              Launch Full Screen ↗
            </a>
          </div>
        </div>
      )}

      {/* Tab 2: Direct 3D Room Canvas */}
      {activeTab === 'spline' && (
        <div className="content-section">
          <div className="section-label">Direct 3D Spline Canvas (Drag & Orbit to Explore)</div>
          
          <div style={{
            position: 'relative',
            width: '100%',
            height: '560px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: '#09090B',
            marginTop: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            {isLoading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                background: '#09090B',
                color: '#A1A1AA',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                zIndex: 10
              }}>
                <span className="status-pill" style={{ background: '#27272A', color: '#E4E4E7', borderColor: '#3F3F46' }}>
                  <span className="status-dot"></span>
                  Loading 3D Room Assets...
                </span>
              </div>
            )}

            <Spline
              scene="https://prod.spline.design/syZfCDawf-vs9ST9/scene.splinecode"
              onLoad={() => setIsLoading(false)}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Project Origin & Explanation */}
      <div className="content-section">
        <div className="section-label">How the Integration Works</div>
        <div className="section-body">
          <p>
            In the <strong>First Serious Project</strong> codebase (`c:\Users\utkarsh gupta\Desktop\Projects\First Serious Project`), the web app listens to scroll progress:
          </p>
        </div>
        <ul className="clean-list" style={{ marginTop: '0.75rem' }}>
          <li><strong>0% → 55% Scroll:</strong> A CSS <code>clip-path</code> circular mask reveals the color layer of the hand-drawn house sketch starting from the sun.</li>
          <li><strong>40% → 100% Scroll:</strong> CSS <code>transform: scale()</code> zooms the viewport 7.5x directly toward the front door opening (`originX: 58.5%`, `originY: 68.5%`).</li>
          <li><strong>80% → 100% Scroll:</strong> As the camera moves inside the doorway, the interactive 3D Spline Room canvas (<code>@splinetool/react-spline</code>) smoothly fades in with full orbit and interaction controls enabled.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2025</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="/room-site/index.html" target="_blank" rel="noopener noreferrer" className="footer-link">Full App</a>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
