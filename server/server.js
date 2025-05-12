const express = require("express");
const bodyParser = require("body-parser");
const usuarioController = require('../controllers/usuarioController');
const tareaController = require('../controllers/tareaController');
const reconocimientoController = require('../controllers/reconocimientoController');
const listaController = require('../controllers/listaController');
const calendarioController = require('../controllers/calendarioController');
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

// Define rutas de tareas
app.post("/tareas", tareaController.registrarTarea);
app.get("/tareas", tareaController.obtenerTareas);
app.get("/tareas/:id", tareaController.obtenerTareaPorID);
app.put("/tareas/:id", tareaController.actualizarTarea);
app.delete("/tareas/:id", tareaController.eliminarTarea);

//Define rutas de recordatorio
app.post("/recordatorios", recordatorioController.registrarRecordatorio);
app.get("/recordatorios", recordatorioController.obtenerRecordatorios);
app.get("/recordatorios/:id", recordatorioController.obtenerRecordatorioPorID);
app.put("/recordatorios/:id", recordatorioController.actualizarRecordatorio);
app.delete("/recordatorios/:id", recordatorioController.eliminarRecordatorio);

//Define rutas de reconocimiento
app.post("/reconocimientos", reconocimientoController.registrarReconocimiento);
app.get("/reconocimientos", reconocimientoController.obtenerReconocimientos);
app.get("/reconocimientos/:id", reconocimientoController.obtenerReconocimientoPorID);
app.put("/reconocimientos/:id", reconocimientoController.actualizarReconocimiento);
app.delete("/reconocimientos/:id", reconocimientoController.eliminarReconocimiento);

// Definir rutas de listas
app.post("/listas", listaController.registrarLista);
app.get("/listas", listaController.obtenerListas);
app.get("/listas/:id", listaController.obtenerListaPorID);
app.put("/listas/:id", listaController.actualizarLista);
app.delete("/listas/:id", listaController.eliminarLista);

// Definir rutas de calendarios
app.post("/calendarios", calendarioController.registrarCalendario);
app.get("/calendarios", calendarioController.obtenerCalendarios);
app.get("/calendarios/:id", calendarioController.obtenerCalendarioPorID);
app.put("/calendarios/:id", calendarioController.actualizarCalendario);
app.delete("/calendarios/:id", calendarioController.eliminarCalendario);



//Ruta de prueba
/*app.get("/", (req, res)=> {
    res.send("Servidor funcionando ");
});*/

//Inicia el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});