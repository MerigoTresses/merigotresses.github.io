/* ===== MERIGO TRESSES — MAIN JS ===== */

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

const JP_HOLIDAYS = new Set([
  "2025-01-01","2025-01-13","2025-02-11","2025-02-23","2025-02-24","2025-03-20",
  "2025-04-29","2025-05-03","2025-05-04","2025-05-05","2025-05-06","2025-07-21",
  "2025-08-11","2025-09-15","2025-09-23","2025-10-13","2025-11-03","2025-11-24",
  "2026-01-01","2026-01-12","2026-02-11","2026-02-23","2026-03-20",
  "2026-04-29","2026-05-03","2026-05-04","2026-05-05","2026-07-20",
  "2026-08-11","2026-09-21","2026-09-22","2026-09-23","2026-10-12",
  "2026-11-03","2026-11-23"
]);

function getBlockedDates() {
  try { return JSON.parse(localStorage.getItem('mt_blocked') || '[]'); } catch { return []; }
}
function saveBlockedDates(arr) {
  localStorage.setItem('mt_blocked', JSON.stringify(arr));
}

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
});

// ---- NAV ----
function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ---- SERVICES ----
function buildServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
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
      <img src="${img.src}" alt="${img.label}" loading="lazy" onerror="this.parentElement.style.display='none'" />
      <div class="gallery-item-overlay"><span class="gallery-item-label">${img.label}</span></div>
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
function openLightbox(i) { lbIndex = i; updateLightbox(); document.getElementById('lightbox').classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow = ''; }
function updateLightbox() { const img = document.getElementById('lbImg'); const item = GALLERY_IMAGES[lbIndex]; img.src = item.src; img.alt = item.label; }

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
    const day = date.getDay();
    const blocked = getBlockedDates();
    const isWeekend = day === 0 || day === 6;
    const isHoliday = JP_HOLIDAYS.has(val);
    if (!isWeekend && !isHoliday) {
      alert('Mercy is only available on Saturdays, Sundays, and Japanese public holidays. Please choose one of those dates!');
      input.value = '';
      return;
    }
    if (blocked.includes(val)) {
      alert('Sorry, this date is not available. Please choose another date!');
      input.value = '';
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
    const endpoint = form.dataset.endpoint || '';
    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      setTimeout(() => showSuccess(data), 1000);
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) { showSuccess(data); } else { showFormError(btn); }
    } catch { showFormError(btn); }
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
  if (!valid) alert('Please fill in all required fields.');
  return valid;
}

function showSuccess(data) {
  document.getElementById('bookingForm').style.display = 'none';
  const s = document.getElementById('formSuccess');
  s.style.display = 'block';
  s.querySelector('p').innerHTML = `Thank you <strong>${data.clientName}</strong>! Your request for <strong>${data.service}</strong> on <strong>${data.apptDate}</strong> has been received. Mercy will confirm via <strong>${data.contactMethod}</strong> soon. Please send your style inspiration photo too!`;
}

function showFormError(btn) {
  btn.textContent = 'Request Appointment';
  btn.disabled = false;
  document.getElementById('formError').style.display = 'block';
}

// ---- SMART CHATBOT (100% Free) ----
const CHAT_RESPONSES = [
  { patterns: ['hello','hi','hey','good morning','good afternoon','good evening','hiya'], reply: "Hi there! 💛 Welcome to Merigo Tresses! I'm Meri, Mercy's assistant. I can help with services, pricing, booking and more. What would you like to know?" },
  { patterns: ['service','offer','what braid','styles','hairstyle','what can','menu','list'], reply: "✨ Our styles:\n\n• Knotless Braids — ¥23,000 (hair included)\n• Box Braids — ¥23,000 (hair included)\n• Pick 'n' Drop — ¥23,000 (hair included)\n• Goddess Braids — ¥23,000 (bring own extensions)\n• Cornrows — ¥18,000 (hair included)\n• Fulani Braids — ¥18,000 (hair included)\n• Ghana Braids — ¥16,000\n• Kinky Braids — ¥20,000 (bring own extensions)\n• Cornrows Natural Hair — ¥5,000\n• Natural Twist Short — ¥8,000\n• Natural Twist Long — ¥15,000\n\nWould you like to book one? 😊" },
  { patterns: ['price','cost','how much','pricing','fee','charge','yen','¥'], reply: "💰 Our prices:\n\n• Knotless, Box Braids, Pick 'n' Drop — ¥23,000\n• Goddess Braids — ¥23,000\n• Cornrows & Fulani Braids — ¥18,000\n• Kinky Braids — ¥20,000\n• Ghana Braids — ¥16,000\n• Natural Twist Short — ¥8,000\n• Natural Twist Long — ¥15,000\n• Cornrows Natural Hair — ¥5,000\n\nPayment is cash only at the location 💴" },
  { patterns: ['book','appointment','reserve','schedule','slot','availability'], reply: "📅 To book:\n\n1. Scroll to the BOOK section on this page\n2. Fill in your details and preferred date\n3. Mercy confirms via WhatsApp or LINE\n\nOr contact Mercy directly:\n💬 WhatsApp: +49 170 612 8008\n💚 LINE: +81 90 7101 9857\n\nAvailable: Sat & Sun + Japanese public holidays, 10am–6pm!" },
  { patterns: ['knotless'], reply: "✨ Knotless Braids — ¥23,000\n\nLightweight, tension-free braids for a natural seamless look. Great for sensitive scalps! One pack of hair included.\n\nWant to book? Scroll to the Book section above! 😊" },
  { patterns: ['box braid','box braids'], reply: "🔲 Box Braids — ¥23,000\n\nClassic, timeless box braids with clean parts and perfect uniformity. One pack of hair included!\n\nWant to book? Scroll to the Book section above 😊" },
  { patterns: ['cornrow','cornrows'], reply: "〰️ Cornrows with extensions — ¥18,000 (hair included)\n🎋 Cornrows Natural Hair — ¥5,000 (no extensions)\n\nSleek, neat and intricate designs. Which interests you?" },
  { patterns: ['goddess'], reply: "👑 Goddess Braids — ¥23,000\n\nElegant braids with curly leave-outs for a romantic bohemian vibe. Please bring your own extensions.\n\nWant to book? Scroll to the Book section! 😊" },
  { patterns: ['fulani'], reply: "🌺 Fulani Braids — ¥18,000 (hair included)\n\nBeautiful tribal-inspired braids with unique pattern details. One pack of hair included!\n\nWant to book? Scroll to the Book section! 😊" },
  { patterns: ['kinky'], reply: "💫 Kinky Braids — ¥20,000\n\nTextured, natural-looking braids with a thick full appearance. Please bring your own extensions.\n\nWant to book? Scroll to the Book section! 😊" },
  { patterns: ['twist','natural twist'], reply: "🌀 Natural Twists:\n• Short Hair — ¥8,000\n• Long Hair — ¥15,000\n\nTwo-strand twists for a healthy protective style. No extensions needed!\n\nWant to book? Scroll to the Book section! 😊" },
  { patterns: ['natural hair','no extension','without extension'], reply: "🌿 Styles for natural hair (no extensions):\n\n• Cornrows Natural Hair — ¥5,000\n• Natural Twist Short — ¥8,000\n• Natural Twist Long — ¥15,000\n\nAll gentle protective styles! Which one interests you?" },
  { patterns: ['hair','extension','include','bring'], reply: "💡 Hair Policy:\n\n✅ Hair INCLUDED: Knotless, Box Braids, Pick 'n' Drop, Cornrows, Fulani Braids\n👜 Bring YOUR OWN: Kinky Braids, Goddess Braids\n🌿 No extensions: Natural Twists, Cornrows (Natural Hair)\n\nAny questions about a specific style?" },
  { patterns: ['when','hour','time','open','weekend','saturday','sunday','holiday'], reply: "🗓️ Mercy is available:\n\n• Every Saturday & Sunday\n• Japanese public holidays\n• 10:00 AM – 6:00 PM\n\nBook a few days in advance to secure your slot! 😊" },
  { patterns: ['pay','payment','cash','card'], reply: "💴 Payment is cash only at the appointment location.\n\nNo card or online payments at this time. The address is shared after booking confirmation! 📍" },
  { patterns: ['cancel','cancellation','reschedule'], reply: "⚠️ Please cancel at least 24 hours before your appointment.\n\nContact Mercy to cancel or reschedule:\n💬 WhatsApp: +49 170 612 8008\n💚 LINE: +81 90 7101 9857" },
  { patterns: ['where','location','address','fukuoka'], reply: "📍 Merigo Tresses is a home-based studio in Fukuoka, Japan.\n\nThe exact address is shared privately after your booking is confirmed 😊" },
  { patterns: ['whatsapp','line','contact','reach','phone','number'], reply: "📱 Reach Mercy at:\n\n💬 WhatsApp: +49 170 612 8008\n💚 LINE: +81 90 7101 9857\n📸 Instagram: @merigo_tresses\n\nOr use the floating buttons at the bottom right of this page!" },
  { patterns: ['instagram','social','insta','@merigo'], reply: "📸 Follow us on Instagram!\n\n@merigo_tresses\n\nLatest styles, updates and inspiration. See you there! ✨" },
  { patterns: ['before','prepare','come with','bring','ready'], reply: "✅ Before your appointment:\n\n• Come with hair clean and detangled\n• Arrive on time\n• Send a style reference photo on WhatsApp/LINE after booking\n• Bring own extensions for Kinky & Goddess braids\n\nAny other questions? 😊" },
  { patterns: ['how long','duration','time take','hours'], reply: "⏱️ Approximate duration:\n\n• Cornrows — 1–2 hours\n• Box/Knotless Braids — 3–5 hours\n• Natural Twists — 2–4 hours\n• Fulani/Goddess Braids — 3–5 hours\n\nMercy gives a more specific estimate when confirming! 😊" },
  { patterns: ['photo','picture','reference','inspiration','send'], reply: "📸 After booking, send your style inspiration photo to Mercy on WhatsApp or LINE so she can prepare and confirm smoothly!\n\n💬 WhatsApp: +49 170 612 8008\n💚 LINE: +81 90 7101 9857" },
  { patterns: ['thank','thanks','thank you'], reply: "You're so welcome! 💛 We can't wait to do your hair! Don't hesitate to ask if you have more questions. See you at Merigo Tresses! ✨" },
  { patterns: ['bye','goodbye','see you','take care'], reply: "Goodbye! 💛 Looking forward to seeing you at Merigo Tresses. Come back anytime! ✨" }
];

const DEFAULT_REPLY = "That's a great question! 😊 I'm not sure about that one, but Mercy can help directly:\n\n💬 WhatsApp: +49 170 612 8008\n💚 LINE: +81 90 7101 9857\n📸 Instagram: @merigo_tresses\n\nOr scroll up to the Book section to reserve your appointment!";

let chatReady = true;

function initChat() {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  if (!form || !input) return;
  setTimeout(() => addBotMsg("Hi! I'm Meri 💛 Merigo Tresses' assistant. I can help with services, pricing, booking and more. What can I help you with today?"), 400);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg || !chatReady) return;
    input.value = '';
    sendChat(msg);
  });
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (!chatReady) return; sendChat(btn.dataset.msg); });
  });
}

function sendChat(msg) {
  addUserMsg(msg);
  chatReady = false;
  showTyping(true);
  setTimeout(() => {
    showTyping(false);
    addBotMsg(getReply(msg));
    chatReady = true;
  }, 700);
}

function getReply(msg) {
  const lower = msg.toLowerCase();
  for (const item of CHAT_RESPONSES) {
    if (item.patterns.some(p => lower.includes(p))) return item.reply;
  }
  return DEFAULT_REPLY;
}

function addBotMsg(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.style.whiteSpace = 'pre-line';
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
  if (show) document.getElementById('chatMessages').scrollTop = 99999;
}

// ---- ADMIN ----
function initAdmin() {
  const toggle = document.getElementById('adminToggle');
  const panel = document.getElementById('adminPanel');
  const addBtn = document.getElementById('adminAddBtn');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => { panel.classList.toggle('open'); renderBlockedList(); });
  addBtn?.addEventListener('click', () => {
    const input = document.getElementById('adminDateInput');
    const val = input.value;
    if (!val) return;
    const blocked = getBlockedDates();
    if (!blocked.includes(val)) { blocked.push(val); saveBlockedDates(blocked); renderBlockedList(); input.value = ''; }
  });
}

function renderBlockedList() {
  const list = document.getElementById('blockedList');
  if (!list) return;
  const blocked = getBlockedDates();
  if (blocked.length === 0) { list.innerHTML = '<p style="font-size:0.8rem;color:#7A5C35;padding:0.25rem 0;">No dates blocked.</p>'; return; }
  list.innerHTML = blocked.sort().map(d => `<div class="blocked-date"><span>${d}</span><button onclick="unblockDate('${d}')" title="Remove">✕</button></div>`).join('');
}

function unblockDate(date) {
  saveBlockedDates(getBlockedDates().filter(d => d !== date));
  renderBlockedList();
}
