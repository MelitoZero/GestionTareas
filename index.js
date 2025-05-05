const UsuarioDAO = require('./dataAccess/usuarioDAO');
const { sequelize } = require('./models');

//Funcion asincrona para ejecutar las operaciones
 async function ejecutarTransación() {
   try {
      //Realiza la sincronización de los modelos con la BD
      await sequelize.sync();
      
      /*//Crear un usuario
      const usuario = await UsuarioDAO.crearUsuario('JokitoFokito', 'fokoloko@gmail.com', 'fokaso3000');
      console.log('El usuario es: ', usuario.toJSON());*/
      /*//Eliminar un usuario
      await UsuarioDAO.eliminarUsuario(1);
      console.log('usuario eliminado');*/
      /*//consultar usuarios y un usuario
      let usuarios = await UsuarioDAO.obtenerUsuarios();
      usuarios = usuarios.map(t => t.toJSON());
      console.log('usuarios: ', usuarios);
      const user = await UsuarioDAO.obtenerUsuarioPorID(2);
      console.log('El usuario con id 2 es: ', user.toJSON());*/
      /*//Actualizar un usuario
      await UsuarioDAO.actualizarUsuario(3, 'pablito', 'pablito@gmail.com', 'pablito3');
      console.log('usuario actualizado');*/

   } catch (error) {
      console.error('Error en las operaciones', error);
   } finally{
      //Cierra la conexion a la BD cuando termine todas las operaciones
      await sequelize.close(); 
   }

 }

 //Realiza las operaciones
ejecutarTransación();