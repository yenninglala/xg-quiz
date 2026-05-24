/* ─────────────────────────────────────
   share.js — share / download actions
   Depends on: quiz.js (getWinner)
───────────────────────────────────── */

const Share = (function () {

  function _showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function toLine() {
    const winner = Quiz.getWinner();
    if (!winner) return;
    const url  = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `我做了 XG 人格測驗，結果我最像 ${winner} ${MEMBERS[winner].emoji}！你也來測看看？`
    );
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank');
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => _showToast('LINK COPIED ✓'))
      .catch(() => {
        // Fallback for browsers without clipboard API
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        _showToast('LINK COPIED ✓');
      });
  }

  function downloadCard() {
    const winner = Quiz.getWinner();
    if (!winner) return;
    const a      = document.createElement('a');
    a.download   = `XG-${winner}.png`;
    a.href       = document.getElementById('result-canvas').toDataURL('image/png');
    a.click();
    _showToast('DOWNLOADING ↓');
  }

  return { toLine, copyLink, downloadCard };
})();
