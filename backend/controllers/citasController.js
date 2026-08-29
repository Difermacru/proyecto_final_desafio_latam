const pool = require('../db');

// LEER todas las citas
const getCitas = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM citas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getCitas };