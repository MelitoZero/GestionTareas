document.addEventListener("DOMContentLoaded", async ()=> {
    const select = document.getElementById("listaTareas");
    const usuarioID = sessionStorage.getItem("usuarioId");
    if (usuarioID) {
        console.log("El id del usuario es: ", usuarioID);
    }

});