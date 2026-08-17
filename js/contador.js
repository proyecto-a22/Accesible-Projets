document.addEventListener("DOMContentLoaded", function () {

    const contador = document.getElementById("contador");

    if (!contador) {
        console.error("No se encontró el elemento #contador.");
        return;
    }

    // Identificador de nuestro contador
    const namespace = "proyectos-accesibles";
    const key = "visitas-totales";

    // Endpoint público de CounterAPI
    const url = `https://counterapi.com/api/${namespace}/view/${key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log("Respuesta de CounterAPI:", data);

            if (typeof data.value !== "undefined") {
                contador.textContent = data.value;
            } else {
                throw new Error("La respuesta no contiene un valor.");
            }
        })
        .catch(error => {
            console.error("No se pudo actualizar el contador:", error);
            contador.textContent = "No disponible";
        });
});
