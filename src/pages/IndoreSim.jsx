import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function IndoreSim() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title & Headline */}
      <h1 className="page-title">Indore Micro Universe</h1>
      <p className="page-summary">
        A 2,000-run Monte Carlo financial stress-test engine in Python — evaluating the 365-day
        solvency risk of a 50-household peer-to-peer (P2P) solar microgrid cluster in Indore under
        monsoon disruptions and regulatory tariff shocks.
      </p>

      {/* Metadata Grid */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Monte Carlo Risk Engine</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">Simulation Architect</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">2026</div>
        </div>
        <div>
          <div className="meta-label">Status</div>
          <div className="meta-value">
            <span className="status-pill">
              <span className="status-dot"></span>
              Functional Prototype
            </span>
          </div>
        </div>
        <div>
          <div className="meta-label">Stack</div>
          <div className="meta-value">Python, NumPy, Pandas, Seaborn</div>
        </div>
        <div>
          <div className="meta-label">Location</div>
          <div className="meta-value">Indore, MP, India</div>
        </div>
      </div>

      {/* Core Question */}
      <div className="content-section">
        <div className="section-label">The Core Question</div>
        <div className="section-body">
          <p>
            Can a 50-household community solar trading network in a tier-2 Indian city survive severe real-world disruptions — such as consecutive failed monsoons and sudden regulatory tariff spikes — without going bankrupt?
          </p>
          <p>
            Standard financial projections assume ideal weather and stable government tariffs. This engine subjects the microgrid model to <strong>2,000 parallel simulated years</strong> introducing randomized weather penalties and policy shocks.
          </p>
        </div>
      </div>

      {/* Key Results Grid */}
      <div className="content-section">
        <div className="section-label">Simulation Outcomes</div>
        <div className="artifact-grid" style={{ marginTop: '1rem' }}>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">CONFIDENCE</div>
              <div className="artifact-name" style={{ fontSize: '1.6rem', color: '#10B981' }}>&gt; 99%</div>
              <div className="artifact-type">solvency confidence across 2,000 simulated operating years</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">BASE CASE</div>
              <div className="artifact-name" style={{ fontSize: '1.6rem' }}>₹439</div>
              <div className="artifact-type">ideal daily community savings under optimal solar irradiance</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">RISK-ADJUSTED</div>
              <div className="artifact-name" style={{ fontSize: '1.6rem' }}>~₹250</div>
              <div className="artifact-type">mean daily savings accounting for monsoon drops & policy shocks</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">FAILURE RISK</div>
              <div className="artifact-name" style={{ fontSize: '1.6rem' }}>&lt; 1%</div>
              <div className="artifact-type">probability of daily savings dropping below operational threshold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stochastic Architecture */}
      <div className="content-section">
        <div className="section-label">Stochastic Risk Engine Architecture</div>
        <ul className="clean-list" style={{ marginTop: '0.75rem' }}>
          <li>
            <strong>Stochastic Weather Model:</strong> Simulates monsoon impact by stochastically reducing solar generation between 20% and 60% based on historical seasonal variance.
          </li>
          <li>
            <strong>Policy Shock Generator:</strong> Triggers a 30% probability event of regulatory tariff changes, scaling wheeling charges from baseline ₹1.00 up to ₹3.00/kWh.
          </li>
          <li>
            <strong>Dynamic Cooling Demand Response:</strong> Adjusts residential air conditioning and ceiling fan loads proportionally with monsoon temperature and humidity swings.
          </li>
        </ul>
      </div>

      {/* Simulation Visual Plots */}
      <div className="content-section">
        <div className="section-label">Simulation Visual Outputs</div>

        <div style={{ margin: '1.25rem 0 2rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img
            src="/assets/indore_histogram.png"
            alt="Likelihood of Daily Savings Histogram across 2,000 Monte Carlo simulations"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Savings Distribution: Stacked histogram showing distribution of daily community savings across 2,000 runs, separating stable years from policy shock years.
          </div>
        </div>

        <div style={{ margin: '0 0 2.5rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img
            src="/assets/indore_heatmap.png"
            alt="Risk Heatmap quantifying correlation between Policy Risk and Weather Risk"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Risk Heatmap: Cross-evaluating Wheeling Charges (Policy Risk) against Solar Drops (Monsoon Severity) to locate breaking points.
          </div>
        </div>
      </div>

      {/* What's Real vs Conceptual */}
      <div className="content-section">
        <div className="section-label">What's Real vs. What's Conceptual</div>
        <div className="duality-grid">
          <div className="duality-card">
            <div className="duality-card-title">Real</div>
            <div className="duality-card-body">
              The Monte Carlo simulation code (`StressTest.py`), stochastic probability formulas, cash flow calculations, 99% solvency confidence outputs, and Seaborn visual chart rendering.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Conceptual</div>
            <div className="duality-card-body">
              The 50-household physical solar panels, hardware smart meters, and live P2P settlement on the DISCOM distribution grid in Indore.
            </div>
          </div>
        </div>
      </div>

      {/* Honest Technical Note */}
      <div className="content-section">
        <div className="quote-card">
          "No, this is a computational financial stress-testing model designed to quantify risk bounds under adverse weather and policy scenarios before capital deployment."
        </div>
      </div>

      {/* Open Questions */}
      <div className="content-section">
        <div className="section-label">Open Questions & Next Iterations</div>
        <ul className="clean-list">
          <li>Integrating real hourly irradiance data for Indore instead of synthetic solar reduction profiles</li>
          <li>Modeling household battery degradation over multi-year operational horizons</li>
        </ul>
      </div>

      {/* Codebase Artifacts */}
      <div className="content-section">
        <div className="section-label">Codebase Artifacts</div>
        <div className="artifact-grid">
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PYTHON</div>
              <div className="artifact-name">StressTest.py</div>
              <div className="artifact-type">2,000-run Monte Carlo engine & chart generator</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PYTHON</div>
              <div className="artifact-name">Billing.py</div>
              <div className="artifact-type">P2P bill breakdown & tariff calculation logic</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">MARKDOWN</div>
              <div className="artifact-name">STORY.md</div>
              <div className="artifact-type">Project narrative & honest assessment documentation</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">MARKDOWN</div>
              <div className="artifact-name">README.md</div>
              <div className="artifact-type">Engine documentation & step-by-step setup guide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2025</span>
        <div className="footer-links">
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
          <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
