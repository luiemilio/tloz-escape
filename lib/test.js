// keycodes
// w => 87 s => 83 a => 65 d => 68
// up => 38 down => 40 left => 37 right => 39

document.addEventListener('DOMContentLoaded', () => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    const link = document.getElementById("link-img");
    let xCoord = 10;
    let yCoord = 10;
    ctx.drawImage(link, xCoord, yCoord, 30, 30);
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 87:
          // w (up)
          if (yCoord - 1 > 0) {
            ctx.clearRect(xCoord, yCoord, 30, 30);
            yCoord -= 5;
            ctx.drawImage(link, xCoord, yCoord, 30, 30);
          }
          break;
        case 83:
          // s (down)
          if (yCoord + 1 < 120) {
            yCoord += 5;
            ctx.clearRect(xCoord, yCoord, 30, 30);
            ctx.drawImage(link, xCoord, yCoord, 30, 30);
          }
          break;
        case 65:
          // a (left)
          xCoord -= 5;
          ctx.clearRect(xCoord, yCoord, 30, 30);
          ctx.drawImage(link, xCoord, yCoord, 30, 30);
          break;
        case 68:
          // d (right)
          xCoord += 5;
          ctx.clearRect(xCoord, yCoord, 30, 30);
          ctx.drawImage(link, xCoord, yCoord, 30, 30);
          break;
      }
    });
});
