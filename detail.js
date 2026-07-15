/* =========================================================
   DALLAS MOTORS — Vehicle Detail Page Controller
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || INVENTORY[0].id;
  const v = findVehicle(id) || INVENTORY[0];
  renderDetail(v);
  bindTabs();
  bindFinanceCalc(v);
  renderSimilar(v);
});

function renderDetail(v){
  document.title = `${v.make} ${v.model} — Dallas Motors`;

  document.getElementById("breadcrumbType").textContent = typeLabel(v.type);
  document.getElementById("breadcrumbType").href = `inventory.html?type=${v.type}`;
  document.getElementById("breadcrumbModel").textContent = `${v.make} ${v.model}`;

  document.getElementById("galleryMain").innerHTML = `<img src="${photoUrl(v.id,{w:1400,q:85})}" alt="${v.make} ${v.model}" id="galleryMainImg">`;
  const vBase = photoBaseFor(v.id);
  const thumbCrops = [
    photoUrl(v.id,{w:400}),
    `${vBase}?q=80&w=400&auto=format&fit=crop&crop=left&ixlib=rb-4.1.0`,
    `${vBase}?q=80&w=400&auto=format&fit=crop&crop=right&ixlib=rb-4.1.0`,
  ];
  const thumbs = document.getElementById("galleryThumbs");
  thumbs.innerHTML = thumbCrops.map((src,i) => `<button class="${i===0?'active':''}" data-i="${i}"><img src="${src}" alt="View ${i+1}"></button>`).join("")
    + `<button data-i="diagram" aria-label="View technical line diagram">${CAR_SVG[v.type]}</button>`;
  thumbs.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    thumbs.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const i = btn.dataset.i;
    document.getElementById("galleryMainImg") && (document.getElementById("galleryMain").innerHTML =
      i === "diagram" ? CAR_SVG[v.type] : `<img src="${thumbCrops[i].replace('w=400','w=1400').replace('q=80','q=85')}" alt="${v.make} ${v.model}" id="galleryMainImg">`);
  }));

  document.getElementById("vTags").innerHTML = v.tags.map(t => `<span class="chip ${t==='Electric'?'chip-good':'chip-red'}">${t}</span>`).join("") +
    `<span class="chip">${typeLabel(v.type)}</span>`;
  document.getElementById("vTitle").textContent = `${v.make} ${v.model}`;
  document.getElementById("vSub").textContent = `${v.year} · ${v.color} · ${formatMiles(v.mileage)}`;
  document.getElementById("vPrice").textContent = formatPrice(v.price);

  const rangeOrMpg = v.fuel === "Electric" ? `${v.range} mi range` : `${v.mpg} mpg`;
  document.getElementById("vQuickSpecs").innerHTML = `
    <div class="v-spec">${ICON.gauge}<span>${v.hp} hp</span></div>
    <div class="v-spec">${ICON.transmission}<span>${v.trans}</span></div>
    <div class="v-spec">${ICON.fuel}<span>${rangeOrMpg}</span></div>
    <div class="v-spec">${ICON.seat}<span>${v.seats} seats</span></div>
    <div class="v-spec">${ICON.calendar}<span>${v.year}</span></div>
  `;

  document.getElementById("overviewText").textContent =
    `This ${v.year} ${v.make} ${v.model} pairs a ${v.hp} hp ${v.fuel.toLowerCase()} powertrain with ${v.drivetrain} drivetrain, ` +
    `finished in ${v.color.toLowerCase()} with ${formatMiles(v.mileage)} on the odometer. Every Dallas vehicle passes a ` +
    `150-point certified inspection before it reaches the lot, and comes with a full digital service history.`;

  document.getElementById("specTable").innerHTML = [
    ["Make", v.make], ["Model", v.model], ["Year", v.year], ["Body type", typeLabel(v.type)],
    ["Engine / Motor", v.fuel], ["Horsepower", `${v.hp} hp`], ["Transmission", v.trans], ["Drivetrain", v.drivetrain],
    ["Mileage", formatMiles(v.mileage)], [v.fuel==="Electric" ? "Range" : "Fuel economy", v.fuel==="Electric" ? `${v.range} mi` : `${v.mpg} mpg`],
    ["Seating", `${v.seats} seats`], ["Exterior color", v.color],
  ].map(([k,val]) => `<div class="spec-row"><span>${k}</span><b>${val}</b></div>`).join("");

  document.getElementById("featureList").innerHTML = v.features.map(f => `<li>${ICON.check}${f}</li>`).join("");

  document.getElementById("favBtn").addEventListener("click", (e) => {
    const favs = toggleFavorite(v.id);
    e.currentTarget.classList.toggle("is-active", favs.includes(v.id));
  });
  if (getFavorites().includes(v.id)) document.getElementById("favBtn").classList.add("is-active");

  document.getElementById("enquireLink").href = `contact.html?id=${v.id}`;
}

function bindTabs(){
  const tabs = document.querySelectorAll(".detail-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
}

function bindFinanceCalc(v){
  const down = document.getElementById("financeDown");
  const term = document.getElementById("financeTerm");
  const rate = 0.069; // representative APR estimate shown to the shopper
  const update = () => {
    const downVal = Number(down.value) || 0;
    const termVal = Number(term.value);
    const principal = Math.max(v.price - downVal, 0);
    const monthlyRate = rate/12;
    const payment = principal * monthlyRate / (1 - Math.pow(1+monthlyRate, -termVal));
    document.getElementById("financeMonthly").textContent = "$" + (isFinite(payment) ? payment.toFixed(0) : "0");
    document.getElementById("financePrincipal").textContent = formatPrice(Math.round(principal));
  };
  down.addEventListener("input", update);
  term.addEventListener("change", update);
  update();
}

function renderSimilar(v){
  const wrap = document.getElementById("similarGrid");
  if (!wrap) return;
  const similar = INVENTORY.filter(x => x.id !== v.id && x.type === v.type).slice(0,3);
  const list = similar.length ? similar : INVENTORY.filter(x => x.id !== v.id).slice(0,3);
  wrap.innerHTML = list.map(vehicleCard).join("");
  initReveal();
}
