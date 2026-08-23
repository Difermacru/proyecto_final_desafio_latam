import { useContext } from 'react'; // hook para leer el contexto
import { CarritoContext } from '../context/CarritoContext'; // el contexto del carrito

// Página que muestra los productos agregados al carrito
function Carrito() {
  const { carrito } = useContext(CarritoContext); // leemos el carrito global

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Tu Carrito</h1>
      <p>{carrito.length} artículos</p>

      {/* recorre el carrito y muestra cada producto */}
      {carrito.map((producto, index) => (
        <div className="card mb-2" key={index}>
          <div className="card-body d-flex justify-content-between">
            <span>{producto.nombre}</span>
            <span className="fw-bold">${producto.precio}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carrito;