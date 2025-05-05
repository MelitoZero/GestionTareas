const { Lista } = require('../models');


class listaDAO {
    constructor(){}
    //Función que crea lista 
    async crearLista(nombre, descripcion, id_usuario){
        try {
            const lista = await Lista.create({nombre, descripcion, id_usuario});
            return lista;
        } catch (error) {
            console.error('Error al crear la lista', error);
        }        
    }
    //Función que elimina una lista
    async eliminarLista(id){
        try {
            const lista = await Lista.findByPk(id);
            if (!lista) {
                throw new Error('Lista no encontrada');
            }
            await lista.destroy();
            return 'lista eliminada con exito';
        } catch (error) {
            console.error('Error al eliminar la lista', error);
        }
    }
    //Función que actualiza una lista
    async actualizarLista(id, nombre, descripcion){
        try {
            await Lista.update({nombre, descripcion},{where: {id}});
            const listaActualizada = await Lista.findByPk(id);
            return listaActualizada;
        } catch (error) {
            console.error('Error al actualizar la lista', error);
        }
    }
    //Función que consulta todas las listas
    async obtenerListas(){
        try {
            const listas = await Lista.findAll();
            return listas;
        } catch (error) {
            console.error('Error al consultar todas las listas', error);
        }
    }
    //Función que consulta una lista
    async obtenerListaPorID(id) {
        try {
            const lista = await Lista.findByPk(id);
            return lista;
        } catch (error) {
            console.error('Error al consultar una lista', error);
        }
    }
}

module.exports = new listaDAO();
