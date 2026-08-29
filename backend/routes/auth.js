const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/authController'); // trae las funciones del controlador

// POST /api/auth/registro → crea un usuario nuevo
router.post('/registro', registro);

// POST /api/auth/login → verifica credenciales y devuelve un token
router.post('/login', login);

module.exports = router;