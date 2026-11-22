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

// Geolocalização do dispositivo + reverse geocode (OpenStreetMap/Nominatim, sem chave)
// Retorna { lat, lng, city, state, address } ou { error }
window.RGGeoLocate = function (onDone) {
  if (!navigator.geolocation) {
    onDone({ error: 'unsupported' });
    return;
  }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    let city = '', state = '', address = '';
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&accept-language=pt-BR`
      );
      const data = await res.json();
      const a = data.address || {};
      city = a.city || a.town || a.municipality || a.village || a.county || '';
      state = a.state_code || a.state || '';
      const road = [a.house_number, a.road || a.pedestrian || a.path].filter(Boolean).join(', ');
      const suburb = a.suburb || a.neighbourhood || a.quarter || '';
      address = [road, suburb, city && state ? `${city}/${state}` : city || state]
        .filter(Boolean).join(', ');
    } catch (err) {
      // Reverse geocode falhou — coordenadas ainda são válidas
    }
    onDone({ lat, lng, city, state, address });
  }, (err) => onDone({ error: err.code }), { timeout: 10000, maximumAge: 60000 });
};

// Botão "Usar minha localização" — preenche cidade/UF + guarda coordenadas em inputs ocultos
// Uso: data-locate="reg" lê regLocation/regLat/regLng | data-locate="profile" lê profileLocation/profileLat/profileLng
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-locate');
  if (!btn) return;

  const prefix = btn.getAttribute('data-locate');
  const locInput = document.getElementById(btn.getAttribute('data-locate-text') || (prefix + 'Location'));
  const latInput = document.getElementById(prefix + 'Lat');
  const lngInput = document.getElementById(prefix + 'Lng');

  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = '⏳';
  showToast('Obtendo sua localização...');

  RGGeoLocate((result) => {
    if (result.error) {
      btn.textContent = original;
      btn.disabled = false;
      showToast(result.error === 'unsupported'
        ? 'Geolocalização não suportada neste navegador. Digite sua cidade manualmente.'
        : 'Não foi possível obter sua localização. Digite manualmente ou verifique a permissão do navegador.');
      return;
    }

    if (latInput) latInput.value = result.lat;
    if (lngInput) lngInput.value = result.lng;
    if (locInput) {
      const cityState = result.city && result.state
        ? `${result.city}, ${result.state}`
        : (result.city || result.state || '');
      // Campos de endereço (ex.: endereço do serviço) recebem a rua completa
      const value = btn.hasAttribute('data-locate-address')
        ? (result.address || cityState)
        : (cityState || result.address);
      if (value) locInput.value = value;
    }

    btn.textContent = '✅';
    showToast('Localização detectada com sucesso!');
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 2000);
  });
});

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
    const phoneInput = document.getElementById('regPhone');
    const locationInput = document.getElementById('regLocation');
    const latInput = document.getElementById('regLat');
    const lngInput = document.getElementById('regLng');
    const result = Auth.register(name, email, password, {
      phone: phoneInput ? phoneInput.value : '',
      location: locationInput ? locationInput.value : '',
      lat: latInput ? latInput.value : null,
      lng: lngInput ? lngInput.value : null
    });

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
