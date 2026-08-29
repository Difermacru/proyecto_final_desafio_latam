const pool = require('../db');

// LEER todas las publicaciones
const getPublicaciones = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM publicaciones');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// LEER una publicación por su id
const getPublicacionPorId = async (req, res) => {
    try {
        const { id } = req.params; // el id viene en la URL
        const { rows } = await pool.query('SELECT * FROM publicaciones WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// CREAR una publicación nueva
const crearPublicacion = async (req, res) => {
    try {
        const { usuario_id, categoria_id, titulo, precio, stock, estado } = req.body;
        const query = `
            INSERT INTO publicaciones (usuario_id, categoria_id, titulo, precio, stock, estado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [usuario_id, categoria_id, titulo, precio, stock, estado || 'Activa'];
        const { rows } = await pool.query(query, values);

        res.status(201).json({ message: 'Publicación creada', publicacion: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// ACTUALIZAR una publicación
const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, precio, stock, estado } = req.body;
        const query = `
            UPDATE publicaciones
            SET titulo = $1, precio = $2, stock = $3, estado = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [titulo, precio, stock, estado, id];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.json({ message: 'Publicación actualizada', publicacion: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// ELIMINAR una publicación
const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('DELETE FROM publicaciones WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.json({ message: 'Publicación eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = {
    getPublicaciones,
    getPublicacionPorId,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
};