const express = require('express');
const { rateLimit } = require('express-rate-limit');
const auth = require('../controllers/authController');
const { autenticar, soloAdministrador } = require('../middleware/authMiddleware');

const router = express.Router();

const limiteLogin = rateLimit({
    windowMs: 60_000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { mensaje: 'Límite de solicitudes alcanzado. Intenta en un minuto.' }
});

router.post('/register', auth.registrarUsuario);
router.post('/login', limiteLogin, auth.login);
router.get('/usuarios', autenticar, soloAdministrador, auth.getUsuarios);
router.get('/profile/:id', autenticar, auth.profile);
router.delete('/delete/:id', autenticar, soloAdministrador, auth.deleteUsuario);

module.exports = router;