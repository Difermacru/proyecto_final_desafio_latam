const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/loginController');


// Responde a POST /api/login
router.post('/', loginUsuario);


module.exports = router;