const Game = require('./game');

// mapLimits = { xCoord = 120, yCoord = 275 }

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  game = new Game(ctx, document);
  game.setup();
  window.game = game;
});
