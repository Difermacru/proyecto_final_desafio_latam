import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

// Página para crear una cuenta nueva
function Registro() {
  const navigate = useNavigate();

  // estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // se ejecuta al hacer clic en "Crear Cuenta"
  const manejarRegistro = async () => {
    try {
      // enviamos los datos al backend
      const respuesta = await fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.message || 'Error al registrar');
        return;
      }

      alert('¡Cuenta creada! Ahora inicia sesión.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setMensaje('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <div className="card p-4">
        <h2 className="fw-bold text-center">Crear Cuenta</h2>
        <p className="text-muted text-center">Únete a VetMarket en un minuto</p>

        {mensaje && <div className="alert alert-danger">{mensaje}</div>}

        {/* Nombre - conectado al estado 'nombre' */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100" onClick={manejarRegistro}>Crear Cuenta</button>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;