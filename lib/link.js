const Sword = require('./sword');
const Util = require('./util');

class Link {
  constructor(ctx, doc) {
    this.xCoord = 0;
    this.yCoord = 0;
    this.height = 25;
    this.width = 25;
    this.ctx = ctx;
    this.doc = doc;
    this.img = new Image();
    this.img.src = './assets/link.png';
    this.sword = new Sword(ctx, this, doc);
    this.keyUp = false;
    this.keyDown = false;
    this.keyLeft = false;
    this.keyRight = false;
    this.keyUpAtk = false;
    this.keyDownAtk = false;
    this.keyLeftAtk = false;
    this.keyRightAtk = false;
    this.radius = this.height / 2;
    this.alive = true;
    this.pos = [];
    this.drawLink = this.drawLink.bind(this);
  }

  setup() {
    this.drawLink();
    setInterval(this.move.bind(this), 0);
  }

  isCollidedWith(otherObject) {
    if (this.pos && otherObject.pos) {
      const centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < (this.radius + otherObject.radius);
    }
  }

  drawLink(){
    this.ctx.drawImage(this.img, this.xCoord, this.yCoord, this.height, this.width);
  }

  clearLink(){
    this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
  }

  move(){
    if (this.alive) {
      if (this.keyUp) {
        if (this.yCoord - 1 > 0) {
          this.clearLink();
          this.yCoord -= 0.35;
          this.drawLink();
        }
      }

      if (this.keyDown) {
        if (this.yCoord + 1 < 120) {
          this.clearLink();
          this.yCoord += 0.35;
          this.drawLink();
        }
      }

      if (this.keyLeft) {
        if (this.xCoord - 1 > 0) {
          this.clearLink();
          this.xCoord -= 0.35;
          this.drawLink();
        }
      }

      if (this.keyRight) {
        if (this.xCoord + 1 < 275) {
          this.clearLink();
          this.xCoord += 0.35;
          this.drawLink();
        }
      }

      if (this.keyUpAtk) {
        this.sword.attack('up');
      }

      if (this.keyDownAtk) {
        this.sword.attack('down');
      }

      if (this.keyLeftAtk) {
        this.sword.attack('left');
      }

      if (this.keyRightAtk) {
        this.sword.attack('right');
      }
      this.pos = [this.xCoord, this.yCoord];
    } else {
      this.clearLink();
    }
  }
}
module.exports = Link;
