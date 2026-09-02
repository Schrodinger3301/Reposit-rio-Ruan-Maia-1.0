// ! 1. Elementos da Interface
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById("start-btn");
const highScoreDisplay = document.getElementById("high-score-display");
const statusText = document.getElementById("status-text");
const roundDisplay = document.getElementById("round-display");

/* 2. Geometia Ajustada para o Canvas de 400x400 */
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const outerRadius = 100;
const innerRadius = 55;

/* 3. Setores de Cores */
const SECTORS = [
  { id: 0, name: 'Verde', base: '#15803d', light: '#4ade80', start: 1.0 * Math.PI, end: 1.5 * Math.PI },
  { id: 1, name: 'Vermelho', base: '#b91c1c', light: '#f87171', start: 1.5 * Math.PI, end: 2.0 * Math.PI },
  { id: 2, name: 'Azul', base: '#1d4ed8', light: '#60a5fa', start: 0.0 * Math.PI, end: 0.5 * Math.PI },
  { id: 3, name: 'Amarelo', base: '#b45309', light: '#facc15', start: 0.5 * Math.PI, end: 1.0 * Math.PI }
];

/* 4. Estado da partida */
let sequence = [];
let playerStep = 0;
let activeSector = null;
let isPlayerTurn = false;
let highScore = 0;

/* 5. Desenho do Tabuleiro */
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  SECTORS.forEach((sec) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, sec.start, sec.end);
    ctx.arc(centerX, centerY, innerRadius, sec.end, sec.start, true);
    ctx.closePath();

    ctx.fillStyle = (activeSector === sec.id) ? sec.light : sec.base;
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0f172a';
    ctx.stroke();
  });

  /*Centro Decorativo*/
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius - 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
}

/* 6. Efeito visual do flash */
function flashSector(id, duration = 500) {
  return new Promise((resolve) => {
    activeSector = id;
    drawBoard();

    setTimeout(() => {
      activeSector = null;
      drawBoard();
      setTimeout(resolve, 150);
    }, duration);
  });
}

/* 7. Fluxo da partida */
async function playSequence() {
  isPlayerTurn = false;
  statusText.textContent = 'Observe a sequência...';

  await new Promise((resolve) => setTimeout(resolve, 500));

  for (const id of sequence) {
    await flashSector(id);
  }

  isPlayerTurn = true;
  playerStep = 0;
  statusText.textContent = 'Sua vez! Repita a sequência.';
}

function nextRound() {
  if (roundDisplay) {
    roundDisplay.textContent = String(sequence.length + 1);
  }

  const randomColorId = Math.floor(Math.random() * 4);
  sequence.push(randomColorId);
  playSequence();
}

function startGame() {
  sequence = [];
  playerStep = 0;
  startBtn.disabled = true;
  nextRound();
}

function gameOver() {
  isPlayerTurn = false;
  statusText.textContent = `Fim de jogo! Você chegou à rodada ${sequence.length}.`;
  startBtn.disabled = false;
}

// 8. Evento de clique
canvas.addEventListener('click', (e) => {
  if (!isPlayerTurn) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left - centerX;
  const y = e.clientY - rect.top - centerY;

  const distance = Math.hypot(x, y);
  if (distance < innerRadius || distance > outerRadius) return;

  let angle = Math.atan2(y, x);
  if (angle < 0) angle += 2 * Math.PI;

  let clickedId = null;
  if (angle >= 1.0 * Math.PI && angle < 1.5 * Math.PI) clickedId = 0;
  else if (angle >= 1.5 * Math.PI && angle < 2.0 * Math.PI) clickedId = 1;
  else if (angle >= 0.0 * Math.PI && angle < 0.5 * Math.PI) clickedId = 2;
  else if (angle >= 0.5 * Math.PI && angle < 1.0 * Math.PI) clickedId = 3;

  if (clickedId !== null) {
    handlePlayerInput(clickedId);
  }
});

function handlePlayerInput(clickedId) {
  flashSector(clickedId, 200);

  if (clickedId === sequence[playerStep]) {
    playerStep++;

    if (playerStep === sequence.length) {
      isPlayerTurn = false;

      if (sequence.length > highScore) {
        highScore = sequence.length;
        highScoreDisplay.textContent = highScore;
      }

      statusText.textContent = 'Muito bem! Próxima rodada...';
      setTimeout(nextRound, 1000);
    }
  } else {
    gameOver();
  }
}

startBtn.addEventListener('click', startGame);
drawBoard();