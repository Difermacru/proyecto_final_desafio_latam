import { useState, useEffect } from "react";
import PanelMenu from "../components/PanelMenu";

// Página que muestra los productos favoritos del usuario
function MisFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // por ahora traemos las publicaciones como favoritos (simple)
    fetch('http://localhost:3000/api/publicaciones')
      .then((res) => res.json())
      .then((data) => setFavoritos(data))
      .catch((error) => console.error('Error al cargar favoritos:', error));
  }, []);

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="row">
        <div className="col-md-2">
          <PanelMenu />
        </div>

        <div className="col-md-10">
          <h1 className="fw-bold">Mis Favoritos</h1>
          <p className="text-muted">{favoritos.length} productos guardados</p>

          <div className="row mt-3">
            {favoritos.map((producto) => (
              <div className="col-md-4 mb-3" key={producto.id}>
                <div className="card">
                  <img
                    src={producto.imagen || "/alimento.jpg"}
                    className="card-img-top"
                    alt={producto.titulo}
                  />
                  <div className="card-body text-center">
                    {/* el backend usa 'titulo', no 'nombre' */}
                    <h5 className="card-title">{producto.titulo}</h5>
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