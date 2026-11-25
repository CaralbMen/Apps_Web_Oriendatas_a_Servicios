require('dotenv').config();
const express = require('express');
const cors= require('cors');
const productoRouts= require('./routes/routes.js');
const PORT = process.env.PRACTICADB2_PORT || 4001;

const app= express();

app.use(cors());
app.use(express.json());
app.use('/api', productoRouts);

app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);

    console.error(error.message);

    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ mensaje: 'El JSON enviado es inválido' });
    }

    if (['22P02', '22003', '23503'].includes(error.code)) {
        return res.status(400).json({ mensaje: 'Revisa los datos o identificadores enviados' });
    }

    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.listen(PORT, '127.0.0.1', ()=> console.log(`App escuchando en http://127.0.0.1:${PORT}`));