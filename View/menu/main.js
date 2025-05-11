document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.getElementById("close");
    //Función que cierra sesión
        closeBtn.addEventListener("click", function() {
            localStorage.removeItem("token");
            alert("Sesión cerrada");
            window.location.href = "/View/login/index.html";
        });    
});