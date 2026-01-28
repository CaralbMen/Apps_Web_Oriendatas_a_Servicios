/*
    GET: Obtiene info, mediante parametros o filtros.
    POST: Manda info mediante formularios.
    PUT: Puede usarse para modificar, sirve como el GET. Indica al navegador que modifique todo lo que encuentre, todo el contenido.
    DELETE: Borrar info, se manda con parametros.
    PATCH: Sirve para mandar info precisa que se quiera eliminar o cambiar.
    OPTION: Solicita info, retorna el content type, politicas que tiene el servidor y cosas como esas.
    HEAD: Solamente toca la puerta y no ve el contenido, solo regresa el head. En cambio el GET retorna el body.
*/

const express= require('express');
const app= express();
const port= 3000;

app.use(express.json());

app.get('/api/saludo/:nombre', (req, res)=>{
    const usuario= req.params.nombre;

    res.json({
        mensaje: `Hola ${usuario} bienvenido`,
        tipo: 'Request con parametros'
    });
});

app.get('/api/buscar', (req, res)=>{
    const consulta= req.query;
    res.json({
        mensaje: 'Busqueda',
        filters: consulta
    });
});

app.post('/api/registro', (req, res)=>{
    const usuario= req.body;
    if(!usuario.email){
        return res.status(400).json({
            mensaje: 'El email no puede estar vacio',
            status: 'Error'
        });
    }
    res.status(201).json({
        mensaje: 'Usuario creado con exito',
        datos: usuario,
        id: 1
    });
});


//Practica 2
app.post('/api/calculadora', (req, res)=>{
    // const datos= req.body;
    const {operacion, n1,n2, n3}= req.body;
    if(!n1 || !n2){
        return res.status(400).json({
            mensaje: 'Debes introducir dos numeros',
            status: 'Error'
        });
    }
    let total=0;
    switch(operacion){
        case 'suma':
            total= parseFloat(n1)+ parseFloat(n2);
            break;
        case 'resta':
            total= parseFloat(n1)-parseFloat(n2);
            break;
        case 'multiplicacion':
            total= parseFloat(n1)*parseFloat(n2);
            break;
        default:
            return res.status(400).json({
                mensaje: 'La operacion elegida no existe',
                status: 'error'
            });
    }
    res.json({
        resultado: total.toString()
    }) 
});

app.listen(port, ()=>console.log(`Aplicacion escuchando por el puerto ${port}`));
