const knex = require('knex');

const dbConnection = knex({
  client: 'mssql',
  connection: {
    host: 'localhost',
    user: 'sa', 
    password: 'Projet2DBbackend', 
    database: 'Mandat2', 
    port: 1433, 
    options: {
      encrypt: false, 
    },
  },
});
module.exports = dbConnection;
