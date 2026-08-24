import { useState, useEffect } from 'react'; // los hooks de React
import ProductCard from '../components/ProductCard';

// Página que muestra el listado de productos
function Productos() {
  // useState: 'productos' guarda la lista, 'setProductos' la actualiza. Empieza vacía []
  const [productos, setProductos] = useState([]);

  // useEffect: se ejecuta una vez cuando la página carga
  useEffect(() => {
    // Datos temporales 
    const datos = [
      { id: 1, nombre: "Alimento Premium", precio: "25.99", imagen: "/alimento.jpg" },
      { id: 2, nombre: "Juguete para Perros", precio: "8.75", imagen: "/juguete.jpg" },
      { id: 3, nombre: "Cama Ortopédica", precio: "45.00", imagen: "/cama.jpg" },
      { id: 4, nombre: "Correa Retráctil", precio: "12.99", imagen: "/correa.jpg" },
    ];
    setProductos(datos); // guarda los datos en el estado
  }, []); // el [] vacío significa "ejecuta solo una vez al cargar"

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Listado de Productos</h1>
      <div className="row mt-3">
        {/* recorre el estado 'productos' y crea una tarjeta por cada uno */}
        {productos.map((producto) => (
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
  );
}

export default Productos;