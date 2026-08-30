import { useState, useEffect } from 'react'; // hooks
import ServiceCard from '../components/ServiceCard'; // tarjeta de servicios
import { API_URL } from '../config';

// Página que muestra el listado de servicios
function Servicios() {
  const [servicios, setServicios] = useState([]); // estado: lista de servicios

  // al cargar, llenamos los servicios (luego vendrán de la API) — con imagen
  useEffect(() => {
    fetch(`${API_URL}/api/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error('Error al cargar servicios:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Listado de Servicios</h1>
      <div className="row mt-3">
        {/* recorre los servicios y crea una tarjeta por cada uno */}
        {servicios.map((servicio) => (
          <div className="col-md-3 mb-3" key={servicio.id}>
            {/* pasamos la imagen como prop */}
            <ServiceCard
              nombre={servicio.nombre}
              precio={servicio.precio_base}
              imagen={servicio.imagen || "/bano.jpg"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;