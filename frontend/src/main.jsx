import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx' // importa el Provider del carrito
import { UsuarioProvider } from './context/UsuarioContext.jsx' // provider de usuario

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </UsuarioProvider>
  </StrictMode>,
)