//Pa importar config de .env (Se usa en ambos casos)
require('dotenv').config();

//Pa usar la db con mysql
//const mysql = require('mysql2/promise');
// const pool= mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     waitForConnection: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
// pool.getConnection()
//     .then(connection=>{
//         pool.releaseConnection(connection);
//         console.log('MySQL Conectado Exitosamente');
//     })
//     .catch(err=> console.log('Error de conexion: ', err.code));



//IMportante, si se usa const variable= require, se puede usar module.exports= pool
const pg= require('pg');
const pool= new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});


//Exportar el pool para los otros archivos (se usa en ambos casos)
module.exports= pool;
