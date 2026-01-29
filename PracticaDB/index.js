
const express = require('express');
const app= express();
const productoRouts= require('./routes/routes.js');

require('dotenv').config();
const cors= require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRouts);
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`App escuchando en puerto ${PORT}`));