const pool = require('../config/db');



const aniadirIdCategoria= async(request, response)=>{
    try{
        const apiFetch= await fetch('https://fakestoreapi.com/products');
        const productos= await apiFetch.json();
        let actualizados=0;
        for(const producto of productos){
            const categoria= producto.category;
            const idCategoria= await pool.query('select id from categorias where nombre=$1', [categoria]);

            await pool.query('update productos set id_categoria=$1 where nombre=$2', [idCategoria.rows[0].id, producto.title]);
            actualizados++;
        }
        response.status(201).json({mensaje: `Se actualizaron ${actualizados} productos`});
    }catch(e){
        console.log('Error', e);
        response.status(500).json({error: e});
    }   
}


const poblarCategorias= async(request, response)=>{
    try{
        const apiFetch= await fetch('https://fakestoreapi.com/products');
        const categorias= await apiFetch.json();
        let inserciones= 0;
        let anterior= '';
        for(const categoria of categorias){
            let categoriaName= categoria.category;
            if(categoriaName!==anterior){
                await pool.query(
                    `INSERT INTO categorias(nombre) values ($1)`, [categoriaName]
                );
                inserciones++;
                anterior= categoriaName;
            }
        }
        response.status(201).json({mensaje: `Se poblaron ${inserciones} categorias`});
    }catch(e){
        console.log('Error: ', e);
        response.status(500).json({error: e});
    }
}

const poblarProductos= async(request, response)=>{
    try{
        // Fetch a FakeStoreApi
        const apiFetch= await fetch('https://fakestoreapi.com/products');
        const productos= await apiFetch.json();
        let inserciones=0;
        //Destructurar el objeto
        for(const producto of productos){
            const {title, price, description, image}= producto;
            const stock= Math.floor(Math.random()*50) +1;
            await pool.query(
                `INSERT INTO productos(nombre, precio, stock, descripcion, imagen_url) values 
                ($1, $2, $3, $4, $5)`, [title, price, stock, description, image]
            );

            inserciones++;
        }
        response.status(201).json({mensaje: `Se poblaron ${inserciones} productos`});
    }catch(e){
        console.log('Error > ', e);
        response.status(500).json({error: e});
    }
}
module.exports= {poblarProductos, poblarCategorias, aniadirIdCategoria};