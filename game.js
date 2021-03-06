import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import { buildGraph } from './graph.js';
import {
  draw as drawRoboSnake,
  update as updateRoboSnake,
} from './robo-snake.js';
import { currentScore } from './score.js';

buildGraph();

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

alert(
  "Use arrow keys to control Snake.  You get a point for each piece of food you eat.  You lose a point if you're beaten to the food."
);

function main(currentTime) {
  if (gameOver) {
    if (
      confirm('You scored ' + currentScore + ' points. Press ok to try again.')
    ) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateRoboSnake();
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawRoboSnake(gameBoard);
  drawFood(gameBoard);
  drawSnake(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
