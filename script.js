const bird = document.getElementById("bird");
const pipesContainer = document.getElementById("pipesContainer");
const scoreDisplay = document.getElementById("score");
let pipeInterval = 2000;
let pipeSpeed = 2;


let gravity = 0.5;
let velocity = 0;
let jumpPower = -8;
let birdTop = 200;
let score = 0;
let gameOver = false;


document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameOver) {
    velocity = jumpPower;
  } else if (e.code === "Enter" && gameOver) {
    location.reload(); // restart game
  }
});

function createPipe() {
  if (gameOver) return;

  const pipeGap = 150;
  const pipeWidth = 60;
  const maxPipeTop = 350;
  const pipeTopHeight = Math.floor(Math.random() * maxPipeTop);

  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");

  pipeTop.classList.add("pipe");
  pipeBottom.classList.add("pipe");

  pipeTop.style.height = pipeTopHeight + "px";
  pipeTop.style.top = "0px";
  pipeTop.style.left = "400px";

  pipeBottom.style.height = (600 - pipeTopHeight - pipeGap) + "px";
  pipeBottom.style.bottom = "0px";
  pipeBottom.style.left = "400px";

  pipesContainer.appendChild(pipeTop);
  pipesContainer.appendChild(pipeBottom);

  let pipeLeft = 400;
  const movePipe = setInterval(() => {
    if (gameOver) {
      clearInterval(movePipe);
      
      return;
    }

    pipeLeft -= 2;
    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";

    // Cek tabrakan
    if (pipeLeft < 80 && pipeLeft > 20) {
      const birdBox = bird.getBoundingClientRect();
      const topBox = pipeTop.getBoundingClientRect();
      const bottomBox = pipeBottom.getBoundingClientRect();

      if (
        birdBox.top < topBox.bottom ||
        birdBox.bottom > bottomBox.top
      ) {
        triggerGameOver();
      }
    }

    // Skor
    if (pipeLeft === 20) {
      score++;
      scoreDisplay.innerText = score;
    }

    if (pipeLeft < -pipeWidth) {
      pipesContainer.removeChild(pipeTop);
      pipesContainer.removeChild(pipeBottom);
      clearInterval(movePipe);
    }
  }, 16);
}

setInterval(createPipe, pipeInterval);
let pipeSpawner = setInterval(() => {
   createPipe();
 
   if (pipeInterval > 800) {
     pipeInterval -= 100;
     pipeSpeed += 0.5;
 
     clearInterval(pipeSpawner);
     pipeSpawner = setInterval(arguments.callee, pipeInterval);
   }
 }, pipeInterval); 

function update() {
  if (gameOver) return;

  velocity += gravity;
  birdTop += velocity;

  if (birdTop < 0) {
    birdTop = 0;
    velocity = 0;
  }

  if (birdTop > 570) {
    birdTop = 570;
    triggerGameOver();
  }

  bird.style.top = birdTop + "px";

  requestAnimationFrame(update);
}

function triggerGameOver() {
  gameOver = true;
  alert("Game Over! Tekan Enter untuk restart.");
}

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
  location.reload();
});

update();
