const express = require('express');
const router= express.Router();
const productoController= require('../controllers/productoController');

router.get('/', productoController.getProductos);

router.post('/', productoController.crearProducto);
router.put('/:id', productoController.modificarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports= router;