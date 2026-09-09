import { useState, useEffect } from 'react'; // hooks
import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable
import { API_URL } from '../config';

// Página que muestra los pedidos del usuario
function MisPedidos() {
  const [pedidos, setPedidos] = useState([]); // estado: lista de pedidos

  // al cargar, llenamos los pedidos (luego vendrán de la API)
  useEffect(() => {
    fetch(`${API_URL}/api/pedidos`)
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error('Error al cargar pedidos:', error));
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: tabla de pedidos */}
        <div className="col-md-10">
          <h1 className="fw-bold">Mis Pedidos</h1>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Artículos</th>
              </tr>
            </thead>
            <tbody>
              {/* recorre los pedidos y crea una fila por cada uno */}
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="fw-bold">#{pedido.id}</td>
                  <td>{pedido.estado}</td>
                  <td>${pedido.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MisPedidos;