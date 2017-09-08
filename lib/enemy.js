const Util = require('./util');

class Enemy {
  constructor(ctx, doc, game, speed) {
    this.xCoord = Math.random() * (275 - 30) + 30;
    this.yCoord = Math.random() * (100 - 30) + 30;
    this.height = 15;
    this.width = 15;
    this.img = new Image();
    this.img.src = './assets/oktorok.png';
    this.ctx = ctx;
    this.doc = doc;
    this.alive = true;
    this.game = game;
    this.speed = speed;
    this.radius = this.height / 2;
    this.pos = [];
  }

  isCollidedWith(otherObject) {
    if (this.pos && otherObject.pos) {
      const centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < (this.radius + otherObject.radius);
    }
  }

  setup() {
    this.drawEnemy();
    setInterval(this.move.bind(this), this.speed);
  }

  drawEnemy(){
    this.ctx.drawImage(this.img, this.xCoord, this.yCoord, this.height, this.width);
  }

  clearEnemy(){
    this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
  }

  move() {
    // console.log("should be moving");
    if (this.alive) {
      const distances = [-5, 5];
      const moves = ["up", "down", "left", "right"];
      const ranD = distances[Math.floor(Math.random()*distances.length)];
      const ranM = moves[Math.floor(Math.random()*moves.length)];
      switch(ranM) {
        case "up":
        // debugger
        if (this.yCoord - 5 > 0) {
          this.clearEnemy();
          this.yCoord -= 5;
          this.drawEnemy();
        }
        break;
        case "down":
        if (this.yCoord + 5 < 120) {
          this.clearEnemy();
          this.yCoord += 5;
          this.drawEnemy();
        }
        break;

        case "left":
        if (this.xCoord - 5 > 0) {
          this.clearEnemy();
          this.xCoord -= 5;
          this.drawEnemy();
        }
        break;

        case "right":
        if (this.xCoord + 5 < 275) {
          this.clearEnemy();
          this.xCoord += 5;
          this.drawEnemy();
        }
        break;
      }
      this.pos = [this.xCoord, this.yCoord];
    } else {
      this.clearEnemy();
    }
  }
}


module.exports = Enemy;
