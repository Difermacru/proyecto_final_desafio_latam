import { useState, useEffect } from 'react'; // hooks
import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable

// Página que muestra las citas del usuario
function MisCitas() {
  const [citas, setCitas] = useState([]); // estado: lista de citas

  // al cargar, llenamos las citas (luego vendrán de la API)
  useEffect(() => {
    fetch('http://localhost:3000/api/citas')
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error('Error al cargar citas:', error));
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: lista de citas */}
        <div className="col-md-10">
          <h1 className="fw-bold">Mis Citas</h1>

          {/* recorre las citas y crea una tarjeta por cada una */}
          {citas.map((cita) => (
            <div className="card mb-3 mt-3" key={cita.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Cita #{cita.id}</h5>
                  <p className="text-muted mb-0">Estado: {cita.estado}</p>
                </div>
                <div className="text-center">
                  <p className="mb-1">{cita.fecha}</p>
                  <p className="text-muted mb-0">{cita.hora}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MisCitas;