const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/validarToken');
const { getCitas, crearCita } = require('../controllers/citasController');

router.get('/', getCitas); // GET /api/citas
router.post('/', validarToken, crearCita); // POST /api/citas (hay que estar logeado)

module.exports = router;