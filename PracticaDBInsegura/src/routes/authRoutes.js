const express = require('express');
const { rateLimit } = require('express-rate-limit');
const auth = require('../controllers/authController');


const router = express.Router();


router.post('/register', auth.registrarUsuario);
router.post('/login', auth.login);
router.get('/usuarios', auth.getUsuarios);
router.get('/profile/:id', auth.profile);
router.delete('/delete/:id', auth.deleteUsuario);

module.exports = router;