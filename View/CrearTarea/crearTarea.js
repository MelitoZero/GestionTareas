document.addEventListener("DOMContentLoaded", async ()=> {
    const select = document.getElementById("listaTareas");
    const userId = 
    try {
        const response = await fetch("http://localhost:3000/listas");
        const listas = await response.json();
        listas.forEach(lista => {
            const option = document.createElement("option");
            option.value = lista.id;
            option.textContent = lista.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar las listas", error);
    }

});