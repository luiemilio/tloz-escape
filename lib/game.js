const Link = require('./link');
const Enemy = require('./enemy');
const Sword = require('./sword');

class Game {
  constructor(ctx, doc) {
    this.ctx = ctx;
    this.doc = doc;
    this.link = new Link(ctx, doc);
    this.oktorok1 = new Enemy(ctx, doc, this, 300);
    this.oktorok2 = new Enemy(ctx, doc, this, 300);
    this.allObjects = [this.link, this.link.sword, this.oktorok1, this.oktorok2];
  }

  setup() {
    this.setupListeners();
    this.link.setup();
    this.oktorok1.setup();
    this.oktorok2.setup();
    setInterval(this.checkCollisions.bind(this), 0);
   }


  handleKeyDown(event) {
    // if (event.keyCode >= 37 && event.keyCode <= 40) {
    //   console.log("sword attack");
    // }
    switch(event.keyCode) {
      case 87:
        // console.log("up");
        this.link.keyUp = true;
        break;
      case 83:
        // console.log("down");
        this.link.keyDown = true;
        break;
      case 65:
        // console.log("left");
        this.link.keyLeft = true;
        break;
      case 68:
        // console.log("right");
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
        // console.log("up");
        this.link.keyUp = false;
        break;
      case 83:
        // console.log("down");
        this.link.keyDown = false;
        break;
      case 65:
        // console.log("left");
        this.link.keyLeft = false;
        break;
      case 68:
        // console.log("right");
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

  checkCollisions() {
    const allObjects = this.allObjects;
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          if(obj1 instanceof Sword && !(obj2 instanceof Link) && !(obj2 instanceof Sword)) {
            console.log("sword hit");
            this.link.sword.pos = [];
            obj2.pos = [];
            obj2.alive = false;
          } else if (obj1 instanceof Link && obj2 instanceof Enemy) {
            console.log("game over");
            this.link.pos = [];
            this.link.alive = false;
            this.ctx.fillText("Game over");
          } else if (obj2 instanceof Enemy && obj1 instanceof Link) {
            console.log("game over");
            this.link.pos = [];
            this.link.alive = false;
          }
        }
      }
    }
  }
}



module.exports = Game;
