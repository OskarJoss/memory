//run start game function when start-buttons are clicked
document.querySelectorAll('.start-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        startGame(event.target.dataset.pairs);
    })
})
