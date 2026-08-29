import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PanelMenu from '../components/PanelMenu';

// Página que muestra las publicaciones del usuario
function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  // función que trae las publicaciones del backend
  const cargarPublicaciones = () => {
    fetch('http://localhost:3000/api/publicaciones')
      .then((res) => res.json())
      .then((data) => setPublicaciones(data))
      .catch((error) => console.error('Error al cargar publicaciones:', error));
  };

  // al cargar la página, traemos las publicaciones
  useEffect(() => {
    cargarPublicaciones();
  }, []);

  // función para eliminar una publicación
  const eliminarPublicacion = async (id) => {
    // pedimos confirmación antes de borrar
    if (!window.confirm('¿Seguro que quieres eliminar esta publicación?')) return;

    try {
      const token = localStorage.getItem('token'); // el token guardado al hacer login

      const respuesta = await fetch(`http://localhost:3000/api/publicaciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // ruta protegida: necesita token
        },
      });

      if (respuesta.ok) {
        alert('Publicación eliminada');
        cargarPublicaciones(); // recargamos la lista para que desaparezca
      } else {
        alert('No se pudo eliminar');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        <div className="col-md-2">
          <PanelMenu />
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">Mis Publicaciones</h1>
            <Link to="/nueva-publicacion" className="btn btn-success">+ Nueva Publicación</Link>
          </div>

          {publicaciones.map((pub) => (
            <div className="card mb-3 mt-3" key={pub.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{pub.titulo}</h5>
                  <p className="text-success fw-bold mb-0">${pub.precio}</p>
                  <p className="text-muted mb-0">Stock: {pub.stock}</p>
                </div>
                <div>
                  <span className="badge bg-secondary me-3">{pub.estado}</span>
                  <Link to={`/editar-publicacion/${pub.id}`} className="btn btn-outline-primary btn-sm me-2">Editar</Link>
                  {/* botón eliminar: llama a la función con el id de esta publicación */}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarPublicacion(pub.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MisPublicaciones;