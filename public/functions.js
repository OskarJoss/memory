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
const createCards = (numberOfPairs) => {
    //create an array of all the numbers on the cards
    const numbers = [];
    for (let i = 1; i <= numberOfPairs; i++) {
        numbers.push(i);
    }
    //add the numbers to the array again to create pairs
    numbers.forEach((number) => {
        numbers.push(number);
    })
    //shuffle the array
    shuffle(numbers);
    //create the cards
    numbers.forEach((number) => {
        const cardFrame = document.createElement('div');
        cardFrame.classList.add('card-frame');
        cardFrame.innerHTML =
        `<div class="card" data-number="${number}">
            <div class="card-back"></div>
            <div class="card-front">
                <h2>${number}</h2>
            </div>
        </div>`;
        //add card to the cards-container
        document.querySelector('.cards-container').appendChild(cardFrame);
    })
}

const removeAllClasses = (element) => {
    while (element.classList.length !== 0) {
        element.classList.remove(element.classList[0]);
    }
}

const startGame = (numberOfPairs) => {
    const container = document.querySelector('.cards-container');
    //empty card container
    container.innerHTML = "";

    //adjust container width depending on number of pairs
    removeAllClasses(container);
    container.classList.add('cards-container');
    //change to switch statement
    if (numberOfPairs == 8) {
        container.classList.add('easy-container');
    } else if (numberOfPairs == 9) {
        container.classList.add('medium-container');
    } else if (numberOfPairs == 10) {
        container.classList.add('hard-container');
    }

    console.log(container);

    createCards(numberOfPairs);
}

