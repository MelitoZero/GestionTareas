'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Definir las relacion de lista
      //Relacion usuario - lista de muchos a uno
      Lista.belongsTo(models.Usuario, {foreignKey: 'id_usuario'});
      //Relacion tarea - lista de uno a uno
      Lista.belongsTo(models.Tarea, {foreignKey: 'id_lista'});
    }
  }
  Lista.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lista',
  });
  return Lista;
};
