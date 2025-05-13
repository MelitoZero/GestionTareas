// Funciones compartidas para manejar tareas entre páginas

// Función para cargar tareas desde localStorage
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    console.log("Cargando tareas desde localStorage:", tareasGuardadas);
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

// Función para guardar tareas en localStorage
function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    console.log("Tareas guardadas en localStorage:", tareas);
}

// Función para obtener tareas para una fecha específica
function obtenerTareasPorFecha(fecha) {
    const tareas = cargarTareas();
    return tareas.filter(tarea => {
        if (!tarea.deadline) return false;
        
        const fechaTarea = new Date(tarea.deadline);
        return fechaTarea.getDate() === fecha.getDate() &&
               fechaTarea.getMonth() === fecha.getMonth() &&
               fechaTarea.getFullYear() === fecha.getFullYear();
    });
}

// Función para obtener texto de categoría
function obtenerTextoCategoria(categoria) {
    switch (categoria) {
        case 'work':
            return 'Trabajo';
        case 'personal':
            return 'Personal';
        case 'study':
            return 'Estudio';
        default:
            return categoria;
    }
}

// Función para formatear fecha
function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}