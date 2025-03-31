const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{x: 200, y: 200}];
let direction = "RIGHT";
let food = {x: Math.floor(Math.random() * 20) * boxSize, y: Math.floor(Math.random() * 20) * boxSize};
let score = 0;

// Dibuja la serpiente
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "lime";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Dibuja la comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Mueve la serpiente
function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;

    snake.unshift(head);

    // Verifica si la serpiente come la comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {x: Math.floor(Math.random() * 20) * boxSize, y: Math.floor(Math.random() * 20) * boxSize};
    } else {
        snake.pop();
    }
}

// Maneja colisiones
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        clearInterval(gameInterval);
        alert("¡Game Over! Tu puntuación: " + score);
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            clearInterval(gameInterval);
            alert("¡Game Over! Tu puntuación: " + score);
        }
    }
}

// Cambia la dirección
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Actualiza el juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
}

// Inicia el juego
let gameInterval = setInterval(updateGame, 100);