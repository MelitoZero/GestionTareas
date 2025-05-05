const { Usuario }  = require('../models');

class UsuarioDAO {
    constructor(){}

    //Función que permite registrar un usuario
    async crearUsuario(nombre, correo, contrasena) {
        try {
            const usuario = await Usuario.create({nombre, correo, contrasena});
            return usuario;
        } catch (error) {
            console.error("Error al registrar un Usuario", error);
        }    
    }
    //Función que permite eliminar un usuario
    async eliminarUsuario(id){
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('El usuario no fue encontrado');
            }
            await usuario.destroy();
            return 'Usuario eliminado con éxito';
        } catch (error) {
            console.error('Error al eliminar usuario', error);
        }        
    }
    //Función que actualiza a un usuario
    async actualizarUsuario(id, nombre, correo, contrasena){
        try {
            await Usuario.update({nombre, correo, contrasena}, {where: {id}});
            const usuarioActualizado = await Usuario.findByPk(id);
            return usuarioActualizado;
        } catch (error) {
            console.error('Error al actualizar el usuario', error);
        }
    }
    //Función que consulta todos los usuarios
    async obtenerUsuarios(){
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            console.error('Error al consultar todos los usuarios', error);
        }
    }
    //Función que consulta un usuario
    async obtenerUsuarioPorID(id){
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario;
        } catch (error) {
            console.error('Error al buscar el usuario', error);
        }
    }
}
module.exports = new UsuarioDAO();
