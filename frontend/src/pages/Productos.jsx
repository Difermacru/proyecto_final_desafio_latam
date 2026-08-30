import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../config';

// Página que muestra el listado de productos
function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // pedimos las publicaciones al backend
    fetch(`${API_URL}/api/publicaciones`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Listado de Productos</h1>
      <div className="row mt-3">
        {productos.map((producto) => (
          <div className="col-md-4 mb-3" key={producto.id}>
            {/* OJO: el backend devuelve 'titulo', no 'nombre' */}
            <ProductCard
              id={producto.id}
              nombre={producto.titulo}
              precio={producto.precio}
              imagen={producto.imagen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;