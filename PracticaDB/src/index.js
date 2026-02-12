require('dotenv').config();
const express = require('express');
const cors= require('cors');
const productoRouts= require('./routes/routes.js');
const PORT = process.env.PORT || 4000;

const app= express();

app.use(cors());
app.use(express.json());
app.use('/api', productoRouts);
// app.use('/api/categorias', productoRouts);

app.listen(PORT, ()=> console.log(`App escuchando en puerto ${PORT}`));