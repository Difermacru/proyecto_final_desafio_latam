import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelMenu from '../components/PanelMenu';

// Página para crear una nueva publicación
function NuevaPublicacion() {
  const navigate = useNavigate();

  // estados para los campos del formulario
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarSubmit = async () => {
    try {
      // recuperamos el token que guardamos al hacer login
      const token = localStorage.getItem('token');

      // enviamos la publicación al backend, incluyendo el token
      const respuesta = await fetch('http://localhost:3000/api/publicaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ← el token va aquí
        },
        body: JSON.stringify({
          usuario_id: 4, // temporal (luego se saca del token)
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

          <div className="mb-3">
            <label className="form-label">ID de Categoría</label>
            <input type="number" className="form-control" value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)} />
          </div>

          <button className="btn btn-success" onClick={manejarSubmit}>Guardar Publicación</button>
        </div>
      </div>
    </div>
  );
}

export default NuevaPublicacion;