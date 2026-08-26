import { useContext } from 'react'; // hook para leer el contexto
import { Navigate } from 'react-router-dom'; // Navigate redirige a otra ruta
import { UsuarioContext } from '../context/UsuarioContext'; // contexto del usuario

// Componente guardián: protege las rutas privadas
function RutaProtegida({ children }) {
  const { usuario } = useContext(UsuarioContext); // leemos si hay usuario logueado

  // Si NO hay usuario, redirige al login
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si SÍ hay usuario, muestra la página protegida
  return children;
}

export default RutaProtegida;