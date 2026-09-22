import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SITE_DATA } from '../data/projectsData';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IndoreSimWidget from '../components/IndoreSimWidget';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = SITE_DATA.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="container">
        <Link to="/" className="back-btn">
          <ArrowLeft size={14} /> Index
        </Link>
        <h1 className="detail-title">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" backText="← Index" />

      {/* Project Title */}
      <h1 className="detail-title">{project.title}</h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        {project.summary}
      </p>

      {/* Metadata Grid (Haoqi style) */}
      <div className="detail-meta-grid">
        <div>
          <div className="meta-label">Category</div>
          <div className="meta-value">{project.category}</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">{project.role || 'Creator & Engineer'}</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">{project.year}</div>
        </div>
        {project.tags && (
          <div>
            <div className="meta-label">Stack / Tags</div>
            <div className="meta-value">{project.tags.join(', ')}</div>
          </div>
        )}
      </div>

      {/* Full-bleed Media Frame */}
      {project.image && (
        <div className="detail-media-frame">
          <img src={project.image} alt={project.title} className="detail-media-img" />
        </div>
      )}

      {/* Interactive Sim if enabled */}
      {project.hasInteractiveSim && <IndoreSimWidget />}

      {/* Project Description & Overview */}
      <div className="detail-section">
        <h2 className="section-heading">Overview & Intent</h2>
        <div className="section-body">
          <p>{project.description}</p>
        </div>
      </div>

      {/* Key Metrics if available */}
      {project.keyMetrics && (
        <div className="detail-section">
          <h2 className="section-heading">Key Technical Outcomes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {project.keyMetrics.map((m, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{m.label}</div>
                <div style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Written Content if poetry/prose */}
      {project.content && (
        <div className="detail-section">
          <h2 className="section-heading">Full Text</h2>
          <blockquote style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            lineHeight: '1.8',
            whiteSpace: 'pre-line',
            borderLeft: '2px solid rgba(255,255,255,0.2)',
            paddingLeft: '1.2rem',
            margin: '1rem 0'
          }}>
            {project.content}
          </blockquote>
        </div>
      )}

      <div style={{ margin: '4rem 0 2rem 0' }}>
        <Link to="/" className="back-btn">
          <ArrowLeft size={14} /> Back to Index
        </Link>
      </div>

      <Footer />
    </div>
  );
}
