import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { API_URL } from '../config';

// Página de pago (checkout): datos de envío + método de pago + resumen del pedido
function Pago() {
  const { carrito, refrescarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // ---- datos de envío (solo para mostrar en el resumen, el backend no los guarda todavía) ----
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  // ---- método de pago ----
  const [metodoPago, setMetodoPago] = useState('Tarjeta'); // 'Tarjeta' | 'Transferencia'
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [titular, setTitular] = useState('');

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null); // guarda el pedido creado

  // ---- cálculo del resumen ----
  const subtotal = carrito.reduce((suma, item) => suma + Number(item.precio) * item.cantidad, 0);
  const envio = carrito.length > 0 ? 5 : 0;
  const impuestos = subtotal * 0.1;
  const total = subtotal + envio + impuestos;

  const handlePagar = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para pagar.');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ metodo_pago: metodoPago }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'No se pudo procesar el pago.');
        return;
      }

      setPedidoConfirmado(data.pedido);
      refrescarCarrito(); // el carrito ya quedó vacío en el backend
    } catch (err) {
      console.error('Error al pagar:', err);
      setError('Ocurrió un error al procesar el pago.');
    } finally {
      setEnviando(false);
    }
  };

  // ===== Paso 4: Confirmación =====
  if (pedidoConfirmado) {
    return (
      <div className="container mt-5" style={{ maxWidth: '550px' }}>
        <div className="text-center p-5 rounded" style={{ backgroundColor: '#e9f9ee' }}>
          {/* círculo verde con el check */}
          <div
            className="rounded-circle bg-success d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '70px', height: '70px' }}
          >
            <span className="text-white fs-2">✓</span>
          </div>

          <h2 className="fw-bold">¡Pago Confirmado!</h2>
          <p className="text-muted">Tu transacción se realizó con éxito.</p>

          <div className="bg-white rounded p-3 my-4 mx-auto" style={{ maxWidth: '320px' }}>
            <p className="text-muted small mb-1">N° de Pedido / Reserva</p>
            <p className="fw-bold fs-5 mb-0">#{pedidoConfirmado.id}</p>
          </div>

          <p className="text-muted">Recibirás un correo con los detalles de tu compra.</p>

          <div className="d-flex justify-content-center gap-2 mt-4">
            <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
              Volver al Inicio
            </button>
            <button className="btn btn-success" onClick={() => navigate('/mis-pedidos')}>
              Ver Mis Pedidos
            </button>
          </div>
        </div>
      </div>
    );
  }

  // si no hay nada que pagar (carrito vacío y no viene de un pago recién hecho)
  if (carrito.length === 0) {
    return (
      <div className="container mt-4">
        <h2>No tienes productos en el carrito para pagar.</h2>
        <button className="btn btn-primary mt-2" onClick={() => navigate('/productos')}>
          Ir a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* ===== Indicador de pasos ===== */}
      <div className="d-flex justify-content-center align-items-center mb-5 gap-2">
        {[
          { n: 1, label: 'Carrito' },
          { n: 2, label: 'Envío' },
          { n: 3, label: 'Pago' },
          { n: 4, label: 'Confirmación' },
        ].map((paso, i, arr) => (
          <div key={paso.n} className="d-flex align-items-center">
            <div className="text-center">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center fw-bold text-white ${paso.n <= 3 ? 'bg-primary' : 'bg-secondary'}`}
                style={{ width: '36px', height: '36px' }}
              >
                {paso.n}
              </div>
              <div className={paso.n <= 3 ? 'text-primary small mt-1' : 'text-muted small mt-1'}>
                {paso.label}
              </div>
            </div>
            {i < arr.length - 1 && (
              <div
                className={paso.n < 3 ? 'bg-primary' : 'bg-secondary'}
                style={{ height: '3px', width: '80px', marginBottom: '20px' }}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handlePagar}>
        <div className="row">
          {/* ===== Columna izquierda: datos de envío + pago ===== */}
          <div className="col-md-7">
            <h4 className="fw-bold">Datos de Envío</h4>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control" placeholder="Nombre completo"
                  value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input className="form-control" placeholder="+56 9 ..."
                  value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label">Dirección</label>
                <input className="form-control" placeholder="Calle, número, comuna"
                  value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Ciudad</label>
                <input className="form-control" placeholder="Ciudad"
                  value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">C. Postal</label>
                <input className="form-control" placeholder="Código postal"
                  value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
              </div>
            </div>

            <h4 className="fw-bold">Método de Pago</h4>
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                className={`btn flex-fill ${metodoPago === 'Tarjeta' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setMetodoPago('Tarjeta')}
              >
                 Tarjeta
              </button>
              <button
                type="button"
                className={`btn flex-fill ${metodoPago === 'Transferencia' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setMetodoPago('Transferencia')}
              >
                 Transferencia
              </button>
            </div>

            {metodoPago === 'Tarjeta' ? (
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Número de tarjeta</label>
                  <input className="form-control" placeholder="0000 0000 0000 0000"
                    value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Vencimiento</label>
                  <input className="form-control" placeholder="MM/AA"
                    value={vencimiento} onChange={(e) => setVencimiento(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">CVV</label>
                  <input className="form-control" placeholder="CVV"
                    value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Titular</label>
                  <input className="form-control" placeholder="Nombre en tarjeta"
                    value={titular} onChange={(e) => setTitular(e.target.value)} />
                </div>
              </div>
            ) : (
              <p className="text-muted">Te enviaremos los datos bancarios por correo para completar la transferencia.</p>
            )}
          </div>

          {/* ===== Columna derecha: resumen del pedido ===== */}
          <div className="col-md-5">
            <div className="card p-4">
              <h5 className="fw-bold">Tu Pedido</h5>
              <ul className="list-unstyled mb-3">
                {carrito.map((item) => (
                  <li key={item.id} className="d-flex justify-content-between">
                    <span>{item.titulo} x{item.cantidad}</span>
                    <span>${(Number(item.precio) * item.cantidad).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between"><span>Envío</span><span>${envio.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between mb-2"><span>Impuestos</span><span>${impuestos.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>

              {error && <p className="text-danger mt-2">{error}</p>}

              <button className="btn btn-success w-100 mt-3" type="submit" disabled={enviando}>
                {enviando ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
              </button>
              <p className="text-center text-muted small mt-2">🔒 Pago seguro y cifrado</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Pago;