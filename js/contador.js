// Nombre de tu contador
const workspace = "proyectos-accesibles";
const counterName = "visitas-totales";

// Esperamos a que exista el elemento en la página
document.addEventListener("DOMContentLoaded", function () {

    const contador = document.getElementById("contador");

    if (!contador) {
        console.error("No se encontró el elemento #contador.");
        return;
    }

    // Crear el contador
    const counter = new Counter({
        workspace: workspace
    });

    // Registrar una visita y mostrar el nuevo total
    counter.up(counterName)
        .then(function (result) {
            contador.textContent = result.value;
        })
        .catch(function (error) {
            console.error("No se pudo actualizar el contador:", error);
            contador.textContent = "No disponible";
        });
});
