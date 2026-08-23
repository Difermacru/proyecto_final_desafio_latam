import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable

// Página principal del panel de usuario
function Perfil() {
  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral, más angosta (col-md-2) */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: contenido, ocupa el resto */}
        <div className="col-md-10">
          <h1 className="fw-bold">Bienvenido</h1>
          <p className="text-muted">Gestiona tu perfil, pedidos y citas desde aquí.</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;