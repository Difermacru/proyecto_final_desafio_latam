import { useState, useEffect } from "react"; // hooks
import PanelMenu from "../components/PanelMenu"; // menú lateral reutilizable

// Página que muestra los productos favoritos del usuario
function MisFavoritos() {
  const [favoritos, setFavoritos] = useState([]); // estado: lista de favoritos

  // al cargar, llenamos los favoritos (luego vendrán de la API) — con imagen
  useEffect(() => {
    setFavoritos([
      {
        id: 1,
        nombre: "Alimento Premium",
        precio: "25.99",
        imagen: "/alimento.jpg",
      },
      {
        id: 2,
        nombre: "Cama Ortopédica",
        precio: "45.00",
        imagen: "/cama.jpg",
      },
      {
        id: 3,
        nombre: "Correa Retráctil",
        precio: "12.99",
        imagen: "/correa.jpg",
      },
    ]);
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        {/* Columna izquierda: menú lateral */}
        <div className="col-md-2">
          <PanelMenu />
        </div>

        {/* Columna derecha: grilla de favoritos */}
        <div className="col-md-10">
          <h1 className="fw-bold">Mis Favoritos</h1>
          <p className="text-muted">{favoritos.length} productos guardados</p>

          <div className="row mt-3">
            {/* recorre los favoritos y crea una tarjeta por cada uno */}
            {favoritos.map((producto) => (
              <div className="col-md-4 mb-3" key={producto.id}>
                <div className="card">
                  {/* imagen del producto favorito */}
                  <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="text-success fw-bold">${producto.precio}</p>
                    <button className="btn btn-primary">Ver Publicación</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MisFavoritos;