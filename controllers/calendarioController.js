const calendarioDAO = require('../DAOS/calendarioDAO'); // Importamos el DAO de calendario

class calendarioController {
    constructor() {}

    // Función que registra un calendario
    async registrarCalendario(req, res) {
        try {
            const { tipo_vista, id_usuario } = req.body;
            if (!tipo_vista || !id_usuario) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            const calendario = await calendarioDAO.crearCalendario(tipo_vista, id_usuario);
            res.status(200).json({ mensaje: 'Calendario registrado con éxito', calendario });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar el calendario' });
        }
    }

    // Función que elimina un calendario
    async eliminarCalendario(req, res) {
        try {
            const { id } = req.params;
            const resultado = await calendarioDAO.eliminarCalendario(id);
            if (!resultado) {
                return res.status(404).json({ error: 'Calendario no encontrado' });
            }
            res.json({ mensaje: resultado });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el calendario' });
        }
    }

    // Función que actualiza un calendario
    async actualizarCalendario(req, res) {
        try {
            const { id } = req.params;
            const { tipo_vista, id_usuario } = req.body;
            const calendarioActualizado = await calendarioDAO.actualizarCalendarios(id, tipo_vista, id_usuario);
            if (!calendarioActualizado) {
                return res.status(404).json({ error: 'Calendario no encontrado o no actualizado' });
            }
            res.json({ mensaje: 'Calendario actualizado exitosamente', calendario: calendarioActualizado });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el calendario' });
        }
    }

    // Función que obtiene un calendario por ID
    async obtenerCalendarioPorID(req, res) {
        try {
            const { id } = req.params;
            const calendario = await calendarioDAO.obtenerCalendarioPorID(id);
            if (!calendario) {
                return res.status(404).json({ error: 'Calendario no encontrado' });
            }
            res.json(calendario);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el calendario' });
        }
    }

    // Función que obtiene todos los calendarios
    async obtenerCalendarios(req, res) {
        try {
            const calendarios = await calendarioDAO.obtenerCalendarios();
            res.json(calendarios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los calendarios' });
        }
    }
}

module.exports = new calendarioController();
