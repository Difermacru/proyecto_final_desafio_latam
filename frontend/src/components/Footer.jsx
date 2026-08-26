import { Link } from 'react-router-dom'; // para los enlaces internos

function Footer() {
  return (
    // footer con fondo gris claro, padding arriba/abajo y margen superior
    <footer className="bg-light py-4 mt-5 border-top">
      <div className="container">
        <div className="row">

          {/* Columna 1: marca y descripción */}
          <div className="col-md-3">
            <h5 className="fw-bold">VetMarket</h5>
            <p className="text-muted small">Tu tienda y clínica para mascotas.</p>
            <p className="text-muted small">© 2025 VetMarket · Todos los derechos reservados</p>
          </div>

          {/* Columna 2: enlaces de compra */}
          <div className="col-md-3">
            <h6 className="fw-bold">Comprar</h6>
            <ul className="list-unstyled">
              <li><Link className="text-decoration-none text-muted" to="/productos">Productos</Link></li>
              <li><Link className="text-decoration-none text-muted" to="/servicios">Servicios</Link></li>
              <li><Link className="text-decoration-none text-muted" to="/productos">Ofertas</Link></li>
            </ul>
          </div>

          {/* Columna 3: enlaces de cuenta */}
          <div className="col-md-3">
            <h6 className="fw-bold">Cuenta</h6>
            <ul className="list-unstyled">
              <li><Link className="text-decoration-none text-muted" to="/login">Iniciar Sesión</Link></li>
              <li><Link className="text-decoration-none text-muted" to="/mis-pedidos">Mis Pedidos</Link></li>
              <li><Link className="text-decoration-none text-muted" to="/mis-citas">Mis Citas</Link></li>
            </ul>
          </div>

          {/* Columna 4: datos de contacto */}
          <div className="col-md-3">
            <h6 className="fw-bold">Contacto</h6>
            <p className="text-muted small mb-1">ayuda@vetmarket.com</p>
            <p className="text-muted small mb-1">+56 9 1234 5678</p>
            <p className="text-muted small">Chile</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;