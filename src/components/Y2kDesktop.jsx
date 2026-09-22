import React, { useState, useEffect } from 'react';
import EyeWatcher from './EyeWatcher';
import RetroAudioPlayer from './RetroAudioPlayer';
import RetroGuestbook from './RetroGuestbook';
import ShrineIronyWidget from './ShrineIronyWidget';

export default function Y2kDesktop() {
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [grainEnabled, setGrainEnabled] = useState(true);
  const [timeStr, setTimeStr] = useState('');
  const [startOpen, setStartOpen] = useState(false);

  // Window state: { id, title, icon, x, y, width, zIndex, isOpen, isMinimized }
  const [windows, setWindows] = useState([
    {
      id: 'manifesto',
      title: 'welcome_manifesto.txt',
      icon: '📜',
      x: 120,
      y: 40,
      width: 440,
      zIndex: 30,
      isOpen: true,
      isMinimized: false
    },
    {
      id: 'eyes',
      title: 'eyes_on_you.exe',
      icon: '👁️',
      x: 580,
      y: 40,
      width: 320,
      zIndex: 25,
      isOpen: true,
      isMinimized: false
    },
    {
      id: 'radio',
      title: 'radio_soundscape.player',
      icon: '📻',
      x: 580,
      y: 330,
      width: 320,
      zIndex: 20,
      isOpen: true,
      isMinimized: false
    },
    {
      id: 'guestbook',
      title: 'guestbook.cgi',
      icon: '✍️',
      x: 120,
      y: 360,
      width: 440,
      zIndex: 15,
      isOpen: false,
      isMinimized: false
    },
    {
      id: 'shrine',
      title: 'shrine_and_irony.bmp',
      icon: '🏛️',
      x: 260,
      y: 120,
      width: 380,
      zIndex: 10,
      isOpen: false,
      isMinimized: false
    }
  ]);

  const [activeWindowId, setActiveWindowId] = useState('manifesto');
  const [dragging, setDragging] = useState(null); // { id, startX, startY, winX, winY }

  // Clock updating
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Window Focus
  const focusWindow = (id) => {
    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 10);
      return prev.map(w => {
        if (w.id === id) {
          return { ...w, zIndex: maxZ + 1, isMinimized: false, isOpen: true };
        }
        return w;
      });
    });
  };

  const toggleWindow = (id) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (!w.isOpen) return { ...w, isOpen: true, isMinimized: false };
        if (w.isMinimized) return { ...w, isMinimized: false };
        return { ...w, isOpen: false };
      }
      return w;
    }));
    focusWindow(id);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  // Drag handlers
  const handleMouseDownHeader = (e, winId) => {
    focusWindow(winId);
    const win = windows.find(w => w.id === winId);
    if (!win) return;
    setDragging({
      id: winId,
      startX: e.clientX,
      startY: e.clientY,
      winX: win.x,
      winY: win.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;
      setWindows(prev => prev.map(w => {
        if (w.id === dragging.id) {
          return {
            ...w,
            x: Math.max(10, dragging.winX + dx),
            y: Math.max(10, dragging.winY + dy)
          };
        }
        return w;
      }));
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="y2k-viewport">
      {/* CRT Scanline Overlay */}
      {crtEnabled && <div className="crt-overlay" />}
      {/* Film Grain Overlay */}
      {grainEnabled && <div className="grain-overlay" />}

      {/* Top Header Marquee Bar */}
      <header className="y2k-topbar">
        <div className="topbar-brand">
          <span style={{ color: 'var(--signal-red)' }}>●</span> KARSH_NET <span>v2.000</span>
        </div>

        <div className="topbar-marquee">
          <div className="marquee-content">
            <span className="highlight">KARSH — PERSONAL DESIGN WORLD</span> &nbsp;///&nbsp;
            <span className="amber">WARM MAXIMALISM BUILT ON DUALITY</span> &nbsp;///&nbsp;
            ORNATE HERITAGE COLLIDING WITH ROUGH GRUNGE &nbsp;///&nbsp;
            <span className="highlight">SINCERITY NEXT TO IRONY</span> &nbsp;///&nbsp;
            EVERYTHING UNDER THE SENSE OF BEING WATCHED &nbsp;///&nbsp;
            <span className="amber">VISITOR #004921</span> &nbsp;///&nbsp;
            gotta go &nbsp;///&nbsp; eyes on you &nbsp;///&nbsp; tuesday
          </div>
        </div>

        <div className="topbar-status">
          <span>HITS:</span>
          <div className="visitor-counter">004921</div>
        </div>
      </header>

      {/* Desktop Workspace */}
      <main className="desktop-workspace">
        {/* Desktop Icons */}
        <div className="desktop-icons">
          {windows.map(win => (
            <button
              key={win.id}
              className="retro-icon-btn"
              onClick={() => toggleWindow(win.id)}
            >
              <div className="retro-icon-box">{win.icon}</div>
              <span>{win.title.split('.')[0]}</span>
            </button>
          ))}
        </div>

        {/* Floating Windows */}
        {windows.map(win => {
          if (!win.isOpen || win.isMinimized) return null;
          return (
            <div
              key={win.id}
              className={`y2k-window ${activeWindowId === win.id ? 'active-window' : ''}`}
              style={{
                left: `${win.x}px`,
                top: `${win.y}px`,
                width: `${win.width}px`,
                zIndex: win.zIndex
              }}
              onClick={() => focusWindow(win.id)}
            >
              {/* Window Header / Drag Bar */}
              <div
                className="window-header"
                onMouseDown={(e) => handleMouseDownHeader(e, win.id)}
              >
                <div className="window-title-area">
                  <span>{win.icon}</span>
                  <span>[ {win.title} ]</span>
                </div>
                <div className="window-controls">
                  <button className="win-btn" onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}>_</button>
                  <button className="win-btn" onClick={(e) => { e.stopPropagation(); focusWindow(win.id); }}>□</button>
                  <button className="win-btn close-btn" onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}>X</button>
                </div>
              </div>

              {/* Window Body */}
              <div className="window-body">
                {win.id === 'manifesto' && (
                  <div className="manifesto-container">
                    <div className="manifesto-tag">the one-line version:</div>
                    <div className="manifesto-quote">
                      "Warm, saturated maximalism built on duality — ornate heritage detail colliding with rough grunge, sincerity sitting next to irony, everything under the sense of being watched."
                    </div>

                    <div className="manifesto-tag" style={{ color: 'var(--amber)', marginTop: '8px' }}>
                      the core feeling:
                    </div>
                    <ul className="feeling-list">
                      <li><strong>Fragmented but intact</strong> — split, doubled, layered</li>
                      <li><strong>Watched / watching</strong> — eyes, mirrors, reflections</li>
                      <li><strong>Sincere and self-aware at once</strong> — shrine next to a joke</li>
                      <li><strong>Dense, not sparse</strong> — full frame, textures overlapping</li>
                      <li><strong>Warm even in the dark</strong> — night shots glow amber, pink, red</li>
                    </ul>
                  </div>
                )}

                {win.id === 'eyes' && <EyeWatcher />}
                {win.id === 'radio' && <RetroAudioPlayer />}
                {win.id === 'guestbook' && <RetroGuestbook />}
                {win.id === 'shrine' && <ShrineIronyWidget />}
              </div>

              {/* Window Statusbar */}
              <div className="window-statusbar">
                <span>STATUS: OK</span>
                <span>ENC: UTF-8</span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Start Menu Modal */}
      {startOpen && (
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '8px',
          width: '220px',
          background: 'var(--warm-charcoal)',
          border: '2px outset var(--deep-gold)',
          zIndex: 1000,
          boxShadow: '4px 4px 14px rgba(0,0,0,0.8)'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, var(--signal-red), var(--amber))',
            color: '#FFF',
            padding: '6px 10px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 'bold',
            fontSize: '0.8rem'
          }}>
            KARSH OS v2.0
          </div>
          <div style={{ padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {windows.map(w => (
              <button
                key={w.id}
                className="taskbar-btn"
                style={{ width: '100%', textAlign: 'left', padding: '6px 8px' }}
                onClick={() => { toggleWindow(w.id); setStartOpen(false); }}
              >
                {w.icon} {w.title}
              </button>
            ))}
            <div style={{ height: '1px', background: 'var(--amber)', margin: '4px 0' }} />
            <button
              className="taskbar-btn"
              style={{ width: '100%', textAlign: 'left', padding: '6px 8px', color: 'var(--hot-magenta)' }}
              onClick={() => { setCrtEnabled(!crtEnabled); setStartOpen(false); }}
            >
              📺 TOGGLE CRT [{crtEnabled ? 'ON' : 'OFF'}]
            </button>
            <button
              className="taskbar-btn"
              style={{ width: '100%', textAlign: 'left', padding: '6px 8px', color: 'var(--burnt-orange)' }}
              onClick={() => { setGrainEnabled(!grainEnabled); setStartOpen(false); }}
            >
              🎞️ TOGGLE GRAIN [{grainEnabled ? 'ON' : 'OFF'}]
            </button>
          </div>
        </div>
      )}

      {/* Bottom Taskbar */}
      <footer className="y2k-taskbar">
        <button
          className="taskbar-start"
          onClick={() => setStartOpen(!startOpen)}
        >
          👁️ START
        </button>

        <div className="taskbar-items">
          {windows.map(w => (
            w.isOpen ? (
              <button
                key={w.id}
                className={`taskbar-btn ${activeWindowId === w.id && !w.isMinimized ? 'active' : ''}`}
                onClick={() => {
                  if (w.isMinimized) focusWindow(w.id);
                  else if (activeWindowId === w.id) minimizeWindow(w.id);
                  else focusWindow(w.id);
                }}
              >
                {w.icon} {w.title.split('.')[0]}
              </button>
            ) : null
          ))}
        </div>

        <div className="taskbar-tray">
          <button
            className={`toggle-chip ${crtEnabled ? 'active' : ''}`}
            onClick={() => setCrtEnabled(!crtEnabled)}
            title="Toggle CRT Scanlines"
          >
            CRT
          </button>
          <button
            className={`toggle-chip ${grainEnabled ? 'active' : ''}`}
            onClick={() => setGrainEnabled(!grainEnabled)}
            title="Toggle Film Grain"
          >
            GRAIN
          </button>
          <span>{timeStr}</span>
        </div>
      </footer>
    </div>
  );
}
