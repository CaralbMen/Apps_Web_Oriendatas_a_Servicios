const express = require('express');
const app= express();
const port = 3000;

app.use(express.json());

let productos= [
    {
        id: 1,
        nombre:'Coca Cola',
        precio: 10,
        categoria: 'Bebidas'
    },
    {
        id: 2,
        nombre: 'Azucar',
        precio: 20,
        categoria: 'Basicos'
    }
]
function productoExiste(id, res){
    const index= productos.findIndex(producto=> producto.id===id);
    if(index===-1){
            return res.status(404).json({
                mensaje:"Producto no encontrado",
                status: 404
            })
    }
    return index;
}


app.get('/api/productos', (req, res)=>{
    res.status(200).json(productos);
});

app.get('/api/productos/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const index= productoExiste(id, res);
    if(index>-1){
        res.status(200).json(productos[index]);
    }
});

app.post('/api/productos', (req, res)=>{
    const {nombre, precio, categoria}= req.body;
    if(!nombre){
        return res.status(400).json({mensaje: 'Ingresa el nombre.'})
    }
    if(!precio||precio<10){
        return res.status(400).json({mensaje: `Precio no válido para ${nombre}.`})
    }
    if(!categoria){
        return res.status(400).json({mensaje: 'Ingresa la categoria.'})
    }
    const nuevoProducto={
        id:productos.length+1,
        nombre: nombre,
        precio: precio,
        categoria: categoria
    }
    productos.push(nuevoProducto);
    res.status(201).json({
        mensaje: 'Nuevo producto creado',
        datos: nuevoProducto
    })
})

app.put('/api/productos/:id', (req, res)=>{
    const id= parseInt(req.params.id);
    const index= productoExiste(id, res);
    // if(index>-1){
        productos[index].id= req.body.id;
        productos[index].nombre= req.body.nombre;
        productos[index].precio= req.body.precio;
        productos[index].categoria= req.body.categoria;
        res.status(201).json({
            mensaje: 'Producto modificado exitosamente',
            datos: productos[index]
        });
    // }
    
})

app.delete('/api/productos/:id', (req, res)=>{
    const id= parseInt(req.params.id);
    const index= productoExiste(id, res);
    const borrado= productos[index];
    if(index>-1){
        productos= productos.filter(producto=>producto.id===id);
        res.status(201).json({
            mensaje:'Producto eliminado con exito',
            datos: borrado,
            status: 201
        })
    }
})

app.listen(port, ()=>console.log(`Escuchando en el puerto ${port}`));



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