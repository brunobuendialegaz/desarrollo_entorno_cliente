"use strict";

const nombrePelu = "Peladillos Eladio"; // constantes

let clientesAtendidos = 5; // variables

// con strings

console.log("Clientes atendidos: ", clientesAtendidos);

const precioCorte = 8; // number puede ser entero

const precioBarba = 8.5; // o decimal, pero siempre number

console.log("precioCorte", typeof precioCorte);

console.log("precioBarba", typeof precioBarba);

const tieneCita = true; // booleans, en minuscula
const tieneDescuento = false;

console.log(tieneCita);
console.log(tieneDescuento);

let horaCita; // undefined

console.log(horaCita);
console.log(typeof horaCita);

const telCliente = null; // null

console.log("telefono cliente: ", telCliente);
console.log("telefono cliente: ", typeof telCliente);

const serviciosDisponibles = ["Corte clásico", "Corte moderno", "Corte barba"]; // array

console.log("Servicios: ", serviciosDisponibles);
console.log("Servicios: ", typeof serviciosDisponibles);
console.log("Es un array? ", Array.isArray(serviciosDisponibles));

const cliente = {
  id: 1,
  nombre: "Ana",
  edad: 30,
  tieneCita: true,
}; // objetos

console.log(cliente);
console.log(cliente["nombre"]); // forma mas comoda para iterar
console.log(cliente.edad); // forma mas comoda en el resto de casos

let dato = 25; // se puede ir cambiando el tipo de una variable

console.log(dato);
console.log(typeof dato);

dato = "pepe";

console.log(dato);
console.log(typeof dato);

dato = true;

console.log(dato);
console.log(typeof dato);

// operadores

const precio1 = 20;
const precio2 = 30;
const precio3 = "4";

console.log("suma: ", precio1 + precio2 + precio3); // primero suma y luego concatena, ojo con esto
console.log("resta: ", precio1 - precio2);
console.log("división: ", precio1 / precio2); // de aqui adelante, autocastea a number, por ejemplo un "4" -> 4 suma y resta NO.
console.log("multiplicación: ", precio1 * precio2);
console.log("módulo: ", precio1 % precio2);

// operadores de comparación

const edad = 20;

console.log(edad == 20); // igual, "4" == 4
console.log(edad === 20); // estrictamente igual "4" != 4
console.log(edad > 18);
console.log(edad < 18);
console.log(edad >= 18);
console.log(edad <= 18);
