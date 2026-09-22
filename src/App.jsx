import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import ScrollRestorationManager from './components/ScrollRestorationManager';

// Lazy-loaded routes for code-splitting and rapid initial load
const DiscomArbitrage = lazy(() => import('./pages/DiscomArbitrage'));
const StabilityDispatch = lazy(() => import('./pages/StabilityDispatch'));
const IndoreSim = lazy(() => import('./pages/IndoreSim'));
const Sidekick = lazy(() => import('./pages/Sidekick'));
const SidekickPresentationPage = lazy(() => import('./pages/SidekickPresentationPage'));
const Chingari = lazy(() => import('./pages/Chingari'));
const ChingariVisualSystemPage = lazy(() => import('./pages/ChingariVisualSystemPage'));
const Room3D = lazy(() => import('./pages/Room3D'));
const Essays = lazy(() => import('./pages/Essays'));
const EssayDetail = lazy(() => import('./pages/EssayDetail'));
const InstagramArchive = lazy(() => import('./pages/InstagramArchive'));
const ResearchNotes = lazy(() => import('./pages/ResearchNotes'));
const CaptiveNuclear = lazy(() => import('./pages/CaptiveNuclear'));
const EnergyStack = lazy(() => import('./pages/EnergyStack'));
const Y2kDesktop = lazy(() => import('./components/Y2kDesktop'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoadingFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '2px solid var(--border-color)',
        borderTopColor: 'var(--accent-amber)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span>Loading visual module...</span>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Show preloader on initial session open
    return !sessionStorage.getItem('visited_utkarsh_portfolio');
  });

  const handlePreloadFinished = () => {
    sessionStorage.setItem('visited_utkarsh_portfolio', 'true');
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onComplete={handlePreloadFinished} />}
      <Router>
        <ScrollRestorationManager />
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discom" element={<DiscomArbitrage />} />
            <Route path="/dispatch" element={<StabilityDispatch />} />
            <Route path="/indore" element={<IndoreSim />} />
            <Route path="/sidekick" element={<Sidekick />} />
            <Route path="/sidekick/presentation" element={<SidekickPresentationPage />} />
            <Route path="/sidekick/case-study" element={<SidekickPresentationPage />} />
            <Route path="/chingari" element={<Chingari />} />
            <Route path="/chingari/presentation" element={<ChingariVisualSystemPage />} />
            <Route path="/chingari/visual-system" element={<ChingariVisualSystemPage />} />
            <Route path="/room" element={<Room3D />} />
            <Route path="/essays" element={<Essays />} />
            <Route path="/essays/:id" element={<EssayDetail />} />
            <Route path="/instagram" element={<InstagramArchive />} />
            <Route path="/notes" element={<ResearchNotes />} />
            <Route path="/nuclear-loophole" element={<CaptiveNuclear />} />
            <Route path="/energy-stack" element={<EnergyStack />} />
            <Route path="/desktop" element={<Y2kDesktop />} />
            <Route path="/retro" element={<Y2kDesktop />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
