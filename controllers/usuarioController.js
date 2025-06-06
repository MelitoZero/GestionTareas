const usuarioDAO = require('../DAOS/usuarioDAO');//Importamos el DAO de usuario
const jwt = require("jsonwebtoken");

class usuarioController{
    constructor(){}
    //Función que registra usuario
    async registrarUsuario(req, res) {
        try {
            const {nombre, correo, contrasena} = req.body;
            if (!nombre || !correo || !contrasena) {
                return res.status(400).json({error: 'Todos los campos son requeridos'});
            }
            const usuario = await usuarioDAO.crearUsuario(nombre,correo,contrasena);
            res.status(200).json({mensaje: 'Usuario registrado con éxito', usuario});
        } catch (error) {
            res.status(500).json({error: 'Error al registrar un usuario'});
        }
    }
    //Función que elimina un usuario
    async eliminarUsuario(req, res){
        try {
            const {id} = req.params;
            const resultado = await usuarioDAO.eliminarUsuario(id);
            if (resultado === 0) {
                return res.status(404).json({error: 'Usuario no encontrado'});
            }
            res.json({mensaje: 'Usuario eliminado con éxito'});
        } catch (error) {
            res.status(500).json({error: 'Error al eliminar el usuario'});
        }
    }
    //Funcíón que edita un usuario
    async actualizarUsuario(req, res){
        try {
            const {id} = req.params;
            const {nombre, correo, contrasena} = req.body;
            const [usuariosAfectados] = await usuarioDAO.actualizarUsuario(id, nombre, correo, contrasena);
            if (usuariosAfectados === 0) {
                return res.status(404).json({error: 'Usuario no econtrado o editado'});
            }
            res.json({mensaje: 'Usuario actualizado éxitosamente'});
        } catch (error) {
            res.status(500).json({error: 'Error al actualizar el usuario'});
        }
    }
    //Función que consulta un usuario por id
    async obtenerUsuarioPorID(req, res){
        try {
            const {id} = req.params;
            const usuario = await usuarioDAO.obtenerUsuarioPorID(id);
            if (!usuario) {
                return res.status(404).json({error: 'Usuario no encontrado'});
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener el usuario'}); 
        }
    }
    //Función que consulta todos los usuarios
    async obtenerUsuarios(req, res){
        try {
            const usuarios = await usuarioDAO.obtenerUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener todo los usuarios'}); 
        }
    }
    //Función que permite iniciar sesión
    async iniciarSesión(req, res){
        try {
            const {correo, contrasena} = req.body;
            const usuario = await usuarioDAO.obtenerUsuarioPorCorreo(correo);
            if(!usuario || usuario.contrasena !== contrasena){
                return res.status(401).json({error: 'Correo o contraseña incorrectos'});
            }
            const token = jwt.sign({id: usuario.id, correo: usuario.correo}, "Tilines", {expiresIn: "2h"});
            res.json({mensaje: "Inicio de sesión éxitoso", id: usuario.id, token});
        } catch (error) {
            console.error('Error en iniciar Sesión', error);
            res.status(500).json({error: 'Error al iniciar sesión'});
        }
    }
}

module.exports = new usuarioController();