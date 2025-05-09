document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    console.log({ email, contraseña }); // Log para verificar los datos enviados

    try {
        const response = await fetch("http://localhost:3000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, contraseña }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token); // Guardar el token en localStorage
            showToastError("Inicio de sesión exitoso.");
            window.location.href = "admin.html"; // Redirigir al panel de administración
        } else {
            const errorData = await response.json();
            showToastError(`Error: ${errorData.error}`);
        }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            showToastError("Ocurrió un error al iniciar sesión.");
        }
});
function showToastError(message) {
    const toast = document.getElementById("toast-error");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}