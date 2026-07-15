/* =========================================================
   DALLAS MOTORS — Inventory Page Controller
   ========================================================= */

const PAGE_SIZE = 9;
let state = {
  search: "",
  types: new Set(),
  makes: new Set(),
  fuels: new Set(),
  maxPrice: 130000,
  sort: "relevance",
  page: 1,
};

document.addEventListener("DOMContentLoaded", () => {
  buildFilterOptions();
  bindControls();
  applyFromQueryString();
  render();
});

function applyFromQueryString(){
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (type){ state.types.add(type); }
}

function buildFilterOptions(){
  const types = ["sedan","suv","truck","sports","electric","luxury"];
  const typeWrap = document.getElementById("filterTypes");
  typeWrap.innerHTML = types.map(t => {
    const count = INVENTORY.filter(v => v.type === t).length;
    return `<label class="filter-check">
      <input type="checkbox" value="${t}" data-group="types">
      <span>${typeLabel(t)}</span><span class="count">${count}</span>
    </label>`;
  }).join("");

  const makes = [...new Set(INVENTORY.map(v => v.make))].sort();
  const makeWrap = document.getElementById("filterMakes");
  makeWrap.innerHTML = makes.map(m => {
    const count = INVENTORY.filter(v => v.make === m).length;
    return `<label class="filter-check">
      <input type="checkbox" value="${m}" data-group="makes">
      <span>${m}</span><span class="count">${count}</span>
    </label>`;
  }).join("");

  const fuels = [...new Set(INVENTORY.map(v => v.fuel))].sort();
  const fuelWrap = document.getElementById("filterFuels");
  fuelWrap.innerHTML = fuels.map(f => {
    const count = INVENTORY.filter(v => v.fuel === f).length;
    return `<label class="filter-check">
      <input type="checkbox" value="${f}" data-group="fuels">
      <span>${f}</span><span class="count">${count}</span>
    </label>`;
  }).join("");
}

function bindControls(){
  document.getElementById("invSearch").addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  document.getElementById("invSort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  document.getElementById("priceRange").addEventListener("input", (e) => {
    state.maxPrice = Number(e.target.value);
    document.getElementById("priceRangeVal").textContent = formatPrice(state.maxPrice);
    state.page = 1;
    render();
  });

  document.querySelectorAll("input[data-group]").forEach(input => {
    input.addEventListener("change", () => {
      const group = state[input.dataset.group];
      if (input.checked) group.add(input.value);
      else group.delete(input.value);
      state.page = 1;
      render();
      syncCheckboxesFromState();
    });
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    state.types.clear(); state.makes.clear(); state.fuels.clear();
    state.maxPrice = 130000; state.search = ""; state.page = 1;
    document.getElementById("invSearch").value = "";
    document.getElementById("priceRange").value = 130000;
    document.getElementById("priceRangeVal").textContent = formatPrice(130000);
    document.querySelectorAll("input[data-group]").forEach(i => i.checked = false);
    render();
  });
}

function syncCheckboxesFromState(){
  document.querySelectorAll("input[data-group]").forEach(input => {
    input.checked = state[input.dataset.group].has(input.value);
  });
}

function getFiltered(){
  return INVENTORY.filter(v => {
    if (state.types.size && !state.types.has(v.type)) return false;
    if (state.makes.size && !state.makes.has(v.make)) return false;
    if (state.fuels.size && !state.fuels.has(v.fuel)) return false;
    if (v.price > state.maxPrice) return false;
    if (state.search){
      const hay = `${v.make} ${v.model} ${v.year} ${v.type} ${v.fuel}`.toLowerCase();
      if (!hay.includes(state.search)) return false;
    }
    return true;
  });
}

function getSorted(list){
  const sorted = [...list];
  switch(state.sort){
    case "price-asc": sorted.sort((a,b) => a.price - b.price); break;
    case "price-desc": sorted.sort((a,b) => b.price - a.price); break;
    case "year-desc": sorted.sort((a,b) => b.year - a.year); break;
    case "mileage-asc": sorted.sort((a,b) => a.mileage - b.mileage); break;
    default: sorted.sort((a,b) => b.rating - a.rating);
  }
  return sorted;
}

function render(){
  syncCheckboxesFromState();
  const filtered = getSorted(getFiltered());
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  document.getElementById("invCount").innerHTML = `<b>${total}</b> vehicle${total===1?'':'s'} found`;

  const grid = document.getElementById("vehicleGrid");
  if (!pageItems.length){
    grid.innerHTML = `<div class="empty-state glass" style="grid-column:1/-1">
      ${ICON.search}
      <h3>No matches yet</h3>
      <p>Try widening your price range or clearing a filter.</p>
      <button class="btn btn-glass" onclick="document.getElementById('clearFilters').click()">Clear all filters</button>
    </div>`;
  } else {
    grid.innerHTML = pageItems.map(vehicleCard).join("");
  }
  initReveal();

  renderActiveChips();
  renderPagination(totalPages);
}

function renderActiveChips(){
  const wrap = document.getElementById("activeFilters");
  const chips = [];
  state.types.forEach(t => chips.push({ group:"types", value:t, label:typeLabel(t) }));
  state.makes.forEach(m => chips.push({ group:"makes", value:m, label:m }));
  state.fuels.forEach(f => chips.push({ group:"fuels", value:f, label:f }));
  if (state.maxPrice < 130000) chips.push({ group:"price", value:"", label:`Under ${formatPrice(state.maxPrice)}` });

  if (!chips.length){ wrap.innerHTML = ""; wrap.style.display = "none"; return; }
  wrap.style.display = "flex";
  wrap.innerHTML = chips.map(c => `<span class="chip" data-group="${c.group}" data-value="${c.value}">${c.label} ${ICON.x}</span>`).join("");
  wrap.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const g = chip.dataset.group, v = chip.dataset.value;
      if (g === "price"){ state.maxPrice = 130000; document.getElementById("priceRange").value = 130000; document.getElementById("priceRangeVal").textContent = formatPrice(130000); }
      else state[g].delete(v);
      state.page = 1;
      render();
    });
  });
}

function renderPagination(totalPages){
  const wrap = document.getElementById("pagination");
  if (totalPages <= 1){ wrap.innerHTML = ""; return; }
  let html = "";
  for (let i=1; i<=totalPages; i++){
    html += `<button class="page-btn ${i===state.page?'active':''}" data-page="${i}">${i}</button>`;
  }
  wrap.innerHTML = html;
  wrap.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.page = Number(btn.dataset.page);
      render();
      document.getElementById("vehicleGrid").scrollIntoView({ behavior:"smooth", block:"start" });
    });
  });
}
