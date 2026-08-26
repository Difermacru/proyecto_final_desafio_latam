const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432, // Puerto por defecto de Postgres
});


// Prueba para verificar que la conexión funciona
pool.connect()
    .then(() => console.log('¡Conexión exitosa a la base de datos de VetMarket!'))
    .catch((err) => console.error('Error conectando a la base de datos:', err));

module.exports = pool;