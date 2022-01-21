const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
let canvasWidth = canvas.width;
console.log(canvasWidth);
let canvasHeight = canvas.height;
console.log(canvasHeight);
let x = canvasWidth / 2;
let dx = 2;
let y = canvasHeight / 2;
let dy = 2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = canvasWidth - paddleWidth;
let brickHeight = 20;
let brickWidth = 75;
let brickPadding = 20;
let brickOffsetTop = 10;
let brickOffsetLeft = 10;
let bricks = [];
let numberofRow = 3;
let numberofColumn = 5;
let scoreContainer = document.getElementById("score");

const color = "#33C7FF";

function generateBricks() {
  for (let row = 0; row < numberofRow; row++) {
    bricks[row] = [];
    for (let col = 0; col < numberofColumn; col++) {
      //if status is 1 then brick is alive
      bricks[row][col] = { x: row, y: col, status: 1 };
      console.log(bricks[row][col]);
    }
  }
}
generateBricks();

function collisionDetection() {
  for (let row = 0; row < numberofRow; row++) {
    for (let col = 0; col < numberofColumn; col++) {
      const brick = bricks[row][col];
      if (
        brick.status &&
        x >= brick.x &&
        x <= brick.x + brickWidth &&
        y >= brick.y &&
        y <= brick.y + brickHeight
      ) {
        dy = -dy;
        brick.status = 0;
        updateScore();
      }
    }
  }
}

function drawAllBricks() {
  for (let row = 0; row < numberofRow; row++) {
    for (let col = 0; col < numberofColumn; col++) {
      const brick = bricks[row][col];
      const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
      brick.x = brickX;
      brick.y = brickY;
      if (brick.status) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function checkBoundryCollision() {
  if (x <= ballRadius || x + ballRadius >= canvasWidth) {
    dx = -dx;
  } else if (y <= ballRadius) dy = -dy;
  else if (y >= canvasHeight - paddleHeight) {
    //check ball in the range of paddle or not
    if (x > paddleX && x < paddleX + paddleWidth) {
      //ball should Bounce
      dy = -dy;
    } else handleGameOver();
  }
}

function handleGameOver() {
  clearInterval(interval);
  alert("Game Over Your score is " + getScore());
  window.location.reload();
}

function draw() {
  //beginpath start point of canvas
  ctx.beginPath();
  //clearrect will clear the path
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //arc will create a circle
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //360
  //fillstyle specify colour to fill
  ctx.fillStyle = color;
  //fill will show the color
  ctx.fill();
  //endpoint start point of canvas
  ctx.closePath();

  checkBoundryCollision();
  drawPaddel();
  drawAllBricks();
  collisionDetection();

  x = x + dx;
  y = y + dy;
}
const interval = setInterval(draw, 20);

function drawPaddel() {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

window.onkeydown = (e) => {
  if (e.key == "Left" || e.key == "ArrowLeft") {
    if (paddleX - 10 >= 0) paddleX = paddleX - 10;
  } else if (e.key == "Right" || e.key == "ArrowRight") {
    if (paddleX + 10 + paddleWidth <= canvasWidth) paddleX = paddleX + 10;
  }
};

function getScore() {
  let score = 0;
  for (let row = 0; row < numberofRow; row++) {
    for (let col = 0; col < numberofColumn; col++) {
      const brick = bricks[row][col];
      if (brick.status === 0) score++;
    }
  }
  return score;
}
function updateScore() {
  scoreContainer.textContent = `score : ${getScore()}`;
}
