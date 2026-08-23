import { createContext, useState } from 'react'; // herramientas para el contexto y estado

// 1. Creamos el contexto (el "almacén global")
export const CarritoContext = createContext();

// 2. El Provider envuelve la app y reparte los datos del carrito
export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]); // aquí se guardan los productos del carrito

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]); // añade el nuevo producto a los que ya había
  };

  return (
    // value = lo que estará disponible para toda la app
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}