
const titlePage = document.getElementById ('title-page');
const startBtn = document.getElementById ('start-btn');
const levelPage = document.getElementById ('level-page');
const levelBtn = document.querySelectorAll ('.level-btn');
const gamePage = document.getElementById ('game-page');
const spaceBar = document.getElementById ('space-bar');

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