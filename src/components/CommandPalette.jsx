import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, Mail, ExternalLink, Activity, Database, Cpu, Zap, X, Flame, BookOpen, Camera, Monitor, Sparkles } from 'lucide-react';

const ACTIONS = [
  {
    id: 'discom',
    title: 'DISCOM Revenue Arbitrage Pipeline',
    category: 'Model',
    icon: Database,
    route: '/discom',
    keywords: 'discom posoco iex tariff battery storage arbitrage python'
  },
  {
    id: 'dispatch',
    title: 'Stability-Aware Dispatch & ROCOF Model',
    category: 'Optimization',
    icon: Zap,
    route: '/dispatch',
    keywords: 'dispatch rofoc synthetic inertia frequency microgrid optimization power'
  },
  {
    id: 'indore',
    title: 'Indore Micro Universe (Monte Carlo Engine)',
    category: 'Simulation',
    icon: Activity,
    route: '/indore',
    keywords: 'indore monte carlo simulation microgrid stochastic solar'
  },
  {
    id: 'nuclear',
    title: 'The Captive Nuclear Loophole',
    category: 'Paper',
    icon: Cpu,
    route: '/nuclear-loophole',
    keywords: 'nuclear captive atomic energy act capex base load'
  },
  {
    id: 'energy-stack',
    title: 'The 8-Layer Energy Industry Stack',
    category: 'Taxonomy',
    icon: Activity,
    route: '/energy-stack',
    keywords: 'energy stack value chain capex billing'
  },
  {
    id: 'notes',
    title: 'Decentralized Energy Storage Manuscript',
    category: 'Manuscript',
    icon: FileText,
    route: '/notes',
    keywords: 'academic paper manuscript substation line loss i2r'
  },
  {
    id: 'sidekick',
    title: 'Sidekick™ Full-Stack Systems Architecture',
    category: 'Product',
    icon: Cpu,
    route: '/sidekick',
    keywords: 'sidekick product full stack state engine co-presence render'
  },
  {
    id: 'sidekick-deck',
    title: 'Sidekick™ 9-Chapter Case Study Deck',
    category: 'Deck',
    icon: Sparkles,
    route: '/sidekick/presentation',
    keywords: 'sidekick presentation case study slides deck chapters'
  },
  {
    id: 'chingari',
    title: 'Chingari — Collectible EDC Brand Universe',
    category: 'Brand',
    icon: Flame,
    route: '/chingari',
    keywords: 'chingari matchbox lighter brand hardware edc brass vercel'
  },
  {
    id: 'chingari-deck',
    title: 'Chingari Brand System Deck (9 Chapters)',
    category: 'Deck',
    icon: Sparkles,
    route: '/chingari/presentation',
    keywords: 'chingari brand presentation slides 9 chapters visual identity'
  },
  {
    id: 'essays',
    title: 'Essays on Money, Mind & Philosophy (13 Works)',
    category: 'Writings',
    icon: BookOpen,
    route: '/essays',
    keywords: 'essays philosophy money mind writings articles thesis'
  },
  {
    id: 'instagram',
    title: 'Visual Archive (@utkarshhguptaaa)',
    category: 'Visual',
    icon: Camera,
    route: '/instagram',
    keywords: 'instagram photography visual archive 35mm photos stills'
  },
  {
    id: 'room',
    title: 'The Room — 3D Spatial Environment (Spline)',
    category: '3D / WebGL',
    icon: Monitor,
    route: '/room',
    keywords: 'room 3d spline spatial canvas webgl interactive'
  },
  {
    id: 'desktop',
    title: 'Y2K Retro Desktop / Sandbox Terminal',
    category: 'Terminal',
    icon: Monitor,
    route: '/desktop',
    keywords: 'desktop y2k retro windows crt terminal easter egg radio player'
  },
  {
    id: 'resume',
    title: 'Download Resume (Business / Data Analyst)',
    category: 'Document',
    icon: FileText,
    action: 'resume',
    keywords: 'resume cv download analyst pdf'
  },
  {
    id: 'email',
    title: 'Copy Email (utk9rsh@gmail.com)',
    category: 'Contact',
    icon: Mail,
    action: 'email',
    keywords: 'email contact message mail utk9rsh'
  },
  {
    id: 'linkedin',
    title: 'Open LinkedIn Profile',
    category: 'External',
    icon: ExternalLink,
    href: 'https://www.linkedin.com/in/utkarsh-gupta-a2020a251/',
    keywords: 'linkedin profile social'
  }
];

export default function CommandPalette({ onDownloadResume, onCopyEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Filter items
  const filtered = ACTIONS.filter(action => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      action.title.toLowerCase().includes(q) ||
      action.category.toLowerCase().includes(q) ||
      action.keywords.toLowerCase().includes(q)
    );
  });

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = (item) => {
    setIsOpen(false);
    if (item.route) {
      navigate(item.route);
    } else if (item.action === 'resume') {
      onDownloadResume?.('Analyst');
    } else if (item.action === 'email') {
      onCopyEmail?.();
    } else if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      {/* Floating launcher badge in bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="cmd-palette-launcher"
        title="Open Command Palette (⌘K / Ctrl+K)"
        aria-label="Open Command Palette"
      >
        <span className="cmd-kbd">⌘K</span>
        <span className="cmd-launcher-text">NAVIGATE</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="cmd-backdrop" onClick={() => setIsOpen(false)}>
          <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-header">
              <Search size={16} className="cmd-search-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Jump to a model, simulation, paper, or action..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                className="cmd-input"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="cmd-close-btn"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <div className="cmd-list">
              {filtered.length === 0 ? (
                <div className="cmd-empty">No matching models or commands found.</div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`cmd-item ${isSelected ? 'cmd-item-active' : ''}`}
                    >
                      <div className="cmd-item-left">
                        <Icon size={15} className="cmd-item-icon" />
                        <span className="cmd-item-title">{item.title}</span>
                      </div>
                      <div className="cmd-item-right">
                        <span className="cmd-item-cat">{item.category}</span>
                        <ArrowRight size={13} className="cmd-item-arrow" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="cmd-footer">
              <span>Use <kbd className="cmd-sub-kbd">↑</kbd> <kbd className="cmd-sub-kbd">↓</kbd> to navigate</span>
              <span><kbd className="cmd-sub-kbd">↵</kbd> to select</span>
              <span><kbd className="cmd-sub-kbd">ESC</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
