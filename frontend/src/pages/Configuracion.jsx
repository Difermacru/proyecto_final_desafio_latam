import PanelMenu from '../components/PanelMenu'; // menú lateral reutilizable

// Página de configuración del usuario
function Configuracion() {
  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: opciones de configuración */}
        <div className="col-md-10">
          <h1 className="fw-bold">Configuración</h1>

          {/* Sección Notificaciones */}
          <div className="card mb-3 mt-3">
            <div className="card-body">
              <h5 className="fw-bold">Notificaciones</h5>
              {/* form-check con switch: interruptor de encendido/apagado */}
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked />
                <label className="form-check-label">Correos sobre mis pedidos</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked />
                <label className="form-check-label">Recordatorios de citas</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">Ofertas y promociones</label>
              </div>
            </div>
          </div>

          {/* Sección Seguridad */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="fw-bold">Seguridad</h5>
              <div className="row">
                <div className="col mb-3">
                  <label className="form-label">Contraseña actual</label>
                  <input type="password" className="form-control" placeholder="********" />
                </div>
                <div className="col mb-3">
                  <label className="form-label">Nueva contraseña</label>
                  <input type="password" className="form-control" placeholder="********" />
                </div>
              </div>
              <button className="btn btn-primary">Cambiar Contraseña</button>
            </div>
          </div>

          {/* Sección Preferencias */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="fw-bold">Preferencias</h5>
              <div className="row">
                <div className="col mb-3">
                  <label className="form-label">Idioma</label>
                  <select className="form-select">
                    <option>Español</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="col mb-3">
                  <label className="form-label">Moneda</label>
                  <select className="form-select">
                    <option>CLP ($)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Configuracion;