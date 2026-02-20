const pool = require('../config/db');
const bcrypt= require('bcryptjs');

const registrarUsuario= async(req, res)=>{
    const {email, password}= req.body;
    try{
        const userExists= await pool.query('SELECT * from usuarios where email=$1', [email]);
        if(userExists.rows.length>0){
            res.status(400).json({mensaje: 'El usuario ya existe. Intenta con otro'});
        }
        
        const salt= await bcrypt.genSalt(10);
        const passwordHash= await bcrypt.hash(password, salt);
        const newUser= await pool.query(
            'insert into usuarios (email, password) values ($1, $2)',
            [email, passwordHash]
        );
        res.status(201).json({mensaje: 'Usuario creado con exito', usuario: newUser.rows[0]});

    }catch(e){
        res.status(500).json({mensaje:`Error: ${e}`});
    }
}

//Hacer un login
const jwt= require('jsonwebtoken');
const login= async(req, res)=>{
    const {email, password}= req.body;
    
}
module.exports= {registrarUsuario}