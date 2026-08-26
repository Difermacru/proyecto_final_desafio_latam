const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/usuariosController');


// Responde a POST /api/usuarios
router.post('/', registrarUsuario);


module.exports = router;