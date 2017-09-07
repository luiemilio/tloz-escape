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