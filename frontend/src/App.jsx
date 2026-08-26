import { BrowserRouter, Routes, Route } from 'react-router-dom'; // herramientas de React Router
import Navbar from './components/Navbar'; // la barra de arriba
import Footer from './components/Footer'; // el pie de página
import Inicio from './pages/Inicio';      // la página de inicio
import Productos from './pages/Productos'; // importa la página de productos
import Servicios from './pages/Servicios'; // importa la página de servicios
import Login from './pages/Login'; // importa la página de login
import Carrito from './pages/Carrito';
import Registro from './pages/Registro'; // importa la página de registro
import Perfil from './pages/Perfil'; // importa el panel de usuario
import MisPedidos from './pages/MisPedidos'; // importa la página de pedidos
import MisCitas from './pages/MisCitas'; // importa la página de citas
import MisFavoritos from './pages/MisFavoritos'; // importa la página de favoritos
import MisPublicaciones from './pages/MisPublicaciones'; // importa la página de publicaciones
import Configuracion from './pages/Configuracion'; // importa la página de configuración
import RutaProtegida from './components/RutaProtegida'; // guardián de rutas privadas
import DetalleProducto from './pages/DetalleProducto'; // importa el detalle de producto

function App() {
  return (
    <BrowserRouter>
      {/* contenedor que ocupa mínimo toda la altura de la pantalla */}
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        {/* flex-grow-1 hace que el contenido ocupe todo el espacio disponible, empujando el footer abajo */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />
            <Route path="/mis-pedidos" element={<RutaProtegida><MisPedidos /></RutaProtegida>} />
            <Route path="/mis-citas" element={<RutaProtegida><MisCitas /></RutaProtegida>} />
            <Route path="/mis-favoritos" element={<RutaProtegida><MisFavoritos /></RutaProtegida>} />
            <Route path="/mis-publicaciones" element={<RutaProtegida><MisPublicaciones /></RutaProtegida>} />
            <Route path="/configuracion" element={<RutaProtegida><Configuracion /></RutaProtegida>} />
            <Route path="/producto/:id" element={<DetalleProducto />} /> 

          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;