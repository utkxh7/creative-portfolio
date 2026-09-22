import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChingariBrandSystemPresentation from '../components/ChingariBrandSystemPresentation';

export default function ChingariVisualSystemPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: '#160B21', zIndex: 9999 }}>
      {/* Top Left Floating Exit Button */}
      <div style={{
        position: 'fixed',
        top: '1.25rem',
        left: '1.5rem',
        zIndex: 1000
      }}>
        <button
          onClick={() => navigate('/chingari')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(22, 11, 33, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(246, 238, 221, 0.25)',
            color: '#F6EEDD',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.78rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.15s ease'
          }}
        >
          ← Back to Chingari
        </button>
      </div>

      <ChingariBrandSystemPresentation isEmbedded={false} />
    </div>
  );
}
