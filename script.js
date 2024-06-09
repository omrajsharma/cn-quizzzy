const timeLeft = document.querySelector('.time-left');
const quizContainer = document.getElementById('container');
const nextBtn = document.getElementById('next-button')
let countOfQuestion = document.querySelector('.number-of-question');
const displayContainer = document.getElementById('display-container');
const scoreContainer = document.querySelector('.score-container');
const restart = document.getElementById('restart');
const userScore = document.getElementById('user-score');
const startScreen = document.querySelector('.start-screen');
const startBtn = document.getElementById('start-button');

let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countDown;

const quizArray = [
    {
        id: 0,
        question: "Which is the most widely spoken language in the world",
        options: ["Spanish", "Mandarin", "English", "German"],
        correct: "Mandarin"
    },
    {
        id: 1,
        question: "Which is the only continent in the world without a desert?",
        options: ["Nerth America", "Asia", "Africa", "Europe"],
        correct: "Europe"
    },
    {
        id: 2,
        question: "Who invented computer?",
        options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Charles Babbage"
    },
]

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hide');
    displayContainer.classList.remove('hide');
    intiliseQuiz();
})

restart.addEventListener('click', () => {
    scoreContainer.classList.add('hide');
    displayContainer.classList.remove('hide');
    intiliseQuiz();
})

const intiliseQuiz = () => {
    quizContainer.innerHTML = "";
    questionCount = 0;
    score = 0;
    clearInterval();        // todo: need to add
    timerDisplay();         // ✅
    quizCreator();          // ✅
    quizDisplay(questionCount); // ✅
}

const timerDisplay = () => {
    countDown = setInterval(() => {
        count--;
        timeLeft.innerHTML = count + 's';
        if (count == 0) {
            clearInterval(countDown);
            displayNext();
        }
    }, 1000);
}

function quizCreator() {
    // randomise the quiz list
    quizArray.sort(() => Math.random() - 0.5);
    console.log(quizArray);

    for(let quizItem of quizArray) {
        console.log(quizItem);

        // randomise options
        quizItem.options.sort(() => Math.random() - 0.5);

        // question div
        let div = document.createElement('div');
        div.classList.add('container-mid', 'hide');

        // question para
        let questionDiv = document.createElement('p');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = quizItem.question;

        // appended question para into question div
        div.appendChild(questionDiv);

        // appended option in questio div
        div.innerHTML += `
            <button class="option-div" onclick="questionValidator(this)">${quizItem.options[0]}</button>
            <button class="option-div" onclick="questionValidator(this)">${quizItem.options[1]}</button>
            <button class="option-div" onclick="questionValidator(this)">${quizItem.options[2]}</button>
            <button class="option-div" onclick="questionValidator(this)">${quizItem.options[3]}</button>
        `;
        console.log(quizContainer);
        quizContainer.appendChild(div);
    }
}

function quizDisplay(questionCount) {
    let quizCards = document.querySelectorAll('.container-mid');

    // hide all the cards
    quizCards.forEach(card => {
        card.classList.add('hide');
    })

    // remove hide class from question to display
    quizCards[questionCount].classList.remove('hide');
}

function displayNext() {
    questionCount++;

    if (questionCount == quizArray.length) {        // quiz finished
        displayContainer.classList.add('hide');     // hiding the quiz
        scoreContainer.classList.remove('hide');    // unhide score container
        userScore.innerHTML = `Your score is ${scoreCount} or of ${questionCount}`;
    } else {
        countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} questions `;
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countDown);
        timerDisplay();
    }
}

function questionValidator(userSelectedOption) {
    const userSelectedSol = userSelectedOption.innerText;

    const question = document.getElementsByClassName('container-mid')[questionCount];
    let options = question.querySelectorAll('.option-div');

    if (userSelectedSol === quizArray[questionCount].correct) {
        userSelectedOption.classList.add('correct');
        scoreCount++;
    } else {
        userSelectedOption.classList.add('incorrect');
        options.forEach(option => {
            if (option.innerText === quizArray[questionCount].correct) {
                option.classList.add('correct');
            }
        })
    }

    clearInterval(countDown);
    options.forEach(option => option.disabled = true);
}

nextBtn.addEventListener('click', displayNext);