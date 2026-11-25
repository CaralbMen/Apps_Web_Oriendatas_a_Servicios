const jwt = require('jsonwebtoken');
const pool = require('../config/db');

async function autenticar(req, res, next) {
    const encabezado = req.get('Authorization') || '';
    const coincidencia = /^Bearer ([^\s]+)$/i.exec(encabezado);

    if (!coincidencia) {
        return res.status(401).json({ mensaje: 'Se requiere un token Bearer' });
    }

    let token;
    try {
        token = jwt.verify(coincidencia[1], process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });
    } catch {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }

    const resultado = await pool.query(
        'select id, email, role from usuarios where id = $1',
        [token.id]
    );

    if (!resultado.rows.length) {
        return res.status(401).json({ mensaje: 'La cuenta ya no existe' });
    }

    req.usuario = resultado.rows[0];
    next();
}

function soloAdministrador(req, res, next) {
    if (req.usuario.role !== 'administrador') {
        return res.status(403).json({ mensaje: 'Se requiere rol de administrador' });
    }
    next();
}

function validarApiKey(req, res, next) {
    if (!process.env.API_KEY || req.get('X-API-Key') !== process.env.API_KEY) {
        return res.status(401).json({ mensaje: 'API Key ausente o incorrecta' });
    }
    next();
}

module.exports = { autenticar, soloAdministrador, validarApiKey };