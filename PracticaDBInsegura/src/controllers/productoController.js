const pool = require('../config/db');

async function getProductos(req, res) {
    const resultado = await pool.query(
        'select * from productos order by id'
    );
    res.json(resultado.rows);
}

async function obtenerPorId(req, res) {
    const resultado = await pool.query(
        'select * from productos where id = $1',
        [req.params.id]
    );

    if (!resultado.rowCount) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(resultado.rows[0]);
}

async function crearProducto(req, res) {
    const {
        nombre, precio, stock = 0, descripcion = '', imagen,
        categoria, youtube_id, latitud, longitud
    } = req.body || {};

    if (typeof nombre !== 'string' || !nombre.trim() || !imagen) {
        return res.status(400).json({ mensaje: 'Nombre e imagen son obligatorios' });
    }
    if (!Number.isFinite(Number(precio)) || Number(precio) <= 0 ||
        !Number.isInteger(Number(stock)) || Number(stock) < 0) {
        return res.status(400).json({ mensaje: 'Revisa el precio y el stock' });
    }

    const resultado = await pool.query(
        `insert into productos
         (nombre, precio, stock, descripcion, imagen_url, id_categoria,
          youtube_id, latitud, longitud, id_usuario)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         returning id, nombre, id_usuario`,
        [nombre.trim(), precio, stock, descripcion, imagen, categoria ?? null,
         youtube_id ?? null, latitud ?? null, longitud ?? null, null]
    );
    res.status(201).json(resultado.rows[0]);
}

async function modificarProducto(req, res) {
    const { precio, stock } = req.body || {};

    if (!Number.isFinite(Number(precio)) || Number(precio) <= 0 ||
        stock == null || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
        return res.status(400).json({ mensaje: 'Envía precio positivo y stock válido' });
    }

    const resultado = await pool.query(
        `update productos set precio = $1, stock = $2
         where id = $3 returning *`,
        [precio, stock, req.params.id]
    );

    if (!resultado.rowCount) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(resultado.rows[0]);
}

async function eliminarProducto(req, res) {
    const resultado = await pool.query(
        'delete from productos where id = $1',
        [req.params.id]
    );

    if (!resultado.rowCount) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
}

async function obtenerNombre(req, res) {
    const resultado = await pool.query(
        'select * from productos where nombre ilike $1',
        [`%${req.params.nombre}%`]
    );
    res.json(resultado.rows);
}

async function obtenerCategoria(req, res) {
    const resultado = await pool.query(
        'select * from categorias where nombre ilike $1',
        [`%${req.params.categoria}%`]
    );
    res.json(resultado.rows);
}

module.exports = {
    getProductos, obtenerPorId, crearProducto, modificarProducto,
    eliminarProducto, obtenerNombre, obtenerCategoria
};