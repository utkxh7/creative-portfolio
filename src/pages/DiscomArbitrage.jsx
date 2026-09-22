import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function DiscomArbitrage() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title & Headline */}
      <h1 className="page-title">DISCOM Revenue Leakage & Battery Arbitrage Analysis</h1>
      <p className="page-summary">
        An empirical data analysis pipeline in Python evaluating state-level battery storage arbitrage potential across India using public POSOCO/Grid-India demand data and real Indian Energy Exchange (IEX) market clearing prices.
      </p>

      {/* Metadata Grid */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Data Analysis Pipeline</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">Data Engineer & Analyst</div>
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
          <div className="meta-value">Python, pandas, matplotlib</div>
        </div>
        <div>
          <div className="meta-label">Data Sources</div>
          <div className="meta-value">POSOCO / Grid-India & IEX</div>
        </div>
      </div>

      {/* Core Question Section */}
      <div className="content-section">
        <div className="section-label">Core Question</div>
        <div className="section-body">
          <p>
            This project extends earlier theoretical research on decentralized battery storage economics (<em>"Decentralized Energy Storage and Grid Economics Model"</em>) — moving from theoretical scenario-based modeling to data-driven empirical analysis using real, public electricity market and demand data.
          </p>
        </div>
        <div className="quote-card">
          "Where in India does battery storage arbitrage (charging during cheap off-peak hours, discharging during expensive peak hours) offer the largest theoretical opportunity, and how does that opportunity vary over time?"
        </div>
      </div>

      {/* Key Findings Section */}
      <div className="content-section">
        <div className="section-label">Key Findings</div>
        <div className="section-body">
          <ul className="clean-list">
            <li>
              <strong>1. Maharashtra, UP, and Gujarat lead theoretical opportunity:</strong> Maharashtra (~₹185 Cr/day), Uttar Pradesh (~₹180 Cr/day), and Gujarat (~₹158 Cr/day) show the largest arbitrage opportunity, consistent with their status as India's largest power-consuming states.
            </li>
            <li>
              <strong>2. Meaningful Peak/Off-Peak Spread:</strong> Daily arbitrage spread averaged <strong>₹2,871/MWh</strong> across June 2026, ranging from ₹1,139 to ₹5,057/MWh — a non-trivial price gap confirming real arbitrage potential.
            </li>
            <li>
              <strong>3. Sunday Volatility Collapse (~50% drop):</strong> Sunday spreads average ~₹1,679/MWh vs ~₹3,333/MWh on Wednesday. Lower weekend commercial/industrial demand compresses the peak-vs-offpeak price gap, proving battery dispatch strategies must weight weekday cycling more heavily.
            </li>
          </ul>
        </div>

        {/* Charts */}
        <div style={{ margin: '2rem 0 1.5rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img
            src="/assets/top10_arbitrage_states.png"
            alt="Top 10 States by Arbitrage Opportunity Bar Chart"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            State Arbitrage Ranking: Theoretical daily opportunity size (₹ Cr/day) across Indian states based on demand volume × peak price spread.
          </div>
        </div>

        <div style={{ margin: '0 0 2.5rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img
            src="/assets/daily_spread_trend.png"
            alt="Daily Price Spread Trend across June 2026"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Daily Price Spread Trend: June 2026 15-minute block IEX price spread showing periodic Sunday dips driven by lower commercial demand.
          </div>
        </div>
      </div>

      {/* Process & Debugging Section */}
      <div className="content-section">
        <div className="section-label">Process & Debugging (Real Execution Log)</div>
        <div className="section-body">
          <p>
            Excerpted directly from `PROJECT_LOG.md` — documenting raw execution order errors, unit ambiguities, and data pipeline bugs encountered during development:
          </p>
        </div>

        <div className="duality-grid" style={{ marginTop: '1.25rem' }}>
          <div className="duality-card">
            <div className="duality-card-title">Day 1: Filter-Order Execution Bug</div>
            <div className="duality-card-body">
              <strong>Bug:</strong> Filtered out excluded state columns AFTER calling <code>pandas.melt()</code> instead of before. The filter ran without error but had zero effect because melt had already processed the unfiltered headers.
              <br /><br />
              <strong>Fix:</strong> Reordered execution to filter <code>state_cols</code> prior to calling <code>melt()</code>.
            </div>
          </div>

          <div className="duality-card">
            <div className="duality-card-title">Day 1: Discontinued UT Mergers</div>
            <div className="duality-card-body">
              <strong>Anomaly:</strong> DD and DNH columns were 86.8% missing post-2020.
              <br /><br />
              <strong>Resolution:</strong> Investigated root cause — Daman & Diu and Dadra & Nagar Haveli merged in Jan 2020 under DNHDDPDCL. Dropped both columns rather than imputing, since data was structurally discontinued rather than randomly missing.
            </div>
          </div>

          <div className="duality-card">
            <div className="duality-card-title">Day 2: IEX Export & Scoping Bugs</div>
            <div className="duality-card-body">
              <strong>Bug:</strong> IEX web portal silently ignored requested date ranges and defaulted to current day. Caught by auditing output date columns.
              <br /><br />
              <strong>Fix & Scoping:</strong> Filtered text summary rows using <code>pd.to_numeric(..., errors='coerce')</code> and scoped demand data to April 2022 onward to match IEX data availability.
            </div>
          </div>

          <div className="duality-card">
            <div className="duality-card-title">Day 3: Unit Ambiguity & 1000x Scaling Error</div>
            <div className="duality-card-body">
              <strong>Bug:</strong> Initial score multiplied MU (Million Units) directly by ₹/MWh without converting MU to MWh (1 MU = 1,000 MWh), understating total Rupee value by 1,000x.
              <br /><br />
              <strong>Fix:</strong> Validated demand magnitude against Maharashtra real consumption and scaled by 1,000 to output accurate ₹ Crores figures.
            </div>
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
              Data cleaning scripts (`analysis.py`), IEX price calculation logic, output CSV rankings (`state_arbitrage_ranking.csv`), Matplotlib visualizations (`top10_arbitrage_states.png`, `daily_spread_trend.png`), and Sunday vs. weekday volatility findings.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Conceptual</div>
            <div className="duality-card-body">
              Battery asset financial ROI (the score is a directional opportunity proxy, not accounting for round-trip efficiency losses, battery degradation, or shiftable load limits), and automated multi-season ingestion.
            </div>
          </div>
        </div>
      </div>

      {/* Open Questions */}
      <div className="content-section">
        <div className="section-label">Open Questions & Future Extensions</div>
        <ul className="clean-list">
          <li>Automating incremental IEX price ingestion via scheduled scraper/workflow</li>
          <li>Factoring in DISCOM AT&C losses (PFC reports) for composite leakage exposure scoring</li>
          <li>Extending dataset across all four seasons to evaluate winter/monsoon arbitrage stability</li>
        </ul>
      </div>

      {/* Where the Model Breaks & Honest Constraints */}
      <div className="content-section">
        <div className="section-label">Where the Model Breaks & Honest Constraints</div>
        <div className="retrospective-card">
          <div className="retrospective-title">
            ⚖️ The Battery Degradation Tax vs. Spot Arbitrage
          </div>
          <div className="retrospective-body">
            While the raw Day-Ahead market spread averaged ₹2,871/MWh (₹2.87/kWh), pure energy price arbitrage alone is financially fragile: Lithium iron phosphate (LFP) battery cells incur ~₹3.50–₹5.00 per cycled kWh in degradation and capital amortization costs. Battery storage only achieves commercial profitability when stacked with <em>ancillary services</em> (frequency regulation, peak-capacity availability contracts, and avoided transmission wheeling fees). A pure spot-price arbitrage score is a valuable directional proxy, but not a standalone project finance model.
          </div>
        </div>
      </div>

      {/* Codebase Artifacts */}
      <div className="content-section">
        <div className="section-label">Codebase Artifacts</div>
        <div className="artifact-grid">
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PYTHON</div>
              <div className="artifact-name">analysis.py</div>
              <div className="artifact-type">Cleaned data ingestion & arbitrage scoring pipeline</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">MARKDOWN</div>
              <div className="artifact-name">PROJECT_LOG.md</div>
              <div className="artifact-type">Detailed day-by-day decision & bug resolution log</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">MARKDOWN</div>
              <div className="artifact-name">README.md</div>
              <div className="artifact-type">Technical documentation & methodology breakdown</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">CSV OUTPUT</div>
              <div className="artifact-name">state_arbitrage_ranking.csv</div>
              <div className="artifact-type">Ranked output of all 32 Indian states & UTs</div>
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
