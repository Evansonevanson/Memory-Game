const body = document.querySelector(`body`);


const container = document.createElement(`div`)
container.classList.add(`container`);

const heading = document.createElement(`div`);
heading.classList.add(`heading`);
heading.innerHTML = `<h1>Memory Game</h1>`;

const timer = document.createElement(`div`);
timer.classList.add(`timer`);

const gameBox = document.createElement(`div`);
gameBox.classList.add(`game-box`);


const reset = document.createElement(`div`);
reset.classList.add(`reset`);
reset.innerHTML = `<button>Reset</button>`;















// ---------------------------- timer -------------------------------
let minutes = 1;
let seconds = 0;
let timeInterval;
const myTimer = () => {
    
    minutes = 1;
    seconds = 0;

    function updateTimer(){
        if (minutes === 0 && seconds === 0){
            clearInterval(timeInterval);
            gameEnd();
            return;
        }

        if(seconds === 0){
            minutes--;
            seconds =59;
        }else{
            seconds--;
        }

        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        timer.innerHTML = `<h4>Timer: ${formattedMinutes} : ${formattedSeconds}</h4>`;
    };
    timeInterval = setInterval(updateTimer, 1000);
};




// -------------------------------- cards ----------------------------

const getData = () => [
    {imgSrc: `images/image1.jpg`, name: `image1`},
    {imgSrc: `images/image2.jpg`, name: `image2`},
    {imgSrc: `images/image3.jpg`, name: `image3`},
    {imgSrc: `images/image4.jpg`, name: `image4`},
    {imgSrc: `images/image5.jpg`, name: `image5`},
    {imgSrc: `images/image6.jpg`, name: `image6`},
    {imgSrc: `images/image7.jpg`, name: `image7`},
    {imgSrc: `images/image8.jpg`, name: `image8`},
    {imgSrc: `images/image1.jpg`, name: `image1`},
    {imgSrc: `images/image2.jpg`, name: `image2`},
    {imgSrc: `images/image3.jpg`, name: `image3`},
    {imgSrc: `images/image4.jpg`, name: `image4`},
    {imgSrc: `images/image5.jpg`, name: `image5`},
    {imgSrc: `images/image6.jpg`, name: `image6`},
    {imgSrc: `images/image7.jpg`, name: `image7`},
    {imgSrc: `images/image8.jpg`, name: `image8`},
];

const randomData = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

const cardCreate = () => {
    const cardData = randomData();

    cardData.forEach((item) => {
        const card = document.createElement(`div`);
        const front = document.createElement(`img`);
        const back = document.createElement(`div`);
        card.classList = `card`;
        card.setAttribute(`name`, item.name)
        front.classList = `front`;
        back.classList = `back`;

        front.src = item.imgSrc;

        gameBox.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener(`click`, (e) => {
            card.classList.toggle(`toggle`);
            cardCheck(e);
        });
    });   
    myTimer()
};


const cardCheck = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add(`flipped`);
    const flippedCards = document.querySelectorAll(`.flipped`);
    const toggle = document.querySelectorAll(`.toggle`);
    let sum = 0;
    
    if(flippedCards.length === 2){
        if(
            flippedCards[0].getAttribute(`name`) === 
            flippedCards[1].getAttribute(`name`)){
            flippedCards.forEach((card) => {
                card.classList.remove(`flipped`);
                card.style.pointerEvents = 'none';
            })
        }else{
            flippedCards.forEach((card) => {
                card.classList.remove(`flipped`);
                setTimeout(() => card.classList.remove(`toggle`), 1000);
            });

        }
    }
    if(toggle.length === 16){
        wonGame()
        clearInterval(timeInterval);
    }
};

cardCreate();


// ------------------------- Restart Game --------------------------

const restart = () => {

    let cardData = randomData();
    let front = document.querySelectorAll(`.front`);
    let cards = document.querySelectorAll(`.card`);
    gameBox.style.pointerEvents = `none`;

    cardData.forEach((item, index) => {
        cards[index].classList.remove(`toggle`);

        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            front[index].src = item.imgSrc;
            cards[index].setAttribute(`name`, item.name);
            gameBox.style.pointerEvents = `all`;
          
        }, 1000)
    });
    
    
}




// ------------------------ Lose Game Modal ------------------------

const gameEnd = () => {
    const modal = document.createElement(`div`);
    modal.classList = `modal`;

    const messageContainer = document.createElement(`div`)
    messageContainer.classList = `message-container`;

    const message = document.createElement(`h1`)
    message.innerText = `You Lose!!!`;
    const message2 = document.createElement(`p`);
    message2.innerText = `Your time ran out, please click the restart button to play again.`;
    const restartBtn = document.createElement(`button`);
    restartBtn.innerText = `Restart`;
    restartBtn.addEventListener(`click`, () => {
        modal.style.display = `none`;
        myTimer();
        restart();
    })

    modal.appendChild(messageContainer);
    messageContainer.append(message, message2, restartBtn);
    container.append(modal);

    
}


reset.addEventListener(`click`, restart);
reset.addEventListener(`click`, () => {
    minutes = 1;
    seconds = 0;
})

// ------------------------ Won Game Modal ------------------------

const wonGame = () => {
    const modal = document.createElement(`div`);
    modal.classList = `modal`;

    const messageContainer = document.createElement(`div`)
    messageContainer.classList = `message-container`;

    const message = document.createElement(`h1`)
    message.innerText = `Congratulations You Won!!!`;
    const message2 = document.createElement(`p`);
    message2.innerText = `Please click the restart button to play again`;
    const restartBtn = document.createElement(`button`);
    restartBtn.innerText = `Restart`;
    restartBtn.addEventListener(`click`, () => {
        modal.style.display = `none`;
        myTimer();
        restart();
    })

    modal.appendChild(messageContainer);
    messageContainer.append(message, message2, restartBtn);
    container.append(modal);

    
}


reset.addEventListener(`click`, restart);
reset.addEventListener(`click`, () => {
    minutes = 1;
    seconds = 0;
})




body.append(container);
container.append(heading, timer, gameBox, reset)
gameBox.append()