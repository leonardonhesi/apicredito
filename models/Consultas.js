'use strict';
module.exports = function(sequelize, DataTypes) {

    var Consultas = sequelize.define('Consultas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false
        },
        consulta: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        origem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        data: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,

        }

    },
        {
            freezeTableName: true,
            tableName: 'Consultas',
        });
    return Consultas;
};