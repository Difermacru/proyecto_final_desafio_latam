import { useState, useContext } from 'react'; // useState para los campos
import { useNavigate, Link } from 'react-router-dom';
import { UsuarioContext } from '../context/UsuarioContext';
import { API_URL } from '../config';
// Página de inicio de sesión
function Login() {
  const { login } = useContext(UsuarioContext); // función para guardar la sesión
  const navigate = useNavigate();

  // estados para guardar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // para mostrar errores

  // se ejecuta al hacer clic en "Acceder"
  const manejarLogin = async () => {
    try {
      // pedimos al backend que valide las credenciales
      const respuesta = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // enviamos email y password
      });

      const data = await respuesta.json();

      // si el backend responde con error (credenciales inválidas)
      if (!respuesta.ok) {
        setError(data.message || 'Error al iniciar sesión');
        return;
      }

      // si todo bien: guardamos el usuario y el token en el contexto
      login(data.usuario);
      // guardamos el token para usarlo en rutas protegidas
      localStorage.setItem('token', data.token);

      // redirigimos al panel
      navigate('/perfil');
    } catch {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4">
        <h2 className="fw-bold text-center">Iniciar Sesión</h2>
        <p className="text-muted text-center">Bienvenido de vuelta a VetMarket</p>

        {/* mensaje de error si lo hay */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Campo de email */}
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

        {/* Campo de contraseña */}
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

        <button className="btn btn-success w-100" onClick={manejarLogin}>Acceder</button>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;