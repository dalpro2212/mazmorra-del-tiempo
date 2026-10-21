const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function loadBest() {
  try { return Number(localStorage.getItem("mazmorraBest")) || 0; }
  catch (e) { return 0; }
}

const game = {
  state: "menu",      // menu | select | playing | gameover | victory
  levelIndex: 0,
  keys: {},
  pressed: {},
  tick: 0,
  score: 0,
  best: loadBest(),
  selected: 0         // 0 = Daniel, 1 = Belu
};

function saveBest() {
  if (game.score > game.best) {
    game.best = game.score;
    try { localStorage.setItem("mazmorraBest", game.best); } catch (e) {}
  }
}

window.addEventListener("keydown", (e) => {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    e.preventDefault();
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
  camera.x += (target - camera.x) * 0.12;
  camera.x = Math.max(0, Math.min(camera.x, levelW - canvas.width));
}

// ---------- Niveles ----------
function currentLevel() {
  return LEVELS[game.levelIndex];
}

function startLevel() {
  const level = currentLevel();
  checkpoint = null;
  resetPlayer(level);
  camera.x = 0;
  for (const c of level.coins || []) c.taken = false;
  spawnEnemies(level);
  spawnBoss(level);
}

// ---------- Pinchos ----------
function spikeActive(s) {
  if (!s.blink) return true;
  return Math.floor(game.tick / s.blink) % 2 === 0;
}

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
    if (game.pressed["Enter"]) game.state = "select";
    return;
  }
  if (game.state === "select") {
    if (game.pressed["ArrowLeft"] || game.pressed["KeyA"]) game.selected = 0;
    if (game.pressed["ArrowRight"] || game.pressed["KeyD"]) game.selected = 1;
    if (game.pressed["Escape"]) { game.state = "menu"; return; }
    if (game.pressed["Enter"]) {
      selectCharacter(game.selected === 0 ? "daniel" : "belu");
      restartGame();
    }
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

  // --- playing ---
  if (game.pressed["KeyR"]) { restartGame(); return; }
  if (game.pressed["Escape"]) { goToMenu(); return; }

  const level = currentLevel();
  updatePlayer(level, game.keys);
  if (game.pressed["KeyJ"]) startAttack();
  updateAttack();
  updateCamera(level);
  updateInvincibility();

  for (const s of level.spikes) {
    if (spikeActive(s) && rectsOverlap(player, spikeHitbox(s))) {
      if (hurtPlayer(level)) game.state = "gameover";
    }
  }

  updateEnemies(level);
  updateBoss(level);

  for (const c of level.coins || []) {
    if (!c.taken && rectsOverlap(player, { x: c.x - 8, y: c.y - 8, w: 16, h: 16 })) {
      c.taken = true;
      game.score += 10;
    }
  }

  for (const cp of level.checkpoints || []) {
    if (rectsOverlap(player, cp) && (!checkpoint || checkpoint.ref !== cp)) {
      checkpoint = { x: cp.x, y: cp.y + cp.h - player.h, ref: cp };
    }
  }

  if (player.y > canvas.height + 100) {
    if (hurtPlayer(level)) game.state = "gameover";
  }

  // La puerta se abre solo si el jefe (si hay) ya murió
  if (game.state === "playing" && !bossAlive() && rectsOverlap(player, level.exit)) {
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
  for (const p of level.platforms) drawPlatform(ctx, p);
  for (const s of level.spikes) drawSpike(s);
  for (const cp of level.checkpoints || []) {
    drawCheckpoint(ctx, cp, checkpoint && checkpoint.ref === cp, game.tick);
  }
  for (const c of level.coins || []) {
    if (!c.taken) drawCoin(ctx, c, game.tick);
  }
  drawEnemies(ctx);
  drawBoss(ctx);
  drawDoor(ctx, level.exit, game.tick);
  if (bossAlive()) {                       // puerta bloqueada
    const e = level.exit;
    ctx.fillStyle = "rgba(20,15,30,0.88)";
    ctx.fillRect(e.x - 6, e.y - 6, e.w + 12, e.h + 6);
  }
}

function draw() {
  drawBackground(ctx, game.tick, camera.x);
  drawBats(ctx, game.tick);

  if (game.state === "menu") { drawMenu(ctx, game.tick); return; }
  if (game.state === "select") { drawSelect(ctx, game.tick, game.selected); return; }

  const level = currentLevel();
  ctx.save();
  ctx.translate(-Math.round(camera.x), 0);
  drawLevel(level);
  drawPlayer(ctx);
  ctx.restore();

  drawHUD(ctx, level, lives, game.score, game.best);
  drawBossBar(ctx);

  if (game.state === "gameover") drawGameOver(ctx);
  if (game.state === "victory") drawVictory(ctx);
}

// ---------- Bucle con tiempo fijo (60 actualizaciones por segundo) ----------
const STEP = 1000 / 60;
let lastTime = 0;
let acc = 0;

function loop(time) {
  if (!lastTime) lastTime = time || 0;
  acc += Math.min(time - lastTime, 100);   // límite por si la pestaña se pausó
  lastTime = time;

  while (acc >= STEP) {
    update();
    game.pressed = {};   // limpia las teclas de un solo toque
    acc -= STEP;
  }

  draw();
  requestAnimationFrame(loop);
}

initBats();
startLevel();
requestAnimationFrame(loop);