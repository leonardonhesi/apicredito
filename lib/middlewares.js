'use strict';
var bodyParser = require('body-parser');
var cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
var express = require("express");

module.exports = function(app) {

    //bodyparser para ler post em json
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //Adicionais de segurança
    /*
    app.use(cors({
        origin: ["https://localhost"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "multipart/form-data"]
    }));
    */
    app.use(helmet());
    app.use(compression());
    app.set("json spaces", 4);
    /* FrontEnd
    Arquivos estaticos
    app.use('/', express.static('./public'));

    app.use('/mod', express.static('./node_modules/bootstrap/dist'));
    app.use('/mod', express.static('./node_modules/jquery/dist'));
    app.use('/mod', express.static('./node_modules/es6-shim/'));
    app.use('/mod', express.static('./node_modules/zone.js/dist/'));
    app.use('/mod', express.static('./node_modules/reflect-metadata/'));
    app.use('/mod', express.static('./node_modules/systemjs/dist/'));
    app.use('/mod', express.static('./node_modules/rxjs/'));
    app.use('/mod', express.static('./node_modules/angular2-in-memory-web-api/'));
    app.use('/mod', express.static('./node_modules/@angular/'));
    app.use('/mod', express.static('./node_modules/sweetalert2/dist/'));

    //MATERIALIZE
    app.use('/vendor', express.static('./node_modules/angular2-materialize/dist'));
    app.use('/vendor', express.static('./node_modules/materialize-css/dist'));
    */
};