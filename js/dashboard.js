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

const professionalNames = [
  'Carla Souza', 'Mariana Ferreira', 'Beatriz Lima',
  'Patrícia Alves', 'Renata Oliveira', 'Aline Costa'
];

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

function randomProfessional() {
  return professionalNames[Math.floor(Math.random() * professionalNames.length)];
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

  let cancelBtn = '';
  if (booking.status !== 'cancelled' && isUpcoming(booking.date)) {
    cancelBtn = `<button class="btn-logout cancel-booking-btn" data-id="${booking.id}" style="font-size:0.8rem;padding:0.35rem 0.8rem;">Cancelar</button>`;
  }

  return `
    <div class="booking-card">
      <div class="booking-info">
        <h4>${booking.service}</h4>
        <p>📅 ${formatDate(booking.date)} — ${booking.time}</p>
        <p>📍 ${booking.address}</p>
        <p>👩‍🔧 Profissional: ${booking.professional}</p>
        <p>💰 Estimativa: <strong>${booking.price || getPrice(booking.service)}</strong></p>
        ${booking.description ? `<p style="margin-top:0.4rem;font-size:0.85rem;color:var(--text-light);">${booking.description}</p>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;">
        <span class="booking-status ${statusClass}">${statusLabel}</span>
        ${cancelBtn}
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

  if (!session) {
    if (dashboardArea) dashboardArea.style.display = 'none';
    if (notLoggedArea) notLoggedArea.style.display = 'block';
    return;
  }

  if (dashboardArea) dashboardArea.style.display = 'block';
  if (notLoggedArea) notLoggedArea.style.display = 'none';

  const userName = document.getElementById('userName');
  if (userName) userName.textContent = session.name.split(' ')[0];

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

  // Show price estimate when service changes
  const bookingServiceSelect = document.getElementById('bookingService');
  const priceEstimateGroup = document.getElementById('priceEstimateGroup');
  const priceEstimateEl = document.getElementById('priceEstimate');

  if (bookingServiceSelect) {
    bookingServiceSelect.addEventListener('change', () => {
      const service = bookingServiceSelect.value;
      if (service && servicePrices[service]) {
        priceEstimateEl.textContent = getPrice(service);
        priceEstimateGroup.style.display = 'block';
      } else {
        priceEstimateGroup.style.display = 'none';
      }
    });
  }

  newBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const session = Auth.getSession();
    if (!session) return;

    const selectedService = document.getElementById('bookingService').value;
    const booking = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId: session.id,
      service: selectedService,
      date: document.getElementById('bookingDate').value,
      time: document.getElementById('bookingTime').value,
      address: document.getElementById('bookingAddress').value,
      description: document.getElementById('bookingDesc').value,
      professional: randomProfessional(),
      price: getPrice(selectedService),
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    saveBooking(booking);
    newBookingForm.reset();
    showToast('Agendamento criado com sucesso! Profissional: ' + booking.professional);

    // Switch to upcoming tab
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    tabBtns[0].classList.add('active');
    document.getElementById('tab-upcoming').classList.add('active');

    renderDashboard();
  });
}

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
