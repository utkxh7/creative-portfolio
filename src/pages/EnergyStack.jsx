import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Layers, ArrowRight, TrendingUp, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';

export default function EnergyStack() {
  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/notes" />

      {/* Tag */}
      <div style={{ marginBottom: '1rem' }}>
        <span className="status-pill" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', borderColor: 'var(--accent-blue-border)' }}>
          MARKET FRAMEWORK // COMMERCIAL VALUE CHAINS
        </span>
      </div>

      <h1 className="page-title">The 8-Layer Energy Industry Stack: Where Businesses Actually Exist in India</h1>
      <p className="page-summary">
        A practical deconstruction of the energy value chain: why founders shouldn't compete with Adani on generation, 
        why DISCOM billing chaos feeds consulting firms, and why consumption optimization is the true industrial goldmine.
      </p>

      {/* Core Principle Card */}
      <div className="quote-card" style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-surface)', marginBottom: '2.5rem' }}>
        <strong>The Fundamental Rule:</strong> <em>"You don't invent energy. You rearrange consumption."</em> Most students obsess over hardware generation layers that require ₹500+ Crore in capex. The real commercial margins sit in operational logistics, tariff arbitrage, and industrial consumption optimization.
      </div>

      {/* The 8 Layers */}
      <div className="content-section">
        <div className="section-label">01 // The 8 Commercial Layers of the Energy Market</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
          
          {/* Layer 1 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>1. Resource Creation — "The Capital Trap"</strong>
              <span className="status-pill" style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FECACA' }}>High CAPEX / Thin Margins</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Solar farms, coal mines, green hydrogen utility plants. Requires thousands of acres of contiguous land, statutory clearance pipelines, and ₹500+ Crore in low-cost debt. You will not outcompete Adani or Tata Power because you made a more elegant financial model.
            </p>
          </div>

          {/* Layer 2 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>2. Conversion Layer — "The Capex Hell"</strong>
              <span className="status-pill" style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FECACA' }}>Heavy R&D Moats</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Electrolyzers, fuel cells, steam turbine manufacturing. Students love this layer because YouTube documentaries feature it. In reality, it requires advanced materials science, multi-decade patent portfolios, and brutal manufacturing scale.
            </p>
          </div>

          {/* Layer 3 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>3. Infrastructure & Logistics — "The Underrated Operational Niche"</strong>
              <span className="status-pill" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>High Cash Flow</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Gas cylinder routing, industrial oxygen/nitrogen procurement (INOX, CryoPure), transformer maintenance uptime, and diesel generator replacement. Businesses pay recurring retainers for guaranteed equipment uptime and SLA-backed maintenance contracts.
            </p>
          </div>

          {/* Layer 4 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>4. Distribution & Billing — "Where Revenue Chaos Lives"</strong>
              <span className="status-pill" style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)', borderColor: 'var(--accent-amber-border)' }}>Core Utility Drain</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              State DISCOMs don't bleed money because electricity is scarce; they bleed because billing infrastructure is broken. Meter mismatch, power theft, unmetered agricultural feeders, and tariff misclassification account for ₹1.91 Lakh Crore in annual AT&C losses. Entire consulting firms survive solely on resolving DISCOM billing reconciliations.
            </p>
          </div>

          {/* Layer 5 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>5. Consumption Optimization — "The Industrial Goldmine"</strong>
              <span className="status-pill" style={{ background: '#DCFCE7', color: '#166534', borderColor: '#BBF7D0' }}>Highest Startup Margin</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Every medium-sized factory (textiles, injection molding, cold chains) wastes 10%–35% of its power. Machine engineers optimize outputs; floor managers optimize throughput; virtually no one optimizes energy tariffs. Contract demand rightsizing, power factor penalty mitigation, and Time-of-Day (ToD) tariff shifting deliver pure bottom-line EBITDA.
            </p>
          </div>

          {/* Layer 6 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>6. Financial Layer — "Commodities Trading with a Hardhat"</strong>
              <span className="status-pill" style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}>Finance / Structuring</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Energy markets are fundamentally debt and commodity derivatives markets. Power Purchase Agreement (PPA) structuring, open access wheeling optimization, Renewable Energy Certificates (REC), and spot market Day-Ahead arbitrage on the Indian Energy Exchange (IEX).
            </p>
          </div>

          {/* Layer 7 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>7. Compliance & Carbon Layer — "Export Eligibility"</strong>
              <span className="status-pill" style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}>Regulatory Compliance</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Indian manufacturers don't decarbonize out of altruism; they decarbonize to survive EU Carbon Border Adjustment Mechanism (CBAM) export tariffs. Scope 1, 2, and 3 carbon accounting audits are becoming prerequisite passports for international trade.
            </p>
          </div>

          {/* Layer 8 */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>8. Risk Layer — "The Hidden Insurance Business"</strong>
              <span className="status-pill" style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}>Mission-Critical</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              In pharmaceutical autoclaves, semiconductor fabrication, or high-temperature glass melting, a 7-minute voltage sag ruins days of production. Factories willingly pay massive premiums for dual-source redundancy, synchronous backup systems, and uptime insurance.
            </p>
          </div>

        </div>
      </div>

      {/* City-by-City Learning Framework */}
      <div className="content-section">
        <div className="section-label">02 // The 3-City Career & Operations Framework</div>
        <div className="section-body">
          <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Where you build your understanding matters. Energy is not a monolithic tech vertical; it divides into operational reality, contractual policy, and software orchestration:
          </p>
        </div>

        <div className="duality-grid" style={{ marginTop: '0.5rem' }}>
          <div className="duality-card">
            <div className="duality-card-title">1. Indore // Operational Reality</div>
            <div className="duality-card-body">
              Tier-2 industrial hubs (Pithampur, Sanwer Road, Vijay Nagar) reward direct operational initiative. Here you see cylinder routing, HT/LT electrical panels, diesel fuel dependency, and the real friction of factory power factor penalties.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">2. Delhi NCR // Policy & Contracts</div>
            <div className="duality-card-body">
              Where engineering stops and contracts begin. Regulatory advisory boutiques, CERC/SERC tariff filings, open access wheeling petitions, and long-term utility PPA negotiation.
            </div>
          </div>
          <div className="duality-card">
            <div className="duality-card-title">3. Bangalore // Energy Tech & IoT</div>
            <div className="duality-card-body">
              Smart grid analytics, demand-response orchestration, EV charging network dispatch (Bolt.Earth), and building management software (75F).
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/nuclear-loophole" className="hero-cta">
          ← The Captive Nuclear Loophole
        </Link>
        <Link to="/notes" className="hero-cta hero-cta-primary">
          <span>Decentralized Energy Storage Paper</span>
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
