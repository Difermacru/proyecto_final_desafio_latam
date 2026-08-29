const jwt = require('jsonwebtoken');

// Middleware que valida el token JWT en las cabeceras
const validarToken = (req, res, next) => {
    try {
        // 1. Tomamos el token de la cabecera "Authorization"
        const authHeader = req.headers.authorization;

        // 2. Si no viene el header, rechazamos
        if (!authHeader) {
            return res.status(401).json({ message: "No se proporcionó un token" });
        }

        // 3. El formato es "Bearer <token>", separamos para quedarnos con el token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token mal formado" });
        }

        // 4. Verificamos que el token sea válido con nuestra clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Guardamos los datos del usuario en req para usarlos después
        req.usuario = decoded;

        // 6. next() deja pasar la petición a la ruta
        next();
    } catch (error) {
        // si el token es inválido o expiró
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = validarToken;