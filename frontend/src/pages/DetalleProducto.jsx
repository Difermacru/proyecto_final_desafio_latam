import { useParams } from 'react-router-dom'; // lee el id de la URL
import { useState, useEffect, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

// Página que muestra el detalle de UN producto
function DetalleProducto() {
  const { id } = useParams(); // el id que viene en la URL
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null); // guardará el producto
  const [cargando, setCargando] = useState(true); // para mostrar "cargando"

  useEffect(() => {
    // pedimos al backend el producto por su id
    fetch(`http://localhost:3000/api/publicaciones/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al cargar el producto:', error);
        setCargando(false);
      });
  }, [id]); // se ejecuta cada vez que cambia el id

  // mientras carga
  if (cargando) {
    return <div className="container mt-4"><h2>Cargando...</h2></div>;
  }

  // si no encontró el producto
  if (!producto || producto.message) {
    return <div className="container mt-4"><h2>Producto no encontrado</h2></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna izquierda: imagen */}
        <div className="col-md-6">
          <div className="detalle-img-wrapper">
            <img
              src={producto.imagen || "/alimento.jpg"}
              className="detalle-img"
              alt={producto.titulo}
            />
          </div>
        </div>

        {/* Columna derecha: info */}
        <div className="col-md-6">
          <h1 className="fw-bold">{producto.titulo}</h1>
          <p className="text-success fs-3 fw-bold">${producto.precio}</p>
          <p>Stock disponible: {producto.stock}</p>
          <button
            className="btn btn-primary"
            onClick={() => agregarAlCarrito({ nombre: producto.titulo, precio: producto.precio })}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;