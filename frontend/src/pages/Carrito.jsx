import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

// Página del carrito de compras
function Carrito() {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // calculamos el total sumando precio × cantidad de cada item
  const total = carrito.reduce((suma, item) => {
    return suma + Number(item.precio) * item.cantidad;
  }, 0);

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Mi Carrito</h1>

      {/* si el carrito está vacío */}
      {carrito.length === 0 ? (
        <p className="text-muted">Tu carrito está vacío.</p>
      ) : (
        <>
          {/* recorremos los items del carrito */}
          {carrito.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {/* imagen del producto */}
                  <img
                    src={item.imagen || "/alimento.jpg"}
                    alt={item.titulo}
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">{item.titulo}</h5>
                    <p className="text-muted mb-0">Cantidad: {item.cantidad}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-success fw-bold mb-2">${item.precio}</p>
                  {/* botón para eliminar el item del carrito */}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* total del carrito */}
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Total:</h4>
              <h4 className="text-success mb-0">${total.toFixed(2)}</h4>
            </div>
          </div>

          <button className="btn btn-success w-100 mt-3" onClick={() => navigate('/pago')}>
            Proceder al Pago
          </button>
        </>
      )}
    </div>
  );
}

export default Carrito;