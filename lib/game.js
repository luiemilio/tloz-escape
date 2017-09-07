const Link = require('./link');

class Game {
  constructor(ctx, linkImg, doc) {
    this.ctx = ctx;
    this.link = new Link(linkImg, ctx, doc);
  }

 setup() {
   this.link.setup();
 }

}



module.exports = Game;
