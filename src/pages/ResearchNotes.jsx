import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { 
  FileText, 
  Shield, 
  Lock, 
  Eye, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle, 
  BookOpen, 
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';

export default function ResearchNotes() {
  const [activeSection, setActiveSection] = useState('all');
  const [readingView, setReadingView] = useState('hypothesis'); // 'hypothesis' or 'manuscript'

  return (
    <div className="container">
      {/* Header */}
      <Header showBack={true} backTo="/" />

      {/* Badges */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span className="status-pill" style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)', borderColor: 'var(--accent-amber-border)' }}>
          ACADEMIC WORKING PAPER // DISCOM GRID ECONOMICS
        </span>
        <span className="status-pill" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', borderColor: 'var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Lock size={12} /> View-Only Manuscript (Download Disabled)
        </span>
      </div>

      <h1 className="page-title">Decentralized Energy Storage & Grid Economics Model</h1>
      <p className="page-summary">
        An academic and mathematical grid economics model evaluating how pooling residential rooftop solar into 
        neighborhood-level 11kV substation batteries can mitigate utility technical line losses ($I^2R$) and relieve peak infrastructure stress in India.
      </p>

      {/* Notice Card */}
      <div className="quote-card" style={{ borderColor: 'var(--accent-amber-border)', background: 'var(--accent-amber-light)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <Info size={18} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            <strong>Notice to Readers:</strong> This page serves as a dedicated academic preview of the draft manuscript by Utkarsh Gupta (SGSITS Indore). Direct file downloads, PDF exporting, and scraping have been disabled to protect working intellectual property prior to final journal submission.
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setReadingView('hypothesis')}
          className={`hero-cta ${readingView === 'hypothesis' ? 'hero-cta-primary' : ''}`}
          style={{ fontSize: '0.86rem', padding: '0.5rem 1rem' }}
        >
          <span>Executive Hypothesis Breakdown</span>
        </button>
        <button
          onClick={() => setReadingView('manuscript')}
          className={`hero-cta ${readingView === 'manuscript' ? 'hero-cta-primary' : ''}`}
          style={{ fontSize: '0.86rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <BookOpen size={14} />
          <span>Full Draft Manuscript Reader</span>
        </button>
      </div>

      {/* VIEW 1: EXECUTIVE HYPOTHESIS BREAKDOWN */}
      {readingView === 'hypothesis' && (
        <div className="content-section">
          <div className="section-label">01 // The Core Engineering Hypothesis</div>
          <div className="section-body">
            <p style={{ fontSize: '1.02rem', lineHeight: '1.65', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Conventional rooftop solar in India pushes energy backward through overloaded distribution transformers into higher-voltage lines, only for consumers to draw power from distant thermal plants at night. This architecture causes catastrophic technical line loss.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* 1. The Grid Problem */}
            <div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                A. The Macro Problem: India's ₹1.91 Lakh Crore AT&C Loss
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                India experiences aggregate technical and commercial (AT&C) losses averaging <strong>21.4%</strong> nationally (translating to ~347.3 TWh of unbilled energy and ₹1,91,015 Crores in annual utility deficit). While commercial theft requires administrative metering overhauls, <em>technical losses</em> are physically governed by transmission line impedance across low-voltage rural and suburban distribution grids.
              </p>
            </div>

            {/* 2. The Physics */}
            <div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                B. The Physics: Conductor Dissipation & P<sub>loss</sub> = I²R
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                Thermal line dissipation scales quadratically with current: <code>P<sub>loss</sub> = I²R</code>. In standard net-metering schemes:
              </p>
              <ul className="clean-list" style={{ marginTop: '0.5rem' }}>
                <li><strong>Midday Reverse Flow:</strong> Rooftop solar peaks at midday (11:00 AM – 2:30 PM) when domestic load is low. Current is wheeled back up the feeder lines into 11kV distribution transformers, dissipating heat and causing voltage rise issues.</li>
                <li><strong>Evening Peak Draw:</strong> Between 6:00 PM – 10:00 PM, domestic demand spikes just as solar output drops to zero. Power must travel long distances from centralized thermal generation over high-impedance suburban conductors, multiplying <code>I²R</code> losses during the day's highest tariff slots.</li>
                <li><strong>The Neighborhood Perimeter:</strong> By storing midday surplus in community battery banks connected at the 11kV/415V transformer level, power travel distance is compressed by over 90%, drastically reducing the <code>R</code> term and eliminating multi-stage transformer cycling.</li>
              </ul>
            </div>

            {/* 3. Substation BESS Architecture */}
            <div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                C. Physical Architecture: 11kV Substation BESS & 4-Layer EMS
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '0.75rem' }}>
                Individual home batteries suffer from low capacity utilization and high per-unit inverter costs. The model aggregates storage at the local Distribution Transformer (DT) level, managed by an automated 4-layer Energy Management System (EMS):
              </p>
              <div className="duality-grid" style={{ gap: '0.75rem' }}>
                <div className="duality-card" style={{ padding: '0.85rem 1rem' }}>
                  <div className="duality-card-title" style={{ fontSize: '0.85rem' }}>1. Data Acquisition Layer</div>
                  <div className="duality-card-body" style={{ fontSize: '0.82rem' }}>Sub-second AMI telemetry monitoring consumer smart meters and battery cell temperature, voltage, and state of charge (SoC).</div>
                </div>
                <div className="duality-card" style={{ padding: '0.85rem 1rem' }}>
                  <div className="duality-card-title" style={{ fontSize: '0.85rem' }}>2. Forecasting Engine</div>
                  <div className="duality-card-body" style={{ fontSize: '0.82rem' }}>LSTM machine learning models predicting next-day solar irradiance profiles and feeder-level consumption curves based on historical trends.</div>
                </div>
                <div className="duality-card" style={{ padding: '0.85rem 1rem' }}>
                  <div className="duality-card-title" style={{ fontSize: '0.85rem' }}>3. Optimization Engine</div>
                  <div className="duality-card-body" style={{ fontSize: '0.82rem' }}>Linear programming algorithms dynamically solving for loss minimization and battery cycle preservation while accounting for a ₹1.00/kWh DISCOM wheeling fee.</div>
                </div>
                <div className="duality-card" style={{ padding: '0.85rem 1rem' }}>
                  <div className="duality-card-title" style={{ fontSize: '0.85rem' }}>4. Control & Dispatch Layer</div>
                  <div className="duality-card-body" style={{ fontSize: '0.82rem' }}>Priority routing: 1) Instant local demand matching → 2) Substation BESS charging → 3) Evening peak shaving (6–10 PM) → 4) Grid export.</div>
                </div>
              </div>
            </div>

            {/* 4. Indore Simulation */}
            <div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                D. Simulated Case Study: 50-Household Cluster in Indore
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                Simulated a residential cluster of 50 households (10 solar prosumers with 5kW RTS + 40 consumers) in Indore using actual seasonal insolation and load profiles:
              </p>
              <ul className="clean-list" style={{ marginTop: '0.5rem' }}>
                <li><strong>Surplus Capture:</strong> P2P energy trading captured ~<strong>110 kWh</strong> of daily excess solar energy that would otherwise be curtailed or lost.</li>
                <li><strong>Peak Demand Shaving:</strong> Substation battery dispatch during evening peak hours reduced transformer demand on the main grid by up to <strong>55%</strong>.</li>
                <li><strong>Monte Carlo Stress Test:</strong> 2,000 stochastic iterations evaluating monsoon solar drops and tariff shifts confirmed positive cash flow with 99% confidence.</li>
              </ul>
            </div>

            {/* 5. Honest Reality */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                ⚖️ Honest Academic Reality: Why This Remains a Hypothesis
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                <strong>Degradation vs. Avoided Loss Paradox:</strong> Lithium-ion battery cycle degradation costs (~₹4–6 per cycled kWh) must remain strictly lower than the financial value of avoided I²R technical losses plus peak-hour power purchase arbitrage (₹8–12/kWh in spot utility markets). Furthermore, Indian DISCOM regulatory frameworks currently lack standardized billing mechanisms for non-utility community storage assets. This paper establishes the physical and economic model; empirical pilot microgrids are required before commercial claims can be made.
              </div>
            </div>

            {/* Call to switch view */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                onClick={() => setReadingView('manuscript')} 
                className="hero-cta hero-cta-primary"
                style={{ fontSize: '0.88rem', padding: '0.6rem 1.25rem' }}
              >
                <span>Open Complete Academic Manuscript (14-Page Draft)</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: FULL DRAFT MANUSCRIPT READER */}
      {readingView === 'manuscript' && (
        <div 
          onContextMenu={(e) => e.preventDefault()}
          style={{
            userSelect: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            background: 'var(--bg-surface)',
            padding: '2rem 2.25rem',
            marginBottom: '3rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          {/* Reader Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} style={{ color: 'var(--accent-amber)' }} />
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                ACADEMIC DRAFT • VIEW-ONLY PREVIEW • SGSITS INDORE
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              14 Pages • Mathematical Model & Simulation
            </div>
          </div>

          {/* Section Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            {[
              { id: 'all', label: 'All Sections' },
              { id: 'abstract', label: 'Abstract' },
              { id: 'intro', label: 'I. Introduction' },
              { id: 'related', label: 'II. Related Work' },
              { id: 'methodology', label: 'III. Methodology' },
              { id: 'results', label: 'IV. Results & Indore Sim' },
              { id: 'economics', label: 'VI. Economic Impact' },
              { id: 'references', label: 'References' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                style={{
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: activeSection === tab.id ? 'var(--text-primary)' : 'var(--border-color)',
                  background: activeSection === tab.id ? 'var(--text-primary)' : 'transparent',
                  color: activeSection === tab.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Manuscript Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--border-color)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
              Decentralized Energy Storage & Grid Economics Model
            </h2>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Utkarsh Gupta
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Department of Electrical Engineering, Shri Govindram Seksaria Institute of Technology and Science (SGSITS), Indore, India
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {['Community solar', 'Energy storage', 'Substation storage', 'Digital energy credits', 'Blockchain', 'Microgrids', 'DRE'].map((kw) => (
                <span key={kw} style={{ fontSize: '0.72rem', background: 'var(--bg-hover)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Paper Content Body */}
          <div style={{ fontSize: '0.92rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
            
            {/* Abstract */}
            {(activeSection === 'all' || activeSection === 'abstract') && (
              <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'var(--bg-hover)', borderRadius: '8px', borderLeft: '3px solid var(--accent-amber)' }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.05em' }}>
                  Abstract
                </strong>
                <p style={{ margin: 0 }}>
                  Rooftop solar power in India has grown rapidly in recent years, yet its progress is limited by challenges such as grid integration issues, significant transmission losses, and affordability concerns for many households. This paper introduces a decentralized framework built around localized community solar storage. The approach combines shared neighborhood battery substation systems, a blockchain-based digital credit platform, and community-led maintenance to create a more resilient and inclusive energy model. By aggregating excess rooftop solar generation at the neighborhood level, the system aims to reduce localized distribution losses, reduce electricity expenses, and improve access to energy for both solar adopters and non-adopters. The digital credit mechanism strengthens transparency while encouraging energy production and consumption practices. Drawing on India’s rooftop solar adoption trends and distribution loss data, this framework demonstrates potential to expand adoption among low- and middle-income groups, delivering economic benefits while improving grid stability.
                </p>
              </div>
            )}

            {/* Section I: Introduction */}
            {(activeSection === 'all' || activeSection === 'intro') && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                  I. INTRODUCTION
                </h3>
                <p style={{ marginBottom: '0.75rem' }}>
                  India’s power grid continues to struggle with high transmission losses [1], frequent outages, and growing demand for reliable, affordable electricity. While rooftop solar has expanded under government programs, much of its potential is lost due to weak grid integration and limited affordability, especially for low-income families and renters who face high upfront costs and lack storage options.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  In addition to technical inefficiencies, many distribution utilities face structural financial challenges including cross-subsidy obligations, delayed tariff revisions, and billing inefficiencies. Any decentralized energy solution must therefore operate within the economic constraints of state-owned DISCOMs while preserving revenue stability.
                </p>
                <p>
                  Conventional models like net metering or standalone rooftop systems often overlook collective needs, grid stability, and equity in both urban and rural settings. This paper proposes a neighbourhood-based solar storage system where surplus rooftop energy is pooled into shared community batteries. A blockchain-backed digital credit platform records generation, use, and rewards with transparency, while residents collectively manage upkeep.
                </p>
              </div>
            )}

            {/* Section II: Related Work */}
            {(activeSection === 'all' || activeSection === 'related') && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                  II. RELATED WORK
                </h3>
                <p style={{ marginBottom: '0.75rem' }}>
                  Community-based renewable energy has gained momentum worldwide. Initial efforts relied heavily on net metering, but in India this approach often runs into regulatory hurdles and delays in DISCOM payments. International research, such as studies by the U.S. National Renewable Energy Laboratory (NREL), has modeled the value of combining solar with storage to improve grid resilience [3], while institutions like the Electric Power Research Institute (EPRI) and DERlab have developed technical standards for distributed energy resource (DER) integration [5].
                </p>
                <p>
                  In India, the Ministry of New and Renewable Energy (MNRE) has set research priorities [7], and academic groups such as IIT Roorkee are advancing storage technologies [8]. Yet, comprehensive frameworks that merge technical controls with socio-economic models suited to India remain scarce. This paper addresses that gap by proposing a system built on simplicity, local governance, and inclusivity.
                </p>
              </div>
            )}

            {/* Section III: Proposed Methodology */}
            {(activeSection === 'all' || activeSection === 'methodology') && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                  III. PROPOSED METHODOLOGY
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                  The proposed framework is architected as a hybrid system that integrates physical infrastructure with a digital management layer, driven by community participation.
                </p>

                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  A. Physical Infrastructure: BESS and AMI
                </h4>
                <p style={{ marginBottom: '1rem' }}>
                  The core of the physical layer is a network of Lithium-ion Battery Energy Storage Systems (BESS) strategically placed as neighbourhood substations. Each participating household is equipped with Advanced Metering Infrastructure (AMI) smart meters to provide real-time, bidirectional energy flow data. This infrastructure centralizes the complex task of energy storage, reducing the cost and technical burden on individual households.
                </p>

                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  B. Energy Management System (EMS) and Control Logic
                </h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  The central EMS serves as the operational brain of the microgrid, implemented as a multi-layered software architecture:
                </p>
                <ul className="clean-list" style={{ marginBottom: '1rem' }}>
                  <li><strong>Data Acquisition Layer:</strong> Collects real-time data from all AMI meters and BESS sensors.</li>
                  <li><strong>Forecasting Engine:</strong> Utilizes machine learning algorithms (e.g., LSTM networks) to process historical data and external inputs (IMD weather forecasts) to predict near-term solar generation and community load demand.</li>
                  <li><strong>Optimization Engine:</strong> Runs a linear programming model to solve for optimal power flow, minimizing total community energy cost while respecting BESS state-of-charge limits and a proposed Wheeling Charge (₹1.00/kWh) payable to the DISCOM.</li>
                  <li><strong>Control and Dispatch Layer:</strong> Translates decisions into inverter switching signals: 1) Maximizing community self-consumption → 2) BESS charging during surplus → 3) P2P energy trades → 4) Peak-demand discharge.</li>
                </ul>

                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  C. Digital Layer: Permissioned Blockchain and Smart Contracts
                </h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  The digital transaction layer utilizes a permissioned ledger to record peer-to-peer energy transactions with clear programmatic smart contracts:
                </p>
                <ul className="clean-list" style={{ marginBottom: '1rem' }}>
                  <li><code>registerUser()</code>: Onboards new households onto the feeder network.</li>
                  <li><code>logTransaction()</code>: Immutably records P2P transfers between producer, BESS, and consumer.</li>
                  <li><code>updateCredits()</code>: Automatically adjusts participant digital energy credit balances.</li>
                  <li><code>settlePayment()</code>: Interfaces with digital payment gateways for end-of-cycle billing reconciliation.</li>
                </ul>

                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  D. Substation Power Electronics and Energy Flow
                </h4>
                <p>
                  The operational core of each substation features a <strong>Bi-Directional Inverter</strong> (functioning as a rectifier in charge mode and grid-compliant inverter at 230V, 50Hz in discharge mode) and a cell-level <strong>Battery Management System (BMS)</strong> ensuring thermal runaway prevention and lifecycle preservation.
                </p>
              </div>
            )}

            {/* Section IV: Results and Discussion */}
            {(activeSection === 'all' || activeSection === 'results') && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                  IV. RESULTS AND DISCUSSION
                </h3>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>A. Transmission & Distribution Loss Reduction:</strong> India currently experiences T&D losses averaging 21.4%, with some regions experiencing losses up to 47%. Community-level storage significantly minimizes electricity travel distance within the distribution network, compressing quadratic conductor losses ($I^2R$).
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>B. Peak Demand and Cost Impact:</strong> Centralized community storage decreases peak demand on the main grid by up to <strong>55%</strong>, relieving feeder transformer strain during high-demand evening periods. Solar-plus-storage power now competes favorably at ₹4–4.7/kWh versus industrial tariffs of ₹7–9/kWh.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>C. Simulated Case Study (50-Household Cluster in Indore):</strong> To validate the framework, we simulated a residential cluster of 50 households in Indore (10 prosumers with 5kW rooftop solar + 40 consumers) using actual seasonal load curves and irradiance data.
                </p>
                <div style={{ background: 'var(--bg-hover)', padding: '1rem', borderRadius: '6px', marginBottom: '0.75rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>Simulation Findings:</div>
                  <ul className="clean-list">
                    <li>Captures approximately <strong>110 kWh</strong> of excess daily solar energy otherwise clipped or lost.</li>
                    <li>Generates a net daily community saving of <strong>₹439</strong> (projected annual saving of <strong>₹1.6 Lakhs</strong> for the cluster).</li>
                    <li>Monte Carlo stress testing (<strong>n = 2,000 iterations</strong>) under monsoon irradiance variability confirmed positive cash flow with 99% statistical confidence.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Section VI: Economic Impact Analysis */}
            {(activeSection === 'all' || activeSection === 'economics') && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                  VI. ECONOMIC IMPACT ANALYSIS
                </h3>
                <p style={{ marginBottom: '0.75rem' }}>
                  This analysis quantifies the potential macro financial savings for India's power sector, targeting the Aggregate Technical & Commercial (AT&C) losses that plague state DISCOMs:
                </p>

                {/* Mathematical Calculations Block */}
                <div style={{ background: 'var(--bg-hover)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem' }}>// KEY SYSTEM MACRO EQUATIONS</div>
                  <div style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    1. Total Annual Generation (India 2023-24): 1,623 TWh
                  </div>
                  <div style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    2. Total Lost Energy: 1,623 TWh × 21.4% (AT&C) = <strong>347.3 TWh unbilled loss</strong>
                  </div>
                  <div style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    3. Annual Financial Deficit: 347.3 × 10⁹ kWh × ₹5.5/kWh = <strong>₹1,91,015 Crores (~₹1.91 Lakh Cr)</strong>
                  </div>
                  <div style={{ color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
                    4. Direct Annual Savings (Phased 10% Target): ₹1,91,015 Cr × 10% = <strong>₹19,101 Crores / year</strong>
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    5. Annual Carbon Reduction: (347.3 TWh × 10%) × 0.70 kg CO₂/kWh = <strong>24.3 Million Tons CO₂</strong>
                  </div>
                </div>

                <p>
                  <strong>Deferred Capital Expenditure:</strong> Under the Revamped Distribution Sector Scheme (RDSS), India plans to invest over ₹3 Lakh Crore in grid upgrades. By reducing local substation peak loading by up to 55%, this model defers expensive transformer upgrades and substation expansions.
                </p>
              </div>
            )}

            {/* References */}
            {(activeSection === 'all' || activeSection === 'references') && (
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  REFERENCES & STATUTORY SOURCES
                </h3>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.78rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  <li>Press Information Bureau, Govt. of India, "Transmission and Distribution losses of power," Dec. 2023.</li>
                  <li>NITI Aayog, "Report on Review of State Power Distribution Utilities," Sep. 2021.</li>
                  <li>NREL, "Community Microgrids From All Angles," nrel.gov, 2021.</li>
                  <li>NREL, "Solar-plus-Storage Analysis," nrel.gov.</li>
                  <li>EPRI, "Sustainable and Holistic Integration of Energy Storage and Solar PV (SHINES)," energy.gov.</li>
                  <li>DERlab, "Distributed Energy Resources Integration Facilities," bsgip.com.</li>
                  <li>MNRE, Ministry of New and Renewable Energy, "Solar Research & Development," mnre.gov.in.</li>
                  <li>IIT Roorkee, "Energy Storage Laboratory," faculty.iitr.ac.in.</li>
                  <li>P. C. J., et al., "Social dimensions of residential electricity storage for community energy systems," PMC, 2024.</li>
                  <li>Sandia National Laboratories, "Distributed Energy Technologies Laboratory (DETL)," sandia.gov.</li>
                  <li>M. A. A. Bawnabeel et al., "Optimal Sizing and Simulation of a Standalone PV System," IEEE JEEIT, 2019.</li>
                  <li>S. Jordan et al., "Techno-Economic Analysis of Shared BESS in Residential Communities," IEEE EEM, 2023.</li>
                  <li>Down To Earth, "Plummeting solar costs could spark India’s clean energy revolution," May 2024.</li>
                  <li>ETEnergyWorld, "India adds 1.2 GW rooftop solar capacity in Q1 2024," Jun. 2024.</li>
                  <li>Electrical India, "Losses in Distribution and transmission lines," 2023.</li>
                  <li>Central Electricity Authority (CEA), Ministry of Power, "All India Electricity Statistics," 2024.</li>
                  <li>Power Finance Corporation (PFC), "Report on Performance of State Power Utilities for FY 2022-23," 2024.</li>
                  <li>Central Electricity Authority (CEA), "CO2 Baseline Database for the Indian Power Sector," Jan. 2024.</li>
                  <li>Ministry of Power, Govt. of India, "Revamped Distribution Sector Scheme (RDSS) Guidelines," 2021.</li>
                </ol>
              </div>
            )}

          </div>

          {/* Reader Footer Notice */}
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>© 2024–2026 Utkarsh Gupta. All Rights Reserved.</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>Export/Download Disabled by Author</span>
          </div>
        </div>
      )}

      {/* CROSS-LINK SECTION: OTHER ENERGY STUDIES */}
      <div className="content-section" style={{ marginTop: '3.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
        <div className="section-label">Explore More Energy Studies & Industry Analyses</div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Additional analytical research and frameworks produced from field notes and utility policy investigations:
        </p>

        <div className="duality-grid" style={{ gap: '1rem' }}>
          
          {/* Card 1: Captive Nuclear Loophole */}
          <Link to="/nuclear-loophole" style={{ textDecoration: 'none' }}>
            <div className="duality-card" style={{ height: '100%', transition: 'all 0.2s ease', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div className="duality-card-title" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  The "Captive User" Nuclear Loophole
                </div>
                <ArrowRight size={15} style={{ color: 'var(--accent-amber)' }} />
              </div>
              <div className="duality-card-body" style={{ fontSize: '0.84rem' }}>
                How Adani & Reliance structure beneficial nuclear ownership under the Atomic Energy Act (1962), 24/7 green hydrogen economics, and the physical limits of SMR frequency response.
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                Read Case Study ↗
              </div>
            </div>
          </Link>

          {/* Card 2: 8-Layer Energy Stack */}
          <Link to="/energy-stack" style={{ textDecoration: 'none' }}>
            <div className="duality-card" style={{ height: '100%', transition: 'all 0.2s ease', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div className="duality-card-title" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  The 8-Layer Energy Industry Stack
                </div>
                <ArrowRight size={15} style={{ color: 'var(--accent-blue)' }} />
              </div>
              <div className="duality-card-body" style={{ fontSize: '0.84rem' }}>
                Where commercial businesses actually exist in India: from industrial gas routing to DISCOM billing chaos and consumption optimization in factory clusters.
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
                Read Industry Framework ↗
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Site Footer */}
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
