"use strict";

const $ = (selector) => document.querySelector(selector);

const tareas = [
  {
    id: 1,
    titulo: "Preparar documentación",
    prioridad: "alta",
    estado: "pendiente",
  },

  {
    id: 2,
    titulo: "Revisar página web",
    prioridad: "media",
    estado: "en-proceso",
  },

  {
    id: 3,
    titulo: "Enviar presupuesto",
    prioridad: "baja",
    estado: "completada",
  },
];

let siguienteId = 4;

let busqueda = "";

let seguimiento = null;

const estados = ["pendiente", "en-proceso", "completada"];

function avisar(texto) {
  $("#mensaje").textContent = texto;
}

function debounce(fn, ms) {
  let id;

  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}

function throttle(fn, ms) {
  let ultimo = 0;
  return (...args) => {
    const ahora = Date.now();
    if (ahora - ultimo >= ms) {
      ultimo = ahora;
      fn(...args);
    }
  };
}

function notificarCambio() {
  const total = tareas.length;

  const tareasNoCompletadas = tareas.filter((t) => t.estado !== "completada");

  $("#tablero").dispatchEvent(
    new CustomEvent("tareas:cambiadas", {
      bubbles: true,

      detail: {
        total: total,
        noCompletadas: tareasNoCompletadas.length,
      },
    }),
  );
}

document.addEventListener("tareas:cambiadas", (event) => {
  console.log("evento recibido: ", event.type);
  console.log("detalles: ", event.detail);
});

function renderizar() {
  for (const estado of estados) {
    $("#" + estado).replaceChildren();
  }

  const filtro = $("#filtro").value;

  for (const tarea of tareas) {
    if (filtro !== "todas" && tarea.prioridad !== filtro) {
      continue; // no esta en el filtro estado
    }
    if (!tarea.titulo.toLocaleLowerCase().includes(busqueda)) {
      continue; // no esta en el filtro busqueda
    }

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarea";

    tarjeta.dataset.id = tarea.id;
    tarjeta.dataset.prioridad = tarea.prioridad;

    const titulo = document.createElement("h4");
    titulo.textContent = tarea.titulo;

    tarjeta.append(titulo);

    const detalle = document.createElement("small");
    detalle.textContent = "Prioridad: " + tarea.prioridad;

    tarjeta.append(detalle, document.createElement("br"));

    for (const [accion, texto] of [
      ["anterior", "<- Anterior"],
      ["siguiente", "Siguiente ->"],
      ["eliminar", "Eliminar"],
    ]) {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.dataset.accion = accion;
      boton.textContent = texto;

      const indice = estados.indexOf(tarea.estado);

      boton.disabled =
        (accion === "anterior" && indice === 0) ||
        (accion === "siguiente" && indice === 2);

      tarjeta.append(boton);
    }

    $("#" + tarea.estado).append(tarjeta);
  }
  notificarCambio();
}

$("#formulario").addEventListener("submit", (event) => {
  event.preventDefault(); // evitamos que se borren los inputs

  const titulo = $("#titulo").value.trim();

  if (!titulo) {
    avisar("Introduce un título válido");
    $("#titulo").focus();
    return;
  }

  tareas.push({
    id: siguienteId++,
    titulo,
    prioridad: $("#prioridad").value,
    estado: "pendiente",
  });

  $("#formulario").reset();

  $("#contador").textContent = "0/80";

  avisar("Tarea añadida");

  renderizar();

  $("#titulo").focus();
});

// llamadas

renderizar();
