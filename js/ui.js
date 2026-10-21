// Interfaz: HUD, menú, selección de personaje, Game Over y victoria.

function drawHUD(ctx, level, lives, score, best) {
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.font = "18px monospace";
  ctx.fillText(level.name + "  (" + character.name + ")", 20, 28);

  ctx.fillStyle = "#e0505a";
  ctx.font = "22px monospace";
  ctx.fillText("♥".repeat(Math.max(lives, 0)), 620, 28);

  ctx.fillStyle = "#f4c95d";
  ctx.font = "16px monospace";
  ctx.fillText("★ " + score + "   Récord: " + best, 540, 52);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "12px monospace";
  ctx.fillText("J: espada   R: reiniciar   Esc: menú", 20, 440);
}

function drawOverlay(ctx, alpha) {
  ctx.fillStyle = "rgba(0,0,0," + alpha + ")";
  ctx.fillRect(0, 0, 800, 450);
}

function drawMenu(ctx, tick) {
  drawOverlay(ctx, 0.5);
  ctx.textAlign = "center";
  ctx.fillStyle = "#f4c95d";
  ctx.font = "bold 44px monospace";
  ctx.fillText("LA MAZMORRA", 400, 130);
  ctx.fillText("DEL TIEMPO", 400, 180);

  const blink = 0.5 + 0.5 * Math.sin(tick * 0.08);
  ctx.fillStyle = "rgba(255,255,255," + (0.4 + 0.6 * blink) + ")";
  ctx.font = "24px monospace";
  ctx.fillText("Presiona ENTER para jugar", 400, 260);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "15px monospace";
  ctx.fillText("Moverse: flechas o A/D", 400, 320);
  ctx.fillText("Saltar: flecha arriba, W o Espacio", 400, 342);
  ctx.fillText("Espada: J   Reiniciar: R   Menú: Esc", 400, 364);
  ctx.textAlign = "left";
}

function drawSelect(ctx, tick, selected) {
  drawOverlay(ctx, 0.6);
  ctx.textAlign = "center";
  ctx.fillStyle = "#f4c95d";
  ctx.font = "bold 30px monospace";
  ctx.fillText("ELIGE TU PERSONAJE", 400, 55);

  const ids = ["daniel", "belu"];
  const info = {
    daniel: ["Guerrero fuerte", "Espada: daño 2, largo alcance", "Vidas: 4", "Velocidad normal"],
    belu:   ["Ágil y veloz", "Espada: rápida, daño 1", "Vidas: 3", "Más veloz + DOBLE SALTO"]
  };

  ids.forEach((id, i) => {
    const cx = 230 + i * 340;
    const sel = i === selected;
    ctx.fillStyle = sel ? "rgba(244,201,93,0.18)" : "rgba(255,255,255,0.05)";
    ctx.fillRect(cx - 140, 80, 280, 300);
    ctx.strokeStyle = sel ? "#f4c95d" : "rgba(255,255,255,0.2)";
    ctx.lineWidth = sel ? 3 : 1;
    ctx.strokeRect(cx - 140, 80, 280, 300);

    // Vista previa del héroe (más grande)
    ctx.save();
    ctx.translate(cx, 110);
    ctx.scale(2, 2);
    const dummy = { x: -14, y: 0, w: 28, h: 44, vx: 0, onGround: true, facing: 1 };
    drawHero(ctx, dummy, tick, CHARACTERS[id]);
    ctx.restore();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px monospace";
    ctx.fillText(CHARACTERS[id].name.toUpperCase(), cx, 225);
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    info[id].forEach((t, k) => ctx.fillText(t, cx, 255 + k * 24));
  });

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "16px monospace";
  ctx.fillText("← → para elegir    ENTER para empezar    ESC volver", 400, 420);
  ctx.textAlign = "left";
}

function drawGameOver(ctx) {
  drawOverlay(ctx, 0.75);
  ctx.textAlign = "center";
  ctx.fillStyle = "#e0505a";
  ctx.font = "bold 48px monospace";
  ctx.fillText("GAME OVER", 400, 210);
  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.fillText("ENTER: reintentar    ESC: menú", 400, 260);
  ctx.textAlign = "left";
}

function drawVictory(ctx) {
  drawOverlay(ctx, 0.75);
  ctx.textAlign = "center";
  ctx.fillStyle = "#f4c95d";
  ctx.font = "bold 48px monospace";
  ctx.fillText("¡VICTORIA!", 400, 200);
  ctx.fillStyle = "#fff";
  ctx.font = "20px monospace";
  ctx.fillText("Derrotaste al jefe y escapaste", 400, 245);
  ctx.fillText("ENTER: volver al menú", 400, 285);
  ctx.textAlign = "left";
}