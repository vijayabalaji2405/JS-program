score = 0;
cross = true;
audio = new Audio("gameover.mp3");
document.onkeydown = function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 38) {
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
  if (e.keyCode == 39) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }
  if (e.keyCode == 37) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};

setInterval(() => {
  dino = document.querySelector(".dino");
  obstacle = document.querySelector(".obstacle");
  gameOver = document.querySelector(".gameOver");

  //dino coordinates
  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  //obstacle coordinates
  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );

  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );
  // console.log(dx, dy, ox, oy);

  //offset
  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - Reload to start over";
    obstacle.classList.remove("obstacleAni");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window.getComputedStyle(obstacle, null).getPropertyValue("animation")
      );
      newDr = aniDur - 0.1;
      obstacle.style.animationDuration = newDr + "s";
      console.log(newDr);
    }, 500);
  }
}, 10);
function updateScore(score) {
  scoreCont.innerHTML = "Your Score:" + score;
}
