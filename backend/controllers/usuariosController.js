const pool = require("../db");
const bcrypt = require("bcryptjs");

// Validar formato de correo
const validarEmail = (correo) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

// Validar contraseña segura
const validarPassword = (password) => {
  const tieneMinimo = password.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const sinEspacios = !/\s/.test(password);

  return (
    tieneMinimo &&
    tieneMayuscula &&
    tieneMinuscula &&
    tieneNumero &&
    sinEspacios
  );
};

// Registra un usuario nuevo
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: "Nombre, correo y contraseña son obligatorios",
      });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({
        message: "El correo electrónico no tiene un formato válido",
      });
    }

    if (!validarPassword(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y no debe contener espacios",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const query = `
            INSERT INTO usuarios (nombre, email, password_hash, rol)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nombre, email, rol
        `;

    const values = [
      nombre.trim(),
      email.trim().toLowerCase(),
      password_hash,
      rol || "cliente",
    ];

    const { rows } = await pool.query(query, values);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El correo electrónico ya está registrado",
      });
    }

    res.status(500).json({
      error: error.message,
      message: "Error interno del servidor",
    });
  }
};

module.exports = { registrarUsuario };
