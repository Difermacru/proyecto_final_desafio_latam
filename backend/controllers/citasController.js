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

// CREAR una cita (reservar un servicio) — requiere estar logeado
const crearCita = async (req, res) => {
    try {
        const { servicio_id, mascota_id, fecha, hora } = req.body;
        const usuario_id = req.usuario.id; // viene del token validado por el middleware

        if (!servicio_id || !fecha || !hora) {
            return res.status(400).json({ message: 'Falta servicio_id, fecha u hora' });
        }

        const query = `
            INSERT INTO citas (usuario_id, servicio_id, mascota_id, fecha, hora, estado)
            VALUES ($1, $2, $3, $4, $5, 'Pendiente')
            RETURNING *
        `;
        const values = [usuario_id, servicio_id, mascota_id || null, fecha, hora];
        const { rows } = await pool.query(query, values);

        res.status(201).json({ message: 'Cita reservada', cita: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getCitas, crearCita };