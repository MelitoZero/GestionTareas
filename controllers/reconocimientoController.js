const reconocimientoDAO = require('../DAOS/reconocimientoDAO'); // Importamos el DAO de reconocimiento

class reconocimientoController {
    constructor() {}

    // Función que registra un reconocimiento
    async registrarReconocimiento(req, res) {
        try {
            const { id_usuario, fecha, tipo } = req.body;
            if (!id_usuario || !fecha || !tipo) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            const reconocimiento = await reconocimientoDAO.crearReconocimiento(id_usuario, fecha, tipo);
            res.status(200).json({ mensaje: 'Reconocimiento creado con éxito', reconocimiento });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar el reconocimiento' });
        }
    }

    // Función que elimina un reconocimiento
    async eliminarReconocimiento(req, res) {
        try {
            const { id } = req.params;
            const mensaje = await reconocimientoDAO.eliminarReconocimiento(id);
            if (!mensaje) {
                return res.status(404).json({ error: 'Reconocimiento no encontrado' });
            }
            res.json({ mensaje });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el reconocimiento' });
        }
    }

    // Función que actualiza un reconocimiento
    async actualizarReconocimiento(req, res) {
        try {
            const { id } = req.params;
            const { id_usuario, fecha, tipo } = req.body;
            const reconocimientoActualizado = await reconocimientoDAO.actualizarReconocimiento(id, id_usuario, fecha, tipo);
            if (!reconocimientoActualizado) {
                return res.status(404).json({ error: 'Reconocimiento no encontrado o no actualizado' });
            }
            res.json({ mensaje: 'Reconocimiento actualizado con éxito', reconocimiento: reconocimientoActualizado });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el reconocimiento' });
        }
    }

    // Función que obtiene todos los reconocimientos
    async obtenerReconocimientos(req, res) {
        try {
            const reconocimientos = await reconocimientoDAO.obtenerReconocimientos();
            res.json(reconocimientos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los reconocimientos' });
        }
    }

    // Función que obtiene un reconocimiento por ID
    async obtenerReconocimientoPorID(req, res) {
        try {
            const { id } = req.params;
            const reconocimiento = await reconocimientoDAO.obtenerReconocimientoPorID(id);
            if (!reconocimiento) {
                return res.status(404).json({ error: 'Reconocimiento no encontrado' });
            }
            res.json(reconocimiento);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el reconocimiento' });
        }
    }
}

module.exports = new reconocimientoController();
