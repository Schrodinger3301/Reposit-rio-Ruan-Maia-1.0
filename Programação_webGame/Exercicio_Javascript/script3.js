const inputNome =document.getElementById("campo-nome");
const btnOla =document.getElementById("btn-ola");
const textoMensagem = document.getElementById("mensagem");

btnOla.onclick=function(){
    const nome = inputNome.value;

    if(nome ===""){
        textoMensagem.textContent="Porfavor.digite um nome!";
    }else{
        textoMensagem.textContent="Ola," + nome + "! Seja bem-vindo!";
        inputNome.value="";//Limpa o campo
    }
}