import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import Inicio from './pages/Inicio';      
import Productos from './pages/Productos'; 
import Servicios from './pages/Servicios'; 
import Login from './pages/Login'; 
import Carrito from './pages/Carrito';
import Registro from './pages/Registro'; 
import Perfil from './pages/Perfil'; 
import MisPedidos from './pages/MisPedidos'; 
import MisCitas from './pages/MisCitas'; 
import MisFavoritos from './pages/MisFavoritos'; 
import MisPublicaciones from './pages/MisPublicaciones'; 
import Configuracion from './pages/Configuracion'; 
import RutaProtegida from './components/RutaProtegida'; 
import DetalleProducto from './pages/DetalleProducto';
import NuevaPublicacion from './pages/NuevaPublicacion';

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
            <Route path="/nueva-publicacion" element={<RutaProtegida><NuevaPublicacion /></RutaProtegida>} />

          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;