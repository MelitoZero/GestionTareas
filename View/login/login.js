document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            //Funcion que permite iniciar sesión a un usuario
            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({correo, contrasena})
            });
            //Verificación de token
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                alert("Inicio de sesión exitoso");
                window.location.href = "/View/menu/main.html";
            }else {
                alert("Error al iniciar sesión " + (data.error || "Ocurrio un problema"));
            }

        });
});