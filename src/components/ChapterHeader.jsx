import React from 'react';

/**
 * ChapterHeader — Architectural Section Header
 * Combines monospace index, hairline horizontal rule, title, and optional kicker.
 * Designed with Utkarsh's Are.na / academic minimalist aesthetic.
 */
export default function ChapterHeader({ num, title, kicker, badge }) {
  return (
    <div className="chapter-header-wrap">
      <div className="chapter-index-row">
        <div className="chapter-num-badge">
          <span className="chapter-dot" />
          {num && <span className="chapter-num">{num}</span>}
          {badge && <span className="chapter-tag">{badge}</span>}
        </div>
        <div className="chapter-rule" />
      </div>

      <h2 className="chapter-title">{title}</h2>

      {kicker && <p className="chapter-kicker">{kicker}</p>}
    </div>
  );
}
