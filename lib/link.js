const Sword = require('./sword');

class Link {
  constructor(linkImg, ctx, doc, swordImg) {
    this.xCoord = 10;
    this.yCoord = 10;
    this.height = 30;
    this.width = 30;
    this.ctx = ctx;
    this.doc = doc;
    this.linkImg = linkImg;
    this.sword = new Sword(swordImg, ctx, this, doc);
  }

  setup() {
    this.initialDraw();
    this.bindMoves();
  }

  initialDraw(){
    this.ctx.drawImage(this.linkImg, this.xCoord, this.yCoord, this.height, this.width);
  }

  bindMoves() {
    this.doc.addEventListener('keydown', (event) => {
        switch(event.keyCode) {
          case 87:  // w (up)
          if (this.yCoord - 1 > 0) {
            this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
            this.yCoord -= 5;
            this.ctx.drawImage(this.linkImg, this.xCoord, this.yCoord, this.height, this.width);
          }
          break;
          case 83: // s (down)
          if (this.yCoord + 1 < 120) {
            this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
            this.yCoord += 5;
            this.ctx.drawImage(this.linkImg, this.xCoord, this.yCoord, this.height, this.width);
          }
          break;
          case 65: // a (left)
          if (this.xCoord - 1 > 0) {
            this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
            this.xCoord -= 5;
            this.ctx.drawImage(this.linkImg, this.xCoord, this.yCoord, this.height, this.width);
          }
          break;
          case 68: // d (right)
          if (this.xCoord + 1 < 275) {
            this.ctx.clearRect(this.xCoord, this.yCoord, this.height, this.width);
            this.xCoord += 5;
            this.ctx.drawImage(this.linkImg, this.xCoord, this.yCoord, this.height, this.width);
          }
          break;
          case 191: //downArrow (attack)
          this.sword.attack();
       }
    });
  }


}
module.exports = Link;
