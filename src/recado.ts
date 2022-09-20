
// -------- Recebe a interface Usuario ------

let dadosUsuarioLogado: Usuario;

// ----- Ao carregar a página realizar esses processos --------
document.addEventListener('DOMContentLoaded', ()=>{

    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')!);

    if (!usuarioLogado) {
        
        window.location.href = './index.html'
    }
    const infoUsuarioLogado = document.querySelector('.nameUserLogado') as HTMLSpanElement
    infoUsuarioLogado.innerText = usuarioLogado;

    let listaUsuarios = buscarTodosUsuarios();

    dadosUsuarioLogado = listaUsuarios.find((user) => user.email === usuarioLogado) as Usuario; // Ou poderia colocar o "!"
    
    mostrarTabela();
})

//----- Sair do sistema -----

const btnSAIR = document.getElementById('btnSAIR') as HTMLButtonElement
btnSAIR.addEventListener('click', logout)

function logout(): string {    
    localStorage.removeItem('usuarioLogado');
    return (window.location.href = './index.html');
}


interface Usuario{
    email: string,
    password: string,
    mensagem: Mensagem[]
}


interface Mensagem{
    id: string,
    descricao: string,
    detalhes: string
}


//---- form, inputs e botao add -----

let inputDescricao = document.getElementById('inputDescricao') as HTMLInputElement
let inputDetalhes = document.getElementById('inputDetalhes') as HTMLInputElement

let formRecado = document.getElementById('formRecado') as HTMLFormElement

let btnADD = document.getElementById('btnAdicionar') as HTMLButtonElement


//---------- validar inputs -----

let msgErroDescricao = document.querySelector('.erroRecado') as HTMLElement
let msgErroDetalhes = document.querySelector('.erroDetalhes') as HTMLElement

inputDetalhes.addEventListener('keyup', validarCamposInput);
inputDescricao.addEventListener('keyup', validarCamposInput);


function validarCamposInput(): Boolean|any{
   
    if (inputDescricao.value.trim().length <= 0) {

        msgErroDescricao.classList.add('visible');
        formRecado.classList.add('was-validated');
        return false;       
    
    }else if (inputDetalhes.value.trim().length <= 0) {
        
        msgErroDetalhes.classList.add('visible');
        formRecado.classList.add('was-validated');
       return false;
   
    }else if (inputDescricao.value.trim().length > 0 || inputDetalhes.value.trim().length > 0){

        msgErroDescricao.classList.remove('visible');
        msgErroDetalhes.classList.remove('visible');
        formRecado.classList.add('was-validated');
        return true;
    }
 
}

// ---- Botao Adicionar recado -----

btnADD.addEventListener('click', ()=>{
    if (validarCamposInput()){

        cadastrarRecado();
        limparCamposInputs(); 
    }
    
})

//------ Cadastrar recado ----

function cadastrarRecado(): void {

    const novoRecado: Mensagem = {
        id: `${Math.floor(Math.random()* (1000-10) + 10)}`,
        descricao: inputDescricao.value,
        detalhes: inputDetalhes.value,
    };

    dadosUsuarioLogado.mensagem.push(novoRecado);
    atualizarDadosUserLogado(dadosUsuarioLogado);
    criarLinhasTabela(novoRecado);
}


// ------- Criando o HTML - tabela recado -----------

let tabelaRecado = document.getElementById('tabelaRecado') as HTMLTableElement;

function criarLinhasTabela(recado: Mensagem): void {

    let novaLinha = document.createElement('tr');
    novaLinha.setAttribute('id', recado.id);

    let idLinha = document.createElement('th');
    idLinha.innerHTML = recado.id;

    let recadoDescricao = document.createElement('td');
    recadoDescricao.innerHTML = recado.descricao;

    let recadoDetalhes = document.createElement('td');
    recadoDetalhes.innerHTML = recado.detalhes;

    let acoesEditar = document.createElement('td');
    acoesEditar.classList.add('p-1', 'btnTable');
    
    let acoesApagar = document.createElement('td');
    acoesApagar.classList.add('p-1', 'btnTable');
    
    let botaoEditar = document.createElement('button');
    botaoEditar.classList.add('btn', 'btn-success');
    botaoEditar.setAttribute('data-bs-toggle', 'modal');
    botaoEditar.setAttribute('data-bs-target','#modalEditar');
    botaoEditar.innerText = 'Editar';
    botaoEditar.addEventListener('click', ()=>{
        editarRecado(recado);
    })

    let botaoApagar = document.createElement('button');
    botaoApagar.classList.add('btn','btn-danger');
    botaoApagar.setAttribute('data-bs-toggle', 'modal');
    botaoApagar.setAttribute('data-bs-target','#modalExcluir');
    botaoApagar.innerText = 'Excluir';
    botaoApagar.addEventListener('click', () =>{
        excluirRecado(recado.id);  
    } )

    acoesEditar.appendChild(botaoEditar);
    acoesApagar.appendChild(botaoApagar);
    novaLinha.appendChild(idLinha);
    novaLinha.appendChild(recadoDescricao);
    novaLinha.appendChild(recadoDetalhes);
    novaLinha.appendChild(acoesEditar);
    novaLinha.appendChild(acoesApagar);
    tabelaRecado.appendChild(novaLinha);
}

// ------ Listar tabela -----

const mostrarTabela = (): void =>{

    dadosUsuarioLogado.mensagem.forEach((recado)=> criarLinhasTabela(recado));
}


//------- Editar Recado -----

const inputDescricaoEDIT = document.getElementById('descricaoEditar') as HTMLInputElement
const inputDetalhesEDIT = document.getElementById('detalhesEditar') as HTMLInputElement

const btnSalvarEDIT = document.getElementById('salvarEditRecado') as HTMLButtonElement

function editarRecado(recado: Mensagem): void {
    
    inputDescricaoEDIT.value = recado.descricao;
    inputDetalhesEDIT.value = recado.detalhes;    
        
    btnSalvarEDIT.addEventListener('click', ()=>{
        recado.descricao = inputDescricaoEDIT.value;
        recado.detalhes = inputDetalhesEDIT.value;
                
        atualizarDadosUserLogado(dadosUsuarioLogado);
        limparTabela();
        mostrarTabela();
        window.location.reload();
    })

}


// ------ Limpar tabela -------

const limparTabela = (): void => {
    let linhasTabela = document.querySelectorAll('#tabelaRecado > tr')
    linhasTabela.forEach(linhasTabela => linhasTabela.parentNode?.removeChild(linhasTabela));
}


//-------- Excluir Recado -------
let btnModalExcluir = document.getElementById('excluirRecado') as HTMLButtonElement

function excluirRecado(identificador: string): void {
    
    let excluirRecado = dadosUsuarioLogado.mensagem.filter((recadoExcluido)=> recadoExcluido.id !== identificador)
        
    btnModalExcluir.addEventListener('click', ()=>{
        
        dadosUsuarioLogado.mensagem = excluirRecado;
        atualizarDadosUserLogado(dadosUsuarioLogado);
        limparTabela();
        mostrarTabela();
    });
}



function limparCamposInputs(): void {  
    formRecado.reset();
    formRecado.classList.remove('was-validated')
}


// ------ Atualizar dados do usuário logado / usuarios -------

function atualizarDadosUserLogado(dadosAtualizados: Usuario): void {
    let listaUsuarios = buscarTodosUsuarios();
    let indiceUserEncontrado = listaUsuarios.findIndex((user)=> user.email === dadosAtualizados.email)

    listaUsuarios[indiceUserEncontrado] = dadosAtualizados;

    atualizarStorage(listaUsuarios);
}


//------- LocalStorage -------

function buscarTodosUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem('usuarios')!)    
}


function atualizarStorage(listaDados: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}