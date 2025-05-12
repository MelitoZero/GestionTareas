document.addEventListener("DOMContentLoaded", async ()=> {
    const select = document.getElementById("listaTareas");
    const id_usuario = sessionStorage.getItem("id_usuario");
    if (id_usuario) {
        console.log("El id del usuario es: ", id_usuario);
    }
    async function obtenerListaPorUsuario(id_usuario) {
        try {
            const respuesta = await fetch(`/listas/${id_usuario}`);
            if (!respuesta.ok) throw new Error("Error al obtener listas");
            const listas = await respuesta.json();
            return listas;    
        } catch (error) {
            console.error("Error al obtener listas del usuario:", error);
            return []; 
        }
    }
    async function cargarListas(id_usuario) {
        const listas = await obtenerListaPorUsuario(id_usuario);
        const selectElement = document.getElementById("listaTareas");
        // Limpiar opciones anteriores
        selectElement.innerHTML = "";
        // Agregar nuevas opciones
        listas.forEach(lista => {
            const option = document.createElement("option");
            option.value = lista.id;
            option.textContent = lista.nombre;
            selectElement.appendChild(option);
    });
}

// Llamar la función al cargar la página con el ID del usuario ya obtenido
//const userId = obtenerIdUsuario(); // Suponiendo que ya tienes esta función
cargarListas(id_usuario);

});