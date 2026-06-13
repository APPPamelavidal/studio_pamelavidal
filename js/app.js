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

    window.location.href = "login.html";
}
