const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;


        // 1. Buscar si el usuario existe en la base de datos
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        const usuario = rows[0];

        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }


        // 2. Verificar que la contraseña sea correcta
        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }


        // 3. Generar el Token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // El token expira en 24 horas
        );


        // 4. Responder con el formato exacto del contrato de la API
        res.json({
            token,
            usuario: {
                id_usuario: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

        
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};


module.exports = { loginUsuario };