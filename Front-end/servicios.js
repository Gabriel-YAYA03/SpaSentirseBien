document.addEventListener("DOMContentLoaded", async () => {
    const serviciosIndividualesContainer = document.getElementById("servicios-individuales");
    const serviciosGrupalesContainer = document.getElementById("servicios-grupales");

    // Función para obtener los servicios desde el backend
    async function fetchServicios() {
        try {
            const response = await fetch("http://localhost:3000/api/servicios");
            if (!response.ok) {
                throw new Error("Error al obtener los servicios");
            }
            const servicios = await response.json();
            renderServicios(servicios);
        } catch (error) {
            console.error("Error al cargar los servicios:", error);
        }
    }

    // Función para renderizar los servicios en la interfaz
    function renderServicios(servicios) {
        serviciosIndividualesContainer.innerHTML = "";
        serviciosGrupalesContainer.innerHTML = "";

        servicios.forEach(servicio => {
            const serviceBox = document.createElement("div");
            serviceBox.classList.add("service-box");
            serviceBox.innerHTML = `
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
                <p><strong>Duración:</strong> ${servicio.duracion} min</p>
                <p><strong>Precio:</strong> $${servicio.precio.toFixed(2)}</p>
            `;

            if (servicio.categoria === "Servicios Grupales") {
                serviciosGrupalesContainer.appendChild(serviceBox);
            } else {
                serviciosIndividualesContainer.appendChild(serviceBox);
            }
        });
    }

    // Llamar a la función para cargar los servicios
    fetchServicios();
});