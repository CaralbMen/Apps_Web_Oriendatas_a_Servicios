const pool = require('../config/db');
// Traté de usar las variables de resultado con llaves en lugar de corchetes y
//marcaba error con la funcion de rowCount, por eso están sin llaves
const getProductos= async(req, res)=>{
    try{
        const resultado= await pool.query('SELECT * FROM producto');
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
                const insertado= await pool.query('insert into producto (nombre, precio, stock, descripcion) values ($1, $2, $3, $4) RETURNING id', [nombre, precio, intStock, descripcion]);
                if(insertado.rowCount===0){
                    res.status(400).json({
                        error: "Error al insertar el producto"
                    });
                }
                res.status(201).json({mensaje: 'Producro agregado', id: insertado.rows[0].id});
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


const modificarProducto= async(req, res)=>{
    const id= parseInt(req.params.id);
    const {precio, stock}= req.body;
    try{
        const resultado = await pool.query('update producto set precio=$1, stock=$2 where id=$3 returning *', [precio, stock, id]);
        if(resultado.rowCount===0){
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
        const resultado =await pool.query('delete from producto where id=$1 returning *', [id]);
        if(resultado.rowCount===0){
            res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        
        res.status(201).json({mensaje:'Producto eliminado correctamente'});

    }catch(error){
        res.status(500).json({mensaje:error})
    }
       
}
//select * from productos where nombre like '%Cot%';
const obtenerNombre= async(req, res)=>{
    const nombre= req.params.nombre;
    try{
        console.log(nombre);
        const resultado= await pool.query(`select * from productos where nombre ilike '%${nombre}%'`);
        res.json(resultado.rows);
    }catch(e){
        res.status(500).json({error: e});
    }
}
const obtenerCategoria= async(req, res)=>{
    const categoria= req.params.categoria;
    try{
        console.log(categoria);
        const resultado= await pool.query('select * from categorias where nombre ilike $1', [`%${categoria}%`]);
        console.log(resultado);
        res.json(resultado.rows);
    }catch(e){
        res.status(500).json({error: e})
    }
}

module.exports= {getProductos, crearProducto, modificarProducto, eliminarProducto, obtenerNombre, obtenerCategoria};