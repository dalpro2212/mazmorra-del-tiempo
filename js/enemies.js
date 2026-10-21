// Enemigos: ogros y bandidos que patrullan.
let enemies = [];

const ENEMY_TYPES = {
  ogro:    { w: 44, h: 60, hp: 3, speed: 0.45, score: 50 },
  bandido: { w: 28, h: 44, hp: 1, speed: 0.9,  score: 20 }
};

function spawnEnemies(level) {
  enemies = (level.enemies || []).map((e) => {
    const t = ENEMY_TYPES[e.type];
    return {
      type: e.type, w: t.w, h: t.h,
      hp: t.hp, maxHp: t.hp,
      speed: t.speed, score: t.score,
      x: e.x, y: e.ground - t.h,
      minX: e.x - e.range, maxX: e.x + e.range,
      dir: 1, lastHit: 0, hurt: 0
    };
  });
}

function updateEnemies(level) {
  const box = swordBox();
  for (const en of enemies) {
    if (en.hp <= 0) continue;

    en.x += en.speed * en.dir;
    if (en.x > en.maxX) { en.x = en.maxX; en.dir = -1; }
    if (en.x < en.minX) { en.x = en.minX; en.dir = 1; }
    if (en.hurt > 0) en.hurt--;

    if (box && en.lastHit !== player.attackId && rectsOverlap(box, en)) {
      en.lastHit = player.attackId;
      en.hp -= character.damage;
      en.hurt = 10;
      en.x += player.facing * 20;
      en.x = Math.max(en.minX, Math.min(en.x, en.maxX));
      if (en.hp <= 0) game.score += en.score;
    }

    if (en.hp > 0 && rectsOverlap(player, en)) {
      if (hurtPlayer(level)) game.state = "gameover";
    }
  }
}