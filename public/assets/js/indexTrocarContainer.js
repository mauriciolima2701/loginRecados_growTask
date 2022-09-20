'use strict'

const loginContainer = document.querySelector('.login-container')
const btnSobreposicaoCadastrar = document.getElementById('btnSobreCadastrar')
const btnSobreposicaoLogar = document.getElementById('btnSobreLogar')

//inputs login e cadastro

const emailHTML = document.getElementById('email')
const senhaHTML = document.getElementById('password')

const emailCadHTML = document.getElementById('emailCad')
const passwordCadHTML = document.getElementById('passwordCad')
const passwordCadConfirmHTML = document.getElementById('passwordCadConfirm')

//---- Mover container ----
btnSobreposicaoCadastrar.addEventListener('click', moverContainer)
btnSobreposicaoLogar.addEventListener('click', moverContainer)

function moverContainer() {
    loginContainer.classList.toggle('trocar')
    emailHTML.value = ''
    senhaHTML.value = ''

    emailCadHTML.value = ''
    passwordCadHTML.value = ''
    passwordCadConfirmHTML.value = ''
}

// --------- No Mobile -----------
document.getElementById('link-mobile-login').addEventListener('click', moverContainer)
document.getElementById('link-mobile-cadastrar').addEventListener('click', moverContainer)