const Game = require('./game');

// mapLimits = { xCoord = 120, yCoord = 275 }

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("myCanvas");
  const scoreCanvas = document.getElementById("count-canvas");
  const ctx = canvas.getContext("2d");
  const scoreCtx = scoreCanvas.getContext("2d");
  const game = new Game(ctx, document, scoreCtx);
  game.setup();
  window.game = game;
});
