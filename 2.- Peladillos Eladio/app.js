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
    precio: 100,
  },
  lavado: {
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
    .replaceAll("'", "&#039");
}

function buscarServicios(id) {
  return SERVICIOS.find((servicio) => servicio.id === id);
}
