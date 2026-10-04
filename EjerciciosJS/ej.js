// ej 1

// const nombreAlumno = "Bruno Buendia";
// let edad = 31;
// const centro = "Prometeo";
// let curso = "segundo DAW";

// console.log(nombreAlumno);
// console.log(edad);
// console.log(centro);
// console.log(curso);

// edad = 32;
// curso = "titulado DAW";
// centro = "otro"; ej.js:15 Uncaught TypeError: Assignment to constant variable.
//at ej.js:15:8

// console.log(nombreAlumno);
// console.log(edad);
// console.log(centro);
// console.log(curso);

// ej 2

// const nombre = "Champú";
// let precio = 19.95;
// let disponibilidad = true;
// let dato;
// let dato2 = "";
// let dato3 = null;

// console.log(typeof nombre);
// console.log(typeof precio);
// console.log(typeof disponibilidad);
// console.log(typeof dato);
// console.log(typeof dato2);
// console.log(typeof dato3);

// ej 3

// const a = 25;
// const b = "25";
// const c = true;
// let d;
// const e = null;
// const f = [1, 2, 3];
// const g = {
//   nombre: "Eladio",
// };

// console.log(typeof a);
// console.log(typeof b);
// console.log(typeof c);
// console.log(typeof d);
// console.log(typeof e);
// console.log(typeof f);
// console.log(typeof g);

// ej 4

// let resultado = 10;
// console.log(typeof resultado);

// resultado = "diez";
// console.log(typeof resultado);

// resultado = true;
// console.log(typeof resultado);

// resultado = null;
// console.log(typeof resultado);

// ej 5

// const nombre = "Ana";
// const edad = 24;
// let ciudad = "Lorca";
// if (true) {
//   console.log(nombre);
//   console.log(edad);
//   console.log(ciudad);
// }
// console.log(nombre);
// console.log(edad);
// console.log(ciudad);

// 1. ¿Qué console.log() funcionarán? Todos los de dentro del if y solo nombre fuera
// 2. ¿Cuáles producirán un error? edad y ciudad fuera del if
// 3. ¿Por qué? por el scope

// ej 6

// const numero1 = 20;
// const numero2 = 6;

// const suma = (a, b) => a + b;
// const resta = (a, b) => a - b;
// const multiplicacion = (a, b) => a * b;
// const division = (a, b) => a / b;
// const resto = (a, b) => a % b;

// console.log(suma(numero1, numero2));
// console.log(resta(numero1, numero2));
// console.log(multiplicacion(numero1, numero2));
// console.log(division(numero1, numero2));
// console.log(resto(numero1, numero2));

// ej 7

// const numero1 = 8;
// const numero2 = 17;
// const numero3 = 24;

// console.log(numero1, "es par?", numero1 % 2 === 0);
// console.log(numero2, "es par?", numero2 % 2 === 0);
// console.log(numero3, "es par?", numero3 % 2 === 0);

// ej 8

// console.log(10 + 5);
// console.log("10" + 5);
// console.log(10 + "5");
// console.log("10" + "5");
// console.log(10 - 5);
// console.log("10" - 5);
// console.log(10 * "5");

// Después ejecútalo.
// 1. ¿Por qué '10' + 5 no produce 15? por que concatena el string, da 105
// 2. ¿Por qué el comportamiento de - es diferente? por que - solo es operador, nunca es concatenar
// 3. ¿Qué está haciendo JavaScript automáticamente? esta parseando a number con el -, *

// ej 9

// const precio = "25";
// const gastosEnvio = 5;
// console.log(typeof precio);

// console.log(Number(precio) + gastosEnvio);

// console.log(typeof Number(precio));

// ej 10

// const a = "123";
// console.log("Valor original:", a);
// console.log("Tipo original:", typeof a);
// console.log("Valor convertido:", Number(a));
// console.log("Tipo convertido", typeof Number(a));

// const b = 25;
// console.log("Valor original:", b);
// console.log("Tipo original:", typeof b);
// console.log("Valor convertido:", String(b));
// console.log("Tipo convertido", typeof String(b));

// const c = true;
// console.log("Valor original:", c);
// console.log("Tipo original:", typeof c);
// console.log("Valor convertido:", String(c));
// console.log("Tipo convertido", typeof String(c));

// const d = 1;
// console.log("Valor original:", d);
// console.log("Tipo original:", typeof d);
// console.log("Valor convertido:", Boolean(d));
// console.log("Tipo convertido", typeof Boolean(d));

// const e = 0;
// console.log("Valor original:", e);
// console.log("Tipo original:", typeof e);
// console.log("Valor convertido:", Boolean(e));
// console.log("Tipo convertido", typeof Boolean(e));

// const f = "hola";
// console.log("Valor original:", f);
// console.log("Tipo original:", typeof f);
// console.log("Valor convertido:", boolean(f));
// console.log("Tipo convertido", typeof boolean(f));

// const g = "";
// console.log("Valor original:", g);
// console.log("Tipo original:", typeof g);
// console.log("Valor convertido:", boolean(g));
// console.log("Tipo convertido", typeof boolean(g));
