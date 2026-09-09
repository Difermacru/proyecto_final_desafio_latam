const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/validarToken');
const { getResenasPorPublicacion, crearResena } = require('../controllers/resenasController');

// Ruta PÚBLICA (cualquiera puede leer las reseñas de un producto)
router.get('/publicacion/:publicacion_id', getResenasPorPublicacion);

// Ruta PROTEGIDA (hay que estar logeado para dejar una reseña)
router.post('/', validarToken, crearResena);

module.exports = router;