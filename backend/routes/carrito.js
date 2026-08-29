const express = require('express');
const router = express.Router();
const { getCarrito, agregarItem, eliminarItem } = require('../controllers/carritoController');

router.get('/:usuario_id', getCarrito);   // GET /api/carrito/7
router.post('/', agregarItem);             // POST /api/carrito
router.delete('/:id', eliminarItem);       // DELETE /api/carrito/3

module.exports = router;