// Página para crear una cuenta nueva
function Registro() {
  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <div className="card p-4">
        <h2 className="fw-bold text-center">Crear Cuenta</h2>
        <p className="text-muted text-center">Únete a VetMarket en un minuto</p>

        {/* Nombre y Apellido en la misma fila */}
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Nombre" />
          </div>
          <div className="col mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" placeholder="Apellido" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" placeholder="••••••••" />
        </div>

        <button className="btn btn-success w-100">Crear Cuenta</button>
      </div>
    </div>
  );
}

export default Registro;