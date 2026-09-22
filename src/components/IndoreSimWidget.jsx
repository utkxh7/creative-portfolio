import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function IndoreSimWidget() {
  const [monsoonDeficit, setMonsoonDeficit] = useState(25);
  const [tariffShift, setTariffShift] = useState(15);

  const chartData = [
    { scenario: 'Baseline', SolarGen: 450, Demand: 380, GridLoss: 45 },
    { scenario: 'Monsoon -10%', SolarGen: 410 - monsoonDeficit * 2, Demand: 400 + tariffShift, GridLoss: 52 },
    { scenario: 'Monsoon -25%', SolarGen: 360 - monsoonDeficit * 3, Demand: 440 + tariffShift * 1.5, GridLoss: 68 },
    { scenario: 'Peak Deficit', SolarGen: 280 - monsoonDeficit * 4, Demand: 510 + tariffShift * 2, GridLoss: 85 },
    { scenario: 'BESS Recovery', SolarGen: 490 - monsoonDeficit, Demand: 420, GridLoss: 38 }
  ];

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '1.8rem',
      margin: '2rem 0'
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>MONTE CARLO SIMULATION // INDORE MICROGRID</span>
        <span>10,000 SCENARIOS</span>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
            MONSOON DEFICIT: <strong style={{ color: 'var(--text-primary)' }}>{monsoonDeficit}%</strong>
          </label>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={monsoonDeficit} 
            onChange={(e) => setMonsoonDeficit(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--text-primary)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
            TARIFF SURGE SHIFT: <strong style={{ color: 'var(--text-primary)' }}>+{tariffShift}%</strong>
          </label>
          <input 
            type="range" 
            min="0" 
            max="40" 
            value={tariffShift} 
            onChange={(e) => setTariffShift(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="scenario" stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
            <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
            <Tooltip contentStyle={{ background: '#09090b', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '12px' }} />
            <Area type="monotone" dataKey="Demand" stroke="#8a8a96" fillOpacity={0.15} fill="#8a8a96" name="Demand (MW)" />
            <Area type="monotone" dataKey="SolarGen" stroke="#ef4444" fillOpacity={0.25} fill="#ef4444" name="Solar Gen (MW)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
