import React, { useState, useEffect } from 'react';

const IMAGES = [
  { img: '/backrooms/liminal-pool.jpg', label: 'Pool Chambers' },
  { img: '/backrooms/liminal-subway.jpg', label: 'Metro Station' },
  { img: '/backrooms/liminal-tv.jpg', label: 'Signal Field' }
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [phaseText, setPhaseText] = useState('Loading portfolio...');

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 6) + 3;
        const current = next > 100 ? 100 : next;

        if (current < 35) {
          setActiveImgIdx(0);
          setPhaseText('Gathering projects & case studies...');
        } else if (current < 70) {
          setActiveImgIdx(1);
          setPhaseText('Preparing visual assets...');
        } else if (current < 95) {
          setActiveImgIdx(2);
          setPhaseText('Almost there...');
        } else {
          setActiveImgIdx(2);
          setPhaseText('Ready.');
        }

        return current;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000',
      color: '#E6DFCE',
      fontFamily: 'var(--font-mono, monospace)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      padding: '2rem',
      transition: 'opacity 0.5s ease-out',
      opacity: progress === 100 ? 0 : 1,
      pointerEvents: progress === 100 ? 'none' : 'auto'
    }}>
      {/* Full screen background image transitions */}
      {IMAGES.map((item, idx) => (
        <div
          key={item.label}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${item.img}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: activeImgIdx === idx ? 0.45 : 0,
            transition: 'opacity 0.6s ease-in-out',
            filter: 'contrast(105%)',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Dark Overlay Mask */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 80%)',
        pointerEvents: 'none'
      }} />

      {/* Main Loader Glass Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '440px',
        width: '100%',
        textAlign: 'center',
        background: 'rgba(15, 14, 11, 0.82)',
        border: '1px solid rgba(254, 240, 138, 0.25)',
        borderRadius: '16px',
        padding: '2rem 1.5rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Brand Label */}
        <div style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A19782', marginBottom: '1.25rem' }}>
          UTKARSH GUPTA // PORTFOLIO
        </div>

        {/* Big Counter */}
        <div style={{
          fontSize: '3.8rem',
          fontWeight: 800,
          color: '#FEF08A',
          lineHeight: 1,
          marginBottom: '1rem',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 25px rgba(254, 240, 138, 0.3)'
        }}>
          {progress}%
        </div>

        {/* Progress Bar Track */}
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '1.25rem'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #CA8A04, #FEF08A)',
            transition: 'width 0.08s ease-out'
          }} />
        </div>

        {/* Status Text */}
        <div style={{ fontSize: '0.8rem', color: '#E6DFCE', minHeight: '1.2rem' }}>
          {phaseText}
        </div>
      </div>
    </div>
  );
}
