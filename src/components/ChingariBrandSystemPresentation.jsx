import React, { useState, useEffect } from 'react';
import '../styles/chingariBrandSystem.css';

// Asset paths
const logoImg = '/chingari-site/assets/logo-final.png';
const royalBengalImg = '/chingari-site/assets/royal-bengal.png';
const thirdEyeImg = '/chingari-site/assets/third-eye.png';
const solWaveImg = '/chingari-site/assets/sol-wave.png';
const meteorEyesImg = '/chingari-site/assets/meteor-eyes.jpeg';
const heroImg = '/chingari-site/assets/hero-image.png';

export default function ChingariBrandSystemPresentation({ isEmbedded = false, onToggleFullscreen = null }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 9;

  const scrollToSlide = (index) => {
    const nextIdx = Math.max(0, Math.min(totalSlides - 1, index));
    const el = document.getElementById(`c-slide-${nextIdx}`);
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
      className="c-brand-deck"
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
      <div className="c-deck-pill" style={{ position: isEmbedded ? 'absolute' : 'fixed' }}>
        <button
          onClick={() => scrollToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          title="Previous Chapter"
        >
          ←
        </button>

        <span style={{ minWidth: '90px', textAlign: 'center', letterSpacing: '0.08em' }}>
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
            <div style={{ width: '1px', height: '14px', background: 'rgba(246, 238, 221, 0.3)', margin: '0 4px' }} />
            <button onClick={onToggleFullscreen} style={{ fontSize: '0.74rem' }}>
              {isEmbedded ? '⛶ Fullscreen' : '✕ Exit'}
            </button>
          </>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 01: COVER & BRAND MANIFESTO
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-0" className="c-slide dark-deep" style={{ scrollSnapAlign: 'start', justifyContent: 'space-between' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--marigold)' }}></span>
            <span>CHINGARI · VISUAL IDENTITY SYSTEM</span>
          </div>
          <div className="c-slide-category">CHAPTER ONE : INCEPTION</div>
        </div>

        <div className="c-grid-2" style={{ alignItems: 'center', margin: 'auto 0' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cream)', opacity: 0.5, letterSpacing: '0.12em' }}>
                2025–2026
              </span>
            </div>

            <h1 className="c-title-huge" style={{ color: 'var(--cream)', marginBottom: '1.25rem' }}>
              CHIN<span style={{ color: 'var(--marigold)' }}>GAARI</span>
            </h1>

            <p className="c-serif-lead" style={{ color: 'var(--gold-accent)', fontSize: '1.65rem' }}>
              "Chingari starts more than fires."
            </p>

            <p className="c-body-text" style={{ color: 'var(--cream)', opacity: 0.85 }}>
              A comprehensive visual identity and object system transforming India's disposable ignition culture into collectible Everyday Carry (EDC) pocket talismans.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Rotating Seal SVG */}
            <svg width="280" height="280" viewBox="0 0 280 280" className="c-rotating-seal">
              <path
                id="sealPath"
                d="M 140, 140 m -105, 0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0"
                fill="none"
              />
              <text fill="var(--gold-accent)" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="3.5px" fontWeight="600">
                <textPath href="#sealPath" startOffset="0%">
                  CHINGARI · HAND MADE · COLLECTOR'S EDITION · NO. 250 ·
                </textPath>
              </text>
              <circle cx="140" cy="140" r="88" fill="none" stroke="rgba(217, 114, 12, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="140" cy="140" r="74" fill="none" stroke="rgba(184, 134, 11, 0.6)" strokeWidth="1" />
            </svg>

            {/* Central Emblem */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--marigold)', lineHeight: 1 }}>
                चिंगारी
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cream)', opacity: 0.6, letterSpacing: '0.2em', marginTop: '0.35rem' }}>
                THE SPARK
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-dark)',
          paddingTop: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--cream)',
          opacity: 0.6
        }}>
          <span>BRAND SPECIFICATION : 01 / 09</span>
          <span>OBJECT CATEGORY : WEARABLE EDC & VERNACULAR ART</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 02: THE CULTURAL TENSION & BELT-LOOP EDC INSIGHT
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-1" className="c-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">02 / CULTURAL TENSION & BEHAVIORAL INSIGHT</div>
          <div className="c-slide-category">RESEARCH & BEHAVIOR</div>
        </div>

        <div style={{ maxWidth: '900px', marginBottom: '3rem' }}>
          <h2 className="c-title-large">
            A Commodity Ignored in Plain Sight.
          </h2>
          <p className="c-serif-lead">
            Over 1.5 billion plastic lighters enter landfills every year—zero emotional connection, pure disposable utility.
          </p>
        </div>

        <div className="c-grid-3">
          <div className="c-specimen-card">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', marginBottom: '0.75rem' }}>
              01 · THE COMMODITY TRAP
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
              The Discarded Flame
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.8 }}>
              Modern lighter brands compete purely on price and chemical gas. Users lose them without remorse, borrow them without returning, and discard them when empty. Ignition was stripped of its ceremony.
            </p>
          </div>

          <div className="c-specimen-card" style={{ borderColor: 'var(--marigold)', background: 'var(--cream-bright)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', marginBottom: '0.75rem' }}>
              02 · THE WEARABLE BEHAVIOR
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
              The Belt-Loop EDC
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.8 }}>
              In modern streetwear and creative culture, <strong>Everyday Carry (EDC)</strong> hooked to denim belt loops (brass keys, carabiners, talismans) is an outward signal of personal identity. It clinks against your jeans when you walk.
            </p>
          </div>

          <div className="c-specimen-card">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', marginBottom: '0.75rem' }}>
              03 · THE REVALUATION
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
              The Portable Talisman
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.8 }}>
              Before disposable plastics, Indian matchboxes were pocket-sized art galleries carrying tigers, mythological deities, and bold typography. Chingari returns that cultural pride to steel and brass.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 03: THE THREE CREATIVE WORLDS (BRAND HOUSES)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-2" className="c-slide dark-theme" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">03 / BRAND ARCHITECTURE & THE THREE WORLDS</div>
          <div className="c-slide-category">NARRATIVE PILLARS</div>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="c-title-large">Three Creative Houses. One Flame.</h2>
          <p className="c-serif-lead" style={{ color: 'var(--gold-accent)' }}>
            Dividing the visual universe into three distinct collector territories.
          </p>
        </div>

        <div className="c-grid-3">
          {/* World 1 */}
          <div className="c-world-card">
            <div className="c-world-card-media">
              <img src={royalBengalImg} alt="Royal Bengal Tiger Lighter Art" />
            </div>
            <div className="c-world-card-body">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                HOUSE 01 · HERITAGE & FOLK
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                The Vernacular Matchbox
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.55, opacity: 0.85, marginBottom: '1rem' }}>
                Inspired by 1970s Sivakasi woodblock print and Indian street folklore. Features the <strong>Royal Bengal Tiger</strong> crouching amidst lotus petals—raw tactile relief on scratch-sealed steel.
              </p>
              <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
                EDC IDENTITY : THE POWER CHARM
              </div>
            </div>
          </div>

          {/* World 2 */}
          <div className="c-world-card">
            <div className="c-world-card-media">
              <img src={thirdEyeImg} alt="Third Eye Psychedelic Lighter Art" />
            </div>
            <div className="c-world-card-body">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                HOUSE 02 · MIDNIGHT & NOIR
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                The Cosmic Revelation
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.55, opacity: 0.85, marginBottom: '1rem' }}>
                Built to be seen twice. Features <strong>Third Eye</strong> rendered with dual-state UV-reactive ink. In daylight, a subtle slate motif; under club blacklights, a blazing psychedelic ajna chakra.
              </p>
              <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
                EDC IDENTITY : THE MIDNIGHT MYSTIC
              </div>
            </div>
          </div>

          {/* World 3 */}
          <div className="c-world-card">
            <div className="c-world-card-media">
              <img src={meteorEyesImg} alt="Meteor Eyes Sci-Fi Lighter Art" />
            </div>
            <div className="c-world-card-body">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                HOUSE 03 · RETRO-FUTURIST FICTION
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                The Narrative Paperbacks
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.55, opacity: 0.85, marginBottom: '1rem' }}>
                Capturing vintage sci-fi paperback covers and celestial ocean tides. Features <strong>Meteor Eyes</strong> and <strong>Sol & Wave</strong>—lone figures looking up at burning skies.
              </p>
              <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
                EDC IDENTITY : THE LONE WANDERER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 04: THE LOGOMARK & BRAND GRAMMAR
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-3" className="c-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">04 / LOGOMARK & BRAND GRAMMAR</div>
          <div className="c-slide-category">VISUAL IDENTITY</div>
        </div>

        <div className="c-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              THE CORE SIGNATURE
            </span>
            <h2 className="c-title-large" style={{ margin: '0.5rem 0 1rem 0' }}>
              Two-Tone Wordmark & Provenance Mark
            </h2>
            <p className="c-body-text" style={{ marginBottom: '1.5rem' }}>
              The wordmark bridges aggressive industrial condensation with Indian print vernacular. The dual-tone split—<strong>CHIN</strong> in deep aubergine and <strong>GAARI</strong> in burning marigold—embodies the moment fuel encounters spark.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'var(--cream-surface)', borderLeft: '3px solid var(--marigold)', borderRadius: '4px' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>01 / Dual-Tone Split</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
                  Reflects the transition from dark unignited steel to heat.
                </p>
              </div>

              <div style={{ padding: '1rem', background: 'var(--cream-surface)', borderLeft: '3px solid var(--gold)', borderRadius: '4px' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>02 / Devanagari Root (चिंगारी)</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
                  Anchors the name in its Hindi linguistic root without tourist cliches.
                </p>
              </div>

              <div style={{ padding: '1rem', background: 'var(--cream-surface)', borderLeft: '3px solid var(--dark)', borderRadius: '4px' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>03 / Numbered Batch Seal</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
                  A revolving circular stamp verifying strict batch limitation (Max 250 units).
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{
              background: 'var(--cream-bright)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              padding: '3rem 2.5rem',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}>
              <img src={logoImg} alt="Chingari Official Logo" style={{ maxWidth: '320px', margin: '0 auto 1.5rem auto' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.5 }}>
                OFFICIAL BRAND WORDMARK (TRANSPARENT ALPHA)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 05: DESIGN SYSTEM & MATERIAL TOKENS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-4" className="c-slide dark-deep" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">05 / DESIGN SYSTEM & CHROMATIC TOKENS</div>
          <div className="c-slide-category">TOKENS & SYSTEM</div>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="c-title-large" style={{ color: 'var(--cream)' }}>
            The Material Palette
          </h2>
          <p className="c-serif-lead" style={{ color: 'var(--gold-accent)' }}>
            Grounded in aged cardboard, burning flame, and oxidized industrial metals.
          </p>
        </div>

        {/* Color Palette Grid */}
        <div className="c-grid-4" style={{ marginBottom: '3rem' }}>
          <div className="c-specimen-card">
            <div className="c-swatch-chip" style={{ background: '#F6EEDD', color: '#20130A' }}>
              #F6EEDD
            </div>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>Cream Ground</strong>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: '0.2rem 0 0 0' }}>Weathered matchbook pulp</p>
          </div>

          <div className="c-specimen-card">
            <div className="c-swatch-chip" style={{ background: '#241333', color: '#F6EEDD' }}>
              #241333
            </div>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>Dark Aubergine</strong>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: '0.2rem 0 0 0' }}>Soot, night skies & ink</p>
          </div>

          <div className="c-specimen-card">
            <div className="c-swatch-chip" style={{ background: '#D9720C', color: '#FFFFFF' }}>
              #D9720C
            </div>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>Marigold Spark</strong>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: '0.2rem 0 0 0' }}>The ignition energy</p>
          </div>

          <div className="c-specimen-card">
            <div className="c-swatch-chip" style={{ background: '#B8860B', color: '#FFFFFF' }}>
              #B8860B
            </div>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>Antiqued Brass</strong>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: '0.2rem 0 0 0' }}>Hardware permanence</p>
          </div>
        </div>

        {/* Typography Specs */}
        <div className="c-grid-3">
          <div className="c-specimen-card">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--marigold)' }}>DISPLAY TYPOGRAPHY</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '0.5rem 0' }}>
              Big Shoulders
            </div>
            <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Brutalist compressed headlines. Heavy, urgent street presence.</p>
          </div>

          <div className="c-specimen-card">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)' }}>EDITORIAL & LORE</span>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontStyle: 'italic', margin: '0.5rem 0' }}>
              Fraunces Italic
            </div>
            <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Literary storytelling, manifesto quotes, and historical context.</p>
          </div>

          <div className="c-specimen-card">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cream)', opacity: 0.6 }}>SPECIFICATION LABELS</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 600, margin: '0.5rem 0' }}>
              IBM Plex Mono
            </div>
            <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Serial numbers, edition seals, and industrial hardware specifications.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 06: THE WEARABLE OBJECT & BELT-LOOP EDC HARDWARE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-5" className="c-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">06 / THE PHYSICAL OBJECT & WEARABLE EDC</div>
          <div className="c-slide-category">INDUSTRIAL DESIGN & EDC</div>
        </div>

        <div className="c-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              WEARABLE IDENTITY
            </span>
            <h2 className="c-title-large" style={{ margin: '0.5rem 0 1rem 0' }}>
              Hooked to Denim Like Car Keys.
            </h2>
            <p className="c-body-text" style={{ marginBottom: '1.75rem' }}>
              Chingari lighters are not hidden in the dark bottom of a pocket. They are engineered with a <strong>solid brass swivel eyelet</strong> to hook directly onto denim belt loops via split rings, carabiners, or custom sculpted charms.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                  The Solid Brass Charm Attachment
                </strong>
                <p style={{ fontSize: '0.88rem', margin: '0.25rem 0 0 0', opacity: 0.8 }}>
                  Paired with solid brass sculpted talismans (such as the signature Golden Grub / Royal Seal charm) creating a tactile counterweight that swings naturally at the hip.
                </p>
              </div>

              <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                  Scratch-Sealed Steel Shell
                </strong>
                <p style={{ fontSize: '0.88rem', margin: '0.25rem 0 0 0', opacity: 0.8 }}>
                  Treated with a scratch-resistant hard clear-seal so the artwork survives daily contact with keys, rivets, and raw denim.
                </p>
              </div>

              <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                  Refillable Butane Core
                </strong>
                <p style={{ fontSize: '0.88rem', margin: '0.25rem 0 0 0', opacity: 0.8 }}>
                  Standard butane valve (approx. 300 lights per fill) designed for a 10-year physical lifespan.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              maxWidth: '460px',
              background: '#000'
            }}>
              <img
                src={heroImg}
                alt="Chingari Lighter with Charm Hooked"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ padding: '1rem', background: 'var(--dark-deep)', color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>SPEC: 58mm × 38mm × 14mm</span>
                <span style={{ color: 'var(--gold-accent)' }}>WEIGHT: 85g SOLID STEEL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 07: CHAPTER ONE COLLECTION (4 EDITIONS)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-6" className="c-slide dark-theme" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">07 / CHAPTER ONE · THE INITIAL DROP</div>
          <div className="c-slide-category">COLLECTIBLE EDITIONS</div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 className="c-title-large">Chapter One Collection</h2>
          <p className="c-serif-lead" style={{ color: 'var(--gold-accent)' }}>
            Four numbered editions. 250 units maximum per design.
          </p>
        </div>

        <div className="c-grid-4">
          {/* Item 1 */}
          <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
            <div style={{ height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', background: '#000' }}>
              <img src={royalBengalImg} alt="Royal Bengal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--marigold)' }}>EDITION 004 / 250</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>₹1,399</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0 0 0.35rem 0', textTransform: 'uppercase' }}>Royal Bengal</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.45, margin: 0 }}>
              Crouching tiger amongst lotus blooms under a crimson moon.
            </p>
          </div>

          {/* Item 2 */}
          <div className="c-specimen-card" style={{ padding: '1.25rem', borderColor: 'var(--marigold)' }}>
            <div style={{ height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', background: '#000' }}>
              <img src={thirdEyeImg} alt="Third Eye" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--marigold)' }}>EDITION 001 / 120</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>₹1,599</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0 0 0.35rem 0', textTransform: 'uppercase' }}>Third Eye</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.45, margin: 0 }}>
              UV-reactive glowing ink revealing cosmic ajna chakra in club lighting.
            </p>
          </div>

          {/* Item 3 */}
          <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
            <div style={{ height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', background: '#000' }}>
              <img src={solWaveImg} alt="Sol & Wave" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--marigold)' }}>EDITION 002 / 250</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>₹1,399</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0 0 0.35rem 0', textTransform: 'uppercase' }}>Sol & Wave</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.45, margin: 0 }}>
              Vintage woodcut rendering of solar rays and falling shooting stars.
            </p>
          </div>

          {/* Item 4 */}
          <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
            <div style={{ height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', background: '#000' }}>
              <img src={meteorEyesImg} alt="Meteor Eyes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--marigold)' }}>EDITION 003 / 250</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>₹1,399</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0 0 0.35rem 0', textTransform: 'uppercase' }}>Meteor Eyes</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.45, margin: 0 }}>
              Vintage sci-fi paperback homage of mirrored shades catching a meteor shower.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 08: PACKAGING & THE UNBOXING RITUAL
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-7" className="c-slide" style={{ scrollSnapAlign: 'start' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">08 / PACKAGING & COLLECTOR'S UNBOXING</div>
          <div className="c-slide-category">PACKAGING SYSTEM</div>
        </div>

        <div className="c-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--marigold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              UNBOXING ARCHITECTURE
            </span>
            <h2 className="c-title-large" style={{ margin: '0.5rem 0 1rem 0' }}>
              The Giant Matchbox Slide Box
            </h2>
            <p className="c-body-text" style={{ marginBottom: '1.5rem' }}>
              The packaging borrows the tactile ritual of sliding open a real matchbox drawer. Fabricated from heavy 450gsm unbleached raw kraft cardboard with blind debossing and gold foil highlights.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--marigold)' }}>
                  STAGE 01 · THE OUTER SLEEVE
                </strong>
                <p style={{ fontSize: '0.88rem', margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                  Raw kraft board with printed striking surface strip on the spine—a nostalgic homage to vintage matchbox friction strips.
                </p>
              </div>

              <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--marigold)' }}>
                  STAGE 02 · THE WAX WRAP & STAMP
                </strong>
                <p style={{ fontSize: '0.88rem', margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                  Semi-translucent waxed paper wrapping the steel lighter, sealed by a gold foil rotating batch seal sticker.
                </p>
              </div>

              <div className="c-specimen-card" style={{ padding: '1.25rem' }}>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--marigold)' }}>
                  STAGE 03 · THE COLLECTOR CERTIFICATE
                </strong>
                <p style={{ fontSize: '0.88rem', margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                  Heavy cotton card bearing the batch serial number, care guidelines, and the story behind the artwork.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--cream-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--marigold)', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              COLLECTOR'S PACKAGING SPECIFICATION
            </div>
            <div style={{
              width: '100%',
              height: '240px',
              border: '2px dashed var(--marigold)',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              background: 'var(--cream-bright)'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', textTransform: 'uppercase' }}>
                MATCHBOX SLIDE BOX
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--marigold)', marginTop: '0.25rem' }}>
                110mm × 75mm × 26mm · 450gsm Unbleached Kraft
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.6, marginTop: '0.75rem' }}>
                [ RAW KRAFT · GOLD FOIL STAMP · WAX WRAP · SERIAL CERTIFICATE ]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 09: DIGITAL TOUCHPOINTS & LIVE STOREFRONT
      ═══════════════════════════════════════════════════════════════ */}
      <section id="c-slide-8" className="c-slide dark-deep" style={{ scrollSnapAlign: 'start', justifyContent: 'space-between' }}>
        <div className="c-slide-header">
          <div className="c-slide-num">09 / DIGITAL COMMERCE & LIVE STOREFRONT</div>
          <div className="c-slide-category">DIGITAL SYSTEM</div>
        </div>

        <div>
          <div style={{ maxWidth: '800px', marginBottom: '2rem' }}>
            <h2 className="c-title-large" style={{ color: 'var(--cream)' }}>
              Live Storefront & Drop System
            </h2>
            <p className="c-serif-lead" style={{ color: 'var(--gold-accent)' }}>
              A zero-friction, pre-order storefront built directly on static edge infrastructure.
            </p>
          </div>

          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-dark)',
            background: '#000',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              padding: '0.75rem 1.25rem',
              background: 'var(--dark)',
              borderBottom: '1px solid var(--border-dark)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }}></span>
                <span style={{ color: 'var(--cream)' }}>Live Storefront MVP Preview</span>
              </div>
              <a
                href="https://chingari-website.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--gold-accent)',
                  textDecoration: 'underline',
                  fontWeight: 600
                }}
              >
                Launch Storefront on Vercel ↗
              </a>
            </div>

            <iframe
              src="/chingari-site/index.html"
              title="Live Chingari Storefront"
              loading="lazy"
              style={{
                width: '100%',
                height: '420px',
                border: 'none',
                display: 'block'
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-dark)',
          paddingTop: '1.5rem',
          marginTop: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--cream)',
          opacity: 0.7
        }}>
          <span>CHINGARI · CHAPTER ONE SYSTEM COMPLETE</span>
          <span style={{ color: 'var(--marigold)' }}>"CHINGARI STARTS MORE THAN FIRES."</span>
        </div>
      </section>
    </div>
  );
}
