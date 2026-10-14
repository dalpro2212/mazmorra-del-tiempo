const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = {
  state: "playing",      // menu | playing | gameover | victory
  levelIndex: 0,
  keys: {}
};

// Teclado
window.addEventListener("keydown", (e) => { game.keys[e.code] = true; });
window.addEventListener("keyup",   (e) => { game.keys[e.code] = false; });

function currentLevel() {
  return LEVELS[game.levelIndex];
}
function startLevel() {
  resetPlayer(currentLevel());
}

function update() {
  if (game.state === "gameover") {
    if (game.keys["Enter"]) restartGame();
    return;
  }
  if (game.state !== "playing") return;

  const level = currentLevel();
  updatePlayer(level, game.keys);
  updateInvincibility();

  // Pinchos
  for (const s of level.spikes) {
    if (rectsOverlap(player, s)) {
      if (hurtPlayer(level)) game.state = "gameover";
    }
  }

  // Caída al vacío
  if (player.y > canvas.height + 100) {
    if (hurtPlayer(level)) game.state = "gameover";
  }

  // Puerta de salida
  if (rectsOverlap(player, level.exit)) {
    nextLevel();
  }
}

function nextLevel() {
  if (game.levelIndex < LEVELS.length - 1) {
    game.levelIndex++;
    startLevel();
  } else {
    game.state = "victory";
  }
}

function restartGame() {
  game.levelIndex = 0;
  game.state = "playing";
  resetLives();
  startLevel();
}

function drawLevel(level) {
  // Plataformas
  ctx.fillStyle = "#6b5b95";
  for (const p of level.platforms) {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }
  ctx.fillStyle = "#d9534f";
for (const s of level.spikes) {
  ctx.fillRect(s.x, s.y, s.w, s.h);
}
  drawPlayer(ctx);
  // Puerta de salida
  ctx.fillStyle = "#f4c95d";
  const e = level.exit;
  ctx.fillRect(e.x, e.y, e.w, e.h);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const level = currentLevel();
  drawLevel(level);
  drawPlayer(ctx);

  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.fillText(level.name, 20, 30);
  ctx.fillText("Vidas: " + lives, 660, 30);

  if (game.state === "gameover") {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "40px monospace";
    ctx.fillText("GAME OVER", 270, 210);
    ctx.font = "20px monospace";
    ctx.fillText("Presiona Enter para reiniciar", 230, 250);
  }

  if (game.state === "victory") {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4c95d";
    ctx.font = "40px monospace";
    ctx.fillText("¡VICTORIA!", 280, 220);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

startLevel();
loop();