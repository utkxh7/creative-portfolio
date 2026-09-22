import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LEVELS = [
  {
    id: 'pool',
    name: 'Level 404-A: Sunlit Pool Chambers',
    img: '/backrooms/liminal-pool.jpg'
  },
  {
    id: 'subway',
    name: 'Level 404-B: 3AM Metro Station',
    img: '/backrooms/liminal-subway.jpg'
  },
  {
    id: 'tv',
    name: 'Level 404-C: Signal Field',
    img: '/backrooms/liminal-tv.jpg'
  }
];

export default function NotFound() {
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const navigate = useNavigate();

  // Continuous auto-switch background between the 3 liminal images every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLevelIdx((prev) => (prev + 1) % LEVELS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
      fontFamily: 'Tahoma, "Segoe UI", Geneva, Verdana, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      padding: '1.5rem'
    }}>
      {/* 🌟 FULL SCREEN BACKGROUND LIMINAL IMAGES 🌟 */}
      {LEVELS.map((lvl, idx) => (
        <div
          key={lvl.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${lvl.img}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: activeLevelIdx === idx ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            filter: 'contrast(105%) brightness(85%)',
            zIndex: 1
          }}
        />
      ))}

      {/* Dark Vignette Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 90%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* 🖥️ CENTERED WINDOWS XP DIALOG WINDOW WITH BLURRY EFFECT 🖥️ */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '440px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        background: 'rgba(236, 233, 216, 0.82)',
        backdropFilter: 'blur(16px)',
        border: '3px solid #0055EA'
      }}>
        {/* Windows XP Blue Header Bar */}
        <div style={{
          background: 'linear-gradient(180deg, #0058EE 0%, #3593FF 4%, #288EFF 6%, #0053E5 10%, #0055E8 90%, #003DD7 100%)',
          padding: '0.35rem 0.6rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          color: '#FFF',
          fontWeight: 'bold',
          fontSize: '0.85rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
          letterSpacing: '0.02em',
          userSelect: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem' }}>💻</span>
            <span>Windows XP</span>
          </div>

          {/* Close Button [X] */}
          <button
            onClick={() => navigate('/')}
            title="Close and Return Home"
            style={{
              width: '21px',
              height: '21px',
              background: 'linear-gradient(180deg, #E7664B 0%, #D44227 50%, #B82C12 100%)',
              border: '1px solid #731300',
              borderRadius: '3px',
              color: '#FFF',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Windows XP Dialog Content */}
        <div style={{ padding: '1.5rem 1.25rem', color: '#000' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            {/* Info Icon (i) Bubble */}
            <div style={{
              width: '38px',
              height: '38px',
              minWidth: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1C92FF, #0055EA)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic'
            }}>
              i
            </div>

            <div>
              {/* Task Failed Successfully Header */}
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', marginBottom: '0.4rem' }}>
                Task failed successfully.
              </div>

              {/* 404 Error Message */}
              <div style={{ fontSize: '0.82rem', color: '#333', lineHeight: '1.45' }}>
                Error 404: You have noclipped out of the website bounds into the backrooms.
              </div>
            </div>
          </div>



          {/* OK Action Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '90px',
                padding: '0.4rem 1.2rem',
                background: 'linear-gradient(180deg, #FDFDFD 0%, #ECE9D8 90%, #DFD9C3 100%)',
                border: '1px solid #003C74',
                borderRadius: '3px',
                color: '#000',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: 'inset 0 1px 0 #FFF, 0 1px 2px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
            >
              OK
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
