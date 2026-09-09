// Tarjeta reutilizable para servicios: recibe datos por props (nombre, precio, imagen)
// onReservar: función que el padre (Servicios.jsx) pasa para abrir el formulario de reserva
function ServiceCard({ nombre, precio, imagen, onReservar }) {
  return (
    <div className="service-card">
      {/* imagen del servicio arriba de la tarjeta */}
      <img
        src={imagen}                    // ruta de la imagen (ej: /bano.jpg)
        className="service-card__img"    // clase propia con altura y recorte
        alt={nombre}                     // texto alternativo (accesibilidad)
      />

      {/* cuerpo con el texto y el botón */}
      <div className="service-card__body">
        <h5 className="service-card__title">{nombre}</h5>
        <p className="service-card__price">${precio}</p>
        {/* los servicios se reservan, no se agregan al carrito */}
        <button className="service-card__btn" onClick={onReservar}>Reservar</button>
      </div>
    </div>
  );
}

export default ServiceCard;