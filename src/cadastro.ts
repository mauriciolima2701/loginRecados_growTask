document.addEventListener("DOMContentLoaded", ()=>{
    if(!localStorage.getItem('usuarios')){
        localStorage.setItem('usuarios', JSON.stringify([]))
    }
})

let emailCad = document.getElementById('emailCad') as HTMLInputElement
let senhaCad = document.getElementById('passwordCad') as HTMLInputElement
let confirmSenhaCad = document.getElementById('passwordCadConfirm') as HTMLInputElement
let formCad = document.getElementById('form-cadastrar') as HTMLFormElement

interface Mensagem{
    id: string,
    descricao: string,
    detalhes: string
}


interface Usuario{
    email: string,
    password: string,
    mensagem: Mensagem[]
}


const btnCadastrar = document.getElementById('botaoCadastrar') as HTMLButtonElement
btnCadastrar.addEventListener('click', ()=>{
    
    if (validarCamposCadastro()) {
        cadastrarUser();
    }
})



function cadastrarUser(): void {
    let listaUser = pegarUserStorage();

    const verificaUserExistente = listaUser.some((user)=> user.email === emailCad.value)

    if (verificaUserExistente) {
        
        ativarMsgErro(mensagemInfo3);
        limparCampo();
        return;
    }
    const criarUsuario: Usuario = {
        email: emailCad.value,
        password: senhaCad.value,
        mensagem: []
    }

    listaUser.push(criarUsuario);
    salvarUserStorage(listaUser);

    ativarMsgSucesso(mensagemInfo4);
    limparCampo();
    trocarContainer();
}



function validarCamposCadastro(): Boolean {
    if (emailCad.value.length < 6){
        
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


function limparCampo(): void {
      formCad.reset();
}

//---- Mover Container para Login ----

function trocarContainer(): void {
    const loginContainer = document.querySelector('.login-container') as HTMLElement
    loginContainer.classList.toggle('trocar')
}




//----- LocalStorage----

function salvarUserStorage(dadosUser: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(dadosUser));
}

function pegarUserStorage(): Usuario[]{
    return JSON.parse(localStorage.getItem('usuarios')!);
}

