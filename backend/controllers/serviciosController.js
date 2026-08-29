const pool = require('../db');

// LEER todos los servicios
const getServicios = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM servicios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// LEER un servicio por id
const getServicioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM servicios WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getServicios, getServicioPorId };