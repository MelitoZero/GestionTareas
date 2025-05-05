const { Recordatorio } = require('../models');

class recordatorioDAO {
    constructor() {}
    //Función que crea recordatorio
    async crearRecordatorio(){
        try {
            const recordatorio = await Recordatorio.create({id_tarea, fecha_hora, mensaje});
            return recordatorio;        
        } catch (error) {
            console.error('Error al crear el recordatorio', error);
        }
    }
    //Función que elimina recordatorio
    async eliminarRecordatorio(id){
        try {
            const recordatorio = await Recordatorio.findByPk(id);
            if (!recordatorio) {
                throw new Error('Recordatorio no existente');
            }
            await recordatorio.destroy();
            return 'Recordatorio eliminado éxitosamente';
        } catch (error) {
            console.error('Error al eliminar un recordatorio', error);
        }
    }
    //Función que actualiza un Recordatorio
    async actualizarRecordatorio(id, fecha_hora, mensaje){
        try {
            await Recordatorio.update({fecha_hora, mensaje},{where: {id}});
            const recordatorioActualizado = await Recordatorio.findByPk(id);
            return recordatorioActualizado;
        } catch (error) {
            console.error('Error al actualizar el recordatorio');
        }
    }
    //Función que consultar todos los recodatorios
    async obtenerRecordatorios(){
        try {
            const recodatorios = Recordatorio.findAll();
            return recodatorios;
        } catch (error) {
            console.error('Error al consultar todos los recordatorios', error);
        }
    }
    //Función que permite consultar un recordatorio
    async obtenerRecordatorioPorID(id){
        try {
            const recordatorio = await Recordatorio.findByPk(id);
            return recordatorio;
        } catch (error) {
            console.error('Error al consultar el recordatorio');
        }
    }
}

module.exports = new recordatorioDAO();