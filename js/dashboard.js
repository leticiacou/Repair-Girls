/**
 * Dashboard — agendamentos (localStorage).
 * Somente usado em painel.html.
 */

const BOOKINGS_KEY = 'rg_bookings';

function getBookings(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    return all.filter(b => b.userId === userId);
  } catch {
    return [];
  }
}

function saveBooking(booking) {
  try {
    const all = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    all.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
  } catch {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([booking]));
  }
}

function cancelBooking(bookingId) {
  try {
    let all = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    all = all.map(b => {
      if (b.id === bookingId) b.status = 'cancelled';
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

const servicePrices = {
  'Elétrica': { base: 120, max: 350 },
  'Hidráulica': { base: 150, max: 400 },
  'Pintura': { base: 200, max: 600 },
  'Montagem de Móveis': { base: 100, max: 300 },
  'Reparos Gerais': { base: 90, max: 250 },
  'Manutenção Preventiva': { base: 250, max: 500 }
};

function getPrice(service) {
  const p = servicePrices[service];
  if (!p) return 'Consultar';
  return 'R$ ' + p.base + ' – R$ ' + p.max;
}

function resolveProfessional(booking) {
  if (booking.professionalId) {
    const byId = Professionals.getById(booking.professionalId);
    if (byId) return byId;
  }
  return Professionals.getByName(booking.professional);
}

function formatDate(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }
  return dateStr;
}

function isUpcoming(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(dateStr + 'T00:00:00');
  return bookingDate >= today;
}

function renderBookingCard(booking) {
  const statusClass = booking.status === 'cancelled'
    ? 'status-cancelled'
    : isUpcoming(booking.date)
      ? 'status-upcoming'
      : 'status-completed';

  const statusLabel = booking.status === 'cancelled'
    ? 'Cancelado'
    : isUpcoming(booking.date)
      ? 'Agendado'
      : 'Concluído';

  const pro = resolveProfessional(booking);
  const proName = pro ? pro.name : (booking.professional || 'A definir');
  const proRating = pro ? ` <span class="pro-mini-rating">★ ${pro.rating.toFixed(1)}</span>` : '';

  let actionBtns = '';
  if (pro) {
    actionBtns += `<button class="btn-logout ver-perfil-btn" data-professional-id="${pro.id}" style="font-size:0.8rem;padding:0.35rem 0.8rem;">Ver perfil</button>`;
  }
  if (booking.status !== 'cancelled' && isUpcoming(booking.date)) {
    actionBtns += `<button class="btn-logout cancel-booking-btn" data-id="${booking.id}" style="font-size:0.8rem;padding:0.35rem 0.8rem;">Cancelar</button>`;
  }

  return `
    <div class="booking-card">
      <div class="booking-info">
        <h4>${booking.service}</h4>
        <p>📅 ${formatDate(booking.date)} — ${booking.time}</p>
        <p>📍 ${booking.address}</p>
        <p>👩‍🔧 Profissional: <strong>${proName}</strong>${proRating}</p>
        <p>💰 Estimativa: <strong>${booking.price || getPrice(booking.service)}</strong></p>
        ${booking.description ? `<p style="margin-top:0.4rem;font-size:0.85rem;color:var(--text-light);">${booking.description}</p>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;">
        <span class="booking-status ${statusClass}">${statusLabel}</span>
        ${actionBtns}
      </div>
    </div>
  `;
}

function renderEmptyState(message) {
  return `
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <p>${message}</p>
    </div>
  `;
}

function renderDashboard() {
  const session = Auth.getSession();
  const dashboardArea = document.getElementById('dashboardArea');
  const notLoggedArea = document.getElementById('notLoggedArea');
  const profileArea = document.getElementById('profileArea');
  if (profileArea) profileArea.style.display = 'none';

  if (!session) {
    if (dashboardArea) dashboardArea.style.display = 'none';
    if (notLoggedArea) notLoggedArea.style.display = 'block';
    return;
  }

  if (dashboardArea) dashboardArea.style.display = 'block';
  if (notLoggedArea) notLoggedArea.style.display = 'none';

  const userName = document.getElementById('userName');
  if (userName) userName.textContent = session.name.split(' ')[0];

  // Avatar no cabeçalho do painel
  const userAvatar = document.getElementById('userAvatar');
  const me = Auth.getUser();
  if (userAvatar && me) {
    if (me.photo) {
      userAvatar.style.backgroundImage = `url("${me.photo}")`;
      userAvatar.textContent = '';
    } else {
      userAvatar.style.backgroundImage = 'none';
      userAvatar.textContent = me.name.charAt(0).toUpperCase();
    }
  }

  renderProfile();

  const bookings = getBookings(session.id);
  const upcoming = bookings.filter(b => b.status !== 'cancelled' && isUpcoming(b.date));
  const past = bookings.filter(b => b.status === 'cancelled' || !isUpcoming(b.date));

  const upcomingList = document.getElementById('upcomingList');
  const pastList = document.getElementById('pastList');

  if (upcomingList) {
    upcomingList.innerHTML = upcoming.length
      ? upcoming.map(renderBookingCard).join('')
      : renderEmptyState('Nenhum agendamento futuro. Que tal agendar um serviço?');
  }

  if (pastList) {
    pastList.innerHTML = past.length
      ? past.map(renderBookingCard).join('')
      : renderEmptyState('Nenhum agendamento anterior ainda.');
  }

  // Cancel buttons
  document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
        cancelBooking(id);
        showToast('Agendamento cancelado.');
        renderDashboard();
      }
    });
  });
}

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + tab);
    if (target) target.classList.add('active');
  });
});

// Booking form
const newBookingForm = document.getElementById('newBookingForm');
if (newBookingForm) {
  // Set min date to today
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Show price estimate + professionals when service changes
  const bookingServiceSelect = document.getElementById('bookingService');
  const priceEstimateGroup = document.getElementById('priceEstimateGroup');
  const priceEstimateEl = document.getElementById('priceEstimate');

  function updateProfessionalPicker(service) {
    const group = document.getElementById('professionalPickerGroup');
    const picker = document.getElementById('professionalPicker');
    if (!group || !picker) return;

    const qualified = Professionals.getQualifiedFor(service);
    if (!service || !qualified.length) {
      group.style.display = 'none';
      picker.innerHTML = '';
      return;
    }

    // Ordena por proximidade: GPS (km real) > mesma cidade > mesmo estado > demais
    const me = Auth.getUser();
    const userLoc = me && me.location ? me.location : '';
    const hasCoords = me && me.lat != null && me.lng != null;

    const nearCity = [], nearState = [], far = [];
    let ordered;
    if (hasCoords) {
      ordered = qualified
        .map(p => ({ p, d: Professionals.distanceKm(p, me.lat, me.lng) }))
        .sort((a, b) => a.d - b.d)
        .map(x => x.p);
    } else {
      if (userLoc) {
        qualified.forEach(p => {
          const tier = Professionals.proximityTier(p, userLoc);
          if (tier === 2) nearCity.push(p);
          else if (tier === 1) nearState.push(p);
          else far.push(p);
        });
      }
      const hasNear = nearCity.length + nearState.length > 0;
      ordered = hasNear ? [...nearCity, ...nearState, ...far] : qualified;
    }
    const hasNear = !hasCoords && (nearCity.length + nearState.length > 0);

    const hint = document.getElementById('professionalPickerHint');
    if (hint) {
      hint.textContent = hasCoords
        ? '📍 Ordenado pela distância real da sua localização (GPS). Toque em 📍 no perfil para atualizar.'
        : hasNear
          ? '📍 Ordenado pela proximidade da sua localização.'
          : userLoc
            ? 'Nenhuma profissional na sua cidade ou estado ainda — estas são as opções mais próximas.'
            : 'Escolha uma profissional ou deixe a Repair Girls escolher para você.';
    }

    const badgeFor = (p) => {
      if (hasCoords) {
        const d = Professionals.distanceKm(p, me.lat, me.lng);
        return d != null ? ` <span class="pro-nearby-badge">📍 ~${Math.round(d)} km</span>` : '';
      }
      if (!userLoc) return '';
      const tier = Professionals.proximityTier(p, userLoc);
      if (tier === 2) return ' <span class="pro-nearby-badge">📍 Na sua cidade</span>';
      if (tier === 1) return ' <span class="pro-nearby-badge pro-state-badge">🗺️ Mesmo estado</span>';
      return '';
    };

    const renderOption = (p) => `
      <label class="pro-option">
        <input type="radio" name="proChoice" value="${p.id}" />
        <img class="pro-option-img" src="${p.photo}" alt="Foto de ${p.name}" loading="lazy" />
        <div class="pro-option-text">
          <div class="pro-opt-name">${p.name} <span class="pro-mini-rating">★ ${p.rating.toFixed(1)}</span>${badgeFor(p)}</div>
          <div class="pro-opt-sub">${p.specialty} · ${p.city}/${p.state} · ${p.servicesDone} serviços</div>
        </div>
        <button type="button" class="pro-opt-profile" data-professional-id="${p.id}">Ver perfil</button>
      </label>`;

    let optionsHtml;
    if (hasCoords) {
      optionsHtml = ordered.map(renderOption).join('');
    } else if (hasNear) {
      optionsHtml = [...nearCity, ...nearState].map(renderOption).join('');
      if (far.length) {
        optionsHtml += '<div class="pro-divider">Outras opções</div>' + far.map(renderOption).join('');
      }
    } else {
      optionsHtml = qualified.map(renderOption).join('');
    }

    group.style.display = 'block';
    picker.innerHTML = `
      <label class="pro-option">
        <input type="radio" name="proChoice" value="auto" checked />
        <div class="pro-option-auto">✨</div>
        <div class="pro-option-text">
          <div class="pro-opt-name">Automático</div>
          <div class="pro-opt-sub">A Repair Girls escolhe a melhor profissional disponível na sua região</div>
        </div>
      </label>
      ${optionsHtml}
    `;
  }

  if (bookingServiceSelect) {
    bookingServiceSelect.addEventListener('change', () => {
      const service = bookingServiceSelect.value;
      if (service && servicePrices[service]) {
        priceEstimateEl.textContent = getPrice(service);
        priceEstimateGroup.style.display = 'block';
      } else {
        priceEstimateGroup.style.display = 'none';
      }
      updateProfessionalPicker(service);
    });
  }

  newBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const session = Auth.getSession();
    if (!session) return;

    const selectedService = document.getElementById('bookingService').value;
    const choice = document.querySelector('#professionalPicker input[name="proChoice"]:checked');
    const me2 = Auth.getUser();
    const pro = Professionals.pickForService(
      selectedService,
      choice && choice.value !== 'auto' ? choice.value : null,
      me2 && me2.location ? me2.location : '',
      me2 && me2.lat != null ? me2.lat : null,
      me2 && me2.lng != null ? me2.lng : null
    );

    const lat = parseFloat(document.getElementById('bookingLat').value) || null;
    const lng = parseFloat(document.getElementById('bookingLng').value) || null;

    const booking = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId: session.id,
      service: selectedService,
      date: document.getElementById('bookingDate').value,
      time: document.getElementById('bookingTime').value,
      address: document.getElementById('bookingAddress').value,
      lat,
      lng,
      description: document.getElementById('bookingDesc').value,
      professional: pro.name,
      professionalId: pro.id,
      price: getPrice(selectedService),
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    saveBooking(booking);
    newBookingForm.reset();
    updateProfessionalPicker('');
    document.getElementById('priceEstimateGroup').style.display = 'none';
    showToast('Agendamento criado com sucesso! Profissional: ' + pro.name);

    // Switch to upcoming tab
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    tabBtns[0].classList.add('active');
    document.getElementById('tab-upcoming').classList.add('active');

    renderDashboard();
  });
}

// ===== Perfil da usuária =====
const profileForm = document.getElementById('profileForm');
let profilePhotoData = '';

function setAvatar(el, photo, name) {
  if (!el) return;
  if (photo) {
    el.style.backgroundImage = `url("${photo}")`;
    el.textContent = '';
  } else {
    el.style.backgroundImage = 'none';
    el.textContent = (name || '?').charAt(0).toUpperCase();
  }
}

function renderProfile() {
  const user = Auth.getUser();
  if (!user) return;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('profileName', user.name);
  setVal('profileEmail', user.email);
  setVal('profilePhone', user.phone);
  setVal('profileLocation', user.location);
  setVal('profileLat', user.lat != null ? user.lat : '');
  setVal('profileLng', user.lng != null ? user.lng : '');
  setVal('profilePhotoUrl', user.photo && !user.photo.startsWith('data:') ? user.photo : '');
  profilePhotoData = user.photo && user.photo.startsWith('data:') ? user.photo : '';

  setAvatar(document.getElementById('profileAvatar'), user.photo, user.name);

  const displayName = document.getElementById('profileDisplayName');
  if (displayName) displayName.textContent = user.name;
  const displayEmail = document.getElementById('profileDisplayEmail');
  if (displayEmail) displayEmail.textContent = user.email;
  const memberSince = document.getElementById('profileMemberSince');
  if (memberSince && user.createdAt) {
    memberSince.textContent = 'Cliente desde ' + new Date(user.createdAt).toLocaleDateString('pt-BR');
  }
}

function fileToDataUrl(file, cb) {
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const side = Math.min(img.width, img.height);
    ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
    URL.revokeObjectURL(url);
    cb(canvas.toDataURL('image/jpeg', 0.85));
  };
  img.src = url;
}

const profilePhotoFile = document.getElementById('profilePhotoFile');
if (profilePhotoFile) {
  profilePhotoFile.addEventListener('change', () => {
    const file = profilePhotoFile.files[0];
    if (!file) return;
    fileToDataUrl(file, (dataUrl) => {
      profilePhotoData = dataUrl;
      const urlInput = document.getElementById('profilePhotoUrl');
      if (urlInput) urlInput.value = '';
      const me = Auth.getUser();
      setAvatar(document.getElementById('profileAvatar'), dataUrl, me ? me.name : '');
      showToast('Foto selecionada! Não esqueça de salvar o perfil.');
    });
  });
}

const profilePhotoUrlInput = document.getElementById('profilePhotoUrl');
if (profilePhotoUrlInput) {
  profilePhotoUrlInput.addEventListener('input', () => {
    const val = profilePhotoUrlInput.value.trim();
    if (val) {
      profilePhotoData = '';
      const me = Auth.getUser();
      setAvatar(document.getElementById('profileAvatar'), val, me ? me.name : '');
    }
  });
}

if (profileForm) {
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const photoUrl = document.getElementById('profilePhotoUrl').value.trim();
    const result = Auth.updateProfile({
      name: document.getElementById('profileName').value,
      phone: document.getElementById('profilePhone').value,
      location: document.getElementById('profileLocation').value,
      photo: profilePhotoData || photoUrl,
      lat: parseFloat(document.getElementById('profileLat').value) || null,
      lng: parseFloat(document.getElementById('profileLng').value) || null
    });

    if (result.ok) {
      showToast('Perfil atualizado com sucesso!');
      renderDashboard();
    } else {
      showToast(result.error || 'Não foi possível salvar o perfil.');
    }
  });
}

// Perfil — área separada, fora das abas de agendamento
const profileBtn = document.getElementById('profileBtn');
const profileBackBtn = document.getElementById('profileBackBtn');
const profileAreaEl = document.getElementById('profileArea');

function showProfileView() {
  if (!profileAreaEl) return;
  renderProfile();
  const dashboardArea = document.getElementById('dashboardArea');
  if (dashboardArea) dashboardArea.style.display = 'none';
  profileAreaEl.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDashboardView() {
  if (profileAreaEl) profileAreaEl.style.display = 'none';
  const dashboardArea = document.getElementById('dashboardArea');
  if (dashboardArea) dashboardArea.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (profileBtn) profileBtn.addEventListener('click', showProfileView);
if (profileBackBtn) profileBackBtn.addEventListener('click', showDashboardView);

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    Auth.logout();
    showToast('Você saiu da sua conta.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();

  // Panel login button
  const panelLoginBtn = document.getElementById('panelLoginBtn');
  if (panelLoginBtn) {
    panelLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal(false);
    });
  }
});
