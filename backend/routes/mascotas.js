const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/validarToken');
const { getMascotasPorUsuario, crearMascota, actualizarMascota } = require('../controllers/mascotasController');

// GET /api/mascotas/usuario/5 → mascotas del usuario 5
router.get('/usuario/:usuario_id', getMascotasPorUsuario);

// POST /api/mascotas → crea una mascota para el usuario logeado
router.post('/', validarToken, crearMascota);

// PUT /api/mascotas/3 → actualiza la mascota 3 (solo su dueño)
router.put('/:id', validarToken, actualizarMascota);

module.exports = router;