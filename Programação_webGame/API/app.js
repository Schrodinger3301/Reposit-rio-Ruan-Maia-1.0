let currentScore = 0;
let correctAnswer = "";

const questionEl = document.getElementById("question");
const categoryEl = document.getElementById("category-badge");
const optionsEl = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback-message");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score-display");

// Função assíncrona para consumir a API
async function loadQuestion() {
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  optionsEl.innerHTML = "";
  questionEl.textContent = "Carregando pergunta...";

  try {
    // Requisição HTTP GET para a API de trivia (formato JSON)
    const response = await fetch("https://opentdb.com/api.php?amount=12&category=31&type=multiple");
    
    if (!response.ok) throw new Error("Erro na rede");

    const data = await response.json();
    const item = data.results[0];

    // Trata codificação de caracteres HTML retornados pela API
    correctAnswer = decodeHTML(item.correct_answer);
    categoryEl.textContent = item.category;
    questionEl.textContent = decodeHTML(item.question);

    // Mistura as alternativas erradas com a certa
    const options = [...item.incorrect_answers.map(decodeHTML), correctAnswer];
    options.sort(() => Math.random() - 0.5);

    // Renderiza os botões dinamicamente no HTML
    options.forEach(optionText => {
      const btn = document.createElement("button");
      btn.textContent = optionText;
      btn.onclick = () => checkAnswer(btn, optionText);
      optionsEl.appendChild(btn);
    });

  } catch (error) {
    questionEl.textContent = "Falha ao carregar dados da API.";
    console.error(error);
  }
}

function checkAnswer(selectedBtn, chosenOption) {
  // Desabilita todos os botões para evitar cliques múltiplos
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (chosenOption === correctAnswer) {
    selectedBtn.classList.add("correct");
    feedbackEl.textContent = "Resposta correta!";
    currentScore += 10;
    scoreEl.textContent = `Pontos: ${currentScore}`;
  } else {
    selectedBtn.classList.add("wrong");
    feedbackEl.textContent = `Errado! A resposta correta era: ${correctAnswer}`;
    
    // Destaca qual era o botão correto
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) btn.classList.add("correct");
    });
  }

  nextBtn.classList.remove("hidden");
}

// Utilitário para decodificar entidades como &quot; e &#039;
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

nextBtn.addEventListener("click", loadQuestion);

// Inicia o jogo carregando a primeira pergunta
loadQuestion();