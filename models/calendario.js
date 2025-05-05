'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Definir relaciones de calendario
      //Relacion usuario - calendario uno a uno
      Calendario.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
      
    }
  }
  Calendario.init({
    tipo_vista: {
      type: DataTypes.ENUM('dia', 'semana', 'mes'),
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Calendario',
  });
  return Calendario;
};
