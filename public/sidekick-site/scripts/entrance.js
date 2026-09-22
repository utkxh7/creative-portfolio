/* ============================================
   ENTRANCE — The paper unfold sequence.
   Curiosity → Confusion → Smile → Understanding.
   ============================================ */

const Entrance = (function () {
  'use strict';

  const messages = [
    "We've been waiting.",
    "You don't miss childhood.",
    "You miss having permission.",
  ];

  let step = 0;
  let isAnimating = false;
  let impatientTimer = null;

  function init() {
    const paper = document.getElementById('entrance-paper');
    const hint = document.getElementById('entrance-hint');
    if (!paper) return;

    // Show hint after a beat
    setTimeout(() => {
      hint.classList.add('visible');
    }, 1200);

    // Impatient wiggle after 30 seconds of no click
    impatientTimer = setTimeout(() => {
      paper.classList.add('impatient');
      const textEl = document.getElementById('entrance-text');
      textEl.textContent = '...hello?';
      textEl.classList.add('visible');
    }, 30000);

    paper.addEventListener('click', handleClick);
  }

  function handleClick() {
    if (isAnimating) return;
    isAnimating = true;

    clearTimeout(impatientTimer);

    const paper = document.getElementById('entrance-paper');
    const hint = document.getElementById('entrance-hint');
    const textEl = document.getElementById('entrance-text');

    paper.classList.remove('impatient');

    if (step === 0) {
      // First click: unfold, show first message
      hint.classList.remove('visible');
      textEl.classList.remove('visible');
      textEl.textContent = '';

      setTimeout(() => {
        textEl.textContent = messages[0];
        textEl.classList.remove('fading');
        textEl.classList.add('visible');
        isAnimating = false;
        step++;
      }, 200);

    } else if (step <= messages.length - 1) {
      // Subsequent clicks: fade out, then show next message
      textEl.classList.remove('visible');
      textEl.classList.add('fading');

      setTimeout(() => {
        textEl.textContent = messages[step];
        textEl.classList.remove('fading');
        textEl.classList.add('visible');
        isAnimating = false;
        step++;
      }, 400);

    } else {
      // Final click: paper flies away, reveal Sidekick
      textEl.classList.remove('visible');
      textEl.classList.add('fading');

      setTimeout(() => {
        paper.classList.add('flying-away');
      }, 300);

      // Show reveal text
      setTimeout(() => {
        document.getElementById('entrance-reveal').classList.add('visible');
      }, 1000);

      // Fade out entrance, show world
      setTimeout(() => {
        const entrance = document.getElementById('entrance');
        entrance.classList.add('exiting');
        document.getElementById('world').classList.add('visible');
        document.getElementById('scroll-arrow').classList.add('visible');

        // Hide scroll arrow after first scroll
        const hideArrow = () => {
          document.getElementById('scroll-arrow').classList.remove('visible');
          window.removeEventListener('scroll', hideArrow);
        };
        window.addEventListener('scroll', hideArrow);
      }, 2500);

      // Fully remove entrance
      setTimeout(() => {
        document.getElementById('entrance').classList.add('gone');
      }, 3500);

      // Remove click listener
      paper.removeEventListener('click', handleClick);
    }
  }

  return { init };
})();
