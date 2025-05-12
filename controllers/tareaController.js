const tareaDAO = require('../DAOS/tareaDAO'); // Importamos el DAO de tarea

class tareaController {
    constructor() {}

    // Función que registra una tarea
    async registrarTarea(req, res) {
        try {
            const { titulo, descripcion, fecha, estado, categoria, id_lista, id_usuario } = req.body;
            if (!titulo || !descripcion || !fecha || !estado || !categoria || !id_lista || !id_usuario) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            const tarea = await tareaDAO.crearTarea(titulo, descripcion, fecha, estado, categoria, id_lista, id_usuario);
            res.status(200).json({ mensaje: 'Tarea registrada con éxito', tarea });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar una tarea' });
        }
    }

    // Función que elimina una tarea
    async eliminarTarea(req, res) {
        try {
            const { id } = req.params;
            const resultado = await tareaDAO.eliminarTarea(id);
            if (!resultado) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            res.json({ mensaje: resultado });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la tarea' });
        }
    }

    // Función que actualiza una tarea
    async actualizarTarea(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descripcion, fecha, estado, categoria, id_lista } = req.body;
            const tareaActualizada = await tareaDAO.actualizarTarea(id, titulo, descripcion, fecha, estado, categoria, id_lista);
            if (!tareaActualizada) {
                return res.status(404).json({ error: 'Tarea no encontrada o no actualizada' });
            }
            res.json({ mensaje: 'Tarea actualizada con éxito', tarea: tareaActualizada });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la tarea' });
        }
    }

    // Función que obtiene una tarea por ID
    async obtenerTareaPorID(req, res) {
        try {
            const { id } = req.params;
            const tarea = await tareaDAO.obtenerTareaPorID(id);
            if (!tarea) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }
            res.json(tarea);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Función que obtiene todas las tareas
    async obtenerTareas(req, res) {
        try {
            const tareas = await tareaDAO.consultartarea();
            res.json(tareas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las tareas' });
        }
    }
}

module.exports = new tareaController();
