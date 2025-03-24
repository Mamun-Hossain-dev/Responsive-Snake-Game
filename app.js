// Variables
const snakeBoard = document.getElementById("snake-board");
const scoreBox = document.getElementById("score");
const pointsBox = document.getElementById("points");
const highScoreBox = document.getElementById("high-score");

// Assets Variables
const foodSound = new Audio("./assets/food.mp3");
const moveSound = new Audio("./assets/move.mp3");
const gameOverSound = new Audio("./assets/over.wav");

// Game Variables
let speed = 6;
let score = 0;
let points = 0;
let highScoreVal = 0;

// Snake Variables
const food = { x: 12, y: 15 };
const snakeArr = [{ x: 5, y: 9 }];
let inputDir = { x: 0, y: 0 };
