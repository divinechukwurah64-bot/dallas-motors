/* =========================================================
   DALLAS MOTORS — Home Page Controller
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  bindQuickFind();
});

function renderFeatured(){
  const wrap = document.getElementById("featuredGrid");
  if (!wrap) return;
  const featured = INVENTORY.filter(v => v.tags.includes("Featured")).slice(0,3);
  const fallback = featured.length ? featured : INVENTORY.slice(0,3);
  wrap.innerHTML = fallback.map(vehicleCard).join("");
  initReveal();
}

function bindQuickFind(){
  const form = document.getElementById("quickFindForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("qfType").value;
    const budget = document.getElementById("qfBudget").value;
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);
    window.location.href = "inventory.html" + (params.toString() ? "?" + params.toString() : "");
  });
}
