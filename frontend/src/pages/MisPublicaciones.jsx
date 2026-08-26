import { useState, useEffect } from 'react'; // hooks
import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable

// Página que muestra las publicaciones del usuario
function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]); // estado: lista de publicaciones

  // al cargar, llenamos las publicaciones (luego vendrán de la API)
  useEffect(() => {
    setPublicaciones([
      { id: 1, nombre: "Alimento Premium 10kg", categoria: "Alimentos", precio: "25.99", estado: "Activa" },
      { id: 2, nombre: "Cama Ortopédica Grande", categoria: "Accesorios", precio: "45.00", estado: "Activa" },
      { id: 3, nombre: "Juguete Interactivo", categoria: "Juguetes", precio: "12.50", estado: "Pausada" },
      { id: 4, nombre: "Transportadora Grande", categoria: "Accesorios", precio: "60.00", estado: "Vendida" },
    ]);
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: lista de publicaciones */}
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">Mis Publicaciones</h1>
            <button className="btn btn-success">+ Nueva Publicación</button>
          </div>

          {/* recorre las publicaciones y crea una fila por cada una */}
          {publicaciones.map((pub) => (
            <div className="card mb-3 mt-3" key={pub.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{pub.nombre}</h5>
                  <p className="text-muted mb-1">Categoría: {pub.categoria}</p>
                  <p className="text-success fw-bold mb-0">${pub.precio}</p>
                </div>
                <div>
                  {/* muestra el estado de la publicación */}
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