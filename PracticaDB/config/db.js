require('dotenv').config();

//IMportante, si se usa const variable= require, se puede usar module.exports= pool
const pg= require('pg');
const pool= new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

module.exports= pool;
