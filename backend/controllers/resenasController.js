const pool = require('../db');

// LEER las reseñas de UNA publicación (incluye el nombre de quien la escribió)
const getResenasPorPublicacion = async (req, res) => {
    try {
        const { publicacion_id } = req.params;
        const { rows } = await pool.query(`
            SELECT r.id, r.calificacion, r.comentario, r.usuario_id, u.nombre AS usuario_nombre
            FROM resenas r
            JOIN usuarios u ON r.usuario_id = u.id
            WHERE r.publicacion_id = $1
            ORDER BY r.id DESC
        `, [publicacion_id]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// CREAR una reseña (requiere estar logeado, el usuario_id sale del token)
const crearResena = async (req, res) => {
    try {
        const { publicacion_id, calificacion, comentario } = req.body;
        const usuario_id = req.usuario.id; // viene del token validado por el middleware

        if (!publicacion_id || !calificacion) {
            return res.status(400).json({ message: 'Falta publicacion_id o calificacion' });
        }
        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({ message: 'La calificación debe ser entre 1 y 5' });
        }

        const query = `
            INSERT INTO resenas (usuario_id, publicacion_id, calificacion, comentario)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [usuario_id, publicacion_id, calificacion, comentario || null];
        const { rows } = await pool.query(query, values);

        res.status(201).json({ message: 'Reseña creada', resena: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getResenasPorPublicacion, crearResena };