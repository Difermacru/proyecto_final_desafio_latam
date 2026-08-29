require('dotenv').config(); // primero: carga las variables del .env
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // usa el del .env, o 5432 por defecto
});

// Prueba para verificar que la conexión funciona
pool.connect()
    .then(() => console.log('¡Conexión exitosa a la base de datos de VetMarket!'))
    .catch((err) => console.error('Error conectando a la base de datos:', err));

module.exports = pool;