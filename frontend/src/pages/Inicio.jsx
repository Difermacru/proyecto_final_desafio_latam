import { useState, useEffect } from 'react'; // hooks
import ProductCard from '../components/ProductCard'; // tarjeta reutilizable

// Página principal del sitio
function Inicio() {
  const [destacados, setDestacados] = useState([]); // estado: productos destacados

  // al cargar la página, llenamos los destacados (luego vendrán de la API)
  useEffect(() => {
    setDestacados([
      { id: 1, nombre: "Alimento Premium", precio: "25.00", imagen: "/alimento.jpg" },
      { id: 2, nombre: "Juguete Interactivo", precio: "12.50", imagen: "/juguete.jpg" },
      { id: 3, nombre: "Cama Ortopédica", precio: "45.00", imagen: "/cama.jpg" },
    ]);
  }, []);

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
        {/* Barra de búsqueda (visual por ahora) */}
        <div className="input-group my-4">
          <input type="text" className="form-control" placeholder="Buscar productos o servicios..." />
          <button className="btn btn-primary">Buscar</button>
        </div>

        {/* Sección de productos destacados */}
        <h3 className="fw-bold">Productos Destacados</h3>
        <div className="row mt-3">
          {destacados.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.id}>
              <ProductCard
                id={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inicio;