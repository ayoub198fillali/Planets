const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
var result = document.getElementById("result");
var score = 0;
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  $(".questNum").html(currentQuestionIndex + 1);
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if ((selectedButton.dataset = correct && $("#next-btn").hasClass("hide"))) {
    score++;
  }
  result.innerHTML = "Your result is " + score + " out of " + questions.length;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    $(".questNum").html(
      "Your result is " + score + " out of " + questions.length
    );

    startButton.classList.remove("hide");
    result.innerHTML = "";
    score = 0;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "what is the smallest planet in solar system?",
    answers: [
      { text: "Mercury", correct: true },
      { text: "Mars", correct: false },
      { text: "Earth", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: " A day on Venus is ...",
    answers: [
      { text: "longer than a year", correct: true },
      { text: "80 days", correct: false },
    ],
  },
  {
    question: "Where is the highest mountain in the solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Uranus", correct: false },
    ],
  },
  {
    question: "How many spacecrafts have visited Saturn ?",
    answers: [
      { text: "4", correct: true },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Which planet has the coldest climate in the solar system?",
    answers: [
      { text: "Uranus", correct: true },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "Which solar system object is the brightest ?",
    answers: [
      { text: "Moon", correct: true },
      { text: "Uranus", correct: false },
      { text: "Mercury", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "How many moons does Jupiter have?",
    answers: [
      { text: "80", correct: true },
      { text: "0", correct: false },
      { text: "2", correct: false },
      { text: "1000", correct: false },
    ],
  },
  {
    question: "Which planet has the fastest rotation? ",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: true },
      { text: "Uranus", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which planet has the most volcanoes? ",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: true },
      { text: "Uranus", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which is the second smallest planet within our solar system? ",
    answers: [
      { text: "Venus", correct: false },
      { text: "Earth", correct: false },
      { text: "Moon", correct: false },
      { text: "Mercury", correct: true },
    ],
  },
];
