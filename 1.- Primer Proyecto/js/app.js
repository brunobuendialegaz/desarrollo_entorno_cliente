console.log("aplicación iniciada correctamente");

// seleccionar los elementos del dom

const nombre = document.getElementById("nombre");
const botonSaludar = document.querySelector("#botonSaludar"); // este busca por clase, al ser singular, devuelve el primero, si fuera all, traería todos los que compartan esa clase, hay mas sintaxis, por ejemplo #nombre para IDS, es sintaxis de CSS
const mensaje = document.getElementById("mensaje");

botonSaludar.addEventListener("click", () => {
  const nombreActual = nombre.value.trim();

  if (nombreActual === "") {
    mensaje.textContent = "Debes introducir un nombre";
  } else {
    mensaje.textContent = `Hola ${nombreActual}`;
  }
});
