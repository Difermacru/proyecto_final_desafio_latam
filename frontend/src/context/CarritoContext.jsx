import { createContext, useState, useEffect, useContext } from 'react';
import { UsuarioContext } from './UsuarioContext';
import { API_URL } from '../config';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const { usuario } = useContext(UsuarioContext); // usuario logueado

  // función para traer el carrito del backend
  const cargarCarrito = () => {
    if (!usuario) return; // si no hay usuario, no hace nada
    fetch(`${API_URL}/api/carrito/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => setCarrito(data))
      .catch((error) => console.error('Error al cargar carrito:', error));
  };

  // cuando el usuario cambia: carga su carrito, o lo vacía si cerró sesión
  useEffect(() => {
    if (usuario) {
      cargarCarrito(); // hay usuario: cargamos su carrito
    } else {
      setCarrito([]); // no hay usuario (cerró sesión): vaciamos el carrito
    }
  }, [usuario]);

  // agregar un producto al carrito (lo guarda en la base)
  const agregarAlCarrito = async (publicacionId) => {
    if (!usuario) {
      alert('Debes iniciar sesión para agregar productos');
      return;
    }
    try {
      await fetch(`${API_URL}/api/carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          publicacion_id: publicacionId,
          cantidad: 1,
        }),
      });
      cargarCarrito(); // recargamos para ver el producto agregado
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // eliminar un item del carrito (de la base)
  const eliminarDelCarrito = async (itemId) => {
    try {
      await fetch(`${API_URL}/api/carrito/${itemId}`, {
        method: 'DELETE',
      });
      cargarCarrito(); // recargamos para que desaparezca
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}