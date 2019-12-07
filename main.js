const startButtons = document.querySelectorAll(".start-button");
const scoresContainer = document.querySelector('.scores-container');
const scoresButton = document.querySelector('.scores-button');
const closeScoresButton = document.querySelector('.close-scores-button');
let guessedCards = [];
let clickCounter = 0;
let moves = 0;

//run start game function when start-buttons are clicked
startButtons.forEach(button => {
    button.addEventListener("click", event => {
        const buttonData = event.target.dataset.pairs;
        startGame(buttonData);
    });
});


scoresButton.addEventListener('click', () => {
    scoresContainer.classList.toggle('visible');
})

closeScoresButton.addEventListener('click', () => {
    scoresContainer.classList.remove('visible');
})

