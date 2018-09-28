document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("theSea");
  const ctx = canvas.getContext("2d");
  const background = new Image();
  const dutchman = new Image();
  const ghost = new Image();
  background.onload = () => {};
  dutchman.onload = () => {};
  ghost.onload = () => {};
  background.src = "../assets/spooky_background.png";
  dutchman.src = "../assets/flying_dutchman.png";
  ghost.src = "../assets/ghost.png";

  const radius = 50;
  let x = canvas.width - radius;
  let y = canvas.height / 2;
  let dx = 2;
  let boatY = 3 * radius;
  let dBoatY = 0;
  let spacePressed = false;
  let boatsJumped = -1;
  let t = 0;
  let seaLevel = [];
  for (var i = 0; i < 900; i++) {
    seaLevel[i] = 20*Math.sin((1 / 30)* i) + canvas.height * 0.75;
  }
  const gravity = 0.03;
  let gravitySpeed = 0;
  let jump = radius;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    if ((x + dx) > (canvas.width - radius) || x + dx < 0) {
      dx = -dx;
      boatsJumped++;
    }
    if ((x > canvas.width / 10 && x < (canvas.width / 10 + radius)) &&
    ((y < (canvas.height - boatY + radius) && y > (canvas.height - boatY)) ||
  (y + radius < canvas.height - boatY + radius) && (y + radius > (canvas.height - boatY)))) {
      alert(`you jumped ${Math.ceil(boatsJumped / 2)} boats!`);
      document.location.reload();
    }
    if (spacePressed) {
      dBoatY = jump;
      boatY += dBoatY;
    } else {
      dBoatY += gravity;
      boatY -= dBoatY;
      boatY = Math.max(canvas.height - seaLevel[canvas.width / 10] + radius, boatY);
    }
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`${Math.ceil(boatsJumped / 2)}`, 100, 100);
    ctx.closePath();


    drawWater();
    drawWave();
    drawBoat();

    x += dx;
    y = seaLevel[x] - radius;
  }

  const drawWater = () => {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.75);
    for (var i = 0; i < 900; i++) {
      seaLevel[i] = 20*Math.sin((1 / 30)* (i + t)) + canvas.height * 0.75;
      ctx.lineTo(i, seaLevel[i]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height * 0.75);
    t++;
    ctx.fillStyle = "#0000FF";
    ctx.fill();
    ctx.closePath();
  }

  const drawWave = () => {
    ctx.beginPath();
    ctx.rect(x, y, radius, radius);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(ghost, x, y, radius, radius);
  }

  const drawBoat = () => {
    ctx.beginPath();
    ctx.rect(canvas.width / 10, canvas.height - (boatY), radius, radius);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(dutchman, canvas.width / 10, canvas.height - (boatY), radius, radius);
  }


  const keyDownHandler = (e) => {
    if (e.keyCode === 32) {
      spacePressed = true;
    }
  }

  const keyUpHandler = (e) => {
    if (e.keyCode === 32) {
      spacePressed = false;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  setInterval(draw, 50);
})
