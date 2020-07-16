const canv = document.getElementById("canvas"); // canvas
const ctx = canv.getContext("2d"); // 2d context

const appleImg = new Image(32, 32);
appleImg.src = "img/apple.png";

let boxSize = 32;
let dir = "";
let score = 0;

let apple = {
	x: Math.floor(Math.random() * 19 + 1) * boxSize,
	y: Math.floor(Math.random() * 19 + 1) * boxSize,
};

let snake = [];
snake[0] = {
	x: Math.floor(canv.clientWidth / 2),
	y: Math.floor(canv.clientHeight / 2),
};

document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("keydown", changeDirection);
	setInterval(drawGame, 100); // 30 fps
});

function drawGame() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canv.clientWidth, canv.clientHeight);

	ctx.fillStyle = "black";
	ctx.drawImage(appleImg, apple.x, apple.y);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = "grey";
		ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
	}
	updateSnakeCoords();
}

function updateAppleCoords() {
	apple.x = Math.floor(Math.random() * 19 + 1) * boxSize;
	apple.y = Math.floor(Math.random() * 19 + 1) * boxSize;
}

function updateSnakeCoords() {
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX > canv.clientWidth) snakeX = 0;
	if (snakeY > canv.clientHeight) snakeY = 0;
	if (snakeX < 0) snakeX = canv.clientWidth;
	if (snakeY < 0) snakeY = canv.clientHeight;

	if (snakeX == apple.x && snakeY == apple.y) {
		score++;
		updateAppleCoords();
	} else {
		snake.pop();
	}

	if (dir === "left") snakeX -= boxSize;
	if (dir === "right") snakeX += boxSize;
	if (dir === "up") snakeY -= boxSize;
	if (dir === "down") snakeY += boxSize;

	let newSnakeHead = {
		x: snakeX,
		y: snakeY,
	};

	snake.unshift(newSnakeHead);
}

function changeDirection(e) {
	if (e.keyCode == 37 && dir != "right") {
		dir = "left";
	} else if (e.keyCode == 38 && dir != "down") {
		dir = "up";
	} else if (e.keyCode == 39 && dir != "left") {
		dir = "right";
	} else if (e.keyCode == 40 && dir != "up") {
		dir = "down";
	}
}
