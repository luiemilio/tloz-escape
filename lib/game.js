const Link = require('./link');
const Enemy = require('./enemy');
const Sword = require('./sword');
const Util = require('./util');

class Game {
  constructor(ctx, doc, scoreCtx) {
    this.ctx = ctx;
    this.doc = doc;
    this.link = new Link(ctx, doc);
    this.allObjects = [this.link, this.link.sword];
    this.timeEnemiesAdded = 0;
    this.killCount = 0;
    this.scoreCtx = scoreCtx;
    this.scoreCtx.font = '25px triforce';
    this.scoreCtx.fillText(`Score: ${this.killCount}`, 10,50);
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx, this.doc, this, 300);
    this.allObjects.push(enemy);
    enemy.setup();
  }

  addEnemies() {
    const rangeArr = new Array(this.timeEnemiesAdded + 1);
    for (var i = 0; i < rangeArr.length; i++) {
      this.addEnemy();
    }
    this.timeEnemiesAdded++;
  }

  setup() {
    this.link.setup();
    this.addEnemies();
    this.setupListeners();
    setInterval(this.checkCollisions.bind(this), 0);
   }


  handleKeyDown(event) {
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
        if (i === j) {
          continue;
        }
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          if(obj1 instanceof Sword && !(obj2 instanceof Link) && !(obj2 instanceof Sword)) {
            // console.log("sword hit");
            this.link.sword.pos = [];
            obj2.pos = [];
            obj2.alive = false;
            this.allObjects.splice(j, 1);
            this.scoreCtx.clearRect(0, 0, 100, 50);
            this.killCount++;
            this.scoreCtx.fillText(`Score: ${this.killCount}`, 10, 50);
            if (this.allObjects.length <= 2) {
              // console.log("all enemies killed!");
              this.ctx.clearRect(0,0, 120, 275);
              this.addEnemies();
            }
          } else if (obj1 instanceof Link && obj2 instanceof Enemy) {
            console.log("game over");
            this.link.pos = [];
            this.link.alive = false;
            this.ctx.font = '48px triforce';
            this.ctx.fillText("Game Over", 40, 40);
          } else if (obj2 instanceof Enemy && obj1 instanceof Link) {
            console.log("game over");
            this.link.pos = [];
            this.link.alive = false;
            this.ctx.font = '48px triforce';
            this.ctx.fillText("Game Over", 40, 40);
          }
        }
      }
    }
  }
}



module.exports = Game;
