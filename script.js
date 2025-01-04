
const titlePage = document.getElementById ('title-page');
const startBtn = document.getElementById ('start-btn');
const levelPage = document.getElementById ('level-page');
const levelBtn = document.querySelectorAll ('.level-btn');
const gamePage = document.getElementById ('game-page');
const spaceBar = document.getElementById ('space-bar');
const gameBoard = document.getElementById ('gameboard');
const score = document.getElementById ('score');
const highScore = document.getElementById ('high-score');

// creating the elements
let gridSize = 25 ;
let snake = [{x:10 , y:10}];
let food = generateFoodElement();
let direction = 'up';
let gameInterval;
let gameStart = false;
let gameSpeedDelay = 200;
let currentHighScore = 0;



startBtn.addEventListener ('click', start);

function start (){
    titlePage.style.display = 'none';
    levelPage.style.display = 'flex';
};

levelBtn.forEach(singleLevelButton =>singleLevelButton.addEventListener ('click' , gameReveal));

function gameReveal (){
    levelPage.style.display = 'none';
    gamePage.style.display = 'flex';
    spaceBar.style.display = 'block';
};

// draws gameboard map, snake and food
function draw (){
    gameBoard.innerHTML = '';
    drawSnake ();
    drawFood ();
    updateScore ();
    checkCollision ();

};


// draws the snake
function drawSnake (){
    snake.forEach((segment) => {
        const snakeElement = createGameElement ('div', 'snake');
        setPosition (snakeElement, segment);
        gameBoard.appendChild(snakeElement);
    });
};


// creates snake and food element
function createGameElement (tag, className) {
    const element = document.createElement (tag);
    element.className = className;
    return element;
}

//set position of the snake or food
function setPosition (element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
};


// draws the food
function drawFood (){
    const foodElement = createGameElement ('div', 'food');
    setPosition (foodElement, food);
    gameBoard.appendChild(foodElement);
};


// generates random position for food
function generateFoodElement (){
    const x = Math.floor(Math.random() * gridSize) + 1;  
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y};
};

// draw ();


function move (){
    const head = {...snake[0]};
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

    if (head.x === food.x && head.y === food.y){
        food = generateFoodElement();
        clearInterval(gameInterval);
        increaseSpeed ();
        gameInterval = setInterval(()=> {
            move ();
            draw ();
        }, gameSpeedDelay)
    } else{
        snake.pop();
    }
};


//testing move function
// setInterval (() => {
//     move ();
//     draw ();
// }, 200);


//start game function
function startGame (){
    gameStart = true;
    spaceBar.style.display = 'none';
    gameInterval = setInterval(() => {
        move ();
        draw ();
        checkCollision ();
    }, gameSpeedDelay)
};


//key press listener event

function handleKeyPress (event){
    if ( !gameStart && event.code ==='Spacebar' ||
         !gameStart && event.key ===' '
        ){
            startGame ();
    } else {
    switch (event.key){
        case 'ArrowUp':
            direction = 'up';
            break;

        case 'ArrowDown':
            direction = 'down';
            break;

        case 'ArrowRight':
            direction = 'right';
            break;

        case 'ArrowLeft':
            direction = 'left';
            break;
        }
    };
};

document.addEventListener('keydown', handleKeyPress);


// increases the speed of the snake as it eats food
function increaseSpeed (){

    console.log (gameSpeedDelay);
    if ( gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if ( gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if ( gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
};


function checkCollision (){
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize)  {
        gameStart = false;
        clearInterval(gameInterval);
        console.log(gameSpeedDelay);
        updateHighScore ();
    }

    for( let i = 1; i < snake.length ; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y){
            gameStart = false;
            clearInterval(gameInterval);
            console.log(gameSpeedDelay);
            updateHighScore ();
        }
    }
};

function updateScore (){
    const currentScore = (snake.length - 1) * 2;
    score.innerText = currentScore.toString().padStart(3,'0');
}

function updateHighScore (){
    const currentScore = (snake.length - 1) * 2;
    if (currentHighScore < currentScore) {
        currentHighScore = currentScore;
        highScore.innerText = currentHighScore.toString().padStart(3,'0');
    }
}