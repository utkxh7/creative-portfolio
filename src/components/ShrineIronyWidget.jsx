import React, { useState } from 'react';

export default function ShrineIronyWidget() {
  const [activeDuality, setActiveDuality] = useState(0);

  const dualities = [
    {
      sacred: '🕉️ Temple Gold & Om',
      irony: 'Spray-paint Graffiti on Altar',
      color: '#B8860B',
      note: 'ornate heritage detail colliding with rough grunge'
    },
    {
      sacred: '🌺 Sacred Lotus Shrine',
      irony: '90s CRT Glitch & Stoned Joke',
      color: '#D6001C',
      note: 'sincerity sitting right next to irony'
    },
    {
      sacred: '🪔 Amber Gel-Light Glow',
      irony: 'Security Camera Watching You',
      color: '#E6007E',
      note: 'everything under the sense of being watched'
    }
  ];

  const current = dualities[activeDuality];

  return (
    <div className="shrine-container">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--burnt-orange)' }}>
        [ shrine_and_irony.bmp ] — duality collage
      </div>

      <div className="shrine-grid">
        <div className="shrine-card" style={{ borderColor: current.color }}>
          <div className="shrine-symbol">{current.sacred.split(' ')[0]}</div>
          <div className="shrine-label" style={{ color: current.color }}>
            {current.sacred}
          </div>
          <div className="shrine-sub">sacred / ornate</div>
        </div>

        <div className="shrine-card" style={{ borderColor: 'var(--hot-magenta)' }}>
          <div className="shrine-symbol">⚡</div>
          <div className="shrine-label" style={{ color: 'var(--hot-magenta)' }}>
            {current.irony}
          </div>
          <div className="shrine-sub">mundane / irony</div>
        </div>
      </div>

      <div style={{
        background: 'rgba(13,11,12,0.8)',
        border: '1px inset var(--amber)',
        padding: '8px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--faded-parchment)',
        textAlign: 'center'
      }}>
        "{current.note}"
      </div>

      <button
        className="audio-btn"
        onClick={() => setActiveDuality((prev) => (prev + 1) % dualities.length)}
      >
        CYLE DUALITY MATRIX ({activeDuality + 1}/{dualities.length})
      </button>
    </div>
  );
}
