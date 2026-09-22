/* ============================================
   OBJECTS — Interactive items with soul.
   Every object has a reason to exist.
   ============================================ */

const Objects = (function () {
  'use strict';

  // =============================================
  // DATA — Pocket Adventures
  // =============================================
  const adventures = [
    {
      title: 'Find the coolest rock within 20 metres.',
      subtitle: 'Winner gets to rename it.',
      objectType: 'fortune-cookie',
    },
    {
      title: "Go to McDonald's. Order only fries.",
      subtitle: "Pretend you're reviewing Michelin food.",
      objectType: 'evidence-bag',
    },
    {
      title: 'Go to a bookstore.',
      subtitle: 'Judge books only by their dedication page.',
      objectType: 'folded-note',
    },
    {
      title: 'Buy one crayon. Everyone has 30 seconds.',
      subtitle: 'Draw your childhood bedroom.',
      objectType: 'museum-placard',
    },
    {
      title: 'Everyone must invent a new juice flavour.',
      subtitle: 'Worst one wins.',
      objectType: 'fortune-cookie',
    },
    {
      title: 'Draw the person opposite you without looking.',
      subtitle: 'Sign it. Frame it. Never speak of it.',
      objectType: 'folded-note',
    },
    {
      title: 'Each person chooses one crayon.',
      subtitle: "Explain why it's the most important colour in the universe.",
      objectType: 'evidence-bag',
    },
    {
      title: 'Make the strongest paper boat. Float them.',
      subtitle: 'Loser buys ice cream.',
      objectType: 'museum-placard',
    },
    {
      title: 'If potatoes ruled the world, what would change?',
      subtitle: 'Debate this seriously.',
      objectType: 'fortune-cookie',
    },
    {
      title: 'Invent the worst product ever.',
      subtitle: 'Pitch it Shark Tank style. Straight face required.',
      objectType: 'evidence-bag',
    },
    {
      title: 'Walk outside. Find something beautiful that costs nothing.',
      subtitle: 'Present it like it belongs in the Louvre.',
      objectType: 'folded-note',
    },
    {
      title: 'Create the ugliest birthday card imaginable.',
      subtitle: 'Vote on it. Winner loses.',
      objectType: 'fortune-cookie',
    },
    {
      title: 'Everyone empties one pocket. Build an exhibition.',
      subtitle: 'Give every object a museum-worthy name.',
      objectType: 'museum-placard',
    },
    {
      title: 'Collect three leaves. Rank them.',
      subtitle: 'Defend your rankings like your career depends on it.',
      objectType: 'evidence-bag',
    },
    {
      title: 'Invent a conspiracy theory about pigeons.',
      subtitle: 'The more detailed, the better.',
      objectType: 'folded-note',
    },
    {
      title: 'Interview each other like five-year-olds.',
      subtitle: "What's your favourite dinosaur? Can clouds feel sad?",
      objectType: 'fortune-cookie',
    },
    {
      title: "Tell the dumbest lie you believed until you were twelve.",
      subtitle: 'Group votes on the best one.',
      objectType: 'evidence-bag',
    },
    {
      title: 'Everyone invents a national holiday.',
      subtitle: "Most convincing one gets celebrated today.",
      objectType: 'museum-placard',
    },
  ];

  // =============================================
  // TREASURE BOX ITEMS
  // =============================================
  const treasureItems = [
    {
      id: 'marble',
      html: '<div class="treasure-marble"></div>',
      story: "You had a favourite. You never told anyone which one. Losing it felt like losing a friend.",
      pos: { top: '15%', left: '10%' },
      rotate: 0,
    },
    {
      id: 'ticket',
      html: `<div class="treasure-ticket"><div class="treasure-ticket__number">No. 04728</div></div>`,
      story: "Back seat, window side. That was the unwritten rule. Some friendships started right there.",
      pos: { top: '35%', left: '55%' },
      rotate: -8,
    },
    {
      id: 'star',
      html: `<div class="treasure-star"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg></div>`,
      story: "Teacher gave you one. Once. You kept that page forever.",
      pos: { top: '8%', left: '65%' },
      rotate: 12,
    },
    {
      id: 'clip',
      html: `<div class="treasure-clip"><svg viewBox="0 0 24 60"><path d="M6,4 L6,48 A6,6 0 0,0 18,48 L18,14 A4,4 0 0,0 10,14 L10,42"/></svg></div>`,
      story: "You bent it into shapes during every class you found boring. Which was most of them.",
      pos: { top: '60%', left: '22%' },
      rotate: 25,
    },
    {
      id: 'boat',
      html: `<div class="treasure-boat"><svg viewBox="0 0 70 50"><path d="M5,35 L35,45 L65,35 L55,20 L35,10 L15,20 Z" fill="white" stroke="#B0A899" stroke-width="1.5"/><line x1="35" y1="10" x2="35" y2="45" stroke="#B0A899" stroke-width="1"/></svg></div>`,
      story: "You'd launch it in any puddle and pretend it was crossing an ocean.",
      pos: { top: '70%', left: '60%' },
      rotate: -5,
    },
    {
      id: 'pencil',
      html: '<div class="treasure-pencil"><div class="treasure-pencil__body"></div></div>',
      story: "Too short to sharpen. Too precious to throw away. It lived in the corner of the box.",
      pos: { top: '50%', left: '40%' },
      rotate: 15,
    },
    {
      id: 'eraser',
      html: '<div class="treasure-eraser"></div>',
      story: "The good kind. Not the one that smeared everything. You'd trade your lunch for a good eraser.",
      pos: { top: '25%', left: '35%' },
      rotate: -12,
    },
    {
      id: 'band',
      html: `<div class="treasure-band"><svg viewBox="0 0 60 20"><path d="M5,10 Q15,3 30,10 Q45,17 55,10"/></svg></div>`,
      story: "You'd stretch it between your fingers and aim at absolutely nothing.",
      pos: { top: '80%', left: '15%' },
      rotate: 8,
    },
  ];

  let currentAdventure = 0;
  let typewriterInterval = null;

  // =============================================
  // NOTEBOOK ADVENTURES
  // =============================================
  function initNotebook() {
    // Shuffle adventures
    for (let i = adventures.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [adventures[i], adventures[j]] = [adventures[j], adventures[i]];
    }

    renderAdventure(0, true);

    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', shuffleAdventure);
    }

    // Frog click
    const frog = document.getElementById('notebook-frog');
    if (frog) {
      frog.addEventListener('click', () => {
        frog.classList.add('jumping');
        setTimeout(() => {
          frog.classList.remove('jumping');
          frog.style.opacity = '0';
          // Place the frog somewhere in the treasure section
          setTimeout(() => {
            frog.style.opacity = '0.3';
          }, 2000);
        }, 800);
      });
    }
  }

  function renderAdventure(index, animate) {
    const adventure = adventures[index];
    const titleEl = document.getElementById('adventure-title');
    const subtitleEl = document.getElementById('adventure-subtitle');
    const objectContainer = document.getElementById('adventure-object');

    if (!titleEl || !objectContainer) return;

    if (animate) {
      typewriteText(titleEl, adventure.title, 35, () => {
        typewriteText(subtitleEl, adventure.subtitle, 30);
      });
    } else {
      titleEl.textContent = adventure.title;
      subtitleEl.textContent = adventure.subtitle;
    }

    // Build object on right page
    objectContainer.innerHTML = '';
    const obj = buildObject(adventure);
    if (obj) {
      if (animate) {
        obj.style.opacity = '0';
        obj.style.transform = 'scale(0.9) rotate(-3deg)';
        objectContainer.appendChild(obj);
        requestAnimationFrame(() => {
          obj.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s var(--ease-bounce) 0.3s';
          obj.style.opacity = '1';
          obj.style.transform = 'scale(1) rotate(0deg)';
        });
      } else {
        objectContainer.appendChild(obj);
      }
    }
  }

  function typewriteText(el, text, speed, callback) {
    if (typewriterInterval) clearInterval(typewriterInterval);
    el.textContent = '';
    let i = 0;

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    el.appendChild(cursor);

    typewriterInterval = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      } else {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
        // Remove cursor after a beat
        setTimeout(() => {
          if (cursor.parentNode) cursor.remove();
        }, 1500);
        if (callback) callback();
      }
    }, speed);
  }

  function shuffleAdventure() {
    let next;
    do {
      next = Math.floor(Math.random() * adventures.length);
    } while (next === currentAdventure && adventures.length > 1);
    currentAdventure = next;

    // "Erasing" effect — fade out then type new
    const titleEl = document.getElementById('adventure-title');
    const subtitleEl = document.getElementById('adventure-subtitle');
    const objectContainer = document.getElementById('adventure-object');

    titleEl.style.opacity = '0';
    subtitleEl.style.opacity = '0';
    if (objectContainer.firstChild) {
      objectContainer.firstChild.style.opacity = '0';
      objectContainer.firstChild.style.transform = 'scale(0.8) rotate(5deg)';
    }

    setTimeout(() => {
      titleEl.style.opacity = '1';
      subtitleEl.style.opacity = '1';
      renderAdventure(currentAdventure, true);
    }, 400);
  }

  // =============================================
  // OBJECT BUILDERS
  // =============================================
  function buildObject(adventure) {
    switch (adventure.objectType) {
      case 'fortune-cookie': return buildFortuneCookie(adventure);
      case 'folded-note': return buildFoldedNote(adventure);
      case 'evidence-bag': return buildEvidenceBag(adventure);
      case 'museum-placard': return buildMuseumPlacard(adventure);
      default: return buildFoldedNote(adventure);
    }
  }

  function buildFortuneCookie(adv) {
    const el = document.createElement('div');
    el.className = 'fortune-cookie';
    el.innerHTML = `
      <div class="fortune-cookie__shell">
        <div class="fortune-cookie__half fortune-cookie__half--left"></div>
        <div class="fortune-cookie__half fortune-cookie__half--right"></div>
      </div>
      <div class="fortune-cookie__paper">${adv.title}</div>
      <div class="fortune-cookie__hint">crack it open</div>
    `;
    el.addEventListener('click', () => {
      el.classList.toggle('cracked');
      const hint = el.querySelector('.fortune-cookie__hint');
      hint.textContent = el.classList.contains('cracked') ? '🥠' : 'crack it open';
    });
    return el;
  }

  function buildFoldedNote(adv) {
    const el = document.createElement('div');
    el.className = 'folded-note';
    el.innerHTML = `
      <div class="folded-note__front">
        <div class="folded-note__label">unfold me ↓</div>
      </div>
      <div class="folded-note__inside">
        <div class="folded-note__inside-text">${adv.title}<br><br><span style="color: var(--pencil); font-size: 0.95rem;">${adv.subtitle}</span></div>
      </div>
    `;
    el.addEventListener('click', () => {
      el.classList.toggle('opened');
    });
    return el;
  }

  function buildEvidenceBag(adv) {
    const caseNum = String(Math.floor(Math.random() * 9000) + 1000);
    const el = document.createElement('div');
    el.className = 'evidence-bag';
    el.innerHTML = `
      <div class="evidence-bag__tag">#${caseNum}</div>
      <div class="evidence-bag__label">Evidence</div>
      <div class="evidence-bag__content">${adv.title}<br><br><span style="font-size: 0.9rem; color: var(--pencil);">${adv.subtitle}</span></div>
    `;
    return el;
  }

  function buildMuseumPlacard(adv) {
    const num = Math.floor(Math.random() * 900) + 100;
    const el = document.createElement('div');
    el.className = 'museum-placard';
    el.innerHTML = `
      <div class="museum-placard__number">No. ${num}</div>
      <div class="museum-placard__title">${adv.title}</div>
      <div class="museum-placard__desc">${adv.subtitle}</div>
      <div class="museum-placard__stamp">Do Not Touch</div>
    `;
    return el;
  }

  // =============================================
  // TREASURE DESK
  // =============================================
  function initTreasure() {
    const desk = document.getElementById('treasure-desk');
    if (!desk) return;

    treasureItems.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'treasure__item';
      el.style.top = item.pos.top;
      el.style.left = item.pos.left;
      el.style.transform = `rotate(${item.rotate}deg)`;
      el.innerHTML = item.html;
      el.dataset.itemId = item.id;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        showTreasureStory(item, el);
      });

      desk.appendChild(el);
    });

    // Close stories when clicking desk
    desk.addEventListener('click', () => {
      desk.querySelectorAll('.treasure__story.visible').forEach(s => {
        s.classList.remove('visible');
        setTimeout(() => s.remove(), 400);
      });
    });
  }

  function showTreasureStory(item, element) {
    // Remove existing stories
    const desk = document.getElementById('treasure-desk');
    desk.querySelectorAll('.treasure__story').forEach(s => s.remove());

    const story = document.createElement('div');
    story.className = 'treasure__story';
    story.innerHTML = `<div class="treasure__story-text">${item.story}</div>`;

    // Position near the item
    const itemRect = element.getBoundingClientRect();
    const deskRect = desk.getBoundingClientRect();
    const relLeft = itemRect.left - deskRect.left + itemRect.width + 15;
    const relTop = itemRect.top - deskRect.top - 10;

    story.style.left = Math.min(relLeft, deskRect.width - 270) + 'px';
    story.style.top = relTop + 'px';

    desk.appendChild(story);

    requestAnimationFrame(() => {
      story.classList.add('visible');
    });

    // Close on click
    story.addEventListener('click', (e) => {
      e.stopPropagation();
      story.classList.remove('visible');
      setTimeout(() => story.remove(), 400);
    });
  }

  // =============================================
  // LIBRARY CARD SIGNUP
  // =============================================
  function initLibrary() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email');
      if (!email || !email.value.trim()) return;

      const card = document.getElementById('library-card');
      const stamp = document.getElementById('library-stamp');

      card.classList.add('submitted');
      stamp.classList.add('stamped');

      // Paper scrap confetti
      launchConfetti();
    });
  }

  function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#D94F3B', '#F0C836', '#6BA3D6', '#4A7C59', '#E8A4A0', '#9B8EC4', '#F5E6CA'];
    for (let i = 0; i < 45; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 4 + Math.random() * 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isRound = Math.random() > 0.6;
      piece.style.cssText = `
        width: ${size}px;
        height: ${isRound ? size : size * 1.5}px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        border-radius: ${isRound ? '50%' : '1px'};
        animation: confettiFall ${2 + Math.random() * 1.5}s ${Math.random() * 0.5}s ease-out forwards;
      `;
      container.appendChild(piece);
    }

    setTimeout(() => { container.innerHTML = ''; }, 4000);
  }

  // =============================================
  // FOOTER FROG
  // =============================================
  function initFooterFrog() {
    const frog = document.getElementById('footer-frog');
    const ribbit = document.getElementById('footer-ribbit');
    if (!frog || !ribbit) return;

    frog.addEventListener('click', () => {
      ribbit.classList.add('visible');
      setTimeout(() => {
        ribbit.classList.remove('visible');
      }, 1500);
    });
  }

  // =============================================
  // POLAROID DRAG
  // =============================================
  function initPolaroids() {
    document.querySelectorAll('[data-draggable]').forEach(el => {
      let startX, startY, origTransform;
      let isDragging = false;

      el.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        origTransform = el.style.transform || getComputedStyle(el).transform;
        el.style.zIndex = '10';
        el.style.transition = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = (e.clientX - startX) * 0.4; // Dampened
        const dy = (e.clientY - startY) * 0.4;
        const rot = dx * 0.05;
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      });

      document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = '';
        el.style.zIndex = '';

        // Reset computed style on next tick
        setTimeout(() => {
          el.style.transition = '';
        }, 500);
      });
    });
  }

  return {
    initNotebook,
    initTreasure,
    initLibrary,
    initFooterFrog,
    initPolaroids,
  };
})();
