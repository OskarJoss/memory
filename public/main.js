const startButtons = document.querySelectorAll(".start-button");
let guessedCards = [];
let clickCounter = 0;

//run start game function when start-buttons are clicked
startButtons.forEach(button => {
    button.addEventListener("click", event => {
        const buttonData = event.target.dataset.pairs;
        startGame(buttonData);

        //add eventlistener to flip cards
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", event => {
                //add class flipped if card doesnt have it already
                if (card.classList.contains("flipped") === false) {
                    card.classList.add("flipped");
                    //push the .card into guessedCards array
                    guessedCards.push(card);

                    clickCounter++;

                    if (clickCounter === 2) {
                        if (
                            guessedCards[0].dataset.number == 0 &&
                            guessedCards[1].dataset.number == 0
                        ) {
                            loseGame(buttonData);
                        } else if (
                            guessedCards[0].dataset.number ===
                            guessedCards[1].dataset.number
                        ) {
                            console.log('yay!');
                        } else {
                            guessedCards.forEach(guessedCard => {
                                setTimeout(() => {
                                    guessedCard.classList.remove("flipped");
                                }, 800);
                            });
                        }
                        //reset clickCounter and empty the guessedCards array
                        clickCounter = 0;
                        guessedCards = [];
                    }
                }
            });
        });
    });
});
