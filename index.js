const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart{
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = tileCount / 2;
let headY = tileCount / 2;
const snakeParts = [];
let tailLength = 2;


let foodX = 5;
let foodY = 5;

let xSpeed = 0;
let ySpeed = 0;

let score = 0;

// const gulpSound = new Audio("gulp.mp3")

// Game loop
function drawGame() {
   changeSnakePosition();
   let result = isGameOver();
   if(result) {
      return;
   }
   clearScreen();
   checkFoodCollision();
   drawFood();
   drawSnake();
   drawScore();
   if(score > 2) {
      speed = 11;
   }
   if(score > 5) {
      speed = 15;
   }
   setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
   let gameOver = false;
   // Self
   if(ySpeed === 0 && xSpeed === 0) {
      return false;
   }
   // Walls
   if(headX < 0) {
      gameOver = true;
   }
   else if(headX === tileCount) {
      gameOver = true;
   }
   else if(headY < 0) {
      gameOver = true;
   }
   else if (headY === tileCount){
      gameOver = true;
   }

   for(let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if(part.x === headX && part.y === headY) {
         gameOver = true;
         break;
      }
   }

   if (gameOver) {
      ctx.font ="50px Verdana";
      // Color
      let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0","red");
      gradient.addColorStop("0.5","orange");
      gradient.addColorStop("1.0","red");
      ctx.fillStyle = gradient;

      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
   }

   return gameOver;
}

function drawScore() {
   ctx.fillStyle = "white";
   ctx.font = "10px Verdana";
   ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

// Clear screen
function clearScreen() {
   ctx.fillStyle = "black";
   ctx.fillRect(0,0,canvas.width,canvas.height);
};

// Draw snake
function drawSnake() {
   // Tail of the snake
   ctx.fillStyle ="orange";
   for(let i = 0; i < snakeParts.length; i++){
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
   }
   // Put item at the end of the list next to the head
   snakeParts.push(new SnakePart(headX, headY));

   while(snakeParts.length > tailLength) {
      // Remove the furthest item from the snake parts if we have more than our tail size
      snakeParts.shift();
      // Head of the snake
      ctx.fillStyle = "green";
      ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
   }
}

// Movement of the snake
function changeSnakePosition() {
   console.log(ySpeed);
   headX = headX + xSpeed;
   headY = headY + ySpeed;
}

// Draw food
function drawFood() {
   ctx.fillStyle = "red";
   ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

// Eating food
function checkFoodCollision() {
   if(foodX === headX && foodY === headY) {
      foodX = Math.floor(Math.random() * tileCount);
      foodY = Math.floor(Math.random() * tileCount);
      tailLength++;
      score++;
      // gulpSound.play();
   }
}

// Keybuttons
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
   // Up
   if(event.keyCode == 38){
   // Prevent crash to body
      if(ySpeed == 1) {
      return;
      }

   ySpeed = -1;
   xSpeed = 0;
   }
   // Down
   else if(event.keyCode == 40) {
      if(ySpeed == -1) {
      return;
      }

   ySpeed = 1;
   xSpeed = 0;
   }
   // Left
   else if(event.keyCode == 37) {
      if(xSpeed == 1) {
      return;
      }

   ySpeed = 0;
   xSpeed = -1;
   }
   // Right
   else if(event.keyCode == 39) {
      if(xSpeed == -1) {
      return;
      }
   ySpeed = 0;
   xSpeed = 1;
   }
}

drawGame();