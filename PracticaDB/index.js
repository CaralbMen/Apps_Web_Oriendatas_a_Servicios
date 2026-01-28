const express = require('express');
const pool= require('./config/db');
const app= express();

app.use(express.json());
app.get('/api/productos', async(req, res)=>{
    try{
        const [rows]= await pool.query('SELECT * FROM productos');
        res.json(rows);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Error al leer la BD'});
    }
});
// function buscarPorID(id, res){
    app.get('/api/productos/:id', async(req, res)=>{
        const id= parseInt(req.params.id);
        try{
            const [rows]= await pool.query(`SELECT * FROM productos where id= ${id}`);
            if(rows.length===0){
                res.status(404).json({mensaje: 'Producto no encontrado'});
            }
            res.json(rows);
            // return rows;
        }catch(error){
            console.log(error);
            res.status(500).json({error: 'Error al leer la BD'});
        }
    });
// }
app.post('/api/productos', async(req, res)=>{
    try{
        const {nombre, precio, stock, descripcion= ''}= req.body;
        if(!nombre){
            res.status(400).json({
                error: "El nombre no puede estar vacio",
                status: 400
            })
        }
        if(precio<=0){
            res.status(400).json({
                error: "El precio debe ser mayor a cero",
                status: 400
            })
        }
        if(Number.isInteger(stock)){
            intStock= parseInt(stock);
            await pool.query(`INSERT INTO productos (nombre, precio, stock, descripcion) values ('${nombre}', '${precio}', '${intStock}', '${descripcion}')`);
            res.status(201).json({mensaje: 'Producro agregado'});
        }else{
            res.status(400).json({
                error:"El stock no puede ser decimal",
                status: 400
            })
        }
       
    }catch(error){
        console.log(error);
        res.status(500).json({error:`'Error en la BD al insertar> ${error}`});
    }
})

app.put('/api/productos/:id', async(req, res)=>{
    const id= parseInt(req.params.id);
    
    precio= req.body.precio;
    stock= req.body.stock;
    try{
        const [resultado] = await pool.query(`UPDATE productos set precio=${precio}, stock= ${stock} where id=${id}`);
        if(resultado.affectedRows===0){
            res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        res.status(201).json({mensaje: 'Producto Modificado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({Error: error});
    }
       

})

app.delete('/api/productos/:id', async(req, res)=>{
    const id=parseInt(req.params.id);
    
    try{
        const [resultado] =await pool.query(`delete from productos where id=${id}`);
        if(resultado.affectedRows===0){
            res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        
        res.status(201).json({mensaje:'Producto eliminado correctamente'});

    }catch(error){
        res.status(500).json({mensaje:error})
    }
       
})

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server corriendo en puerto ${PORT}`);
})






/*
    Cew Client() es un cliente nuevo para una conexion individual y dedicada. Se usa en scripts de un
    solo uso. Como migraciones de bases de datos.
    Es
    - COnexion individual y dedicada
    - Lento en entornos web
    - Nivel de concurrencia bajo
    - Gestion de recursos manual
    - Si la conexion se cae, el cliente muere
    - Scripts de un solo uso


    new Pool()
    - Conjunto de conexiones reutilizables
    - Alto rendimiento
    -Nivel de concurrencia alto
    - Gestion de recursos automatica
    - Si una conexion del pool falla, intenta crear una nueva automaticamente
    - Servidores Web
*/

// Codificar metodos POST para insertar productos