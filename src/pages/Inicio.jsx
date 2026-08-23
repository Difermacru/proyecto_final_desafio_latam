import { useState, useEffect } from 'react'; // hooks
import ProductCard from '../components/ProductCard'; // tarjeta reutilizable

// Página principal del sitio
function Inicio() {
  const [destacados, setDestacados] = useState([]); // estado: productos destacados

  // al cargar la página, llenamos los destacados (luego vendrán de la API)
  useEffect(() => {
    setDestacados([
      { id: 1, nombre: "Alimento Premium", precio: "25.00" },
      { id: 2, nombre: "Juguete Interactivo", precio: "12.50" },
      { id: 3, nombre: "Cama Ortopédica", precio: "45.00" },
    ]);
  }, []);

  return (
    <div className="container mt-4">
      {/* Encabezado principal (hero) */}
      <h1 className="fw-bold">Todo para tu mascota, en un solo lugar</h1>
      <p className="text-muted">Compra productos y reserva servicios de baño, peluquería y más.</p>

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
            <ProductCard id={producto.id} nombre={producto.nombre} precio={producto.precio} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;