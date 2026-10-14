// Gráficos del juego: todo dibujado con código (sin imágenes).

// ---------- Fondo ----------
function drawBackground(ctx, tick, camX) {
  const W = 800, H = 450;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#0d0b14");
  g.addColorStop(1, "#2a2140");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Ladrillos: se mueven más lento que el mapa (parallax)
  const shift = camX * 0.3;
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let row = 0; row * 30 < H; row++) {
    const y = row * 30;
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    const offset = (row % 2) * 30;
    for (let x = -((shift + offset) % 60); x < W; x += 60) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 30);
    }
  }
  ctx.stroke();

  // Antorchas que se desplazan y se repiten
  for (let i = 0; i < 4; i++) {
    const x = (((i * 250 - camX * 0.5) % 1000) + 1000) % 1000 - 100;
    drawTorch(ctx, x, 170, tick);
  }
}

function drawTorch(ctx, x, y, tick) {
  const flicker = Math.sin(tick * 0.2 + x) * 3;

  // Resplandor
  const glow = ctx.createRadialGradient(x, y, 5, x, y, 90 + flicker * 2);
  glow.addColorStop(0, "rgba(255,170,60,0.35)");
  glow.addColorStop(1, "rgba(255,170,60,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(x - 110, y - 110, 220, 220);

  // Mango
  ctx.fillStyle = "#5a3d2b";
  ctx.fillRect(x - 3, y, 6, 28);

  // Llama
  ctx.fillStyle = "#ff9d2e";
  ctx.beginPath();
  ctx.ellipse(x, y - 6, 7, 12 + flicker, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffe08a";
  ctx.beginPath();
  ctx.ellipse(x, y - 3, 3.5, 6 + flicker / 2, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ---------- Plataformas ----------
function drawPlatform(ctx, p) {
  ctx.fillStyle = "#4b3f72";
  ctx.fillRect(p.x, p.y, p.w, p.h);

  // Borde superior claro
  ctx.fillStyle = "#8576b8";
  ctx.fillRect(p.x, p.y, p.w, 4);

  // Líneas de bloques de piedra
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = p.x + 40; x < p.x + p.w; x += 40) {
    ctx.moveTo(x, p.y + 4);
    ctx.lineTo(x, p.y + p.h);
  }
  for (let y = p.y + 24; y < p.y + p.h; y += 24) {
    ctx.moveTo(p.x, y);
    ctx.lineTo(p.x + p.w, y);
  }
  ctx.stroke();
}

// ---------- Puerta ----------
function archPath(ctx, x, y, w, h) {
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
}

function drawDoor(ctx, e, tick) {
  const pulse = 0.5 + 0.5 * Math.sin(tick * 0.08);
  const cx = e.x + e.w / 2;
  const cy = e.y + e.h / 2;

  // Resplandor dorado que pulsa
  const glow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 70);
  glow.addColorStop(0, "rgba(244,201,93," + (0.25 + 0.2 * pulse) + ")");
  glow.addColorStop(1, "rgba(244,201,93,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(cx - 80, cy - 80, 160, 160);

  // Marco de piedra
  ctx.fillStyle = "#3a3156";
  archPath(ctx, e.x - 6, e.y - 6, e.w + 12, e.h + 6);
  ctx.fill();

  // Interior de luz
  const light = ctx.createLinearGradient(0, e.y, 0, e.y + e.h);
  light.addColorStop(0, "#fff3b0");
  light.addColorStop(1, "#f4c95d");
  ctx.fillStyle = light;
  archPath(ctx, e.x, e.y, e.w, e.h);
  ctx.fill();
}

// ---------- Murciélagos ----------
const bats = [];

function initBats() {
  bats.length = 0;
  for (let i = 0; i < 4; i++) {
    bats.push({
      x: Math.random() * 800,
      y: 50 + Math.random() * 110,
      speed: 0.6 + Math.random() * 0.8,
      dir: Math.random() < 0.5 ? -1 : 1,
      phase: Math.random() * 10
    });
  }
}

function updateBats() {
  for (const b of bats) {
    b.x += b.speed * b.dir;
    if (b.x > 860) b.x = -60;
    if (b.x < -60) b.x = 860;
  }
}

function drawBats(ctx, tick) {
  for (const b of bats) {
    const y = b.y + Math.sin(tick * 0.04 + b.phase) * 18;
    const flap = Math.sin(tick * 0.35 + b.phase) * 10;

    ctx.save();
    ctx.translate(b.x, y);
    ctx.scale(b.dir, 1);
    ctx.fillStyle = "#3a2a5e";

    // Cuerpo
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Orejas
    ctx.beginPath();
    ctx.moveTo(-4, -5);
    ctx.lineTo(-3, -11);
    ctx.lineTo(0, -6);
    ctx.lineTo(3, -11);
    ctx.lineTo(4, -5);
    ctx.fill();

    // Alas (izquierda y derecha)
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(s * 4, -2);
      ctx.quadraticCurveTo(s * 16, -12 - flap, s * 28, -2 - flap);
      ctx.quadraticCurveTo(s * 22, 2, s * 18, 4);
      ctx.quadraticCurveTo(s * 13, 0, s * 9, 6);
      ctx.quadraticCurveTo(s * 6, 3, s * 4, 5);
      ctx.closePath();
      ctx.fill();
    }

    // Ojos rojos
    ctx.fillStyle = "#ff4d4d";
    ctx.fillRect(-3, -3, 2, 2);
    ctx.fillRect(1, -3, 2, 2);

    ctx.restore();
  }
}

// ---------- Personaje ----------
function drawHero(ctx, p, tick) {
  const air = !p.onGround;
  const moving = p.vx !== 0 && !air;
  const step = moving ? Math.sin(tick * 0.4) * 5 : 0;

  ctx.save();
  ctx.translate(p.x + p.w / 2, p.y);
  ctx.scale(p.facing, 1);

  // Piernas
  const legY = 33;
  const spread = air ? 4 : step;
  ctx.fillStyle = "#3d5a98";
  ctx.fillRect(-8 - spread, legY, 6, 9);
  ctx.fillRect(2 + spread, legY, 6, 9);
  // Botas
  ctx.fillStyle = "#4a2f1d";
  ctx.fillRect(-8 - spread, 41, 7, 3);
  ctx.fillRect(2 + spread, 41, 7, 3);

  // Túnica
  ctx.fillStyle = "#f4f1ea";
  ctx.fillRect(-9, 19, 18, 15);

  // Cinturón rojo
  ctx.fillStyle = "#c0392b";
  ctx.fillRect(-9, 28, 18, 4);

  // Brazo
  ctx.fillStyle = "#f4f1ea";
  ctx.fillRect(4 - step / 2, air ? 14 : 21, 5, 11);
  ctx.fillStyle = "#e0ac80";
  ctx.fillRect(4 - step / 2, air ? 12 : 31 - 6, 5, 3);

  // Cabeza
  ctx.fillStyle = "#e0ac80";
  ctx.beginPath();
  ctx.ellipse(1, 13, 8, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Turbante
  ctx.fillStyle = "#f4f1ea";
  ctx.beginPath();
  ctx.ellipse(0, 7, 11, 6, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = "#d9534f";
  ctx.fillRect(-1, 3, 4, 4);

  // Ojo
  ctx.fillStyle = "#1a1020";
  ctx.fillRect(5, 11, 2, 3);

  ctx.restore();
}