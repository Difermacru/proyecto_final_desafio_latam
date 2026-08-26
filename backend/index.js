require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const categoriasRoutes = require('./routes/categorias');
const usuariosRoutes = require('./routes/usuarios'); 
const loginRoutes = require('./routes/login');


// Middlewares
app.use(cors());
app.use(express.json()); // Permite leer el body de las peticiones en formato JSON
app.use('/api/categorias', categoriasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes);


// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor de VetMarket funcionando al 100%!');
});


// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});