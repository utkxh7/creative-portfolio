import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Shield, Zap, Flame, Building, ArrowRight, BookOpen } from 'lucide-react';

export default function CaptiveNuclear() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/notes" />

      {/* Tag */}
      <div style={{ marginBottom: '1rem' }}>
        <span className="status-pill" style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)', borderColor: 'var(--accent-amber-border)' }}>
          CASE STUDY // INDUSTRIAL POLICY & GRID PHYSICS
        </span>
      </div>

      <h1 className="page-title">The "Captive User" Loophole: How Indian Conglomerates Will Own Nuclear Without "Owning" It</h1>
      <p className="page-summary">
        An analytical deconstruction of the legal workarounds under the Atomic Energy Act (1962), 
        the economics of 24/7 green hydrogen in Jamnagar, and why small modular reactor (SMR) core physics 
        cannot replace battery-based synthetic inertia.
      </p>

      {/* Notice Card */}
      <div className="quote-card" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)', marginBottom: '2.5rem' }}>
        <strong>Thesis:</strong> Private corporations cannot legally hold nuclear fuel in India. Instead, a "Beneficial Ownership" structure enables industrial micro-states to disconnect from DISCOMs and run dedicated nuclear-backed captive microgrids for green hydrogen and AI data centers.
      </div>

      {/* Part 1: The Legal Structure */}
      <div className="content-section">
        <div className="section-label">01 // The Legal Paradox & The Beneficial Ownership Model</div>
        <div className="section-body">
          <p style={{ fontSize: '1.02rem', lineHeight: '1.65', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            The primary barrier to private nuclear power in India is statutory: under the <strong>Atomic Energy Act of 1962</strong>, private entities are strictly prohibited from owning nuclear reactors, handling enriched fuel, or managing radioactive waste.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
            Yet major private conglomerates (including Reliance, Adani, and Tata) are actively preparing multi-gigawatt nuclear expansion plans. The mechanism enabling this is the <strong>Captive User & Beneficial Ownership</strong> model:
          </p>
        </div>

        <div className="duality-grid" style={{ marginTop: '1.25rem' }}>
          <div className="duality-card">
            <div className="duality-card-title">1. 100% Private Capital (CAPEX)</div>
            <div className="duality-card-body">The private conglomerate funds 100% of the land acquisition, civil construction, and reactor hardware costs, bearing full upfront project financing risk.</div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">2. Nominal ₹1 Title Transfer</div>
            <div className="duality-card-body">Upon physical commissioning, the legal title of the nuclear reactor is transferred to state-owned <strong>NPCIL</strong> (Nuclear Power Corporation of India Limited) for a nominal ₹1 fee.</div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">3. NPCIL Operational Retainer</div>
            <div className="duality-card-body">NPCIL operates the facility, procures the fuel rods, handles safety protocols, and charges an "Expertise & Operations Fee" (~50–60 paise/kWh).</div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">4. 60-Year "Beneficial Rights"</div>
            <div className="duality-card-body">The private company doesn't own the reactor core; it holds exclusive 60-year "Beneficial Rights" to 100% of the generated clean electrons, completely bypassing public DISCOM tariffs.</div>
          </div>
        </div>
      </div>

      {/* Part 2: The Industrial Economics */}
      <div className="content-section">
        <div className="section-label">02 // The Commercial Drivers: Green Hydrogen & 1GW Data Centers</div>
        <div className="section-body">
          <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Why pay ₹5.50–₹6.50/kWh for nuclear baseload when utility-scale solar is available at ₹2.40/kWh? The answer lies in industrial continuous processes:
          </p>
        </div>

        <ul className="clean-list">
          <li>
            <strong>The Green Hydrogen Paradox:</strong> Reliance's massive green hydrogen gigafactory in Jamnagar requires megawatt-scale PEM/alkaline electrolyzers running at &gt;90% capacity factor. Solar drops to 0 MW at sunset. Cold-cycling electrolyzers daily severely degrades cell membranes and destroys process economics. 24/7 carbon-free power is mandatory for EU green export certification.
          </li>
          <li>
            <strong>Hyperscale AI Data Centers:</strong> Adani's bet on multi-gigawatt AI compute clusters requires uninterrupted, non-intermittent clean baseload. A single 1-gigawatt AI cluster consumes more continuous power than many mid-sized cities.
          </li>
          <li>
            <strong>Cost vs. Stability Arbitrage:</strong> For high-precision chemical synthesis or continuous silicon/extrusion manufacturing, a 7-minute unplanned power outage ruins an entire batch, costing tens of crores. The ₹3.50/kWh premium for captive nuclear is not power cost—it is an insurance policy against grid collapse.
          </li>
        </ul>
      </div>

      {/* Part 3: SMR Core Physics */}
      <div className="content-section">
        <div className="section-label">03 // SMR Core Physics: Media Hype vs. Grid Realities</div>
        <div className="section-body">
          <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Popular media frequently touts Small Modular Reactors (SMRs) as plug-and-play batteries that can ramp up and down to balance rooftop solar fluctuations. From a reactor physics perspective, this claim fails:
          </p>
        </div>

        <div className="duality-grid" style={{ gap: '1rem' }}>
          <div className="duality-card" style={{ borderColor: 'var(--border-strong)' }}>
            <div className="duality-card-title">Thermal Equilibrium & Xenon Poisoning</div>
            <div className="duality-card-body">
              Nuclear reactor cores operate on tight thermal and neutron flux equilibrium. Rapid load-following induces thermal stress in fuel cladding and triggers transient <strong>Xenon-135 poisoning</strong>, which restricts restart capability for hours. Nuclear plants hate frequent ramping; they are designed to run flat.
            </div>
          </div>
          <div className="duality-card" style={{ borderColor: 'var(--border-strong)' }}>
            <div className="duality-card-title">Neutron Leakage & Volumetric Waste</div>
            <div className="duality-card-body">
              Due to higher surface-area-to-volume ratios, small reactor cores suffer from greater neutron leakage than 1,000 MW gigawatt reactors. This irradiates surrounding structural steel and generates significantly higher volumetric radioactive waste per megawatt-hour produced.
            </div>
          </div>
        </div>

        <div className="quote-card" style={{ marginTop: '1.25rem', borderColor: 'var(--accent-amber)', background: 'var(--accent-amber-light)' }}>
          <strong>The Virtual Inertia Reality:</strong> Rather than forcing nuclear plants into agile frequency regulation, modern Battery Energy Storage Systems (BESS) equipped with grid-forming inverters deliver Fast Frequency Response (FFR) and synthetic inertia in milliseconds. In a hybrid industrial microgrid, the SMR provides flat thermal baseload, while the battery absorbs rapid frequency transients.
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/notes" className="hero-cta">
          ← Back to Research Notes
        </Link>
        <Link to="/energy-stack" className="hero-cta hero-cta-primary">
          <span>Read: The 8-Layer Energy Industry Stack</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <span>Utkarsh Gupta © 2026</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:utk9rsh@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </div>
  );
}
