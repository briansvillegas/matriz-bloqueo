let data;

// Cargar datos
fetch("datos_bloqueos.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderEtapas();
  });


// ✅ 1. Mostrar etapas
function renderEtapas() {
  const cont = document.getElementById("etapas");
  cont.innerHTML = "<h2>Etapas</h2>";

  Object.keys(data).forEach(etapa => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.borderLeftColor = data[etapa].color;

    card.innerText = etapa;

    card.onclick = () => renderEquipos(etapa);

    cont.appendChild(card);
  });
}


// ✅ 2. Mostrar equipos
function renderEquipos(etapa) {
  const cont = document.getElementById("equipos");
  cont.innerHTML = `<h2>${etapa}</h2>`;

  data[etapa].equipos.forEach(eq => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>${eq.nombre}</strong><br>
      <small>${eq.tag}</small>
    `;

    card.onclick = () => renderDetalle(eq);

    cont.appendChild(card);
  });

  document.getElementById("detalle").innerHTML = "";
}


// ✅ 3. Mostrar bloqueos
function renderDetalle(equipo) {
  const cont = document.getElementById("detalle");

  cont.innerHTML = `
    <h2>${equipo.nombre}</h2>
    <p><b>${equipo.tag}</b></p>
    <h3>Equipos a bloquear</h3>
  `;

  equipo.bloqueos.forEach(b => {
    const row = document.createElement("div");
    row.className = "card";

    row.innerHTML = `
      ${b.descripcion}<br>
      <small>${b.tag}</small>
    `;

    cont.appendChild(row);
  });
}