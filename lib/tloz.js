const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const linkImg = document.getElementById("link-img");
  const swordImg = document.getElementById("sword-img");
  new Game(ctx, linkImg, document).setup();
});
