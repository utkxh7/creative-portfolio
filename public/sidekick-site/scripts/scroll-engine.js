/* ============================================
   SCROLL ENGINE — Reveals, parallax,
   pencil underline, chalk writing.
   ============================================ */

const ScrollEngine = (function () {
  'use strict';

  function init() {
    initReveal();
    initPencilUnderline();
  }

  // =============================================
  // SCROLL REVEAL
  // =============================================
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // =============================================
  // PENCIL UNDERLINE ON SCROLL
  // Draws a line under the philosophy "moments" text
  // =============================================
  function initPencilUnderline() {
    const moments = document.querySelector('.philosophy__moments');
    if (!moments) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          moments.classList.add('underlined');
          observer.unobserve(moments);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(moments);
  }

  return { init };
})();
