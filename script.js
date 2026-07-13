const timeElement = document.getElementById("time");

let timer;
let timeLeft = 15;

// Buttons & Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

// Start Button
startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionNumber.innerHTML =
        `Question ${currentQuestionIndex + 1} / ${questions.length}`;

    questionElement.innerHTML = currentQuestion.question;

    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });
    startTimer();

}

function resetState() {

    nextBtn.style.display = "none";

    answerButtons.innerHTML = "";

}
function selectAnswer(e) {
  clearInterval(timer);

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});

function showResult() {

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");

    scoreText.innerHTML =
        `${score} / ${questions.length}`;

}
function startTimer() {

    clearInterval(timer);

    timeLeft = 15;

    timeElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true;

                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
            });

            nextBtn.style.display = "block";

        }

    },1000);

}
restartBtn.addEventListener("click", () => {

    resultScreen.classList.add("hide");

    startScreen.classList.remove("hide");

});