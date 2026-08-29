const request = require('supertest');
const app = require('../index'); // importamos la app

// ===== Grupo de pruebas de la API =====
describe('Pruebas de la API VetMarket', () => {

    // Prueba 1: la ruta raíz responde
    test('GET / responde con 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    // Prueba 2: obtener categorías
    test('GET /api/categorias responde con 200', async () => {
        const res = await request(app).get('/api/categorias');
        expect(res.statusCode).toBe(200);
    });

    // Prueba 3: obtener publicaciones
    test('GET /api/publicaciones responde con 200', async () => {
        const res = await request(app).get('/api/publicaciones');
        expect(res.statusCode).toBe(200);
    });

    // Prueba 4: crear publicación SIN token debe ser rechazado (401)
    test('POST /api/publicaciones sin token responde con 401', async () => {
        const res = await request(app)
            .post('/api/publicaciones')
            .send({ titulo: "Test", precio: 10, stock: 5 });
        expect(res.statusCode).toBe(401);
    });

    // Prueba 5: login con credenciales incorrectas responde 401
    test('POST /api/login con datos incorrectos responde con 401', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: "noexiste@correo.com", password: "malo" });
        expect(res.statusCode).toBe(401);
    });

});