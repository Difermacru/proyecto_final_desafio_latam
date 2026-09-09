import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

// Página para crear una cuenta nueva
function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Validación simple de formato de correo
  const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Validación de contraseña segura
  const validarPassword = (clave) => {
    const tieneMinimo = clave.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(clave);
    const tieneMinuscula = /[a-z]/.test(clave);
    const tieneNumero = /[0-9]/.test(clave);
    const sinEspacios = !/\s/.test(clave);

    return (
      tieneMinimo &&
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      sinEspacios
    );
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      return;
    }

    if (!email.trim()) {
      setMensaje("El correo electrónico es obligatorio");
      return;
    }

    if (!validarEmail(email)) {
      setMensaje("Debes ingresar un correo electrónico válido");
      return;
    }

    if (!password) {
      setMensaje("La contraseña es obligatoria");
      return;
    }

    if (!validarPassword(password)) {
      setMensaje(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y no debe contener espacios",
      );
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.message || data.error || "Error al registrar");
        return;
      }

      alert("¡Cuenta creada! Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card p-4">
        <h2 className="fw-bold text-center">Crear Cuenta</h2>
        <p className="text-muted text-center">Únete a VetMarket en un minuto</p>

        {mensaje && <div className="alert alert-danger">{mensaje}</div>}

        <form onSubmit={manejarRegistro}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="text-muted">
              Debe tener una mayúscula, una minúscula y un número.
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Repite tu contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            Crear Cuenta
          </button>
        </form>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
