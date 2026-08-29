const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Verifica credenciales y devuelve un token
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // buscamos al usuario por su email
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = rows[0];

        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // comparamos la contraseña con la encriptada guardada
        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // generamos el token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // respondemos con el token y los datos del usuario (sin la contraseña)
        res.json({
            message: "Login exitoso",
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { loginUsuario };