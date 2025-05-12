document.addEventListener("DOMContentLoaded", function () {
    const actualizarForm = document.getElementById("actualizarForm");

    // Función que permite actualizar un usuario
    actualizarForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const id = document.getElementById("usuarioId").value; // Asegúrate de tener un campo oculto o visible con el ID del usuario
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({nombre, correo, contrasena})
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.mensaje);
            actualizarForm.reset();
        } else {
            alert(data.error || "Error al actualizar el usuario");
        }
    });
});
