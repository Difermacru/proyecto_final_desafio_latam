const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/validarToken');
const { registrarUsuario, getUsuarioPorId, actualizarUsuario } = require('../controllers/usuariosController');

// Responde a POST /api/usuarios
router.post('/', registrarUsuario);

// GET /api/usuarios/5 → datos del usuario 5 (protegida)
router.get('/:id', validarToken, getUsuarioPorId);

// PUT /api/usuarios/5 → actualiza el usuario 5 (protegida, solo su propio perfil)
router.put('/:id', validarToken, actualizarUsuario);

module.exports = router;