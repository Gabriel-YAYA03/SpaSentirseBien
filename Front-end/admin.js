document.addEventListener("DOMContentLoaded", () => {
    // Verificación de token
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No tienes permiso para acceder a esta página.");
        window.location.href = "login.html";
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload) {
            throw new Error("Token inválido");
        }
    } catch (error) {
        alert("Error de autenticación: " + error.message);
        window.location.href = "login.html";
        return;
    }

    // Elementos del DOM
    const serviceFormContainer = document.getElementById("service-form-container");
    const serviceForm = document.getElementById("service-form");
    const formTitle = document.getElementById("service-form-title");

    // Mostrar formulario para añadir servicio
    document.getElementById("add-service").addEventListener("click", () => {
        formTitle.textContent = "Añadir Servicio";
        serviceForm.dataset.action = "add";
        serviceForm.reset();
        serviceFormContainer.classList.remove("hidden");
    });

    // Mostrar formulario para editar servicio
    document.getElementById("edit-service").addEventListener("click", async () => {
        const serviceId = prompt("Ingrese el ID del servicio que desea editar:");
        if (!serviceId || isNaN(serviceId)) {
            alert("Debe ingresar un ID válido");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${serviceId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al obtener el servicio");
            }

            const serviceData = await response.json();
            formTitle.textContent = "Editar Servicio";
            serviceForm.dataset.action = "edit";
            serviceForm.dataset.serviceId = serviceId; // Guardar el ID
            document.getElementById("nombre").value = serviceData.nombre;
            document.getElementById("duracion").value = serviceData.duracion;
            document.getElementById("precio").value = serviceData.precio;
            document.getElementById("categoria").value = serviceData.categoria;
            serviceFormContainer.classList.remove("hidden");

        } catch (error) {
            console.error("Error al obtener el servicio:", error);
            alert(`Error: ${error.message}`);
        }
    });


    // Procesar el formulario (añadir o editar)
    serviceForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const duracion = parseInt(document.getElementById("duracion").value);
        const precio = parseFloat(document.getElementById("precio").value);
        const categoria = document.getElementById("categoria").value;

        if (!nombre || isNaN(duracion) || isNaN(precio) || !categoria) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        const serviceData = { nombre, duracion, precio, categoria };
        const action = serviceForm.dataset.action;
        const serviceId = serviceForm.dataset.serviceId;

        let url = "http://localhost:3000/api/servicios";
        let method = "POST";

        if (action === "edit") {
            url += `/${serviceId}`;
            method = "PUT";
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(serviceData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al procesar el servicio");
            }

            const responseData = await response.json();
            alert(responseData.message);
            serviceForm.reset();
            serviceFormContainer.classList.add("hidden");
            window.location.href = "servicios.html"; // Recargar la página
        } catch (error) {
            console.error("Error al procesar el servicio:", error);
            alert(`Error: ${error.message}`);
        }
    });

    // Cancelar formulario
    document.getElementById("cancel-service").addEventListener("click", () => {
        serviceForm.reset();
        serviceFormContainer.classList.add("hidden");
    });

    // Eliminar servicio
    document.getElementById("delete-service").addEventListener("click", async () => {
        const serviceId = prompt("Ingrese el ID del servicio que desea eliminar:");
        if (!serviceId || isNaN(serviceId)) {
            alert("ID no válido");
            return;
        }

        if (!confirm(`¿Está seguro que desea eliminar el servicio con ID ${serviceId}?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${serviceId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al eliminar");
            }

            alert("Servicio eliminado exitosamente");
            window.location.href = "servicios.html";
        } catch (error) {
            console.error("Error al eliminar servicio:", error);
            alert(`Error: ${error.message}`);
        }
    });

    // Cerrar sesión
    document.getElementById("logout-button").addEventListener("click", () => {
        localStorage.removeItem("token");
        alert("Has cerrado sesión exitosamente.");
        window.location.href = "index.html";
    });

    // Combo actions (Add, Edit, Delete) - Placeholder functionality
    document.getElementById("add-combo").addEventListener("click", () => {
        alert("Función para añadir combo en desarrollo.");
    });

    document.getElementById("edit-combo").addEventListener("click", () => {
        alert("Función para modificar combo en desarrollo.");
    });

    document.getElementById("delete-combo").addEventListener("click", () => {
        alert("Función para eliminar combo en desarrollo.");
    });

    // Generate and send invitation code
    document.getElementById("generate-code-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;

        try {
            const response = await fetch("http://localhost:3000/api/admin/generate-and-send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al generar y enviar el código");
            }

            const data = await response.json();
            alert(data.message);
            document.getElementById("generate-code-form").reset();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    });

});