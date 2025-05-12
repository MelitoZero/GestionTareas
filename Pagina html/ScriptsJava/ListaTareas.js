const listaTareas = [];

function agregarTarea() {
  const nuevaTarea = document.getElementById("nuevaTarea").value.trim();
  if (nuevaTarea !== "") {
    listaTareas.push(nuevaTarea);
    document.getElementById("nuevaTarea").value = "";
    mostrarTareas();
  }
}

function eliminarTarea(index) {
  listaTareas.splice(index, 1);
  mostrarTareas();
}

function mostrarTareas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  listaTareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${tarea}
      <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}
