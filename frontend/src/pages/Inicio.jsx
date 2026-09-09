import { useState, useEffect } from 'react'; // hooks
import ProductCard from '../components/ProductCard'; // tarjeta reutilizable
import ServiceCard from '../components/ServiceCard'; // tarjeta de servicios
import { API_URL } from '../config';

// Página principal del sitio
function Inicio() {
  const [busqueda, setBusqueda] = useState(''); // texto escrito en la barra de búsqueda
  const [productos, setProductos] = useState([]); // todos los productos (para poder filtrar)
  const [servicios, setServicios] = useState([]); // todos los servicios (para poder filtrar)

  useEffect(() => {
    // cargamos productos y servicios reales para poder buscar entre ambos
    fetch(`${API_URL}/api/publicaciones`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar productos:', error));

    fetch(`${API_URL}/api/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error('Error al cargar servicios:', error));
  }, []);

  const destacados = productos.slice(0, 3); // tomamos los primeros 3 productos reales como destacados

  const handleBuscar = (e) => {
    e.preventDefault();
  };

  // filtramos por título/nombre si hay un término de búsqueda (case-insensitive)
  const termino = busqueda.trim().toLowerCase();
  const productosFiltrados = termino
    ? productos.filter((p) => p.titulo?.toLowerCase().includes(termino))
    : [];
  const serviciosFiltrados = termino
    ? servicios.filter((s) => s.nombre?.toLowerCase().includes(termino))
    : [];
  const hayBusqueda = termino.length > 0;
  const sinResultados = hayBusqueda && productosFiltrados.length === 0 && serviciosFiltrados.length === 0;

  return (
    <div>
      {/* ===== HERO: imagen grande con texto encima ===== */}
      <div className="hero">
        <div className="hero__overlay">
          <h1 className="hero__title">Todo para tu mascota, en un solo lugar</h1>
          <p className="hero__subtitle">Compra productos y reserva servicios de baño, peluquería y más.</p>
        </div>
      </div>

      {/* Contenido debajo del hero */}
      <div className="container mt-4">
        {/* Barra de búsqueda: filtra productos y servicios en esta misma página */}
        <form className="input-group my-4" onSubmit={handleBuscar}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos o servicios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Buscar</button>
        </form>

        {hayBusqueda ? (
          // ===== Resultados de búsqueda =====
          <>
            <p className="text-muted">
              {productosFiltrados.length + serviciosFiltrados.length} resultado(s) para "{busqueda}"
            </p>

            {sinResultados && <p>No se encontraron productos ni servicios que coincidan con tu búsqueda.</p>}

            {productosFiltrados.length > 0 && (
              <>
                <h4 className="mt-3">Productos</h4>
                <div className="row mt-3">
                  {productosFiltrados.map((producto) => (
                    <div className="col-md-4 mb-3" key={producto.id}>
                      <ProductCard
                        id={producto.id}
                        nombre={producto.titulo}
                        precio={producto.precio}
                        imagen={producto.imagen}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {serviciosFiltrados.length > 0 && (
              <>
                <h4 className="mt-3">Servicios</h4>
                <div className="row mt-3">
                  {serviciosFiltrados.map((servicio) => (
                    <div className="col-md-3 mb-3" key={servicio.id}>
                      <ServiceCard
                        nombre={servicio.nombre}
                        precio={servicio.precio_base}
                        imagen={servicio.imagen || "/bano.jpg"}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // ===== Sección de productos destacados (cuando no hay búsqueda activa) =====
          <>
            <h3 className="fw-bold">Productos Destacados</h3>
            <div className="row mt-3">
              {destacados.map((producto) => (
                <div className="col-md-4 mb-3" key={producto.id}>
                  <ProductCard
                    id={producto.id}
                    nombre={producto.titulo}
                    precio={producto.precio}
                    imagen={producto.imagen}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Inicio;