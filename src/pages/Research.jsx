import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Research() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Title Block */}
      <h1 className="page-title">Decentralized Energy Storage & Grid Economics Model</h1>
      <p className="page-summary">
        A neighbourhood-based solar storage framework where surplus rooftop energy is pooled
        into shared community batteries — designed to reduce transmission losses, lower costs,
        and build trust through open energy accounting in India.
      </p>

      {/* Metadata */}
      <div className="meta-grid">
        <div>
          <div className="meta-label">Type</div>
          <div className="meta-value">Research Paper</div>
        </div>
        <div>
          <div className="meta-label">Role</div>
          <div className="meta-value">Lead Researcher</div>
        </div>
        <div>
          <div className="meta-label">Year</div>
          <div className="meta-value">2025</div>
        </div>
        <div>
          <div className="meta-label">Status</div>
          <div className="meta-value">
            <span className="status-pill">
              <span className="status-dot" style={{ backgroundColor: '#F59E0B' }}></span>
              Concept Stage
            </span>
          </div>
        </div>
        <div>
          <div className="meta-label">Stack</div>
          <div className="meta-value">Python, PyPSA, Monte Carlo, MILP</div>
        </div>
        <div>
          <div className="meta-label">Focus Area</div>
          <div className="meta-value">Indore, India</div>
        </div>
      </div>

      {/* Hero Image */}
      <div style={{ margin: '0 0 3rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <img
          src="/assets/research-hero.png"
          alt="A New Local Energy Economy — Win-Win-Win Scenario showing peer-to-peer energy trading between households via DISCOM"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* Abstract */}
      <div className="content-section">
        <div className="section-label">Abstract</div>
        <div className="section-body">
          <p>
            Rooftop solar power in India has grown rapidly in recent years, yet its progress is
            limited by challenges such as grid integration issues, significant transmission losses,
            and affordability concerns for many households.
          </p>
          <p>
            This paper introduces a decentralized framework built around localized community solar
            storage. The approach combines shared neighbourhood battery substation systems, a
            blockchain-based digital credit platform, and community-led maintenance to create a
            more resilient and inclusive energy model.
          </p>
          <p>
            By aggregating excess rooftop solar generation at the neighbourhood level, the system
            aims to reduce localized distribution losses, reduce electricity expenses, and improve
            access to energy for both solar adopters and non-adopters.
          </p>
        </div>
      </div>

      {/* The Problem */}
      <div className="content-section">
        <div className="section-label">The Problem</div>
        <div className="section-body">
          <p>
            India's power grid struggles with high transmission losses, frequent outages, and
            growing demand for reliable, affordable electricity. While rooftop solar has expanded
            under government programs, much of its potential is lost due to weak grid integration
            and limited affordability — especially for low-income families and renters who face
            high upfront costs and lack storage options.
          </p>
          <p>
            Conventional models like net metering or standalone rooftop systems often overlook
            collective needs, grid stability, and equity in both urban and rural settings.
          </p>
        </div>
      </div>

      {/* System Architecture Image */}
      <div style={{ margin: '0 0 3rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <img
          src="/assets/research-architecture.png"
          alt="System architecture showing neighbourhood battery substations connected to a central energy facility with dynamic power sharing"
          style={{ width: '100%', display: 'block' }}
        />
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--bg-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          System architecture — neighbourhood battery substations connected to central energy facility
        </div>
      </div>

      {/* Proposed Framework */}
      <div className="content-section">
        <div className="section-label">Proposed Framework</div>
        <div className="section-body">
          <p>
            The framework is architected as a hybrid system integrating physical infrastructure
            with a digital management layer, driven by community participation.
          </p>
        </div>
        <ul className="clean-list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Physical layer:</strong> Lithium-ion Battery Energy Storage Systems (BESS)
            placed as neighbourhood substations. Each household equipped with Advanced Metering
            Infrastructure (AMI) smart meters for real-time, bidirectional energy flow data.
          </li>
          <li>
            <strong>Energy Management System:</strong> Multi-layered software — data acquisition
            from AMI meters, LSTM-based forecasting engine for solar generation and load demand,
            and a dispatch optimizer for real-time energy routing.
          </li>
          <li>
            <strong>Digital credit platform:</strong> Blockchain-backed ledger recording generation,
            consumption, and rewards with full transparency. Residents collectively manage upkeep.
          </li>
        </ul>
      </div>

      {/* Key Results */}
      <div className="content-section">
        <div className="section-label">Key Results</div>
        <div className="section-body">
          <p>
            Simulation of a 50-household residential cluster in Indore using real-world load and
            solar irradiance data — 10 prosumers with 5kW rooftop solar, 40 consumers.
          </p>
        </div>
        <div className="artifact-grid" style={{ marginTop: '1.25rem' }}>
          <div className="artifact-card">
            <div className="artifact-icon">P2P CAPTURE</div>
            <div className="artifact-name" style={{ fontSize: '1.6rem' }}>110 kWh</div>
            <div className="artifact-type">daily excess solar captured via peer-to-peer trading</div>
          </div>
          <div className="artifact-card">
            <div className="artifact-icon">DAILY SAVINGS</div>
            <div className="artifact-name" style={{ fontSize: '1.6rem' }}>₹439</div>
            <div className="artifact-type">net community saving under baseline conditions</div>
          </div>
          <div className="artifact-card">
            <div className="artifact-icon">ANNUAL PROJECTION</div>
            <div className="artifact-name" style={{ fontSize: '1.6rem' }}>₹1.6L</div>
            <div className="artifact-type">projected annual saving for a 50-household cluster</div>
          </div>
          <div className="artifact-card">
            <div className="artifact-icon">STRESS TESTED</div>
            <div className="artifact-name" style={{ fontSize: '1.6rem' }}>99%</div>
            <div className="artifact-type">confidence of positive cash flow under monsoon variability (n=2,000)</div>
          </div>
        </div>
      </div>

      {/* Microgrid Topology */}
      <div style={{ margin: '3rem 0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <img
          src="/assets/research-microgrid.png"
          alt="Microgrid topology diagram showing main grid connected to four microgrids in a ring topology"
          style={{ width: '100%', display: 'block', background: '#fff' }}
        />
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--bg-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          Microgrid ring topology — bidirectional power flow between main grid and local microgrids
        </div>
      </div>

      {/* Economic Impact */}
      <div className="content-section">
        <div className="section-label">Economic Impact at Scale</div>
        <div className="section-body">
          <p>
            India's current AT&C (Aggregate Technical & Commercial) losses stand at 21.4% —
            meaning over 347 billion units of electricity are generated but never billed annually,
            representing a loss of approximately ₹1.91 Lakh Crore to distribution companies.
          </p>
        </div>

        <div className="duality-grid" style={{ marginTop: '1.25rem' }}>
          <div className="duality-card">
            <div className="duality-card-title">Direct Annual Savings</div>
            <div className="duality-card-body">
              <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>₹19,101 Crores/year</strong>
              <br />Targeting just 10% of current AT&C inefficiencies
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">CO₂ Reduction</div>
            <div className="duality-card-body">
              <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>24.3 Million Tonnes</strong>
              <br />Annual CO₂ reduction from addressing 10% of losses
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Peak Load Reduction</div>
            <div className="duality-card-body">
              <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Up to 55%</strong>
              <br />Local peak load reduction, deferring need for new substations
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Stress-Tested Savings</div>
            <div className="duality-card-body">
              <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>~₹250/day</strong>
              <br />Risk-adjusted average even under adverse monsoon + policy shifts
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
              The written papers, analytical formulations, presentation decks, review documentation,
              simulation results, and generated diagrams. The mathematical model and Monte Carlo
              stress test produce reproducible results.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">Conceptual</div>
            <div className="duality-card-body">
              The grid-scale physical implementation or pilot deployment of the proposed
              decentralized storage network. No empirical field data from a physical microgrid
              installation — this is a theoretical framework evaluated against utility tariff structures.
            </div>
          </div>
        </div>
      </div>

      {/* Honest Note */}
      <div className="content-section">
        <div className="quote-card">
          "The research presents a theoretical framework and mathematical grid economics model
          evaluated against utility tariff structures, rather than empirical trial data from a
          physical microgrid installation."
        </div>
      </div>

      {/* Open Questions */}
      <div className="content-section">
        <div className="section-label">Open Questions</div>
        <ul className="clean-list">
          <li>Publication submission and peer-review journal responses</li>
          <li>Translating theoretical policy recommendations into real-world pilot parameters</li>
        </ul>
      </div>

      {/* Artifacts */}
      <div className="content-section">
        <div className="section-label">Artifacts</div>
        <div className="artifact-grid">
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PDF</div>
              <div className="artifact-name">Research Paper</div>
              <div className="artifact-type">Paper_UtkarshGupta_DecentralizedStorage_DISCOM.pdf</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PPTX</div>
              <div className="artifact-name">Research Presentation</div>
              <div className="artifact-type">Research Paper Presentation.pptx</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PPTX</div>
              <div className="artifact-name">UrjaMesh Parupam Deck</div>
              <div className="artifact-type">UrjaMesh Parupam.pptx</div>
            </div>
          </div>
          <div className="artifact-card">
            <div>
              <div className="artifact-icon">PDF</div>
              <div className="artifact-name">AI & Plagiarism Checks</div>
              <div className="artifact-type">Originality verification documents</div>
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
