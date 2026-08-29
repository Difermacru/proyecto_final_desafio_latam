require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== IMPORTAR RUTAS =====
const categoriasRoutes = require('./routes/categorias');
const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login');
const publicacionesRoutes = require('./routes/publicaciones');
const serviciosRoutes = require('./routes/servicios');
const pedidosRoutes = require('./routes/pedidos');
const citasRoutes = require('./routes/citas');
const carritoRoutes = require('./routes/carrito');

// ===== MIDDLEWARES =====
app.use(cors());              // permite peticiones de otros orígenes (el frontend)
app.use(express.json());      // permite leer el body de las peticiones en formato JSON

// ===== CONECTAR RUTAS =====
app.use('/api/categorias', categoriasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/carrito', carritoRoutes);

// ===== RUTA BÁSICA DE PRUEBA =====
app.get('/', (req, res) => {
    res.send('¡Servidor de VetMarket funcionando al 100%!');
});

// Solo levanta el servidor si NO estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
}

module.exports = app; // exportamos la app para los tests