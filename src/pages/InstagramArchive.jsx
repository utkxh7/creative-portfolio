import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ExternalLink, X, ChevronLeft, ChevronRight, Info, Download, Grid, Layers } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ─── Photo Lightbox ─── */
function Lightbox({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {hasPrev && (
          <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous">
            <ChevronLeft size={28} />
          </button>
        )}

        {hasNext && (
          <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next">
            <ChevronRight size={28} />
          </button>
        )}

        <img
          src={`/visual-archive/${photo.filename}`}
          alt={photo.originalFilename || 'Visual Archive Photo'}
          className="lightbox-image"
        />

        {/* Photo Metadata Strip */}
        <div className="lightbox-meta">
          <div className="lightbox-meta-left">
            {photo.cameraModel && (
              <span className="lightbox-meta-tag">
                <Camera size={12} />
                {photo.cameraMake ? `${photo.cameraMake} ${photo.cameraModel}` : photo.cameraModel}
              </span>
            )}
            {photo.focalLength && (
              <span className="lightbox-meta-tag">{photo.focalLength}mm</span>
            )}
            {photo.aperture && (
              <span className="lightbox-meta-tag">ƒ/{photo.aperture}</span>
            )}
            {photo.iso && (
              <span className="lightbox-meta-tag">ISO {photo.iso}</span>
            )}
          </div>
          <div className="lightbox-meta-right">
            {photo.creationTime && (
              <span className="lightbox-meta-date">
                {new Date(photo.creationTime).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Masonry Grid Item ─── */
function PhotoCard({ photo, index, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  return (
    <div
      className={`masonry-item ${loaded ? 'loaded' : ''} masonry-${photo.orientation}`}
      onClick={() => onClick(index)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <img
        ref={imgRef}
        src={`/visual-archive/${photo.thumbFilename}`}
        alt={photo.originalFilename || `Photo ${index + 1}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="masonry-image"
      />
      <div className="masonry-overlay">
        <div className="masonry-overlay-info">
          {photo.cameraModel && (
            <span className="masonry-camera">
              <Camera size={11} />
              {photo.cameraModel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Pills ─── */
function FilterPill({ active, onClick, children, count }) {
  return (
    <button
      className={`filter-pill ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
      {count !== undefined && <span className="filter-count">{count}</span>}
    </button>
  );
}

/* ─── Main Visual Archive Page ─── */
export default function InstagramArchive() {
  const [manifest, setManifest] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry' or 'grid'

  // Load manifest from synced photos
  useEffect(() => {
    fetch('/visual-archive/manifest.json')
      .then(res => {
        if (!res.ok) throw new Error('No manifest');
        return res.json();
      })
      .then(data => {
        setManifest(data);
        setPhotos(data.photos || []);
      })
      .catch(() => {
        // No synced photos yet — show empty state
        setManifest(null);
        setPhotos([]);
      });
  }, []);

  // Filter logic
  const filteredPhotos = filter === 'all'
    ? photos
    : photos.filter(p => p.orientation === filter);

  const counts = {
    all: photos.length,
    landscape: photos.filter(p => p.orientation === 'landscape').length,
    portrait: photos.filter(p => p.orientation === 'portrait').length,
    square: photos.filter(p => p.orientation === 'square').length
  };

  // Lightbox navigation
  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);
  const nextPhoto = useCallback(() => {
    setLightboxIndex(i => Math.min(i + 1, filteredPhotos.length - 1));
  }, [filteredPhotos.length]);
  const prevPhoto = useCallback(() => {
    setLightboxIndex(i => Math.max(i - 1, 0));
  }, []);

  const hasPhotos = photos.length > 0;

  return (
    <div className="page-wrapper">
      <Header showBack={true} backTo="/" />

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* ─── Hero Section ─── */}
        <section className="hero-section" style={{ paddingBottom: '1.5rem', marginBottom: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#A78BFA',
              boxShadow: '0 0 12px rgba(167, 139, 250, 0.6)'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase'
            }}>
              CINEMATOGRAPHY & VISUAL NOTEBOOK
            </span>
          </div>

          <h1 className="hero-name" style={{ marginBottom: '0.85rem', fontSize: '2.8rem' }}>
            Visual Archive
          </h1>

          <p style={{
            maxWidth: '760px',
            fontSize: '1.05rem',
            lineHeight: '1.75',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>
            A curated stream of atmospheric photography exploring high-contrast backlighting,
            35mm black-and-white forest textures, deep red and purple ambient neon, golden hour
            ocean shorelines, and quiet mountain valley horizons. Each frame trains the aesthetic
            instinct that shapes every digital product and brand universe I architect.
          </p>

          {/* Quote */}
          <div className="quote-card" style={{ maxWidth: '580px', marginBottom: '1.5rem' }}>
            "life's a paradox, mostly — and also i like colors."
          </div>

          {/* Metadata Strip */}
          <div className="meta-grid" style={{ marginBottom: '1.5rem' }}>
            <div>
              <div className="meta-label">Handle</div>
              <div className="meta-value">@utkarshhguptaaa</div>
            </div>
            <div>
              <div className="meta-label">Medium</div>
              <div className="meta-value">Photography & Stills</div>
            </div>
            <div>
              <div className="meta-label">Archive</div>
              <div className="meta-value">
                {hasPhotos ? `${photos.length} Selected Frames` : 'Syncing...'}
              </div>
            </div>
            <div>
              <div className="meta-label">Status</div>
              <div className="meta-value">
                <span className="status-pill">
                  <span className="status-dot"></span>
                  Live Profile
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.instagram.com/utkarshhguptaaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              style={{ color: '#A78BFA', borderColor: 'rgba(167, 139, 250, 0.4)' }}
            >
              <ExternalLink size={15} />
              <span>Instagram (@utkarshhguptaaa) ↗</span>
            </a>
          </div>
        </section>

        {/* ─── Gallery Controls ─── */}
        {hasPhotos && (
          <div className="gallery-controls">
            <div className="gallery-filters">
              <FilterPill active={filter === 'all'} onClick={() => setFilter('all')} count={counts.all}>
                All
              </FilterPill>
              <FilterPill active={filter === 'landscape'} onClick={() => setFilter('landscape')} count={counts.landscape}>
                Landscape
              </FilterPill>
              <FilterPill active={filter === 'portrait'} onClick={() => setFilter('portrait')} count={counts.portrait}>
                Portrait
              </FilterPill>
              {counts.square > 0 && (
                <FilterPill active={filter === 'square'} onClick={() => setFilter('square')} count={counts.square}>
                  Square
                </FilterPill>
              )}
            </div>

            <div className="gallery-view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                onClick={() => setViewMode('masonry')}
                title="Masonry Layout"
              >
                <Layers size={16} />
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid Layout"
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Photo Gallery ─── */}
        {hasPhotos ? (
          <div className={viewMode === 'masonry' ? 'masonry-gallery' : 'grid-gallery'}>
            {filteredPhotos.map((photo, idx) => (
              <PhotoCard key={photo.id || idx} photo={photo} index={idx} onClick={openLightbox} />
            ))}
          </div>
        ) : (
          /* ─── Empty State (before sync) ─── */
          <div className="content-section">
            <div className="section-label">Instagram Profile Capture</div>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              marginTop: '1rem',
              background: '#09090B',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}>
              <img
                src="/instagram-feed/utkarsh_profile_grid.png"
                alt="Utkarsh Gupta Instagram Profile Feed (@utkarshhguptaaa)"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8
            }}>
              <div style={{ color: '#A78BFA', fontWeight: 600, marginBottom: '0.5rem' }}>
                ⚡ SYNC YOUR GOOGLE PHOTOS
              </div>
              <code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
{`cd google-photos-sync
npm install
npm run setup    # One-time OAuth setup
npm run sync     # Fetch & optimize photos`}
              </code>
            </div>
          </div>
        )}

        {/* ─── Sync Metadata Footer ─── */}
        {manifest && (
          <div style={{
            marginTop: '2.5rem',
            padding: '1rem 1.5rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em'
            }}>
              <Info size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
              Synced from Google Photos · {manifest.source} · {new Date(manifest.syncedAt).toLocaleDateString('en-IN', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </div>
            <a
              href="https://www.instagram.com/utkarshhguptaaa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#A78BFA',
                textDecoration: 'none'
              }}
            >
              @utkarshhguptaaa ↗
            </a>
          </div>
        )}

        {/* ─── Footer ─── */}
        <Footer />
      </div>

      {/* ─── Lightbox ─── */}
      {lightboxIndex >= 0 && lightboxIndex < filteredPhotos.length && (
        <Lightbox
          photo={filteredPhotos[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filteredPhotos.length - 1}
        />
      )}
    </div>
  );
}
