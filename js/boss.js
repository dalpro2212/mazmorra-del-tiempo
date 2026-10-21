// Jefe final del Nivel 3.
let boss = null;

function spawnBoss(level) {
  if (!level.boss) { boss = null; return; }
  const b = level.boss;
  boss = {
    x: b.x, y: b.ground - 110, w: 80, h: 110,
    hp: 20, maxHp: 20,
    minX: b.minX, maxX: b.maxX,
    dir: -1, state: "walk", timer: 150,
    lastHit: 0, hurt: 0, score: 500
  };
}

function bossAlive() {
  return boss && boss.hp > 0;
}

function updateBoss(level) {
  if (!bossAlive()) return;
  const b = boss;
  if (b.hurt > 0) b.hurt--;

  const px = player.x + player.w / 2;
  const bx = b.x + b.w / 2;
  if (Math.abs(px - bx) > 700) return;   // solo actúa si estás cerca

  b.timer--;
  if (b.state === "walk") {
    b.dir = px < bx ? -1 : 1;
    b.x += 0.6 * b.dir;   // antes 0.8 (caminar)
    if (b.timer <= 0) { b.state = "windup"; b.timer = 40; }
  } else if (b.state === "windup") {
    if (b.timer <= 0) { b.state = "charge"; b.timer = 50; }
  } else if (b.state === "charge") {
    b.x += 3.5 * b.dir;   // antes 5 (embestida)
    if (b.timer <= 0) { b.state = "rest"; b.timer = 60; }
  } else if (b.state === "rest") {
    if (b.timer <= 0) { b.state = "walk"; b.timer = 150; }
  }
  b.x = Math.max(b.minX, Math.min(b.x, b.maxX));

  // Golpe de espada
  const box = swordBox();
  if (box && b.lastHit !== player.attackId && rectsOverlap(box, b)) {
    b.lastHit = player.attackId;
    b.hp -= character.damage;
    b.hurt = 10;
    if (b.hp <= 0) game.score += b.score;
  }

  // Contacto
  if (b.hp > 0 && rectsOverlap(player, b)) {
    if (hurtPlayer(level)) game.state = "gameover";
  }
}