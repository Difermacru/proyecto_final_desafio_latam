import { useState, useEffect } from 'react'; // hooks
import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable

// Página que muestra los pedidos del usuario
function MisPedidos() {
  const [pedidos, setPedidos] = useState([]); // estado: lista de pedidos

  // al cargar, llenamos los pedidos (luego vendrán de la API)
  useEffect(() => {
    setPedidos([
      { id: "#001", fecha: "2023-10-26", articulos: "2 artículos", total: "57.50", estado: "Entregado" },
      { id: "#002", fecha: "2023-09-15", articulos: "2 artículos", total: "85.00", estado: "En camino" },
      { id: "#003", fecha: "2023-08-01", articulos: "1 artículo", total: "30.00", estado: "Entregado" },
      { id: "#004", fecha: "2023-07-12", articulos: "3 artículos", total: "124.00", estado: "Cancelado" },
    ]);
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
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* recorre los pedidos y crea una fila por cada uno */}
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="fw-bold">{pedido.id}</td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.articulos}</td>
                  <td>${pedido.total}</td>
                  <td>{pedido.estado}</td>
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