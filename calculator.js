/* ─── US Renovation Cost Data (2025, national averages) ─── */
const COST_DATA = {
  kitchen: {
    label: 'Kitchen', icon: '🍳',
    base: { low: 5000, mid: 18000, high: 45000 },
    perSqft: { low: 12, mid: 28, high: 60 },
    breakdown: { labor: 35, materials: 40, fixtures: 20, permits: 5 },
    tip: 'Cabinets typically represent 30–40% of the total kitchen remodel cost.'
  },
  bathroom: {
    label: 'Bathroom', icon: '🚿',
    base: { low: 3000, mid: 9000, high: 22000 },
    perSqft: { low: 18, mid: 45, high: 95 },
    breakdown: { labor: 40, materials: 30, fixtures: 25, permits: 5 },
    tip: 'Moving plumbing walls significantly increases bathroom remodel costs.'
  },
  bedroom: {
    label: 'Bedroom', icon: '🛏️',
    base: { low: 1500, mid: 5000, high: 12000 },
    perSqft: { low: 5, mid: 14, high: 30 },
    breakdown: { labor: 45, materials: 40, fixtures: 10, permits: 5 },
    tip: 'Adding a closet system can add $1,500–$5,000 to bedroom renovation costs.'
  },
  living: {
    label: 'Living Room', icon: '🛋️',
    base: { low: 2000, mid: 6000, high: 15000 },
    perSqft: { low: 4, mid: 12, high: 28 },
    breakdown: { labor: 40, materials: 45, fixtures: 10, permits: 5 },
    tip: 'Hardwood flooring is the single biggest cost driver in living room renovations.'
  },
  basement: {
    label: 'Basement', icon: '🏗️',
    base: { low: 5000, mid: 15000, high: 35000 },
    perSqft: { low: 8, mid: 20, high: 45 },
    breakdown: { labor: 40, materials: 35, fixtures: 15, permits: 10 },
    tip: 'Waterproofing a basement before finishing can cost $5,000–$15,000 extra.'
  },
  roof: {
    label: 'Roof', icon: '🏠',
    base: { low: 4000, mid: 9000, high: 20000 },
    perSqft: { low: 1.5, mid: 3.5, high: 7 },
    breakdown: { labor: 60, materials: 35, fixtures: 0, permits: 5 },
    tip: 'Asphalt shingles are the most cost-effective roofing material, lasting 20–30 years.'
  },
  garage: {
    label: 'Garage', icon: '🚗',
    base: { low: 1500, mid: 5000, high: 12000 },
    perSqft: { low: 4, mid: 10, high: 22 },
    breakdown: { labor: 35, materials: 45, fixtures: 15, permits: 5 },
    tip: 'Adding insulation and drywall to a garage averages $2,000–$5,000.'
  }
};

/* State cost multipliers (relative to national average = 1.0) */
const STATE_MULT = {
  AL:0.82,AK:1.35,AZ:0.96,AR:0.78,CA:1.38,CO:1.08,CT:1.22,DE:1.10,
  FL:0.97,GA:0.88,HI:1.48,ID:0.88,IL:1.12,IN:0.85,IA:0.82,KS:0.80,
  KY:0.82,LA:0.85,ME:1.05,MD:1.18,MA:1.30,MI:0.92,MN:1.05,MS:0.77,
  MO:0.85,MT:0.90,NE:0.83,NV:1.02,NH:1.14,NJ:1.28,NM:0.88,NY:1.42,
  NC:0.88,ND:0.90,OH:0.88,OK:0.80,OR:1.10,PA:1.05,RI:1.18,SC:0.87,
  SD:0.82,TN:0.85,TX:0.95,UT:0.98,VT:1.10,VA:1.05,WA:1.18,WV:0.82,
  WI:0.92,WY:0.90,DC:1.45
};

const QUALITY_MULT = { budget: 0.65, standard: 1.0, premium: 1.6 };

/* ─── State ─── */
let currentStep = 1;
let selected = {
  room: null, sqft: null, state: 'TX', quality: 'standard', scope: 'full'
};

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  buildRoomCards();
  buildStateSelect();
  buildQualityBtns();
  updateStep(1);
  setupFAQ();
});

function buildRoomCards() {
  const grid = document.getElementById('room-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(COST_DATA).map(([key, d]) => `
    <div class="room-card" data-room="${key}" onclick="selectRoom('${key}')">
      <div class="room-icon">${d.icon}</div>
      <div class="room-name">${d.label}</div>
    </div>
  `).join('');
}

function buildStateSelect() {
  const sel = document.getElementById('state-select');
  if (!sel) return;
  const states = {
    AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
    CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
    HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',
    KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',
    MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',
    NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',
    NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',
    OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',
    SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
    VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',DC:'Washington DC'
  };
  sel.innerHTML = Object.entries(states).map(([k,v]) =>
    `<option value="${k}"${k==='TX'?' selected':''}>${v}</option>`
  ).join('');
}

function buildQualityBtns() {
  const wrap = document.getElementById('quality-wrap');
  if (!wrap) return;
  const opts = [
    { key:'budget',   label:'Budget',   desc:'Cost-effective materials & finishes' },
    { key:'standard', label:'Standard', desc:'Mid-range quality, popular choices' },
    { key:'premium',  label:'Premium',  desc:'High-end materials & custom work' }
  ];
  wrap.innerHTML = opts.map(o => `
    <div class="quality-btn${o.key==='standard'?' active':''}" data-q="${o.key}" onclick="selectQuality('${o.key}')">
      <span class="q-label">${o.label}</span>
      <span class="q-desc">${o.desc}</span>
    </div>
  `).join('');
}

/* ─── Step Navigation ─── */
function updateStep(n) {
  currentStep = n;
  document.querySelectorAll('.calc-step').forEach(s => {
    s.style.display = s.dataset.step == n ? 'block' : 'none';
  });
  document.querySelectorAll('.step-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab == n);
  });
  document.querySelectorAll('.progress-dot').forEach((d, i) => {
    d.classList.toggle('done', i < n);
  });
}

function nextStep() {
  if (currentStep === 1 && !selected.room) {
    alert('Please select a room type to continue.');
    return;
  }
  if (currentStep === 2) {
    const sqft = parseFloat(document.getElementById('sqft-input').value);
    if (!sqft || sqft < 20 || sqft > 10000) {
      alert('Please enter a valid room size (20–10,000 sq ft).');
      return;
    }
    selected.sqft   = sqft;
    selected.state  = document.getElementById('state-select').value;
    selected.scope  = document.getElementById('scope-select').value;
  }
  if (currentStep < 3) updateStep(currentStep + 1);
  if (currentStep === 3) calculateAndShow();
}

function prevStep() {
  if (currentStep > 1) updateStep(currentStep - 1);
}

/* ─── Selections ─── */
function selectRoom(key) {
  selected.room = key;
  document.querySelectorAll('.room-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.room === key);
  });
}

function selectQuality(key) {
  selected.quality = key;
  document.querySelectorAll('.quality-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.q === key);
  });
}

/* ─── Calculation ─── */
function calculateAndShow() {
  const room      = COST_DATA[selected.room];
  const sqft      = selected.sqft;
  const stateMult = STATE_MULT[selected.state] || 1.0;
  const qualMult  = QUALITY_MULT[selected.quality];
  const scopeMult = selected.scope === 'cosmetic' ? 0.40 : selected.scope === 'partial' ? 0.65 : 1.0;

  const baseLow  = (room.base.low  + room.perSqft.low  * sqft) * stateMult * qualMult * scopeMult;
  const baseMid  = (room.base.mid  + room.perSqft.mid  * sqft) * stateMult * qualMult * scopeMult;
  const baseHigh = (room.base.high + room.perSqft.high * sqft) * stateMult * qualMult * scopeMult;

  const fmtN = n => '$' + Math.round(n / 50) * 50 >= 1000
    ? '$' + (Math.round(n / 50) * 50).toLocaleString()
    : '$' + Math.round(n / 50) * 50;

  const bd       = room.breakdown;
  const midTotal = baseMid;

  const breakdown = {
    labor:     midTotal * bd.labor / 100,
    materials: midTotal * bd.materials / 100,
    fixtures:  midTotal * bd.fixtures / 100,
    permits:   midTotal * bd.permits / 100
  };

  document.getElementById('res-range').textContent = `${fmtN(baseLow)} – ${fmtN(baseHigh)}`;
  document.getElementById('res-mid').textContent   = `Most homeowners pay around ${fmtN(baseMid)}`;
  document.getElementById('res-room').textContent  = room.label;
  document.getElementById('res-sqft').textContent  = sqft + ' sq ft';
  document.getElementById('res-state').textContent = selected.state;
  document.getElementById('res-quality').textContent = capitalize(selected.quality);

  document.getElementById('bd-labor').textContent     = fmtN(breakdown.labor);
  document.getElementById('bd-materials').textContent = fmtN(breakdown.materials);
  document.getElementById('bd-fixtures').textContent  = fmtN(breakdown.fixtures);
  document.getElementById('bd-permits').textContent   = fmtN(breakdown.permits);

  const pct = (v, total) => Math.round(v / total * 100);
  setTimeout(() => {
    document.getElementById('bar-labor').style.width     = pct(breakdown.labor, midTotal) + '%';
    document.getElementById('bar-materials').style.width = pct(breakdown.materials, midTotal) + '%';
    document.getElementById('bar-fixtures').style.width  = pct(breakdown.fixtures, midTotal) + '%';
    document.getElementById('bar-permits').style.width   = pct(breakdown.permits, midTotal) + '%';
  }, 100);

  document.getElementById('res-tip').textContent = room.tip;
  updateStep(3);
}

function resetCalc() {
  selected = { room: null, sqft: null, state: 'TX', quality: 'standard', scope: 'full' };
  document.querySelectorAll('.room-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('sqft-input').value = '';
  buildQualityBtns();
  updateStep(1);
}

function printResults() { window.print(); }

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* ─── FAQ ─── */
function setupFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}
