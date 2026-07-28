/* ============================================================
   Lumis — the reef.
   A hexagonal lattice that obeys the game's one rule: the crystal
   you touch takes full light, its six neighbours take half, the
   ring beyond takes a quarter. Falloff is computed on real hex
   distance, not on pixels, so the page behaves like the game.

   Near the surface light reads as colour, because the water is
   already bright. In the deep it reads as glow. Same light.
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('reef');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var root = document.documentElement;
  var nudge = document.getElementById('nudge');
  var depthOut = document.getElementById('rail-depth');

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  var SEA_FLOOR = 400;      // metres, the bottom of Deep Reef
  var FALLOFF = 0.5;        // each ring out takes half
  var MAX_RING = 4;         // beyond this a crystal stays dark
  var THERMOCLINE = 0.5;    // where ink flips from dark to light

  var cells = [];
  var R = 26;               // circumradius, set in build()
  var colStep = 0;
  var rowStep = 0;
  var w = 0;
  var h = 0;
  var dpr = 1;

  var pointer = { q: 0, r: 0, power: 0, live: false };
  var ambient = { q: 0, r: 0, power: 0 };
  var touched = false;
  var progress = 0;
  var litNow = -1;
  var bloom = null;

  /* ---------- geometry ---------- */

  function axialFromOffset(col, row) {
    return { q: col - ((row - (row & 1)) >> 1), r: row };
  }

  function hexDistance(aq, ar, bq, br) {
    var dq = aq - bq;
    var dr = ar - br;
    return (Math.abs(dq) + Math.abs(dq + dr) + Math.abs(dr)) / 2;
  }

  function hexPath(cx, cy, size) {
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI / 180) * (60 * i - 90);
      var x = cx + size * Math.cos(a);
      var y = cy + size * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function makeBloom() {
    var s = 128;
    var off = document.createElement('canvas');
    off.width = off.height = s;
    var c = off.getContext('2d');
    var g = c.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(200,255,244,0.95)');
    g.addColorStop(0.35, 'rgba(120,255,225,0.42)');
    g.addColorStop(1, 'rgba(0,255,209,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, s, s);
    return off;
  }

  /* ---------- build ---------- */

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    R = w < 620 ? 21 : w < 1100 ? 25 : 29;
    colStep = Math.sqrt(3) * R;
    rowStep = 1.5 * R;

    cells.length = 0;
    var rows = Math.ceil(h / rowStep) + 2;
    var colsPerRow = Math.ceil(w / colStep) + 2;

    for (var row = -1; row < rows; row++) {
      for (var col = -1; col < colsPerRow; col++) {
        var ax = axialFromOffset(col, row);
        cells.push({
          x: col * colStep + (row & 1 ? colStep / 2 : 0),
          y: row * rowStep,
          q: ax.q,
          r: ax.r,
          light: 0,
          target: 0
        });
      }
    }
  }

  /* ---------- pointer ---------- */

  function cellAt(px, py) {
    var row = Math.round(py / rowStep);
    var best = null;
    var bestD = Infinity;
    for (var dr = -1; dr <= 1; dr++) {
      var rr = row + dr;
      var col = Math.round((px - (rr & 1 ? colStep / 2 : 0)) / colStep);
      for (var dc = -1; dc <= 1; dc++) {
        var cc = col + dc;
        var cx = cc * colStep + (rr & 1 ? colStep / 2 : 0);
        var cy = rr * rowStep;
        var d = (cx - px) * (cx - px) + (cy - py) * (cy - py);
        if (d < bestD) {
          bestD = d;
          best = axialFromOffset(cc, rr);
        }
      }
    }
    return best;
  }

  function onPointer(e) {
    var a = cellAt(e.clientX, e.clientY);
    pointer.q = a.q;
    pointer.r = a.r;
    pointer.live = true;
    if (!touched) {
      touched = true;
      if (nudge) nudge.classList.add('nudge--spent');
    }
  }

  /* ---------- depth ---------- */

  function readScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

    if (depthOut) {
      var m = Math.round((progress * SEA_FLOOR) / 5) * 5;
      if (depthOut.textContent !== String(m)) depthOut.textContent = m;
    }
    root.style.setProperty(
      '--rail-ink',
      progress > THERMOCLINE ? 'rgba(234,247,250,0.62)' : 'rgba(6,32,47,0.66)'
    );
  }

  /* ---------- paint ---------- */

  function mix(a, b, t) {
    return a + (b - a) * t;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    var docH = Math.max(1, document.documentElement.scrollHeight);
    var scrolled = window.scrollY;

    ctx.lineWidth = 1;

    // Pass one: the lattice, and colour where light has reached.
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var depth = Math.min(1, Math.max(0, (c.y + scrolled) / docH));

      var sr = mix(0, 150, depth);
      var sg = mix(140, 228, depth);
      var sb = mix(160, 232, depth);
      var sa = mix(0.2, 0.14, depth);

      hexPath(c.x, c.y, R - 1.6);
      ctx.strokeStyle = 'rgba(' + (sr | 0) + ',' + (sg | 0) + ',' + (sb | 0) + ',' + sa.toFixed(3) + ')';
      ctx.stroke();

      if (c.light > 0.012) {
        var lg = mix(194, 255, depth);
        var lb = 209;
        var alpha = c.light * mix(0.62, 0.34, depth);
        ctx.fillStyle = 'rgba(0,' + (lg | 0) + ',' + lb + ',' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
    }

    // Pass two: bloom. Only meaningful once the water is dark.
    var bloomStrength = Math.max(0, (progress - 0.18) / 0.82);
    if (bloomStrength > 0.01) {
      ctx.globalCompositeOperation = 'lighter';
      var size = R * 6;
      for (var j = 0; j < cells.length; j++) {
        var b = cells[j];
        if (b.light <= 0.05) continue;
        ctx.globalAlpha = Math.min(1, b.light * bloomStrength * 0.5);
        ctx.drawImage(bloom, b.x - size / 2, b.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  /* ---------- light ---------- */

  function applySources() {
    var sources = [];
    if (pointer.power > 0.01) sources.push(pointer);
    if (ambient.power > 0.01) sources.push(ambient);

    var peak = 0;
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var t = 0;
      for (var s = 0; s < sources.length; s++) {
        var src = sources[s];
        var d = hexDistance(c.q, c.r, src.q, src.r);
        if (d > MAX_RING) continue;
        var v = src.power * Math.pow(FALLOFF, d);
        if (v > t) t = v;
      }
      c.target = t;
      // Light arrives faster than it leaves — crystals hold their charge.
      c.light += (t - c.light) * (t > c.light ? 0.22 : 0.06);
      if (c.light > peak) peak = c.light;
    }
    return peak;
  }

  /* ---------- loop ---------- */

  var ambientT = 0;

  function frame() {
    pointer.power += ((pointer.live ? 1 : 0) - pointer.power) * 0.1;

    if (touched) {
      ambient.power += (0 - ambient.power) * 0.04;
    } else {
      ambient.power += (0.38 - ambient.power) * 0.02;
      ambientT += 0.0042;
      var ax = w * (0.5 + 0.34 * Math.sin(ambientT));
      var ay = h * (0.45 + 0.26 * Math.sin(ambientT * 1.618));
      var a = cellAt(ax, ay);
      ambient.q = a.q;
      ambient.r = a.r;
    }

    var peak = applySources();
    draw();

    // The headline warms when light is near it, and never dims below legible.
    var heroFade = Math.max(0, 1 - progress * 3);
    var lit = Math.round(peak * heroFade * 100) / 100;
    if (lit !== litNow) {
      litNow = lit;
      root.style.setProperty('--lit', String(lit));
    }

    requestAnimationFrame(frame);
  }

  /* ---------- still version ---------- */

  function drawStill() {
    ambient.power = 0.55;
    var a = cellAt(w * 0.5, h * 0.42);
    ambient.q = a.q;
    ambient.r = a.r;
    pointer.power = 0;
    for (var pass = 0; pass < 40; pass++) applySources();
    draw();
    root.style.setProperty('--lit', '0.5');
  }

  /* ---------- wire up ---------- */

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      build();
      readScroll();
      if (calm.matches) drawStill();
    }, 140);
  }

  bloom = makeBloom();
  build();
  readScroll();

  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', onResize);

  if (calm.matches) {
    if (nudge) nudge.classList.add('nudge--spent');
    drawStill();
    window.addEventListener('scroll', draw, { passive: true });
  } else {
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    window.addEventListener('pointerleave', function () { pointer.live = false; });
    window.addEventListener('blur', function () { pointer.live = false; });
    requestAnimationFrame(frame);
  }
})();
