/* ============================================
   EASTER EGGS — Hidden discoveries that
   reward curiosity.
   ============================================ */

const EasterEggs = (function () {
  'use strict';

  let hasReachedBottom = false;
  let keyBuffer = '';

  function init() {
    initShakeDetection();
    initKeyboardHello();
    initExplorerBadge();
  }

  // =============================================
  // SHAKE DETECTION — Wobble everything
  // =============================================
  function initShakeDetection() {
    let positions = [];

    document.addEventListener('mousemove', (e) => {
      positions.push({ x: e.clientX, t: Date.now() });
      if (positions.length > 15) positions.shift();

      if (positions.length >= 10) {
        let changes = 0;
        for (let i = 2; i < positions.length; i++) {
          const d1 = positions[i - 1].x - positions[i - 2].x;
          const d2 = positions[i].x - positions[i - 1].x;
          if (d1 * d2 < 0) changes++;
        }

        if (changes >= 5) {
          triggerWobble();
          positions = [];
        }
      }
    });
  }

  function triggerWobble() {
    document.body.style.animation = 'wobble 0.5s ease';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);

    // Add wobble keyframe if not exists
    if (!document.getElementById('wobble-style')) {
      const style = document.createElement('style');
      style.id = 'wobble-style';
      style.textContent = `
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(0.5deg); }
          40% { transform: rotate(-0.5deg); }
          60% { transform: rotate(0.3deg); }
          80% { transform: rotate(-0.3deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // =============================================
  // KEYBOARD "HELLO" — Wave emoji drifts across
  // =============================================
  function initKeyboardHello() {
    document.addEventListener('keydown', (e) => {
      // Don't capture when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);

      if (keyBuffer.includes('hello')) {
        keyBuffer = '';
        spawnFloatingWave();
      }
    });
  }

  function spawnFloatingWave() {
    const wave = document.createElement('div');
    wave.className = 'floating-wave';
    wave.textContent = '👋';
    wave.style.left = (20 + Math.random() * 60) + 'vw';
    wave.style.top = (30 + Math.random() * 40) + 'vh';
    document.body.appendChild(wave);

    setTimeout(() => wave.remove(), 3000);
  }

  // =============================================
  // EXPLORER BADGE — Scroll back to top after bottom
  // =============================================
  function initExplorerBadge() {
    window.addEventListener('scroll', () => {
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      if (scrollMax <= 0) return;

      const scrollPercent = window.scrollY / scrollMax;

      // Mark when user reaches bottom
      if (scrollPercent > 0.95) {
        hasReachedBottom = true;
      }

      // Award badge when scrolling back to top
      if (hasReachedBottom && scrollPercent < 0.05) {
        hasReachedBottom = false;
        showExplorerBadge();
      }
    });
  }

  function showExplorerBadge() {
    const badge = document.getElementById('explorer-badge');
    if (!badge || badge.classList.contains('visible')) return;

    badge.classList.add('visible');

    setTimeout(() => {
      badge.classList.remove('visible');
    }, 3000);
  }

  return { init };
})();
