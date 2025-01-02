
const titlePage = document.getElementById ('title-page');
const startBtn = document.getElementById ('start-btn');
const levelPage = document.getElementById ('level-page');
const levelBtn = document.querySelectorAll ('.level-btn');
const gamePage = document.getElementById ('game-page');
const spaceBar = document.getElementById ('space-bar');
const gameBoard = document.getElementById ('gameboard');

// creating the elements
let gridSize = 20 ;
let snake = [{x:10 , y:10}];
let food = generateFoodElement();
let direction = 'up';
let gameInterval;
let gameStart = false;
let gameSpeedDelay = 200;



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
        // checkCollision ();
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