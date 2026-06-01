/**
 * Auth module — JS puro, localStorage como "banco de dados".
 * Armazena usuários em localStorage['rg_users'] (array JSON).
 * Sessão ativa em localStorage['rg_session'] (objeto JSON).
 */

const Auth = (() => {
  const USERS_KEY = 'rg_users';
  const SESSION_KEY = 'rg_session';

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function register(name, email, password) {
    const users = getUsers();
    const emailLower = email.toLowerCase().trim();

    if (users.find(u => u.email === emailLower)) {
      return { ok: false, error: 'Já existe uma conta com este e-mail.' };
    }

    if (password.length < 6) {
      return { ok: false, error: 'A senha deve ter pelo menos 6 caracteres.' };
    }

    const user = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name.trim(),
      email: emailLower,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { ok: true, user: session };
  }

  function login(email, password) {
    const users = getUsers();
    const emailLower = email.toLowerCase().trim();
    const user = users.find(u => u.email === emailLower && u.password === password);

    if (!user) {
      return { ok: false, error: 'E-mail ou senha incorretos.' };
    }

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, user: session };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  function isLoggedIn() {
    return getSession() !== null;
  }

  return { register, login, logout, getSession, isLoggedIn };
})();
