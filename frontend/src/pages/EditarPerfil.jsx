import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelMenu from '../components/PanelMenu';
import { UsuarioContext } from '../context/UsuarioContext';
import { API_URL } from '../config';

function EditarPerfil() {
  const { usuario, login } = useContext(UsuarioContext);
  const navigate = useNavigate();

  // ---- datos del perfil ----
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  // ---- mascotas ----
  const [mascotas, setMascotas] = useState([]);
  const [mascotaEditando, setMascotaEditando] = useState(null); // id de la mascota que se está editando
  const [nombreMascota, setNombreMascota] = useState('');
  const [especieMascota, setEspecieMascota] = useState('');
  const [razaMascota, setRazaMascota] = useState('');

  // ---- nueva mascota ----
  const [agregandoMascota, setAgregandoMascota] = useState(false);
  const [nuevaNombre, setNuevaNombre] = useState('');
  const [nuevaEspecie, setNuevaEspecie] = useState('');
  const [nuevaRaza, setNuevaRaza] = useState('');

  const token = localStorage.getItem('token');

  // cargamos los datos actuales del usuario y sus mascotas
  useEffect(() => {
    if (!usuario) return;

    fetch(`${API_URL}/api/usuarios/${usuario.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre || '');
        setApellido(data.apellido || '');
        setEmail(data.email || '');
        setTelefono(data.telefono || '');
        setDireccion(data.direccion || '');
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar el perfil:', err);
        setCargando(false);
      });

    cargarMascotas();
  }, [usuario]);

  const cargarMascotas = () => {
    fetch(`${API_URL}/api/mascotas/usuario/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => setMascotas(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error al cargar mascotas:', err));
  };

  // ===== guardar cambios del perfil =====
  const handleGuardar = async (e) => {
    e.preventDefault();
    setError('');
    setGuardando(true);
    try {
      const res = await fetch(`${API_URL}/api/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, apellido, email, telefono, direccion }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'No se pudo guardar el perfil.');
        return;
      }

      // actualizamos el contexto y localStorage con los datos nuevos
      login({ ...usuario, ...data.usuario });
      navigate('/perfil');
    } catch (err) {
      console.error('Error al guardar el perfil:', err);
      setError('Ocurrió un error al guardar.');
    } finally {
      setGuardando(false);
    }
  };

  // ===== editar una mascota existente =====
  const handleAbrirEdicionMascota = (mascota) => {
    setMascotaEditando(mascota.id);
    setNombreMascota(mascota.nombre);
    setEspecieMascota(mascota.especie);
    setRazaMascota(mascota.raza || '');
  };

  const handleGuardarMascota = async (id) => {
    try {
      await fetch(`${API_URL}/api/mascotas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nombreMascota, especie: especieMascota, raza: razaMascota }),
      });
      setMascotaEditando(null);
      cargarMascotas();
    } catch (err) {
      console.error('Error al actualizar mascota:', err);
    }
  };

  // ===== agregar una mascota nueva =====
  const handleAgregarMascota = async (e) => {
    e.preventDefault();
    if (!nuevaNombre || !nuevaEspecie) return;
    try {
      await fetch(`${API_URL}/api/mascotas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nuevaNombre, especie: nuevaEspecie, raza: nuevaRaza }),
      });
      setNuevaNombre('');
      setNuevaEspecie('');
      setNuevaRaza('');
      setAgregandoMascota(false);
      cargarMascotas();
    } catch (err) {
      console.error('Error al agregar mascota:', err);
    }
  };

  if (cargando) {
    return <div className="container mt-4"><h2>Cargando...</h2></div>;
  }

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        <div className="col-md-2">
          <PanelMenu />
        </div>

        <div className="col-md-10">
          <div className="row">
            {/* ===== Columna izquierda: formulario de perfil ===== */}
            <div className="col-md-7 border-end">
              <h2 className="fw-bold mb-4">Editar Perfil</h2>

              <form onSubmit={handleGuardar}>
                {/* avatar (solo visual por ahora, no sube archivos reales) */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: '70px', height: '70px' }}
                  >
                    
                  </div>
                  <div>
                    <input type="file" className="form-control form-control-sm" accept="image/jpeg,image/png" disabled />
                    <small className="text-muted">JPG o PNG, máx 2MB</small>
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                  </div>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="d-flex gap-2">
                  <button className="btn btn-success" type="submit" disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  <button className="btn btn-outline-primary" type="button" onClick={() => navigate('/perfil')}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            {/* ===== Columna derecha: Mis Mascotas ===== */}
            <div className="col-md-5">
              <h4 className="fw-bold mb-3">Mis Mascotas</h4>

              {mascotas.map((m) => (
                <div className="card mb-2 p-2" key={m.id}>
                  {mascotaEditando === m.id ? (
                    <div className="d-flex flex-column gap-2">
                      <input className="form-control form-control-sm" placeholder="Nombre"
                        value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)} />
                      <input className="form-control form-control-sm" placeholder="Especie"
                        value={especieMascota} onChange={(e) => setEspecieMascota(e.target.value)} />
                      <input className="form-control form-control-sm" placeholder="Raza (opcional)"
                        value={razaMascota} onChange={(e) => setRazaMascota(e.target.value)} />
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-success" onClick={() => handleGuardarMascota(m.id)}>Guardar</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setMascotaEditando(null)}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>🐾 {m.nombre}</strong>
                        <p className="text-muted mb-0 small">{m.especie}{m.raza ? ` · ${m.raza}` : ''}</p>
                      </div>
                      <button className="btn btn-sm btn-link" onClick={() => handleAbrirEdicionMascota(m)}>✏️</button>
                    </div>
                  )}
                </div>
              ))}

              {/* ===== agregar mascota nueva ===== */}
              {agregandoMascota ? (
                <form onSubmit={handleAgregarMascota} className="card p-2 mt-2">
                  <input className="form-control form-control-sm mb-2" placeholder="Nombre"
                    value={nuevaNombre} onChange={(e) => setNuevaNombre(e.target.value)} />
                  <input className="form-control form-control-sm mb-2" placeholder="Especie (ej: Perro)"
                    value={nuevaEspecie} onChange={(e) => setNuevaEspecie(e.target.value)} />
                  <input className="form-control form-control-sm mb-2" placeholder="Raza (opcional)"
                    value={nuevaRaza} onChange={(e) => setNuevaRaza(e.target.value)} />
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success" type="submit">Agregar</button>
                    <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => setAgregandoMascota(false)}>Cancelar</button>
                  </div>
                </form>
              ) : (
                <button className="btn btn-outline-primary w-100 mt-2" onClick={() => setAgregandoMascota(true)}>
                  + Agregar mascota
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarPerfil;