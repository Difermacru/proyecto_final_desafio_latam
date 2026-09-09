const pool = require('../db');

// LEER todos los pedidos
const getPedidos = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM pedidos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

// CREAR un pedido a partir del carrito del usuario logeado (checkout)
const crearPedido = async (req, res) => {
    try {
        const usuario_id = req.usuario.id; // viene del token
        const { metodo_pago } = req.body;

        // buscamos el carrito del usuario
        const carritoRes = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);
        if (carritoRes.rows.length === 0) {
            return res.status(400).json({ message: 'No tienes un carrito activo' });
        }
        const carritoId = carritoRes.rows[0].id;

        // traemos los items del carrito con su precio actual
        const itemsRes = await pool.query(`
            SELECT ci.publicacion_id, ci.cantidad, p.precio
            FROM carrito_items ci
            JOIN publicaciones p ON ci.publicacion_id = p.id
            WHERE ci.carrito_id = $1
        `, [carritoId]);

        if (itemsRes.rows.length === 0) {
            return res.status(400).json({ message: 'Tu carrito está vacío' });
        }

        // calculamos el total sumando precio × cantidad
        const total = itemsRes.rows.reduce(
            (suma, item) => suma + Number(item.precio) * item.cantidad,
            0
        );

        // creamos el pedido
        const pedidoRes = await pool.query(`
            INSERT INTO pedidos (usuario_id, estado, total)
            VALUES ($1, 'Pendiente', $2)
            RETURNING *
        `, [usuario_id, total]);
        const pedido = pedidoRes.rows[0];

        // copiamos cada item del carrito al pedido (pedido_items)
        for (const item of itemsRes.rows) {
            await pool.query(`
                INSERT INTO pedido_items (pedido_id, publicacion_id, cantidad, precio_unitario)
                VALUES ($1, $2, $3, $4)
            `, [pedido.id, item.publicacion_id, item.cantidad, item.precio]);
        }

        // registramos el pago
        await pool.query(`
            INSERT INTO pagos (pedido_id, metodo, monto, estado)
            VALUES ($1, $2, $3, 'Aprobado')
        `, [pedido.id, metodo_pago || 'Tarjeta', total]);

        // vaciamos el carrito ya que se convirtió en pedido
        await pool.query('DELETE FROM carrito_items WHERE carrito_id = $1', [carritoId]);

        res.status(201).json({ message: 'Pedido creado', pedido });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error interno del servidor' });
    }
};

module.exports = { getPedidos, crearPedido };