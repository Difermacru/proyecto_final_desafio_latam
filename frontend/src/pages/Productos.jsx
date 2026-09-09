import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../config';

// Página que muestra el listado de productos con filtros laterales
function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // ---- estados de los filtros ----
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('');
  const [stockMin, setStockMin] = useState('');

  useEffect(() => {
    // pedimos las publicaciones al backend
    fetch(`${API_URL}/api/publicaciones`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar productos:', error));

    // pedimos las categorías para llenar el filtro
    fetch(`${API_URL}/api/categorias`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al cargar categorías:', error));
  }, []);

  // aplicamos todos los filtros activos sobre la lista de productos
  const productosFiltrados = productos.filter((p) => {
    if (filtroCategoria && String(p.categoria_id) !== String(filtroCategoria)) return false;
    if (precioMin && Number(p.precio) < Number(precioMin)) return false;
    if (precioMax && Number(p.precio) > Number(precioMax)) return false;
    if (filtroDisponibilidad && p.estado !== filtroDisponibilidad) return false;
    if (stockMin && Number(p.stock) < Number(stockMin)) return false;
    return true;
  });

  const limpiarFiltros = () => {
    setFiltroCategoria('');
    setPrecioMin('');
    setPrecioMax('');
    setFiltroDisponibilidad('');
    setStockMin('');
  };

  return (
    <div className="container-fluid px-4 mt-4">
      <h1 className="fw-bold">Listado de Productos</h1>

      <div className="row mt-3">
        {/* ===== Barra lateral de filtros ===== */}
        <div className="col-lg-2 col-md-3 mb-4">
          <div className="card p-3">
            <h5 className="fw-bold">Filtros</h5>

            {/* Categoría */}
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            {/* Precio mínimo y máximo */}
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mín"
                  min="0"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Máx"
                  min="0"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                />
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="mb-3">
              <label className="form-label">Disponibilidad</label>
              <select
                className="form-select"
                value={filtroDisponibilidad}
                onChange={(e) => setFiltroDisponibilidad(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Activa">Disponible</option>
                <option value="Inactiva">No disponible</option>
              </select>
            </div>

            {/* Stock mínimo */}
            <div className="mb-3">
              <label className="form-label">Stock mínimo</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 1"
                min="0"
                value={stockMin}
                onChange={(e) => setStockMin(e.target.value)}
              />
            </div>

            <button className="btn btn-outline-secondary btn-sm" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* ===== Listado de productos ===== */}
        <div className="col-lg-10 col-md-9">
          <p className="text-muted">{productosFiltrados.length} producto(s) encontrado(s)</p>

          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos con estos filtros.</p>
          ) : (
            <div className="row">
              {productosFiltrados.map((producto) => (
                <div className="col-xl-3 col-lg-4 col-md-6 mb-3" key={producto.id}>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Productos;