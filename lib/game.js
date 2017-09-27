const Link = require('./link');
const Enemy = require('./enemy');
const Sword = require('./sword');
const Util = require('./util');

class Game {
  constructor(ctx, doc, scoreCtx, screenCtx, canvas) {
    this.ctx = ctx;
    this.doc = doc;
    this.link = new Link(ctx, doc);
    this.allObjects = [this.link, this.link.sword];
    this.enemies = [];
    this.timeEnemiesAdded = 0;
    this.killCount = 0;
    this.screenCtx = screenCtx;
    this.scoreCtx = scoreCtx;
    this.scoreCtx.font = '25px triforce';
    this.scoreCtx.fillStyle = '#ffffff';
    this.scoreCtx.fillText(`Score: ${this.killCount}`, 10,50);
    this.gameStarted = false;
    this.moveEnemies = this.moveEnemies.bind(this);
    this.reloadDocument = this.reloadDocument.bind(this);
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx, this.doc, this, 300);
    this.allObjects.push(enemy);
    this.enemies.push(enemy);
    enemy.setup();
    console.log("enemy added");
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
        console.log("enemy removed");
        this.allObjects.splice(idx, 1);
        obj.killEnemy();
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
      enemyPosArr.push(pos);
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

  handleAudioToggle() {
    let audioTag = this.doc.getElementById("player");
    let audioBtn = this.doc.getElementById("audio-btn");
    if (audioBtn.innerText === "Audio: on") {
      audioBtn.innerText = "Audio: off";
      audioTag.pause();
    } else {
      audioBtn.innerText = "Audio: on";
      audioTag.play();
    }
  }


  setup() {
    if (this.enemyMoveTimeout) {
      clearInterval(this.enemyMoveTimeout);
    }
    this.gameStarted = true;
    this.screenCtx.clearRect(0, 0, 615, 403);
    this.link.setup();
    this.addEnemies();


    this.enemyMoveInterval = setInterval(this.animationFrameLoop.bind(this), 400);
   }

   drawWelcome(){
     this.setupListeners();
     this.screenCtx.fillStyle = '#ffffff';
     this.screenCtx.font = "20px triforce";
     this.screenCtx.fillText("Press ENTER to start", 60, 80);
   }

   handleGameOver() {
     this.removeAllEnemies();
     clearInterval(this.enemyMoveInterval);
    //  this.gameStarted = false;
     this.link.clearLink();
     this.link.resetLink();
     this.timeEnemiesAdded = 0;
     this.killCount = 0;
     this.scoreCtx.clearRect(0, 0, 500, 500);
     this.scoreCtx.fillText(`Score: ${this.killCount}`, 10,50);
     this.ctx.clearRect(0, 0, 120, 275);
     this.screenCtx.font = '45px triforce';
     this.screenCtx.fillText("Game Over", 40, 70);
     this.screenCtx.font = '18px triforce';
     setInterval(() => {
       this.reloadDocument();
     }, 2000);
   }

   reloadDocument() {
     this.doc.location.reload();
   }

   handleSwordHit(obj, idx) {
     console.log(`sword pos: ${this.link.sword.pos}`);
     this.enemies = this.enemies.filter((enemy) => enemy !== obj);
     obj.clearEnemy();
     obj.killEnemy();
     this.link.sword.pos = [];
     obj.alive = false;
     this.allObjects.splice(idx, 1);
     this.scoreCtx.clearRect(0, 0, 200, 200);
     this.killCount++;
     this.scoreCtx.fillText(`Score: ${this.killCount}`, 10, 50);
     if (this.allObjects.length <= 2) {
       clearInterval(this.enemyMoveInterval);
       this.removeAllEnemies();
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

    let audioBtn = this.doc.getElementById("audio-btn");
    let audioTag = this.doc.getElementById("player");
    audioTag.volume = 0.5;
    audioBtn.addEventListener('click', this.handleAudioToggle.bind(this), true);
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
          if (obj1 instanceof Sword && obj2 instanceof Enemy) {
            this.handleSwordHit(obj2, j);
          } else if (obj1 instanceof Enemy && obj2 instanceof Sword) {
            this.handleSwordHit(obj1, i);
          }
          else if (obj1 instanceof Link && obj2 instanceof Enemy) {
            this.handleGameOver();
          } else if (obj2 instanceof Enemy && obj1 instanceof Link) {
            this.handleGameOver();
          }
        }
      }
    }
  }
}



module.exports = Game;
