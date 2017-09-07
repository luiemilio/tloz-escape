class Sword {
  constructor(img, ctx, link, doc) {
    this.height = 23;
    this.width = 23;
    this.ctx = ctx;
    this.link = link;
    this.doc = doc;
    this.img = img;
  }

  attack() {
    const drawSword = () => {
      this.ctx.drawImage(this.img, (this.link.xCoord + 2), (this.link.yCoord + 25), this.height, this.width);
    };
    const clearSword = () => {
      this.ctx.clearRect((this.link.xCoord + 2), (this.link.yCoord + 25), this.height, this.width);
    };

    drawSword();
    setTimeout(clearSword, 150);

  }
}

 module.exports = Sword;
