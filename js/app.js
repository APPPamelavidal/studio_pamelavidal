// =====================
// TOAST (substitui alert)
// =====================
function toast(msg, tipo = 'ok') {
  const container = document.getElementById('toast-container');
  if (!container) { alert(msg); return; }
  const div = document.createElement('div');
  div.className = `toast ${tipo}`;
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), 3500);
}

// =====================
// CADASTRO
// =====================
function cadastrar() {
  const nome          = document.getElementById('nome').value.trim();
  const celular       = document.getElementById('celular').value.trim();
  const senha         = document.getElementById('senha').value;
  const confirmarSenha= document.getElementById('confirmarSenha').value;

  if (!nome || !celular || !senha || !confirmarSenha) {
    toast('Preencha todos os campos', 'err'); return;
  }
  if (senha.length < 4) {
    toast('Senha deve ter ao menos 4 caracteres', 'err'); return;
  }
  if (senha !== confirmarSenha) {
    toast('As senhas não conferem', 'err'); return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (usuarios.find(u => u.celular === celular)) {
    toast('Já existe uma conta com esse celular', 'err'); return;
  }

  usuarios.push({ nome, celular, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  toast('Conta criada! Redirecionando...', 'ok');
  setTimeout(() => window.location.href = 'login.html', 1200);
}

// =====================
// LOGIN
// =====================
function login() {
  const celular = document.getElementById('loginCelular').value.trim();
  const senha   = document.getElementById('loginSenha').value;

  if (!celular || !senha) {
    toast('Preencha celular e senha', 'err'); return;
  }

  // Admin
  if (celular === 'admin' && senha === '123456') {
    localStorage.setItem('isAdmin', 'true');
    toast('Bem-vinda, admin! ✨', 'ok');
    setTimeout(() => window.location.href = 'admin.html', 900);
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuario  = usuarios.find(u => u.celular === celular && u.senha === senha);

  if (usuario) {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    toast('Bem-vinda, ' + usuario.nome + '! 💕', 'ok');
    setTimeout(() => window.location.href = 'agenda.html', 900);
  } else {
    toast('Celular ou senha incorretos', 'err');
  }
}

// =====================
// GOOGLE SHEETS — chamada ao agendar
// =====================
function enviarParaGoogleSheets(agendamento) {
  const url = localStorage.getItem('sheetsUrl');
  if (!url) return; // sem URL configurada, ignora silenciosamente

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agendamento)
  }).catch(() => {
    // falha silenciosa — o agendamento já está salvo localmente
  });
}

// =====================
// ENTER para submeter forms
// =====================
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (document.getElementById('loginCelular') || document.getElementById('loginSenha')) {
    if (typeof login === 'function') login();
  }
  if (document.getElementById('confirmarSenha')) {
    if (typeof cadastrar === 'function') cadastrar();
  }
});
