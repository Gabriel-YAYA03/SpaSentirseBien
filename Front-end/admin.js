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
            alert("Debe ingresar un ID válido.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${serviceId}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "No se pudo obtener el servicio");
            }
            
            const servicio = await response.json();
            if (!servicio) throw new Error("Servicio no encontrado");

            // Rellenar formulario
            document.getElementById("nombre").value = servicio.nombre || "";
            document.getElementById("descripcion").value = servicio.descripcion || "";
            document.getElementById("duracion").value = servicio.duracion || "";
            document.getElementById("precio").value = servicio.precio || "";
            document.getElementById("categoria").value = servicio.categoria || "Masajes";

            formTitle.textContent = "Modificar Servicio";
            serviceForm.dataset.action = "edit";
            serviceForm.dataset.id = serviceId;
            serviceFormContainer.classList.remove("hidden");
        } catch (error) {
            console.error("Error al obtener el servicio:", error);
            alert(`Error: ${error.message}`);
        }
    });

    // Manejar envío del formulario (CREAR/EDITAR)
    serviceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const action = serviceForm.dataset.action;
        const serviceId = serviceForm.dataset.id;
    
        // Validar datos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const duracion = parseInt(document.getElementById("duracion").value);
        const precio = parseFloat(document.getElementById("precio").value);
        const categoria = document.getElementById("categoria").value;

        if (!nombre || !categoria || isNaN(duracion) || isNaN(precio)) {
            alert("Por favor complete todos los campos correctamente");
            return;
        }

        const formData = {
            nombre,
            descripcion: descripcion || null, // Permitir descripción vacía
            duracion,
            precio,
            categoria
        };

        console.log("Datos enviados al backend:", { action, serviceId, ...formData });

        try {
            let response;
            let url = "http://localhost:3000/api/servicios";
            let method = "POST";
            
            if (action === "edit") {
                if (!serviceId) throw new Error("ID de servicio no válido");
                url += `/${serviceId}`;
                method = "PUT";
            }

            response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response) throw new Error("No se recibió respuesta del servidor");
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Error desconocido");
            }

            alert(`Servicio ${action === "edit" ? "modificado" : "creado"} exitosamente!`);
            serviceForm.reset();
            serviceFormContainer.classList.add("hidden");
            window.location.href = "servicios.html";
            
        } catch (error) {
            console.error(`Error al ${action === "edit" ? "modificar" : "crear"} servicio:`, error);
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
});