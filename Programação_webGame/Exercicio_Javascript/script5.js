const quadrado = document.getElementById("quadrado");
const btnVermelho = document.getElementById("btn-vermelho");
const btnVerde = document.getElementById("btn-verde");
const btnAzul = document.getElementById("btn-azul");
const btnRoxo = document.getElementById("btn-roxo");

btnVermelho.onclick = function() {
    quadrado.style.backgroundColor = "#dc2626";
    quadrado.textContent = "Vermelho";
};

btnVerde.onclick = function() {
    quadrado.style.backgroundColor = "#16a34a";
    quadrado.textContent = "Verde";
};

btnAzul.onclick = function() {
    quadrado.style.backgroundColor = "#2563eb";
    quadrado.textContent = "Azul";
};

btnRoxo.onclick = function() {
    quadrado.style.backgroundColor = "#bb4ef6";
    quadrado.textContent = "Roxo";
};