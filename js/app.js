function cadastrar() {
    const nome = document.getElementById("nome").value;
    const celular = document.getElementById("celular").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (!nome || !celular || !senha || !confirmarSenha) {
        alert("Preencha todos os campos");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não conferem");
        return;
    }

    // Salva lista de usuários (não sobrescreve)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const jaExiste = usuarios.find(u => u.celular === celular);
    if (jaExiste) {
        alert("Já existe um usuário cadastrado com esse celular");
        return;
    }

    usuarios.push({ nome, celular, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}

function login() {
    const celular = document.getElementById("loginCelular").value;
    const senha = document.getElementById("loginSenha").value;

    // Login ADM
    if (celular === "admin" && senha === "123456") {
        alert("Login de administrador realizado com sucesso!");
        window.location.href = "admin.html";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
        alert("Nenhum usuário cadastrado");
        return;
    }

    const usuario = usuarios.find(u => u.celular === celular && u.senha === senha);

    if (usuario) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("logado", "true");
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "agenda.html";
    } else {
        alert("Celular ou senha incorretos");
    }
}

// =====================
// FOTO DE CAPA
// =====================

function salvarFotoCapa() {
    const arquivo = document.getElementById("fotoCapa").files[0];

    if (!arquivo) {
        alert("Selecione uma imagem");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(e) {
        localStorage.setItem("fotoCapa", e.target.result);

        const preview = document.getElementById("previewFoto");
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = "block";
        }

        alert("Foto salva com sucesso!");
    };

    leitor.readAsDataURL(arquivo);
}

// =====================
// NOME DO STUDIO
// =====================

function salvarStudio() {
    const campoNome = document.getElementById("nomeStudio");

    if (!campoNome) {
        alert("Campo não encontrado");
        return;
    }

    const nomeStudio = campoNome.value.trim();

    if (!nomeStudio) {
        alert("Digite um nome para o studio");
        return;
    }

    localStorage.setItem("nomeStudio", nomeStudio);
    alert("Nome salvo com sucesso!");
}

// =====================
// HORÁRIOS
// =====================

let horarios = JSON.parse(localStorage.getItem("horarios")) || [];

function adicionarHorario() {
    const data = document.getElementById("dataHorario").value;
    const hora = document.getElementById("novoHorario").value;

    if (!data || !hora) {
        alert("Selecione a data e o horário");
        return;
    }

    // Evita duplicatas
    const duplicado = horarios.find(h => h.data === data && h.hora === hora);
    if (duplicado) {
        alert("Esse horário já foi adicionado");
        return;
    }

    horarios.push({ data, hora });
    localStorage.setItem("horarios", JSON.stringify(horarios));
    carregarHorarios();
    alert("Horário adicionado!");
}

function carregarHorarios() {
    const lista = document.getElementById("listaHorarios");
    if (!lista) return;

    lista.innerHTML = "";

    horarios.forEach((item, index) => {
        lista.innerHTML += `
            <li>
                ${item.data} - ${item.hora}
                <button onclick="removerHorario(${index})">Excluir</button>
            </li>
        `;
    });
}

function removerHorario(index) {
    // Usa filter para evitar problemas de índice com splice
    horarios = horarios.filter((_, i) => i !== index);
    localStorage.setItem("horarios", JSON.stringify(horarios));
    carregarHorarios();
}

// =====================
// INICIALIZAÇÃO
// =====================

window.onload = function() {
    carregarHorarios();

    const nomeStudio = localStorage.getItem("nomeStudio");
    const campoNome = document.getElementById("nomeStudio");

    // Só preenche se for um input/textarea (não sobrescreve outros elementos)
    if (campoNome && nomeStudio && (campoNome.tagName === "INPUT" || campoNome.tagName === "TEXTAREA")) {
        campoNome.value = nomeStudio;
    }

    const fotoSalva = localStorage.getItem("fotoCapa");
    const preview = document.getElementById("previewFoto");

    if (preview && fotoSalva) {
        preview.src = fotoSalva;
        preview.style.display = "block";
    }
};
