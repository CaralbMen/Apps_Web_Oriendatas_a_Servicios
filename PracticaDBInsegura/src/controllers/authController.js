const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registrarUsuario(req, res) {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || !email.trim() ||
        typeof password !== 'string' || !password) {
        return res.status(400).json({ mensaje: 'Escribe correo y contraseña' });
    }

    const hash = await bcrypt.hash(password, 10);

    const resultado = await pool.query(
        `insert into usuarios (email, password, role)
         values ($1, $2, 'usuario')
         on conflict (email) do nothing
         returning id, email, role`,
        [email.trim(), hash]
    );

    if (!resultado.rowCount) {
        return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    res.status(201).json(resultado.rows[0]);
}

async function login(req, res) {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ mensaje: 'Escribe correo y contraseña' });
    }

    const resultado = await pool.query(
        'select id, password from usuarios where email = $1',
        [email.trim()]
    );
    const usuario = resultado.rows[0];

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });

    res.json({ mensaje: 'Bienvenido', token });
}

async function getUsuarios(req, res) {
    const resultado = await pool.query(
        'select id, email, role from usuarios order by id'
    );
    res.json(resultado.rows);
}

async function profile(req, res) {
    const id = Number(req.params.id);

    if (id !== req.usuario.id && req.usuario.role !== 'administrador') {
        return res.status(403).json({ mensaje: 'Sin permiso para ver este perfil' });
    }

    const resultado = await pool.query(
        'select id, email, role from usuarios where id = $1', [id]
    );

    if (!resultado.rowCount) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
}

async function deleteUsuario(req, res) {
    try {
        const resultado = await pool.query(
            'delete from usuarios where id = $1', [req.params.id]
        );
        if (!resultado.rowCount) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        if (error.code === '23503') {
            return res.status(409).json({ mensaje: 'El usuario tiene productos asociados' });
        }
        throw error;
    }
}

module.exports = { registrarUsuario, login, getUsuarios, profile, deleteUsuario };