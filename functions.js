'use strict';

//shuffle array function
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

//create cards and add them to the cards-container
const createCards = numberOfPairs => {
    const numbers = [];
    for (let i = 1; i <= numberOfPairs; i++) {
        numbers.push(i);
    }
    numbers.forEach(number => {
        numbers.push(number);
    });

    shuffle(numbers);

    numbers.forEach(number => {
        const cardFrame = document.createElement("div");
        cardFrame.classList.add("card-frame");

        //replace the highest number with the bomb
        if (number == numberOfPairs) {
            cardFrame.innerHTML = `
                <div class="card" data-number="0">
                    <div class="card-back">
                        <img class="back-image" src="https://images.unsplash.com/photo-1504199020112-921914a72fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="back">
                    </div>
                    <div class="card-front">
                        <img class="bomb-image" src="https://image.flaticon.com/icons/svg/112/112683.svg" alt="bomb">
                    </div>
                </div>`;
        } else {
            cardFrame.innerHTML = `
                <div class="card" data-number="${number}">
                    <div class="card-back">
                        <img class="back-image" src="https://images.unsplash.com/photo-1504199020112-921914a72fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="back">
                    </div>
                    <div class="card-front">
                        <h2 class="card-number">${number}</h2>
                    </div>
                </div>`;
        }

        document.querySelector(".cards-container").appendChild(cardFrame);
    });
};

//remove all css classes on an element
const removeAllClasses = element => {
    while (element.classList.length !== 0) {
        element.classList.remove(element.classList[0]);
    }
};

const returnDifficulty = numberOfPairs => {
    if (numberOfPairs == 8) {
        return "easy";
    } else if (numberOfPairs == 9) {
        return "medium";
    } else if (numberOfPairs == 10) {
        return "hard";
    } else if (numberOfPairs == 24) {
        return "insane";
    }
};

const startGame = numberOfPairs => {
    moves = 0;
    guessedCards = [];
    clickCounter = 0;

    const container = document.querySelector(".cards-container");
    //empty card container
    container.innerHTML = "";

    //adjust container width depending on number of pairs
    removeAllClasses(container);
    container.classList.add("cards-container");

    const difficulty = returnDifficulty(numberOfPairs);

    if (difficulty === "easy") {
        container.classList.add("easy-container");
    } else if (difficulty === "medium") {
        container.classList.add("medium-container");
    } else if (difficulty === "hard") {
        container.classList.add("hard-container");
    } else if (difficulty === "insane") {
        container.classList.add("insane-container");
    }

    createCards(numberOfPairs);

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
                let matchFound = false;

                if (clickCounter === 2) {
                    moves++;
                    if (
                        guessedCards[0].dataset.number == 0 &&
                        guessedCards[1].dataset.number == 0
                    ) {
                        setTimeout(() => {
                            endGame("lose", numberOfPairs);
                        }, 700);
                    } else if (
                        guessedCards[0].dataset.number ===
                        guessedCards[1].dataset.number
                    ) {
                        matchFound = true;
                    } else {
                        guessedCards.forEach(guessedCard => {
                            setTimeout(() => {
                                guessedCard.classList.remove("flipped");
                            }, 800);
                        });
                    }
                    //check for win
                    let flippedCounter = 0;
                    cards.forEach(card => {
                        if (card.classList.contains("flipped")) {
                            flippedCounter++;
                        }
                    });
                    if (
                        flippedCounter === cards.length - 2 &&
                        matchFound === true
                    ) {
                        setTimeout(() => {
                            endGame("win", numberOfPairs, moves);
                        }, 700);
                    }

                    //reset clickCounter and empty the guessedCards array
                    clickCounter = 0;
                    guessedCards = [];
                }
            }
        });
    });
};

//adds highscore to localStorage
const addHighScore = (difficulty, numberOfMoves) => {
    if (localStorage.getItem(`${difficulty}-highscores`) === null) {
        let emptyArray = [];
        localStorage.setItem(
            `${difficulty}-highscores`,
            JSON.stringify(emptyArray)
        );
    }

    let scores = JSON.parse(localStorage.getItem(`${difficulty}-highscores`));
    scores.push(numberOfMoves);
    localStorage.setItem(`${difficulty}-highscores`, JSON.stringify(scores));
};

//get highscores from localstorage and add the 5 best scores of each difficulty to the page
const getHighScores = () => {
    //empty the lists
    const lists = document.querySelectorAll('ol');
    lists.forEach((list) => {
        list.innerHTML = "";
    })

    let allHighScores = {};
    let difficultys = ["easy", "medium", "hard", "insane"];

    //put all highscore arrays in an object sorted by difficulty
    difficultys.forEach(difficulty => {
        const listOfScores = JSON.parse(
            localStorage.getItem(`${difficulty}-highscores`)
        );
        Object.defineProperty(allHighScores, [difficulty], {
            value: listOfScores,
            writable: true
        });
    });

    //sort the arrays and limit to 5 best scores
    difficultys.forEach((difficulty) => {
        if (allHighScores[difficulty] !== null) {
            allHighScores[difficulty].sort((a, b) => {
                return a - b;
            });

            allHighScores[difficulty] = allHighScores[difficulty].slice(0,5);
        }
    })

    //add the scores to the page
    difficultys.forEach((difficulty) => {
        if (allHighScores[difficulty] !== null) {
            allHighScores[difficulty].forEach((score) => {
                const ol = document.querySelector(`.${difficulty}-list`);
                const li = document.createElement('li');
                li.textContent = score;
                ol.appendChild(li);
            })
        }
    })
};

const endGame = (winOrLose, numberOfPairs, numberOfMoves) => {
    const container = document.querySelector(".cards-container");
    //remove flex wrap while replay-message is up
    removeAllClasses(container);
    container.classList.add("cards-container");

    const difficulty = returnDifficulty(numberOfPairs);

    if (winOrLose === "lose") {
        container.innerHTML = `
        <div class="replay-div">
            <h2 class="lose-header">GAME OVER</h2>
            <img class="explosion-image" src="https://media0.giphy.com/media/oe33xf3B50fsc/giphy.gif?cid=790b7611c1646c6930bb86c91dbd7392e4e6f1026a27b90f&rid=giphy.gif alt="explosion">
            <button class="replay-button">Play Again</button>
        </div>`;
    } else if (winOrLose === "win") {
        container.innerHTML = `
        <div class="replay-div">
            <h2 class="win-header">CONGRATULATIONS!</h2>
            <img class="victory-image" src="https://media2.giphy.com/media/c862b2dAhJXYA/giphy.gif?cid=790b7611d0fed7c16f745b76570918d9df85d41792a7271a&rid=giphy.gif" alt="victory">
            <p>You beat ${difficulty}-mode in ${numberOfMoves} moves.</p>
            <button class="replay-button">Play Again</button>
        </div>`;

        addHighScore(difficulty, numberOfMoves);
        getHighScores();
    }

    const replayButton = document.querySelector(".replay-button");

    replayButton.addEventListener("click", () => {
        startGame(numberOfPairs);
    });
};
