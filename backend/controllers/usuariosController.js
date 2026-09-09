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

// LEER los datos de UN usuario (para precargar el formulario de edición)
const getUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            'SELECT id, nombre, apellido, email, telefono, direccion, rol FROM usuarios WHERE id = $1',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// ACTUALIZAR el perfil del usuario logeado
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // solo puede editar su propio perfil
        if (Number(id) !== req.usuario.id) {
            return res.status(403).json({ message: 'No puedes editar el perfil de otro usuario' });
        }

        const { nombre, apellido, email, telefono, direccion } = req.body;

        const query = `
            UPDATE usuarios
            SET nombre = $1, apellido = $2, email = $3, telefono = $4, direccion = $5
            WHERE id = $6
            RETURNING id, nombre, apellido, email, telefono, direccion, rol
        `;
        const values = [nombre, apellido, email, telefono, direccion, id];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Perfil actualizado', usuario: rows[0] });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { registrarUsuario, getUsuarioPorId, actualizarUsuario };