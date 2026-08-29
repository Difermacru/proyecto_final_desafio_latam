const express = require('express');
const router = express.Router();
const { getCitas } = require('../controllers/citasController');

router.get('/', getCitas); // GET /api/citas

module.exports = router;