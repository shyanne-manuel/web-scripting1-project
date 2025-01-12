//Web Scripting 1 Final Project
//JAvascript Game - Classic Snakes
//By Shyanne Manuel
//Reference: used freecodecamp tutorial as a reference and learn the codes new to me
// https://www.youtube.com/watch?v=uyhzCBEGaBY



const titlePage = document.getElementById('title-page');
const startBtn = document.getElementById('start-btn');
const levelPage = document.getElementById('level-page');
const levelBtn = document.querySelectorAll('.level-btn');
const gamePage = document.getElementById('game-page');
const spaceBar = document.getElementById('space-bar');
const gameBoard = document.getElementById('gameboard');
const score = document.getElementById('score');
const highScore = document.getElementById('high-score');
const gameOver = document.getElementById('game-over');
const goScore = document.getElementById('game-over-score');
const goHighScore = document.getElementById('game-over-high-score');
const restartBtn = document.getElementById('restart');
const goRestart = document.getElementById('game-over-restart');
const pauseBtn = document.getElementById('pause');
const pausePage = document.getElementById('pause-page');
const resumeBtn = document.getElementById('resume-button');
const quitBtn = document.getElementById('quit-button');
const backMenuBtn = document.getElementById('main-menu');

// creating the elements
let gridSize = 25;
let snake = [{ x: 10, y: 10 }];
let food = generateFoodElement();
let direction = 'right';
let gameInterval;
let gameStart = false;
let gameSpeedDelay = 200;
let currentHighScore = 0;
let gameLevel = 'medium';



startBtn.addEventListener('click', start);

function start() {
    titlePage.style.display = 'none';
    levelPage.style.display = 'flex';
};

levelBtn.forEach(singleLevelButton => singleLevelButton.addEventListener('click', gameReveal));

function gameReveal(e) {
    if (e.target.innerText === 'EASY') {
        gameSpeedDelay = 300;
        gameLevel = 'easy'
    } else if (e.target.innerText === 'MEDIUM') {
        gameSpeedDelay = 200;
        gameLevel = 'medium';
    } else if (e.target.innerText === 'HARD') {
        gameSpeedDelay = 100;
        gameLevel = 'hard';
    }

    levelPage.style.display = 'none';
    gamePage.style.display = 'flex';
    spaceBar.style.display = 'block';
    // restartBtn.disabled = 'true';
    // pauseBtn.disabled = 'true';
};

// draws gameboard map, snake and food
function draw() {
    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
    checkCollision();

};


// draws the snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        gameBoard.appendChild(snakeElement);
    });
};


// creates snake and food element
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//set position of the snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
};


// draws the food
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    gameBoard.appendChild(foodElement);
};


// generates random position for food
function generateFoodElement() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
};

// draw ();


function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;

        case 'left':
            head.x--;
            break;

        case 'up':
            head.y--;
            break;

        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);
    // snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFoodElement();
        clearInterval(gameInterval);
        increaseSpeed();
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay)
    } else {
        snake.pop();
    }
};


//testing move function
// setInterval (() => {
//     move ();
//     draw ();
// }, 200);


//start game function
function startGame() {
    gameStart = true;
    spaceBar.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        draw();
        checkCollision();
    }, gameSpeedDelay)
    // restartBtn.disabled = 'false';
    // pauseBtn.disabled = 'false';
};


//key press listener event

function handleKeyPress(event) {
    if (!gameStart && (event.code === 'Spacebar' || event.key === ' ')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;

            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;

            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;

            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
        }
    };
};

document.addEventListener('keydown', handleKeyPress);


// increases the speed of the snake as it eats food
function increaseSpeed() {

    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
};


function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        stopGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            stopGame();
        }
    }
};

function updateScore() {
    const currentScore = (snake.length - 1) * 2;
    score.innerText = currentScore.toString().padStart(3, '0');
    goScore.innerText = currentScore.toString().padStart(3, '0');
}

function updateHighScore() {
    const currentScore = (snake.length - 1) * 2;
    if (currentHighScore < currentScore) {
        currentHighScore = currentScore;
        highScore.innerText = currentHighScore.toString().padStart(3, '0');
        goHighScore.innerText = currentHighScore.toString().padStart(3, '0');
    }
}

function stopGame() {
    gameStart = false;
    clearInterval(gameInterval);
    console.log(gameSpeedDelay);
    updateHighScore();
    gameOver.style.display = 'flex';
};

function paused() {
    if (gameStart === true) {

        gameStart = false;
        clearInterval(gameInterval);
        pausePage.style.display = 'flex';
    }
};

function resumeGame() {
    pausePage.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        draw();
        checkCollision();
    }, gameSpeedDelay);

};

function quitGame() {
    reset();
    gamePage.style.display = 'none';
    pausePage.style.display = 'none';
    gameOver.style.display = 'none';
    titlePage.style.display = 'flex';
};

backMenuBtn.addEventListener('click', quitGame);
quitBtn.addEventListener('click', quitGame);
resumeBtn.addEventListener('click', resumeGame);
pauseBtn.addEventListener('click', paused);
restartBtn.addEventListener('click', restartGame);
goRestart.addEventListener('click', restartGame);

function restartGame() {
    reset();
    startGame();

};

function reset() {
    gameStart = false;
    clearInterval(gameInterval);
    gameBoard.innerHTML = '';
    snake = [{ x: 10, y: 10 }];
    food = generateFoodElement();
    gameOver.style.display = 'none';
    direction = 'right';
    score.innerText = '000';
    if (gameLevel === 'easy') {
        gameSpeedDelay = 300;
    } else if (gameLevel === 'medium') {
        gameSpeedDelay = 200;
    } else if (gameLevel === 'hard') {
        gameSpeedDelay = 100;
    }
};