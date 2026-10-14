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
  exit: { x: 2330, y: 340, w: 40, h: 60 }
};