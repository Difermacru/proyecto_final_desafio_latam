const pool = require('../db');

// LEER todos los pedidos
const getPedidos = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM pedidos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getPedidos };