document.addEventListener("DOMContentLoaded", () => {
    const formLista = document.getElementById("list-form");
    const formTarea = document.getElementById("task-form");

    formLista.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Capturar valores del formulario
        const nombreLista = document.getElementById("list-title-input").value;
        const descripcion = document.getElementById("list-description-input").value;
        const id_usuario = sessionStorage.getItem("id_usuario");

        try {
            // Enviar solicitud al backend
            const response = await fetch("http://localhost:3000/listas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre: nombreLista, descripcion: descripcion, id_usuario: id_usuario }),
            });
            if (!response.ok) {
                throw new Error("Error al crear la lista");
            }
            const data = await response.json();
        } catch (error) {
            console.error("Error al crear lista:", error);
            alert("Hubo un problema al crear la lista");
        }
    });
    formTarea.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar recargar la página

        // Capturar valores del formulario
        const nombre = document.getElementById("task-name-input").value;
        const descripcion = document.getElementById("task-description-input").value;
        const categoria = document.getElementById("task-category-input").value;
        const fecha = document.getElementById("task-deadline-input").value;
        const estado = document.getElementById("task-status-input").value;
        const id_lista = 5//document.getElementById("task-list-input").value;
        const id_usuario = sessionStorage.getItem("id_usuario"); // Debes ajustar esto dinámicamente según el usuario autenticado

        try {
            // Enviar solicitud POST al backend
            const response = await fetch("http://localhost:3000/tareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ titulo: nombre, descripcion: descripcion, categoria: categoria, fecha: fecha, estado: estado, id_lista: id_lista, id_usuario: id_usuario }),
            });

            if (!response.ok) {
                throw new Error("Error al guardar la tarea");
            }

            const data = await response.json();
            alert("Tarea guardada con éxito");
            console.log("Tarea creada:", data);

            // Cerrar modal y actualizar lista de tareas
            document.getElementById("task-modal").style.display = "none";
        } catch (error) {
            console.error("Error al guardar tarea:", error);
            alert("Hubo un problema al guardar la tarea");
        }
    });

});

