import React, { useState, useEffect, useRef } from 'react';

export default function EyeWatcher() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center relative to screen
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp movement within -12 to 12 pixels
      const clampedX = Math.max(-14, Math.min(14, deltaX * 16));
      const clampedY = Math.max(-10, Math.min(10, deltaY * 12));

      setMousePos({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="eye-mirror-container" ref={containerRef}>
      <div className="eye-mirror-canvas">
        {/* Dual Eye SVG */}
        <svg width="220" height="100" viewBox="0 0 220 100" fill="none">
          {/* Background aura */}
          <ellipse cx="60" cy="50" rx="45" ry="28" fill="#1A0D0F" stroke="#B5450B" strokeWidth="2" />
          <ellipse cx="160" cy="50" rx="45" ry="28" fill="#1A0D0F" stroke="#B5450B" strokeWidth="2" />

          {/* Left Eye Sclera */}
          <path d="M 15 50 Q 60 15 105 50 Q 60 85 15 50 Z" fill="#E8DFC8" stroke="#D6001C" strokeWidth="1.5" />
          {/* Left Iris & Pupil */}
          <g transform={`translate(${mousePos.x}, ${mousePos.y})`}>
            <circle cx="60" cy="50" r="16" fill="#B5450B" stroke="#E6007E" strokeWidth="2" />
            <circle cx="60" cy="50" r="8" fill="#0D0B0C" />
            <circle cx="56" cy="46" r="3" fill="#FFF" />
          </g>

          {/* Right Eye Sclera */}
          <path d="M 115 50 Q 160 15 205 50 Q 160 85 115 50 Z" fill="#E8DFC8" stroke="#D6001C" strokeWidth="1.5" />
          {/* Right Iris & Pupil */}
          <g transform={`translate(${mousePos.x}, ${mousePos.y})`}>
            <circle cx="160" cy="50" r="16" fill="#B5450B" stroke="#E6007E" strokeWidth="2" />
            <circle cx="160" cy="50" r="8" fill="#0D0B0C" />
            <circle cx="156" cy="46" r="3" fill="#FFF" />
          </g>
        </svg>

        {/* Scanlines overlay inside eye canvas */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(230,0,126,0.1) 50%, transparent 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none'
        }} />
      </div>

      <div className="eye-caption">
        [ eyes_on_you.exe ] — someone is looking back
      </div>
    </div>
  );
}
