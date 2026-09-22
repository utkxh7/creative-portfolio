import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function StabilityDispatch() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title & Headline */}
      <h1 className="page-title">Stability- & Electrolyzer-Aware Dispatch Modeling</h1>
      <p className="page-summary">
        A digital brain simulation for renewable–nuclear industrial microgrids — optimizing
        green hydrogen production while preventing power grid stability deficits in megawatt-scale gigafactories.
      </p>

      {/* Metadata Grid */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Python Simulation & Optimizer</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">Simulation Architect & Developer</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">2025–2026</div>
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
          <div className="meta-value">Python (OOP), pandas, numpy, matplotlib</div>
        </div>
        <div>
          <div className="meta-label">Target Sectors</div>
          <div className="meta-value">Green Hydrogen Hubs & Steel Plants</div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="content-section">
        <div className="section-label">The Core Concept</div>
        <div className="section-body">
          <p>
            Industrial complexes producing green hydrogen (such as Reliance's Jamnagar Gigafactory or Adani's Kutch DRE hubs) face a complex physics bottleneck:
          </p>
        </div>
        <ul className="clean-list" style={{ marginTop: '0.75rem' }}>
          <li><strong>Solar power is cheap but chaotic:</strong> Generation fluctuates wildly throughout the day.</li>
          <li><strong>Nuclear power is stable but rigid:</strong> Baseload reactors cannot ramp up or down rapidly.</li>
          <li><strong>Electrolyzers are sensitive:</strong> Efficiency drops drastically when load falls below 15–20%, and constant power jitter reduces stack lifespan.</li>
        </ul>
        <p className="section-body" style={{ marginTop: '1rem' }}>
          This project implements a Python-based dispatch optimizer sitting between these assets. It uses battery storage to smooth solar spikes and fill nuclear ramps so the electrolyzer receives a steady, high-efficiency power feed.
        </p>
      </div>

      {/* The Secret Sauce */}
      <div className="content-section">
        <div className="section-label">The Secret Sauce — Cost + Grid Stability</div>
        <div className="section-body">
          <p>
            Most standard energy economic models evaluate only financial cost ($/kWh). This model simultaneously tracks <strong>Cost ($) + Grid Stability Violations (Deficit Power MW / Hz)</strong>.
          </p>
          <p>
            It demonstrates that the "cheapest" asset configuration on paper will crash the industrial grid frequency if it lacks sufficient ramp capability or battery power capacity.
          </p>
        </div>
      </div>

      {/* Code Architecture */}
      <div className="content-section">
        <div className="section-label">Python System Architecture</div>
        <div className="section-body">
          <p>
            Built as a modular object-oriented Python codebase simulating minute-by-minute microgrid operation:
          </p>
        </div>
        <div className="artifact-grid" style={{ marginTop: '1rem' }}>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">CLASS</div>
              <div className="artifact-name">NuclearPlant</div>
              <div className="artifact-type">Models rigid baseload output with strict ramp rate limits (0% rapid ramp)</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">CLASS</div>
              <div className="artifact-name">SolarFarm</div>
              <div className="artifact-type">Processes hourly solar irradiance profiles & handles forced curtailment</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">CLASS</div>
              <div className="artifact-name">Electrolyzer</div>
              <div className="artifact-type">Implements get_efficiency() penalizing production when load drops below 20%</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">CLASS</div>
              <div className="artifact-name">Battery & Optimizer</div>
              <div className="artifact-type">Tracks SoC & solves timestep power flow decisions balancing H2 demand</div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Experiment Matrix */}
      <div className="content-section">
        <div className="section-label">Experimental Trade-Off Matrix</div>
        <div className="section-body">
          <p>
            Evaluating battery power rating (MW) vs. battery energy capacity (MWh) vs. nuclear baseload sizing:
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px'
          }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>EXPERIMENT</th>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>CONFIGURATION</th>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>RESULT</th>
                <th style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>ENGINEERING INSIGHT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Baseline (Broken)</td>
                <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>20MW Nuc + 5MWh Batt</td>
                <td style={{ padding: '0.85rem 1rem', color: '#EF4444', fontWeight: '600' }}>Failure (20MW Deficit)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>System lacks both generation capacity and storage smoothing.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Exp A (The Trap)</td>
                <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>20MW Nuc + 300MWh Batt</td>
                <td style={{ padding: '0.85rem 1rem', color: '#EF4444', fontWeight: '600' }}>Failure (20MW Deficit)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}><strong>Discharge Rate Bottleneck:</strong> Battery discharge limit (10MW) was too low to cover 30MW peak deficit. Proves Power Rating (MW) is as critical as Energy Capacity (MWh).</td>
              </tr>
              <tr>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Exp B (The Fix)</td>
                <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>45MW Nuc + 5MWh Batt</td>
                <td style={{ padding: '0.85rem 1rem', color: '#22C55E', fontWeight: '600' }}>Success (0 Deficit)</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}><strong>Baseload Dominance:</strong> Sizing nuclear to meet 90% of demand removes reliance on storage, though increasing upfront CAPEX.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Plot Images */}
      <div className="content-section">
        <div className="section-label">Simulation Visual Outputs</div>

        <div style={{ margin: '1.25rem 0 2rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img
            src="/assets/dispatch_broken.png"
            alt="Baseline Broken Simulation Dispatch Plot showing 20MW Deficit power stability violations"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Baseline (Broken): 20MW Nuclear capacity results in recurring 20MW grid stability deficit spikes during low-solar periods.
          </div>
        </div>

        <div style={{ margin: '0 0 2.5rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img
            src="/assets/dispatch_fixed.png"
            alt="Exp B Fixed Simulation Dispatch Plot showing zero deficit power violations"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Exp B (The Fix): 45MW Nuclear baseload eliminates stability violations completely (0 MW deficit).
          </div>
        </div>
      </div>

      {/* Industrial Applications */}
      <div className="content-section">
        <div className="section-label">Applications & Use Cases</div>
        <div className="duality-grid">
          <div className="duality-card">
            <div className="duality-card-title">Green Hydrogen Hubs</div>
            <div className="duality-card-body">
              <strong>Jamnagar / Kutch Gigafactories:</strong> Determines the exact mix of Solar vs. Wind vs. Battery to keep electrolyzers operating continuously without tripping.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Green Steel Plants</div>
            <div className="duality-card-body">
              <strong>ArcelorMittal / Jindal:</strong> Steel plants using Hydrogen for direct reduced iron (DRI) require steady feed to prevent molten steel from solidifying in furnaces.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Grid Operators</div>
            <div className="duality-card-body">
              <strong>POSOCO / RLDC:</strong> System controllers evaluating whether megawatt-scale electrolyzers will trigger national grid frequency deviations.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Techno-Economic Modeling</div>
            <div className="duality-card-body">
              Converts raw physics constraints (Inertia / Ramping) into financial metrics (₹/kg H₂), providing actionable data for industrial CAPEX allocation.
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
              Python OOP codebase (`main.py`, `components.py`, `optimizer.py`), numerical power balance equations, battery state-of-charge tracking, electrolyzer production physics check, and Matplotlib deficit plotting.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Conceptual</div>
            <div className="duality-card-body">
              Hardware integration with physical nuclear reactors, commercial electrolyzer stacks, or high-voltage battery management hardware.
            </div>
          </div>
        </div>
      </div>

      {/* Honest Technical Note */}
      <div className="content-section">
        <div className="quote-card">
          "The current implementation uses a rule-based heuristic dispatch optimizer in <code>optimizer.solve()</code> to balance assets and track deficit imports, rather than a formal MILP/Pyomo solver formulation."
        </div>
      </div>

      {/* Open Questions */}
      <div className="content-section">
        <div className="section-label">Open Questions & Next Iterations</div>
        <ul className="clean-list">
          <li>Replacing heuristic dispatch solver with Pyomo / CVXPY convex optimization model</li>
          <li>Loading empirical solar generation CSVs in place of synthetic data profiles</li>
          <li>Adding battery cycle degradation modeling based on throughput aging curves</li>
        </ul>
      </div>

      {/* Code Base Artifacts */}
      <div className="content-section">
        <div className="section-label">Codebase Artifacts</div>
        <div className="artifact-grid">
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PYTHON</div>
              <div className="artifact-name">main.py</div>
              <div className="artifact-type">Simulation execution loop & Matplotlib plotting</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PYTHON</div>
              <div className="artifact-name">src/components.py</div>
              <div className="artifact-type">NuclearPlant, SolarFarm, Electrolyzer, Battery classes</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PYTHON</div>
              <div className="artifact-name">src/optimizer.py</div>
              <div className="artifact-type">DispatchOptimizer logic & power balance solver</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PDF</div>
              <div className="artifact-name">Research Paper PDF</div>
              <div className="artifact-type">Stability-Aware Dispatch Modeling Paper</div>
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
