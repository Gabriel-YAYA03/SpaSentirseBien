document.addEventListener("DOMContentLoaded", () => {
    const metodoPagoRadios = document.querySelectorAll("input[name='metodo-pago']");
    const efectivoInfo = document.getElementById("efectivo-info");
    const transferenciaInfo = document.getElementById("transferencia-info");
    const urlParams = new URLSearchParams(window.location.search);
    const fecha = urlParams.get("fecha");
    const hora = urlParams.get("hora");
    const servicios = JSON.parse(urlParams.get("servicios") || "[]");
    const duracionTotal = urlParams.get("duracionTotal");
    const precioTotal = urlParams.get("precioTotal");

    metodoPagoRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "efectivo") {
                efectivoInfo.style.display = "block";
                transferenciaInfo.style.display = "none";
            } else if (radio.value === "transferencia") {
                efectivoInfo.style.display = "none";
                transferenciaInfo.style.display = "block";
            }
        });
    });

    // Mostrar los datos en el resumen
    document.getElementById("resumen-fecha").textContent = fecha || "No seleccionada";
    document.getElementById("resumen-hora").textContent = hora || "No seleccionada";
    const resumenServicios = document.getElementById("resumen-servicios");
    servicios.forEach(servicio => {
        const li = document.createElement("li");
        li.textContent = servicio;
        resumenServicios.appendChild(li);
    });
    document.getElementById("resumen-duracion").textContent = duracionTotal || "0";
    document.getElementById("resumen-precio").textContent = precioTotal || "0";

    // Enviar el formulario
    const contactoForm = document.getElementById("contacto-form");
    contactoForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(contactoForm);
        const cliente = {
            nombre: formData.get("nombre"),
            apellido: formData.get("apellido"),
            telefono: formData.get("telefono"),
            nacionalidad: formData.get("nacionalidad"),
            dni: formData.get("dni"),
            correo: formData.get("correo"),
            comentario: formData.get("comentario") || "",
        };

        const turno = {
            fecha,
            hora,
            servicios,
            duracionTotal,
            precioTotal,
            metodoPago: formData.get("metodo-pago"),
        };

        try {
            const response = await fetch("http://tu-backend.com/api/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cliente, turno }),
            });

            if (response.ok) {
                alert("Reserva confirmada. Recibirás un correo con los detalles.");
                window.location.href = "index.html";
            } else {
                const errorData = await response.json();
                alert(`Error al confirmar la reserva: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Ocurrió un error al confirmar la reserva. Por favor, inténtalo nuevamente.");
        }
    });
});