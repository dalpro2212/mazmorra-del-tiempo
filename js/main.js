const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ---------- Récord guardado ----------
function loadBest() {
  try { return Number(localStorage.getItem("mazmorraBest")) || 0; }
  catch (e) { return 0; }
}

const game = {
  state: "menu",      // menu | playing | gameover | victory
  levelIndex: 0,
  keys: {},
  pressed: {},        // teclas presionadas en este frame (una sola vez)
  tick: 0,
  score: 0,
  best: loadBest()
};

function saveBest() {
  if (game.score > game.best) {
    game.best = game.score;
    try { localStorage.setItem("mazmorraBest", game.best); } catch (e) {}
  }
}

// ---------- Teclado ----------
window.addEventListener("keydown", (e) => {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    e.preventDefault();   // evita que la página haga scroll
  }
  if (!e.repeat) game.pressed[e.code] = true;
  game.keys[e.code] = true;
});
window.addEventListener("keyup", (e) => { game.keys[e.code] = false; });

// ---------- Cámara ----------
const camera = { x: 0 };

function updateCamera(level) {
  const levelW = level.width || 800;
  const target = player.x + player.w / 2 - canvas.width / 2;
  camera.x += (target - camera.x) * 0.12;   // movimiento suave
  camera.x = Math.max(0, Math.min(camera.x, levelW - canvas.width));
}

// ---------- Niveles ----------
function currentLevel() {
  return LEVELS[game.levelIndex];
}

function startLevel() {
  const level = currentLevel();
  resetPlayer(level);
  camera.x = 0;
  for (const c of level.coins || []) c.taken = false;
}

// ---------- Pinchos ----------
// ¿El pincho está activo? Si tiene "blink", alterna cada ese número de frames.
function spikeActive(s) {
  if (!s.blink) return true;
  return Math.floor(game.tick / s.blink) % 2 === 0;
}

// Hitbox más pequeña que el dibujo, para que sea justo
function spikeHitbox(s) {
  return { x: s.x + 5, y: s.y + 8, w: s.w - 10, h: s.h - 8 };
}

function drawSpike(s) {
  const tooth = 20;
  const count = Math.max(1, Math.floor(s.w / tooth));
  const toothW = s.w / count;
  const active = spikeActive(s);

  ctx.fillStyle = active ? "#d9534f" : "rgba(217,83,79,0.2)";
  for (let i = 0; i < count; i++) {
    const x = s.x + i * toothW;
    ctx.beginPath();
    ctx.moveTo(x, s.y + s.h);
    ctx.lineTo(x + toothW / 2, active ? s.y : s.y + s.h - 5);
    ctx.lineTo(x + toothW, s.y + s.h);
    ctx.closePath();
    ctx.fill();
  }
}

// ---------- Actualizar ----------
function update() {
  game.tick++;
  updateBats();

  if (game.state === "menu") {
    if (game.pressed["Enter"]) restartGame();
    return;
  }
  if (game.state === "gameover") {
    if (game.pressed["Enter"]) restartGame();
    if (game.pressed["Escape"]) goToMenu();
    return;
  }
  if (game.state === "victory") {
    if (game.pressed["Enter"]) goToMenu();
    return;
  }

  // --- state === "playing" ---
  if (game.pressed["KeyR"]) { restartGame(); return; }
  if (game.pressed["Escape"]) { goToMenu(); return; }

  const level = currentLevel();
  updatePlayer(level, game.keys);
  updateCamera(level);
  updateInvincibility();

  // Pinchos
  for (const s of level.spikes) {
    if (spikeActive(s) && rectsOverlap(player, spikeHitbox(s))) {
      if (hurtPlayer(level)) game.state = "gameover";
    }
  }

  // Monedas
  for (const c of level.coins || []) {
    if (!c.taken && rectsOverlap(player, { x: c.x - 8, y: c.y - 8, w: 16, h: 16 })) {
      c.taken = true;
      game.score += 10;
    }
  }

  // Caída al vacío
  if (player.y > canvas.height + 100) {
    if (hurtPlayer(level)) game.state = "gameover";
  }

  // Puerta de salida (siempre al final)
  if (game.state === "playing" && rectsOverlap(player, level.exit)) {
    nextLevel();
  }
}

function restartGame() {
  saveBest();
  game.score = 0;
  game.levelIndex = 0;
  game.state = "playing";
  resetLives();
  startLevel();
}

function goToMenu() {
  saveBest();
  game.score = 0;
  game.state = "menu";
  game.levelIndex = 0;
  resetLives();
  startLevel();
}

function nextLevel() {
  if (game.levelIndex < LEVELS.length - 1) {
    game.levelIndex++;
    startLevel();
  } else {
    game.state = "victory";
    saveBest();
  }
}

// ---------- Dibujar ----------
function drawLevel(level) {
  for (const p of level.platforms) {
    drawPlatform(ctx, p);
  }
  for (const s of level.spikes) {
    drawSpike(s);
  }
  for (const c of level.coins || []) {
    if (!c.taken) drawCoin(ctx, c, game.tick);
  }
  drawDoor(ctx, level.exit, game.tick);
}

function draw() {
  drawBackground(ctx, game.tick, camera.x);
  drawBats(ctx, game.tick);

  if (game.state === "menu") {
    drawMenu(ctx, game.tick);
    return;
  }

  const level = currentLevel();
  ctx.save();
  ctx.translate(-Math.round(camera.x), 0);
  drawLevel(level);
  drawPlayer(ctx);
  ctx.restore();

  drawHUD(ctx, level, lives, game.score, game.best);

  if (game.state === "gameover") drawGameOver(ctx);
  if (game.state === "victory") drawVictory(ctx);
}

function loop() {
  update();
  draw();
  game.pressed = {};   // limpia las teclas de un solo toque
  requestAnimationFrame(loop);
}

initBats();
startLevel();
loop();