const express = require("express");
const bodyParser = require("body-parser");
const usuarioController = require('../controllers/usuarioController');
const tareaController = require('../controllers/tareaController');
const reconocimientoController = require('../controllers/reconocimientoController');
const listaController = require('../controllers/listaController');
const calendarioController = require('../controllers/calendarioController');
const recordatorioController = require('../controllers/recordatorioController');
const jwt = require("jsonwebtoken");
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, '..', 'View')));
    }

    routes() {
        this.app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'View', 'NuevoLogin', 'index.html'));
        });

        // Middleware para validar tokens
        //this.app.use(this.verificarToken);

        // Rutas de usuarios
        this.app.post("/usuarios", usuarioController.registrarUsuario);
        this.app.post("/login", usuarioController.iniciarSesión);
        this.app.get("/usuarios", usuarioController.obtenerUsuarios);
        this.app.get("/usuarios/:id", usuarioController.obtenerUsuarioPorID);
        this.app.put("/usuarios/:id", usuarioController.actualizarUsuario);
        this.app.delete("/usuarios/:id", usuarioController.eliminarUsuario);

        // Rutas de tareas
        this.app.post("/tareas", tareaController.registrarTarea);
        this.app.get("/tareas", tareaController.obtenerTareas);
        this.app.get("/tareas/:id", tareaController.obtenerTareaPorID);
        this.app.put("/tareas/:id", tareaController.actualizarTarea);
        this.app.delete("/tareas/:id", tareaController.eliminarTarea);

        // Rutas de recordatorio
        this.app.post("/recordatorios", recordatorioController.registrarRecordatorio);
        this.app.get("/recordatorios", recordatorioController.obtenerRecordatorios);
        this.app.get("/recordatorios/:id", recordatorioController.obtenerRecordatorioPorID);
        this.app.put("/recordatorios/:id", recordatorioController.actualizarRecordatorio);
        this.app.delete("/recordatorios/:id", recordatorioController.eliminarRecordatorio);

        // Rutas de reconocimiento
        this.app.post("/reconocimientos", reconocimientoController.registrarReconocimiento);
        this.app.get("/reconocimientos", reconocimientoController.obtenerReconocimientos);
        this.app.get("/reconocimientos/:id", reconocimientoController.obtenerReconocimientoPorID);
        this.app.put("/reconocimientos/:id", reconocimientoController.actualizarReconocimiento);
        this.app.delete("/reconocimientos/:id", reconocimientoController.eliminarReconocimiento);

        // Rutas de listas
        this.app.post("/listas", listaController.registrarLista);
        this.app.get("/listas/:id_usuario", listaController.obtenerListasPorUsuario);
        this.app.get("/listas/:id", listaController.obtenerListaPorID);
        this.app.put("/listas/:id", listaController.actualizarLista);
        this.app.delete("/listas/:id", listaController.eliminarLista);

        // Rutas de calendarios
        this.app.post("/calendarios", calendarioController.registrarCalendario);
        this.app.get("/calendarios", calendarioController.obtenerCalendarios);
        this.app.get("/calendarios/:id", calendarioController.obtenerCalendarioPorID);
        this.app.put("/calendarios/:id", calendarioController.actualizarCalendario);
        this.app.delete("/calendarios/:id", calendarioController.eliminarCalendario);
    }

    verificarToken(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ error: "No tienes acceso. Necesitas token" });
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        try {
            const decodificado = jwt.verify(token, "Tilines");
            req.usuario = decodificado;
            next();
        } catch (error) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
if (require.main === module) {
    const server = new Server();
    server.start();
}