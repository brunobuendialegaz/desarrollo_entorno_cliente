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

// eventListener del boton crear
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

//eventListener buscador
$("#buscar").addEventListener(
  "input",
  debounce((event) => {
    busqueda = event.target.value.toLocaleLowerCase().trim();
    renderizar();
  }, 300),
);

//eventListener a tablero, para gestionar los botones de mover y eliminar
$("#tablero").addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-accion]");
  if (!boton || !event.currentTarget.contains(boton)) {
    return;
  }

  const tarjeta = boton.closest(".tarea");

  if (!tarjeta) {
    return;
  }

  const id = Number(tarjeta.dataset.id);

  const indice = tareas.findIndex((t) => t.id === id);

  if (indice < 0) {
    return;
  }

  const accion = boton.dataset.accion;

  if (accion === "eliminar") {
    tareas.splice(indice, 1);
  } else {
    const actual = estados.indexOf(tareas[indice].estado);

    tareas[indice].estado = estados[actual + (accion === "siguiente" ? 1 : -1)];
  }

  avisar("Acción realizada: " + accion);
  renderizar();
});

// doble click, cambiar titulos
$("#tablero").addEventListener("dblclick", (event) => {
  const titulo = event.target.closest(".tarea h4");

  if (!titulo || !$("#tablero").contains(titulo)) {
    return;
  }

  const tarea = tareas.find(
    (t) => t.id === Number(titulo.closest(".tarea").dataset.id),
  );

  if (!tarea) {
    return;
  }

  const nuevo = prompt("Nuevo título: ", tarea.titulo);

  if (nuevo === null || !nuevo.trim()) {
    return;
  }

  tarea.titulo = nuevo.trim().slice(0, 80);

  renderizar();

  avisar("Título actualizado");
});

// todos los keydown
document.addEventListener("keydown", (event) => {
  // teniendo en cuenta si esta escribiendo
  const editando =
    event.target.matches("input,textarea,select") ||
    event.target.isContentEditable;

  if (editando || event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  // por ejemplo quitar foco con escape
  if (
    event.key === "Escape" &&
    document.activeElement.matches("input,select")
  ) {
    document.activeElement.blur();
  }

  //ir a buscar nueva con intro
  if (event.key === "/") {
    event.preventDefault();
    $("#buscar").focus();
  }
});

// llamadas

renderizar();
