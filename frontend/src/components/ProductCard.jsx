import { useContext } from "react"; // hook para el contexto
import { Link } from "react-router-dom"; // para navegar al detalle
import { CarritoContext } from "../context/CarritoContext"; // contexto del carrito

// Tarjeta reutilizable: ahora recibe también 'id' e 'imagen'
function ProductCard({ id, nombre, precio, imagen }) {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="card">
      {/* imagen del producto arriba de la tarjeta */}
      <img
        src={imagen} // ruta de la imagen (ej: /alimento.jpg)
        className="card-img-top" // clase de Bootstrap: imagen arriba
        alt={nombre} // texto alternativo (accesibilidad)
      />
      <div className="card-body text-center">
        <h5 className="card-title">{nombre}</h5>
        <p className="text-success fw-bold">${precio}</p>

        {/* botón que lleva al detalle de ESTE producto usando su id */}
        <Link className="btn btn-primary me-2" to={`/producto/${id}`}>
          Ver Detalle
        </Link>

        {/* botón que agrega al carrito */}
        <button
          className="btn btn-outline-primary"
          onClick={() => agregarAlCarrito(id)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
