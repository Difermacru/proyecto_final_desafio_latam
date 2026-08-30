import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PanelMenu from '../components/PanelMenu';
import { API_URL } from '../config';

// Página para editar una publicación existente
function EditarPublicacion() {
  const { id } = useParams(); // id de la publicación a editar (viene de la URL)
  const navigate = useNavigate();

  // estados para los campos
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [estado, setEstado] = useState('');
  const [mensaje, setMensaje] = useState('');

  // al cargar, traemos los datos actuales de la publicación
  useEffect(() => {
    fetch(`${API_URL}/api/publicaciones/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // llenamos los campos con los datos actuales
        setTitulo(data.titulo);
        setPrecio(data.precio);
        setStock(data.stock);
        setEstado(data.estado);
      })
      .catch((error) => console.error('Error al cargar la publicación:', error));
  }, [id]);

  // función para guardar los cambios
  const guardarCambios = async () => {
    try {
      const token = localStorage.getItem('token');

      const respuesta = await fetch(`${API_URL}/api/publicaciones/${id}`, {
        method: 'PUT', // PUT es para actualizar
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ruta protegida
        },
        body: JSON.stringify({ titulo, precio, stock, estado }),
      });

      if (respuesta.ok) {
        alert('Publicación actualizada');
        navigate('/mis-publicaciones'); // volvemos a la lista
      } else {
        setMensaje('No se pudo actualizar');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        <div className="col-md-2">
          <PanelMenu />
        </div>

        <div className="col-md-10">
          <h1 className="fw-bold">Editar Publicación</h1>

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

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado}
              onChange={(e) => setEstado(e.target.value)}>
              <option value="Activa">Activa</option>
              <option value="Pausada">Pausada</option>
              <option value="Vendida">Vendida</option>
            </select>
          </div>

          <button className="btn btn-success" onClick={guardarCambios}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
}

export default EditarPublicacion;