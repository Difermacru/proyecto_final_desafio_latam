const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/validarToken');
const { getPedidos, crearPedido } = require('../controllers/pedidosController');

router.get('/', getPedidos); // GET /api/pedidos
router.post('/', validarToken, crearPedido); // POST /api/pedidos (checkout, hay que estar logeado)

module.exports = router;