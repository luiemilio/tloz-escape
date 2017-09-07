const Link = require('./link');

class Game {
  constructor(ctx, linkImg, doc, swordImg) {
    this.ctx = ctx;
    this.link = new Link(linkImg, ctx, doc, swordImg);
  }

 setup() {
   this.link.setup();
 }

}



module.exports = Game;
