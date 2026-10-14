// Jugador: movimiento, salto y colisiones con plataformas.
const GRAVITY = 0.6;
const MOVE_SPEED = 4;
const JUMP_FORCE = -12;

const player = {
  x: 0,
  y: 0,
  w: 28,
  h: 44,
  vx: 0,
  vy: 0,
  onGround: false
};

function resetPlayer(level) {
  player.x = level.start.x;
  player.y = level.start.y;
  player.vx = 0;
  player.vy = 0;
  player.onGround = false;
}

// ¿Dos rectángulos se tocan?
function rectsOverlap(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

function updatePlayer(level, keys) {
  // Movimiento horizontal
  player.vx = 0;
  if (keys["ArrowLeft"] || keys["KeyA"])  player.vx = -MOVE_SPEED;
  if (keys["ArrowRight"] || keys["KeyD"]) player.vx = MOVE_SPEED;

  // Salto (solo si está en el suelo)
  if ((keys["ArrowUp"] || keys["KeyW"] || keys["Space"]) && player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }

  // Gravedad
  player.vy += GRAVITY;

  // Mover en X y resolver colisiones
  player.x += player.vx;
  for (const p of level.platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vx > 0) player.x = p.x - player.w;
      else if (player.vx < 0) player.x = p.x + p.w;
    }
  }

  // Mover en Y y resolver colisiones
  player.y += player.vy;
  player.onGround = false;
  for (const p of level.platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vy > 0) {          // cayendo: aterriza
        player.y = p.y - player.h;
        player.onGround = true;
      } else if (player.vy < 0) {   // subiendo: se golpea la cabeza
        player.y = p.y + p.h;
      }
      player.vy = 0;
    }
  }

  // No salirse de los lados de la pantalla
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > 800) player.x = 800 - player.w;
}

function drawPlayer(ctx) {
  ctx.fillStyle = "#e8e8f0";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}