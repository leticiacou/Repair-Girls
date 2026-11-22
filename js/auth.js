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

  function buildSession(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      photo: user.photo || '',
      lat: user.lat != null ? user.lat : null,
      lng: user.lng != null ? user.lng : null,
      createdAt: user.createdAt
    };
  }

  function register(name, email, password, extra = {}) {
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
      phone: (extra.phone || '').trim(),
      location: (extra.location || '').trim(),
      photo: extra.photo || '',
      lat: extra.lat != null ? parseFloat(extra.lat) : null,
      lng: extra.lng != null ? parseFloat(extra.lng) : null,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);

    const session = buildSession(user);
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

    const session = buildSession(user);
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

  function getUser() {
    const session = getSession();
    if (!session) return null;
    const user = getUsers().find(u => u.id === session.id);
    return user ? buildSession(user) : session;
  }

  function updateProfile(patch) {
    const session = getSession();
    if (!session) return { ok: false, error: 'Sessão expirada.' };

    const users = getUsers();
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return { ok: false, error: 'Usuária não encontrada.' };

    const allowed = ['name', 'phone', 'location', 'photo', 'lat', 'lng'];
    allowed.forEach(key => {
      if (patch[key] !== undefined) users[idx][key] = patch[key];
    });
    if (users[idx].lat !== undefined && users[idx].lat !== null && users[idx].lat !== '') {
      users[idx].lat = parseFloat(users[idx].lat);
    }
    if (users[idx].lng !== undefined && users[idx].lng !== null && users[idx].lng !== '') {
      users[idx].lng = parseFloat(users[idx].lng);
    }
    if (users[idx].name) users[idx].name = users[idx].name.trim();

    saveUsers(users);

    const newSession = buildSession(users[idx]);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    return { ok: true, user: newSession };
  }

  function isLoggedIn() {
    return getSession() !== null;
  }

  return { register, login, logout, getSession, getUser, updateProfile, isLoggedIn };
})();
