import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header({
  brandText = 'UG',
  brandTo = '/',
  showBack = false,
  backText = '← Back',
  backTo = '/',
  navItems = null,
  children = null
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('');
  const isHome = location.pathname === '/' || location.pathname === '/creative';

  // Default nav items (Creative)
  const defaultNavItems = [
    { label: 'Shipped', targetId: 'shipped' },
    { label: 'Products', targetId: 'products' },
    { label: 'Energy & Grid', targetId: 'energy' },
    { label: 'Explorations', targetId: 'explorations' },
    { label: 'Essays', targetId: 'essays' },
    { label: 'About', targetId: 'about' }
  ];

  const items = navItems || defaultNavItems;

  // Track active section via IntersectionObserver on homepage
  useEffect(() => {
    if (!isHome) return;

    const observerCallback = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visible[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-10% 0px -60% 0px',
      threshold: [0, 0.2, 0.5]
    });

    items.forEach((item) => {
      const el = document.getElementById(item.targetId);
      if (el) observer.observe(el);
    });

    const contactEl = document.getElementById('contact');
    if (contactEl) observer.observe(contactEl);

    return () => observer.disconnect();
  }, [items, isHome, location.pathname]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (isHome) {
      const el = document.getElementById(targetId);
      if (el) {
        const headerHeight = 72;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
        setActiveId(targetId);
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const handleBackNavigation = (e, fallbackPath) => {
    if (window.history.state && window.history.state.idx > 0) {
      e.preventDefault();
      navigate(-1);
    } else if (fallbackPath) {
      e.preventDefault();
      navigate(fallbackPath);
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
      setActiveId('');
    } else {
      navigate(brandTo || '/');
    }
  };

  return (
    <header className="site-header-sticky">
      <div className="site-header-inner">
        {/* ─── Left: Brand or Back ─── */}
        <div className="nav-brand-group">
          {showBack ? (
            <Link
              to={backTo}
              className="nav-back-btn"
              onClick={(e) => handleBackNavigation(e, backTo)}
            >
              {backText}
            </Link>
          ) : (
            <Link
              to={brandTo}
              className="nav-brand-link"
              onClick={handleScrollToTop}
              title="Scroll to Top · Creative & Engineering Systems"
            >
              <span className="nav-brand-name">{brandText}</span>
              <span className="nav-brand-dot" title="Live Grid Telemetry — 50.0Hz"></span>
              <span className="nav-brand-telemetry">[Indore]</span>
            </Link>
          )}
        </div>

        {/* ─── Center: Are.na-style Nav Links ─── */}
        <nav className="nav-menu-wrapper" aria-label="Main Navigation">
          <div className="nav-menu">
            {items.map((item) => {
              const isActive = activeId === item.targetId;
              return (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={(e) => handleScrollTo(e, item.targetId)}
                  className={`nav-item-btn ${isActive ? 'is-active' : ''}`}
                >
                  <span className="nav-item-text">{item.label}</span>
                  {isActive && <span className="nav-item-active-dot">·</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ─── Right: Contact Pill + Theme Toggle ─── */}
        <div className="nav-actions">
          {children}
          <button
            type="button"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className={`nav-contact-pill ${activeId === 'contact' ? 'is-active' : ''}`}
          >
            Contact
          </button>
          <ThemeToggle showLabel={false} className="nav-theme-toggle" />
        </div>
      </div>
    </header>
  );
}
