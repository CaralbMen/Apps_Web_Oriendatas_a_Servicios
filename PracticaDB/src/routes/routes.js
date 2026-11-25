const express = require('express');
const productos = require('../controllers/productoController');
const externo = require('../controllers/externalControler');
const {
    autenticar, soloAdministrador, validarApiKey
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/categorias/:categoria', validarApiKey, productos.obtenerCategoria);

router.use('/productos', autenticar);
router.get('/productos', productos.getProductos);
router.get('/productos/id/:id', productos.obtenerPorId);
router.get('/productos/:nombre', productos.obtenerNombre);
router.post('/productos/crear', productos.crearProducto);
router.put('/productos/:id', productos.modificarProducto);
router.delete('/productos/:id', productos.eliminarProducto);

router.post('/poblar', autenticar, soloAdministrador, externo.poblarProductos);
router.post('/poblarCategorias', autenticar, soloAdministrador, externo.poblarCategorias);
router.post('/aniadirIdCategoria', autenticar, soloAdministrador, externo.aniadirIdCategoria);

module.exports = router;