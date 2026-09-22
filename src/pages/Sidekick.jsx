import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Sidekick() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title Block */}
      <h1 className="page-title">Sidekick™</h1>
      <p className="page-summary">
        "The internet used to be a place you went with someone. We're bringing that back."
        A real-time co-presence platform pairing two wanderers for low-anxiety, synchronized virtual hangouts — exploring Tokyo 360 backstreets, Smithsonian halls, casual web games, and ambient music together. No webcams, no feeds, purely shared web.
      </p>

      {/* Metadata */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Real-Time Co-Presence App</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">Product Architect & Full-Stack</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">2026</div>
        </div>
        <div>
          <div className="meta-label">Status</div>
          <div className="meta-value">
            <span className="status-pill" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)', borderColor: 'var(--accent-green-border)' }}>
              <span className="status-dot"></span>
              Live Launch-Ready MVP
            </span>
          </div>
        </div>
        <div>
          <div className="meta-label">Tech Stack</div>
          <div className="meta-value">Node.js, Express, Socket.io</div>
        </div>
        <div>
          <div className="meta-label">Live Cloud App</div>
          <div className="meta-value">
            <a href="https://sidekick-app-ge5x.onrender.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 600 }}>
              Launch on Render ↗
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Website Embed */}
      <div className="content-section">
        <div className="section-label">Live Prototype Preview</div>
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-surface)',
          marginTop: '1rem',
          boxShadow: 'var(--card-shadow-hover)'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="live-dot"></span>
              <span>Sidekick Clean Client — Interactive Session</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href="https://sidekick-app-ge5x.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="back-btn"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem', background: 'var(--accent-green-light)', color: 'var(--accent-green)', borderColor: 'var(--accent-green-border)', textDecoration: 'none' }}
              >
                Open Live App (Render) ↗
              </a>
              <a
                href="/sidekick-site/index.html"
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
            src="/sidekick-site/index.html"
            title="Sidekick Official Website"
            loading="lazy"
            style={{
              width: '100%',
              height: '560px',
              border: 'none',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Core Thesis */}
      <div className="content-section">
        <div className="section-label">The Core Thesis</div>
        <div className="section-body">
          <p>
            <strong>The internet transitioned from a shared playground into an isolation chamber.</strong> Early web culture was inherently social — exploring StumbleUpon spirals with friends, hanging out in niche chatrooms, or discovering music together. Modern platforms replaced this with infinite solo feeds designed to extract ad impressions and algorithmic dopamine.
          </p>
          <p>
            Meanwhile, existing digital meetups suffer from severe friction: <strong>video call exhaustion</strong> (the pressure of staring at a webcam on Omegle or Zoom) and <strong>resume-style profile fatigue</strong> (Tinder, Bumble, LinkedIn).
          </p>
          <p>
            Sidekick solves this through <strong>Third-Object Presence</strong>: human connection happens most naturally when two people aren't staring at each other, but rather looking at the same thing together.
          </p>
        </div>
        <div className="quote-card">
          "The internet used to be a place you went with someone. You don't need a camera or a long bio — just an anthem, five quick vibe tags, and an interesting corner of the web to explore together."
        </div>
      </div>

      {/* The 3-Step Low-Friction Onboarding */}
      <div className="content-section">
        <div className="section-label">Product Architecture: 3-Step Experience</div>
        <div className="artifact-grid">
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">STEP 01</div>
              <div className="artifact-name">Calibrate Vibe</div>
              <div className="artifact-type">
                Player 1 setup with handle, anthem picker (quick-select chips), and a 5-question multi-choice vibe quiz (Mood, Sanctuary, Era, Hangout Style, Internet Corner). No sign-up friction.
              </div>
            </div>
          </div>

          <div className="artifact-card">
            <div>
              <div className="artifact-icon">STEP 02</div>
              <div className="artifact-name">Live Matchmaking Ticker</div>
              <div className="artifact-type">
                Real-time WebSocket queue evaluates vibe tag overlap every 1.5s. A monospace ticker reel decelerates and locks in, revealing partner synergy alignment (e.g. 96% Match).
              </div>
            </div>
          </div>

          <div className="artifact-card">
            <div>
              <div className="artifact-icon">STEP 03</div>
              <div className="artifact-name">Shared Exploration</div>
              <div className="artifact-type">
                Synchronized destinations: 360 Street View of Tokyo neon alleys, Smithsonian virtual museum halls, casual multiplayer games (Skribbl.io, Lichess), and lofi co-listening with persistent chat.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="content-section">
        <div className="section-label">Market Positioning & Paradigm Shift</div>
        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px'
          }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>PLATFORM</th>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>MEDIUM</th>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>ANXIETY LEVEL</th>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>INTENT & DYNAMICS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Omegle / Chatroulette</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Forced Webcam Video</td>
                <td style={{ padding: '0.85rem 1rem', color: '#EF4444', fontWeight: '600' }}>High (Predation / Creeps)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Instant face-to-face inspection. Zero shared focus. 90% instant skip rate.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Dating Apps (Tinder/Bumble)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Static Bios & Photos</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-amber)', fontWeight: '600' }}>Moderate (Appearance Pressure)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Asynchronous resume swiping. High ghosting rate, delayed gratification.</td>
              </tr>
              <tr>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: 'var(--accent-blue)' }}>Sidekick™</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', fontWeight: '600' }}>Shared Web Viewports + Text</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-green)', fontWeight: '600' }}>Zero (No Camera, 1-Click Exit)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Real-time co-presence. Attention focused on an activity or destination, not self-conscious performance.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety & Trust Architecture */}
      <div className="content-section">
        <div className="section-label">Zero-Friction Safety Architecture</div>
        <div className="duality-grid">
          <div className="duality-card">
            <div className="duality-card-title">1-Click Instant Report & Block</div>
            <div className="duality-card-body">
              No multi-step confirmation dialogues or tedious dropdown menus. Clicking Report/Block immediately terminates the room, adds the user ID to local storage blocklists, and logs the report to telemetry.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Server-Side Keyword Moderation</div>
            <div className="duality-card-body">
              Real-time regex filters strip slurs, aggressive solicitation, and phone numbers before broadcasting to Socket.io rooms, ensuring a comfortable, creative hangout space.
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Specs */}
      <div className="content-section">
        <div className="section-label">Engineering Specifications</div>
        <ul className="clean-list">
          <li><strong>Real-Time Matchmaker:</strong> Node.js + Express + Socket.io queue pairing wanderers in private rooms (`room:SK-XXXX`) based on tag overlap every 1,500ms.</li>
          <li><strong>Zero Latency Telemetry:</strong> Live session broadcast (`stats:update`) shows real-time online wanderers count. REST endpoints provide `/founder-stats` dashboard.</li>
          <li><strong>Post-Hangout Feedback Loop:</strong> Simple 3-tier survey ("Did that feel like hanging out? Yes / Ehh / No") tracking qualitative platform sentiment.</li>
          <li><strong>Responsive Design:</strong> Hand-crafted CSS Grid & Flexbox system responsive from 320px mobile screens up to 4K monitors, with dark mode aesthetics (`#09090b` zinc background).</li>
        </ul>
      </div>

      {/* Product Constraints & Hard Follow-up */}
      <div className="content-section">
        <div className="section-label">Honest Constraints & What Broke in Practice</div>
        <div className="retrospective-card">
          <div className="retrospective-title">
            ⚖️ The Synchronous Liquidity Trap & The iFrame Wall
          </div>
          <div className="retrospective-body">
            Real-time stranger pairing requires <em>synchronous liquidity</em>: having concurrent wanderers ready to chat in the exact same 30-second window. Without thousands of daily active users, public matching queues encounter timeout fallbacks—revealing that the primary growth vector must be private "Hang with a Friend" invite links rather than pure stranger matching. Additionally, modern security headers (<code>X-Frame-Options: DENY</code>) block arbitrary web embeds, demanding hand-curated open destination hubs (360 Street View, Smithsonian, Lichess) rather than generic open-web browsing.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2026</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://sidekick-app-ge5x.onrender.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Live App (Render) ↗</a>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
