document.addEventListener("DOMContentLoaded", function () {
    const actualizarForm = document.getElementById("registroForm");

    const id = sessionStorage.getItem("usuarioId");
    console.log("ID del usuario autenticado:", id);

    if (!id) {
        alert("Usuario no autenticado.");
        return;
    }

    actualizarForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` }) // solo si tu backend verifica tokens
                },
                body: JSON.stringify({ nombre, correo, contrasena })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensaje);
                actualizarForm.reset();
            } else {
                console.error("Error en la respuesta:", data);
                alert(data.error || "Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error en fetch:", error);
            alert("Error al conectar con el servidor");
        }
    });
});
