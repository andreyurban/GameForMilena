const questions = [
    {
        image: "images/eye.png",
        text: "מי משנה את צורת העדשה כדי לראות טוב?",
        options: ["גוף העטרה", "קשתית", "עדשה", "קרנית"],
        correct: "גוף העטרה"
    },
    {
        image: "images/eye.png",
        text: "מהו החלק הצבעוני של העין?",
        options: ["קשתית", "קרנית", "רשתית", "עדשה"],
        correct: "קשתית"
    },
    {
        image: "images/eye.png",
        text: "איפה נמצא הנוזל בין הקרנית לעדשה?",
        options: ["לשכה קדמית", "זגוגית העין", "סקלרה", "דמית"],
        correct: "לשכה קדמית"
    },
    {
        image: "images/eye.png",
        text: "מהו החור השחור באמצע העין?",
        options: ["אישון", "עדשה", "קרנית", "רשתית"],
        correct: "אישון"
    },
    {
        image: "images/eye.png",
        text: "מהו החלק השקוף שדרכו נכנס האור?",
        options: ["קרנית", "עדשה", "דמית", "סקלרה"],
        correct: "קרנית"
    },
    {
        image: "images/eye.png",
        text: "מה עושה העדשה בעין?",
        options: ["ממקדת את האור", "מגנה על העין", "מעבירה דם", "צובעת את העין"],
        correct: "ממקדת את האור"
    },
    {
        image: "images/eye.png",
        text: "מהו החלק הלבן שמגן על העין?",
        options: ["סקלרה", "קרנית", "קשתית", "עדשה"],
        correct: "סקלרה"
    },
    {
        image: "images/eye.png",
        text: "מי מביא דם לעין?",
        options: ["דמית", "רשתית", "קרנית", "זגוגית העין"],
        correct: "דמית"
    },
    {
        image: "images/eye.png",
        text: "איפה האור הופך לתמונה?",
        options: ["רשתית", "עדשה", "קרנית", "אישון"],
        correct: "רשתית"
    },
    {
        image: "images/eye.png",
        text: "מה ממלא את תוך העין כמו ג'לי?",
        options: ["זגוגית העין", "עדשה", "לשכה קדמית", "דמית"],
        correct: "זגוגית העין"
    },
    {
        image: "images/eye.png",
        text: "מי שולח את התמונה למוח?",
        options: ["עצב הראייה", "עדשה", "קרנית", "רשתית"],
        correct: "עצב הראייה"
    },
    {
        image: "images/eye.png",
        text: "איך נקרא עוד השם של סקלרה?",
        options: ["גוף הלובן", "חלק צבעוני", "רשתית", "קרנית"],
        correct: "גוף הלובן"
    }
];


let usedQuestions = JSON.parse(localStorage.getItem("usedQuestions") || "[]");
let correctAnswers = parseInt(localStorage.getItem("correctAnswers") || "0");
let wrongAnswers = parseInt(localStorage.getItem("wrongAnswers") || "0");

const image = document.getElementById("eye-image");
const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const resultText = document.getElementById("result");
const wrongCounter = document.getElementById("wrong-counter");
const correctCounter = document.getElementById("correct-counter");
const restartBtn = document.getElementById("restart-btn");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function updateCounters() {
    wrongCounter.textContent = `טעויות: ${wrongAnswers}`;
    correctCounter.textContent = `נכונות: ${correctAnswers} מתוך 5`;
}

function saveProgress() {
    localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions));
    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("wrongAnswers", wrongAnswers);
}

function resetProgress() {
    localStorage.clear();
    usedQuestions = [];
    correctAnswers = 0;
    wrongAnswers = 0;
    updateCounters();
    image.style.display = "block"; // ← это фикс
}

restartBtn.onclick = function () {
    resetProgress();
    loadQuestion();
};

function loadQuestion() {
    updateCounters();

    if (correctAnswers >= 5) {
        if (wrongAnswers === 0) {
            resultText.textContent = "!מעולה, את יודעת את החומר בצורה מושלמת";
        } else if (wrongAnswers === 1) {
            resultText.textContent = "!כל הכבוד, את זוכרת את החומר היטב";
        } else if (wrongAnswers === 2) {
            resultText.textContent = "!יפה מאוד, אבל כדאי לחזור קצת על החומר";
        }
        optionsDiv.innerHTML = "";
        questionText.textContent = "";
        image.style.display = "none";
        return;
    }

    if (wrongAnswers >= 3) {
        alert("טעית 3 פעמים! כדאי ללמוד את החומר שוב.");
        resetProgress();
        window.location.href = "start.html";
        return;
    }

    let availableQuestions = questions.filter((_, index) => !usedQuestions.includes(index));
    if (availableQuestions.length === 0) {
        alert("נגמרו השאלות. המשחק יתחיל מחדש.");
        resetProgress();
        loadQuestion();
        return;
    }

    const randomIndex = questions.indexOf(availableQuestions[Math.floor(Math.random() * availableQuestions.length)]);
    usedQuestions.push(randomIndex);

    const q = questions[randomIndex];
    image.src = q.image;
    questionText.textContent = q.text;

    const shuffledOptions = shuffle([...q.options]);
    optionsDiv.innerHTML = "";
    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(option, q.correct);
        optionsDiv.appendChild(button);
    });

    saveProgress();
    resultText.textContent = "";
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        correctAnswers++;
        resultText.textContent = "!נכון";
        resultText.style.color = "green";
    } else {
        wrongAnswers++;
        resultText.textContent = "!לא נכון";
        resultText.style.color = "red";
    }
    saveProgress();
    updateCounters();
    setTimeout(loadQuestion, 1000);
}

loadQuestion();
