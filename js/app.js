/**
 * App — navegação, modal de login, hamburger, toast.
 * Presente em todas as páginas.
 */

// Toast
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Auth modal
const authOverlay = document.getElementById('authOverlay');
const authClose = document.getElementById('authClose');
const loginFormDiv = document.getElementById('loginForm');
const registerFormDiv = document.getElementById('registerForm');

function openAuthModal(showRegister = false) {
  if (!authOverlay) return;
  authOverlay.classList.add('show');
  if (showRegister) {
    loginFormDiv.style.display = 'none';
    registerFormDiv.style.display = 'block';
  } else {
    loginFormDiv.style.display = 'block';
    registerFormDiv.style.display = 'none';
  }
  document.querySelectorAll('.auth-error').forEach(e => e.classList.remove('show'));
}

function closeAuthModal() {
  if (authOverlay) authOverlay.classList.remove('show');
}

// Open login triggers
document.querySelectorAll('#openLogin, #heroLogin, #ctaLogin, #panelLoginBtn').forEach(el => {
  if (el) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (Auth.isLoggedIn()) {
        window.location.href = 'painel.html';
      } else {
        openAuthModal(false);
      }
    });
  }
});

if (authClose) authClose.addEventListener('click', closeAuthModal);

if (authOverlay) {
  authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) closeAuthModal();
  });
}

// Toggle between login / register
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

if (showRegisterBtn) {
  showRegisterBtn.addEventListener('click', () => openAuthModal(true));
}
if (showLoginBtn) {
  showLoginBtn.addEventListener('click', () => openAuthModal(false));
}

// Login form submit
const loginFormEl = document.getElementById('loginFormEl');
const loginError = document.getElementById('loginError');

if (loginFormEl) {
  loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const result = Auth.login(email, password);

    if (result.ok) {
      closeAuthModal();
      showToast('Bem-vinda de volta, ' + result.user.name + '!');
      updateNavForUser();
      setTimeout(() => {
        window.location.href = 'painel.html';
      }, 800);
    } else {
      loginError.textContent = result.error;
      loginError.classList.add('show');
    }
  });
}

// Register form submit
const registerFormEl = document.getElementById('registerFormEl');
const registerError = document.getElementById('registerError');

if (registerFormEl) {
  registerFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const result = Auth.register(name, email, password);

    if (result.ok) {
      closeAuthModal();
      showToast('Conta criada com sucesso! Bem-vinda, ' + result.user.name + '!');
      updateNavForUser();
      setTimeout(() => {
        window.location.href = 'painel.html';
      }, 800);
    } else {
      registerError.textContent = result.error;
      registerError.classList.add('show');
    }
  });
}

// Update nav for logged-in user
function updateNavForUser() {
  const session = Auth.getSession();
  const loginBtn = document.getElementById('openLogin');
  if (loginBtn && session) {
    loginBtn.textContent = 'Meu Painel';
    loginBtn.href = 'painel.html';
  }
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavForUser();
});
