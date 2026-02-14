/* DIGIY HUB F16 ENHANCED — Business-ready • Data-driven • 0% commission
   ✅ MODULES définis en dur (plus besoin de modules.json)
*/

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const STORAGE_PHONE    = "DIGIY_HUB_PHONE";
const STORAGE_FILTER   = "DIGIY_HUB_FILTER";
const STORAGE_SEARCH   = "DIGIY_HUB_SEARCH";
const STORAGE_FAVORITES = "DIGIY_HUB_FAVORITES"; // NEW
const STORAGE_ANALYTICS = "DIGIY_HUB_ANALYTICS"; // NEW

const state = {
  phone: "",
  filter: "all", // all | public | pro
  q: "",
  favorites: [] // NEW
};

/* =========================
   LINKS (SOUS-DOMAINES OFFICIELS)
   ========================= */
const LINKS = {
  digiylyfe:    "https://digiylyfe.com/",
  apps:         "https://apps.digiylyfe.com/",
  admin:        "https://admin.digiylyfe.com/",
  tarifs:       "https://tarifs.digiylyfe.com/",

  // ✅ "Vas chez DIGIY"
  vasChezDigiy: "https://vas-chez-digiy.digiylyfe.com/",

  // NDIMBAL
  ndimbalMap:       "https://ndimbal-map.digiylyfe.com/",
  ndimbalAnnonces:  "https://ndimbal-annonces.digiylyfe.com/",
  ndimbalLoc:       "https://ndimbal-loc.digiylyfe.com/",

  // ✅ HubDrive = NDIMBAL annonces
  hubDrive:     "https://ndimbal-annonces.digiylyfe.com/",

  // Public
  bonneAffaire: "https://bonne-affaire.digiylyfe.com/",
  driverClient: "https://driver-client.digiylyfe.com/",
  loc:          "https://loc.digiylyfe.com/",
  resto:        "https://resto.digiylyfe.com/",
  build:        "https://build.digiylyfe.com/",
  explore:      "https://explore.digiylyfe.com/",
  market:       "https://market.digiylyfe.com/",
  jobs:         "https://jobs.digiylyfe.com/",
  pay:          "https://pay.digiylyfe.com/",
  resaTable:    "https://resa-table-resto.digiylyfe.com/",

  // GitHub
  notable:      "https://beauville.github.io/digiy-notable/",

  // PRO
  inscriptionPro: "https://inscription-pro.digiylyfe.com/",
  espacePro:      "https://pro-espace.digiylyfe.com/",

  // Modules PRO dédiés
  driverPro:    "https://pro-driver.digiylyfe.com/",
  locPro:       "https://pro-loc.digiylyfe.com/",
  caissePro:    "https://pro-caisse.digiylyfe.com/",
  buildPro:     "https://pro-build.digiylyfe.com/",
  marketPro:    "https://pro-market.digiylyfe.com/",
  jobsPro:      "https://pro-job.digiylyfe.com/",
  restoPro:     "https://pro-resto.digiylyfe.com/",
  resaTablePro: "https://pro-resa-resto.digiylyfe.com/",
  payPro:       "https://pay.digiylyfe.com/",
  explorePro:   "https://explore.digiylyfe.com/",

  // FRET PIN direct
  fretClientProPin:     "https://pro-fret-client.digiylyfe.com/pin.html",
  fretChauffeurProPin:  "https://pro-fret-chauffeur.digiylyfe.com/pin.html"
};

const PRO_DEFAULT_URL = LINKS.espacePro;

/* =========================
   MODULES (définis en dur + MÉTADONNÉES)
   ========================= */
const MODULES = [
  // === PUBLIC ===
  { key: "bonneAffaire", name: "Bonne Affaire", icon: "🎯", tag: "marketplace", desc: "Deals & offres", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-12-01", featured: true },
  { key: "driverClient", name: "DIGIY DRIVER", icon: "🚗", tag: "transport", desc: "Réserver ta course VTC", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-15", featured: true },
  { key: "loc", name: "DIGIY LOC", icon: "🏠", tag: "accommodation", desc: "Trouver un logement", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-20", featured: true },
  { key: "resto", name: "DIGIY RESTO", icon: "🍽️", tag: "restaurant", desc: "Commander à manger", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-15", featured: true },
  { key: "resaTable", name: "Résa Table", icon: "📅", tag: "reservation", desc: "Réserver une table", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2026-01-20", featured: false },
  { key: "build", name: "DIGIY BUILD", icon: "🏗️", tag: "services", desc: "Services de construction", kind: "public", status: "beta", statusLabel: "BETA", phoneParam: true, createdAt: "2026-02-01", featured: false },
  { key: "explore", name: "Explore", icon: "🗺️", tag: "discovery", desc: "Découvrir la région", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-12-10", featured: false },
  { key: "market", name: "DIGIY MARKET", icon: "🛍️", tag: "marketplace", desc: "Acheter/vendre", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-01", featured: true },
  { key: "jobs", name: "DIGIY JOBS", icon: "💼", tag: "emploi", desc: "Offres d'emploi", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-01", featured: false },
  { key: "pay", name: "DIGIY PAY", icon: "💳", tag: "paiement", desc: "Portefeuille digital", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-15", featured: true },
  { key: "notable", name: "Notable", icon: "📝", tag: "documentation", desc: "Blog & ressources", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-08-01", featured: false },
  
  // === NDIMBAL ===
  { key: "ndimbalMap", name: "NDIMBAL Map", icon: "🗺️", tag: "ndimbal", desc: "Carte des annonces", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-12-15", featured: true },
  { key: "ndimbalAnnonces", name: "NDIMBAL Annonces", icon: "📢", tag: "ndimbal", desc: "Hub Drive - Vendre", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-01", featured: true },
  { key: "ndimbalLoc", name: "NDIMBAL Loc", icon: "🏡", tag: "ndimbal", desc: "Locations NDIMBAL", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-12-20", featured: false },

  // === PRO ===
  { key: "inscriptionPro", name: "Inscription PRO", icon: "✍️", tag: "auth", desc: "Créer compte professionnel", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-01", featured: true },
  { key: "espacePro", name: "Espace PRO", icon: "🏢", tag: "dashboard", desc: "Tableau de bord pro", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-01", featured: true },
  { key: "driverPro", name: "DIGIY DRIVER PRO", icon: "🚗", tag: "vtc", desc: "Gérer ta flotte VTC", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-15", featured: true },
  { key: "locPro", name: "DIGIY LOC PRO", icon: "🏠", tag: "properties", desc: "Gérer tes logements", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-20", featured: true },
  { key: "restoPro", name: "DIGIY RESTO PRO", icon: "👨‍🍳", tag: "restaurant", desc: "Gérer ton resto", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-15", featured: true },
  { key: "caissePro", name: "Caisse PRO", icon: "💰", tag: "pos", desc: "Point de vente", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-01", featured: false },
  { key: "buildPro", name: "DIGIY BUILD PRO", icon: "🏗️", tag: "construction", desc: "Gérer chantiers", kind: "pro", status: "beta", statusLabel: "BETA", phoneParam: true, createdAt: "2026-02-01", featured: false },
  { key: "marketPro", name: "DIGIY MARKET PRO", icon: "🛍️", tag: "marketplace", desc: "Vendre sur market", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-01", featured: false },
  { key: "jobsPro", name: "DIGIY JOBS PRO", icon: "💼", tag: "recruitement", desc: "Recruter", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-01", featured: false },
  { key: "payPro", name: "DIGIY PAY PRO", icon: "💳", tag: "paiement", desc: "Gérer paiements", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-15", featured: false },
  { key: "explorePro", name: "Explore PRO", icon: "🗺️", tag: "analytics", desc: "Analytics & stats", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-12-01", featured: false },
  { key: "resaTablePro", name: "Résa Table PRO", icon: "📅", tag: "reservation", desc: "Gérer réservations", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2026-01-20", featured: false }
];

/* =========================
   HELPERS
   ========================= */
function normPhone(p) {
  if (!p) return "";
  let s = String(p).trim();
  s = s.replace(/[^\d+]/g, "");
  if (s && !s.startsWith("+")) {
    if (s.startsWith("221")) s = "+" + s;
  }
  return s;
}

function withPhone(url, phone, param = "phone") {
  if (!url) return "";
  if (!phone) return url;
  try {
    const u = new URL(url);
    u.searchParams.set(param, phone);
    return u.toString();
  } catch (_) {
    const sep = url.includes("?") ? "&" : "?";
    return url + sep + encodeURIComponent(param) + "=" + encodeURIComponent(phone);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[m]));
}

/* =========================
   MODAL
   ========================= */
const modal = {
  root: null,
  titleEl: null,
  textEl: null,
  okBtn: null,
  cancelBtn: null,
  _onOk: null,
  _onCancel: null,

  init() {
    this.root = $("#modal");
    this.titleEl = $("#modalTitle");
    this.textEl = $("#modalText");
    this.okBtn = $("#modalOk");
    this.cancelBtn = $("#modalCancel");
    if (!this.root) return;

    this.okBtn?.addEventListener("click", () => {
      this.hide();
      if (typeof this._onOk === "function") this._onOk();
    });
    this.cancelBtn?.addEventListener("click", () => {
      this.hide();
      if (typeof this._onCancel === "function") this._onCancel();
    });

    this.root.addEventListener("click", (e) => {
      if (e.target === this.root) this.hide();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.root.classList.contains("hidden")) this.hide();
    });
  },

  show({ title, text, okText = "OK", cancelText = "Annuler", onOk = null, onCancel = null, hideCancel = false }) {
    if (!this.root) return;
    this.titleEl.textContent = title || "Info";
    this.textEl.innerHTML = text || "";
    this.okBtn.textContent = okText;
    this.cancelBtn.textContent = cancelText;
    this._onOk = onOk;
    this._onCancel = onCancel;
    this.cancelBtn.style.display = hideCancel ? "none" : "";
    this.root.classList.remove("hidden");
    this.root.setAttribute("aria-hidden", "false");
  },

  info({ title, text, okText = "OK" }) {
    this.show({ title, text, okText, hideCancel: true });
  },

  hide() {
    if (!this.root) return;
    this.root.classList.add("hidden");
    this.root.setAttribute("aria-hidden", "true");
    this._onOk = null;
    this._onCancel = null;
  }
};

/* =========================
   HUB OVERLAY
   ========================= */
const hub = {
  overlay: null,
  frame: null,
  backBtn: null,
  closeBtn: null,

  init() {
    this.overlay = $("#hubOverlay");
    this.frame = $("#hubFrame");
    this.backBtn = $("#hubBackBtn");
    this.closeBtn = $("#hubCloseBtn");
    if (!this.overlay || !this.frame) return;

    const close = () => this.close();
    this.closeBtn?.addEventListener("click", close);
    this.backBtn?.addEventListener("click", close);

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.overlay.classList.contains("hidden")) close();
    });
  },

  open(url) {
    if (!url) return;
    this.frame.src = url;
    this.overlay.classList.remove("hidden");
    this.overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.add("hidden");
    this.overlay.setAttribute("aria-hidden", "true");
    this.frame.src = "about:blank";
    document.body.style.overflow = "";
  }
};

/* =========================
   UI REFS
   ========================= */
let modulesGridEl, phoneTextEl, searchInputEl;
let statTotalEl, statPublicEl, statProEl;

/* =========================
   FILTERS & FAVORITES
   ========================= */
function setFilter(f) {
  state.filter = f;
  localStorage.setItem(STORAGE_FILTER, f);
  $$(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === f));
  render();
}

function setSearch(q) {
  state.q = q;
  localStorage.setItem(STORAGE_SEARCH, q);
  render();
}

function toggleFavorite(key) {
  const idx = state.favorites.indexOf(key);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
  } else {
    state.favorites.push(key);
  }
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(state.favorites));
  render();
  trackAnalytic(key, "favorite");
}

function isFavorite(key) {
  return state.favorites.includes(key);
}

function getFilteredModules() {
  const q = (state.q || "").trim().toLowerCase();

  let filtered = MODULES.filter(m => {
    if (state.filter === "public" && m.kind !== "public") return false;
    if (state.filter === "pro" && m.kind !== "pro") return false;
    if (!q) return true;

    const hay = [m.key, m.name, m.tag, m.desc, m.kind, m.status, m.statusLabel].join(" ").toLowerCase();
    return hay.includes(q);
  });

  // 🌟 Trier: favoris d'abord
  filtered.sort((a, b) => {
    const aFav = isFavorite(a.key) ? 1 : 0;
    const bFav = isFavorite(b.key) ? 1 : 0;
    return bFav - aFav;
  });

  return filtered;
}

// 📊 ANALYTICS simple
function trackAnalytic(key, action) {
  try {
    let analytics = {};
    const stored = localStorage.getItem(STORAGE_ANALYTICS);
    if (stored) analytics = JSON.parse(stored);

    if (!analytics[key]) {
      analytics[key] = { clicks: 0, favorites: 0, lastClick: null };
    }

    if (action === "click") {
      analytics[key].clicks += 1;
      analytics[key].lastClick = new Date().toISOString();
    } else if (action === "favorite") {
      analytics[key].favorites = (analytics[key].favorites || 0) + 1;
    }

    localStorage.setItem(STORAGE_ANALYTICS, JSON.stringify(analytics));
  } catch (e) {
    console.warn("[DIGIY] Analytics failed:", e);
  }
}

function getModulePopularity(key) {
  try {
    const stored = localStorage.getItem(STORAGE_ANALYTICS);
    if (!stored) return 0;
    const analytics = JSON.parse(stored);
    return (analytics[key]?.clicks || 0);
  } catch (e) {
    return 0;
  }
}

// 🎯 Calculer les statuts dynamiques
function getSmartStatus(m) {
  const popularity = getModulePopularity(m.key);
  const now = new Date();
  const moduleDate = new Date(m.createdAt || "2025-01-01");
  const daysSinceCreation = Math.floor((now - moduleDate) / (1000 * 60 * 60 * 24));

  // Ordre de priorité: HOT > NOUVEAU > FEATURED > status original
  if (popularity >= 5) {
    return { status: "hot", label: "🔥 HOT", priority: 1 };
  }
  if (daysSinceCreation <= 7) {
    return { status: "nouveau", label: "🆕 NOUVEAU", priority: 2 };
  }
  if (m.featured) {
    return { status: "featured", label: "⭐ FEATURED", priority: 3 };
  }
  if (m.status === "beta") {
    return { status: "beta", label: "🔧 BETA", priority: 4 };
  }
  if (m.status === "soon") {
    return { status: "soon", label: "⏳ BIENTÔT", priority: 5 };
  }
  
  return { status: m.status, label: m.statusLabel, priority: 99 };
}

function getDaysAgo(dateStr) {
  const moduleDate = new Date(dateStr || "2025-01-01");
  const now = new Date();
  return Math.floor((now - moduleDate) / (1000 * 60 * 60 * 24));
}

function updateStats(filtered) {
  const total = filtered.length;
  const pub = filtered.filter(m => m.kind === "public").length;
  const pro = filtered.filter(m => m.kind === "pro").length;

  if (statTotalEl) statTotalEl.textContent = String(total);
  if (statPublicEl) statPublicEl.textContent = String(pub);
  if (statProEl) statProEl.textContent = String(pro);
}

/* =========================
   CARDS
   ========================= */
function badgeHTML(kind, status, statusLabel) {
  const kindBadge = `<span class="badge kind-${kind}">${kind === "pro" ? "PRO" : "PUBLIC"}</span>`;
  const st = status || "soon";
  const label = statusLabel || st.toUpperCase();
  
  // Classes CSS pour chaque status
  const statusClasses = {
    "hot": "badge hot-badge",
    "nouveau": "badge nouveau-badge",
    "featured": "badge featured-badge",
    "beta": "badge beta-badge",
    "soon": "badge soon-badge",
    "live": "badge live-badge"
  };
  
  const badgeClass = statusClasses[st] || "badge live-badge";
  const stBadge = `<span class="${badgeClass}">${escapeHtml(label)}</span>`;
  return kindBadge + stBadge;
}

function getModuleUrl(m) {
  let base = m.directUrl || LINKS[m.key] || "";

  // fallback : si module PRO sans directUrl, on l'envoie vers le portail PRO
  if (m.kind === "pro" && !m.directUrl && !LINKS[m.key]) {
    base = PRO_DEFAULT_URL;
  }

  if (!base) return "";

  if (m.phoneParam && state.phone) {
    base = withPhone(base, state.phone, "phone");
  }
  return base;
}

function cardHTML(m) {
  const url = getModuleUrl(m);
  const disabled = !url;
  const fav = isFavorite(m.key);
  const popularity = getModulePopularity(m.key);
  
  // Utiliser les statuts intelligents
  const smartStatus = getSmartStatus(m);
  const isHot = smartStatus.status === "hot";
  const isNouveau = smartStatus.status === "nouveau";
  
  // Classe CSS pour la card si HOT ou NOUVEAU
  const cardClass = isHot ? "card card-hot" : (isNouveau ? "card card-nouveau" : "card");

  return `
    <div class="${cardClass}" tabindex="0" role="button" aria-label="${escapeHtml(m.name)}" data-key="${escapeHtml(m.key)}">
      <div class="cardTop">
        <div class="icon">${escapeHtml(m.icon || "∞")}</div>
        <div style="flex:1;min-width:0">
          <div class="cardTitle">
            ${escapeHtml(m.name)}
            ${fav ? '<span class="favStar">⭐</span>' : ''}
          </div>
          <div class="cardTag">${escapeHtml(m.tag || "")}</div>
          <div class="cardDesc">${escapeHtml(m.desc || "")}</div>

          <div class="badges">
            ${badgeHTML(m.kind, smartStatus.status, smartStatus.label)}
          </div>
        </div>
      </div>

      <div class="cardActions">
        <button class="btn ${disabled ? "disabled" : "primary"}" data-action="open" ${disabled ? "disabled" : ""} type="button">
          Ouvrir →
        </button>
        <button class="btn ${disabled ? "disabled" : ""}" data-action="favorite" ${disabled ? "disabled" : ""} type="button">
          ${fav ? '⭐ Favoris' : '☆ Ajouter'}
        </button>
        <button class="btn ${disabled ? "disabled" : ""}" data-action="copy" ${disabled ? "disabled" : ""} type="button">
          Copier lien
        </button>
      </div>
    </div>
  `;
}

/* =========================
   RENDER
   ========================= */
function renderGrid() {
  const grid = modulesGridEl;
  if (!grid) return;

  const filtered = getFilteredModules();
  grid.innerHTML = filtered.length
    ? filtered.map(cardHTML).join("")
    : `<div class="empty">
         Aucun module ne correspond à ta recherche frérot.<br>
         <small style="opacity:.75">Pierre par pierre on construit l'empire! 🔥</small>
       </div>`;

  $$(".card", grid).forEach(card => {
    card.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("button");
      const key = card.getAttribute("data-key");
      const m = MODULES.find(x => x.key === key);
      if (!m) return;

      if (btn && btn.dataset.action === "favorite") {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(key);
        return;
      }

      if (btn && btn.dataset.action === "copy") {
        e.preventDefault();
        e.stopPropagation();
        const link = getModuleUrl(m);
        if (!link) return;
        navigator.clipboard?.writeText(link).catch(() => {});
        trackAnalytic(key, "click");
        modal.info({ title: "Copié ✅", text: `Lien copié.<br><small>${escapeHtml(link)}</small>` });
        return;
      }

      openModule(key);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModule(card.getAttribute("data-key"));
      }
    });
  });

  updateStats(filtered);
}

function renderPhone() {
  if (!phoneTextEl) return;
  phoneTextEl.textContent = state.phone ? state.phone : "non mémorisé";
}

function render() {
  renderPhone();
  renderGrid();
}

/* =========================
   ACTIONS
   ========================= */
function openModule(key) {
  const m = MODULES.find(x => x.key === key);
  if (!m) return;

  const url = getModuleUrl(m);
  if (!url) {
    modal.info({
      title: "Module non disponible",
      text: "Lien non défini frérot."
    });
    return;
  }

  trackAnalytic(key, "click"); // 📊 Track le clic
  hub.open(url);
}

function askPhone() {
  modal.show({
    title: "Numéro (optionnel)",
    text:
      `Entre ton numéro (ex: <b>+221771234567</b>)<br>
       <small>Le HUB peut l'envoyer à certains modules.</small>
       <div style="margin-top:10px">
         <input id="phonePrompt"
           style="width:100%;padding:12px;border-radius:14px;border:1px solid rgba(148,163,184,.25);background:rgba(2,6,23,.18);color:#fff;outline:none"
           placeholder="+221..." value="${escapeHtml(state.phone)}"/>
       </div>`,
    okText: "Enregistrer",
    cancelText: "Annuler",
    onOk: () => {
      const inp = $("#phonePrompt");
      const val = normPhone(inp?.value || "");
      state.phone = val;
      localStorage.setItem(STORAGE_PHONE, val);
      render();
    }
  });

  setTimeout(() => $("#phonePrompt")?.focus(), 50);
}

/* =========================
   DASHBOARD ANALYTICS
   ========================= */

function getAnalyticsData() {
  try {
    const stored = localStorage.getItem(STORAGE_ANALYTICS);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch (e) {
    console.warn("[DIGIY] Analytics read failed:", e);
    return {};
  }
}

function getAllStats() {
  const analytics = getAnalyticsData();
  const stats = [];

  for (const [key, data] of Object.entries(analytics)) {
    const m = MODULES.find(x => x.key === key);
    if (!m) continue;

    stats.push({
      key,
      name: m.name,
      icon: m.icon,
      clicks: data.clicks || 0,
      favorites: data.favorites || 0,
      lastClick: data.lastClick || null
    });
  }

  // Trier par clicks (décroissant)
  return stats.sort((a, b) => b.clicks - a.clicks);
}

function getTopModules(n = 5) {
  return getAllStats().slice(0, n);
}

function formatDate(isoStr) {
  if (!isoStr) return "Jamais";
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString("fr-FR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch (_) {
    return "N/A";
  }
}

function dashboardHTML() {
  const stats = getAllStats();
  const top5 = getTopModules(5);
  const totalClicks = stats.reduce((sum, s) => sum + s.clicks, 0);
  const totalFavs = stats.reduce((sum, s) => sum + s.favorites, 0);

  const medals = ["🥇", "🥈", "🥉"];

  let topHTML = "";
  if (top5.length === 0) {
    topHTML = `<div style="text-align:center;padding:20px;opacity:0.7">Aucune statistique pour le moment frérot.<br>Clique sur les modules pour voir les stats! 🔥</div>`;
  } else {
    topHTML = top5.map((s, idx) => {
      const medal = medals[idx] || "📊";
      return `
        <div class="stat-row" style="display:flex;align-items:center;padding:12px;border-bottom:1px solid rgba(255,255,255,.1);gap:12px">
          <div style="font-size:1.5em">${medal}</div>
          <div style="flex:1">
            <div style="font-weight:600">${escapeHtml(s.name)} ${s.icon}</div>
            <div style="font-size:0.85em;opacity:0.7">Dernière visite: ${formatDate(s.lastClick)}</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700;color:#44ccff">${s.clicks} clics</div>
            <div style="font-size:0.85em;opacity:0.7">⭐ ${s.favorites}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  const allStatsHTML = stats.length === 0 ? `<div style="padding:10px;opacity:0.7">Pas de stats</div>` : stats.map((s, idx) => `
    <div class="stat-row" style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid rgba(255,255,255,.05);font-size:0.9em">
      <div style="flex:1">${escapeHtml(s.name)}</div>
      <div style="color:#44ccff;font-weight:600">${s.clicks}</div>
      <div style="opacity:0.7;width:40px;text-align:right">⭐ ${s.favorites}</div>
    </div>
  `).join("");

  return `
    <div id="dashboardModal" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999">
      <div style="background:#0f172a;border:2px solid rgba(68,170,255,0.3);border-radius:16px;width:90%;max-width:600px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 0 40px rgba(68,170,255,0.2)">
        
        <!-- HEADER -->
        <div style="padding:20px;border-bottom:1px solid rgba(68,170,255,0.2);display:flex;justify-content:space-between;align-items:center">
          <h2 style="margin:0;color:#44ccff;font-size:1.3em">📊 ANALYTICS DIGIY HUB</h2>
          <button id="dashClose" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1.5em">✕</button>
        </div>

        <!-- STATS OVERVIEW -->
        <div style="padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px;border-bottom:1px solid rgba(68,170,255,0.2)">
          <div style="background:rgba(68,170,255,0.1);padding:12px;border-radius:8px;border-left:3px solid #44ccff">
            <div style="font-size:0.85em;opacity:0.7;margin-bottom:4px">TOTAL CLICS</div>
            <div style="font-size:1.5em;font-weight:700;color:#44ccff">${totalClicks}</div>
          </div>
          <div style="background:rgba(255,170,68,0.1);padding:12px;border-radius:8px;border-left:3px solid #ffaa44">
            <div style="font-size:0.85em;opacity:0.7;margin-bottom:4px">FAVORIS</div>
            <div style="font-size:1.5em;font-weight:700;color:#ffaa44">${totalFavs}</div>
          </div>
        </div>

        <!-- TOP 5 -->
        <div style="padding:16px;border-bottom:1px solid rgba(68,170,255,0.2)">
          <h3 style="margin:0 0 12px 0;color:#44ccff;font-size:1em">🏆 TOP 5</h3>
          <div>${topHTML}</div>
        </div>

        <!-- ALL STATS (SCROLLABLE) -->
        <div style="padding:16px;flex:1;overflow-y:auto;max-height:300px">
          <h3 style="margin:0 0 12px 0;color:#44ccff;font-size:1em">📈 TOUS LES MODULES</h3>
          <div>${allStatsHTML}</div>
        </div>

        <!-- ACTIONS -->
        <div style="padding:16px;border-top:1px solid rgba(68,170,255,0.2);display:flex;gap:8px;justify-content:space-between">
          <button id="dashReset" style="flex:1;padding:10px;background:rgba(255,68,68,0.2);border:1px solid #ff4444;color:#ff8888;border-radius:8px;cursor:pointer;font-weight:600;transition:all 0.2s">
            🔄 Réinitialiser stats
          </button>
          <button id="dashExport" style="flex:1;padding:10px;background:rgba(68,170,255,0.2);border:1px solid #44ccff;color:#44ccff;border-radius:8px;cursor:pointer;font-weight:600;transition:all 0.2s">
            📥 Exporter JSON
          </button>
        </div>
      </div>
    </div>
  `;
}

function openAnalyticsDashboard() {
  const html = dashboardHTML();
  
  // Injecter le modal dans le DOM
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  document.body.appendChild(tempDiv);

  const modal = $("#dashboardModal");
  const closeBtn = $("#dashClose");
  const resetBtn = $("#dashReset");
  const exportBtn = $("#dashExport");

  // Fermer
  const close = () => {
    if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
    if (tempDiv && tempDiv.parentNode) tempDiv.parentNode.removeChild(tempDiv);
  };

  closeBtn?.addEventListener("click", close);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // Réinitialiser stats
  resetBtn?.addEventListener("click", () => {
    if (confirm("Réinitialiser TOUS les analytics? C'est irréversible frérot! 🦅")) {
      localStorage.removeItem(STORAGE_ANALYTICS);
      close();
      modal.info?.({ title: "✅ Stats réinitialisées", text: "Le compteur est à zéro frérot!" });
      render();
    }
  });

  // Exporter
  exportBtn?.addEventListener("click", () => {
    try {
      const analytics = getAnalyticsData();
      const json = JSON.stringify(analytics, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `digiy-analytics-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      resetBtn?.textContent && (resetBtn.textContent = "📥 Téléchargé!");
      setTimeout(() => { if (resetBtn) resetBtn.textContent = "🔄 Réinitialiser stats"; }, 2000);
    } catch (e) {
      console.warn("[DIGIY] Export failed:", e);
    }
  });

  // Fermer au ESC
  const escHandler = (e) => {
    if (e.key === "Escape") {
      close();
      window.removeEventListener("keydown", escHandler);
    }
  };
  window.addEventListener("keydown", escHandler);
}

  modulesGridEl = $("#modulesGrid");
  phoneTextEl   = $("#phoneText");
  searchInputEl = $("#searchInput");
  statTotalEl   = $("#statTotal");
  statPublicEl  = $("#statPublic");
  statProEl     = $("#statPro");

  modal.init();
  hub.init();

  // state load
  state.phone  = normPhone(localStorage.getItem(STORAGE_PHONE) || "");
  state.filter = localStorage.getItem(STORAGE_FILTER) || "all";
  state.q      = localStorage.getItem(STORAGE_SEARCH) || "";
  
  // 🌟 Charger les favoris
  try {
    const favStr = localStorage.getItem(STORAGE_FAVORITES);
    state.favorites = favStr ? JSON.parse(favStr) : [];
  } catch (e) {
    state.favorites = [];
  }

  // phone buttons
  $("#btnEditPhone")?.addEventListener("click", askPhone);
  $("#btnClearPhone")?.addEventListener("click", () => {
    state.phone = "";
    localStorage.removeItem(STORAGE_PHONE);
    render();
  });

  // hero CTAs
  $("#btnGetHub")?.addEventListener("click", () => hub.open(withPhone(PRO_DEFAULT_URL, state.phone, "phone")));
  $("#btnDeals")?.addEventListener("click", () => hub.open(LINKS.bonneAffaire));

  // tabs
  $$(".tab").forEach(btn => btn.addEventListener("click", () => setFilter(btn.dataset.filter)));

  // search
  if (searchInputEl) {
    searchInputEl.value = state.q || "";
    searchInputEl.addEventListener("input", () => setSearch(searchInputEl.value));
  }

  $("#btnReset")?.addEventListener("click", () => {
    state.q = "";
    localStorage.removeItem(STORAGE_SEARCH);
    if (searchInputEl) searchInputEl.value = "";
    setFilter("all");
  });

  // brand scroll top
  $("#homeBrand")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===========================
  // BOUTONS FLOTTANTS
  // ===========================
  const tarifBtn = $("#tarif-bubble-btn");
  const espaceBtn = $("#espace-pro-btn");
  const ndimbalHelpBtn = $("#digiy-help-btn");
  const dashboardBtn = $("#dashboard-bubble-btn"); // NEW

  // 🏷️ Tarifs DIGIY
  if (tarifBtn) tarifBtn.addEventListener("click", () => hub.open(LINKS.tarifs));

  // 🧰 ESPACE PRO
  if (espaceBtn) espaceBtn.addEventListener("click", () => hub.open(withPhone(PRO_DEFAULT_URL, state.phone, "phone")));

  // 📊 DASHBOARD ANALYTICS - NEW
  if (dashboardBtn) dashboardBtn.addEventListener("click", () => openAnalyticsDashboard());

  // ♾️ NDIMBAL - ouvrir popup
  if (ndimbalHelpBtn) {
    ndimbalHelpBtn.addEventListener("click", () => {
      const ndimbal = $("#digiy-ndimbal");
      if (ndimbal) {
        ndimbal.classList.remove("hidden");
        ndimbal.setAttribute("aria-hidden", "false");
      }
    });
  }

  // 📖 MANIFESTE - ouvrir dans nouvel onglet
  const manifestoBtn = document.getElementById('manifesto-bubble-btn');
  if (manifestoBtn) {
    manifestoBtn.addEventListener('click', () => {
      window.open('https://digiylyfe.net/la-revolution-digitale-africaine-sans-commission/', '_blank');
    });
  }

  // NDIMBAL - fermer
  $("#digiyCloseBtn")?.addEventListener("click", () => {
    const ndimbal = $("#digiy-ndimbal");
    if (ndimbal) {
      ndimbal.classList.add("hidden");
      ndimbal.setAttribute("aria-hidden", "true");
    }
  });

  // NDIMBAL - actions
  const ndimbalPopup = $("#digiy-ndimbal");
  if (ndimbalPopup) {
    ndimbalPopup.addEventListener("click", (e) => {
      if (e.target === ndimbalPopup) {
        ndimbalPopup.classList.add("hidden");
        ndimbalPopup.setAttribute("aria-hidden", "true");
        return;
      }

      const btn = e.target?.closest?.("button");
      if (!btn || !btn.dataset.action) return;

      const action = btn.dataset.action;

      ndimbalPopup.classList.add("hidden");
      ndimbalPopup.setAttribute("aria-hidden", "true");

      if (action === "sell") {
        hub.open(withPhone(LINKS.hubDrive, state.phone, "phone"));
      } else if (action === "job") {
        hub.open(withPhone(LINKS.jobs, state.phone, "phone"));
      } else if (action === "qr") {
        const qrModal = $("#qrModal");
        if (qrModal) {
          qrModal.classList.remove("hidden");
          qrModal.setAttribute("aria-hidden", "false");
        }
      }
    });
  }

  // QR Modal - fermer
  $("#qrClose")?.addEventListener("click", () => {
    const qrModal = $("#qrModal");
    if (qrModal) {
      qrModal.classList.add("hidden");
      qrModal.setAttribute("aria-hidden", "true");
    }
  });

  // QR Modal - fermer sur fond
  const qrModalPopup = $("#qrModal");
  if (qrModalPopup) {
    qrModalPopup.addEventListener("click", (e) => {
      if (e.target === qrModalPopup) {
        qrModalPopup.classList.add("hidden");
        qrModalPopup.setAttribute("aria-hidden", "true");
      }
    });
  }

  // apply tab active
  $$(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === state.filter));

  render();
}

document.addEventListener("DOMContentLoaded", () => { boot(); });
