const { Reconocimiento } = require('../models');

class reconocimientoDAO {
    constructor() {}
        //Función que permite crear un reconocimiento
        async crearReconocimiento(id_usuario, fecha, tipo) {
            try {
                const reconocimiento = await Reconocimiento.create({id_usuario, fecha, tipo});
                return reconocimiento;
            } catch (error) {
                console.error("Error al creear un reconocimiento", error);
            }    
        }
        //Función que permite eliminar un reconocimiento
        async eliminarReconocimiento(id){
            try {
                const reconocimiento = await Reconocimiento.findByPk(id);
                if (!reconocimiento) {
                    throw new Error('El reconocimiento no fue encontrado');
                }
                await reconocimiento.destroy();
                return 'Reconocimiento eliminado con éxito';
            } catch (error) {
                console.error('Error al eliminar el reconocimiento', error);
            }        
        }
        //Función que actualiza un reconocimiento
        async actualizarReconocimiento(id, id_usuario, fecha, tipo){
            try {
                await Reconocimiento.update({id_usuario, fecha, tipo}, {where: {id}});
                const reconocimientoActualizado = await Reconocimiento.findByPk(id);
                return reconocimientoActualizado;
            } catch (error) {
                console.error('Error al actualizar el reconocimiento', error);
            }
        }
        //Función que consulta todos los reconocimientos
        async obtenerReconocimientos(){
            try {
                const reconocimientos = await Reconocimiento.findAll();
                return reconocimientos;
            } catch (error) {
                console.error('Error al consultar todos los reconocimientos', error);
            }
        }
        //Función que consulta un reconocimiento
        async obtenerReconocimientoPorID(id){
            try {
                const reconocimiento = await Reconocimiento.findByPk(id);
                if (!reconocimiento) {
                    throw new Error('Reconocimiento no encontrado');
                }
                return reconocimiento;
            } catch (error) {
                console.error('Error al buscar el reconocimiento', error);
            }
        }
}

module.exports = new reconocimientoDAO();