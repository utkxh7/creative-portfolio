import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChingariBrandSystemPresentation from '../components/ChingariBrandSystemPresentation';

export default function Chingari() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visualsystem'); // 'visualsystem' | 'casestudy'

  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title Block */}
      <h1 className="page-title">Chingari</h1>
      <p className="page-summary">
        A bespoke Indian cult brand reimagining the lost heritage of vintage Indian matchbox folklore as collectible, engraved pocket art lighters.
        Blending aged print-memory with neon cyberpunk visual typography.
      </p>

      {/* Metadata */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Visual Identity & EDC Object</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">Brand Architect & Visual Designer</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">2025–2026</div>
        </div>
        <div>
          <div className="meta-label">Status</div>
          <div className="meta-value">
            <span className="status-pill" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', borderColor: 'var(--accent-blue-border)' }}>
              <span className="status-dot" style={{ background: 'var(--accent-blue)' }}></span>
              Live Storefront MVP
            </span>
          </div>
        </div>
        <div>
          <div className="meta-label">Brand Deck</div>
          <div className="meta-value">
            <Link to="/chingari/presentation" style={{ textDecoration: 'underline', fontWeight: 600 }}>
              Fullscreen Case Study (9 Chapters) ↗
            </Link>
          </div>
        </div>
        <div>
          <div className="meta-label">Live Storefront</div>
          <div className="meta-value">
            <a href="https://chingari-website.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 600 }}>
              Launch Store (Vercel) ↗
            </a>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
        marginTop: '2rem',
        marginBottom: '1.75rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('visualsystem')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            padding: '0.5rem 1.15rem',
            borderRadius: '9999px',
            border: activeTab === 'visualsystem' ? '1px solid var(--text-primary)' : '1px solid var(--border-color)',
            background: activeTab === 'visualsystem' ? 'var(--text-primary)' : 'var(--bg-surface)',
            color: activeTab === 'visualsystem' ? 'var(--bg-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontWeight: 500
          }}
        >
          <span>💎 Visual Identity System (9 Chapters)</span>
        </button>

        <button
          onClick={() => setActiveTab('casestudy')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            padding: '0.5rem 1.15rem',
            borderRadius: '9999px',
            border: activeTab === 'casestudy' ? '1px solid var(--text-primary)' : '1px solid var(--border-color)',
            background: activeTab === 'casestudy' ? 'var(--text-primary)' : 'var(--bg-surface)',
            color: activeTab === 'casestudy' ? 'var(--bg-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontWeight: 500
          }}
        >
          <span>🛒 Live Storefront & Case Study</span>
        </button>
      </div>

      {/* ─── TAB 1: VISUAL IDENTITY SYSTEM ─── */}
      {activeTab === 'visualsystem' && (
        <div className="content-section" style={{ marginTop: '0.5rem' }}>
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: '#160B21',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)'
          }}>
            {/* Top Bar */}
            <div style={{
              padding: '0.75rem 1.25rem',
              background: 'rgba(22, 11, 33, 0.96)',
              borderBottom: '1px solid rgba(246, 238, 221, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#F6EEDD'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D9720C' }}></span>
                <span style={{ letterSpacing: '0.04em' }}>CHINGARI · Visual Systems & Brand Architecture Case Study</span>
              </div>
              <Link
                to="/chingari/presentation"
                className="back-btn"
                style={{
                  padding: '0.3rem 0.8rem',
                  fontSize: '0.75rem',
                  background: 'rgba(246, 238, 221, 0.12)',
                  borderColor: 'rgba(246, 238, 221, 0.25)',
                  color: '#F6EEDD'
                }}
              >
                Open Fullscreen Case Study ⛶
              </Link>
            </div>

            {/* Embedded Visual System Presentation */}
            <div style={{ height: '86vh', width: '100%', position: 'relative' }}>
              <ChingariBrandSystemPresentation
                isEmbedded={true}
                onToggleFullscreen={() => navigate('/chingari/presentation')}
              />
            </div>
          </div>

          <div style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Tip: Use the bottom arrows or <kbd style={{ padding: '0.15rem 0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.75rem' }}>←</kbd> <kbd style={{ padding: '0.15rem 0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.75rem' }}>→</kbd> keys to cycle through all 9 chapters.
            </span>
            <button
              onClick={() => setActiveTab('casestudy')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontWeight: 600,
                padding: 0
              }}
            >
              Launch live storefront & read analysis →
            </button>
          </div>
        </div>
      )}

      {/* ─── TAB 2: CASE STUDY & LIVE STOREFRONT ─── */}
      {activeTab === 'casestudy' && (
        <>
          {/* Quick banner to switch to presentation */}
          <div style={{
            padding: '0.85rem 1.25rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Looking for the Visual Identity System Case Study?
            </span>
            <button
              onClick={() => setActiveTab('visualsystem')}
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              View Visual Identity System →
            </button>
          </div>

          {/* Interactive Website Embed */}
          <div className="content-section">
            <div className="section-label">Live Storefront & Brand Site Preview</div>
            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              background: '#000',
              marginTop: '1rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                padding: '0.65rem 1rem',
                background: 'var(--bg-subtle)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                <span>Chingari Storefront (Live on Vercel)</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href="https://chingari-website.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="back-btn"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem', background: 'rgba(229, 169, 60, 0.15)', color: '#E5A93C', borderColor: 'rgba(229, 169, 60, 0.3)', textDecoration: 'none' }}
                  >
                    Open Live Store (Vercel) ↗
                  </a>
                  <a
                    href="/chingari-site/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="back-btn"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', textDecoration: 'none' }}
                  >
                    Local Standalone ↗
                  </a>
                </div>
              </div>
              <iframe
                src="/chingari-site/index.html"
                title="Chingari Storefront Website"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '540px',
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Brand Manifesto */}
          <div className="content-section">
            <div className="section-label">Brand Manifesto</div>
            <div className="quote-card">
              "We don't sell lighters. Before they became disposable, matchboxes were tiny canvases carrying tigers, gods, dreams, folklore, and bold typography in the palm of your hand. Somewhere along the way, that art disappeared. Chingari exists to bring that feeling back — not as matchboxes, but as collectible pocket art lighters."
            </div>
          </div>

          {/* Visual Identity & Aesthetic */}
          <div className="content-section">
            <div className="section-label">Design Theme & Color Psychology</div>
            <div className="section-body">
              <p>
                The master brand feels like a modern Indian cult label with an old print-memory buried inside it. The aesthetic unifies two worlds under one visual language:
              </p>
            </div>
            <div className="duality-grid" style={{ marginTop: '1.25rem' }}>
              <div className="duality-card">
                <div className="duality-card-title">Aged Memory Base (The Foundation)</div>
                <div className="duality-card-body">
                  Warm, aged sepia, yellowed paper, and faded brown — colors associated with sunlight aging old house walls and vintage matchbox cardboard.
                </div>
              </div>
              <div className="duality-card">
                <div className="duality-card-title">Neon Accents (The Trip / Neo-Noir)</div>
                <div className="duality-card-body">
                  Neon pink and cyan glow used sparingly as visual accents — like looking at an old 1970s photograph lit by a modern neon sign in a rainy alley.
                </div>
              </div>
            </div>
          </div>

          {/* Content Strategy Pillars */}
          <div className="content-section">
            <div className="section-label">Brand & Content Pillars</div>
            <div className="artifact-grid">
              <div className="artifact-card">
                <div>
                  <div className="artifact-icon">PILLAR 01 (40%)</div>
                  <div className="artifact-name">World Building</div>
                  <div className="artifact-type">Old Indian matchbox art, fire mythology, vintage advertisements, and color moodboards. Atmosphere over selling.</div>
                </div>
              </div>
              <div className="artifact-card">
                <div>
                  <div className="artifact-icon">PILLAR 02 (20%)</div>
                  <div className="artifact-name">Product Teases</div>
                  <div className="artifact-type">Macro texture shots, corner silhouettes, open lighter outlines with subtle film burns.</div>
                </div>
              </div>
              <div className="artifact-card">
                <div>
                  <div className="artifact-icon">PILLAR 03 (15%)</div>
                  <div className="artifact-name">Artist Stories</div>
                  <div className="artifact-type">Treating each lighter as a numbered art piece (e.g., Vision No. 01) detailing symbolism & inspiration.</div>
                </div>
              </div>
              <div className="artifact-card">
                <div>
                  <div className="artifact-icon">PILLAR 04 (15%)</div>
                  <div className="artifact-name">Lifestyle & Objects</div>
                  <div className="artifact-type">Framed alongside film cameras, vinyl records, rainy windows, old books, and street photography.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recurring Series */}
          <div className="content-section">
            <div className="section-label">Recurring Brand Archives</div>
            <ul className="clean-list">
              <li><strong>Matchbox Archives:</strong> Curating rare vintage Indian matchbox art with short historical backstories.</li>
              <li><strong>Pocket Gallery:</strong> Close-up visual breakdowns of custom lighter artwork details.</li>
              <li><strong>Fire Studies:</strong> Short visual explorations of color, symbolism, and surreal flame imagery.</li>
              <li><strong>Studio Notes:</strong> Documenting physical prototyping, metal weight selection, and packaging decisions.</li>
            </ul>
          </div>

          {/* Product Positioning */}
          <div className="content-section">
            <div className="section-label">Product Positioning</div>
            <div className="section-body">
              <p>
                Most lighter brands compete strictly on utility. Chingari competes with things people collect — mini art prints, vinyl sleeves, skateboard graphics, and designer toys. The flame is function; the artwork is the product.
              </p>
            </div>
          </div>

          {/* Honest Constraints & What Breaks in Practice */}
          <div className="content-section">
            <div className="section-label">Honest Constraints & The Physical Supply Chain</div>
            <div className="retrospective-card">
              <div className="retrospective-title">
                ⚖️ The Physical Supply Chain vs. Software Fallacy
              </div>
              <div className="retrospective-body">
                Unlike software where margins scale toward 90%+, physical art lighters face manufacturing tolerances, metal casing defects, enamel micro-cracking during flame heating, and strict hazardous shipping regulations for lighter fluid. The brand model only survives by shifting from a commodity utility tool into a numbered collectible drop model (200 units per edition) where customers happily pay a 15x–20x price premium over disposable plastic lighters for the tactile aesthetic.
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2026</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://chingari-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Live Storefront ↗</a>
          <Link to="/chingari/presentation" className="footer-link">Visual System Presentation</Link>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
