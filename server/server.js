const express = require("express");
const bodyParser = require("body-parser");
const usuarioController = require('../controllers/usuarioController');
const app = express();
const PORT = 3000;
//Permite procesar JSON
app.use(bodyParser.json());
app.use(express.static("View"));

//Define rutas de usuarios
app.post("/usuarios", usuarioController.registrarUsuario);
app.get("/usuarios", usuarioController.obtenerUsuarios);
app.get("/usuarios/:id", usuarioController.obtenerUsuarioPorID);
app.put("/usuarios/:id", usuarioController.actualizarUsuario);
app.delete("/usuarios/:id", usuarioController.eliminarUsuario);


//Ruta de prueba
/*app.get("/", (req, res)=> {
    res.send("Servidor funcionando ");
});*/

//Inicia el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});