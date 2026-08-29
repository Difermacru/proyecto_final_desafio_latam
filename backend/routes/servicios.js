const express = require('express');
const router = express.Router();
const { getServicios, getServicioPorId } = require('../controllers/serviciosController');

router.get('/', getServicios);          // GET /api/servicios
router.get('/:id', getServicioPorId);   // GET /api/servicios/1

module.exports = router;