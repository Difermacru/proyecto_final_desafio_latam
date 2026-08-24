import { Link } from "react-router-dom"; // Link permite navegar sin recargar la página
import { useContext } from "react"; // hook para leer el contexto
import { CarritoContext } from "../context/CarritoContext"; // el contexto del carrito
import { UsuarioContext } from "../context/UsuarioContext"; // el contexto del usuario

function Navbar() {
  const { carrito } = useContext(CarritoContext); // leemos el carrito global
  const { usuario, logout } = useContext(UsuarioContext); // leemos el usuario y la función de salir
  return (
    // navbar
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      {/* Nombre/logo de la marca, al hacer clic lleva al inicio "/" */}
      <Link className="navbar-brand fw-bold" to="/">
        VetMarket
      </Link>

      {/* Contenedor de los enlaces de navegación */}
      <div className="navbar-nav me-auto">
        <Link className="nav-link" to="/productos">
          Productos
        </Link>
        <Link className="nav-link" to="/servicios">
          Servicios
        </Link>
      </div>

      {/* Enlaces del lado derecho: carrito y sesión */}
      <div className="navbar-nav">
        {/* Enlace al carrito*/}
        <Link className="nav-link" to="/carrito">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>{" "}
          {carrito.length}{" "}
          {/* muestra la cantidad de productos en el carrito */}
        </Link>

        {/* Si HAY usuario logueado: muestra Mi Perfil y Cerrar Sesión */}
        {usuario ? (
          <>
            <Link className="nav-link" to="/perfil">
              Mi Perfil
            </Link>
            {/* botón que cierra la sesión */}
            <button className="nav-link btn btn-link" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          // Si NO hay usuario: muestra Iniciar Sesión y Registrarse
          <>
            <Link className="nav-link" to="/login">
              Iniciar Sesión
            </Link>
            <Link className="nav-link" to="/registro">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
