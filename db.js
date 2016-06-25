'use strict';
var fs = require('fs')
var path = require("path");
var Sequelize = require("sequelize");
let db = null;

module.exports = app => {
    if (!db) {
        
        const config = app.lib.config;        
        
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, "models");
        
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model    = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach(key => {
             
            if ("associate" in db.models[key] ) {
                
                db.models[key].associate(db.models);                
            };

        });

    }
    return db;
};