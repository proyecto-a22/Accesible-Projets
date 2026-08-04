// js/lector.js
const leerVozAlta = document.getElementById("leerVozAlta");
const controlesLectura = document.getElementById("controlesLectura");
const velocidad = document.getElementById("velocidad");
let lecturaActual = null;

function detenerLectura() {
speechSynthesis.cancel();
lecturaActual = null;
}

function reproducir(titulo, contenido) {
if (!leerVozAlta.checked) return;
detenerLectura();

lecturaActual = new SpeechSynthesisUtterance(titulo + ". " + contenido);
lecturaActual.lang = "es-ES";
lecturaActual.rate = parseFloat(velocidad.value);
speechSynthesis.speak(lecturaActual);
}

leerVozAlta.addEventListener("change", () => {
controlesLectura.disabled = !leerVozAlta.checked;
if (!leerVozAlta.checked) {
detenerLectura();
} else {
// Al activarlo, lee el capítulo que esté visible actualmente
const titulo = document.getElementById("tituloCapitulo").textContent;
const contenido = document.getElementById("contenidoCapitulo").textContent;
reproducir(titulo, contenido);
}
});

velocidad.addEventListener("input", () => {
if (leerVozAlta.checked) {
const titulo = document.getElementById("tituloCapitulo").textContent;
const contenido = document.getElementById("contenidoCapitulo").textContent;
reproducir(titulo, contenido);
}
});

window.addEventListener("beforeunload", detenerLectura);

// Exportamos la función para que la use el HTML
window.ejecutarLector = () => {
if (leerVozAlta.checked) {
const titulo = document.getElementById("tituloCapitulo").textContent;
const contenido = document.getElementById("contenidoCapitulo").textContent;
reproducir(titulo, contenido);
}
};
Modifica tu libro.html
Solo necesitas hacer dos cambios: añadir la etiqueta <script src="js/lector.js"></script> y llamar a ejecutarLector() dentro de tu función mostrarCapitulo.

En el <head> o justo antes de cerrar el <body>:
<script src="js/lector.js"></script>

Dentro de tu script principal en libro.html, actualiza mostrarCapitulo así:

function mostrarCapitulo(i) {
indiceActual = i;
document.getElementById("tituloCapitulo").textContent = capitulos[i].titulo;
document.getElementById("contenidoCapitulo").textContent = capitulos[i].contenido;
document.getElementById("progreso").textContent = Cap ${i+1}/${capitulos.length};
document.getElementById("btnAnterior").disabled = i === 0;
document.getElementById("btnSiguiente").disabled = i === capitulos.length - 1;

// --- NUEVA LÍNEA: Esto dispara el lector si estaba activado ---
if (typeof ejecutarLector === 'function') ejecutarLector();
}
