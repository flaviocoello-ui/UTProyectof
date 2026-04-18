document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registro");
    const contrasena = document.getElementById("contrasena");
    const confirmar = document.getElementById("confirmar_contrasena");
    const nombre = document.getElementById("nombre");

    form.addEventListener("submit", function (e) {
        // Validar contraseñas
        if (contrasena.value !== confirmar.value) {
            e.preventDefault();
            alert("Las contraseñas no coinciden. Por favor, intenta nuevamente.");
            return;
        }

        // Validar si el usuario es "admin"
        if (nombre.value.trim().toLowerCase() === "admin") {
            e.preventDefault(); // Detener el envío del formulario
            window.location.href = "useradmin.html"; // Redirigir a otra página
        }
    });
});
