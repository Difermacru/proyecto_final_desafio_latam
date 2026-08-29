const pool = require('../db'); // conexión a la base de datos
const bcrypt = require('bcryptjs'); // para encriptar contraseñas
const jwt = require('jsonwebtoken'); // para generar el token

// ===== REGISTRO: crea un usuario nuevo =====
const registro = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // encriptamos la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // guardamos el usuario en la base de datos
        const { rows } = await pool.query(
            'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
            [nombre, email, password_hash, rol || 'cliente']
        );

        res.status(201).json({ mensaje: 'Usuario registrado', usuario: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ===== LOGIN: verifica credenciales y entrega un token =====
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        const usuario = rows[0];

        // comparamos la contraseña con la encriptada guardada
        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // generamos el token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registro, login };