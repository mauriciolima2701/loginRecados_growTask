
let formLogin = document.getElementById('form-login') as HTMLFormElement
const btnLogin = document.getElementById('botaoLogin') as HTMLButtonElement

btnLogin.addEventListener('click', ()=>{
    if (validarCamposLogin()) {
        login();
    }
});


interface Usuario{
    email: string,
    password: string,
    mensagem: Mensagem[]
}


function validarCamposLogin(): Boolean {
    return formLogin.reportValidity();
}


function limpaCamposLogin(): void {
    formLogin.reset();
}


function login(): void {
    let usuarios = pegarUserStorage();
    let email = document.getElementById('email') as HTMLInputElement
    let senha = document.getElementById('password') as HTMLInputElement

    const usuarioEncontrado = usuarios.find(
        (user)=> user.email === email.value && user.password === senha.value);
    

    if (!usuarioEncontrado) {
        
        ativarMSG();
        limpaCamposLogin();
        return;
    }
    
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado.email));
    
    ativarMsgLoading();
    
}