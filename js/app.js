function cadastrar() {
const nome = document.getElementById("nome").value;
const celular = document.getElementById("celular").value;
const senha = document.getElementById("senha").value;
const confirmarSenha = document.getElementById("confirmarSenha").value;

```
if (!nome || !celular || !senha || !confirmarSenha) {
    alert("Preencha todos os campos");
    return;
}

if (senha !== confirmarSenha) {
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

window.location.href = "login.html";
```

}

function login() {
const celular = document.getElementById("loginCelular").value;
const senha = document.getElementById("loginSenha").value;

```
// Login ADM
if (celular === "admin" && senha === "123456") {
    alert("Login de administrador realizado com sucesso!");
    window.location.href = "admin.html";
    return;
}

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    alert("Nenhum usuário cadastrado");
    return;
}

if (usuario.celular === celular && usuario.senha === senha) {

    alert("Login realizado com sucesso!");

    localStorage.setItem("logado", "true");

    window.location.href = "agenda.html";

} else {

    alert("Celular ou senha incorretos");

}
```

}

function salvarFotoCapa() {

```
const arquivo =
    document.getElementById("fotoCapa").files[0];

if (!arquivo) {

    alert("Selecione uma imagem");

    return;
}

const leitor = new FileReader();

leitor.onload = function(e) {

    localStorage.setItem(
        "fotoCapa",
        e.target.result
    );

    const preview =
        document.getElementById("previewFoto");

    if (preview) {

        preview.src = e.target.result;
        preview.style.display = "block";

    }

    alert("Foto salva com sucesso!");

};

leitor.readAsDataURL(arquivo);
```
    // =====================
// NOME DO STUDIO
// =====================

function salvarStudio() {

    const nomeStudio =
        document.getElementById("nomeStudio").value;

    localStorage.setItem(
        "nomeStudio",
        nomeStudio
    );

    alert("Nome salvo com sucesso!");

}

// =====================
// HORÁRIOS
// =====================

let horarios =
    JSON.parse(localStorage.getItem("horarios")) || [];

function adicionarHorario() {

    const data =
        document.getElementById("dataHorario").value;

    const hora =
        document.getElementById("novoHorario").value;

    if (!data || !hora) {

        alert("Selecione a data e o horário");

        return;
    }

    horarios.push({
        data: data,
        hora: hora
    });

    localStorage.setItem(
        "horarios",
        JSON.stringify(horarios)
    );

    carregarHorarios();

    alert("Horário adicionado!");
}

function carregarHorarios() {

    const lista =
        document.getElementById("listaHorarios");

    if (!lista) return;

    lista.innerHTML = "";

    horarios.forEach((item, index) => {

        lista.innerHTML += `
            <li>
                ${item.data} - ${item.hora}

                <button onclick="removerHorario(${index})">
                    Excluir
                </button>
            </li>
        `;
    });
}

function removerHorario(index) {

    horarios.splice(index, 1);

    localStorage.setItem(
        "horarios",
        JSON.stringify(horarios)
    );

    carregarHorarios();
}
    window.onload = function() {

    carregarHorarios();

    const nomeStudio =
        localStorage.getItem("nomeStudio");

    const campoNome =
        document.getElementById("nomeStudio");

    if (campoNome && nomeStudio) {

        campoNome.value = nomeStudio;

    }

    const fotoSalva =
        localStorage.getItem("fotoCapa");

    const preview =
        document.getElementById("previewFoto");

    if (preview && fotoSalva) {

        preview.src = fotoSalva;
        preview.style.display = "block";

    }

};

}
