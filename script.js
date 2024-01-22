const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let isGameOver = false;


const speed = 120;
let lastMoveTime = 0;

function draw() {
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4CAF50";
  snake.forEach(segment => ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize));

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function generateFood() {
  const x = Math.floor(Math.random() * (canvas.width / boxSize));
  const y = Math.floor(Math.random() * (canvas.height / boxSize));
  return { x, y };
}

function moveSnake() {
  const currentTime = Date.now();

  if (currentTime - lastMoveTime < speed) {
    return;
  }

  lastMoveTime = currentTime;

  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  isGameOver = true;
  setTimeout(() => {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    isGameOver = false;
  }, 1000);
}

function gameLoop() {
  if (!isGameOver) {
    draw();
    moveSnake();
    checkCollision();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
  if (!isGameOver) {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
});

gameLoop();
