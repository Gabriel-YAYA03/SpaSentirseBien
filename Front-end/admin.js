document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No tienes permiso para acceder a esta página.");
        window.location.href = "login.html";
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
    if (!payload) {
        alert("Token inválido.");
        window.location.href = "login.html";
        return;
    }

    const serviceFormContainer = document.getElementById("service-form-container");
    const serviceForm = document.getElementById("service-form");
    const formTitle = document.getElementById("service-form-title");

    // Mostrar el formulario para añadir un servicio
    document.getElementById("add-service").addEventListener("click", () => {
        formTitle.textContent = "Añadir Servicio";
        serviceForm.dataset.action = "add";
        serviceForm.reset();
        serviceFormContainer.classList.remove("hidden");
    });

    // Mostrar el formulario para editar un servicio
    document.getElementById("edit-service").addEventListener("click", async () => {
        const serviceId = prompt("Ingrese el ID del servicio que desea editar:");
        if (!serviceId) {
            alert("Debe ingresar un ID válido.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${serviceId}`);
            if (!response.ok) {
                alert("No se pudo obtener el servicio.");
                return;
            }
            const servicio = await response.json();

            document.getElementById("nombre").value = servicio.nombre;
            document.getElementById("descripcion").value = servicio.descripcion;
            document.getElementById("duracion").value = servicio.duracion;
            document.getElementById("precio").value = servicio.precio;
            document.getElementById("categoria").value = servicio.categoria;

            formTitle.textContent = "Modificar Servicio";
            serviceForm.dataset.action = "edit";
            serviceForm.dataset.id = serviceId;
            serviceFormContainer.classList.remove("hidden");
        } catch (error) {
            console.error("Error al obtener el servicio:", error);
            alert("Ocurrió un error al obtener el servicio.");
        }
    });

    // Manejar el envío del formulario
    serviceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const action = serviceForm.dataset.action;
        const serviceId = serviceForm.dataset.id;
    
        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const duracion = parseInt(document.getElementById("duracion").value);
        const precio = parseFloat(document.getElementById("precio").value);
        const categoria = document.getElementById("categoria").value;
    
        try {

            console.log("Datos enviados al backend:", {
                nombre,
                descripcion,
                duracion,
                precio,
                categoria,
                serviceId,
            });

            let response;
            if (action === "edit") {
                response = await fetch(`http://localhost:3000/api/servicios/${serviceId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombre, descripcion, duracion, precio, categoria }),
                });
            }
    
            if (response.ok) {
                const data = await response.json();
                alert("Servicio modificado exitosamente.");
                console.log("Respuesta del servidor:", data);
                serviceForm.reset();
                serviceFormContainer.classList.add("hidden");
            } else {
                const errorData = await response.json();
                alert(`Error al modificar el servicio: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error al modificar el servicio:", error);
            alert("Ocurrió un error al modificar el servicio. Por favor, inténtalo nuevamente.");
        }
    });

    // Cancelar el formulario
    document.getElementById("cancel-service").addEventListener("click", () => {
        serviceForm.reset();
        serviceFormContainer.classList.add("hidden");
    });

    // Eliminar un servicio
    document.getElementById("delete-service").addEventListener("click", async () => {
        const serviceId = prompt("Ingrese el ID del servicio que desea eliminar:");
        if (!serviceId) {
            alert("Debe ingresar un ID válido.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/servicios/${serviceId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Servicio eliminado exitosamente.");
            } else {
                alert("Error al eliminar el servicio.");
            }
        } catch (error) {
            console.error("Error al eliminar el servicio:", error);
        }
    });

    // Cerrar sesión
    document.getElementById("logout-button").addEventListener("click", () => {
        localStorage.removeItem("token");
        alert("Has cerrado sesión exitosamente.");
        window.location.href = "index.html";
    });
});