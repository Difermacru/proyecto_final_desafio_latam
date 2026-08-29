import { createContext, useState } from 'react';

export const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  // al iniciar, intentamos recuperar el usuario guardado en localStorage
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  // login: guarda el usuario en el estado Y en localStorage
  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  // logout: borra el usuario del estado Y de localStorage
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token'); // también borra el token
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
}