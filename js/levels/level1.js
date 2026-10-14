// Nivel 1 - Tutorial
// Cada nivel vive en su propio archivo y se registra en LEVELS.
window.LEVELS = window.LEVELS || [];

LEVELS[0] = {
  name: "Nivel 1 - El Despertar",
  start: { x: 50, y: 300 },
  platforms: [
    { x: 0, y: 400, w: 800, h: 50 }   // suelo
  ],
  spikes: [],
  exit: { x: 730, y: 340, w: 40, h: 60 }
};