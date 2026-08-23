import { useState, useEffect } from 'react'; // hooks
import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable

// Página que muestra las citas del usuario
function MisCitas() {
  const [citas, setCitas] = useState([]); // estado: lista de citas

  // al cargar, llenamos las citas (luego vendrán de la API)
  useEffect(() => {
    setCitas([
      { id: "#A001", servicio: "Baño y Peluquería", mascota: "Firulais", fecha: "2023-11-05", hora: "10:00 AM", precio: "35.00", estado: "Confirmada" },
      { id: "#A002", servicio: "Paseo de Perro (1h)", mascota: "Max", fecha: "2023-11-08", hora: "03:00 PM", precio: "35.00", estado: "Pendiente" },
    ]);
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
                  <h5 className="mb-1">Cita {cita.id}</h5>
                  <p className="mb-1">Servicio: {cita.servicio}</p>
                  <p className="text-muted mb-0">Mascota: {cita.mascota}</p>
                </div>
                <div className="text-center">
                  <p className="mb-1">{cita.fecha}</p>
                  <p className="text-muted mb-0">{cita.hora}</p>
                </div>
                <div>
                  <p className="text-success fw-bold mb-0">Precio: ${cita.precio}</p>
                </div>
                <div>
                  <button className="btn btn-outline-primary btn-sm me-2">Reprogramar</button>
                  <button className="btn btn-outline-danger btn-sm">Cancelar</button>
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