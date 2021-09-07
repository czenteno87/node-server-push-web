const express = require("express");
const cors = require("cors")
const { createServer } = require("http");
const morgan = require("morgan");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = createServer(this.app);
        this.paths = {
            webpush : '/api/webpush'   
        };
          // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

    }

    middlewares(){

        // CORS
        this.app.use(cors());

        this.app.use(morgan('dev'));

        // Lectura y parseo del body
        this.app.use(express.urlencoded({extended : false}));
        this.app.use(express.json());

        // Static Content
        this.app.use(express.static("public"));

    }
    routes(){
        this.app.use(this.paths.webpush,  require("../routes/webpush"))

    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " , this.port);
        });

    }

}

module.exports = Server;