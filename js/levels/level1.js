window.LEVELS = window.LEVELS || [];

LEVELS[0] = {
  name: "Nivel 1 - El Despertar",
  width: 2400,
  start: { x: 50, y: 300 },
  platforms: [
    { x: 0,    y: 400, w: 700,  h: 50 },
    { x: 800,  y: 400, w: 500,  h: 50 },
    { x: 1400, y: 400, w: 1000, h: 50 },
    { x: 400,  y: 330, w: 120,  h: 20 },
    { x: 1000, y: 330, w: 120,  h: 20 },
    { x: 1600, y: 330, w: 100,  h: 20 },
    { x: 1800, y: 260, w: 100,  h: 20 },
    { x: 2000, y: 330, w: 100,  h: 20 }
  ],
  spikes: [
    { x: 1750, y: 380, w: 60, h: 20 }
  ],
    enemies: [
    { type: "bandido", x: 1000, ground: 400, range: 120 },
    { type: "bandido", x: 2100, ground: 400, range: 100 }
  ],
  checkpoints: [ { x: 1450, y: 340, w: 30, h: 60 } ],
  coins: [
    { x: 200, y: 370 }, { x: 460, y: 300 }, { x: 1060, y: 300 },
    { x: 1650, y: 300 }, { x: 1850, y: 230 }, { x: 2050, y: 300 }
  ],
    coins: [
    { x: 200,  y: 370 }, { x: 460,  y: 300 }, { x: 1000, y: 370 },
    { x: 1060, y: 300 }, { x: 1650, y: 300 }, { x: 1850, y: 230 },
    { x: 2050, y: 300 }
  ],
  exit: { x: 2330, y: 340, w: 40, h: 60 }
};