const express = require("express");
const bodyParser = require("body-parser");
const usuarioController = require('../controllers/usuarioController');
const listaController = require('../controllers/listaController');
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
//Permite procesar JSON
app.use(bodyParser.json());
app.use(express.static("View"));
//Función que permite validar tokens
function verificarToken(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({error: "No tienes acceso. Necesitas token"});
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7): authHeader;
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
app.post("/login",  usuarioController.iniciarSesión);
app.get("/usuarios", usuarioController.obtenerUsuarios);
app.get("/usuarios/:id", usuarioController.obtenerUsuarioPorID);
app.put("/usuarios/:id", usuarioController.actualizarUsuario);
app.delete("/usuarios/:id", usuarioController.eliminarUsuario);
//Define rutas de listas
app.get("/listas:id_usuario", listaController.obtenerListas);
app.put("/listas:id", listaController.registrarLista);


//Inicia el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});