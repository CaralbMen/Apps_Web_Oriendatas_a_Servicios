const express = require('express');
const productos = require('../controllers/productoController');
const externo = require('../controllers/externalControler');

const router = express.Router();

router.get('/categorias/:categoria', productos.obtenerCategoria);

router.get('/productos', productos.getProductos);
router.get('/productos/id/:id', productos.obtenerPorId);
router.get('/productos/:nombre', productos.obtenerNombre);
router.post('/productos/crear', productos.crearProducto);
router.put('/productos/:id', productos.modificarProducto);
router.delete('/productos/:id', productos.eliminarProducto);

router.post('/poblar', externo.poblarProductos);
router.post('/poblarCategorias', externo.poblarCategorias);
router.post('/aniadirIdCategoria', externo.aniadirIdCategoria);

module.exports = router;