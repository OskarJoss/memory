const startButtons = document.querySelectorAll(".start-button");
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
