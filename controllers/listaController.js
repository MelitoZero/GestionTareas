const listaDAO = require('../DAOS/listaDAO'); // Importamos el DAO de lista

class listaController {
    constructor() {}

    // Función que registra una lista
    async registrarLista(req, res) {
        try {
            const { nombre, descripcion, id_usuario } = req.body;
            if (!nombre || !descripcion || !id_usuario) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            const lista = await listaDAO.crearLista(nombre, descripcion, id_usuario);
            res.status(200).json({ mensaje: 'Lista registrada con éxito', lista });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar la lista' });
        }
    }

    // Función que elimina una lista
    async eliminarLista(req, res) {
        try {
            const { id } = req.params;
            const mensaje = await listaDAO.eliminarLista(id);
            if (!mensaje) {
                return res.status(404).json({ error: 'Lista no encontrada' });
            }
            res.json({ mensaje });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la lista' });
        }
    }

    // Función que actualiza una lista
    async actualizarLista(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const listaActualizada = await listaDAO.actualizarLista(id, nombre, descripcion);
            if (!listaActualizada) {
                return res.status(404).json({ error: 'Lista no encontrada o no actualizada' });
            }
            res.json({ mensaje: 'Lista actualizada con éxito', lista: listaActualizada });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la lista' });
        }
    }

    // Función que consulta todas las listas
    async obtenerListas(req, res) {
        try {
            const listas = await listaDAO.obtenerListas();
            res.json(listas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las listas' });
        }
    }

    // Función que consulta una lista por ID
    async obtenerListaPorID(req, res) {
        try {
            const { id } = req.params;
            const lista = await listaDAO.obtenerListaPorID(id);
            if (!lista) {
                return res.status(404).json({ error: 'Lista no encontrada' });
            }
            res.json(lista);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la lista' });
        }
    }
}

module.exports = new listaController();