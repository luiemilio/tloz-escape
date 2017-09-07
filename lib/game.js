const Link = require('./link');
const Enemy = require('./enemy');

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
