// Contador de visitas
const namespace = "proyectos accesibles";
const key = "visitas-totales";

// Endpoint de CounterAPI
const url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

// Elemento donde se mostrará el contador
const contador = document.getElementById("contador");

if (contador) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            contador.textContent = data.count;
        })
        .catch(error => {
            contador.textContent = "No disponible";
            console.error("No se pudo actualizar el contador:", error);
        });
}