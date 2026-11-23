const express= require('express');
const router= express.Router();
const authController= require('../controllers/authController');

router.get('/usuarios', authController.getUsuarios);
router.delete('/delete/:id', authController.deleteUsuario);
router.post('/register', authController.registrarUsuario);
router.post('/login', authController.login);
router.get('/profile/:id', authController.profile);
module.exports= router;