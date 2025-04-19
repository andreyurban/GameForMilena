const questions = [
    {
      image: "images/eye.png",
      text: "מה מסדרת את האור כדי שנראה ברור?",
      options: ["עדשה", "קשתית", "קרנית", "רשתית"],
      correct: "עדשה"
    },
    {
      image: "images/eye.png",
      text: "מהו החור השחור שבמרכז העין?",
      options: ["אישון", "עדשה", "קשתית", "רשתית"],
      correct: "אישון"
    },
    {
      image: "images/eye.png",
      text: "מה החלק הצבעוני שמסביב לאישון?",
      options: ["קשתית", "קרנית", "זגוגית העין", "דמית"],
      correct: "קשתית"
    },
    {
      image: "images/eye.png",
      text: "איפה האור הופך לתמונה?",
      options: ["רשתית", "עדשה", "אישון", "קרנית"],
      correct: "רשתית"
    },
    {
      image: "images/eye.png",
      text: "מה ממלא את העין מבפנים כמו ג'לי?",
      options: ["זגוגית העין", "עדשה", "קרנית", "דמית"],
      correct: "זגוגית העין"
    },
    {
      image: "images/eye.png",
      text: "מהו החלק השקוף שדרכו נכנס אור?",
      options: ["קרנית", "קשתית", "סקלרה", "רשתית"],
      correct: "קרנית"
    },
    {
      image: "images/eye.png",
      text: "מי מעביר את התמונה למוח?",
      options: ["עצב הראייה", "עדשה", "קשתית", "סקלרה"],
      correct: "עצב הראייה"
    },
    {
      image: "images/eye.png",
      text: "מה מביא דם וחמצן לעין?",
      options: ["דמית", "רשתית", "קרנית", "עדשה"],
      correct: "דמית"
    },
    {
      image: "images/eye.png",
      text: "מה שומר על צורת העין מבחוץ?",
      options: ["סקלרה", "קשתית", "קרנית", "עדשה"],
      correct: "סקלרה"
    },
    {
      image: "images/eye.png",
      text: "מה נמצא בין הקרנית לעדשה ומלא נוזל?",
      options: ["לשכה קדמית", "זגוגית העין", "רשתית", "קשתית"],
      correct: "לשכה קדמית"
    },
    {
      image: "images/eye.png",
      text: "מה שולט בצורת העדשה כדי לראות מקרוב או רחוק?",
      options: ["גוף העטרה", "קשתית", "רשתית", "סקלרה"],
      correct: "גוף העטרה"
    }
  ];
  
  let usedQuestions = [];
  let correctCount = 0;
  let wrongCount = 0;
  
  const image = document.getElementById("eye-image");
  const questionText = document.getElementById("question");
  const optionsDiv = document.getElementById("options");
  const resultText = document.getElementById("result");
  const correctCounter = document.getElementById("correct-counter");
  const wrongCounter = document.getElementById("wrong-counter");
  const restartBtn = document.getElementById("restart-btn");
  
  restartBtn.onclick = () => {
    usedQuestions = [];
    correctCount = 0;
    wrongCount = 0;
    image.style.display = "block";
    updateCounters();
    loadQuestion();
  };
  
  function updateCounters() {
    correctCounter.textContent = `נכונות: ${correctCount} מתוך 5`;
    wrongCounter.textContent = `טעויות: ${wrongCount}`;
  }
  
  function loadQuestion() {
    updateCounters();
    resultText.textContent = "";
  
    if (correctCount >= 5) {
      resultText.textContent =
        wrongCount === 0
          ? "!מעולה, אין לך טעויות"
          : wrongCount === 1
          ? "!יפה מאוד, רק טעות אחת"
          : "!סיימת! אבל כדאי לחזור קצת על החומר";
      optionsDiv.innerHTML = "";
      questionText.textContent = "";
      image.style.display = "none";
      return;
    }
  
    if (wrongCount >= 3) {
      alert("טעית 3 פעמים! כדאי ללמוד שוב.");
      restartBtn.click();
      return;
    }
  
    const remaining = questions.filter((_, i) => !usedQuestions.includes(i));
    if (remaining.length === 0) {
      usedQuestions = [];
    }
  
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const qIndex = questions.indexOf(remaining[randomIndex]);
    usedQuestions.push(qIndex);
  
    const q = questions[qIndex];
    image.src = q.image;
    questionText.textContent = q.text;
  
    optionsDiv.innerHTML = "";
    shuffle(q.options).forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option";
      button.onclick = () => checkAnswer(option, q.correct);
      optionsDiv.appendChild(button);
    });
  }
  
  function checkAnswer(selected, correct) {
    if (selected === correct) {
      correctCount++;
      resultText.textContent = "!נכון";
      resultText.style.color = "green";
    } else {
      wrongCount++;
      resultText.textContent = "!לא נכון";
      resultText.style.color = "red";
    }
    setTimeout(loadQuestion, 1000);
  }
  
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  
  loadQuestion();
  