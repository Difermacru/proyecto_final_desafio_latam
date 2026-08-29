const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/validarToken'); // el guardia del token
const {
    getPublicaciones,
    getPublicacionPorId,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
} = require('../controllers/publicacionesController');

// Rutas PÚBLICAS (cualquiera puede leer)
router.get('/', getPublicaciones);              
router.get('/:id', getPublicacionPorId);        

// Rutas PROTEGIDAS (necesitan token válido) → aquí va el middleware
router.post('/', validarToken, crearPublicacion);          
router.put('/:id', validarToken, actualizarPublicacion);  
router.delete('/:id', validarToken, eliminarPublicacion);  

module.exports = router;