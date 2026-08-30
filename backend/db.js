const { Pool } = require('pg');
require('dotenv').config();

// si existe DATABASE_URL (Render), la usa; si no, las variables locales
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 5432,
      }
);

pool.connect()
  .then(() => console.log('¡Conexión exitosa a la base de datos de VetMarket!'))
  .catch((err) => console.error('Error conectando a la base de datos:', err));

module.exports = pool;