import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidekickCaseStudyPresentation from '../components/SidekickCaseStudyPresentation';

export default function SidekickPresentationPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: '#09090b', zIndex: 9999 }}>
      {/* Top Left Floating Exit Button */}
      <div style={{
        position: 'fixed',
        top: '1.25rem',
        left: '1.5rem',
        zIndex: 1000
      }}>
        <button
          onClick={() => navigate('/sidekick')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(17, 17, 22, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#f4f4f5',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.78rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.15s ease'
          }}
        >
          ← Back to Sidekick
        </button>
      </div>

      <SidekickCaseStudyPresentation isEmbedded={false} />
    </div>
  );
}
