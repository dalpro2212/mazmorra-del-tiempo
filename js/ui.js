// Interfaz: HUD, menú principal, Game Over y victoria.

function drawHUD(ctx, level, lives, score, best) {
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.font = "18px monospace";
  ctx.fillText(level.name, 20, 28);

  ctx.fillStyle = "#e0505a";
  ctx.font = "22px monospace";
  ctx.fillText("♥".repeat(Math.max(lives, 0)), 640, 28);

  ctx.fillStyle = "#f4c95d";
  ctx.font = "16px monospace";
  ctx.fillText("★ " + score + "   Récord: " + best, 560, 52);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "12px monospace";
  ctx.fillText("R: reiniciar   Esc: menú", 20, 440);
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
  ctx.fillText("R: reiniciar   Esc: volver al menú", 400, 364);

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
  ctx.fillText("Escapaste de la mazmorra", 400, 245);
  ctx.fillText("ENTER: volver al menú", 400, 285);
  ctx.textAlign = "left";
}