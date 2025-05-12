const recordatorioDAO = require('../DAOS/recordatorioDAO'); // Importamos el DAO de recordatorio

class recordatorioController {
    constructor() {}

    // Función que registra un recordatorio
    async registrarRecordatorio(req, res) {
        try {
            const { id_tarea, fecha_hora, mensaje } = req.body;
            if (!id_tarea || !fecha_hora || !mensaje) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            const recordatorio = await recordatorioDAO.crearRecordatorio(id_tarea, fecha_hora, mensaje);
            res.status(200).json({ mensaje: 'Recordatorio creado con éxito', recordatorio });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el recordatorio' });
        }
    }

    // Función que elimina un recordatorio
    async eliminarRecordatorio(req, res) {
        try {
            const { id } = req.params;
            const resultado = await recordatorioDAO.eliminarRecordatorio(id);
            if (!resultado) {
                return res.status(404).json({ error: 'Recordatorio no encontrado' });
            }
            res.json({ mensaje: resultado });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el recordatorio' });
        }
    }

    // Función que actualiza un recordatorio
    async actualizarRecordatorio(req, res) {
        try {
            const { id } = req.params;
            const { fecha_hora, mensaje } = req.body;
            const recordatorioActualizado = await recordatorioDAO.actualizarRecordatorio(id, fecha_hora, mensaje);
            if (!recordatorioActualizado) {
                return res.status(404).json({ error: 'Recordatorio no encontrado o no actualizado' });
            }
            res.json({ mensaje: 'Recordatorio actualizado exitosamente', recordatorio: recordatorioActualizado });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el recordatorio' });
        }
    }

    // Función que obtiene un recordatorio por ID
    async obtenerRecordatorioPorID(req, res) {
        try {
            const { id } = req.params;
            const recordatorio = await recordatorioDAO.obtenerRecordatorioPorID(id);
            if (!recordatorio) {
                return res.status(404).json({ error: 'Recordatorio no encontrado' });
            }
            res.json(recordatorio);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el recordatorio' });
        }
    }

    // Función que obtiene todos los recordatorios
    async obtenerRecordatorios(req, res) {
        try {
            const recordatorios = await recordatorioDAO.obtenerRecordatorios();
            res.json(recordatorios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los recordatorios' });
        }
    }
}

module.exports = new recordatorioController();
