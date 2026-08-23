import { useParams } from 'react-router-dom'; // useParams lee el ID de la URL
import { useContext } from 'react'; // hook para el contexto
import { CarritoContext } from '../context/CarritoContext'; // contexto del carrito

// Lista de productos (temporal, luego vendrá de tu API)
const productos = [
  { id: 1, nombre: "Alimento Premium", precio: "25.99", descripcion: "Alimento balanceado para perros de todas las edades." },
  { id: 2, nombre: "Juguete para Perros", precio: "8.75", descripcion: "Juguete resistente e interactivo para tu mascota." },
  { id: 3, nombre: "Cama Ortopédica", precio: "45.00", descripcion: "Cama cómoda con soporte ortopédico." },
  { id: 4, nombre: "Correa Retráctil", precio: "12.99", descripcion: "Correa extensible de 5 metros." },
];

// Página que muestra el detalle de UN producto
function DetalleProducto() {
  const { id } = useParams(); // lee el ':id' de la URL (ej: /producto/2 → id = "2")
  const { agregarAlCarrito } = useContext(CarritoContext); // función del carrito

  // busca el producto cuyo id coincide con el de la URL
  const producto = productos.find((p) => p.id === Number(id));

  // si no existe ese producto, avisa
  if (!producto) {
    return <div className="container mt-4"><h2>Producto no encontrado</h2></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna izquierda: imagen (placeholder por ahora) */}
        <div className="col-md-6">
          <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
            <span className="text-muted">Imagen del producto</span>
          </div>
        </div>

        {/* Columna derecha: info del producto */}
        <div className="col-md-6">
          <h1 className="fw-bold">{producto.nombre}</h1>
          <p className="text-success fs-3 fw-bold">${producto.precio}</p>
          <p>{producto.descripcion}</p>
          {/* al hacer clic, agrega este producto al carrito */}
          <button className="btn btn-primary" onClick={() => agregarAlCarrito(producto)}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;