import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Check,
  FileText,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Send,
  Sparkles,
  Flame,
  Activity,
  Layers,
  Camera,
  BookOpen,
  Zap,
  Box,
  Monitor,
  Compass
} from 'lucide-react';
import Header from '../components/Header';
import ChapterHeader from '../components/ChapterHeader';
import CommandPalette from '../components/CommandPalette';
import Footer from '../components/Footer';

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '', style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ─── Creative Proof Benchmarks ─── */
const CREATIVE_BENCHMARKS = [
  {
    eyebrow: 'PHYSICAL BRAND UNIVERSE',
    val: '9-Chapter System',
    detail: 'Complete brand lore, vintage matchbox lithography, heavy brass CNC specs, and live custom storefront for Chingari EDC.',
    footer: 'Collectible Hardware Brand',
    link: '/chingari/presentation'
  },
  {
    eyebrow: 'REAL-TIME CYBERSPACE ENGINE',
    val: 'Zero-Feed Co-Presence',
    detail: 'Socket.io synchronized 360 exploration, ambient co-listening, and Among Us style Cyberwave typography for Sidekick™.',
    footer: '0-to-1 Digital Product',
    link: '/sidekick/presentation'
  },
  {
    eyebrow: 'SPATIAL 3D & WEBGL',
    val: 'Hand-Draft to Orbit',
    detail: 'Architectural hand-pencil perspective drafted and compiled into an interactive WebGL 3D spatial room with real-time lighting.',
    footer: 'Spline 3D Environment',
    link: '/room'
  },
  {
    eyebrow: 'THERMODYNAMIC RIGOR',
    val: '₹1.91L Cr Grid Model',
    detail: 'Mathematical modeling of POSOCO/IEX peak tariff spreads, battery arbitrage, and microgrid frequency stability.',
    footer: 'Electrical Engineering @ SGSITS',
    link: '/discom'
  }
];

export default function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [resumeNotice, setResumeNotice] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('utk9rsh@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const trackResumeDownload = (type) => {
    try {
      const payload = {
        event: 'resume_download',
        type: type,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct',
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track-resume', JSON.stringify(payload));
      } else {
        fetch('/api/track-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    } catch {
      // Fail silently
    }
  };

  const handleDownloadResume = (type = 'Creative') => {
    const isSupport = type === 'Technical';
    const filePath = isSupport
      ? '/UtkarshGupta_Resume.pdf'
      : '/UtkarshGupta_Resume.pdf';
    const fileName = isSupport
      ? 'UtkarshGupta_Systems_Engineer_Resume.pdf'
      : 'UtkarshGupta_Creative_Director_Resume.pdf';

    trackResumeDownload(type);

    fetch(filePath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          const link = document.createElement('a');
          link.href = filePath;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setResumeNotice(true);
          setTimeout(() => setResumeNotice(false), 3500);
        }
      })
      .catch(() => {
        setResumeNotice(true);
        setTimeout(() => setResumeNotice(false), 3500);
      });
  };

  return (
    <div className="page-wrapper">
      {/* ═══════════ ARE.NA STICKY TOP NAV ═══════════ */}
      <Header
        brandText="UK"
        brandTo="/"
        navItems={[
          { label: 'Creative Proof', targetId: 'proof' },
          { label: 'Flagship Universes', targetId: 'flagships' },
          { label: 'Spatial 3D', targetId: 'spatial' },
          { label: 'Cinematography', targetId: 'cinematography' },
          { label: 'Essays', targetId: 'essays' },
          { label: 'Thermodynamics', targetId: 'thermodynamics' },
          { label: 'About & Stack', targetId: 'about' },
          { label: 'Inquire', targetId: 'contact' }
        ]}
      />

      <div className="container" style={{ paddingTop: '2.5rem' }}>

        {/* ═══════════ HERO SECTION: CREATIVE DIRECTION & SYSTEMS RIGOR ═══════════ */}
        <section id="hero" className="hero-section" style={{ paddingBottom: '2.5rem', marginBottom: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E5A93C', boxShadow: '0 0 10px rgba(229, 169, 60, 0.6)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase'
            }}>
              INDORE, INDIA · ENGINEERING BACKGROUND · OPEN TO PRODUCT DESIGN & CREATIVE TECH ROLES
            </span>
          </div>

          <h1 className="hero-name" style={{ marginBottom: '0.85rem' }}>Utkarsh Gupta</h1>
          
          <p className="hero-tagline" style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '1.15rem', fontWeight: 600, lineHeight: 1.4 }}>
            Product Designer & Creative Technologist bridging physical hardware, spatial 3D, and real-time web.
          </p>

          <p className="hero-bio" style={{ maxWidth: '820px', fontSize: '1.02rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '1.85rem' }}>
            Engineer building 0-to-1 digital products, spatial 3D interfaces, and physical brand systems. Focused on high-craft execution where systems thinking meets thoughtful visual design.
          </p>

          {/* Target Creative Roles Strip */}
          <div className="role-tags" style={{ marginBottom: '2.25rem' }}>
            <span className="role-tag-label">Target Roles:</span>
            <span className="role-tag" style={{ borderColor: 'rgba(229, 169, 60, 0.4)', color: '#E5A93C', background: 'rgba(229, 169, 60, 0.08)' }}>
              0-to-1 Product Designer
            </span>
            <span className="role-tag" style={{ borderColor: 'rgba(59, 130, 246, 0.4)', color: '#60A5FA', background: 'rgba(59, 130, 246, 0.08)' }}>
              Creative Technologist (3D / Spatial / Real-Time)
            </span>
            <span className="role-tag" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10B981', background: 'rgba(16, 185, 129, 0.08)' }}>
              Brand & Physical Hardware Designer
            </span>
          </div>

          <div className="hero-actions" style={{ flexWrap: 'wrap', gap: '0.85rem' }}>
            <button
              onClick={() => handleDownloadResume('Creative')}
              className="hero-cta hero-cta-primary"
              title="Download Creative Resume PDF"
            >
              <FileText size={16} />
              <span>{resumeNotice ? 'Resume PDF Pending' : 'Download Creative Resume'}</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="hero-cta"
              title="Click to copy email"
            >
              <span>utk9rsh@gmail.com</span>
              {copiedEmail ? <Check size={16} color="#34D399" /> : <Copy size={16} />}
              {copiedEmail && <span style={{ color: '#34D399', fontWeight: 600 }}>Copied!</span>}
            </button>

            <a
              href="https://chingari-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              style={{ color: '#E5A93C', borderColor: 'rgba(229, 169, 60, 0.35)' }}
            >
              <Flame size={15} />
              <span>Chingari Live Store ↗</span>
            </a>

            <a
              href="https://sidekick-app-ge5x.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              style={{ color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.35)' }}
            >
              <Compass size={15} />
              <span>Sidekick Live App ↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
            >
              <ExternalLink size={15} />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </section>

        {/* ═══════════ CHAPTER 01: CREATIVE PROOF (BENCHMARKS) ═══════════ */}
        <section id="proof" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="PROOF OF CRAFT"
              title="Creative Benchmarks & Scale"
              kicker="Quantitative depth behind physical collectible universes, real-time cyberspace engines, spatial 3D WebGL, and electrical engineering rigor."
            />

            <div className="metric-grid">
              {CREATIVE_BENCHMARKS.map((m, idx) => (
                <Link to={m.link} key={idx} className="metric-card">
                  <div>
                    <div className="metric-card-eyebrow">
                      <span>{m.eyebrow}</span>
                      <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div className="metric-card-val" style={{ fontSize: '1.45rem', marginTop: '0.4rem' }}>{m.val}</div>
                    <div className="metric-card-detail">{m.detail}</div>
                  </div>
                  <div className="metric-card-footer">
                    <span>{m.footer}</span>
                    <span>Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 02: FLAGSHIP CREATIVE UNIVERSES ═══════════ */}
        <section id="flagships" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="FLAGSHIP UNIVERSES"
              title="0-to-1 Brand & Product Universes"
              kicker="Two complete multi-chapter flagship systems: one physical collectible hardware universe, one real-time digital cyberspace engine."
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* ─── SHOWCASE 1: CHINGARI ─── */}
              <div className="creative-showcase-card" style={{ borderLeft: '4px solid #E5A93C' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <Flame size={16} color="#E5A93C" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#E5A93C', letterSpacing: '0.12em', fontWeight: 600 }}>
                        PHYSICAL HARDWARE & BRAND ARCHITECTURE // 9-CHAPTER DECK
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Chingari — Bespoke Art Lighter Brand Universe
                    </h3>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#E5A93C',
                    background: 'rgba(229, 169, 60, 0.1)',
                    border: '1px solid rgba(229, 169, 60, 0.3)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    letterSpacing: '0.04em',
                    fontWeight: 600
                  }}>
                    💎 9-Chapter Brand Deck
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7', margin: 0 }}>
                  Repositioning disposable commodity lighters into heirloom collectible everyday-carry (EDC) physical art. Blending vintage Indian matchbox lithography with dystopian cyberpunk typography, solid CNC brass casings, tactile knurled flint wheels, and a custom belt-loop carabiner clip. Complete with a live e-commerce storefront and a 9-chapter Brand System presentation covering manifesto, packaging specs, and content allocation ratios.
                </p>

                {/* Visual Preview Banner Strip */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Visual Artifacts & Physical Hardware
                  </div>
                  <div className="showcase-banner-grid">
                    <div className="showcase-thumbnail-frame">
                      <img src="/chingari-site/assets/royal-bengal.png" alt="Chingari Royal Bengal Matchbox" />
                    </div>
                    <div className="showcase-thumbnail-frame">
                      <img src="/chingari-site/assets/hero-image.png" alt="Chingari Solid Brass Hardware" />
                    </div>
                    <div className="showcase-thumbnail-frame">
                      <img src="/chingari-site/assets/third-eye.png" alt="Chingari Third Eye Folklore" />
                    </div>
                    <div className="showcase-thumbnail-frame">
                      <img src="/chingari-site/assets/sol-wave.png" alt="Chingari Sol Wave Graphic" />
                    </div>
                    <div className="showcase-thumbnail-frame">
                      <img src="/chingari-site/assets/Luna-Moth.png" alt="Chingari Luna Moth Graphic" />
                    </div>
                  </div>
                </div>

                {/* Tag Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {[
                    '9-Chapter Brand System',
                    'CNC Brass Chassis Specs',
                    'EDC Hardware Ergonomics',
                    'Vintage Matchbox Folklore',
                    'Packaging & Unboxing Architecture',
                    'Live Storefront (Vercel)'
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: tag.includes('9-Chapter') ? '#E5A93C' : 'var(--text-muted)',
                        background: tag.includes('9-Chapter') ? 'rgba(229, 169, 60, 0.12)' : 'var(--bg-subtle)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '4px',
                        border: tag.includes('9-Chapter') ? '1px solid rgba(229, 169, 60, 0.35)' : '1px solid var(--border-color)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Triple CTAs */}
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <Link
                    to="/chingari/presentation"
                    className="hero-cta hero-cta-primary"
                    style={{ background: '#E5A93C', color: '#09090b', borderColor: '#E5A93C' }}
                  >
                    <Sparkles size={15} />
                    <span>Launch 9-Chapter Brand Deck</span>
                    <ArrowRight size={15} />
                  </Link>

                  <a
                    href="https://chingari-website.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta"
                    style={{ borderColor: 'rgba(229, 169, 60, 0.4)', color: '#E5A93C' }}
                  >
                    <ExternalLink size={15} />
                    <span>Visit Live Storefront (Vercel) ↗</span>
                  </a>

                  <Link
                    to="/chingari/visual-system"
                    className="hero-cta"
                  >
                    <span>Brand Identity Architecture →</span>
                  </Link>
                </div>
              </div>

              {/* ─── SHOWCASE 2: SIDEKICK™ ─── */}
              <div className="creative-showcase-card" style={{ borderLeft: '4px solid #10B981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <Compass size={16} color="#10B981" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10B981', letterSpacing: '0.12em', fontWeight: 600 }}>
                        DIGITAL PRODUCT ARCHITECTURE & STATE ENGINE // 9-CHAPTER CASE STUDY
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Sidekick™ — Co-Presence Engine & Product Evolution
                    </h3>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    letterSpacing: '0.04em',
                    fontWeight: 600
                  }}>
                    💎 9-Chapter Case Study
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7', margin: 0 }}>
                  <em>"The internet used to be a place you went with someone. We're bringing that back."</em> A 0-to-1 product evolution from street stranger-matching to cyberspace co-presence. Featuring retro <strong>Cyberwave typography</strong>, moving pixel stars, radical subtraction, socket synchronization, and ambient 360 exploration—zero webcams, zero algorithmic feeds, pure shared web.
                </p>

                {/* Visual Preview Banner Strip */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Interactive Cyberspace Screens & State UI
                  </div>
                  <div className="showcase-banner-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div className="showcase-thumbnail-frame" style={{ aspectRatio: '16/10' }}>
                      <img src="/sidekick-assets/v1_lobby_matching.png" alt="Sidekick Real-Time Lobby Matching" />
                    </div>
                    <div className="showcase-thumbnail-frame" style={{ aspectRatio: '16/10' }}>
                      <img src="/sidekick-assets/v1_vibe_quiz.png" alt="Sidekick Vibe & Frequency Quiz" />
                    </div>
                    <div className="showcase-thumbnail-frame" style={{ aspectRatio: '16/10' }}>
                      <img src="/sidekick-assets/v1_questions.png" alt="Sidekick Ambient Question Prompts" />
                    </div>
                  </div>
                </div>

                {/* Tag Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {[
                    'Product Journey (9 Chapters)',
                    'Socket.io State Engine',
                    'Retro Cyberwave Visual System',
                    'Among Us Pixel Universe',
                    'Ambient Audio Sync',
                    'Zero Algorithmic Feed',
                    'Live on Render'
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: tag.includes('9 Chapters') ? '#10B981' : 'var(--text-muted)',
                        background: tag.includes('9 Chapters') ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-subtle)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '4px',
                        border: tag.includes('9 Chapters') ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-color)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Triple CTAs */}
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <Link
                    to="/sidekick/presentation"
                    className="hero-cta hero-cta-primary"
                    style={{ background: '#10B981', color: '#09090b', borderColor: '#10B981' }}
                  >
                    <Compass size={15} />
                    <span>Launch 9-Chapter Case Study Deck</span>
                    <ArrowRight size={15} />
                  </Link>

                  <a
                    href="https://sidekick-app-ge5x.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta"
                    style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10B981' }}
                  >
                    <ExternalLink size={15} />
                    <span>Open Live App on Render ↗</span>
                  </a>

                  <Link
                    to="/sidekick"
                    className="hero-cta"
                  >
                    <span>Full Product Journey Document →</span>
                  </Link>
                </div>
              </div>

            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 03: SPATIAL 3D & WEBGL CANVAS ═══════════ */}
        <section id="spatial" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="SPATIAL COMPUTING"
              title="The Room — 3D Spatial Environment"
              kicker="Translating physical architectural hand-drafting into interactive WebGL spatial computing."
            />

            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <Box size={16} color="#60A5FA" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#60A5FA', letterSpacing: '0.12em', fontWeight: 600 }}>
                    SPLINE // WEBGL // REAL-TIME LIGHTING
                  </span>
                </div>

                <h3 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                  Architectural Hand-Draft to WebGL Orbit
                </h3>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.25rem' }}>
                  Spatial design begins with physical proportions. Hand-drafted architectural perspective was translated into an interactive WebGL scene exploring camera orbit physics, real-time directional illumination, and spatial room navigation. An exploration in how digital environments can evoke intimate tactile spaces rather than sterile empty canvases.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{ borderLeft: '2px solid var(--border-strong)', paddingLeft: '0.75rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Custom Modeling</div>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--border-strong)', paddingLeft: '0.75rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: '#60A5FA' }}>60 FPS</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WebGL Orbit</div>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--border-strong)', paddingLeft: '0.75rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Pencil</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Initial Blueprint</div>
                  </div>
                </div>

                <Link
                  to="/room"
                  className="hero-cta hero-cta-primary"
                  style={{ display: 'inline-flex', padding: '0.65rem 1.4rem', background: '#3B82F6', borderColor: '#3B82F6' }}
                >
                  <Box size={16} />
                  <span>Enter 3D Spatial Room</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Hand-draft blueprint preview */}
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
              }}>
                <img
                  src="/house-sketch.jpg"
                  alt="Hand-drafted architectural blueprint for The Room"
                  style={{ width: '100%', height: 'auto', display: 'block', filter: 'contrast(1.08) brightness(0.95)' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)'
                }}>
                  ORIGINAL HAND-DRAFTED PENCIL BLUEPRINT // TRANSLATED TO WEBGL
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 04: CINEMATOGRAPHY & VISUAL ARCHIVE ═══════════ */}
        <section id="cinematography" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="CINEMATOGRAPHY"
              title="Visual Archive (@utkarshhguptaaa)"
              kicker="Atmospheric 35mm photo studies, Wong Kar-wai color grades, high-contrast silhouettes, and twilight street textures."
            />

            <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              Film cinematography is where I train my aesthetic instincts for digital products: atmospheric pacing, high-contrast chiaroscuro shadows, and saturated color palettes. Selected frames from my ongoing personal visual notebook:
            </p>


            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Link
                to="/instagram"
                className="hero-cta hero-cta-primary"
              >
                <Camera size={15} />
                <span>Explore Full Visual Archive Page</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href="https://www.instagram.com/utkarshhguptaaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta"
              >
                <ExternalLink size={15} />
                <span>Instagram Profile (@utkarshhguptaaa) ↗</span>
              </a>
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 05: PHILOSOPHICAL THESES & SYSTEMS WRITINGS ═══════════ */}
        <section id="essays" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="SYSTEMS ESSAYS"
              title="Essays on Money, Mind & Mystery"
              kicker="13 published essays dissecting corporate extraction, cognitive architecture, and the mechanics of aesthetic wonder."
            />

            <div className="secondary-grid">
              <Link to="/essays" style={{ textDecoration: 'none' }}>
                <div className="secondary-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div className="secondary-card-header">
                      <span className="secondary-card-label">ESSAY 01 // AESTHETICS</span>
                      <ArrowUpRight size={16} className="secondary-card-icon" />
                    </div>
                    <div className="secondary-card-title">The Friction of Opposites</div>
                    <div className="secondary-card-desc">
                      Why purely aesthetic design feels hollow and purely technical systems feel sterile—and why the greatest creative work occurs when hard physical constraints collide with radical imagination.
                    </div>
                  </div>
                  <div className="secondary-card-footer">
                    <span>Read Essay</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              <Link to="/essays" style={{ textDecoration: 'none' }}>
                <div className="secondary-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div className="secondary-card-header">
                      <span className="secondary-card-label">ESSAY 02 // HARDWARE LORE</span>
                      <ArrowUpRight size={16} className="secondary-card-icon" />
                    </div>
                    <div className="secondary-card-title">The Mechanics of Wonder</div>
                    <div className="secondary-card-desc">
                      A study of why some tools become personal talismans (like a Zippo or Leica) while others remain disposable plastic commodities. The blueprint behind Chingari's brass collectible philosophy.
                    </div>
                  </div>
                  <div className="secondary-card-footer">
                    <span>Read Essay</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              <Link to="/essays" style={{ textDecoration: 'none' }}>
                <div className="secondary-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div className="secondary-card-header">
                      <span className="secondary-card-label">ESSAY 03 // VALUE FLOWS</span>
                      <ArrowUpRight size={16} className="secondary-card-icon" />
                    </div>
                    <div className="secondary-card-title">Where Does the Money Go?</div>
                    <div className="secondary-card-desc">
                      Tracing value flow across modern corporate enterprise architectures, intermediary friction, and the hidden mechanics of institutional capture.
                    </div>
                  </div>
                  <div className="secondary-card-footer">
                    <span>Read Essay</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link
                to="/essays"
                className="hero-cta"
                style={{ display: 'inline-flex', padding: '0.65rem 1.6rem' }}
              >
                <BookOpen size={15} />
                <span>Explore All 13 Philosophical Writings →</span>
              </Link>
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 06: THE THERMODYNAMIC BACKBONE (THE SECRET WEAPON) ═══════════ */}
        <section id="thermodynamics" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="ENGINEERING ROOT"
              title="The Thermodynamic Backbone (The Secret Weapon)"
              kicker="Why creative leaders trust an engineer: real-world power systems, grid dispatch, and energy economics."
            />

            <div className="secondary-grid">
              <Link to="/discom" style={{ textDecoration: 'none' }}>
                <div className="secondary-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div className="secondary-card-header">
                      <span className="secondary-card-label">DATA PIPELINE // POSOCO</span>
                      <ArrowUpRight size={16} className="secondary-card-icon" />
                    </div>
                    <div className="secondary-card-title">DISCOM Revenue Leakage & Battery Arbitrage</div>
                    <div className="secondary-card-desc">
                      Python analytical pipeline using real POSOCO/Grid-India demand and IEX Day-Ahead prices modeling state tariff spreads against ₹1.91L Cr DISCOM debt.
                    </div>
                  </div>
                  <div className="secondary-card-footer">
                    <span>View Data Pipeline</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              <Link to="/dispatch" style={{ textDecoration: 'none' }}>
                <div className="secondary-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div className="secondary-card-header">
                      <span className="secondary-card-label">OPTIMIZATION // SCIPY</span>
                      <ArrowUpRight size={16} className="secondary-card-icon" />
                    </div>
                    <div className="secondary-card-title">Stability-Aware Dispatch Model</div>
                    <div className="secondary-card-desc">
                      Mathematical optimization model evaluating renewable-nuclear dispatch, ROCOF limits, synthetic inertia, and frequency response under solar intermittency.
                    </div>
                  </div>
                  <div className="secondary-card-footer">
                    <span>View Optimization Model</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              <Link to="/indore" style={{ textDecoration: 'none' }}>
                <div className="secondary-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div className="secondary-card-header">
                      <span className="secondary-card-label">MONTE CARLO // 2,000 RUNS</span>
                      <ArrowUpRight size={16} className="secondary-card-icon" />
                    </div>
                    <div className="secondary-card-title">Indore Micro Universe Engine</div>
                    <div className="secondary-card-desc">
                      Stochastic simulation engine testing a 50-household solar microgrid across 2,000 parallel years under monsoon cloud variance and tariff shocks.
                    </div>
                  </div>
                  <div className="secondary-card-footer">
                    <span>Explore Simulation Engine</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 07: CREDENTIALS & THE CREATIVE TOOLKIT ═══════════ */}
        <section id="about" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="CREDENTIALS"
              title="Creative Toolkit & Background"
              kicker="Formal Electrical Engineering at SGSITS Indore + modern design, 3D, and real-time tech stack."
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                  Electrical Engineering @ SGSITS Indore (2023 – 2027)
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.35rem', fontSize: '0.98rem' }}>
                  Shri G. S. Institute of Technology and Science (SGSITS), Indore. Grounded in Power Systems, Control Theory, Signal Processing, and Optimization. This engineering training brings mathematical rigor, physical feasibility, and systems-level thinking to every brand and product universe I architect.
                </p>

                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Craft & Technical Capabilities
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                  {[
                    'Brand Worldbuilding & Lore',
                    '0-to-1 Digital Product Design',
                    'Figma & Design Systems',
                    'Physical EDC Hardware (CNC Brass)',
                    'Packaging & Unboxing Specs',
                    'Real-Time WebSockets (Socket.io)',
                    'Spline 3D & WebGL Spatial UX',
                    'Analog 35mm Cinematography',
                    'Python & Systems Modeling'
                  ].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        padding: '0.35rem 0.75rem',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.75rem'
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}>
                  DOWNLOAD RESUME DOSSIERS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <button
                    onClick={() => handleDownloadResume('Creative')}
                    className="hero-cta hero-cta-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <FileText size={16} />
                    <span>Download Creative Director / Product Resume</span>
                  </button>

                  <button
                    onClick={() => handleDownloadResume('Technical')}
                    className="hero-cta"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <FileText size={16} />
                    <span>Download Systems & Technical CV</span>
                  </button>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Targeting Brand Architect, Creative Director, 0-to-1 Product Designer, and Creative Technologist opportunities.
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ CHAPTER 08: DIRECT INQUIRIES & COLLABORATION ═══════════ */}
        <section id="contact" className="chapter-section">
          <RevealSection>
            <ChapterHeader
              badge="COLLABORATE"
              title="Direct Inquiries & Collaboration"
              kicker="Ready to build iconic brands, 0-to-1 digital products, or spatial experiences? Send a message directly below."
            />

            <div className="connect-section" style={{ textAlign: 'left', maxWidth: '720px', margin: '0 auto' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSent(true);
                  setTimeout(() => setFormSent(false), 4000);
                  e.target.reset();
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="contact-input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="contact-input"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your message regarding creative roles, brand direction, product architecture, or collaboration..."
                  required
                  rows={4}
                  className="contact-input"
                  style={{ resize: 'vertical' }}
                />
                <button
                  type="submit"
                  className="hero-cta hero-cta-primary"
                  style={{ alignSelf: 'flex-start', padding: '0.65rem 1.6rem' }}
                >
                  {formSent ? (
                    <>
                      <Check size={16} color="#34D399" />
                      <span style={{ color: '#34D399' }}>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              <div style={{
                display: 'flex',
                gap: '0.85rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <button
                  onClick={handleCopyEmail}
                  className="hero-cta"
                  title="Click to copy email address"
                >
                  <span>utk9rsh@gmail.com</span>
                  {copiedEmail ? <Check size={16} color="#34D399" /> : <Copy size={16} />}
                  {copiedEmail && <span style={{ color: '#34D399', fontWeight: 600 }}>Copied!</span>}
                </button>

                <a
                  href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta"
                >
                  <ExternalLink size={16} />
                  <span>LinkedIn Profile</span>
                </a>

                <Link
                  to="/desktop"
                  className="hero-cta"
                  title="Launch Y2K Retro Desktop"
                >
                  <Monitor size={16} />
                  <span>Launch Y2K Retro Desktop ↗</span>
                </Link>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ═══════════ SITE FOOTER ═══════════ */}
        <Footer />

      </div>

      {/* Floating Keyboard Command Palette (⌘K) */}
      <CommandPalette
        onDownloadResume={handleDownloadResume}
        onCopyEmail={handleCopyEmail}
      />
    </div>
  );
}
