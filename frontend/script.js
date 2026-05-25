const startBtn = document.getElementById("start-btn");
const playerNameInput = document.getElementById("player-name");

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("question-number");

const nextBtn = document.getElementById("next-btn");

const timerElement = document.getElementById("timer");

const finalScoreElement = document.getElementById("final-score");

let questions = [];
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;

let timer;
let timeLeft = 15;

startBtn.addEventListener("click", startGame);

async function startGame() {

    const playerName = playerNameInput.value;

    if(playerName === "") {

        document.getElementById("error").innerText =
            "Adj meg nevet!";

        return;
    }

    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    const response = await fetch(
        "http://localhost:3000/api/questions"
    );

    questions = await response.json();

    showQuestion();
}

function showQuestion() {

    resetState();

    startTimer();

    const question = questions[currentQuestion];

    questionNumberElement.innerText =
        `${currentQuestion + 1} / ${questions.length}`;

    questionElement.innerHTML =
        question.question;

    let answers = [
        ...question.incorrect_answers,
        question.correct_answer
    ];

    answers.sort(() => Math.random() - 0.5);

    answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer;

        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(button, answer, question.correct_answer);
        });

        answersElement.appendChild(button);

    });

}

function selectAnswer(button, answer, correctAnswer) {

    clearInterval(timer);

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {

        btn.disabled = true;

        if(btn.innerHTML === correctAnswer) {
            btn.classList.add("correct");
        }

    });

    if(answer === correctAnswer) {

        score += 10;

        correctAnswers++;

        scoreElement.innerText = score;

    } else {

        button.classList.add("wrong");

    }

}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {

    currentQuestion++;

    if(currentQuestion < questions.length) {

        showQuestion();

    } else {

        endGame();

    }

}

function resetState() {

    nextBtn.style.display = "block";

    answersElement.innerHTML = "";

    timeLeft = 15;

    timerElement.innerText = timeLeft;

}

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText = timeLeft;

        if(timeLeft <= 5) {

            timerElement.classList.add("low-time");

        }

        if(timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}

async function endGame() {

    gameScreen.classList.add("hidden");

    endScreen.classList.remove("hidden");

    finalScoreElement.innerText =
        `Pontszám: ${score}
        | Helyes válaszok: ${correctAnswers}`;

    await fetch("http://localhost:3000/api/scores", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: playerNameInput.value,
            score,
            correctAnswers
        })

    });

}