//Hace la verificación de token dentro de las paginas para permitir o negar el acceso
const token = sessionStorage.getItem("token");
if (!token) {
    window.location.href= "/NuevoLogin/index.html";
}