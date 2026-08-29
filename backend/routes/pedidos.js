const express = require('express');
const router = express.Router();
const { getPedidos } = require('../controllers/pedidosController');

router.get('/', getPedidos); // GET /api/pedidos

module.exports = router;