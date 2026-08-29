import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../context/UsuarioContext';
import PanelMenu from '../components/PanelMenu';

// Página para crear una nueva publicación
function NuevaPublicacion() {
  const navigate = useNavigate();
  const { usuario } = useContext(UsuarioContext); // el usuario logueado

  // estados para los campos del formulario
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]); // lista de categorías del backend
  const [mensaje, setMensaje] = useState('');

  // al cargar la página, traemos las categorías para el desplegable
  useEffect(() => {
    fetch('http://localhost:3000/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al cargar categorías:', error));
  }, []);

  const manejarSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      const respuesta = await fetch('http://localhost:3000/api/publicaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: usuario.id,
          categoria_id: categoriaId,
          titulo,
          precio,
          stock,
          estado: 'Activa',
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.message || 'Error al crear la publicación');
        return;
      }

      alert('¡Publicación creada!');
      navigate('/mis-publicaciones');
    } catch (err) {
      console.error(err);
      setMensaje('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        <div className="col-md-2">
          <PanelMenu />
        </div>
        <div className="col-md-10">
          <h1 className="fw-bold">Nueva Publicación</h1>

          {mensaje && <div className="alert alert-danger">{mensaje}</div>}

          <div className="mb-3">
            <label className="form-label">Título</label>
            <input type="text" className="form-control" value={titulo}
              onChange={(e) => setTitulo(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input type="number" className="form-control" value={precio}
              onChange={(e) => setPrecio(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" value={stock}
              onChange={(e) => setStock(e.target.value)} />
          </div>

          {/* menú desplegable de categorías */}
          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select className="form-select" value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}>
              {/* opción por defecto vacía */}
              <option value="">Selecciona una categoría</option>
              {/* recorremos las categorías y creamos una opción por cada una */}
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-success" onClick={manejarSubmit}>Guardar Publicación</button>
        </div>
      </div>
    </div>
  );
}

export default NuevaPublicacion;