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
    tarjeta.className("tarea");

    tarjeta.dateset.id - tarea.id;
    tarjeta.dataset.prioridad = tarea.prioridad;

    const titulo = document.createElement("h4");
    titulo.textContent = tarea.titulo;

    tarjeta.append(titulo);

    const detalle = document.createElement("small");
    detalle.textContent = "Prioridad: " + tarea.prioridad;

    tarjeta.append(detalle, document.createAttribute("br"));
  }
}
