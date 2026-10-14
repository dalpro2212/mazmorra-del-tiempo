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
  updatePlayer(currentLevel(), game.keys);
}

function drawLevel(level) {
  // Plataformas
  ctx.fillStyle = "#6b5b95";
  for (const p of level.platforms) {
    ctx.fillRect(p.x, p.y, p.w, p.h);
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

  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.fillText(level.name, 20, 30);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

startLevel();
loop();