(function () {
  'use strict';

  // ── Socket.io Connection & User Identity ───────────────────
  const socket = typeof io !== 'undefined' ? io() : null;

  let myUserId = localStorage.getItem('sk_user_id');
  if (!myUserId) {
    myUserId = 'usr_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('sk_user_id', myUserId);
  }

  let blockedUserIds = [];
  try {
    blockedUserIds = JSON.parse(localStorage.getItem('sk_blocked_users') || '[]');
  } catch (e) {
    blockedUserIds = [];
  }

  // ── DOM Elements ───────────────────────────────────────────
  const p1Name = document.getElementById('p1-name');
  const p1Song = document.getElementById('p1-song');
  const termsAgree = document.getElementById('terms-agree');

  const matchBtn = document.getElementById('match-trigger-btn');
  const btnLabel = document.getElementById('btn-label');
  const btnLoader = document.getElementById('btn-loader');
  const shortcutTip = document.getElementById('shortcut-tip');
  const connectorNode = document.getElementById('connector-node');
  const activePlayersEl = document.getElementById('active-players');

  // Player 2 Elements
  const p2StatusPill = document.getElementById('p2-status-pill');
  const p2MetaText = document.getElementById('p2-meta-text');
  const mysteryState = document.getElementById('mystery-state');
  const mysterySubtext = document.getElementById('mystery-subtext');
  const scanningState = document.getElementById('scanning-state');
  const scanLabelText = document.getElementById('scan-label-text');
  const revealedState = document.getElementById('revealed-state');

  // Ticker Reel Elements
  const tickName = document.getElementById('tick-name');
  const tickVibe = document.getElementById('tick-vibe');
  const tickSong = document.getElementById('tick-song');

  // Revealed Match Profile Elements
  const p2RevealedName = document.getElementById('p2-revealed-name');
  const p2RevealedVibe = document.getElementById('p2-revealed-vibe');
  const p2RevealedSong = document.getElementById('p2-revealed-song');
  const matchAffinity = document.getElementById('match-affinity');

  // Destination Elements
  const destSection = document.getElementById('destination-section');
  const destPartnerName = document.getElementById('dest-partner-name');
  const launchHangoutBtn = document.getElementById('launch-hangout-btn');
  const rematchBtn = document.getElementById('rematch-btn');
  const destItems = document.querySelectorAll('.dest-item');

  // Hangout Modal & Persistent Chat Elements
  const hangoutModal = document.getElementById('hangout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalRoomId = document.getElementById('modal-room-id');
  const modalDestName = document.getElementById('modal-dest-name');
  const modalP1Name = document.getElementById('modal-p1-name');
  const modalP1Vibe = document.getElementById('modal-p1-vibe');
  const modalP2Name = document.getElementById('modal-p2-name');
  const modalP2Vibe = document.getElementById('modal-p2-vibe');
  const canvasTag = document.getElementById('canvas-tag');
  const canvasTagline = document.getElementById('canvas-tagline');
  const canvasActivity = document.getElementById('canvas-activity');
  const canvasPlaceholderView = document.getElementById('canvas-placeholder-view');
  const destIframe = document.getElementById('dest-iframe');
  const openDestBtn = document.getElementById('open-dest-btn');
  const reportBlockBtn = document.getElementById('report-block-btn');
  const endHangoutBtn = document.getElementById('end-hangout-btn');
  const alertBanner = document.getElementById('hangout-alert-banner');
  const alertText = document.getElementById('hangout-alert-text');
  const bannerActionBtn = document.getElementById('banner-action-btn');

  // Chat Elements
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatTextInput = document.getElementById('chat-text-input');

  // Check-in Survey Dialog Elements
  const checkinModal = document.getElementById('checkin-modal');
  const checkinBtns = document.querySelectorAll('.checkin-btn');
  const checkinComment = document.getElementById('checkin-comment');
  const checkinSubmitBtn = document.getElementById('checkin-submit-btn');

  // ── State Variables ────────────────────────────────────────
  let isMatching = false;
  let hasMatched = false;
  let currentRoomId = null;
  let currentPartner = null;
  let currentDestination = {
    title: 'Tokyo Neon Backstreets',
    category: 'Explore',
    mode: 'Street View 360',
    url: 'https://www.google.com/maps/@35.659037,139.700344,3a,75y,90t/data=!3m6!1e1!3m4!1s-L1uM_Zz32wAAAQZ-oE4cw!2e0!7i16384!8i8192',
    isIframe: false
  };

  // 5 Quiz Answers
  const quizAnswers = [null, null, null, null, null];
  let selectedFeedbackRating = 'Yes';
  let tickerInterval = null;

  // ── Live Connected Wanderers Counter (Real-time) ───────────
  if (socket) {
    socket.on('stats:update', (data) => {
      if (!activePlayersEl) return;
      const count = data.onlineCount || 1;
      activePlayersEl.textContent = count;
      const counterLabel = document.querySelector('.counter-text');
      if (counterLabel) {
        counterLabel.innerHTML = `<span id="active-players">${count}</span> wanderer${count === 1 ? '' : 's'} online`;
      }
    });
  }

  // ── Quick Song Chips ───────────────────────────────────────
  document.querySelectorAll('#song-chips .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const val = chip.dataset.val;
      if (p1Song) {
        p1Song.value = val;
        p1Song.focus();
        chip.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
      }
    });
  });

  // ── Vibe Calibration Quiz Selection ────────────────────────
  document.querySelectorAll('.quiz-card').forEach((card) => {
    const qIndex = parseInt(card.dataset.q, 10);
    const options = card.querySelectorAll('.quiz-opt');

    options.forEach((opt) => {
      opt.addEventListener('click', () => {
        options.forEach((o) => o.classList.remove('active'));
        opt.classList.add('active');
        quizAnswers[qIndex] = opt.dataset.tag;
      });
    });
  });

  // ── Form Validation ────────────────────────────────────────
  function validateInputs() {
    const name = p1Name.value.trim();
    const song = p1Song.value.trim();
    const agreed = termsAgree.checked;

    if (!name) {
      flashError(p1Name, 'Please enter a handle or name.');
      return false;
    }
    if (!song) {
      flashError(p1Song, 'Please pick or enter your current anthem.');
      return false;
    }
    if (!agreed) {
      termsAgree.focus();
      flashTip('You must confirm you are 18 or older to proceed.');
      return false;
    }

    const unanswered = quizAnswers.findIndex((ans) => !ans);
    if (unanswered !== -1) {
      const targetCard = document.querySelector(`.quiz-card[data-q="${unanswered}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.borderColor = 'rgba(239, 68, 68, 0.6)';
        setTimeout(() => {
          targetCard.style.borderColor = '';
        }, 2000);
      }
      flashTip(`Please answer Question Q${unanswered + 1} of the vibe quiz.`);
      return false;
    }

    return true;
  }

  function flashError(inputEl, msg) {
    inputEl.style.borderColor = '#ef4444';
    inputEl.focus();
    flashTip(msg);
    setTimeout(() => {
      inputEl.style.borderColor = '';
    }, 2000);
  }

  function flashTip(text) {
    shortcutTip.innerHTML = `<span style="color: #ef4444; font-weight: 500;">${text}</span>`;
    setTimeout(() => {
      shortcutTip.innerHTML = 'Complete Player Card &amp; Vibe Quiz to start &bull; Real two-player pairing';
    }, 3000);
  }

  // ── Real Matchmaking Queue Trigger ─────────────────────────
  function triggerMatchmaking() {
    if (isMatching) return;

    if (hasMatched) {
      resetToLobby();
      return;
    }

    if (!validateInputs()) return;

    isMatching = true;
    matchBtn.disabled = true;
    btnLabel.textContent = 'Searching Active Grid...';
    btnLoader.classList.remove('hidden');
    connectorNode.classList.add('active');

    // Switch P2 card view to scanning ticker mode
    mysteryState.classList.add('hidden');
    revealedState.classList.add('hidden');
    scanningState.classList.remove('hidden');
    p2StatusPill.textContent = 'Scanning Frequency Grid';
    p2MetaText.textContent = 'Matching Mode: Live Queue';

    startReelsScanningAnimation();

    if (socket && socket.connected) {
      socket.emit('find_match', {
        userId: myUserId,
        name: p1Name.value.trim(),
        anthem: p1Song.value.trim(),
        vibeTags: quizAnswers,
        blockedUserIds: blockedUserIds
      });
    } else {
      // Interactive Demo & Offline Fallback
      setTimeout(() => {
        handleMatchSuccess({
          roomId: 'room:LIVE-' + Math.floor(1000 + Math.random() * 9000),
          synergy: Math.floor(92 + Math.random() * 7),
          partner: {
            id: 'partner-sim',
            name: 'Nova',
            anthem: 'Genesis — Grimes',
            vibeTags: [quizAnswers[0] || 'Late-Night Wanderer', quizAnswers[1] || 'Ambient Explorer']
          }
        });
      }, 2500);
    }
  }

  // ── Scanning Ticker Animation ──────────────────────────────
  function startReelsScanningAnimation() {
    const CANDIDATES = ['NOVA', 'KAI', 'ASTRID', 'ELENA', 'ROWAN', 'JULIAN', 'RENE', 'KENJI'];
    const MOODS = ['LATE-NIGHT WANDERER', 'DEEP-DIVE CREATIVE', 'COZY & SLOW', 'CHAOTIC GOOD'];
    const SONGS = ['MIDNIGHT CITY', 'OBLIVION', 'SPACE SONG', 'GENESIS', 'DIGITAL LOVE'];

    let tick = 0;
    if (tickerInterval) clearInterval(tickerInterval);

    tickerInterval = setInterval(() => {
      tick++;
      if (!hasMatched) {
        tickName.textContent = CANDIDATES[tick % CANDIDATES.length];
        tickVibe.textContent = MOODS[tick % MOODS.length];
        tickSong.textContent = SONGS[tick % SONGS.length];
      }
    }, 70);
  }

  // ── Match Received Handler ─────────────────────────────────
  function handleMatchSuccess(data) {
    const { roomId, synergy, partner } = data;
    currentRoomId = roomId;
    currentPartner = partner;
    hasMatched = true;
    isMatching = false;

    if (tickerInterval) clearInterval(tickerInterval);

    // Staggered ticker stop locks on real partner
    tickName.textContent = partner.name.toUpperCase();
    tickName.closest('.ticker-box').classList.add('locked');

    setTimeout(() => {
      tickVibe.textContent = (partner.vibeTags[0] || 'VIBE ALIGNED').toUpperCase();
      tickVibe.closest('.ticker-box').classList.add('locked');
    }, 200);

    setTimeout(() => {
      tickSong.textContent = (partner.anthem || 'SHARED HARMONY').toUpperCase();
      tickSong.closest('.ticker-box').classList.add('locked');
    }, 400);

    setTimeout(() => {
      revealMatchResult(partner, synergy);
    }, 700);
  }

  // ── Reveal Match Result Profile ────────────────────────────
  function revealMatchResult(partner, synergy) {
    scanningState.classList.add('hidden');
    revealedState.classList.remove('hidden');

    p2StatusPill.textContent = 'Connected Live';
    p2MetaText.textContent = `Active Session`;

    // Populate revealed fields
    p2RevealedName.textContent = partner.name;
    p2RevealedVibe.textContent = partner.vibeTags.slice(0, 2).join(' • ');
    p2RevealedSong.textContent = partner.anthem;
    matchAffinity.textContent = `${synergy}% Synergy Alignment`;

    // Update destination card partner name
    if (destPartnerName) destPartnerName.textContent = partner.name;

    destSection.classList.remove('hidden');
    destSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Update match action button
    matchBtn.disabled = false;
    btnLoader.classList.add('hidden');
    btnLabel.textContent = 'Matched ✦ Open Lobby';
    shortcutTip.innerHTML = `Paired with <strong>${partner.name}</strong>! Click "Open Shared Hangout Lobby" below to start.`;

    // Initialize modal state
    modalRoomId.textContent = currentRoomId.replace('room:', '#');
    modalP1Name.textContent = p1Name.value.trim();
    modalP1Vibe.textContent = quizAnswers[0] || 'Ready';
    modalP2Name.textContent = partner.name;
    modalP2Vibe.textContent = partner.vibeTags[0] || 'Connected';
  }

  // ── Destination Selection Handling ─────────────────────────
  destItems.forEach((item) => {
    item.addEventListener('click', () => {
      destItems.forEach((d) => d.classList.remove('active'));
      item.classList.add('active');

      currentDestination = {
        title: item.dataset.title,
        category: item.dataset.category,
        mode: item.dataset.mode,
        url: item.dataset.url,
        isIframe: item.dataset.iframe === 'true'
      };

      if (socket && currentRoomId) {
        socket.emit('select_destination', {
          roomId: currentRoomId,
          destination: currentDestination
        });
      }

      applyDestination(currentDestination);
    });
  });

  function applyDestination(dest) {
    modalDestName.textContent = dest.title;
    canvasTag.textContent = `✦ ${dest.category}: ${dest.mode}`;
    canvasActivity.textContent = `Current destination: ${dest.title}`;

    if (dest.isIframe) {
      canvasPlaceholderView.classList.add('hidden');
      destIframe.src = dest.url;
      destIframe.classList.remove('hidden');
    } else {
      destIframe.classList.add('hidden');
      destIframe.src = '';
      canvasPlaceholderView.classList.remove('hidden');
    }
  }

  openDestBtn.addEventListener('click', () => {
    if (currentDestination && currentDestination.url) {
      window.open(currentDestination.url, '_blank', 'noopener,noreferrer');
    }
  });

  // ── Hangout Modal & Persistent Chat Handlers ────────────────
  function openHangoutModal() {
    if (!currentPartner || !currentRoomId) return;
    alertBanner.classList.add('hidden');
    hangoutModal.showModal();
    chatTextInput.focus();
  }

  function closeHangoutModal() {
    hangoutModal.close();
  }

  launchHangoutBtn.addEventListener('click', openHangoutModal);
  modalCloseBtn.addEventListener('click', closeHangoutModal);

  // Send Chat Message
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatTextInput.value.trim();
    if (!text || !currentRoomId) return;

    if (socket) {
      socket.emit('chat_message', {
        roomId: currentRoomId,
        text: text,
        senderName: p1Name.value.trim() || 'You'
      });
    }
    chatTextInput.value = '';
  });

  function renderChatMessage(msg) {
    const isMine = msg.senderId === (socket ? socket.id : null);
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${isMine ? 'mine' : 'theirs'}`;

    const time = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    msgEl.innerHTML = `
      <span class="chat-meta">${escapeHtml(msg.senderName)} &bull; ${time}</span>
      <div class="chat-bubble">${escapeHtml(msg.text)}</div>
    `;

    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function renderNotice(text, isError = false) {
    const noticeEl = document.createElement('div');
    noticeEl.className = isError ? 'chat-flag-notice' : 'chat-notice';
    noticeEl.textContent = text;
    chatMessages.appendChild(noticeEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Visible Report / Block Action ──────────────────────────
  reportBlockBtn.addEventListener('click', () => {
    // Instant safety action: immediately terminates hangout and blocks user
    if (currentPartner && currentPartner.id) {
      if (!blockedUserIds.includes(currentPartner.id)) {
        blockedUserIds.push(currentPartner.id);
        localStorage.setItem('sk_blocked_users', JSON.stringify(blockedUserIds));
      }

      if (socket && currentRoomId) {
        socket.emit('report_and_block', {
          roomId: currentRoomId,
          reportedUserId: currentPartner.id,
          reason: 'Reported via safety action'
        });
      }
    }

    closeHangoutModal();
    openCheckinDialog('Hangout ended. Safety report submitted and user blocked.');
  });

  // End Hangout Button
  endHangoutBtn.addEventListener('click', () => {
    if (socket && currentRoomId) {
      socket.emit('leave_hangout', { roomId: currentRoomId });
    }
    closeHangoutModal();
    openCheckinDialog('You left the hangout.');
  });

  bannerActionBtn.addEventListener('click', () => {
    closeHangoutModal();
    openCheckinDialog('Partner disconnected.');
  });

  // ── Post-Hangout Check-in Feedback ─────────────────────────
  function openCheckinDialog(reason) {
    selectedFeedbackRating = 'Yes';
    checkinBtns.forEach((b) => {
      b.classList.toggle('active', b.dataset.rating === 'Yes');
    });
    if (checkinComment) checkinComment.value = '';
    checkinModal.showModal();
  }

  checkinBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      checkinBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFeedbackRating = btn.dataset.rating;
    });
  });

  checkinSubmitBtn.addEventListener('click', () => {
    const comment = checkinComment ? checkinComment.value.trim() : '';

    if (socket) {
      socket.emit('post_feedback', {
        rating: selectedFeedbackRating,
        comment,
        roomId: currentRoomId || 'none'
      });
    }

    checkinModal.close();
    resetToLobby();
  });

  // ── Reset to Lobby State ───────────────────────────────────
  function resetToLobby() {
    hasMatched = false;
    isMatching = false;
    currentRoomId = null;
    currentPartner = null;

    if (tickerInterval) clearInterval(tickerInterval);

    matchBtn.classList.remove('matched');
    matchBtn.disabled = false;
    btnLabel.textContent = 'Find a Hangout';
    btnLoader.classList.add('hidden');
    connectorNode.classList.remove('active');

    document.querySelectorAll('.ticker-box').forEach((b) => b.classList.remove('locked'));
    revealedState.classList.add('hidden');
    scanningState.classList.add('hidden');
    mysteryState.classList.remove('hidden');

    p2StatusPill.textContent = 'Awaiting Match';
    p2MetaText.textContent = 'Target Synchronizer';

    destSection.classList.add('hidden');
    chatMessages.innerHTML = '<div class="chat-notice">Matched! Say hello to your hangout partner. Keep it friendly &bull; No slurs or solicitation permitted.</div>';

    shortcutTip.innerHTML = 'Complete Player Card &amp; Vibe Quiz to start &bull; Real two-player pairing';
  }

  // ── Socket Events Listeners ────────────────────────────────
  if (socket) {
    socket.on('matching_queued', (data) => {
      btnLabel.textContent = 'Scanning Frequency Grid...';
      shortcutTip.innerHTML = 'Searching for an active wanderer... (Open a 2nd browser tab to test pairing!)';
    });

    socket.on('match_found', (data) => {
      handleMatchSuccess(data);
    });

    socket.on('chat_message', (msg) => {
      renderChatMessage(msg);
    });

    socket.on('chat_blocked', (data) => {
      renderNotice(data.message, true);
    });

    socket.on('destination_updated', ({ destination }) => {
      currentDestination = destination;
      destItems.forEach((d) => {
        d.classList.toggle('active', d.dataset.title === destination.title);
      });
      applyDestination(destination);
    });

    socket.on('partner_disconnected', (data) => {
      alertText.textContent = data.message || 'Your partner has left the hangout.';
      alertBanner.classList.remove('hidden');
      renderNotice('Your partner has disconnected from this hangout.', true);
    });

    socket.on('hangout_ended', (data) => {
      alertText.textContent = data.reason || 'Partner has ended the hangout.';
      alertBanner.classList.remove('hidden');
      renderNotice('Hangout has ended.', true);
    });

    socket.on('error_message', (data) => {
      flashTip(data.message);
      isMatching = false;
      matchBtn.disabled = false;
      btnLoader.classList.add('hidden');
      btnLabel.textContent = 'Find a Hangout';
    });
  }

  // ── Event Listeners ────────────────────────────────────────
  matchBtn.addEventListener('click', () => {
    if (hasMatched) {
      openHangoutModal();
    } else {
      triggerMatchmaking();
    }
  });

  rematchBtn.addEventListener('click', resetToLobby);

  // Keyboard shortcut: Ctrl/Cmd + Enter
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      triggerMatchmaking();
    }
  });
})();
