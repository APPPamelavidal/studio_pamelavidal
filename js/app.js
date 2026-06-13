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

    const usuario = {
        nome,
        celular,
        senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

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
}
