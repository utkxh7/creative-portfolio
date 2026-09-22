/* ============================================
   MAIN — The orchestrator.
   Wires everything together.
   ============================================ */

(function () {
  'use strict';

  function init() {
    // Start the entrance sequence
    Entrance.init();

    // Initialize all interactive objects
    Objects.initNotebook();
    Objects.initTreasure();
    Objects.initLibrary();
    Objects.initFooterFrog();
    Objects.initPolaroids();

    // Scroll-driven effects
    ScrollEngine.init();

    // Physics & micro-interactions
    Physics.init();

    // Hidden discoveries
    EasterEggs.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
