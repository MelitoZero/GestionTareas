document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        //Funcion que permite iniciar sesión a un usuario
        const correo = document.getElementById("username").value;
        const contrasena = document.getElementById("password").value;
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({correo, contrasena})
        });
        //Asigna el de token
        const data = await response.json();
        if (data.token) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("usuarioId", data.id);
            window.location.href = "/NuevoMenu/Menu.html";
        }else {
            alert("Error al iniciar sesión " + (data.error || "Ocurrio un problema"));
        }

    });
});