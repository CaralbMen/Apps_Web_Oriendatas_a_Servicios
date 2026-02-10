const pool = require('../config/db');

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
module.exports= {poblarProductos};