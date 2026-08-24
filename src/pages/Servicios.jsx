import { useState, useEffect } from 'react'; // hooks
import ServiceCard from '../components/ServiceCard'; // tarjeta de servicios

// Página que muestra el listado de servicios
function Servicios() {
  const [servicios, setServicios] = useState([]); // estado: lista de servicios

  // al cargar, llenamos los servicios (luego vendrán de la API) — con imagen
  useEffect(() => {
    setServicios([
      { id: 1, nombre: "Baño y Peluquería", precio: "30.00", imagen: "/bano.jpg" },
      { id: 2, nombre: "Paseos Diarios", precio: "15.00", imagen: "/paseo.jpg" },
      { id: 3, nombre: "Guardería Canina", precio: "40.00", imagen: "/guarderia.jpg" },
      { id: 4, nombre: "Consulta Veterinaria", precio: "50.00", imagen: "/consulta.jpg" },
    ]);
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
              precio={servicio.precio}
              imagen={servicio.imagen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;