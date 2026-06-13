function cadastrar() {

    const nome = document.getElementById("nome").value;
    const celular = document.getElementById("celular").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if(!nome || !celular || !senha || !confirmarSenha){
        alert("Preencha todos os campos");
        return;
    }

    if(senha !== confirmarSenha){
        alert("As senhas não conferem");
        return;
    }

    const usuario = {
        nome,
        celular,
        senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso!");
    function login() {

    const celular = document.getElementById("loginCelular").value;
    const senha = document.getElementById("loginSenha").value;

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        alert("Nenhum usuário cadastrado");
        return;
    }

    if(
        usuario.celular === celular &&
        usuario.senha === senha
    ){
        alert("Login realizado com sucesso!");

        localStorage.setItem("logado", "true");

        window.location.href = "agenda.html";
    } else {

        alert("Celular ou senha incorretos");

    }

}
    let horarios = JSON.parse(
    localStorage.getItem("horarios")
) || [];

function salvarStudio(){

    const nomeStudio =
        document.getElementById("nomeStudio").value;

    localStorage.setItem(
        "nomeStudio",
        nomeStudio
    );

    alert("Nome salvo!");
}

function adicionarHorario(){

    const horario =
        document.getElementById("novoHorario").value;

    if(!horario){
        alert("Escolha um horário");
        return;
    }

    horarios.push(horario);

    localStorage.setItem(
        "horarios",
        JSON.stringify(horarios)
    );

    carregarHorarios();
}

function carregarHorarios(){

    const lista =
        document.getElementById("listaHorarios");

    if(!lista) return;

    lista.innerHTML = "";

    horarios.forEach((horario, index)=>{

        lista.innerHTML += `
            <li>
                ${horario}
                <button onclick="removerHorario(${index})">
                    Excluir
                </button>
            </li>
        `;

    });

}

function removerHorario(index){

    horarios.splice(index,1);

    localStorage.setItem(
        "horarios",
        JSON.stringify(horarios)
    );

    carregarHorarios();
}

window.onload = function(){

    carregarHorarios();

    const nomeStudio =
        localStorage.getItem("nomeStudio");

    const campo =
        document.getElementById("nomeStudio");

    if(campo && nomeStudio){

        campo.value = nomeStudio;

    }

}

    window.location.href = "login.html";
}
