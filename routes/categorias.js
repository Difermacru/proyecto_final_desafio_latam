const express = require('express');
const router = express.Router();
const { getCategorias } = require('../controllers/categoriasController');


// Responde a GET /api/categorias
router.get('/', getCategorias);


module.exports = router;