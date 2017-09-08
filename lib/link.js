const Sword = require('./sword');

class Link {
  constructor(ctx, doc) {
    this.xCoord = 10;
    this.yCoord = 10;
    this.height = 30;
    this.width = 30;
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
  }

  setup() {
    this.initialDraw();
    // this.setupListeners();
    setInterval(this.move.bind(this), 0);
  }

  willCollideWith(otherObj) {
    const distance = this.game
  }

  initialDraw(){
    this.ctx.drawImage(this.img, this.xCoord, this.yCoord, this.height, this.width);
  }

  drawLink(){
    this.ctx.drawImage(this.img, this.xCoord, this.yCoord, this.height, this.width);
  }

  clearLink(){
    this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
  }

  move(){
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
  }
}
module.exports = Link;
