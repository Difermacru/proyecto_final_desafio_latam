import { useContext } from 'react'; // hook para leer el contexto
import { useNavigate, Link } from 'react-router-dom'; // useNavigate para redirigir
import { UsuarioContext } from '../context/UsuarioContext'; // contexto del usuario

// Página de inicio de sesión
function Login() {
  const { login } = useContext(UsuarioContext); // función para iniciar sesión
  const navigate = useNavigate(); // para redirigir después del login

  // se ejecuta al hacer clic en "Acceder"
  const manejarLogin = () => {
    // guardamos un usuario de ejemplo (luego vendrá de la API)
    login({ nombre: "Diego", email: "diego@correo.com" });
    // redirigimos al panel
    navigate("/perfil");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4">
        <h2 className="fw-bold text-center">Iniciar Sesión</h2>
        <p className="text-muted text-center">Bienvenido de vuelta a VetMarket</p>

        {/* Campo de email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" placeholder="••••••••" />
        </div>

        {/* al hacer clic, inicia sesión y va al panel */}
        <button className="btn btn-success w-100" onClick={manejarLogin}>Acceder</button>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;