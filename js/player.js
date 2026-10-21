// Jugador: movimiento, salto, vidas, espada y personajes.
const GRAVITY = 0.5;

const CHARACTERS = {
  daniel: {
    name: "Daniel", speed: 2.8, jump: -10.5, lives: 4,
    damage: 2, reach: 50, cooldown: 28, doubleJump: false,
    tunic: "#f4f1ea", hat: "#f4f1ea", belt: "#c0392b", hair: null
  },
  belu: {
    name: "Belu", speed: 3.4, jump: -10.5, lives: 3,
    damage: 1, reach: 36, cooldown: 14, doubleJump: true,
    tunic: "#9b59b6", hat: "#f4c95d", belt: "#f4c95d", hair: "#4a2f1d"
  }
};
let character = CHARACTERS.daniel;

const player = {
  x: 0, y: 0, w: 28, h: 44,
  vx: 0, vy: 0,
  onGround: false,
  facing: 1,
  jumpsLeft: 0,
  attackTimer: 0,
  attackCooldown: 0,
  attackId: 0
};

let lives = CHARACTERS.daniel.lives;
let invincibleTimer = 0;
let checkpoint = null;

function selectCharacter(id) {
  character = CHARACTERS[id];
}

function resetLives() {
  lives = character.lives;
  invincibleTimer = 0;
}

function resetPlayer(level) {
  player.x = level.start.x;
  player.y = level.start.y;
  player.vx = 0;
  player.vy = 0;
  player.onGround = false;
  player.attackTimer = 0;
  player.attackCooldown = 0;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}

function updatePlayer(level, keys) {
  player.vx = 0;
  if (keys["ArrowLeft"] || keys["KeyA"])  player.vx = -character.speed;
  if (keys["ArrowRight"] || keys["KeyD"]) player.vx = character.speed;
  if (player.vx > 0) player.facing = 1;
  if (player.vx < 0) player.facing = -1;

  // Salto y doble salto (Belu)
  const jumpHeld = keys["ArrowUp"] || keys["KeyW"] || keys["Space"];
  const jumpPressed = game.pressed["ArrowUp"] || game.pressed["KeyW"] || game.pressed["Space"];
  if (jumpHeld && player.onGround) {
    player.vy = character.jump;
    player.onGround = false;
    player.jumpsLeft = character.doubleJump ? 1 : 0;
  } else if (jumpPressed && !player.onGround && player.jumpsLeft > 0) {
    player.vy = character.jump * 0.9;
    player.jumpsLeft--;
  }

  player.vy += GRAVITY;

  // Eje X
  player.x += player.vx;
  for (const p of level.platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vx > 0) player.x = p.x - player.w;
      else if (player.vx < 0) player.x = p.x + p.w;
    }
  }

  // Eje Y
  player.y += player.vy;
  player.onGround = false;
  for (const p of level.platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vy > 0) {
        player.y = p.y - player.h;
        player.onGround = true;
      } else if (player.vy < 0) {
        player.y = p.y + p.h;
      }
      player.vy = 0;
    }
  }

  const levelW = level.width || 800;
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > levelW) player.x = levelW - player.w;
}

// ---------- Vidas ----------
function hurtPlayer(level) {
  if (invincibleTimer > 0) return false;
  lives--;
  invincibleTimer = 90;
  if (lives <= 0) return true;
  resetPlayer(level);
  if (checkpoint) {
    player.x = checkpoint.x;
    player.y = checkpoint.y;
  }
  return false;
}

function updateInvincibility() {
  if (invincibleTimer > 0) invincibleTimer--;
}

// ---------- Espada ----------
function startAttack() {
  if (player.attackCooldown > 0) return;
  player.attackTimer = 12;
  player.attackCooldown = character.cooldown;
  player.attackId++;
}

function updateAttack() {
  if (player.attackTimer > 0) player.attackTimer--;
  if (player.attackCooldown > 0) player.attackCooldown--;
}

function swordBox() {
  if (player.attackTimer <= 0) return null;
  const r = character.reach;
  const x = player.facing === 1 ? player.x + player.w : player.x - r;
  return { x: x, y: player.y + 6, w: r, h: 32 };
}

function drawPlayer(ctx) {
  if (invincibleTimer > 0 && Math.floor(invincibleTimer / 6) % 2 === 0) return;
  drawHero(ctx, player, game.tick);
  drawSword(ctx, player);
}