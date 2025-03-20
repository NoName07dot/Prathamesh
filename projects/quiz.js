const quizData = [
    {
        question: "Who has the fastest wicketing record?",
        a: "MS Dhoni",
        b: "Virat Kohli",
        c: "Rohit Sharma",
        d: "Sanju Samson",
        correct: "a",
    },
    {
        question: "Which player has the highest score in IPL cricket?",
        a: "Rohit Sharma",
        b: "Hardik Pandya",
        c: "Shubman Gill",
        d: "Virat Kohli",
        correct: "d",
    },
    {
        question: "Which team has never won the IPL championship?",
        a: "CSK",
        b: "MI",
        c: "RCB",
        d: "GT",
        correct: "c",
    },
    {
        question: "Under which captain did India win all ICC trophies?",
        a: "Shubman Gill",
        b: "Suryakumar Yadav",
        c: "MS Dhoni",
        d: "Hardik Pandya",
        correct: "c",
    },
    {
        question: "Which team won the 2024 T20 World Cup?",
        a: "Pakistan",
        b: "India",
        c: "Australia",
        d: "South Africa",
        correct: "b",
    },
    {
        question: "Which bowler holds the record for the most wickets taken in Test Cricket history?",
        a: "Shane Warne",
        b: "Glenn McGrath",
        c: "Muttiah Muralitharan",
        d: "Jasprit Bumrah",
        correct: "c",
    },
    {
        question: "Who won the first ICC Cricket World Cup in 1975?",
        a: "Australia",
        b: "West Indies",
        c: "England",
        d: "India",
        correct: "b",
    },
    {
        question: "Which country has won the most ICC Cricket World Cups?",
        a: "India",
        b: "Australia",
        c: "West Indies",
        d: "England",
        correct: "b",
    },
    {
        question: "Which team did India defeat in the 2011 World Cup Final?",
        a: "Pakistan",
        b: "Sri Lanka",
        c: "Australia",
        d: "South Africa",
        correct: "b",
    },
    {
        question: "Which team won the first IPL title in 2008?",
        a: "Chennai Super Kings",
        b: "Mumbai Indians",
        c: "Rajasthan Royals",
        d: "Royal Challengers Bangalore",
        correct: "c",
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
        answerEl.parentElement.style.color = "#000"; // Reset text color
    });
}

function getSelected() {
    let selectedAnswer = null;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.id;
        }
    });

    return selectedAnswer;
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if (selectedAnswer) {
        submitBtn.disabled = true; // Prevent multiple clicks
        const correctAnswer = quizData[currentQuiz].correct;
        
        // Highlight answers
        answerEls.forEach(answerEl => {
            if (answerEl.id === correctAnswer) {
                answerEl.parentElement.style.color = "green"; // Highlight correct answer
            } else if (answerEl.id === selectedAnswer) {
                answerEl.parentElement.style.color = "red"; // Highlight wrong answer
            }
        });

        if (selectedAnswer === correctAnswer) {
            score++;
        }

        setTimeout(() => {
            currentQuiz++;

            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.innerHTML = `
                    <h2>You answered ${score}/${quizData.length} questions correctly!</h2>
                    <p>🎉 Great job! Want to try again?</p>
                    <button onclick="location.reload()">Restart Quiz</button>
                `;
            }
        }, 1000); // 1-second delay before loading next question
    }
});
