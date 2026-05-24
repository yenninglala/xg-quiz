/* ─────────────────────────────────────
   canvas-card.js — result image (1080²)
   Draws the shareable card onto <canvas>
───────────────────────────────────── */

function drawResultCanvas(key, member) {
  const canvas = document.getElementById('result-canvas');
  const W = 1080, H = 1080;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  _drawBackground(ctx, W, H, member.color);
  _drawGrid(ctx, W, H);
  _drawTopLabel(ctx, W);
  _drawHexAvatar(ctx, W, H, key, member.color);
  _drawMatchText(ctx, W, key, member);
  _drawTraits(ctx, W, member);
  _drawDesc(ctx, W, member.desc);
  _drawFooter(ctx, W, H);
}

/* ── Private helpers ── */

function _drawBackground(ctx, W, H, color) {
  // Solid dark base
  ctx.fillStyle = '#00000f';
  ctx.fillRect(0, 0, W, H);

  // Random stars
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.5 + 0.2;
    const a = Math.random() * 0.7 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,210,255,${a})`;
    ctx.fill();
  }

  // Member colour glow
  const g = ctx.createRadialGradient(W / 2, H * 0.38, 0, W / 2, H * 0.38, 460);
  g.addColorStop(0, color + '44');
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Scan lines
  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = 'rgba(0,0,10,0.15)';
    ctx.fillRect(0, y, W, 2);
  }
}

function _drawGrid(ctx, W, H) {
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth   = 1;
  for (let x = 0; x < W; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 80) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function _drawTopLabel(ctx, W) {
  ctx.fillStyle  = 'rgba(200,205,255,0.3)';
  ctx.font       = '700 24px monospace';
  ctx.textAlign  = 'center';
  ctx.fillText('XG IDENTITY SCAN', W / 2, 78);
}

function _drawHexAvatar(ctx, W, H, key, color) {
  const cx = W / 2, cy = 370, r = 155;

  // Outer ring
  ctx.beginPath(); _hexPath(ctx, cx, cy, r + 18);
  ctx.strokeStyle = color + '55';
  ctx.lineWidth   = 3;
  ctx.stroke();

  // Inner fill
  ctx.beginPath(); _hexPath(ctx, cx, cy, r);
  ctx.fillStyle   = color + '22'; ctx.fill();
  ctx.strokeStyle = color + '88'; ctx.lineWidth = 4; ctx.stroke();

  // Initial letter
  ctx.fillStyle      = color;
  ctx.font           = '900 72px sans-serif';
  ctx.textAlign      = 'center';
  ctx.textBaseline   = 'middle';
  ctx.fillText(key[0], cx, cy);
  ctx.textBaseline   = 'alphabetic';
}

function _drawMatchText(ctx, W, key, member) {
  ctx.fillStyle = 'rgba(200,205,255,0.35)';
  ctx.font      = '400 26px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('IDENTITY MATCH CONFIRMED', W / 2, 605);

  ctx.fillStyle = 'rgba(200,205,255,0.25)';
  ctx.font      = '400 20px monospace';
  ctx.fillText('你最像', W / 2, 645);

  ctx.fillStyle  = member.color;
  ctx.font       = '900 90px sans-serif';
  ctx.shadowColor = member.color;
  ctx.shadowBlur  = 30;
  ctx.fillText(key + ' ' + member.emoji, W / 2, 750);
  ctx.shadowBlur  = 0;
}

function _drawTraits(ctx, W, member) {
  const tw = 185, th = 50, gap = 14;
  const totalW = member.traits.length * tw + (member.traits.length - 1) * gap;
  let tx = (W - totalW) / 2;

  member.traits.forEach(t => {
    // pill background
    ctx.fillStyle = member.color + '18';
    _roundRect(ctx, tx, 775, tw, th, 4);
    // pill border
    ctx.strokeStyle = member.color + '55';
    ctx.lineWidth   = 1;
    ctx.strokeRect(tx, 775, tw, th);
    // text
    ctx.fillStyle  = member.color;
    ctx.font       = '700 19px monospace';
    ctx.textAlign  = 'center';
    ctx.fillText(t.toUpperCase(), tx + tw / 2, 775 + th / 2 + 7);
    tx += tw + gap;
  });
}

function _drawDesc(ctx, W, desc) {
  ctx.fillStyle = 'rgba(200,205,255,0.48)';
  ctx.font      = '400 23px sans-serif';
  _wrapText(ctx, desc, W / 2, 900, 780, 40);
}

function _drawFooter(ctx, W, H) {
  ctx.fillStyle = 'rgba(200,205,255,0.18)';
  ctx.font      = '400 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(window.location.host || 'xg-quiz', W / 2, 1048);
}

/* ── Utility draw helpers ── */

function _hexPath(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function _wrapText(ctx, text, cx, y, maxW, lineH) {
  const chars = text.split('');
  let line = '';
  const lines = [];
  for (const c of chars) {
    const test = line + c;
    if (ctx.measureText(test).width > maxW && line !== '') {
      lines.push(line); line = c;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineH) / 2;
  lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lineH));
}
