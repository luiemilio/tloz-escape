const Util = require('./util');

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
