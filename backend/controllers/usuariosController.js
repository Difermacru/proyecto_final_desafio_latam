const pool = require('../db');
const bcrypt = require('bcryptjs');

// Registra un usuario nuevo
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // encriptamos la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // insertamos en la base de datos (solo las columnas que existen)
        const query = `
            INSERT INTO usuarios (nombre, email, password_hash, rol)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nombre, email, rol
        `;
        const values = [nombre, email, password_hash, rol || 'cliente'];

        const { rows } = await pool.query(query, values);

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            usuario: rows[0]
        });
    } catch (error) {
        // si el email ya existe (violación de la restricción UNIQUE)
        if (error.code === '23505') {
            return res.status(400).json({ message: "El correo electrónico ya está registrado" });
        }
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { registrarUsuario };