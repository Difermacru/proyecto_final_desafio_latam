import { useParams } from 'react-router-dom'; // lee el id de la URL
import { useState, useEffect, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { UsuarioContext } from '../context/UsuarioContext';
import { API_URL } from '../config';

// Página que muestra el detalle de UN producto
function DetalleProducto() {
  const { id } = useParams(); // el id que viene en la URL
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { usuario } = useContext(UsuarioContext); // para saber si hay alguien logeado

  const [producto, setProducto] = useState(null); // guardará el producto
  const [cargando, setCargando] = useState(true); // para mostrar "cargando"

  // ---- reseñas ----
  const [resenas, setResenas] = useState([]);
  const [calificacion, setCalificacion] = useState(5); // valor por defecto del formulario
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errorResena, setErrorResena] = useState('');

  useEffect(() => {
    // pedimos al backend el producto por su id
    fetch(`${API_URL}/api/publicaciones/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al cargar el producto:', error);
        setCargando(false);
      });

    cargarResenas();
  }, [id]); // se ejecuta cada vez que cambia el id

  // trae las reseñas del producto desde el backend
  const cargarResenas = () => {
    fetch(`${API_URL}/api/resenas/publicacion/${id}`)
      .then((res) => res.json())
      .then((data) => setResenas(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error al cargar reseñas:', error));
  };

  // promedio de calificaciones (null si todavía no hay ninguna)
  const promedio = resenas.length
    ? (resenas.reduce((suma, r) => suma + r.calificacion, 0) / resenas.length).toFixed(1)
    : null;

  // dibuja estrellas llenas/vacías para un puntaje del 1 al 5
  const renderEstrellas = (puntaje) => {
    return '★★★★★☆☆☆☆☆'.slice(5 - puntaje, 10 - puntaje);
  };

  // envía la nueva reseña al backend
  const handleSubmitResena = async (e) => {
    e.preventDefault();
    setErrorResena('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorResena('Debes iniciar sesión para dejar una reseña.');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/api/resenas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          publicacion_id: id,
          calificacion: Number(calificacion),
          comentario: comentario.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorResena(data.message || 'No se pudo enviar la reseña.');
        return;
      }

      setComentario(''); // limpiamos el formulario
      setCalificacion(5);
      cargarResenas(); // refrescamos la lista con la nueva reseña
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      setErrorResena('Ocurrió un error al enviar la reseña.');
    } finally {
      setEnviando(false);
    }
  };

  // mientras carga
  if (cargando) {
    return <div className="container mt-4"><h2>Cargando...</h2></div>;
  }

  // si no encontró el producto
  if (!producto || producto.message) {
    return <div className="container mt-4"><h2>Producto no encontrado</h2></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna izquierda: imagen */}
        <div className="col-md-6">
          <div className="detalle-img-wrapper">
            <img
              src={producto.imagen || "/alimento.jpg"}
              className="detalle-img"
              alt={producto.titulo}
            />
          </div>
        </div>

        {/* Columna derecha: info */}
        <div className="col-md-6">
          <h1 className="fw-bold">{producto.titulo}</h1>

          {/* Calificación promedio */}
          <div className="mb-2">
            {promedio ? (
              <span>
                <span className="text-warning">{renderEstrellas(Math.round(promedio))}</span>
                {' '}
                <span className="text-muted">{promedio} ({resenas.length} reseña{resenas.length !== 1 ? 's' : ''})</span>
              </span>
            ) : (
              <span className="text-muted">Todavía no tiene reseñas</span>
            )}
          </div>

          <p className="text-success fs-3 fw-bold">${producto.precio}</p>
          <p>Stock disponible: {producto.stock}</p>
          <button className="btn btn-primary" onClick={() => agregarAlCarrito(producto.id)}>
            Añadir al Carrito
          </button>
        </div>
      </div>

      {/* ===== Sección de reseñas ===== */}
      <div className="row mt-5">
        <div className="col-md-8">
          <h3 className="fw-bold">Reseñas</h3>

          {resenas.length === 0 ? (
            <p className="text-muted">Sé el primero en dejar una reseña de este producto.</p>
          ) : (
            <ul className="list-unstyled">
              {resenas.map((r) => (
                <li key={r.id} className="border-bottom py-3">
                  <div className="d-flex justify-content-between">
                    <strong>{r.usuario_nombre}</strong>
                    <span className="text-warning">{renderEstrellas(r.calificacion)}</span>
                  </div>
                  {r.comentario && <p className="mb-0 mt-1">{r.comentario}</p>}
                </li>
              ))}
            </ul>
          )}

          {/* ===== Formulario para dejar una reseña ===== */}
          <div className="mt-4">
            <h5 className="fw-bold">Deja tu reseña</h5>

            {!usuario ? (
              <p className="text-muted">Inicia sesión para poder calificar este producto.</p>
            ) : (
              <form onSubmit={handleSubmitResena}>
                <div className="mb-3">
                  <label className="form-label">Calificación</label>
                  <select
                    className="form-select"
                    style={{ maxWidth: '200px' }}
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                  >
                    <option value="5">★★★★★ (5)</option>
                    <option value="4">★★★★☆ (4)</option>
                    <option value="3">★★★☆☆ (3)</option>
                    <option value="2">★★☆☆☆ (2)</option>
                    <option value="1">★☆☆☆☆ (1)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Reseña</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Cuéntanos qué te pareció el producto..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                </div>

                {errorResena && <p className="text-danger">{errorResena}</p>}

                <button className="btn btn-primary" type="submit" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Publicar reseña'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;