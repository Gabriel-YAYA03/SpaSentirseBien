document.addEventListener("DOMContentLoaded", async () => {
    const serviciosIndividualesContainer = document.getElementById("servicios-individuales");
    const serviciosGrupalesContainer = document.getElementById("servicios-grupales");

    // Configuración de imágenes y descripciones por categoría
    const categoriasConfig = {
        "Masajes": {
            imagen: "masajes.jpeg",
            descripcion: "Relájate con nuestros masajes diseñados para aliviar el estrés y mejorar tu bienestar."
        },
        "Belleza": {
            imagen: "belleza.jpeg",
            descripcion: "Realza tu belleza natural con nuestros tratamientos personalizados."
        },
        "Tratamientos Faciales": {
            imagen: "facial.jpeg",
            descripcion: "Rejuvenece tu piel con nuestras terapias faciales y productos naturales."
        },
        "Tratamientos Corporales": {
            imagen: "corporales.jpeg",
            descripcion: "Disfruta de tratamientos avanzados para moldear tu cuerpo."
        },
        "Servicios Grupales": {
            // Configuración general para servicios grupales
            imagen: "default-grupal.jpg",
            descripcion: "Disfruta de nuestros servicios grupales exclusivos."
        }
    };

    // Imágenes específicas para servicios grupales conocidos
    const imagenesGrupales = {
        "Hidromasajes": "hidromasaje.jpg",
        "Yoga": "yoga.jpeg"
    };

    async function fetchServicios() {
        try {
            const response = await fetch("http://localhost:3000/api/servicios");
            if (!response.ok) throw new Error("Error al cargar servicios");
            const servicios = await response.json();
            organizarServicios(servicios);
        } catch (error) {
            console.error("Error:", error);
            serviciosIndividualesContainer.innerHTML = `<p class="error">${error.message}</p>`;
            serviciosGrupalesContainer.innerHTML = "";
        }
    }

    function organizarServicios(servicios) {
        // Limpiar contenedores
        serviciosIndividualesContainer.innerHTML = "";
        serviciosGrupalesContainer.innerHTML = "";

        // Separar servicios individuales/grupales
        const { individuales, grupales } = servicios.reduce((acc, servicio) => {
            if (servicio.categoria === "Servicios Grupales") {
                // Servicios grupales (mostrar cada uno individualmente)
                acc.grupales.push(servicio);
            } else {
                // Servicios individuales (agrupar por categoría)
                if (!acc.individuales[servicio.categoria]) {
                    acc.individuales[servicio.categoria] = [];
                }
                acc.individuales[servicio.categoria].push(servicio);
            }
            return acc;
        }, { individuales: {}, grupales: [] });

        // Renderizar servicios individuales (agrupados por categoría)
        for (const [categoria, servicios] of Object.entries(individuales)) {
            const config = categoriasConfig[categoria] || {};
            serviciosIndividualesContainer.appendChild(
                crearCajaServicioIndividual(categoria, servicios, config)
            );
        }

        // Renderizar servicios grupales (cada uno en su propia caja)
        grupales.forEach(servicio => {
            const imagen = imagenesGrupales[servicio.nombre] || categoriasConfig["Servicios Grupales"].imagen;
            const descripcion = servicio.descripcion || categoriasConfig["Servicios Grupales"].descripcion;
            
            serviciosGrupalesContainer.appendChild(
                crearCajaServicioGrupal(servicio.nombre, servicio, imagen, descripcion)
            );
        });
    }

    function crearCajaServicioIndividual(categoria, servicios, config) {
        const serviceBox = document.createElement("div");
        serviceBox.classList.add("service-box");
        serviceBox.innerHTML = `
            <img src="images/${config.imagen}" alt="${categoria}">
            <h3>${categoria}</h3>
            <p>${config.descripcion}</p>
            <ul>
                ${servicios.map(s => `
                    <li><strong>${s.nombre}:</strong> $${s.precio.toFixed(2)} - ${s.duracion} min</li>
                `).join("")}
            </ul>
        `;
        return serviceBox;
    }

    function crearCajaServicioGrupal(nombreServicio, servicio, imagen, descripcion) {
        const serviceBox = document.createElement("div");
        serviceBox.classList.add("service-box", "service-box-grupal");
        serviceBox.innerHTML = `
            <img src="images/${imagen}" alt="${nombreServicio}">
            <h3>${nombreServicio}</h3>
            <p>${descripcion}</p>
            <div class="service-details">
                <p><strong>Precio:</strong> $${servicio.precio.toFixed(2)}</p>
                <p><strong>Duración:</strong> ${servicio.duracion} min</p>
            </div>
        `;
        return serviceBox;
    }

    fetchServicios();
});