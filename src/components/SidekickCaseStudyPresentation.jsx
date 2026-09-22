import React, { useState, useEffect } from 'react';
import '../styles/sidekickCaseStudy.css';

// Asset paths
const v1QuestionsImg = '/sidekick-assets/v1_questions.png';
const v1VibeQuizImg = '/sidekick-assets/v1_vibe_quiz.png';
const v1LobbyMatchingImg = '/sidekick-assets/v1_lobby_matching.png';

export default function SidekickCaseStudyPresentation({ isEmbedded = false, onToggleFullscreen = null }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visualEra, setVisualEra] = useState('pixelstars'); // 'pixelstars' | 'y2k'
  const totalSlides = 9;

  const scrollToSlide = (index) => {
    const nextIdx = Math.max(0, Math.min(totalSlides - 1, index));
    const el = document.getElementById(`sk-slide-${nextIdx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSlide(nextIdx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          scrollToSlide(activeSlide + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          scrollToSlide(activeSlide - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  return (
    <div
      className="sk-deck"
      style={{
        height: '100%',
        maxHeight: isEmbedded ? '88vh' : '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        position: 'relative'
      }}
      onScroll={(e) => {
        const target = e.currentTarget;
        const scrollTop = target.scrollTop;
        const pageH = target.clientHeight || 1;
        const idx = Math.round(scrollTop / pageH);
        setActiveSlide(Math.min(idx, totalSlides - 1));
      }}
    >
      {/* Floating Bottom Control Bar */}
      <div className="sk-deck-pill" style={{ position: isEmbedded ? 'absolute' : 'fixed' }}>
        <button
          onClick={() => scrollToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          title="Previous Chapter"
        >
          ←
        </button>

        <span style={{ minWidth: '95px', textAlign: 'center', letterSpacing: '0.08em' }}>
          CH. {String(activeSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>

        <button
          onClick={() => scrollToSlide(activeSlide + 1)}
          disabled={activeSlide === totalSlides - 1}
          title="Next Chapter"
        >
          →
        </button>

        {onToggleFullscreen && (
          <>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 4px' }} />
            <button onClick={onToggleFullscreen} style={{ fontSize: '0.74rem' }}>
              {isEmbedded ? '⛶ Fullscreen' : '✕ Exit'}
            </button>
          </>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 01: INCEPTION & THE "SIDEQUEST" ITCH
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-0" className="sk-slide" style={{ scrollSnapAlign: 'start', justifyContent: 'space-between' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sk-emerald)' }}></span>
            <span>SIDEKICK™ · 0-TO-1 PRODUCT & SYSTEMS JOURNEY</span>
          </div>
          <div className="sk-slide-category">CHAPTER ONE : INCEPTION</div>
        </div>

        <div className="sk-grid-2" style={{ margin: 'auto 0' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="sk-ambient-badge">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sk-emerald)' }} />
                1 wanderer online · live frequency
              </span>
            </div>

            <div className="sk-logo-cyberwave" style={{ marginBottom: '1.25rem' }}>
              SIDEKICK
            </div>

            <p className="sk-serif-lead">
              "Why must everything be a main quest? Sidequests are where the magic happens."
            </p>

            <p className="sk-body-text">
              The idea started with an obsession over a single word: <strong>sidequesting</strong>. In video games, main quests represent adult life—performance anxiety, optimization, and metrics. Sidequests are low-stakes, serendipitous detours done purely for curiosity. Sidekick set out to build a platform around that feeling.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="sk-card sk-card-accent">
              <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.72rem', color: 'var(--sk-emerald)', textTransform: 'uppercase' }}>
                CORE PREMISE
              </span>
              <div className="sk-card-title">The Antidote to Performance Anxiety</div>
              <p className="sk-card-body">
                Modern networking and social apps are high-pressure main quests: curate a personal brand, craft a clever bio, perform for an algorithm. Sidekick is an intentional sidequest: two strangers dropping into a shared corner of the web with zero expectations.
              </p>
            </div>

            <div className="sk-card">
              <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.72rem', color: 'var(--sk-violet)', textTransform: 'uppercase' }}>
                SYSTEM STATE
              </span>
              <div className="sk-card-title">Real-Time Co-Presence Engine</div>
              <p className="sk-card-body">
                Built on Node.js and Socket.io with synchronized client state engines, in-memory matchmaking queues, and pre-broadcast safety filters.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--sk-border)',
          paddingTop: '1.25rem',
          fontFamily: 'var(--sk-font-mono)',
          fontSize: '0.74rem',
          color: 'var(--sk-text-muted)'
        }}>
          <span>PRODUCT ARTIFACT : 01 / 09</span>
          <span>DISCIPLINE : FULL-STACK ARCHITECTURE & PRODUCT DESIGN</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 02: THE FAILED IRL ATTEMPT & THE MARKET WALL
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-1" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">02 / THE IRL EXPERIMENT & THE MARKET WALL</div>
          <div className="sk-slide-category">RESEARCH & PIVOT</div>
        </div>

        <div style={{ maxWidth: '900px', marginBottom: '2.5rem' }}>
          <h2 className="sk-title-large">
            The Rock-Collecting Trap & The Limits of Geography.
          </h2>
          <p className="sk-serif-lead">
            The first instinct was real-world missions. It felt like an emotion, but not a software platform.
          </p>
        </div>

        <div className="sk-grid-3">
          <div className="sk-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-amber)', marginBottom: '0.6rem' }}>
              01 · THE NOSTALGIA TRAP
            </div>
            <h3 className="sk-card-title">Pocket Missions & Rocks</h3>
            <p className="sk-card-body">
              The earliest concept ("Kickbaby") focused on permission to be a kid again—IRL missions like collecting strange rocks, leaving notes on park benches, and physical scrapbooks. But scaling physical kits and logistics was clunky. It was a <em>feeling</em>, not yet a product.
            </p>
          </div>

          <div className="sk-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-violet)', marginBottom: '0.6rem' }}>
              02 · MARKET RESEARCH
            </div>
            <h3 className="sk-card-title">Studying MigoMap & Timeleft</h3>
            <p className="sk-card-body">
              Deep research into stranger-matching platforms: <strong>Timeleft</strong> (dinner tables with strangers via personality algorithms) and <strong>MigoMap</strong> (IRL location-based serendipity). People clearly hungered for connection, but physical meetups created severe friction.
            </p>
          </div>

          <div className="sk-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-red)', marginBottom: '0.6rem' }}>
              03 · THE PHYSICAL WALL
            </div>
            <h3 className="sk-card-title">The Logistics Nightmare</h3>
            <p className="sk-card-body">
              Physical city matching required heavy coordination: no-shows, traffic, scheduling, public safety liabilities, and geographic fragmentation. I put the project down for weeks to let the problem breathe.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 03: THE CYBERSPACE PIVOT
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-2" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">03 / THE CYBERSPACE PIVOT & CORE THESIS</div>
          <div className="sk-slide-category">PRODUCT THESIS</div>
        </div>

        <div style={{ maxWidth: '960px', marginBottom: '2.5rem' }}>
          <h2 className="sk-title-large">
            "The internet used to be a place you went with someone."
          </h2>
          <p className="sk-serif-lead" style={{ color: 'var(--sk-emerald)' }}>
            Now it's a feed you scroll alone.
          </p>
        </div>

        <div className="sk-grid-2">
          <div className="sk-card" style={{ padding: '2rem' }}>
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-emerald)', marginBottom: '0.75rem' }}>
              THE CORE REVELATION
            </div>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--sk-text-primary)', fontStyle: 'italic', margin: 0 }}>
              "AIM windows open at 11:00 PM. Two people on a call while co-browsing weird corners of the web. Chatrooms where an inside joke formed in real time. None of that was efficient. All of it was <strong>together</strong>."
            </p>
            <p className="sk-body-text" style={{ marginTop: '1.25rem' }}>
              Modern platforms optimized for solitary consumption. The pivot was clear: don't force people onto uncomfortable physical blind dates. Bring back the romantic, low-stakes magic of exploring cyberspace together. If they vibe and choose to meet in IRL later, that's their call.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="sk-card" style={{ borderLeft: '3px solid var(--sk-emerald)' }}>
              <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.85rem', color: 'var(--sk-emerald)' }}>
                FILTER 01 · RITUAL, NOT FEED
              </strong>
              <p style={{ fontSize: '0.86rem', margin: '0.35rem 0 0 0', opacity: 0.85 }}>
                Does this make sense if opened once a week, not once an hour? No infinite scroll, no unread notification badges.
              </p>
            </div>

            <div className="sk-card" style={{ borderLeft: '3px solid var(--sk-violet)' }}>
              <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.85rem', color: 'var(--sk-violet)' }}>
                FILTER 02 · OLD WEB, NOT SURVEILLANCE
              </strong>
              <p style={{ fontSize: '0.86rem', margin: '0.35rem 0 0 0', opacity: 0.85 }}>
                Two wanderers looking at something interesting side by side—exploring 360 Street View alleys, playing retro games, or listening to quiet radio.
              </p>
            </div>

            <div className="sk-card" style={{ borderLeft: '3px solid var(--sk-amber)' }}>
              <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.85rem', color: 'var(--sk-amber)' }}>
                FILTER 03 · THE TOGETHERNESS QUESTION
              </strong>
              <p style={{ fontSize: '0.86rem', margin: '0.35rem 0 0 0', opacity: 0.85 }}>
                The only metric that matters: <em>"Did that feel like hanging out, or like two tabs open near each other?"</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 04: THE VISUAL IDENTITY & CYBERWAVE TYPOGRAPHY
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-3" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">04 / VISUAL IDENTITY & CYBERWAVE TYPOGRAPHY</div>
          <div className="sk-slide-category">DESIGN EVOLUTION</div>
        </div>

        <div className="sk-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-violet)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              DESIGN ARCHAEOLOGY
            </span>
            <h2 className="sk-title-large" style={{ margin: '0.5rem 0 1rem 0' }}>
              From Pixel Stars to Cyberwave Typography.
            </h2>
            <p className="sk-body-text" style={{ marginBottom: '1.25rem' }}>
              The initial visual prototype began with animated pixel stars constantly drifting across the background—a raw, nostalgic impulse for 90s net spaces. As the architecture matured, the identity evolved into a sharp, restrained <strong>subtle Y2K / futuristic design system</strong>.
            </p>

            <div style={{
              padding: '1rem 1.25rem',
              background: 'rgba(168, 85, 247, 0.08)',
              borderLeft: '3px solid var(--sk-violet)',
              borderRadius: '0 8px 8px 0',
              marginBottom: '1.25rem'
            }}>
              <p style={{
                fontFamily: 'var(--sk-font-mono)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--sk-text-primary)',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "The font you see in Sidekick's logo started from the place where Among Us and other common chatbox-based games have. I searched for that font and reached Cyberwave. The initial website had pixel stars in the background constantly moving because that was the whole idea I was getting... now I am moving this into a very subtle Y2K / futuristic design system."
              </p>
              <div style={{ marginTop: '0.5rem', fontFamily: 'var(--sk-font-mono)', fontSize: '0.72rem', color: 'var(--sk-violet)', letterSpacing: '0.08em' }}>
                — UTKARSH GUPTA · FOUNDER'S LOG
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="sk-card" style={{ padding: '1.15rem' }}>
                <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.82rem', color: 'var(--sk-violet)' }}>
                  Typographic Lineage: Among Us & Chatbox Games
                </strong>
                <p style={{ fontSize: '0.86rem', margin: '0.25rem 0 0 0', opacity: 0.85 }}>
                  Hunting for the visual soul of multiplayer lobby culture. Wide, punchy, retro-futurist letterforms that feel like a secret midnight transmission rather than a corporate SaaS tool.
                </p>
              </div>

              <div className="sk-card" style={{ padding: '1.15rem' }}>
                <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.82rem', color: 'var(--sk-emerald)' }}>
                  The Pivot: Subtle Y2K Cyber-Restraint
                </strong>
                <p style={{ fontSize: '0.86rem', margin: '0.25rem 0 0 0', opacity: 0.85 }}>
                  Retaining the playful cyber energy while shedding kitsch. Grounded in obsidian black (`#09090B`), clean 1px structural borders, phosphor green status indicators, and monospace telemetry.
                </p>
              </div>
            </div>
          </div>

          <div className="sk-specimen-box">
            {/* Interactive Era Toggle */}
            <div style={{ display: 'inline-flex', gap: '0.4rem', background: '#09090b', padding: '0.3rem', borderRadius: '9999px', border: '1px solid var(--sk-border)', marginBottom: '1.75rem', position: 'relative', zIndex: 3 }}>
              <button
                type="button"
                onClick={() => setVisualEra('pixelstars')}
                style={{
                  fontFamily: 'var(--sk-font-mono)',
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: visualEra === 'pixelstars' ? '1px solid var(--sk-violet)' : '1px solid transparent',
                  background: visualEra === 'pixelstars' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                  color: visualEra === 'pixelstars' ? '#d8b4fe' : 'var(--sk-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontWeight: visualEra === 'pixelstars' ? 600 : 400
                }}
              >
                ✨ V1: Moving Pixel Stars
              </button>
              <button
                type="button"
                onClick={() => setVisualEra('y2k')}
                style={{
                  fontFamily: 'var(--sk-font-mono)',
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: visualEra === 'y2k' ? '1px solid var(--sk-emerald)' : '1px solid transparent',
                  background: visualEra === 'y2k' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: visualEra === 'y2k' ? '#6ee7b7' : 'var(--sk-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontWeight: visualEra === 'y2k' ? 600 : 400
                }}
              >
                ⚡ V2: Subtle Y2K Futuristic
              </button>
            </div>

            {/* Dynamic Background Atmosphere */}
            {visualEra === 'pixelstars' && (
              <>
                <div className="sk-pixel-stars-layer" />
                <div className="sk-pixel-stars-layer-fast" />
              </>
            )}
            {visualEra === 'y2k' && (
              <div className="sk-grid-scanline-layer" />
            )}

            {/* Wordmark Specimen in Cyberwave Font */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.7rem', color: 'var(--sk-text-muted)', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
                {visualEra === 'pixelstars' ? 'INITIAL CONCEPT · CONSTANT DRIFTING STARS' : 'OFFICIAL EVOLVED SYSTEM · CYBERWAVE WORDMARK'}
              </div>

              <div
                className="sk-logo-cyberwave"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.6rem)',
                  marginBottom: '1.5rem',
                  textShadow: visualEra === 'pixelstars'
                    ? '0 0 25px rgba(168, 85, 247, 0.6), 0 0 50px rgba(56, 189, 248, 0.3)'
                    : '0 0 20px rgba(16, 185, 129, 0.4)'
                }}
              >
                SIDEKICK
              </div>

              <div style={{
                display: 'inline-flex',
                gap: '1rem',
                background: 'rgba(9, 9, 11, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid var(--sk-border-strong)',
                fontFamily: 'var(--sk-font-mono)',
                fontSize: '0.74rem',
                color: 'var(--sk-text-muted)',
                marginBottom: '1rem'
              }}>
                <span>FONT: CYBERWAVE REGULAR</span>
                <span style={{ color: visualEra === 'pixelstars' ? 'var(--sk-violet)' : 'var(--sk-emerald)' }}>
                  {visualEra === 'pixelstars' ? 'ATMOSPHERE: 90S NET STARS' : 'SYSTEM: RESTRAINED Y2K'}
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--sk-font-mono)',
                fontSize: '0.72rem',
                color: 'var(--sk-text-secondary)',
                opacity: 0.8
              }}>
                {visualEra === 'pixelstars'
                  ? 'Active background: animated parallax pixel stars drifting across viewport'
                  : 'Active background: 1px obsidian grid with high-legibility telemetry'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 05: V1 PROTOTYPE · VIBE CALIBRATION ENGINE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-4" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">05 / V1 PROTOTYPE · VIBE CALIBRATION ENGINE</div>
          <div className="sk-slide-category">AUTHENTIC ARTIFACTS</div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 className="sk-title-large">The Original Interface Deconstructed</h2>
          <p className="sk-serif-lead">
            Historical screenshots from the initial prototype build.
          </p>
        </div>

        <div className="sk-grid-3">
          {/* Frame 1: Lobby & Matching */}
          <div className="sk-screen-frame">
            <div className="sk-screen-bar">
              <span>01 · THE LOBBY & PLAYER CARD</span>
              <span style={{ color: 'var(--sk-emerald)' }}>AUTHENTIC V1</span>
            </div>
            <img src={v1LobbyMatchingImg} alt="Sidekick Original Lobby & Matching Screen" className="sk-screen-img" />
            <div style={{ padding: '1rem', background: '#111116', fontSize: '0.82rem', color: 'var(--sk-text-secondary)', lineHeight: 1.5 }}>
              <strong>The Terminal Matchmaker:</strong> Handle selection with curated song anthem chips (*Space Song*, *Nightcall*, *Blue Monday*) paired with a real-time frequency scanner.
            </div>
          </div>

          {/* Frame 2: 5-Question Vibe Quiz */}
          <div className="sk-screen-frame">
            <div className="sk-screen-bar">
              <span>02 · VIBE CALIBRATION QUIZ</span>
              <span style={{ color: 'var(--sk-violet)' }}>5 DIMENSIONS</span>
            </div>
            <img src={v1VibeQuizImg} alt="Sidekick Vibe Calibration Quiz" className="sk-screen-img" />
            <div style={{ padding: '1rem', background: '#111116', fontSize: '0.82rem', color: 'var(--sk-text-secondary)', lineHeight: 1.5 }}>
              <strong>Calibrating Frequency:</strong> Replaced boring bios with mood, era (90s, Y2K), place at 2am (empty arcade, library of forgotten books), and internet corner (Street View spirals).
            </div>
          </div>

          {/* Frame 3: Social Battery Questions */}
          <div className="sk-screen-frame">
            <div className="sk-screen-bar">
              <span>03 · SOCIAL BATTERY CALIBRATION</span>
              <span style={{ color: 'var(--sk-amber)' }}>LOW FRICTION</span>
            </div>
            <img src={v1QuestionsImg} alt="Sidekick A Few Quick Questions Screen" className="sk-screen-img" />
            <div style={{ padding: '1rem', background: '#111116', fontSize: '0.82rem', color: 'var(--sk-text-secondary)', lineHeight: 1.5 }}>
              <strong>Honest Social Battery:</strong> Asking plain questions upfront: *"How much do you want to talk?"* (Mostly chatting, or just doing something side by side in quiet companionship).
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 06: THE KILL LIST · RADICAL SUBTRACTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-5" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">06 / THE KILL LIST · RADICAL SUBTRACTION</div>
          <div className="sk-slide-category">PRODUCT CRAFT</div>
        </div>

        <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
          <h2 className="sk-title-large">The Discipline of What We Purged.</h2>
          <p className="sk-serif-lead" style={{ color: 'var(--sk-red)' }}>
            Great product architecture is defined by what you refuse to build.
          </p>
        </div>

        <div className="sk-grid-2">
          <div className="sk-kill-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.75rem', color: 'var(--sk-red)', marginBottom: '0.4rem' }}>
              ❌ PURGED FROM THE PRODUCT
            </div>
            <div className="sk-card-title" style={{ color: 'var(--sk-red)' }}>Webcams & Voice Channels</div>
            <p className="sk-card-body">
              <strong>The Rationale:</strong> Video calls trigger paralyzing appearance anxiety and zoom fatigue. Requiring cameras turns hangouts into formal meetings. Text-only creates psychological safety and allows slow, ambient responses.
            </p>
          </div>

          <div className="sk-keep-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.75rem', color: 'var(--sk-emerald)', marginBottom: '0.4rem' }}>
              ✓ PRESERVED INSTEAD
            </div>
            <div className="sk-card-title" style={{ color: 'var(--sk-emerald)' }}>Persistent Split-Screen Chat</div>
            <p className="sk-card-body">
              A quiet, non-intrusive text terminal that floats seamlessly while exploring street view destinations or playing browser co-op games together.
            </p>
          </div>

          <div className="sk-kill-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.75rem', color: 'var(--sk-red)', marginBottom: '0.4rem' }}>
              ❌ PURGED FROM THE PRODUCT
            </div>
            <div className="sk-card-title" style={{ color: 'var(--sk-red)' }}>The Algorithmic Social Feed</div>
            <p className="sk-card-body">
              <strong>The Rationale:</strong> Feeds encourage passive zombie scrolling and lonely consumption. Sidekick strictly provides live destinations (Tokyo 360, Smithsonian, retro games) designed for co-presence.
            </p>
          </div>

          <div className="sk-keep-card">
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.75rem', color: 'var(--sk-emerald)', marginBottom: '0.4rem' }}>
              ✓ PRESERVED INSTEAD
            </div>
            <div className="sk-card-title" style={{ color: 'var(--sk-emerald)' }}>Curated Co-op Destinations</div>
            <p className="sk-card-body">
              Hand-curated portals where two people have an active shared goal: wandering an abandoned mall, playing quick chess, or listening to lo-fi streams.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 07: THE DINO CO-OP STAGE & SYSTEM ARCHITECTURE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-6" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">07 / INTERACTIVE RUNNER & REAL-TIME STATE ENGINE</div>
          <div className="sk-slide-category">SYSTEM ARCHITECTURE</div>
        </div>

        <div className="sk-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-emerald)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              LATEST EVOLUTION (PORT 3001)
            </span>
            <h2 className="sk-title-large" style={{ margin: '0.5rem 0 1rem 0' }}>
              "A Quiet Run With a Stranger."
            </h2>
            <p className="sk-body-text" style={{ marginBottom: '1.5rem' }}>
              Instead of forcing users to stare at an empty loading spinner while waiting in queue, the latest build embeds a synchronized <strong>Chromium Dino Canvas Game</strong> directly into the hero. Two wanderers can jump over obstacles in real time with Spacebar, supported by an inline companion chat.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="sk-card" style={{ padding: '1rem' }}>
                <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.82rem', color: 'var(--sk-emerald)' }}>
                  01 · Socket.io Event Loop
                </strong>
                <p style={{ fontSize: '0.84rem', margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                  Real-time client-to-server matchmaking queue matching users by vibe quiz overlap, falling back gracefully after short queue timeouts.
                </p>
              </div>

              <div className="sk-card" style={{ padding: '1rem' }}>
                <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.82rem', color: 'var(--sk-violet)' }}>
                  02 · Pre-Broadcast Regex Moderation
                </strong>
                <p style={{ fontSize: '0.84rem', margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                  Server-side keyword blocklist filtering sexual solicitation, commercial spam, and hate speech before packets hit companion clients.
                </p>
              </div>

              <div className="sk-card" style={{ padding: '1rem' }}>
                <strong style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.82rem', color: 'var(--sk-amber)' }}>
                  03 · Instant 1-Click Safety Terminate
                </strong>
                <p style={{ fontSize: '0.84rem', margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                  Always-visible Report & Block button immediately aborts the session, writes a permanent block into localStorage, and logs incident telemetry.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--sk-bg-surface)',
            border: '1px solid var(--sk-border-strong)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem' }}>
              <span style={{ color: 'var(--sk-emerald)' }}>● CO-OP RUNNER STAGE</span>
              <span style={{ color: 'var(--sk-text-muted)' }}>SIDEKICK-APP-GE5X.ONRENDER.COM</span>
            </div>

            <div style={{
              background: '#09090b',
              border: '1px solid var(--sk-border)',
              borderRadius: '10px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.8rem', color: 'var(--sk-emerald)', marginBottom: '0.5rem' }}>
                [ SPACE TO JUMP · SYNCHRONIZING FREQUENCY ]
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--sk-text-primary)' }}>
                Two-Player Dino Canvas Synchronizer
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--sk-text-muted)', margin: '0.5rem 0 0 0' }}>
                Shared obstacle physics • Zero latency peer state • Companion joined notification
              </p>
            </div>

            <a
              href="https://sidekick-app-ge5x.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                background: 'var(--sk-emerald)',
                color: '#09090b',
                borderRadius: '8px',
                fontFamily: 'var(--sk-font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Launch Live App on Render ↗
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 08: THE UNRESOLVED ARCHITECTURAL DEBATE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-7" className="sk-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">08 / THE ARCHITECTURAL DILEMMA</div>
          <div className="sk-slide-category">OPEN QUESTIONS</div>
        </div>

        <div style={{ maxWidth: '880px', marginBottom: '2.5rem' }}>
          <h2 className="sk-title-large">City-Based Geofencing vs. Global Cyberspace.</h2>
          <p className="sk-serif-lead" style={{ color: 'var(--sk-amber)' }}>
            The unresolved design question at the core of Sidekick's product roadmap.
          </p>
        </div>

        <div className="sk-grid-2">
          {/* Path A */}
          <div className="sk-card" style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}>
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-amber)', marginBottom: '0.4rem' }}>
              OPTION A · CITY GEOFENCING
            </div>
            <h3 className="sk-card-title">Pairing Strictly Within Cities</h3>
            <p className="sk-card-body" style={{ marginBottom: '1rem' }}>
              Matching Tokyo users with Tokyo, Berlin with Berlin, Mumbai with Mumbai. Providing hyper-local hangout guides.
            </p>
            <div style={{ fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ color: 'var(--sk-emerald)' }}>+ Enables seamless transition to an IRL coffee if they click.</div>
              <div style={{ color: 'var(--sk-red)' }}>− Severe liquidity fragmentation; rural or smaller town users get empty queues.</div>
              <div style={{ color: 'var(--sk-red)' }}>− Reintroduces regional social anxieties and safety concerns.</div>
            </div>
          </div>

          {/* Path B */}
          <div className="sk-card" style={{ borderColor: 'var(--sk-emerald)' }}>
            <div style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.74rem', color: 'var(--sk-emerald)', marginBottom: '0.4rem' }}>
              OPTION B · BORDERLESS CYBERSPACE (CURRENT PATH)
            </div>
            <h3 className="sk-card-title">Pure Global Matching</h3>
            <p className="sk-card-body" style={{ marginBottom: '1rem' }}>
              Matching any two wanderers across the globe based strictly on vibe frequency and sleep schedules.
            </p>
            <div style={{ fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ color: 'var(--sk-emerald)' }}>+ High queue liquidity; always someone online at 3am.</div>
              <div style={{ color: 'var(--sk-emerald)' }}>+ Preserves the romantic early-internet mystery of meeting strangers worldwide.</div>
              <div style={{ color: 'var(--sk-amber)' }}>− Harder to meet in real life, but that was never the primary contract.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 09: PRODUCTION TELEMETRY & FUTURE HORIZONS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="sk-slide-8" className="sk-slide" style={{ scrollSnapAlign: 'start', justifyContent: 'space-between' }}>
        <div className="sk-slide-header">
          <div className="sk-slide-num">09 / TELEMETRY & FUTURE HORIZONS</div>
          <div className="sk-slide-category">CHAPTER NINE : RETROSPECTIVE</div>
        </div>

        <div>
          <div style={{ maxWidth: '850px', marginBottom: '2rem' }}>
            <h2 className="sk-title-large">The Togetherness Metric & What Lies Ahead.</h2>
            <p className="sk-serif-lead" style={{ color: 'var(--sk-emerald)' }}>
              "Nostalgia is not an aesthetic. It's fuel."
            </p>
          </div>

          <div className="sk-grid-3">
            <div className="sk-card">
              <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.72rem', color: 'var(--sk-emerald)' }}>
                TELEMETRY FEEDBACK
              </span>
              <div className="sk-card-title">The Single-Prompt Check-in</div>
              <p className="sk-card-body">
                Rather than complex 5-star ratings, Sidekick asks one question post-hangout: <em>"Did that feel like hanging out?"</em> (`Yes` / `Ehh` / `No`). Gating success purely on perceived togetherness.
              </p>
            </div>

            <div className="sk-card">
              <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.72rem', color: 'var(--sk-violet)' }}>
                NEXT SHIP
              </span>
              <div className="sk-card-title">Direct "Invite a Friend" Links</div>
              <p className="sk-card-body">
                Generating room hashes (`/join#room=SK-XXXX`) allowing couples or friends to bypass the public matching queue and launch private virtual hangouts on demand.
              </p>
            </div>

            <div className="sk-card">
              <span style={{ fontFamily: 'var(--sk-font-mono)', fontSize: '0.72rem', color: 'var(--sk-amber)' }}>
                WEEKLY DROP
              </span>
              <div className="sk-card-title">Thursday Midnight Rituals</div>
              <p className="sk-card-body">
                Surfacing one weird, atmospheric internet destination every Thursday at midnight. Ritual over addiction—giving pairs a reason to return weekly without push notifications.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--sk-border)',
          paddingTop: '1.5rem',
          marginTop: '2rem',
          fontFamily: 'var(--sk-font-mono)',
          fontSize: '0.76rem',
          color: 'var(--sk-text-muted)'
        }}>
          <span>SIDEKICK™ · PRODUCT EVOLUTION CASE STUDY COMPLETE</span>
          <span style={{ color: 'var(--sk-emerald)' }}>"THE INTERNET IS BETTER TOGETHER."</span>
        </div>
      </section>
    </div>
  );
}
