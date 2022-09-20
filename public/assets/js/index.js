"use strict";
let formLogin = document.getElementById('form-login');
const btnLogin = document.getElementById('botaoLogin');
btnLogin.addEventListener('click', () => {
    if (validarCamposLogin()) {
        login();
    }
});
function validarCamposLogin() {
    return formLogin.reportValidity();
}
function limpaCamposLogin() {
    formLogin.reset();
}
function login() {
    let usuarios = pegarUserStorage();
    let email = document.getElementById('email');
    let senha = document.getElementById('password');
    const usuarioEncontrado = usuarios.find((user) => user.email === email.value && user.password === senha.value);
    if (!usuarioEncontrado) {
        ativarMSG();
        limpaCamposLogin();
        return;
    }
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado.email));
    ativarMsgLoading();
}
