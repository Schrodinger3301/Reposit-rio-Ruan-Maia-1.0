document.addEventListener("DOMContentLoaded", () => {
  // MÓDULO A: Cabeçalho & Tema Global

  const btnTheme = document.getElementById("btn-theme");

  btnTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    btnTheme.textContent = isDarkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  });

  // MÓDULO B: Identificação & Monitoramento de Texto

  const inputProfile = document.getElementById("input-profile");
  const btnWelcome = document.getElementById("btn-welcome");
  const welcomeMsg = document.getElementById("welcome-msg");
  const charCount = document.getElementById("char-count");

          // Exibir mensagem de boas-vindas
  btnWelcome.addEventListener("click", () => {
    const name = inputProfile.value.trim();
    if (name) {
      welcomeMsg.textContent = `Olá, ${name}! Seja bem-vindo(a).`;
    } else {
      welcomeMsg.textContent = "Olá, Visitante! Seja bem-vindo(a).";
    }
  });

          // Contagem em tempo real
  inputProfile.addEventListener("input", () => {
    charCount.textContent = inputProfile.value.length;
  });

  // MÓDULO C: Contador de Foco / Produtividade

  const counterDisplay = document.getElementById("counter-display");
  const btnIncrement = document.getElementById("btn-increment");
  const btnDecrement = document.getElementById("btn-decrement");
  const btnReset = document.getElementById("btn-reset");

  let count = 0;

  function updateCounterDisplay() {
    counterDisplay.textContent = count;

        // Limpa as classes de estilo numérico
    counterDisplay.classList.remove("text-success", "text-danger", "text-muted");

        // Aplica estilo dinâmico com base no valor
    if (count > 0) {
      counterDisplay.classList.add("text-success");
    } else if (count < 0) {
      counterDisplay.classList.add("text-danger");
    } else {
      counterDisplay.classList.add("text-muted");
    }
  }

  btnIncrement.addEventListener("click", () => {
    count++;
    updateCounterDisplay();
  });

  btnDecrement.addEventListener("click", () => {
    count--;
    updateCounterDisplay();
  });

  btnReset.addEventListener("click", () => {
    count = 0;
    updateCounterDisplay();
  });

  // MÓDULO D: Lista de Tarefas & Mensagem Secreta

  const inputTask = document.getElementById("input-task");
  const btnAddTask = document.getElementById("btn-add-task");
  const taskList = document.getElementById("task-list");
  const btnToggleHint = document.getElementById("btn-toggle-hint");
  const hintText = document.getElementById("hint-text");

        // Adicionar Tarefa
  btnAddTask.addEventListener("click", addTask);

  inputTask.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const text = inputTask.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = text;

       // Permite marcar como concluída ao clicar
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    taskList.appendChild(li);
    inputTask.value = "";
  }

        // Alternar instrução/dica
  btnToggleHint.addEventListener("click", () => {
    const isHidden = hintText.style.display === "none" || hintText.style.display === "";

    if (isHidden) {
      hintText.style.display = "block";
      btnToggleHint.textContent = "Ocultar Dica";
    } else {
      hintText.style.display = "none";
      btnToggleHint.textContent = "Mostrar Dica";
    }
  });

  // MÓDULO E: Calculadora Rápida & Bloco de Cor

  const calcNum1 = document.getElementById("calc-num1");
  const calcNum2 = document.getElementById("calc-num2");
  const btnCalcAdd = document.getElementById("btn-calc-add");
  const btnCalcSub = document.getElementById("btn-calc-sub");
  const btnCalcDiv = document.getElementById("btn-calc-div");
  const calcResult = document.getElementById("calc-result");

  function calculate(operation) {
    const n1 = Number(calcNum1.value);
    const n2 = Number(calcNum2.value);

          // Validação de inputs vazios
    if (calcNum1.value === "" || calcNum2.value === "") {
      calcResult.textContent = "Preencha ambos os campos.";
      calcResult.className = "text-center text-danger";
      return;
    }

    let result = 0;

    switch (operation) {
      case "add":
        result = n1 + n2;
        break;
      case "sub":
        result = n1 - n2;
        break;
      case "div":
        if (n2 === 0) {
          calcResult.textContent = "Impossível dividir por 0";
          calcResult.className = "text-center text-danger";
          return;
        }
        result = n1 / n2;
        break;
    }

    calcResult.textContent = `Resultado: ${result}`;
    calcResult.className = "text-center text-success";
  }

  btnCalcAdd.addEventListener("click", () => calculate("add"));
  btnCalcSub.addEventListener("click", () => calculate("sub"));
  btnCalcDiv.addEventListener("click", () => calculate("div"));

  // Seletor de Cores
  const colorPreview = document.getElementById("color-preview");
  const btnColorRed = document.getElementById("btn-color-red");
  const btnColorGreen = document.getElementById("btn-color-green");
  const btnColorPurple = document.getElementById("btn-color-purple");
  const btnColorBlue = document.getElementById("btn-color-blue");

  function changeColor(bgColor, textColor, colorName) {
    colorPreview.style.backgroundColor = bgColor;
    colorPreview.style.color = textColor;
    colorPreview.textContent = colorName;
  }

  btnColorRed.addEventListener("click", () => {
    changeColor("#dc2626", "#ffffff", "Vermelho");
  });

  btnColorGreen.addEventListener("click", () => {
    changeColor("#16a34a", "#ffffff", "Verde");
  });

  btnColorPurple.addEventListener("click", () => {
    changeColor("#9333ea", "#ffffff", "Roxo");
  });
  
  btnColorBlue.addEventListener("click", () => {
    changeColor("#1d4ed8", "#ffffff", "Azul");
  });
});