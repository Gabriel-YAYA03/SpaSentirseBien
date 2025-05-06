document.addEventListener("DOMContentLoaded", () => {
    const serviceButtons = document.querySelectorAll(".service-button");
    const precioTotalElement = document.getElementById("resumen-precio");
    const duracionTotalElement = document.getElementById("resumen-duracion");
    const resumenServicios = document.getElementById("resumen-servicios");
    const noServiciosTexto = document.createElement("li");
    noServiciosTexto.textContent = "No has seleccionado servicios aún.";
    resumenServicios.appendChild(noServiciosTexto);

    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");
    const resumenFecha = document.getElementById("resumen-fecha");
    const resumenHora = document.getElementById("resumen-hora");
    const continuarBtn = document.getElementById("continuar-btn");

    const maxDuracion = 240; // Máximo de 4 horas (240 minutos)
    let duracionTotal = 0;
    let precioTotal = 0;

    // Actualizar fecha y hora en el resumen
    fechaInput.addEventListener("change", () => {
        resumenFecha.textContent = fechaInput.value || "No seleccionada";
    });

    horaInput.addEventListener("change", () => {
        resumenHora.textContent = horaInput.value || "No seleccionada";
    });

    // Actualizar servicios seleccionados
    serviceButtons.forEach(button => {
        button.addEventListener("click", () => {
            const duracion = parseInt(button.dataset.duracion);
            const precio = parseInt(button.dataset.precio);

            if (button.classList.contains("selected")) {
                // Deseleccionar servicio
                button.classList.remove("selected");
                duracionTotal -= duracion;
                precioTotal -= precio;
                const servicio = resumenServicios.querySelector(`[data-id="${button.textContent}"]`);
                if (servicio) servicio.remove();
            } else {
                // Verificar si se puede seleccionar
                if (duracionTotal + duracion > maxDuracion) {
                    alert("No puedes seleccionar más servicios. Excedes el tiempo máximo permitido.");
                    return;
                }
                // Seleccionar servicio
                button.classList.add("selected");
                duracionTotal += duracion;
                precioTotal += precio;

                // Agregar servicio al resumen
                const li = document.createElement("li");
                li.textContent = `${button.textContent}`;
                li.setAttribute("data-id", button.textContent);
                resumenServicios.appendChild(li);
            }

            // Mostrar u ocultar el texto "No has seleccionado servicios aún."
            if (resumenServicios.querySelectorAll("li[data-id]").length === 0) {
                if (!resumenServicios.contains(noServiciosTexto)) {
                    resumenServicios.appendChild(noServiciosTexto);
                }
            } else {
                if (resumenServicios.contains(noServiciosTexto)) {
                    noServiciosTexto.remove();
                }
            }

            // Actualizar el resumen
            duracionTotalElement.textContent = duracionTotal;
            precioTotalElement.textContent = precioTotal;
        });
    });

    // Redirigir al formulario de contacto
    continuarBtn.addEventListener("click", () => {
        const fecha = fechaInput.value;
        const hora = horaInput.value;
        const servicios = Array.from(resumenServicios.querySelectorAll("li[data-id]")).map(li => li.textContent);
        const duracionTotal = duracionTotalElement.textContent;
        const precioTotal = precioTotalElement.textContent;

        if (!fecha || !hora || servicios.length === 0) {
            alert("Por favor, completa todos los campos y selecciona al menos un servicio antes de continuar.");
            return;
        }

        const queryParams = new URLSearchParams({
            fecha,
            hora,
            servicios: JSON.stringify(servicios),
            duracionTotal,
            precioTotal
        });
        window.location.href = `contacto.html?${queryParams.toString()}`;
    });
});