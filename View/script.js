document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registroForm = document.getElementById("registroForm");
    //Funcion que permite iniciar sesión a un usuario
    if (loginForm) {
        document.getElementById("loginForm").addEventListener("submit", async function(event) {
            event.preventDefault();
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
                window.location.href = "main.html";
            }else {
                alert("Error al iniciar sesión" + (data.error || "Ocurrio un problema"));
            }
            
        });
    }
    //Funcion que permite registrar un usuario
    if (registroForm) {
        document.getElementById("registroForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({nombre, correo, contrasena})
            });
            const data = await response.json();
            alert(data.mensaje);
            registroForm.reset();
        });
    }
});