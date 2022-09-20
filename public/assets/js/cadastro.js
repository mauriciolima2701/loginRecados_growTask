"use strict";
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify([]));
    }
});
let emailCad = document.getElementById('emailCad');
let senhaCad = document.getElementById('passwordCad');
let confirmSenhaCad = document.getElementById('passwordCadConfirm');
let formCad = document.getElementById('form-cadastrar');
const btnCadastrar = document.getElementById('botaoCadastrar');
btnCadastrar.addEventListener('click', () => {
    if (validarCamposCadastro()) {
        cadastrarUser();
    }
});
function cadastrarUser() {
    let listaUser = pegarUserStorage();
    const verificaUserExistente = listaUser.some((user) => user.email === emailCad.value);
    if (verificaUserExistente) {
        ativarMsgErro(mensagemInfo3);
        limparCampo();
        return;
    }
    const criarUsuario = {
        email: emailCad.value,
        password: senhaCad.value,
        mensagem: []
    };
    listaUser.push(criarUsuario);
    salvarUserStorage(listaUser);
    ativarMsgSucesso(mensagemInfo4);
    limparCampo();
    trocarContainer();
}
function validarCamposCadastro() {
    if (emailCad.value.length < 6) {
        ativarMsgErro(mensagemInfo1);
        limparCampo();
        return false;
    }
    if (senhaCad.value !== confirmSenhaCad.value) {
        ativarMsgErro(mensagemInfo2);
        limparCampo();
        return false;
    }
    return formCad.reportValidity();
}
function limparCampo() {
    formCad.reset();
}
//---- Mover Container para Login ----
function trocarContainer() {
    const loginContainer = document.querySelector('.login-container');
    loginContainer.classList.toggle('trocar');
}
//----- LocalStorage----
function salvarUserStorage(dadosUser) {
    localStorage.setItem('usuarios', JSON.stringify(dadosUser));
}
function pegarUserStorage() {
    return JSON.parse(localStorage.getItem('usuarios'));
}
