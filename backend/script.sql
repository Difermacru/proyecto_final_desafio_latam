-- ============================================
-- TABLAS INDEPENDIENTES (no dependen de nadie)
-- ============================================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE cupones (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

-- ============================================
-- TABLAS DEPENDIENTES (de usuarios o categorías)
-- ============================================

CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(50)
);

CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    categoria_id INT REFERENCES categorias(id),
    nombre VARCHAR(100) NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL,
    duracion_min INT NOT NULL
);

CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    categoria_id INT REFERENCES categorias(id),
    titulo VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    estado VARCHAR(50) NOT NULL
);
ALTER TABLE publicaciones ADD COLUMN imagen VARCHAR(255);

CREATE TABLE carritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id)
);

-- ============================================
-- TABLAS CON MÚLTIPLES DEPENDENCIAS
-- ============================================

CREATE TABLE imagenes_publicacion (
    id SERIAL PRIMARY KEY,
    publicacion_id INT REFERENCES publicaciones(id),
    url VARCHAR(255) NOT NULL,
    orden INT
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    publicacion_id INT REFERENCES publicaciones(id)
);

CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    publicacion_id INT REFERENCES publicaciones(id),
    calificacion INT NOT NULL
);

CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    servicio_id INT REFERENCES servicios(id),
    mascota_id INT REFERENCES mascotas(id),
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(50) NOT NULL
);

CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    carrito_id INT REFERENCES carritos(id),
    publicacion_id INT REFERENCES publicaciones(id),
    cantidad INT NOT NULL
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    cupon_id INT REFERENCES cupones(id),
    estado VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL
);

CREATE TABLE pedido_items (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    publicacion_id INT REFERENCES publicaciones(id),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    cita_id INT REFERENCES citas(id),
    metodo VARCHAR(50) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    estado VARCHAR(50) NOT NULL
);






-- ============================================
-- DATOS DE EJEMPLO PARA TODAS LAS TABLAS
-- Ejecutar DESPUÉS de crear las tablas
-- ============================================

-- ===== NIVEL 1: Tablas independientes =====

-- Usuarios (las contraseñas son hashes de ejemplo; en la práctica los genera bcrypt)
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Diego Mariño', 'diego@correo.com', '$2a$10$ejemploHashFicticio1234567890abcdef', 'admin'),
('Ana Pérez', 'ana@correo.com', '$2a$10$ejemploHashFicticio0987654321fedcba', 'cliente'),
('Luis Soto', 'luis@correo.com', '$2a$10$ejemploHashFicticioabcdef1234567890', 'cliente');

-- Categorías
INSERT INTO categorias (nombre, tipo) VALUES
('Alimentos', 'producto'),
('Juguetes', 'producto'),
('Accesorios', 'producto'),
('Baño y Peluquería', 'servicio'),
('Paseos', 'servicio');

-- Cupones
INSERT INTO cupones (codigo, tipo, valor) VALUES
('BIENVENIDO10', 'porcentaje', 10.00),
('ENVIOGRATIS', 'fijo', 5.00),
('VERANO2025', 'porcentaje', 15.00);

-- ===== NIVEL 2: Dependen de usuarios o categorías =====

-- Mascotas (usuario_id apunta a usuarios)
INSERT INTO mascotas (usuario_id, nombre, especie, raza) VALUES
(1, 'Firulais', 'Perro', 'Labrador'),
(1, 'Michi', 'Gato', 'Siamés'),
(2, 'Max', 'Perro', 'Bulldog');

-- Servicios (categoria_id apunta a categorias)
INSERT INTO servicios (categoria_id, nombre, precio_base, duracion_min) VALUES
(4, 'Baño completo', 30.00, 60),
(4, 'Peluquería canina', 35.00, 90),
(5, 'Paseo de 1 hora', 15.00, 60);

-- Publicaciones (usuario_id y categoria_id)
INSERT INTO publicaciones (usuario_id, categoria_id, titulo, precio, stock, estado) VALUES
(1, 1, 'Alimento Premium 10kg', 25.99, 50, 'Activa'),
(1, 3, 'Cama Ortopédica Grande', 45.00, 20, 'Activa'),
(2, 2, 'Juguete Interactivo', 12.50, 100, 'Activa'),
(2, 3, 'Correa Retráctil', 12.99, 30, 'Activa');

UPDATE publicaciones SET imagen = '/alimento.jpg' WHERE id = 1;
UPDATE publicaciones SET imagen = '/cama.jpg' WHERE id = 2;
UPDATE publicaciones SET imagen = '/juguete.jpg' WHERE id = 3;
UPDATE publicaciones SET imagen = '/correa.jpg' WHERE id = 4;

-- Carritos (usuario_id)
INSERT INTO carritos (usuario_id) VALUES
(1),
(2);

-- ===== NIVEL 3: Múltiples dependencias =====

-- Imágenes de publicación (publicacion_id)
INSERT INTO imagenes_publicacion (publicacion_id, url, orden) VALUES
(1, '/alimento.jpg', 1),
(2, '/cama.jpg', 1),
(3, '/juguete.jpg', 1),
(4, '/correa.jpg', 1);

-- Favoritos (usuario_id y publicacion_id)
INSERT INTO favoritos (usuario_id, publicacion_id) VALUES
(1, 3),
(1, 4),
(2, 1);

-- Reseñas (usuario_id y publicacion_id)
INSERT INTO resenas (usuario_id, publicacion_id, calificacion) VALUES
(2, 1, 5),
(2, 2, 4),
(1, 3, 5);

-- Citas (usuario_id, servicio_id, mascota_id)
INSERT INTO citas (usuario_id, servicio_id, mascota_id, fecha, hora, estado) VALUES
(1, 1, 1, '2025-11-05', '10:00', 'Confirmada'),
(2, 3, 3, '2025-11-08', '15:00', 'Pendiente');

-- Ítems del carrito (carrito_id y publicacion_id)
INSERT INTO carrito_items (carrito_id, publicacion_id, cantidad) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 4, 1);

-- Pedidos (usuario_id y cupon_id)
INSERT INTO pedidos (usuario_id, cupon_id, estado, total) VALUES
(1, 1, 'Entregado', 57.50),
(2, NULL, 'En camino', 85.00);

-- Ítems de pedido (pedido_id y publicacion_id)
INSERT INTO pedido_items (pedido_id, publicacion_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 25.99),
(1, 2, 1, 45.00),
(2, 3, 2, 12.50);

-- Pagos (pedido_id y opcionalmente cita_id)
INSERT INTO pagos (pedido_id, cita_id, metodo, monto, estado) VALUES
(1, NULL, 'Tarjeta', 57.50, 'Completado'),
(2, NULL, 'Transferencia', 85.00, 'Pendiente');