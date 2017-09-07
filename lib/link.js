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
  }

  setup() {
    this.initialDraw();
    this.bindMoves();
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

  bindMoves() {
    this.doc.addEventListener('keydown', (event) => {
        switch(event.keyCode) {
          case 87:  // w (up)
          if (this.yCoord - 5 > 0) {
            this.clearLink();
            this.yCoord -= 5;
            this.drawLink();
          }
          break;
          case 83: // s (down)
          if (this.yCoord + 5 < 120) {
            this.clearLink();
            this.yCoord += 5;
            this.drawLink();
          }
          break;
          case 65: // a (left)
          if (this.xCoord - 5 > 0) {
            this.clearLink();
            this.xCoord -= 5;
            this.drawLink();
          }
          break;
          case 68: // d (right)
          if (this.xCoord + 5 < 275) {
            this.clearLink();
            this.xCoord += 5;
            this.drawLink();
          }
          break;
          case 38: //upArrow
            this.sword.attack('up');
            event.preventDefault();
          break;
          case 40: //downArrow
            this.sword.attack('down');
            event.preventDefault();
          break;
          case 37: //downArrow (attack)
            this.sword.attack('left');
          break;
          case 39: //downArrow (attack)
            this.sword.attack('right');
          break;
       }
    });
  }


}
module.exports = Link;
