// Tarjeta reutilizable para servicios: recibe datos por props
function ServiceCard({ nombre, precio }) {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h5 className="card-title">{nombre}</h5>
        <p className="text-primary fw-bold">${precio}</p>
        {/* los servicios se reservan, no se agregan al carrito */}
        <button className="btn btn-primary">Reservar</button>
      </div>
    </div>
  );
}

export default ServiceCard;