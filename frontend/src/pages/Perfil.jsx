import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable
import { UsuarioContext } from '../context/UsuarioContext';

// Página principal del panel de usuario
function Perfil() {
  const { usuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral, más angosta (col-md-2) */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: contenido, ocupa el resto */}
        <div className="col-md-10">
          <h1 className="fw-bold">Bienvenido, {usuario?.nombre}</h1>
          <p className="text-muted">Gestiona tu perfil, pedidos y citas desde aquí.</p>

          <div className="row mt-4">
            {/* ===== Tarjeta: Mi Perfil ===== */}
            <div className="col-md-4 mb-3">
              <div className="card text-center p-4 h-100">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  
                </div>
                <h5 className="fw-bold">Mi Perfil</h5>
                <p className="text-muted">Actualiza tu información.</p>
                <button className="btn btn-primary" onClick={() => navigate('/editar-perfil')}>
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* ===== Tarjeta: Mis Publicaciones ===== */}
            <div className="col-md-4 mb-3">
              <div className="card text-center p-4 h-100">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  
                </div>
                <h5 className="fw-bold">Mis Publicaciones</h5>
                <p className="text-muted">Gestiona lo que publicas.</p>
                <button className="btn btn-primary" onClick={() => navigate('/mis-publicaciones')}>
                  Ver Publicaciones
                </button>
              </div>
            </div>

            {/* ===== Tarjeta: Mis Favoritos ===== */}
            <div className="col-md-4 mb-3">
              <div className="card text-center p-4 h-100">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  
                </div>
                <h5 className="fw-bold">Mis Favoritos</h5>
                <p className="text-muted">Tus productos guardados.</p>
                <button className="btn btn-primary" onClick={() => navigate('/mis-favoritos')}>
                  Ver Favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;