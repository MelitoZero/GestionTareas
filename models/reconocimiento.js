'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reconocimiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Definir las relaciones de reconocimiento
      //Relacion usuario - reconocimiento muchos a uno
      Reconocimiento.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
    }
  }
  Reconocimiento.init({
    id_usuario: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reconocimiento',
  });
  return Reconocimiento;
};
