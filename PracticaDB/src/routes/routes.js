const express = require('express');
const router= express.Router();
const productoController= require('../controllers/productoController');
const {poblarProductos, poblarCategorias, aniadirIdCategoria}= require('../controllers/externalControler');

//Controlador de los productos en la primera practica
router.get('/productos/', productoController.getProductos);
router.post('/productos/', productoController.crearProducto);
router.put('/productos/:id', productoController.modificarProducto);
router.delete('/productos/:id', productoController.eliminarProducto);
router.get('/productos/:nombre', productoController.obtenerNombre);
router.get('/categorias/:categoria', productoController.obtenerCategoria);

//Controlador conectado a la API exterana para poblar  la db
router.post('/poblar', poblarProductos);
router.post('/poblarCategorias', poblarCategorias);
router.post('/aniadirIdCategoria', aniadirIdCategoria);

module.exports= router;