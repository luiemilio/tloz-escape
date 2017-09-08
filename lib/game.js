const Link = require('./link');
const Enemy = require('./enemy');

class Game {
  constructor(ctx, doc, oktorokImg) {
    this.ctx = ctx;
    this.doc = doc;
    this.link = new Link(ctx, doc);
    this.oktorok1 = new Enemy(ctx, doc, this, 300);
    this.oktorok2 = new Enemy(ctx, doc, this, 300);
    this.allObjects = [this.link, this.link.sword, this.oktorok1, this.oktorok2];
  }

  getEnemyPos() {
    const posArr = [];
    this.enemies.forEach((enemy) => {
      posArr.push([enemy.xCoord, enemy.yCoord]);
    });
    return posArr;
  }

  setup() {
    this.link.setup();
    this.oktorok1.setup();
    // this.oktorok2.setup();
    this.setupListeners();
   }


  handleKeyDown(event) {
    switch(event.keyCode) {
      case 87:
        console.log("up");
        this.link.keyUp = true;
        break;
      case 83:
        console.log("down");
        this.link.keyDown = true;
        break;
      case 65:
        console.log("left");
        this.link.keyLeft = true;
        break;
      case 68:
        console.log("right");
        this.link.keyRight = true;
        break;
      case 38:
        event.preventDefault();
        this.link.keyUpAtk = true;
        break;
      case 40:
        event.preventDefault();
        this.link.keyDownAtk = true;
        break;
      case 37:
        this.link.keyLeftAtk =  true;
        break;
      case 39:
        this.link.keyRightAtk = true;
        break;
    }
  }

  handleKeyUp(event) {
    switch(event.keyCode) {
      case 87:
        console.log("up");
        this.link.keyUp = false;
        break;
      case 83:
        console.log("down");
        this.link.keyDown = false;
        break;
      case 65:
        console.log("left");
        this.link.keyLeft = false;
        break;
      case 68:
        console.log("right");
        this.link.keyRight = false;
        break;
      case 38:
        event.preventDefault();
        this.link.keyUpAtk = false;
        break;
      case 40:
        event.preventDefault();
        this.link.keyDownAtk = false;
        break;
      case 37:
        this.link.keyLeftAtk = false;
        break;
      case 39:
        this.link.keyRightAtk = false;
        break;
    }
  }
   setupListeners() {
     this.doc.addEventListener('keydown', this.handleKeyDown.bind(this), true);
     this.doc.addEventListener('keyup', this.handleKeyUp.bind(this), true);
   }


}



module.exports = Game;
