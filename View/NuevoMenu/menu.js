document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.getElementById("close");
    //Función que cierra sesión
        closeBtn.addEventListener("click", function() {
            sessionStorage.removeItem("token");
            alert("Sesión cerrada");
            window.location.href = "/NuevoLogin/index.html";
        });    
});