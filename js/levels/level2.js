window.LEVELS = window.LEVELS || [];

LEVELS[1] = {
  name: "Nivel 2 - Los Pinchos",
  start: { x: 50, y: 300 },
  platforms: [
    { x: 0, y: 400, w: 800, h: 50 }
  ],
  spikes: [
  { x: 300, y: 380, w: 60, h: 20 },               // fijo
  { x: 500, y: 380, w: 80, h: 20, blink: 90 }     // sale y se esconde (~1.5 s)
],
platforms: [
  { x: 0, y: 400, w: 800, h: 50 },
  { x: 380, y: 320, w: 100, h: 20 }
],
  exit: { x: 730, y: 340, w: 40, h: 60 }
};