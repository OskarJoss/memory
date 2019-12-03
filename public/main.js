const startButtons = document.querySelectorAll(".start-button");
let guessedCards = [];
let clickCounter = 0;

//run start game function when start-buttons are clicked
startButtons.forEach(button => {
    button.addEventListener("click", event => {
        //add pairs from buttons data-set
        startGame(event.target.dataset.pairs);

        //add eventlistener to flip cards
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", event => {
                //add class flipped if card doesnt have it already
                if (card.classList.contains("flipped") === false) {
                    card.classList.add("flipped");
                    //push the .card into guessedCards array
                    guessedCards.push(card);
                    //increase click counter
                    clickCounter++;
                    //when two cards have been clicked
                    if (clickCounter === 2) {
                        //check if cards match
                        if (
                            guessedCards[0].dataset.number ===
                            guessedCards[1].dataset.number
                        ) {
                            console.log("yay!");
                        } else {
                            guessedCards.forEach(guessedCard => {
                                setTimeout(() => {
                                    guessedCard.classList.remove("flipped");
                                }, 800)
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
