'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recordatorio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Definir relaciones de recordatorio
      //Relacion tarea - recordatorio uno a uno
      Recordatorio.belongsTo(models.Tarea, {foreignKey: 'id_usuario'});
    }
  }
  Recordatorio.init({
    id_tarea: DataTypes.INTEGER,
    fecha_hora: DataTypes.DATE,
    mensaje: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recordatorio',
  });
  return Recordatorio;
};
