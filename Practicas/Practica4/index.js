/*
    Para cambiar el nombre de una variable en destructuracion se usan los dos puntos :

    const persona= {
        nombre: 'Juan',
        edad: 30
    }
    const {nombre: nombrePersona, edad}= persona;

    ////////////////////////////////////////////////////////////////////////////////////////////

    - Tenemos la destructuracion por orden:
    const arreglo= [1, 2, 3, 4];
    const [primero, segundo]= arreglo;

    - Tenemos la destructuracion por nombre:
    const persona= {
        nombre: 'Juan',
        edad: 30
    } 
    const {edad, nombre}= persona;

    ////////////////////////////////////////////////////////////////////////////////////////////

    CASOS EN LOS QUE DA ERROR LA DESTRUCTURACION:
    const {n1, n2}= { , 2};
    const resultado= n1 * n2;
    //Da error porque n1 no tiene valor, es indefinido

    Para evitar este error, se pueden asignar valores por defecto:
    const {n1=2, n2}= { n2: 7};
    const resultado= n1 * n2;
    //resultado= 14
*/
//Existe alternativa para npm. 
// Instalar pnpm, que nos permite instalar todo en una carpeta, que se reutilizará en cada proyecto que hagamos

const {Pool} = require('pg');
require('dotoenv').config(); //Permite leer el .env

const pool= new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports= pool;