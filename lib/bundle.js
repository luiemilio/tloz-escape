/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  times(n, iterator) {
    let accum = Array(Math.max(0, n));
    for (let i = 0; i < n; i++) accum[i] = iterator.call();
    return accum;
  },
};



module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Sword {
  constructor(ctx, link, doc) {
    this.height = 23;
    this.width = 23;
    this.xCoord = 0;
    this.yCoord = 0;
    this.ctx = ctx;
    this.link = link;
    this.doc = doc;
    this.imgUp = new Image();
    this.imgDown = new Image();
    this.imgLeft = new Image();
    this.imgRight = new Image();
    this.imgUp.src = "./assets/sword-up.png";
    this.imgDown.src = "./assets/sword-down.png";
    this.imgLeft.src = "./assets/sword-left.png";
    this.imgRight.src = "./assets/sword-right.png";
    this.radius = this.height / 2;
    this.pos = [];
  }

  resetSword() {

  }

  isCollidedWith(otherObject) {
    if (this.pos && otherObject.pos) {
      const centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < (this.radius + otherObject.radius);
    }
  }



  attack(direction) {
    let linkX = this.link.xCoord;
    let linkY = this.link.yCoord;
    let swordH = this.height;
    let swordW = this.width;
    const clearSword = () => {
      this.ctx.clearRect(linkX, linkY, swordH, swordW);
    };
    switch(direction) {
      case 'up':
        linkY -= 20;
        this.ctx.drawImage(this.imgUp, linkX, linkY, swordH, swordW);
      break;

      case 'down':
        linkY += 25;
        this.ctx.drawImage(this.imgDown, linkX, linkY, swordH, swordW);
      break;

      case 'left':
        linkX -= 20;
        this.ctx.drawImage(this.imgLeft, linkX, linkY, swordH, swordW);
      break;

      case 'right':
        linkX += 25;
        this.ctx.drawImage(this.imgRight, linkX, linkY, swordH, swordW);
      break;
    }
    this.pos = [linkX, linkY];
    setTimeout(clearSword, 10);
  }
}

 module.exports = Sword;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);

// mapLimits = { xCoord = 120, yCoord = 275 }

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("myCanvas");
  const scoreCanvas = document.getElementById("count-canvas");
  const screenCanvas = document.getElementById("screen-canvas");
  const ctx = canvas.getContext("2d");
  const scoreCtx = scoreCanvas.getContext("2d");
  const screenCtx = screenCanvas.getContext("2d");
  const game = new Game(ctx, document, scoreCtx, screenCtx, screenCanvas);
  game.drawWelcome();
  window.game = game;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Link = __webpack_require__(4);
const Enemy = __webpack_require__(5);
const Sword = __webpack_require__(1);
const Util = __webpack_require__(0);

class Game {
  constructor(ctx, doc, scoreCtx, screenCtx, canvas) {
    this.ctx = ctx;
    this.doc = doc;
    this.link = new Link(ctx, doc);
    this.allObjects = [this.link, this.link.sword];
    this.enemies = [];
    this.futureMovement = [];
    this.timeEnemiesAdded = 0;
    this.killCount = 0;
    this.screenCtx = screenCtx;
    this.scoreCtx = scoreCtx;
    this.scoreCtx.font = '25px triforce';
    this.scoreCtx.fillStyle = '#ffffff';
    this.scoreCtx.fillText(`Score: ${this.killCount}`, 10,50);
    this.gameStarted = false;
    this.moveEnemies = this.moveEnemies.bind(this);
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx, this.doc, this, 300);
    this.allObjects.push(enemy);
    this.enemies.push(enemy);
    enemy.setup();
  }

  addEnemies() {
    const rangeArr = new Array(this.timeEnemiesAdded + 1);
    for (let i = 0; i < rangeArr.length; i++) {
      this.addEnemy();
    }
    this.timeEnemiesAdded++;
  }

  removeAllEnemies() {
    this.allObjects.forEach((obj, idx) => {
      if (obj instanceof Enemy) {
        this.allObjects.splice(idx, 1);
        obj.killEnemy();
        // debugger
      }
    });
    this.enemies = [];
  }

  moveEnemies() {
    let enemyPosArr = [];
    const positionEnemy = (enemy) => {
      let pos = enemy.getNextPos();
      enemyPosArr.forEach((pos) => {
        if (enemy.posCollidesWith(pos)){
          return positionEnemy(enemy);
        }
      });
      enemy.moveTo(pos);
    };
    this.enemies.forEach((enemy) => {
      positionEnemy(enemy);
    });

    this.checkCollisions();
  }

  animationFrameLoop () {
    window.requestAnimationFrame(() => {
      this.moveEnemies();
    });
  }


  setup() {
    if (this.enemyMoveTimeout) {
      clearInterval(this.enemyMoveTimeout);
    }
    this.gameStarted = true;
    this.screenCtx.clearRect(0, 0, 615, 403);
    this.link.setup();
    this.addEnemies();


    this.enemyMoveInterval = setInterval(this.animationFrameLoop.bind(this), 200);
   }

   drawWelcome(){
     this.setupListeners();
     this.screenCtx.fillStyle = '#ffffff';
     this.screenCtx.font = "20px triforce";
     this.screenCtx.fillText("Press ENTER to start", 60, 80);
   }

   handleGameOver() {
     clearInterval(this.enemyMoveInterval);
     setTimeout(() => {
       this.gameStarted = false;
       this.link.clearLink();
       this.link.resetLink();
       this.removeAllEnemies();
       this.timeEnemiesAdded = 0;
       this.killCount = 0;
       this.ctx.clearRect(0, 0, 120, 275);
       this.screenCtx.font = '45px triforce';
       this.screenCtx.fillText("Game Over", 40, 70);
       this.screenCtx.font = '18px triforce';
       this.screenCtx.fillText("Press enter to play again", 55, 100);
     }, 100);
   }

   handleSwordHit(obj1, obj2, idx) {
     this.enemies = this.enemies.filter((enemy) => enemy !== obj2);
     obj2.clearEnemy();
     obj2.killEnemy();
     this.link.sword.pos = [];
     obj2.alive = false;
     this.allObjects.splice(idx, 1);
     this.scoreCtx.clearRect(0, 0, 200, 200);
     this.killCount++;
     this.scoreCtx.fillText(`Score: ${this.killCount}`, 10, 50);
     if (this.allObjects.length <= 2) {
      //  clearInterval(this.collisionInterval);
       clearInterval(this.enemyMoveInterval);
       this.ctx.clearRect(0,0, 120, 275);
       this.link.clearLink();
       this.link.xCoord = 0;
       this.link.yCoord = 0;
       this.link.drawLink();
       this.addEnemies();
       this.enemyMoveInterval = setInterval(this.animationFrameLoop.bind(this), 200);
     }
   }


  handleKeyDown(event) {
    switch(event.keyCode) {
      case 13:
      if (!this.gameStarted) {
        this.screenCtx.clearRect(0, 0, 615, 403);
        this.ctx.clearRect(0, 0, 615, 403);
        this.setup();
      }
      break;
      case 87:
        this.link.keyUp = true;
        break;
      case 83:
        this.link.keyDown = true;
        break;
      case 65:
        this.link.keyLeft = true;
        break;
      case 68:
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
    this.checkCollisions();
  }

  handleKeyUp(event) {
    switch(event.keyCode) {
      case 87:
       this.link.keyUp = false;
        break;
      case 83:
        this.link.keyDown = false;
        break;
      case 65:
        this.link.keyLeft = false;
        break;
      case 68:
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
    this.checkCollisions();
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
          if(obj1 instanceof Sword && obj2 instanceof Enemy) {
            this.handleSwordHit(obj1, obj2, j);
          } else if(obj1 instanceof Enemy && obj2 instanceof Sword) {
            this.handleSwordHit(obj2, obj1, j);
          }
          else if (obj1 instanceof Link && obj2 instanceof Enemy) {
            this.handleGameOver(obj1, obj2);
          } else if (obj2 instanceof Enemy && obj1 instanceof Link) {
            this.handleGameOver(obj1, obj2);
          }
        }
      }
    }
  }
}



module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Sword = __webpack_require__(1);
const Util = __webpack_require__(0);

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
    this.pos = [this.xCoord, this.yCoord];
    this.drawLink = this.drawLink.bind(this);
  }

  resetLink() {
    clearInterval(this.moveInterval);
    this.clearLink();
    this.xCoord = 0;
    this.yCoord = 0;
    this.keyUp = false;
    this.keyDown = false;
    this.keyLeft = false;
    this.keyRight = false;
    this.keyUpAtk = false;
    this.keyDownAtk = false;
    this.keyLeftAtk = false;
    this.keyRightAtk = false;
    this.alive = false;
    this.pos = [];
  }

  setup() {
    this.alive = true;
    this.drawLink();
    this.moveInterval = setInterval(this.move.bind(this), 0);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map