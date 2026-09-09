const pool = require('../db');

// LEER los items del carrito de un usuario
const getCarrito = async (req, res) => {
    try {
        const { usuario_id } = req.params;

        // buscamos el carrito del usuario (o lo creamos si no existe)
        let carrito = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);

        if (carrito.rows.length === 0) {
            // si el usuario no tiene carrito, lo creamos
            carrito = await pool.query(
                'INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING *',
                [usuario_id]
            );
        }

        const carritoId = carrito.rows[0].id;

        // traemos los items del carrito con datos de la publicación (JOIN)
        const items = await pool.query(`
            SELECT ci.id, ci.cantidad, p.titulo, p.precio, p.imagen
            FROM carrito_items ci
            JOIN publicaciones p ON ci.publicacion_id = p.id
            WHERE ci.carrito_id = $1
        `, [carritoId]);

        res.json(items.rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// AGREGAR un producto al carrito (si ya existe, suma la cantidad en vez de duplicar la fila)
const agregarItem = async (req, res) => {
    try {
        const { usuario_id, publicacion_id, cantidad } = req.body;
        const cantidadAAgregar = cantidad || 1;

        // buscamos (o creamos) el carrito del usuario
        let carrito = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);

        if (carrito.rows.length === 0) {
            carrito = await pool.query(
                'INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING *',
                [usuario_id]
            );
        }

        const carritoId = carrito.rows[0].id;

        // ¿el producto ya está en este carrito?
        const itemExistente = await pool.query(
            'SELECT * FROM carrito_items WHERE carrito_id = $1 AND publicacion_id = $2',
            [carritoId, publicacion_id]
        );

        let resultado;
        if (itemExistente.rows.length > 0) {
            // ya existe: sumamos la cantidad en vez de crear otra fila
            resultado = await pool.query(`
                UPDATE carrito_items
                SET cantidad = cantidad + $1
                WHERE id = $2
                RETURNING *
            `, [cantidadAAgregar, itemExistente.rows[0].id]);
        } else {
            // no existe todavía: lo insertamos
            resultado = await pool.query(`
                INSERT INTO carrito_items (carrito_id, publicacion_id, cantidad)
                VALUES ($1, $2, $3)
                RETURNING *
            `, [carritoId, publicacion_id, cantidadAAgregar]);
        }

        res.status(201).json({ message: 'Producto agregado al carrito', item: resultado.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// ELIMINAR un item del carrito
const eliminarItem = async (req, res) => {
    try {
        const { id } = req.params; // id del carrito_item
        await pool.query('DELETE FROM carrito_items WHERE id = $1', [id]);
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getCarrito, agregarItem, eliminarItem };