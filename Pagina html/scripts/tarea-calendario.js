// Función para generar el calendario con tareas
function generarCalendario(year, month) {
    const daysContainer = document.getElementById('calendar-days');
    if (!daysContainer) return;
    
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
    
    // Cargar todas las tareas
    const tareas = cargarTareas();
    
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
            const fechaTarea = new Date(tarea.deadline);
            return fechaTarea.getDate() === currentDate.getDate() &&
                   fechaTarea.getMonth() === currentDate.getMonth() &&
                   fechaTarea.getFullYear() === currentDate.getFullYear();
        });
        
        // Si hay tareas, mostrar indicadores
        if (tareasDia.length > 0) {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('day-tasks');
            
            // Mostrar hasta 2 tareas como máximo
            const tareasAMostrar = tareasDia.slice(0, 2);
            tareasAMostrar.forEach(tarea => {
                const taskIndicator = document.createElement('div');
                taskIndicator.classList.add('task-indicator');
                if (tarea.status === 'completed') {
                    taskIndicator.classList.add('completed');
                } else {
                    taskIndicator.classList.add('pending');
                }
                taskIndicator.title = tarea.name;
                taskIndicator.textContent = tarea.name.substring(0, 15) + (tarea.name.length > 15 ? '...' : '');
                taskContainer.appendChild(taskIndicator);
            });
            
            // Si hay más tareas, mostrar indicador
            if (tareasDia.length > 2) {
                const moreIndicator = document.createElement('div');
                moreIndicator.classList.add('more-tasks');
                moreIndicator.textContent = `+${tareasDia.length - 2} más`;
                taskContainer.appendChild(moreIndicator);
            }
            
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
    const taskCardElement = document.querySelector('.task-card');
    
    if (!taskCardElement) return;
    
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
    }
});

// Mock functions for testing purposes.  These would normally be loaded from another script.
function cargarTareas() {
    return [];
}

function obtenerTareasPorFecha(fecha) {
    return [];
}

function obtenerTextoCategoria(categoria) {
    return "";
}