const express = require('express');
const router= express.Router();
const productoController= require('../controllers/productoController');
const {poblarProductos, poblarCategorias, aniadirIdCategoria}= require('../controllers/externalControler');

//Controlador de los productos en la primera practica
router.get('/', productoController.getProductos);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.modificarProducto);
router.delete('/:id', productoController.eliminarProducto);

//Controlador conectado a la API exterana para poblar  la db
router.post('/poblar', poblarProductos);
router.post('/poblarCategorias', poblarCategorias);
router.post('/aniadirIdCategoria', aniadirIdCategoria);
module.exports= router;