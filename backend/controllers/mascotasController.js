const pool = require('../db');

// LEER las mascotas de UN usuario (para elegir a cuál se le reserva el servicio, o mostrarlas en el perfil)
const getMascotasPorUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const { rows } = await pool.query(
            'SELECT * FROM mascotas WHERE usuario_id = $1',
            [usuario_id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// CREAR una mascota nueva para el usuario logeado
const crearMascota = async (req, res) => {
    try {
        const usuario_id = req.usuario.id; // viene del token
        const { nombre, especie, raza } = req.body;

        if (!nombre || !especie) {
            return res.status(400).json({ message: 'Falta nombre o especie' });
        }

        const { rows } = await pool.query(`
            INSERT INTO mascotas (usuario_id, nombre, especie, raza)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [usuario_id, nombre, especie, raza || null]);

        res.status(201).json({ message: 'Mascota agregada', mascota: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// ACTUALIZAR una mascota (solo su dueño)
const actualizarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.usuario.id;
        const { nombre, especie, raza } = req.body;

        const { rows } = await pool.query(`
            UPDATE mascotas
            SET nombre = $1, especie = $2, raza = $3
            WHERE id = $4 AND usuario_id = $5
            RETURNING *
        `, [nombre, especie, raza || null, id, usuario_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        res.json({ message: 'Mascota actualizada', mascota: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getMascotasPorUsuario, crearMascota, actualizarMascota };