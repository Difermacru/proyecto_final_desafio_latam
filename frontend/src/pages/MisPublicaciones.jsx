import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PanelMenu from '../components/PanelMenu';

// Página que muestra las publicaciones del usuario
function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // pedimos todas las publicaciones al backend
    fetch('http://localhost:3000/api/publicaciones')
      .then((res) => res.json())
      .then((data) => setPublicaciones(data))
      .catch((error) => console.error('Error al cargar publicaciones:', error));
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        <div className="col-md-2">
          <PanelMenu />
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">Mis Publicaciones</h1>
            <Link to="/nueva-publicacion" className="btn btn-success">+ Nueva Publicación</Link>
          </div>

          {/* recorre las publicaciones reales del backend */}
          {publicaciones.map((pub) => (
            <div className="card mb-3 mt-3" key={pub.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  {/* el backend usa 'titulo', no 'nombre' */}
                  <h5 className="mb-1">{pub.titulo}</h5>
                  <p className="text-success fw-bold mb-0">${pub.precio}</p>
                  <p className="text-muted mb-0">Stock: {pub.stock}</p>
                </div>
                <div>
                  <span className="badge bg-secondary me-3">{pub.estado}</span>
                  <button className="btn btn-outline-primary btn-sm me-2">Editar</button>
                  <button className="btn btn-outline-danger btn-sm">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MisPublicaciones;