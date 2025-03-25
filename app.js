// Variables
const snakeBoard = document.getElementById("snake-board");
const scoreBox = document.getElementById("score");
const pointsBox = document.getElementById("points");
const highScoreBox = document.getElementById("high-score");
const controlBtns = document.querySelectorAll(".controls-btn button");

// Assets Variables
const foodSound = new Audio("./assets/food.mp3");
const moveSound = new Audio("./assets/move.mp3");
const gameOverSound = new Audio("./assets/over.wav");

// Game Variables
let speed = 10;
let score = 0;
let points = 0;
let highScoreVal = 0;
let isGameOver = false;
let lastPaintTime = 0;

// Snake Variables
let food = { x: 12, y: 15 };
let snakeArr = [{ x: 5, y: 9 }];
let inputDir = { x: 0, y: 0 };

// Main Function for Animation
function main(ctime) {
  if (isGameOver) return;
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  // console.log(ctime);
  lastPaintTime = ctime;

  gameEngine();
}

// Initialize animation
window.requestAnimationFrame(main);

// Reset Game
const resetGame = () => {
  // Reset game variables
  score = 0;
  points = 0;
  inputDir = { x: 0, y: 0 };
  isGameOver = false;

  // Reset Snake to initialize position
  snakeArr = [{ x: 5, y: 9 }];
  food = { x: 12, y: 15 };

  // Update UI
  scoreBox.innerHTML = "00";
  pointsBox.innerHTML = "0000";

  // Restart game loop
  window.requestAnimationFrame(main);
};

// Display Snake
const displaySnake = () => {
  snakeArr.forEach((segment, idx) => {
    let div = document.createElement("div");
    div.classList.add(idx === 0 ? "snake-head" : "snake-body");
    div.style.gridColumnStart = segment.x;
    div.style.gridRowStart = segment.y;
    snakeBoard.append(div);
  });
};

// Display Food
const displayFood = () => {
  let foodDiv = document.createElement("div");
  foodDiv.style.gridRowStart = food.y;
  foodDiv.style.gridColumnStart = food.x;
  foodDiv.classList.add("food");
  snakeBoard.append(foodDiv);
};

// Generate Random Food After Eating
const generateRandomFood = () => {
  food = {
    x: Math.floor(Math.random() * 22) + 2,
    y: Math.floor(Math.random() * 22) + 2,
  };
};

// Check For Collisions
const isCollide = (arr) => {
  return arr
    .slice(1)
    .some((segment) => segment.x === arr[0].x && segment.y === arr[0].y);
};

// Game Engine Function
const gameEngine = () => {
  snakeBoard.innerHTML = "";

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    isGameOver = true;
    setTimeout(() => {
      alert("Game Over! Press any key to Restart!!!");
      resetGame();
    }, 100);
    return;
  }

  // Food Consumption
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    points += 10;
    scoreBox.innerHTML = score.toString().padStart(2, "0");
    pointsBox.innerHTML = points.toString().padStart(4, "0");

    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    generateRandomFood();
  }

  // Move Snake
  for (let i = snakeArr.length - 1; i > 0; i--) {
    snakeArr[i] = { ...snakeArr[i - 1] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Screen Wrap Logic
  if (snakeArr[0].x > 25) snakeArr[0].x = 1;
  else if (snakeArr[0].x < 1) snakeArr[0].x = 25;
  else if (snakeArr[0].y > 25) snakeArr[0].y = 1;
  else if (snakeArr[0].y < 1) snakeArr[0].y = 25;

  // Render Elements
  displaySnake();
  displayFood();
};

// Keyboard Controls
window.addEventListener("keydown", (e) => {
  moveSound.play();
  inputDir = { x: 0, y: 1 };
  const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowRight: { x: 1, y: 0 },
    ArrowLeft: { x: -1, y: 0 },
  };

  if (directions[e.key]) {
    inputDir = directions[e.key];
  }
});

// Button Controls
controlBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    moveSound.play();
    const btnDirections = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      right: { x: 1, y: 0 },
      left: { x: -1, y: 0 },
    };

    Object.keys(btnDirections).forEach((dir) => {
      if (btn.classList.contains(dir)) inputDir = btnDirections[dir];
    });
  });
});
