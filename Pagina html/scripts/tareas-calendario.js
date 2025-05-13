// Función para generar el calendario con tareas
function generarCalendario(year, month) {
    const daysContainer = document.getElementById('calendar-days');
    if (!daysContainer) {
        console.error('No se encontró el elemento calendar-days');
        return;
    }
    
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6; // Si es domingo (0), convertir a 6
    
    // Actualizar el encabezado del mes y año
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthYearElement = document.getElementById('month-year');
    if (monthYearElement) {
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Cargar todas las tareas desde localStorage
    const tareas = cargarTareas();
    console.log("Tareas cargadas para el calendario:", tareas);
    
    // Añadir espacios en blanco para los días anteriores al primer día del mes
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        daysContainer.appendChild(emptyDay);
    }
    
    // Añadir los días del mes
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        
        // Crear contenedor para el número del día
        const dayNumber = document.createElement('div');
        dayNumber.classList.add('day-number');
        dayNumber.textContent = i;
        dayElement.appendChild(dayNumber);
        
        // Verificar si hay tareas para este día
        const currentDate = new Date(year, month, i);
        const tareasDia = tareas.filter(tarea => {
            if (!tarea.deadline) return false;
            
            const fechaTarea = new Date(tarea.deadline);
            return fechaTarea.getDate() === currentDate.getDate() &&
                   fechaTarea.getMonth() === currentDate.getMonth() &&
                   fechaTarea.getFullYear() === currentDate.getFullYear();
        });
        
        // Si hay tareas, mostrarlas directamente en el día
        if (tareasDia.length > 0) {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('day-tasks');
            
            // Mostrar todas las tareas del día
            tareasDia.forEach(tarea => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('calendar-task');
                if (tarea.status === 'completed') {
                    taskItem.classList.add('completed');
                } else {
                    taskItem.classList.add('pending');
                }
                taskItem.textContent = tarea.name;
                taskItem.title = tarea.description || tarea.name;
                taskContainer.appendChild(taskItem);
            });
            
            dayElement.appendChild(taskContainer);
        }
        
        // Resaltar el día actual
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Añadir evento click para seleccionar día
        dayElement.addEventListener('click', function() {
            // Eliminar la clase 'selected' de todos los días
            document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
            
            // Añadir la clase 'selected' al día actual
            this.classList.add('selected');
            
            // Actualizar la sección de tareas del día
            actualizarTareasDia(new Date(year, month, i));
        });
        
        daysContainer.appendChild(dayElement);
    }
}

// Función para actualizar la sección de tareas del día
function actualizarTareasDia(fecha) {
    const tareasDia = obtenerTareasPorFecha(fecha);
    console.log("Tareas para el día seleccionado:", tareasDia);
    
    const taskCardElement = document.querySelector('.task-card');
    
    if (!taskCardElement) {
        console.error('No se encontró el elemento task-card');
        return;
    }
    
    // Formatear la fecha para mostrarla
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
    
    // Actualizar el título
    const taskCardTitle = taskCardElement.querySelector('h2');
    if (taskCardTitle) {
        taskCardTitle.textContent = `Tareas para ${fechaFormateada}`;
    }
    
    // Actualizar el contenido
    const taskCardContent = taskCardElement.querySelector('p') || taskCardElement.querySelector('.tasks-list');
    
    if (tareasDia.length === 0) {
        // No hay tareas para este día
        if (taskCardContent && taskCardContent.tagName === 'P') {
            taskCardContent.textContent = 'No hay tareas programadas para este día.';
        } else {
            // Si existe una lista de tareas, reemplazarla con un párrafo
            if (taskCardContent) {
                taskCardContent.remove();
            }
            const noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = 'No hay tareas programadas para este día.';
            taskCardElement.appendChild(noTasksMessage);
        }
    } else {
        // Hay tareas para mostrar
        let tasksList;
        
        if (taskCardContent && taskCardContent.tagName === 'P') {
            // Reemplazar el párrafo con una lista
            taskCardContent.remove();
            tasksList = document.createElement('div');
            tasksList.classList.add('tasks-list');
            taskCardElement.appendChild(tasksList);
        } else if (taskCardContent && taskCardContent.classList.contains('tasks-list')) {
            // Usar la lista existente
            tasksList = taskCardContent;
            tasksList.innerHTML = '';
        } else {
            // Crear una nueva lista
            tasksList = document.createElement('div');
            tasksList.classList.add('tasks-list');
            taskCardElement.appendChild(tasksList);
        }
        
        // Añadir cada tarea a la lista
        tareasDia.forEach(tarea => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (tarea.status === 'completed') {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.add('pending');
            }
            
            const taskName = document.createElement('div');
            taskName.classList.add('task-name');
            taskName.textContent = tarea.name;
            
            const taskDetails = document.createElement('div');
            taskDetails.classList.add('task-details');
            
            // Obtener texto de categoría
            const categoriaTexto = obtenerTextoCategoria(tarea.category);
            
            taskDetails.textContent = `${categoriaTexto} - ${tarea.status === 'completed' ? 'Completada' : 'Pendiente'}`;
            
            taskItem.appendChild(taskName);
            taskItem.appendChild(taskDetails);
            
            if (tarea.description) {
                const taskDescription = document.createElement('div');
                taskDescription.classList.add('task-description');
                taskDescription.textContent = tarea.description;
                taskItem.appendChild(taskDescription);
            }
            
            tasksList.appendChild(taskItem);
        });
    }
}

// Inicializar el calendario cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado, inicializando calendario");
    
    // Verificar si estamos en la página del dashboard
    if (document.getElementById('calendar-days')) {
        const currentDate = new Date();
        
        // Generar calendario inicial
        generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
        
        // Actualizar tareas del día actual
        actualizarTareasDia(currentDate);
        
        // Configurar eventos para cambiar de mes
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');
        
        if (prevMonthButton && nextMonthButton) {
            prevMonthButton.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
            });
            
            nextMonthButton.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
            });
        }
    } else {
        console.warn("No se encontró el elemento calendar-days, posiblemente no estamos en la página del dashboard");
    }
});

// Mock functions for testing purposes.  These would normally be defined elsewhere.
function cargarTareas() {
    // Replace with your actual implementation to load tasks
    return JSON.parse(localStorage.getItem('tareas') || '[]');
}

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

function obtenerTextoCategoria(category) {
    // Replace with your actual implementation to get category text
    switch (category) {
        case 'personal':
            return 'Personal';
        case 'trabajo':
            return 'Trabajo';
        case 'estudio':
            return 'Estudio';
        default:
            return 'Sin categoría';
    }
}