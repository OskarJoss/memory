const startButtons = document.querySelectorAll(".start-button");
//run start game function when start-buttons are clicked
startButtons.forEach(button => {
    button.addEventListener("click", event => {
        //run the button data-set pairs through the startGame function
        startGame(event.target.dataset.pairs);

        //add eventlistener to flip cards
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", () => {
                card.classList.add("flipped");
            });
        });
    });
});
