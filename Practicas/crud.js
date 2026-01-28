const express= import('express');
const app= express();
const port= 3000;

app.use(express.json());

let usuarios=[
    {id: 1, nombre: 'Juan', rol:'Admin'},
    {id: 2, nombre: 'Maria', rol: 'User'}
];

app.get('/api/usuarios', (req, res)=>{
    res.json(usuarios);
});

app.post('/api/usuarios', (req, res)=>{
    const nuevoUsuario={
        id: usuarios.length+1,
        nombre: req.body.nombre,
        rol: req.body.rol
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/api/usuarios/:id', (req, res)=>{
    const idBusqueda= parseInt(req.params.id);
    const indice= usuarios.findIndex(user=>user.id===idBusqueda);
    if(indice===-1){
        return res.status(404);
    }
})

app.delete('/api/usuarios/:id', (req, res)=>{
    const idBusqueda= parseInt(req.params.id);
})