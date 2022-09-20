"use strict";
// -------------- Mensagem validação tela login ----------
const mensagemLogin = document.querySelector('.mensagemInfo');
function ativarMSG() {
    mensagemLogin.style.visibility = 'visible';
    setTimeout(() => {
        mensagemLogin.style.visibility = 'hidden';
    }, 2500);
}
function ativarMsgLoading() {
    const loading = document.querySelector('.loading');
    loading.style.visibility = 'visible';
    setTimeout(() => {
        loading.style.visibility = 'hidden';
        window.location.href = './recado.html';
    }, 1500);
}
// ------- Mensagens validação tela cadastro --------
let mensagemInfo1 = 'E-mail inválido, repita a operação';
let mensagemInfo2 = 'As senhas não conferem, repita a operação';
let mensagemInfo3 = 'Usuário/e-mail já cadastrado!';
let mensagemInfo4 = 'Conta criada com sucesso!';
const mensagemCadErro = document.querySelector('.mensagemInfo2');
const mensagemCadSucesso = document.querySelector('.mensagemInfo3');
function ativarMsgErro(msg) {
    mensagemCadErro.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${msg}`;
    mensagemCadErro.style.visibility = 'visible';
    setTimeout(() => {
        mensagemCadErro.style.visibility = 'hidden';
    }, 2500);
}
function ativarMsgSucesso(msg) {
    mensagemCadSucesso.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    mensagemCadSucesso.style.visibility = 'visible';
    setTimeout(() => {
        mensagemCadSucesso.style.visibility = 'hidden';
    }, 3000);
}
