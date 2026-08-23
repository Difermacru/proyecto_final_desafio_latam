import { createContext, useState } from 'react'; // herramientas para contexto y estado

// 1. Creamos el contexto del usuario (almacén global de la sesión)
export const UsuarioContext = createContext();

// 2. El Provider reparte la info del usuario a toda la app
export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = nadie logueado

  // Función para iniciar sesión (guarda los datos del usuario)
  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  // Función para cerrar sesión (borra los datos)
  const logout = () => {
    setUsuario(null);
  };

  return (
    // ponemos a disposición: el usuario, y las funciones login/logout
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
}