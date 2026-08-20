-- Tablas independientes
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

-- Tablas dependientes de usuarios o categorías
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

CREATE TABLE carritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id)
);

-- Tablas con múltiples dependencias
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