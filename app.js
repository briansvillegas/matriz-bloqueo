let data;

fetch("datos_bloqueos.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    mostrarEtapas();
  });

function header(titulo, subtitulo, volverFn, volverEtapasFn) {
  return `
    <div class="header">
      <div class="header-left">
        ${volverFn ? `<button class="btn-back" onclick="${volverFn}()">←</button>` : ''}
        <div class="header-plant-badge">
          <div class="plant-indicator"></div>
          <span class="plant-name">Planta Zapala</span>
        </div>
        <div class="header-divider"></div>
        <div class="header-title-group">
          <div class="title">${titulo}</div>
          <div class="subtitle">${subtitulo}</div>
        </div>
      </div>
      ${volverEtapasFn ? `<button class="btn-etapas" onclick="${volverEtapasFn}()">⊞ Etapas</button>` : ''}
    </div>
  `;
}

// ETAPAS
function mostrarEtapas() {
  const etapas = Object.keys(data);
  let html = header("Matriz de Bloqueos", `${etapas.length} etapas · Seleccionar para continuar`);

  html += `<div class="container">`;
  html += `<div class="page-eyebrow"><div class="page-eyebrow-line"></div><span class="page-eyebrow-text">Etapas de proceso</span><div class="page-eyebrow-line"></div></div>`;

  etapas.forEach(etapa => {
    const color = data[etapa].color || '#FF6B00';
    const count = data[etapa].equipos.length;
    html += `
      <div class="etapa-card" style="--etapa-color:${color}" onclick="mostrarEquipos('${etapa}')">
        <div>
          <div class="etapa-name">${etapa}</div>
          <div class="etapa-meta">${count} equipo${count !== 1 ? 's' : ''} disponible${count !== 1 ? 's' : ''}</div>
        </div>
        <span class="etapa-arrow">›</span>
      </div>
    `;
  });

  html += `</div>`;
  document.getElementById("app").innerHTML = html;
}

// EQUIPOS
function mostrarEquipos(etapa) {
  const count = data[etapa].equipos.length;

  let html = header(
    etapa,
    `${count} equipo${count !== 1 ? 's' : ''} disponible${count !== 1 ? 's' : ''}`,
    "mostrarEtapas",
    "mostrarEtapas"
  );

  html += `<div class="container">`;
  html += `<div class="page-eyebrow"><div class="page-eyebrow-line"></div><span class="page-eyebrow-text">Seleccionar equipo</span><div class="page-eyebrow-line"></div></div>`;

  data[etapa].equipos.forEach(eq => {
    html += `
      <div class="equipo-card" onclick="mostrarDetalle('${etapa}','${eq.nombre}')">
        <div>
          <div class="equipo-name">${eq.nombre}</div>
          <span class="tag">${eq.tag}</span>
        </div>
        <span class="equipo-arrow">›</span>
      </div>
    `;
  });

  html += `</div>`;
  document.getElementById("app").innerHTML = html;
}

// DETALLE
function mostrarDetalle(etapa, nombreEquipo) {
  const eq = data[etapa].equipos.find(e => e.nombre === nombreEquipo);

  let html = header(
    eq.nombre,
    `${eq.bloqueos.length} bloqueo${eq.bloqueos.length !== 1 ? 's' : ''} requerido${eq.bloqueos.length !== 1 ? 's' : ''}`,
    `mostrarEquipos('${etapa}')`,
    "mostrarEtapas"
  );

  html += `<div class="container">`;

  html += `
    <div class="equipo-hero">
      <div class="equipo-hero-icon">⚙️</div>
      <div>
        <div class="equipo-hero-name">${eq.nombre}</div>
        <span class="tag">${eq.tag}</span>
      </div>
    </div>

    <div class="bloqueos-header">
      <div class="page-eyebrow-text" style="margin-bottom:0">🔒 Equipos a bloquear</div>
      <span class="bloqueo-count-badge">${eq.bloqueos.length} bloqueo${eq.bloqueos.length !== 1 ? 's' : ''}</span>
    </div>

    <div class="lockout-list">
  `;

  eq.bloqueos.forEach((b, i) => {
    html += `
      <div class="bloqueo-card">
        <div class="bloqueo-num">${i + 1}</div>
        <div class="bloqueo-body">
          <div class="bloqueo-desc">${b.descripcion}</div>
          <span class="tag-danger">${b.tag}</span>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  document.getElementById("app").innerHTML = html;
}
