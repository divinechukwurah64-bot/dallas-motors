/* =========================================================
   DALLAS MOTORS — Shared Site Behavior
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initFooterYear();
  initFavorites();
});

/* ---------------- NAV ---------------- */
function initNav(){
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!nav) return;

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });

  if (toggle && mobileMenu){
    toggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      toggle.innerHTML = open ? ICON.close : ICON.menu;
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      toggle.innerHTML = ICON.menu;
    }));
  }

  // mark active link based on current page
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

/* ---------------- SCROLL REVEAL ---------------- */
function initReveal(){
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

function initFooterYear(){
  document.querySelectorAll(".js-year").forEach(el => el.textContent = new Date().getFullYear());
}

/* ---------------- FAVORITES (session-local, no backend) ---------------- */
function getFavorites(){
  try { return JSON.parse(sessionStorage.getItem("dallas_favorites") || "[]"); }
  catch(e){ return []; }
}
function toggleFavorite(id){
  let favs = getFavorites();
  if (favs.includes(id)) favs = favs.filter(f => f !== id);
  else favs.push(id);
  sessionStorage.setItem("dallas_favorites", JSON.stringify(favs));
  return favs;
}
function initFavorites(){
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".v-card-fav");
    if (!btn) return;
    e.preventDefault();
    const id = btn.dataset.id;
    const favs = toggleFavorite(id);
    btn.classList.toggle("is-active", favs.includes(id));
  });
}

/* ---------------------------------------------------------
   Vehicle card markup — used by home (featured) & inventory
--------------------------------------------------------- */
function vehicleCard(v){
  const favs = getFavorites();
  const isFav = favs.includes(v.id);
  const rangeOrMpg = v.fuel === "Electric"
    ? `<div class="v-spec">${ICON.battery}<span>${v.range} mi range</span></div>`
    : `<div class="v-spec">${ICON.fuel}<span>${v.mpg} mpg</span></div>`;

  return `
  <article class="v-card glass reveal">
    <div class="v-card-media">
      <div class="v-card-tags">
        ${v.tags.map(t => `<span class="chip ${t==='Electric'?'chip-good':'chip-red'}">${t}</span>`).join("")}
      </div>
      <button class="v-card-fav ${isFav?'is-active':''}" data-id="${v.id}" aria-label="Save to favorites">${ICON.heart}</button>
      <img src="${photoUrl(v.id,{w:640})}" alt="${v.make} ${v.model}" loading="lazy">
    </div>
    <div class="v-card-body">
      <div class="v-card-head">
        <div>
          <div class="v-card-make">${v.make.toUpperCase()} · ${v.year}</div>
          <h3>${v.model}</h3>
        </div>
        <div class="v-card-price"><b>${formatPrice(v.price)}</b><span>${typeLabel(v.type)}</span></div>
      </div>
      <div class="v-card-specs">
        <div class="v-spec">${ICON.gauge}<span>${v.hp} hp</span></div>
        <div class="v-spec">${ICON.transmission}<span>${v.trans}</span></div>
        ${rangeOrMpg}
        <div class="v-spec">${ICON.seat}<span>${v.seats} seats</span></div>
      </div>
      <div class="v-card-foot">
        <a class="btn btn-glass btn-sm btn-block" href="car-detail.html?id=${v.id}">View details</a>
        <a class="btn btn-primary btn-sm" href="contact.html?id=${v.id}" aria-label="Enquire about ${v.model}">${ICON.arrowRight}</a>
      </div>
    </div>
  </article>`;
}
