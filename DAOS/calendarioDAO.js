const { Calendario } = require('../models');

class calendarioDAO{
    constructor () {}
    //Función que permite registrar un calendario
    async crearCalendario(tipo_vista, id_usuario) {
        try {
            const calendario = await Calendario.create({tipo_vista, id_usuario});
            return calendario;
        } catch (error) {
            console.error("Error al crear un calendario", error);
        }    
    }
    //Función que permite eliminar un calendario
    async eliminarCalendario(id){
        try {
            const calendario = await Calendario.findByPk(id);
            if (!calendario) {
                throw new Error('El calendario no fue encontrado');
            }
            await calendario.destroy();
            return 'Calendario eliminado con éxito';
        } catch (error) {
            console.error('Error al eliminar calendario', error);
        }        
    }
    //Función que actualiza un calendario
    async actualizarCalendarios(id, tipo_vista, id_usuario){
        try {
            await Calendario.update({tipo_vista, id_usuario}, {where: {id}});
            const calendarioActualizado = await Calendario.findByPk(id);
            return calendarioActualizado;
        } catch (error) {
            console.error('Error al actualizar el calendario', error);
        }
    }
    //Función que consulta todos los calendarios
    async obtenerCalendarios(){
        try {
            const calendarios = await Calendario.findAll();
            return calendarios;
        } catch (error) {
            console.error('Error al consultar todos los calendarios', error);
        }
    }
    //Función que consulta un calendario
    async obtenerCalendarioPorID(id){
        try {
            const calendario = await Calendario.findByPk(id);
            if (!calendario) {
                throw new Error('Calendario no encontrado');
            }
            return calendario;
        } catch (error) {
            console.error('Error al buscar el calendario', error);
        }
    }
}

module.exports = new calendarioDAO();