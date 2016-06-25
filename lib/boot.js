'use strict';
var port = process.env.PORT || 6235;
module.exports = app => {
    app.db.sequelize.sync().done(() => {
        app.listen(port, () => {
            console.log('API-ANALISE DE CREDITO ' + port);
        });
    });
}