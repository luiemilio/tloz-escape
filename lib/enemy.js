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
    this.pos = [this.xCoord, this.yCoord];
    this.moveTo = this.moveTo.bind(this);
  }

  killEnemy() {
    this.clearEnemy();
    this.xCoord = 0;
    this.yCoord = 0;
    this.alive = false;
    this.pos = [];
  }

  isCollidedWith(otherObject) {
    if (this.pos && otherObject.pos) {
      const centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < (this.radius + otherObject.radius);
    }
  }

  posCollidesWith(pos) {
    if (this.pos) {
      const centerDist = Util.dist(this.pos, pos);
      return centerDist < (15);
    }
  }


  setup() {
    this.drawEnemy();
  }

  drawEnemy(){
    this.ctx.drawImage(this.img, this.xCoord, this.yCoord, this.height, this.width);
  }

  clearEnemy(){
    this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
  }

  moveTo(pos){
    this.clearEnemy();
    // debugger
    this.xCoord = pos.x;
    this.yCoord = pos.y;
    this.pos = [this.xCoord, this.yCoord];
    this.drawEnemy();
  }

  getNextPos() {
      const distances = [-5, 5];
      const moves = ["up", "down", "left", "right"];
      const ranD = distances[Math.floor(Math.random()*distances.length)];
      const ranM = moves[Math.floor(Math.random()*moves.length)];
      const pos = {x: this.xCoord, y: this.yCoord};
      switch(ranM) {
        case "up":
        if (this.yCoord - 5 > 0) {
          pos.y -= 5;
        }
        break;
        case "down":
        if (this.yCoord + 5 < 120) {
          pos.y += 5;
        }
        break;

        case "left":
        if (this.xCoord - 5 > 0) {
          pos.x -= 5;
        }
        break;

        case "right":
        if (this.xCoord + 5 < 275) {
          pos.x += 5;
        }
        break;
      }
      return pos;
  }
}


module.exports = Enemy;
