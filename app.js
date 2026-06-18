let data;
let currentEtapa = null;

// Cargar datos
fetch("datos_bloqueos.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderEtapas();
  });

// Navegar entre pantallas
function goTo(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + screen).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 1. Mostrar etapas
function renderEtapas() {
  const grid = document.getElementById("etapas-grid");
  grid.innerHTML = "";

  Object.keys(data).forEach(etapa => {
    const d = data[etapa];

    const card = document.createElement("div");
    card.className = "stage-card";
    card.style.borderLeftColor = d.color;

    card.innerHTML = `
      <div class="stage-name">${etapa}</div>
      <div class="stage-count">${d.equipos.length} equipo${d.equipos.length !== 1 ? "s" : ""}</div>
      <div class="stage-arrow">
        Ver equipos
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </div>
    `;

    card.addEventListener("click", () => {
      currentEtapa = etapa;
      renderEquipos(etapa);
      goTo("equipos");
    });

    grid.appendChild(card);
  });
}

// 2. Mostrar equipos de una etapa
function renderEquipos(etapa) {
  const d = data[etapa];

  document.getElementById("equipos-etapa-title").textContent = etapa;
  document.getElementById("equipos-etapa-sub").textContent =
    d.equipos.length + " equipo" + (d.equipos.length !== 1 ? "s" : "") + " disponibles";
  document.getElementById("equipos-header").style.background = d.color;

  const list = document.getElementById("equipos-list");
  list.innerHTML = "";

  d.equipos.forEach(eq => {
    const card = document.createElement("div");
    card.className = "equipo-card";

    card.innerHTML = `
      <div class="equipo-info">
        <div class="equipo-nombre">${eq.nombre}</div>
        <span class="equipo-tag">${eq.tag}</span>
      </div>
      <svg class="equipo-chevron" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    `;

    card.addEventListener("click", () => {
      renderDetalle(eq, etapa);
      goTo("detalle");
    });

    list.appendChild(card);
  });
}

// 3. Mostrar detalle de bloqueos de un equipo
function renderDetalle(equipo, etapa) {
  const d = data[etapa];

  document.getElementById("detalle-title").textContent = equipo.nombre;
  document.getElementById("back-etapa-label").textContent = etapa;
  document.getElementById("detalle-header").style.background = d.color;

  document.getElementById("back-to-equipos-btn").onclick = () => goTo("equipos");

  const cont = document.getElementById("detalle-content");

  cont.innerHTML = `
    <div class="detalle-header-card">
      <div class="detalle-nombre">${equipo.nombre}</div>
      <span class="detalle-tag">${equipo.tag}</span>
    </div>
    <p class="bloqueos-title">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
      Equipos a bloquear (${equipo.bloqueos.length})
    </p>
  `;

  equipo.bloqueos.forEach((b, i) => {
    const row = document.createElement("div");
    row.className = "bloqueo-row";
    row.innerHTML = `
      <div class="bloqueo-num">${i + 1}</div>
      <div class="bloqueo-desc">${b.descripcion}</div>
      <span class="bloqueo-tag">${b.tag}</span>
    `;
    cont.appendChild(row);
  });
}
