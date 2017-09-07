const Link = require('./link');
const Enemy = require('./enemy');

class Game {
  constructor(ctx, doc, oktorokImg) {
    this.ctx = ctx;
    this.doc = doc;
    this.link = new Link(ctx, doc);
    this.oktorok1 = new Enemy(ctx, doc);
    this.oktorok2 = new Enemy(ctx, doc);
  }


 setup() {
   this.link.setup();
   this.oktorok1.setup();
   this.oktorok2.setup();
   this.setupListeners();
 }


 handleKey(event) {
   switch(event.keyCode) {
     case 87:
       this.link.keyUp = this.link.keyUp ? false : true;
       break;
     case 83:
       this.link.keyDown = this.link.keyDown ? false : true;
       break;
     case 65:
       this.link.keyLeft = this.link.keyLeft ? false : true;
       break;
     case 68:
       this.link.keyRight = this.link.keyRight ? false : true;
       break;
     case 38:
       event.preventDefault();
       this.link.keyUpAtk = this.link.keyUpAtk ? false : true;
       break;
     case 40:
       event.preventDefault();
       this.link.keyDownAtk = this.link.keyDownAtk ? false : true;
       break;
     case 37:
       this.link.keyLeftAtk = this.link.keyLeftAtk ? false : true;
       break;
     case 39:
       this.link.keyRightAtk = this.link.keyRightAtk ? false : true;
       break;

     }
   }

   setupListeners() {
     this.doc.addEventListener('keydown', this.handleKey.bind(this), true);
     this.doc.addEventListener('keyup', this.handleKey.bind(this), true);
   }


}



module.exports = Game;
