const questions = [
  {
    id: 1,
    question: "Who is the Anemo Archon of Mondstadt?",
    options: ["Zhongli", "Venti", "Raiden Shogun", "Nahida"],
    answer: 1,
    explanation: "Venti, also known as Barbatos, is the Anemo Archon of Mondstadt."
  },
  {
    id: 2,
    question: "What element does Diluc use?",
    options: ["Electro", "Pyro", "Hydro", "Cryo"],
    answer: 1,
    explanation: "Diluc is a Pyro character who wields a claymore."
  },
  {
    id: 3,
    question: "Which region is ruled by the Geo Archon?",
    options: ["Mondstadt", "Inazuma", "Sumeru", "Liyue"],
    answer: 3,
    explanation: "The Geo Archon, Rex Lapis (Zhongli), rules over Liyue."
  },
  {
    id: 4,
    question: "What is Paimon often jokingly called?",
    options: ["Food", "Fairy", "Guide", "Pixie"],
    answer: 0,
    explanation: "The Traveler and the community often joke about Paimon being emergency food."
  },
  {
    id: 5,
    question: "Which weapon type does Fischl use?",
    options: ["Sword", "Bow", "Polearm", "Catalyst"],
    answer: 1,
    explanation: "Fischl is an Electro bow user."
  },
  {
    id: 6,
    question: "What is the name of Inazuma’s ruler?",
    options: ["Raiden Shogun", "Ei", "Baal", "All of the above"],
    answer: 3,
    explanation: "Raiden Shogun, also known as Ei and formerly Baal, is the Electro Archon of Inazuma."
  },
  {
    id: 7,
    question: "Which element counters Hydro best?",
    options: ["Pyro", "Electro", "Cryo", "All of the above"],
    answer: 3,
    explanation: "Hydro reacts with Pyro (Vaporize), Electro (Electro-Charged), and Cryo (Frozen)."
  },
  {
    id: 8,
    question: "What is the Traveler's sibling called (before being separated)?",
    options: ["Paimon", "Aether&&Lumine", "Kaeya", "Dainsleif"],
    answer: 1,
    explanation: "Depending on your choice, the Traveler’s sibling is either Aether or Lumine."
  },
  {
    id: 9,
    question: "Which boss drops the material ‘Dragonspine Spear’?",
    options: ["Stormterror", "Cryo Regisvine", "Andrius (Wolf of the North)", "None"],
    answer: 3,
    explanation: "The Dragonspine Spear is crafted from materials found in Dragonspine, not dropped by bosses."
  },
  {
    id: 10,
    question: "Who founded the Knights of Favonius?",
    options: ["Venti", "Jean", "Barbatos", "Vennessa"],
    answer: 3,
    explanation: "Vennessa, a hero of Mondstadt, founded the Knights of Favonius."
  }
];
let currentIndex = 0;
let selected = {};
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const retryBtn = document.getElementById("retryBtn");
const questionText = document.getElementById("questionText");
const optionsWrap = document.getElementById("optionsWrap");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("scoreText");
const reviewWrap = document.getElementById("reviewWrap");
renderQuestion =()=>{
  const q = questions[currentIndex];
  questionText.textContent = q.question;
  optionsWrap.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = `w-full text-left p-3 border rounded-xl hover:bg-gray-50 ${selected[q.id] === i ? 'bg-blue-100 border-blue-400' : 'bg-white'}`;
    btn.onclick = () => {
      selected[q.id] = i;
      saveProgress();
      renderQuestion();
      nextBtn.classList.remove("hidden");
    };
    optionsWrap.appendChild(btn);
  });
  progressText.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.classList.toggle("hidden", currentIndex >= questions.length - 1);
  submitBtn.classList.toggle("hidden", currentIndex < questions.length - 1);
}
startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadProgress();
  renderQuestion();
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
};
nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  }
};
submitBtn.onclick = () => {
  let score = 0;
  reviewWrap.innerHTML = "";
  questions.forEach(q => {
    const userAns = selected[q.id];
    if (userAns === q.answer) score++;
    const div = document.createElement("div");
    div.className = "p-3 border rounded-xl";
    div.innerHTML = `
      <p class="font-medium">${q.question}</p>
      <p>Your answer: <span class="${userAns === q.answer ? 'text-green-600' : 'text-red-600'}">${q.options[userAns] || 'Not answered'}</span></p>
      <p>Correct answer: <span class="text-green-600">${q.options[q.answer]}</span></p>
      <p class="text-sm text-gray-600">${q.explanation}</p>
    `;
    reviewWrap.appendChild(div);
  });
  scoreText.textContent = `Score: ${score} / ${questions.length}`;
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  localStorage.removeItem("quiz-progress");
};
retryBtn.onclick = () => {
  currentIndex = 0;
  selected = {};
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
};
function saveProgress() {
  localStorage.setItem("quiz-progress", JSON.stringify({ currentIndex, selected }));
}
function loadProgress() {
  const data = JSON.parse(localStorage.getItem("quiz-progress"));
  if (data) {
    currentIndex = data.currentIndex;
    selected = data.selected;
  }
}