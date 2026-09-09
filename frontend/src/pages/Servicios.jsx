import { useState, useEffect, useContext } from 'react'; // hooks
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard'; // tarjeta de servicios
import { UsuarioContext } from '../context/UsuarioContext';
import { API_URL } from '../config';

// Página que muestra el listado de servicios
function Servicios() {
  const [servicios, setServicios] = useState([]); // estado: lista de servicios
  const { usuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  // ---- reserva (modal) ----
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null); // servicio que se está reservando
  const [mascotas, setMascotas] = useState([]);
  const [mascotaId, setMascotaId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errorReserva, setErrorReserva] = useState('');

  // al cargar, llenamos los servicios (luego vendrán de la API) — con imagen
  useEffect(() => {
    fetch(`${API_URL}/api/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error('Error al cargar servicios:', error));
  }, []);

  // abre el formulario de reserva para un servicio en particular
  const handleAbrirReserva = (servicio) => {
    if (!usuario) {
      navigate('/login'); // sin sesión no se puede reservar
      return;
    }

    setErrorReserva('');
    setFecha('');
    setHora('');
    setMascotaId('');
    setServicioSeleccionado(servicio);

    // traemos las mascotas del usuario para el selector
    fetch(`${API_URL}/api/mascotas/usuario/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => setMascotas(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error al cargar mascotas:', error));
  };

  const handleCerrarModal = () => {
    setServicioSeleccionado(null);
  };

  // confirma la reserva y crea la cita en el backend
  const handleConfirmarReserva = async (e) => {
    e.preventDefault();
    setErrorReserva('');

    if (!fecha || !hora) {
      setErrorReserva('Debes elegir fecha y hora.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorReserva('Debes iniciar sesión para reservar.');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/api/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          servicio_id: servicioSeleccionado.id,
          mascota_id: mascotaId || null,
          fecha,
          hora,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorReserva(data.message || 'No se pudo reservar la cita.');
        return;
      }

      // reserva creada: mandamos al usuario a Mis Citas para que la vea
      navigate('/mis-citas');
    } catch (error) {
      console.error('Error al reservar:', error);
      setErrorReserva('Ocurrió un error al reservar.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Listado de Servicios</h1>
      <div className="row mt-3">
        {/* recorre los servicios y crea una tarjeta por cada uno */}
        {servicios.map((servicio) => (
          <div className="col-md-3 mb-3" key={servicio.id}>
            {/* pasamos la imagen como prop */}
            <ServiceCard
              nombre={servicio.nombre}
              precio={servicio.precio_base}
              imagen={servicio.imagen || "/bano.jpg"}
              onReservar={() => handleAbrirReserva(servicio)}
            />
          </div>
        ))}
      </div>

      {/* ===== Modal simple de reserva (sin depender de JS de Bootstrap) ===== */}
      {servicioSeleccionado && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050,
          }}
          onClick={handleCerrarModal}
        >
          <div
            className="bg-white rounded p-4"
            style={{ width: '400px', maxWidth: '90%' }}
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click adentro
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Reservar: {servicioSeleccionado.nombre}</h5>
              <button className="btn-close" onClick={handleCerrarModal}></button>
            </div>

            <form onSubmit={handleConfirmarReserva}>
              <div className="mb-3">
                <label className="form-label">Mascota</label>
                <select
                  className="form-select"
                  value={mascotaId}
                  onChange={(e) => setMascotaId(e.target.value)}
                >
                  <option value="">Sin especificar</option>
                  {mascotas.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
                {mascotas.length === 0 && (
                  <small className="text-muted">No tienes mascotas registradas todavía.</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  className="form-control"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>

              {errorReserva && <p className="text-danger">{errorReserva}</p>}

              <div className="d-flex gap-2">
                <button className="btn btn-primary" type="submit" disabled={enviando}>
                  {enviando ? 'Reservando...' : 'Confirmar reserva'}
                </button>
                <button className="btn btn-outline-secondary" type="button" onClick={handleCerrarModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Servicios;