// -------------- Mensagem validação tela login ----------

const mensagemLogin = document.querySelector('.mensagemInfo') as HTMLDivElement

function ativarMSG(): void {

    mensagemLogin.style.visibility = 'visible';

    setTimeout(() => {
        mensagemLogin.style.visibility = 'hidden';
    }, 2500);
}


function ativarMsgLoading(): void {
    const loading = document.querySelector('.loading') as HTMLDivElement

    loading.style.visibility = 'visible'

    setTimeout(() => {
        loading.style.visibility = 'hidden';
        window.location.href = './recado.html'
    }, 1500);
}

// ------- Mensagens validação tela cadastro --------

let mensagemInfo1: string = 'E-mail inválido, repita a operação';
let mensagemInfo2: string = 'As senhas não conferem, repita a operação';
let mensagemInfo3: string = 'Usuário/e-mail já cadastrado!';

let mensagemInfo4: string = 'Conta criada com sucesso!';

const mensagemCadErro = document.querySelector('.mensagemInfo2') as HTMLDivElement
const mensagemCadSucesso = document.querySelector('.mensagemInfo3') as HTMLDivElement

function ativarMsgErro(msg: string): void {

    mensagemCadErro.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${msg}`;
    mensagemCadErro.style.visibility = 'visible';

    setTimeout(() => {
        mensagemCadErro.style.visibility = 'hidden';
    }, 2500);
}


function ativarMsgSucesso(msg: string): void {

    mensagemCadSucesso.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    mensagemCadSucesso.style.visibility = 'visible';
    
    setTimeout(() => {
        mensagemCadSucesso.style.visibility = 'hidden';
    }, 3000);
}
