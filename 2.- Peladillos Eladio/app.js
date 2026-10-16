"use strict";

const TIENDA = {
  nombre: "Peladillos Eladio",
  divisa: "EUR",
  idioma: "es-ES",
  edadMinima: 16,
};

const SERVICIOS = [
  {
    id: "taper fade",
    name: "Corte fade",
    precio: 15,
    duracion: 35,
  },
  {
    id: "brocoli",
    name: "Corte brocoli",
    precio: 15,
    duracion: 25,
  },
  {
    id: "buzzcut",
    name: "Corte buzz",
    precio: 12,
    duracion: 20,
  },
];

const EXTRAS = {
  lavado: {
    nombre: "Lavado gostoso",
    precio: 4,
  },
  cejas: {
    nombre: "Pulido de cejas",
    precio: 3,
  },
};

const DESCUENTO_MIEMBRO = 0.02;
const CODIGO_CUPON = "ELADIO10";
const CUPON_DESCUENTO = 0.1;

const servicesGrid = document.querySelector("#servicesGrid");
const serviceSelect = document.querySelector("#serviceSelect");
const bookingForm = document.querySelector("#bookingForm");
const ticketContent = document.querySelector("#ticketContent");
const formMessage = document.querySelector("#formMessage");

function formatMoney(importe) {
  // Intl sirve para hacer cosas con enteros, libreria interesante
  return new Intl.NumberFormat(TIENDA.idioma, {
    style: "currency",
    currency: TIENDA.divisa,
  }).format(importe);
}

function escape(value) {
  // para evitarnos errores posibles al usar en un string caracteres especiales
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buscarServicios(id) {
  return SERVICIOS.find((servicio) => servicio.id === id);
}

function buscarExtra(id) {
  return EXTRAS[id];
}

function renderizarServicios() {
  let cardsHtml = "";
  let optionHtml = `
    <option value="" selected disabled>
      - Selecciona un servicio -
    </option>
  `;

  for (const servicio of SERVICIOS) {
    cardsHtml += `
      <article class="card">
        <h3>${servicio.name}</h3>
        <p>${servicio.duracion} min</p>
        <span class="price">${formatMoney(servicio.precio)}</span>
      </article>
    `;

    optionHtml += `
      <option value="${servicio.id}">
        ${servicio.name} - ${formatMoney(servicio.precio)}
      </option>
    `;
  }

  servicesGrid.innerHTML = cardsHtml;
  serviceSelect.innerHTML = optionHtml;
}

function renderizarServiciosCreate() {
  // mismo pero mas codigo, menos bonito, pero mejor en seguridad, por que no permites meter codigo en caliente. USAR SIEMPRE si el cliente puede meter aqui cosas por ejemplo en un form. Si viene de bbdd, podemos usar el otro

  for (const servicio of SERVICIOS) {
    const article = document.createElement("article");
    article.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = servicio.name;

    const duration = document.createElement("p");
    duration.textContent = `${servicio.duracion} min`;

    const price = document.createElement("span");
    precio.classList.add("price");
    precio.textContent = formatMoney(servicio.precio);

    article.append(title, duration, price);
    servicesGrid.append(article);
  }
}

function leerFormulario() {
  const datos = new FormData(bookingForm);
  const name = String(datos.get("clientName") ?? "").trim();
  const age = Number(datos.get("age"));
  const extras = datos.getAll("extras").map(String);
  const coupon = String(datos.get("coupon") ?? "")
    .trim()
    .toUpperCase();
  const servicioId = String(datos.get("service") ?? "");
  const dia = String(datos.get("day") ?? "");
  const esMiembro = datos.get("member") === "on";

  return {
    name,
    age,
    servicioId,
    dia,
    extras,
    coupon,
    esMiembro,
  };
}

function validarReserva(reserva) {
  const errores = [];

  if (!reserva.name) {
    errores.push("Escribe tu nombre");
  }

  if (Number.isNaN(reserva.age)) {
    errores.push("La edad debe ser un numero");
  } else if (reserva.age < TIENDA.edadMinima || reserva.age > 120) {
    errores.push(`La edad debe estar entre ${TIENDA.edadMinima} y 120`);
  }

  if (!buscarServicios(reserva.servicioId)) {
    errores.push("El servicio no existe");
  }

  if (!reserva.dia) {
    errores.push("Selecciona un dia");
  }

  return errores;
}

function calcularReserva(reserva) {
  const servicio = buscarServicios(reserva.servicioId);
  let subtotal = servicio?.precio ?? 0;

  const extras = [];
  for (const id of reserva.extras) {
    const extra = buscarExtra(id);
    if (extra) {
      extras.push(extra);
      subtotal += extra.precio;
    }
  }

  let descuento = 0;

  if (reserva.esMiembro) descuento += DESCUENTO_MIEMBRO;
  if (reserva.coupon === CODIGO_CUPON) descuento += CUPON_DESCUENTO;

  const montoDescontado = subtotal * descuento;
  const total = subtotal - montoDescontado;
  return {
    servicio,
    extras,
    subtotal,
    descuento,
    montoDescontado,
    total,
  };
}

function obtenerMensajeEdad(edad) {
  if (edad < TIENDA.edadMinima) {
    return "No cumples con la edad minima";
  } else if (edad >= 65) {
    return "Bienvenido jubilado!";
  } else {
    return "Contamos contigo!";
  }
}

function obtenerMensajeDia(dia) {
  switch (dia) {
    case "Lunes":
      return "Empezar a tope la semana!";
    case "Viernes":
      return "Acabar a tope la semana!";
    case "Sábado":
      return "Bendito sábado";
    default:
      return "Un buen dia para retocarse!";
  }
}

function renderizarTicket() {
  const reserva = leerFormulario();
  const resultado = calcularReserva(reserva);
  const nombreServicio = resultado.servicio?.name ?? "Sin seleccionar";
  const nombresExtras = resultado.extras
    .map((extra) => extra.nombre)
    .join(", ");

  ticketContent.innerHTML = `
    <div class="ticket-row">
      <span>Cliente</span>
      <strong>${escape(reserva.name || "sin indicar")}</strong>
    </div>

    <div class="ticket-row">
      <span>Miembro</span>
      <strong>${reserva.esMiembro ? "Sí" : "No"}</strong>
    </div>

    <div class="ticket-row">
      <span>Dia</span>
      <strong>${escape(reserva.dia || "sin indicar")}</strong>
    </div>

    <div class="ticket-row">
      <span>Servicio</span>
      <strong>${escape(nombreServicio)}</strong>
    </div>

    <div class="ticket-row">
      <span>Extras</span>
      <strong>${escape(nombresExtras || "ninguno")}</strong>
    </div>

    <div class="ticket-row">
      <span>Subtotal</span>
      <strong>${formatMoney(resultado.subtotal)}</strong>
    </div>

    <div class="ticket-row">
      <span>Descuento</span>
      <strong>${formatMoney(resultado.montoDescontado)}</strong>
    </div>

    <div class="ticket-row">
      <span>Total</span>
      <strong>${formatMoney(resultado.total)}</strong>
    </div>

  `;
}

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const reserva = leerFormulario();

  const errores = validarReserva(reserva);

  if (errores.length > 0) {
    formMessage.textContent = errores.join(" ");

    return;
  }

  const resultado = calcularReserva(reserva);

  formMessage.textContent =
    `Reserva preparada para ${reserva.name}` +
    `Total: ${formatMoney(resultado.total)}`;

  renderizarTicket();
});

renderizarServicios();
