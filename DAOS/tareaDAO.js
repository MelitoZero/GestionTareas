const { Tarea } = require('../models');


class tareaDAO {
    constructor(){}

    //Función que crea una tarea
    async crearTarea(titulo, descripcion, fecha, estado, categoria, id_lista, id_usuario){
        try {
            const tarea = await Tarea.create({titulo, descripcion, fecha, estado, categoria, id_lista, id_usuario});
            return tarea;
        } catch (error) {
            console.error('Error al crear tarea', error);
        }        
    }
    //Función que elimina una tarea
    async eliminarTarea(id){
        try {
            const tarea = await Tarea.findByPk(id);
            if (!tarea) {
                throw new Error('Tarea no encontrada');
            }
            await tarea.destroy();
            return 'Tarea eliminada con éxito';
        } catch (error) {
            console.error('Error al eliminar una tarea', error);
        }
    }
    //Función que actualiza una tarea
    async actualizarTarea(id, titulo, descripcion, fecha, estado, categoria, id_lista){
        try {
            await Tarea.update({titulo, descripcion, fecha, estado, categoria, id_lista}, {where: {id}});
            const tareaActualizada = await Tarea.findByPk(id);
            return tareaActualizada;
        } catch (error) {
            console.error('Error al actualizar una tarea', error);
        }
    }
    //Función que consulta las tareas
    async consultartarea(){
        try {
            const tareas = await Tarea.findAll();
            return tareas;
        } catch (error) {
            console.error('Error al consultar las tareas', error);
        }
    }
    //Función que consulta una sola tarea
    async obtenerTareaPorID(id){
        try {
            const tarea = await Tarea.findByPk(id);
            return tarea;
        } catch (error) {
            console.error('Error al consultar una tarea', error);
        }
    }
}

module.exports = new tareaDAO();