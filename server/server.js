const express = require("express");
const bodyParser = require("body-parser");
const usuarioController = require('../controllers/usuarioController');
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
//Permite procesar JSON
app.use(bodyParser.json());
app.use(express.static("View"));
//Función que permite validar tokens
function verificarToken(req, res, next){
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({error: "No tienes acceso. Necesitas token"});
    }
    try {
      const decodificado = jwt.verify(token, "Tilines");
      req.usuario = decodificado;  
      next();
    } catch (error) {
       return res.status(401).json({error: "Token inválido o expirado"}); 
    }
}

//Define rutas de usuarios
app.post("/usuarios", usuarioController.registrarUsuario);
app.post("/login", verificarToken, usuarioController.iniciarSesión);
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