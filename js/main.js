/* ===== MERIGO TRESSES — MAIN JS ===== */

// ---- DATA ----
const SERVICES = [
  { name: "Knotless Braids", price: "¥23,000", icon: "✨", desc: "Lightweight, tension-free braids for a natural, seamless look.", hair: "Hair included" },
  { name: "Box Braids", price: "¥23,000", icon: "🔲", desc: "Classic, timeless box braids with clean parts and perfect uniformity.", hair: "Hair included" },
  { name: "Pick 'n' Drop", price: "¥23,000", icon: "🌿", desc: "Beautifully braided at the roots with loose, flowing ends.", hair: "Hair included" },
  { name: "Goddess Braids", price: "¥23,000", icon: "👑", desc: "Elegant braids with curly leave-outs for a romantic, bohemian vibe.", hair: "Bring your own" },
  { name: "Cornrows Braids", price: "¥18,000", icon: "〰️", desc: "Sleek, neat, and intricate cornrow designs with extensions.", hair: "Hair included" },
  { name: "Fulani Braids", price: "¥18,000", icon: "🌺", desc: "Beautiful tribal-inspired braids with unique pattern details.", hair: "Hair included" },
  { name: "Ghana Braids", price: "¥16,000", icon: "🌟", desc: "Smooth, feed-in cornrows that look natural and sit perfectly flat.", hair: "Check with Mercy" },
  { name: "Kinky Braids", price: "¥20,000", icon: "💫", desc: "Textured, natural-looking braids with a thick and full appearance.", hair: "Bring your own" },
  { name: "Cornrows (Natural Hair)", price: "¥5,000", icon: "🎋", desc: "Simple, elegant cornrows without any added extensions.", hair: "No extensions" },
  { name: "Natural Twist (Short)", price: "¥8,000", icon: "🌀", desc: "Two-strand twists for a healthy, protective natural style.", hair: "Natural hair" },
  { name: "Natural Twist (Long)", price: "¥15,000", icon: "🌊", desc: "Beautiful, elongated two-strand twists for longer natural hair.", hair: "Natural hair" }
];

const GALLERY_IMAGES = [
  { src: "images/IMG_0528.jpg", label: "Kinky Twists" },
  { src: "images/IMG_0529.jpg", label: "Braided Style" },
  { src: "images/IMG_0713_2.jpg", label: "Protective Style" },
  { src: "images/IMG_0718.jpg", label: "Box Braids" },
  { src: "images/IMG_0719_2.jpg", label: "Natural Twists" },
  { src: "images/IMG_0824.jpg", label: "Knotless Braids" },
  { src: "images/IMG_1263.jpg", label: "Cornrows" },
  { src: "images/IMG_2009.jpg", label: "Braided Beauty" },
  { src: "images/IMG_3056.jpg", label: "Goddess Braids" },
  { src: "images/IMG_3057.jpg", label: "Fulani Style" },
  { src: "images/IMG_4649.jpg", label: "Box Braids" },
  { src: "images/IMG_5349.jpg", label: "Pick n Drop" },
  { src: "images/IMG_5974.jpg", label: "Protective Style" },
  { src: "images/IMG_5978.jpg", label: "Braided Look" },
  { src: "images/a6f60c15-cdd0-4488-9e36-58b8efd62252.JPG", label: "Natural Twists" },
  { src: "images/f99e8596-a582-487f-bf02-87517658a134.JPG", label: "Cornrows" }
];

// Japanese public holidays 2024-2026
const JP_HOLIDAYS = new Set([
  "2025-01-01","2025-01-13","2025-02-11","2025-02-23","2025-02-24","2025-03-20",
  "2025-04-29","2025-05-03","2025-05-04","2025-05-05","2025-05-06","2025-07-21",
  "2025-08-11","2025-09-15","2025-09-23","2025-10-13","2025-11-03","2025-11-24",
  "2025-12-23",
  "2026-01-01","2026-01-12","2026-02-11","2026-02-23","2026-03-20",
  "2026-04-29","2026-05-03","2026-05-04","2026-05-05","2026-07-20",
  "2026-08-11","2026-09-21","2026-09-22","2026-09-23","2026-10-12",
  "2026-11-03","2026-11-23"
]);

// Admin-blocked dates (stored in localStorage)
function getBlockedDates() {
  try { return JSON.parse(localStorage.getItem('mt_blocked') || '[]'); } catch { return []; }
}
function saveBlockedDates(arr) {
  localStorage.setItem('mt_blocked', JSON.stringify(arr));
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  buildServices();
  buildGallery();
  buildServiceSelect();
  initDatePicker();
  initNav();
  initLightbox();
  initBookingForm();
  initChat();
  initAdmin();
  initFloatBtns();
});

// ---- NAV ----
function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ---- SERVICES ----
function buildServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-footer">
        <span class="service-price">${s.price}</span>
        <span class="service-hair">${s.hair}</span>
      </div>
      <button class="service-book-btn" onclick="bookStyle('${s.name}')">Book This Style →</button>
    </div>
  `).join('');
}

function bookStyle(name) {
  document.getElementById('service').value = name;
  document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
}

// ---- GALLERY ----
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = GALLERY_IMAGES.map((img, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${img.src}" alt="${img.label}" loading="lazy"
           onerror="this.parentElement.style.display='none'" />
      <div class="gallery-item-overlay">
        <span class="gallery-item-label">${img.label}</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
  });
}

// ---- LIGHTBOX ----
let lbIndex = 0;
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => { lbIndex = (lbIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; updateLightbox(); });
  document.getElementById('lbNext').addEventListener('click', () => { lbIndex = (lbIndex + 1) % GALLERY_IMAGES.length; updateLightbox(); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % GALLERY_IMAGES.length; updateLightbox(); }
  });
}
function openLightbox(i) {
  lbIndex = i;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
function updateLightbox() {
  const img = document.getElementById('lbImg');
  const label = document.getElementById('lbLabel');
  const item = GALLERY_IMAGES[lbIndex];
  img.src = item.src;
  img.alt = item.label;
  if (label) label.textContent = item.label;
}

// ---- SERVICE SELECT ----
function buildServiceSelect() {
  const sel = document.getElementById('service');
  if (!sel) return;
  SERVICES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = `${s.name} — ${s.price}`;
    sel.appendChild(opt);
  });
}

// ---- DATE PICKER ----
function initDatePicker() {
  const input = document.getElementById('apptDate');
  if (!input) return;

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 2);
  input.min = minDate.toISOString().split('T')[0];

  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 6);
  input.max = maxDate.toISOString().split('T')[0];

  input.addEventListener('change', () => {
    const val = input.value;
    if (!val) return;
    const date = new Date(val + 'T00:00:00');
    const day = date.getDay(); // 0=Sun, 6=Sat
    const blocked = getBlockedDates();
    const isWeekend = day === 0 || day === 6;

    if (!isWeekend) {
      alert('Mercy is only available on Saturdays and Sundays. Please choose a weekend date!');
      input.value = '';
      return;
    }
    if (blocked.includes(val)) {
      alert('Sorry, this date is not available. Please choose another weekend!');
      input.value = '';
      return;
    }
  });
}

// ---- BOOKING FORM ----
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      clientName: document.getElementById('clientName').value,
      clientEmail: document.getElementById('clientEmail').value,
      clientPhone: document.getElementById('clientPhone').value,
      contactMethod: document.getElementById('contactMethod').value,
      service: document.getElementById('service').value,
      apptDate: document.getElementById('apptDate').value,
      apptTime: document.getElementById('apptTime').value,
      hairLength: document.getElementById('hairLength').value,
      notes: document.getElementById('notes').value,
    };

    // Send via Formspree (set YOUR Formspree endpoint in the HTML)
    const endpoint = form.dataset.endpoint || '';
    if (!endpoint) {
      // Fallback: show success after short delay (demo mode)
      setTimeout(() => showSuccess(data), 1200);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) { showSuccess(data); }
      else { showError(); }
    } catch {
      showError();
    }
  });
}

function validateForm() {
  const required = ['clientName','clientEmail','clientPhone','contactMethod','service','apptDate','apptTime'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('error');
    if (!el.value) { el.classList.add('error'); valid = false; }
  });
  if (!valid) { alert('Please fill in all required fields.'); }
  return valid;
}

function showSuccess(data) {
  document.getElementById('bookingForm').style.display = 'none';
  const s = document.getElementById('formSuccess');
  s.style.display = 'block';
  s.querySelector('p').innerHTML =
    `Thank you <strong>${data.clientName}</strong>! Your request for <strong>${data.service}</strong> on <strong>${data.apptDate}</strong> has been received. Mercy will confirm via <strong>${data.contactMethod}</strong> soon. Please send your style inspiration photo too!`;
}

function showError() {
  document.getElementById('submitBtn').textContent = 'Request Appointment';
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('formError').style.display = 'block';
}

// ---- AI CHAT ----
const SYSTEM_PROMPT = `You are Meri, the friendly AI assistant for Merigo Tresses — a home-based hair braiding studio in Fukuoka, Japan run by Mercy. You help clients with:
- Information about braiding services and pricing
- Booking appointments (collect: name, service, preferred date/time, phone/WhatsApp/LINE, contact preference)
- Hair care advice for braided styles
- Policies (cash only, cancel 24hrs ahead, send style photo after booking)

Services & Prices:
- Knotless Braids ¥23,000 (hair included)
- Box Braids ¥23,000 (hair included)
- Pick 'n' Drop ¥23,000 (hair included)
- Goddess Braids ¥23,000 (bring own extensions)
- Cornrows ¥18,000 (hair included)
- Fulani Braids ¥18,000 (hair included)
- Ghana Braids ¥16,000
- Kinky Braids ¥20,000 (bring own extensions)
- Cornrows (Natural Hair) ¥5,000
- Natural Twist Short ¥8,000
- Natural Twist Long ¥15,000

Availability: Weekends (Sat & Sun), 10am–6pm, plus Japanese public holidays.
Payment: Cash only at the location.
Cancellation: 24 hours notice required.
WhatsApp: +491706128008 | LINE: +819071019857
Instagram: @merigo_tresses | Location: Fukuoka, Japan

Be warm, helpful and concise. Use the client's name once you know it. When collecting booking info, do it naturally one step at a time. End booking collection by saying Mercy will confirm via their preferred contact method.`;

let chatHistory = [];
let chatReady = true;

function initChat() {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  if (!form || !input) return;

  // Welcome message
  addBotMsg("Hi! I'm Meri 💛 Merigo Tresses' assistant. I can help you with services, pricing, and booking an appointment with Mercy. What can I help you with today?");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg || !chatReady) return;
    input.value = '';
    sendChat(msg);
  });

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.msg;
      sendChat(msg);
    });
  });
}

async function sendChat(msg) {
  addUserMsg(msg);
  chatReady = false;
  showTyping(true);

  chatHistory.push({ role: 'user', content: msg });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: chatHistory
      })
    });

    const data = await res.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again or contact Mercy directly!";
    chatHistory.push({ role: 'assistant', content: reply });
    showTyping(false);
    addBotMsg(reply);
  } catch {
    showTyping(false);
    addBotMsg("Sorry, I'm having trouble connecting right now. Please reach Mercy directly on WhatsApp or LINE! 📱");
  }

  chatReady = true;
}

function addBotMsg(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMsg(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping(show) {
  const t = document.getElementById('typingIndicator');
  if (t) t.style.display = show ? 'block' : 'none';
  if (show) {
    const msgs = document.getElementById('chatMessages');
    msgs.scrollTop = msgs.scrollHeight;
  }
}

// ---- ADMIN ----
function initAdmin() {
  const toggle = document.getElementById('adminToggle');
  const panel = document.getElementById('adminPanel');
  const addBtn = document.getElementById('adminAddBtn');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    renderBlockedList();
  });

  addBtn?.addEventListener('click', () => {
    const input = document.getElementById('adminDateInput');
    const val = input.value;
    if (!val) return;
    const blocked = getBlockedDates();
    if (!blocked.includes(val)) {
      blocked.push(val);
      saveBlockedDates(blocked);
      renderBlockedList();
      input.value = '';
    }
  });
}

function renderBlockedList() {
  const list = document.getElementById('blockedList');
  if (!list) return;
  const blocked = getBlockedDates();
  if (blocked.length === 0) {
    list.innerHTML = '<p style="font-size:0.8rem;color:#7A5C35;padding:0.25rem 0;">No dates blocked.</p>';
    return;
  }
  list.innerHTML = blocked.sort().map(d => `
    <div class="blocked-date">
      <span>${d}</span>
      <button onclick="unblockDate('${d}')" title="Remove">✕</button>
    </div>
  `).join('');
}

function unblockDate(date) {
  const blocked = getBlockedDates().filter(d => d !== date);
  saveBlockedDates(blocked);
  renderBlockedList();
}

// ---- FLOAT BUTTONS ----
function initFloatBtns() {
  // Float buttons are static in HTML, no JS needed
}
