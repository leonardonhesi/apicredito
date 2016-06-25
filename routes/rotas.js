'use strict'
var soap = require('soap-cli-simple');
var WSSecurity = require('wssecurity');

module.exports = function(app) {

    const Consulta = app.db.models.Consultas;

    function soapSerasa(req, res) {

        var logon = req.body.logon;
        var senha = req.body.senha;
        var cnpj = req.body.cnpj;
        var url = 'https://services.serasaexperian.com.br/RelatoProxy?wsdl';

        var action = '';
        var security = new WSSecurity(logon, senha, 'PasswordText');

        var options = {
            header: security.toXML(),
            namespace: '',
            namespaces: [
                'xmlns:prox="http://services.experian.com.br/relato/proxy"',
                'xmlns:v2="http://services.experian.com.br/ebo/v2"'
            ]
        };

        var operation = "ConsultarRelato";

        var message = {
            "prox:ConsultarRelatoRequest": {
                "CNPJ": {
                    "v2:base": cnpj
                }
            }
        }
        soap(url, operation, action, message, options)
            .then(function(result) {
                var retorno = JSON.stringify(result["Envelope"]["Body"]);

                var gravar = {
                    "cnpj": cnpj,
                    "consulta": retorno,
                    "origem": "RELATO",
                    "user": logon
                }
                
                //Gravar consulta, banco de dados
                Consulta.create(gravar)
                    .then(result => {
                        return res.status(200).send(retorno);
                    })
                    .catch(error => {
                        return res.status(412).json({ msg: error.message, consulta: retorno });
                    });
            })
            .catch(function(err) {
                return res.status(404).send({
                    success: false,
                    message: 'ERRO: ' + err
                })

            });
    };

    //Consulta principal, Recebe via post (logon, senha, cnpj)
    app.route("/api/consulta")
        .post(function(req, res) {

            if (req.body.logon == null || req.body.senha == null || req.body.cnpj == null) {
                return res.status(400).send({
                    success: false,
                    message: 'Campos obrigatorios não preenchidos'
                });
            }
            else {
                //Realiza a consulta
                soapSerasa(req, res);
            }
        });

    //Obter todas as consultas, recebendo como entrada um  cnpj, esta consulta utiliza informações locais (base de dados)
    app.route("/api/total/serasa/:cnpj?")
        .get((req, res) => {
            Consulta.findAll({ where: { cnpj: req.params.cnpj }, order: '"updated_at" DESC' })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

    //Obter ultima consulta, recebendo como entrada um  cnpj, esta consulta utiliza informações locais (base de dados)
    app.route("/api/serasa/:cnpj?")
        .get((req, res) => {
            Consulta.find({ where: { cnpj: req.params.cnpj }, order: '"updated_at" DESC' })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
}