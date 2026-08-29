const pool = require('../db');


const getCategorias = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};


module.exports = { getCategorias };