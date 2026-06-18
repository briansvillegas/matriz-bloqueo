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
        ${volverFn ? `<button class="btn" onclick="${volverFn}()">←</button>` : ''}
        <div>
          <div class="title">${titulo}</div>
          <div class="subtitle">${subtitulo}</div>
        </div>
      </div>

      ${volverEtapasFn ? `<button class="btn" onclick="${volverEtapasFn}()">Etapas</button>` : ''}
    </div>
  `;
}


// ✅ ETAPAS
function mostrarEtapas() {
  let html = header("Planta Zapala", "Seleccionar etapa");

  html += `<div class="container">`;

  Object.keys(data).forEach(etapa => {
    html += `
      <div class="card" onclick="mostrarEquipos('${etapa}')">
        <strong>${etapa}</strong>
        <span>›</span>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById("app").innerHTML = html;
}


// ✅ EQUIPOS
function mostrarEquipos(etapa) {

  let html = header(
    etapa,
    data[etapa].equipos.length + " equipos disponibles",
    "mostrarEtapas",
    "mostrarEtapas"
  );

  html += `<div class="container"><h4>EQUIPOS</h4>`;

  data[etapa].equipos.forEach(eq => {
    html += `
      <div class="card" onclick="mostrarDetalle('${etapa}','${eq.nombre}')">
        <div>
          <strong>${eq.nombre}</strong><br>
          <span class="tag">${eq.tag}</span>
        </div>
        <span>›</span>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById("app").innerHTML = html;
}


// ✅ DETALLE
function mostrarDetalle(etapa, nombreEquipo) {

  const eq = data[etapa].equipos.find(e => e.nombre === nombreEquipo);

  let html = header(
    eq.nombre,
    "Equipos a bloquear",
    `mostrarEquipos('${etapa}')`,
    "mostrarEtapas"
  );

  html += `<div class="container">`;

  html += `
    <div class="card">
      <div>
        <strong>${eq.nombre}</strong><br>
        <span class="tag">${eq.tag}</span>
      </div>
    </div>

    <h4>🔒 EQUIPOS A BLOQUEAR (${eq.bloqueos.length})</h4>
  `;

  eq.bloqueos.forEach((b, i) => {
    html += `
      <div class="card">
        <div class="bloqueo">
          <div class="numero">${i+1}</div>
          <div>${b.descripcion}</div>
        </div>
        <span class="tag">${b.tag}</span>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById("app").innerHTML = html;
}
