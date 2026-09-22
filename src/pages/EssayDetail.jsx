import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { essaysData } from '../data/essaysData';
import Header from '../components/Header';

// Parses inline formatting: **bold** and *italic*
function renderInline(text) {
  if (!text) return null;
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts;
}

// Parses raw markdown into structured React elements
function renderEssayContent(rawText) {
  if (!rawText) return null;

  const rawBlocks = rawText.split(/\n\s*\n/);

  return rawBlocks.map((block, bIdx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading: ### Heading text
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^###\s+/, '');

      if (trimmed.includes("Author's Working Canvas")) {
        return (
          <div key={bIdx} style={{
            marginTop: '2.75rem',
            marginBottom: '1.25rem',
            padding: '0.85rem 1.15rem',
            background: 'var(--bg-subtle)',
            border: '1px dashed var(--accent-amber-border)',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: 'var(--accent-amber)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>✎</span>
            <span>{headingText}</span>
          </div>
        );
      }

      return (
        <h3 key={bIdx} className="essay-heading">
          {renderInline(headingText)}
        </h3>
      );
    }

    const lines = trimmed.split('\n');

    // Numbered list block (e.g. 1. ... 2. ...)
    const isNumberedList = lines.every((l) => /^\d+\.\s+/.test(l.trim()));
    if (isNumberedList && lines.length > 0) {
      return (
        <ol key={bIdx} className="essay-list essay-ordered-list">
          {lines.map((l, lIdx) => {
            const itemText = l.trim().replace(/^\d+\.\s+/, '');
            return (
              <li key={lIdx} className="essay-list-item">
                {renderInline(itemText)}
              </li>
            );
          })}
        </ol>
      );
    }

    // Bullet list block (e.g. - ... or * ...)
    const isBulletList = lines.every((l) => /^[-*]\s+/.test(l.trim()));
    if (isBulletList && lines.length > 0) {
      return (
        <ul key={bIdx} className="essay-list essay-bullet-list">
          {lines.map((l, lIdx) => {
            const itemText = l.trim().replace(/^[-*]\s+/, '');
            return (
              <li key={lIdx} className="essay-list-item">
                {renderInline(itemText)}
              </li>
            );
          })}
        </ul>
      );
    }

    // Mixed lines in block (e.g. intro sentence followed by bullet points)
    if (lines.some((l) => /^[-*]|\d+\.\s+/.test(l.trim()))) {
      return (
        <div key={bIdx} className="essay-block">
          {lines.map((line, lIdx) => {
            const lTrim = line.trim();
            if (!lTrim) return null;
            if (/^\d+\.\s+/.test(lTrim)) {
              return (
                <div key={lIdx} className="essay-list-item-single">
                  <span className="essay-list-num">{lTrim.match(/^\d+/)[0]}.</span>
                  <div>{renderInline(lTrim.replace(/^\d+\.\s+/, ''))}</div>
                </div>
              );
            }
            if (/^[-*]\s+/.test(lTrim)) {
              return (
                <div key={lIdx} className="essay-list-item-single">
                  <span className="essay-list-bullet">—</span>
                  <div>{renderInline(lTrim.replace(/^[-*]\s+/, ''))}</div>
                </div>
              );
            }
            return (
              <p key={lIdx} className="essay-paragraph" style={{ marginBottom: '0.5rem' }}>
                {renderInline(lTrim)}
              </p>
            );
          })}
        </div>
      );
    }

    // Standard paragraph
    return (
      <p key={bIdx} className="essay-paragraph">
        {renderInline(trimmed)}
      </p>
    );
  });
}

export default function EssayDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const essay = essaysData.find((item) => item.id === id);

  if (!essay) {
    return <Navigate to="/essays" replace />;
  }

  // Find index for next / previous links
  const currentIndex = essaysData.findIndex((item) => item.id === id);
  const prevEssay = currentIndex > 0 ? essaysData[currentIndex - 1] : null;
  const nextEssay = currentIndex < essaysData.length - 1 ? essaysData[currentIndex + 1] : null;

  return (
    <div className="container" style={{ maxWidth: '860px' }}>
      {/* Header */}
      <Header brandText="← All Essays" brandTo="/essays" showBack={true} backTo="/" backText="Home" />

      {/* Metadata Pill */}
      <div style={{ margin: '1.5rem 0 0.8rem 0' }}>
        <span
          className="status-pill"
          style={{
            background: essay.status === 'working-thesis' ? 'var(--accent-amber-light)' : 'var(--accent-purple-light)',
            color: essay.status === 'working-thesis' ? 'var(--accent-amber)' : 'var(--accent-purple)',
            borderColor: essay.status === 'working-thesis' ? 'var(--accent-amber-border)' : 'var(--accent-purple-border)',
            fontWeight: 600
          }}
        >
          {essay.category} // {essay.date} {essay.status === 'working-thesis' ? '// WORKING THESIS' : ''}
        </span>
      </div>

      {/* Title */}
      <h1 className="page-title" style={{ fontSize: '2.1rem', marginBottom: '1rem', lineHeight: '1.3' }}>
        {essay.title}
      </h1>

      {/* Excerpt Lead */}
      <p className="page-summary" style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', fontStyle: 'italic' }}>
        "{essay.excerpt}"
      </p>

      {/* Working Thesis Banner */}
      {essay.status === 'working-thesis' && (
        <div style={{
          background: 'var(--bg-subtle)',
          borderLeft: '3px solid var(--accent-amber)',
          padding: '0.85rem 1.15rem',
          borderRadius: '0 6px 6px 0',
          marginBottom: '2.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          <strong style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>WORKING THESIS // ACTIVE DRAFT:</strong> This piece introduces the foundational premise, intellectual dilemma, and initial framework. The working canvas at the bottom is open for progressive writing and deep synthesis.
        </div>
      )}

      {/* Clean Rendered Content Block */}
      <article className="essay-body">
        {renderEssayContent(essay.content)}
      </article>

      {/* Next / Previous Essay Navigation */}
      <div style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {prevEssay ? (
          <Link to={`/essays/${prevEssay.id}`} style={{ textDecoration: 'none', flex: 1, minWidth: '220px' }}>
            <div className="vertical-card" style={{ padding: '1rem' }}>
              <div className="artifact-icon">← PREVIOUS ESSAY</div>
              <div className="artifact-name" style={{ fontSize: '0.95rem' }}>{prevEssay.title}</div>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}

        {nextEssay ? (
          <Link to={`/essays/${nextEssay.id}`} style={{ textDecoration: 'none', flex: 1, minWidth: '220px' }}>
            <div className="vertical-card" style={{ padding: '1rem', textAlign: 'right' }}>
              <div className="artifact-icon">NEXT ESSAY →</div>
              <div className="artifact-name" style={{ fontSize: '0.95rem' }}>{nextEssay.title}</div>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2026</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <Link
            to="/essays"
            className="footer-link"
            onClick={(e) => {
              if (window.history.state && window.history.state.idx > 0) {
                e.preventDefault();
                navigate(-1);
              }
            }}
          >
            All Essays
          </Link>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
