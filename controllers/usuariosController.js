const pool = require('../db');
const bcrypt = require('bcryptjs');


const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, password, telefono, direccion, ciudad, region } = req.body;


        // 1. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);


        // 2. Insertar en la base de datos
        const query = `
            INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, direccion, ciudad, region, rol)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id AS id_usuario, nombre, apellido, email, telefono
        `;
        const values = [nombre, apellido, email, password_hash, telefono, direccion, ciudad, region, 'cliente'];

        const { rows } = await pool.query(query, values);


        // 3. Responder con el formato exacto del contrato de la API
        res.status(201).json({
            message: "Usuario registrado exitosamente",
            usuario: rows[0]
        });
        
    } catch (error) {
        // Manejo de error si el email ya existe
        if (error.code === '23505') {
            return res.status(400).json({ message: "El correo electrónico ya está registrado" });
        }
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};


module.exports = { registrarUsuario };