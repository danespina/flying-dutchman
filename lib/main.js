document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("theSea");
  const ctx = canvas.getContext("2d");
  const background = new Image();
  const dutchman = new Image();
  const ghost = new Image();
  const water = new Image();
  background.onload = () => {};
  dutchman.onload = () => {};
  ghost.onload = () => {};
  water.onload = () => {};
  background.src = "../assets/spooky_background.png";
  dutchman.src = "../assets/flying_dutchman.png";
  ghost.src = "../assets/ghost.png";
  water.src = "../assets/cropped_water.png";

  const radius = 50;
  let x = canvas.width - radius;
  let y = canvas.height / 2;
  let dx = -8;
  let boatY = 3 * radius;
  let boatX = canvas.width / 10;
  let dBoatY = 0;
  let dBoatX = 0;
  let spacePressed = false;
  let aPressed = false;
  let dPressed = false;
  let boatsJumped = 0;
  let t = 0;
  let seaLevel = [];
  for (var i = 0; i < 900; i++) {
    seaLevel[i] = radius / 2 * Math.sin((Math.PI  / 90)* i) + canvas.height * 0.75;
  }
  const gravity = radius / 10;
  let gravitySpeed = 0;
  let jumpSize = 1;
  const jumpAccel = 1 * radius;
  let jumping = false;
  let gameOver = true;

  const jump = () => {
    jumping = true;
    if ((boatY - (canvas.height - seaLevel[boatX] + radius)) < 1) {
      dBoatY -= jumpAccel;
    }
  }

  const restart = () => {
    document.location.reload();
    dx = -8;
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (x + dx + radius < 0) {
      x = canvas.width;
    }
    if (((x > boatX && x < (boatX + radius)) || (x + radius > boatX && x + radius < boatX + radius)) &&
    ((y < (canvas.height - boatY + radius) && y > (canvas.height - boatY)) ||
  (y + radius < canvas.height - boatY + radius) && (y + radius > (canvas.height - boatY)))) {
      gameOver = true;
      dx = 0;
      dBoatX = 0;
      x = canvas.width;
      BoatX = 0;
      // document.location.reload();
      ctx.beginPath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(`You saved ${boatsJumped} souls`, 300, 150);
      ctx.closePath();
      setTimeout(restart, 2000);
      // clearInterval(gameLoop);
    }
    if (Math.abs(x - boatX) < radius / 2) {
      boatsJumped++;
    }
    if (spacePressed && !jumping) {
      jump();
    } else {
      dBoatY += gravity;
      boatY -= dBoatY;
      boatY = Math.max(canvas.height - seaLevel[boatX] + radius, boatY);

      if ((boatY - (canvas.height - seaLevel[boatX] + radius)) < radius / 2 ) {
        dBoatY = 0;
        jumping = false;
      }

      if (aPressed && boatX > 10) {
        dBoatX = -10;
        boatX += dBoatX;
      } else if (dPressed && boatX + radius < 890) {
        dBoatX = 10;
        boatX += dBoatX;
      }
    }
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`${boatsJumped}`, 100, 100);
    ctx.closePath();


    drawWater();
    drawWave();
    drawBoat();

    t++;
    x += dx;
    y = seaLevel[x] - radius;
  }

  const drawWater = () => {
    for (var i = 0; i < 900; i++) {
      seaLevel[i] = radius / 2 * Math.sin((Math.PI / 90)* (i + t)) + canvas.height * 0.75;
    }
    ctx.drawImage(water, -(t % 900), 215);
    ctx.drawImage(water, 899 - (t % 900), 215)

  }

  const drawWave = () => {
    ctx.drawImage(ghost, x, y, radius, radius);
  }

  const drawBoat = () => {
    ctx.drawImage(dutchman, boatX - (radius * 0.1), canvas.height - (boatY + 0.5 * radius), radius * 1.5, radius * 1.5);
  }


  const keyDownHandler = (e) => {
    if (e.keyCode === 32) {
      spacePressed = true;
    } else if (e.keyCode === 65) {
      aPressed = true;
    } else if (e.keyCode === 68) {
      dPressed = true;
    } else if (e.keyCode === 78) {
      gameOver = false;
      // startGame();
    }
  }

  const keyUpHandler = (e) => {
    if (e.keyCode === 32) {
      spacePressed = false;
    } else if (e.keyCode === 65) {
      aPressed = false;
    } else if (e.keyCode === 68) {
      dPressed = false;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  const startGame = () => {
    console.log('starting game!')
    // while (!gameOver) {
    // }
  }
  const gameLoop = setInterval(draw, 50);
})
