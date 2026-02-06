const pool = require('../config/db');

// const getProductos= async(req, res)=>{
//     try{
//         const [rows]= await pool.query('SELECT * FROM PRODUCTOS');
//         res.json(rows);
//     }catch(error){
//         res.status(500).json({mensaje: error});
//     }
// }
const getProductos= async(req, res)=>{
    try{
        const {resultado}= await pool.query('SELECT * FROM producto');
        res.json(resultado.rows);
    }catch(error){
        res.status(500).json({mensaje: error});
    }
}
const crearProducto= async(req, res)=>{
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
                //await pool.query(`INSERT INTO productos (nombre, precio, stock, descripcion) values ('${nombre}', '${precio}', '${intStock}', '${descripcion}')`);
                await pool.query('insert into producto (nombre, precio, stock, descripcion) values ($1, $2, $3, $4)', [nombre, precio, intStock, descripcion]);
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
    }
// const crearProducto= async(req, res)=>{
//     try{
//         const {nombre, precio, stock, descripcion= ''}= req.body;
//         const {resultado} =await pool.query('insert into producto(nombre, precio, stock) values ($1, $2, $3) returning id', [nombre, precio, stock]);
//         //res.status(201).json({mensaje: 'Producto agregado correctamente'});
//         if(resultado.rows.length>0){
//             res.status(201).json({mensaje: 'Producto agregado correctamente', id: resultado.rows[0].id});
//         }
//     }catch(error){
//         console.log(error);
//         res.status(500).json({error:`'Error en la BD al insertar> ${error}`});
//     }
// }

const modificarProducto= async(req, res)=>{
    const id= parseInt(req.params.id);
    
    precio= req.body.precio;
    stock= req.body.stock;
    try{
        //const [resultado] = await pool.query(`UPDATE productos set precio=${precio}, stock= ${stock} where id=${id}`);
        const {resultado} = await pool.query('update producto set precio=$1, stock=$2 where id=$3', [precio, stock, id]);
        if(resultado.affectedRows===0){
            res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        res.status(201).json({mensaje: 'Producto Modificado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({Error: error});
    }
       

};

const eliminarProducto= async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
        //const [resultado] =await pool.query(`delete from productos where id=${id}`);
        const {resultado} =await pool.query('delete from producto where id=$1', [id]);
        if(resultado.affectedRows===0){
            res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        
        res.status(201).json({mensaje:'Producto eliminado correctamente'});

    }catch(error){
        res.status(500).json({mensaje:error})
    }
       
}

module.exports= {getProductos, crearProducto, modificarProducto, eliminarProducto};