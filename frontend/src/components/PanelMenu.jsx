import { NavLink } from 'react-router-dom'; // NavLink resalta la ruta activa

// Menú lateral reutilizable del panel de usuario
function PanelMenu() {
  return (
    <div className="d-flex flex-column">
      <h6 className="fw-bold mb-3">Panel de Usuario</h6>
      {/* NavLink aplica la clase 'active' automáticamente cuando estás en esa ruta */}
      <NavLink className="panel-link text-decoration-none" to="/perfil">Mi Perfil</NavLink>
      <NavLink className="panel-link text-decoration-none" to="/mis-publicaciones">Mis Publicaciones</NavLink>
      <NavLink className="panel-link text-decoration-none" to="/mis-favoritos">Mis Favoritos</NavLink>
      <NavLink className="panel-link text-decoration-none" to="/mis-pedidos">Mis Pedidos</NavLink>
      <NavLink className="panel-link text-decoration-none" to="/mis-citas">Mis Citas</NavLink>
      <NavLink className="panel-link text-decoration-none" to="/configuracion">Configuración</NavLink>
    </div>
  );
}

export default PanelMenu;