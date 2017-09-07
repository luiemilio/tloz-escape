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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

// mapLimits = { xCoord = 120, yCoord = 275 }

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  game = new Game(ctx, document);
  game.setup();
  window.game = game;
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Link = __webpack_require__(2);
const Enemy = __webpack_require__(5);

class Game {
  constructor(ctx, doc, oktorokImg) {
    this.ctx = ctx;
    this.link = new Link(ctx, doc);
    this.oktorok1 = new Enemy(ctx, doc);
    this.oktorok2 = new Enemy(ctx, doc);
    
  }


 setup() {
   this.link.setup();
   this.oktorok1.setup();
   this.oktorok2.setup();
 }

}



module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Sword = __webpack_require__(3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
        // linkX -= 2;
        linkY -= 17;
        this.ctx.drawImage(this.imgUp, linkX, linkY, swordH, swordW);
        setTimeout(clearSword, 100);
      break;

      case 'down':
        // linkX += 2;
        linkY += 25;
        this.ctx.drawImage(this.imgDown, linkX, linkY, swordH, swordW);
        setTimeout(clearSword, 100);
      break;

      case 'left':
        linkX -= 20;
        // linkY -= ;
        this.ctx.drawImage(this.imgLeft, linkX, linkY, swordH, swordW);
        setTimeout(clearSword, 100);
      break;

      case 'right':
        linkX += 23;
        // linkY -= 17;
        this.ctx.drawImage(this.imgRight, linkX, linkY, swordH, swordW);
        setTimeout(clearSword, 100);
      break;
    }
  }
}

 module.exports = Sword;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

class Enemy {
  constructor(ctx, doc) {
    this.xCoord = Math.random() * (275 - 30) + 30;
    this.yCoord = Math.random() * (100 - 30) + 30;
    this.height = 20;
    this.width = 20;
    this.img = new Image();
    this.img.src = './assets/oktorok.png';
    this.ctx = ctx;
    this.doc = doc;
  }

  setup() {
    this.initialDraw();
    setInterval(this.move.bind(this), 500);
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
    const distances = [-5, 5];
    const moves = ["up", "down", "left", "right"];
    const ranD = distances[Math.floor(Math.random()*distances.length)];
    const ranM = moves[Math.floor(Math.random()*moves.length)];
    switch(ranM) {
      case "up":
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
  }
}


module.exports = Enemy;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map