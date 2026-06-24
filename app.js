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

// Segundo header contextual: muestra la etapa o el equipo seleccionado
function subHeader({ icon = '⚙️', titulo, tag, meta, color }) {
  return `
    <div class="sub-header" style="${color ? `--sub-color:${color}` : ''}">
      <div class="sub-header-icon">${icon}</div>
      <div class="sub-header-content">
        <div class="sub-header-title">${titulo}</div>
        <div class="sub-header-meta-row">
          ${tag ? `<span class="tag">${tag}</span>` : ''}
          ${meta ? `<span class="sub-header-meta">${meta}</span>` : ''}
        </div>
      </div>
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
    const color = data[etapa].color || '#E25C00';
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
  const color = data[etapa].color || '#E25C00';

  let html = header(
    "Matriz de Bloqueos",
    "Sistema de bloqueo y etiquetado",
    "mostrarEtapas",
    "mostrarEtapas"
  );

  html += subHeader({
    icon: '⊞',
    titulo: etapa,
    meta: `${count} equipo${count !== 1 ? 's' : ''} disponible${count !== 1 ? 's' : ''}`,
    color
  });

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
/*
function mostrarDetalle(etapa, nombreEquipo) {
  const eq = data[etapa].equipos.find(e => e.nombre === nombreEquipo);
  const color = data[etapa].color || '#E25C00';

  let html = header(
    "Matriz de Bloqueos",
    "Sistema de bloqueo y etiquetado",
    `mostrarEquipos('${etapa}')`,
    "mostrarEtapas"
  );

  html += subHeader({
    icon: '⚙️',
    titulo: eq.nombre,
    tag: eq.tag,
    color
  });

  html += `<div class="container">`;

  html += `
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
}*/

function mostrarDetalle(etapa, nombreEquipo) {
  const eq = data[etapa].equipos.find(e => e.nombre === nombreEquipo);
  const color = data[etapa].color || '#E25C00';

  let html = header(
    "Matriz de Bloqueos",
    "Sistema de bloqueo y etiquetado",
    `mostrarEquipos('${etapa}')`,
    "mostrarEtapas"
  );

  html += subHeader({
    icon: '⚙️',
    titulo: eq.nombre,
    tag: eq.tag,
    meta: eq.tarea || '',
    color
  });

  html += `<div class="container">`;

  html += `
    <div class="detail-actions">
      <button class="btn-matriz" onclick="verMatriz('${etapa}', '${eq.nombre.replace(/'/g, "\\'")}')">
        Ver matriz
      </button>
    </div>
  `;

  html += `
    <div class="bloqueos-header">
      <div class="section-label">🔒 Equipos a bloquear</div>
      <div class="bloqueo-count-badge">
        ${eq.bloqueos.length} bloqueo${eq.bloqueos.length !== 1 ? 's' : ''}
      </div>
    </div>
  `;

  html += `<div class="lockout-list">`;

  eq.bloqueos.forEach((b, i) => {
    html += `
      <div class="bloqueo-card">
        <div class="bloqueo-num">${i + 1}</div>
        <div class="bloqueo-body">
          <div class="bloqueo-desc">${b.descripcion || ''}</div>
          <div class="tag-danger">${b.tag || ''}</div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  html += `</div>`;

  document.getElementById("app").innerHTML = html;
}

function verMatriz(etapa, nombreEquipo) {
  const eq = data[etapa].equipos.find(e => e.nombre === nombreEquipo);
  const color = data[etapa].color || '#E25C00';

  let html = header(
    "Matriz de Bloqueos",
    "Vista completa de la matriz",
    `mostrarDetalle('${etapa}', '${eq.nombre.replace(/'/g, "\\'")}')`,
    "mostrarEtapas"
  );

  html += subHeader({
    icon: '📋',
    titulo: eq.nombre,
    tag: eq.tag,
    meta: eq.tarea || '',
    color
  });

  html += `<div class="container">`;

  html += `
    <div class="matriz-info-card">
      <div class="matriz-info-grid">
        <div class="matriz-info-item">
          <span class="matriz-info-label">Etapa</span>
          <span class="matriz-info-value">${etapa}</span>
        </div>
        <div class="matriz-info-item">
          <span class="matriz-info-label">Equipo</span>
          <span class="matriz-info-value">${eq.nombre}</span>
        </div>
        <div class="matriz-info-item">
          <span class="matriz-info-label">TAG</span>
          <span class="matriz-info-value matriz-code">${eq.tag || '-'}</span>
        </div>
        <div class="matriz-info-item">
          <span class="matriz-info-label">Tarea</span>
          <span class="matriz-info-value">${eq.tarea || '-'}</span>
        </div>
      </div>
    </div>
  `;

  html += `
    <div class="tabla-wrapper">
      <table class="tabla-matriz">
        <thead>
          <tr>
            <th>Descripción del Equipamiento</th>
            <th>TAG</th>
            <th>Energía Peligrosa</th>
            <th>Tipo de Bloqueo</th>
            <th>Dónde</th>
            <th>Cómo</th>
            <th>Dispositivo de Bloqueo</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
  `;

  eq.bloqueos.forEach(b => {
    html += `
      <tr>
        <td>${b.descripcion || ''}</td>
        <td>${b.tag || ''}</td>
        <td>${b.energia || ''}</td>
        <td>${b.tipoBloqueo || ''}</td>
        <td>${b.donde || ''}</td>
        <td>${b.como || ''}</td>
        <td>${b.dispositivo || ''}</td>
        <td>${b.comentarios || ''}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  html += `</div>`;

  document.getElementById("app").innerHTML = html;
}
