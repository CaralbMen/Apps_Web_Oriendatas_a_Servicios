//const mysql = require('mysql2/promise');
require('dotenv').config();
// const pg = require('pg');

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

const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
module.exports= pool;