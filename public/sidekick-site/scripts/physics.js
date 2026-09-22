/* ============================================
   PHYSICS — Marble roll, paper clip wiggle,
   rubber band stretch. Micro-interactions
   that feel alive.
   ============================================ */

const Physics = (function () {
  'use strict';

  function init() {
    initMarbleFollow();
    initChalkboard();
  }

  // =============================================
  // MARBLE — Rolls slightly toward cursor
  // =============================================
  function initMarbleFollow() {
    const marbles = document.querySelectorAll('.treasure-marble');
    marbles.forEach(marble => {
      const parent = marble.closest('.treasure__item');
      if (!parent) return;

      parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.08;
        const dy = (e.clientY - cy) * 0.08;
        marble.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      parent.addEventListener('mouseleave', () => {
        marble.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        marble.style.transform = '';
        setTimeout(() => { marble.style.transition = ''; }, 400);
      });
    });
  }

  // =============================================
  // CHALKBOARD — Name cycling with chalk effect
  // =============================================
  function initChalkboard() {
    const nameEl = document.getElementById('chalkboard-name');
    if (!nameEl) return;

    const names = [
      'Pocket Adventure',
      'Tiny Excuse',
      "Today's Detour",
      'Borrowed Afternoon',
      'Accidental Plan',
      'Found in the Wild',
    ];

    let current = 0;

    setInterval(() => {
      nameEl.classList.add('erasing');

      setTimeout(() => {
        current = (current + 1) % names.length;
        nameEl.textContent = names[current];
        nameEl.classList.remove('erasing');
      }, 600);
    }, 3500);
  }

  return { init };
})();
