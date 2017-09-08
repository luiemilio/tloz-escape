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
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx, document);
  game.setup();
  window.game = game;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Link = __webpack_require__(4);
const Enemy = __webpack_require__(5);
const Sword = __webpack_require__(1);

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
    this.link.setup();
    this.oktorok1.setup();
    this.oktorok2.setup();
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
            console.log("sword hit");
            this.link.sword.pos = [];
            obj2.pos = [];
            obj2.alive = false;
            this.allObjects.splice(j, 1);
            if (this.allObjects.length <= 2) {
              
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Sword = __webpack_require__(1);
const Util = __webpack_require__(0);

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
    this.radius = this.height / 2;
    this.alive = true;
    this.pos = [];
    this.drawLink = this.drawLink.bind(this);
    this.img.onload = this.drawLink;
  }

  setup() {
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Enemy {
  constructor(ctx, doc, game, speed) {
    this.xCoord = Math.random() * (275 - 30) + 30;
    this.yCoord = Math.random() * (100 - 30) + 30;
    this.height = 20;
    this.width = 20;
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
    this.initialDraw();
    setInterval(this.move.bind(this), this.speed);
  }

  initialDraw(){
    this.ctx.drawImage(this.img, this.xCoord, this.yCoord, this.height, this.width);
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map