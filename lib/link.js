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
    this.setupListeners.bind(this);
    // this.move = this.move.bind(this);
  }

  setup() {
    this.initialDraw();
    this.setupListeners();
    setInterval(this.move.bind(this), 0);
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

  handleKeyDown(event) {
    switch(event.keyCode) {
      case 87:
        this.keyUp = true;
        break;
      case 83:
        this.keyDown = true;
        break;
      case 65:
        this.keyLeft = true;
        break;
      case 68:
        this.keyRight = true;
        break;
      case 38:
        event.preventDefault();
        this.keyUpAtk = true;
        break;
      case 40:
        event.preventDefault();
        this.keyDownAtk = true;
        break;
      case 37:
        this.keyLeftAtk = true;
        break;
      case 39:
        this.keyRightAtk = true;
        break;

    }
  }

  handleKeyUp(event) {
    switch(event.keyCode) {
      case 87:
        this.keyUp = false;
        break;
      case 83:
        this.keyDown = false;
        break;
      case 65:
        this.keyLeft = false;
        break;
      case 68:
        this.keyRight = false;
        break;
      case 38:
        // event.preventDefault();
        this.keyUpAtk = false;
        break;
      case 40:
        // event.preventDefault();
        this.keyDownAtk = false;
        break;
      case 37:
        this.keyLeftAtk = false;
        break;
      case 39:
        this.keyRightAtk = false;
        break;
    }
  }

  setupListeners() {
    this.doc.addEventListener('keydown', this.handleKeyDown.bind(this), true);
    this.doc.addEventListener('keyup', this.handleKeyUp.bind(this), true);
  }

  move(){
    if (this.keyUp) {
      if (this.yCoord - 1 > 0) {
        this.clearLink();
        this.yCoord -= 0.3;
        this.drawLink();
      }
    }

    if (this.keyDown) {
      if (this.yCoord + 1 < 120) {
        this.clearLink();
        this.yCoord += 0.3;
        this.drawLink();
      }
     }

    if (this.keyLeft) {
      if (this.xCoord - 1 > 0) {
        this.clearLink();
        this.xCoord -= 0.3;
        this.drawLink();
      }
     }

    if (this.keyRight) {
      if (this.xCoord + 1 < 275) {
        this.clearLink();
        this.xCoord += 0.3;
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