'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Definir relaciones de usuario
      //Relacion uno a muchos de usuario a tarea
      Usuario.hasMany(models.Tarea, { foreignKey: 'id_usuario'});
      //Relacion uno a muchos de usuario a lista
      Usuario.hasMany(models.Lista, { foreignKey: 'id_usuario'});
      //Relación uno a uno de usuario a calendario
      Usuario.hasOne(models.Calendario, { foreignKey: 'id_usuario'});
      //Relación muchos a uno de usuario a reconocimiento
      Usuario.hasMany(models.Reconocimiento, { foreignKey: 'id_usuario'});
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
