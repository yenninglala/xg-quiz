/* ─────────────────────────────────────
   quiz.js — quiz state & DOM updates
   Depends on: data.js, canvas-card.js
───────────────────────────────────── */

const Quiz = (function () {

  /* ── State ── */
  let current   = 0;
  let scores    = {};
  let selected  = null;
  let winnerKey = null;

  /* ── Init ── */
  function init() {
    _resetScores();
    _render();
    document.getElementById('next-btn').addEventListener('click', next);
  }

  function _resetScores() {
    scores = {};
    Object.keys(MEMBERS).forEach(k => (scores[k] = 0));
  }

  /* ── Render question ── */
  function _render() {
    const q   = QUESTIONS[current];
    const pct = Math.round((current / QUESTIONS.length) * 100);

    document.getElementById('prog-fill').style.width = pct + '%';
    document.getElementById('prog-num').textContent  =
      String(current).padStart(2, '0') + '/' + String(QUESTIONS.length).padStart(2, '0');
    document.getElementById('q-label').textContent =
      'QUESTION_' + String(current + 1).padStart(2, '0');
    document.getElementById('q-text').textContent = q.text;

    const wrap = document.getElementById('options-wrap');
    wrap.innerHTML = q.options
      .map((o, i) => `<button class="opt-btn" data-index="${i}">${o.text}</button>`)
      .join('');

    // Attach option listeners (no inline onclick)
    wrap.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => _pickOption(btn));
    });

    selected = null;
    const nb = document.getElementById('next-btn');
    nb.classList.remove('show');
    nb.textContent = current < QUESTIONS.length - 1 ? 'TRANSMIT →' : 'INITIATE SCAN ✦';
  }

  function _pickOption(btn) {
    document.querySelectorAll('.opt-btn').forEach(b =>
      b.classList.toggle('selected', b === btn)
    );
    selected = parseInt(btn.dataset.index, 10);

    // Ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = rect.width * 2;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${-rect.width / 2}px;top:${-rect.width / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);

    document.getElementById('next-btn').classList.add('show');
  }

  /* ── Advance question ── */
  function next() {
    if (selected === null) return;

    // Tally scores
    const option = QUESTIONS[current].options[selected];
    Object.entries(option.scores).forEach(([k, v]) => (scores[k] += v));

    // Animate card out → in
    const card = document.getElementById('q-card');
    card.classList.add('transitioning');

    setTimeout(() => {
      current++;
      if (current >= QUESTIONS.length) {
        _showResult();
        return;
      }
      _render();
      card.classList.remove('transitioning');
      card.classList.add('entering');
      setTimeout(() => card.classList.remove('entering'), 400);
    }, 300);
  }

  /* ── Show result ── */
  function _showResult() {
    winnerKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const m   = MEMBERS[winnerKey];

    // Progress to 100
    document.getElementById('prog-fill').style.width = '100%';
    document.getElementById('prog-num').textContent  = '07/07';

    // Background ring
    const ring = document.getElementById('result-bg-ring');
    ring.style.border    = `1px solid ${m.color}33`;
    ring.style.boxShadow = `0 0 80px ${m.color}22, inset 0 0 80px ${m.color}11`;
    ring.classList.add('visible');

    // Avatar
    const av = document.getElementById('r-avatar');
    av.style.background = m.color;
    av.textContent      = winnerKey[0];
    const ar = document.getElementById('avatar-ring');
    ar.style.background = m.color + '22';
    ar.style.border     = `2px solid ${m.color}66`;

    // Result card CSS vars
    const rc = document.getElementById('result-card');
    rc.style.setProperty('--member-color-20', m.color + '33');
    rc.style.setProperty('--member-color-50', m.color + '55');
    rc.style.borderColor = m.color + '30';

    // Text
    document.getElementById('r-name').textContent = winnerKey + ' ' + m.emoji;
    document.getElementById('r-name').style.color  = m.color;
    document.getElementById('r-desc').textContent  = m.desc;
    document.getElementById('r-traits').innerHTML  = m.traits
      .map(t => `<span class="trait" style="color:${m.color};border-color:${m.color}66;background:${m.color}11">${t}</span>`)
      .join('');

    // Highlight member dot
    document.querySelectorAll('.member-node').forEach(d =>
      d.classList.toggle('active', d.dataset.name === winnerKey)
    );

    // Draw shareable card
    drawResultCanvas(winnerKey, m);

    // Confetti 🎉
    _launchConfetti(m.color);

    // Switch sections
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').classList.add('show');
  }

  /* ── Confetti ── */
  function _launchConfetti(baseColor) {
    const palette = [baseColor, '#CF9FFF', '#5BE0FF', '#3EFFAA', '#FFE566', '#FF9A3C'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const el   = document.createElement('div');
        el.className = 'confetti-piece';
        const size = Math.random() * 8 + 4;
        el.style.cssText = `
          left:${Math.random() * 100}vw;
          width:${size}px;
          height:${size * (Math.random() > 0.5 ? 1 : 2.5)}px;
          background:${palette[Math.floor(Math.random() * palette.length)]};
          animation-duration:${Math.random() * 2 + 1.5}s;
          animation-delay:${Math.random() * 0.8}s;
          transform:rotate(${Math.random() * 360}deg);
          opacity:${Math.random() * 0.7 + 0.3};
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 20);
    }
  }

  /* ── Restart (public) ── */
  function restart() {
    current   = 0;
    selected  = null;
    winnerKey = null;
    _resetScores();

    document.querySelectorAll('.member-node').forEach(d => d.classList.remove('active'));
    document.getElementById('result-bg-ring').classList.remove('visible');
    document.getElementById('result-section').classList.remove('show');
    document.getElementById('quiz-section').style.display = '';

    const card = document.getElementById('q-card');
    card.classList.remove('transitioning', 'entering');
    _render();
  }

  /* ── Public API ── */
  return { init, restart, getWinner: () => winnerKey };
})();
