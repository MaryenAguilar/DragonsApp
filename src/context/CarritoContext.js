import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (dragon) => {
    setCarrito(prev => {
      const index = prev.findIndex(item => item.nombre === dragon.nombre);
      if (index !== -1) {
        const actualizado = [...prev];
        actualizado[index].cantidad += 1;
        return actualizado;
      } else {
        return [...prev, { ...dragon, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito(prev => prev.filter(item => item.nombre !== nombre));
  };

  const aumentarCantidad = (nombre) => {
    setCarrito(prev =>
      prev.map(item =>
        item.nombre === nombre ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (nombre) => {
    setCarrito(prev =>
      prev.map(item =>
        item.nombre === nombre && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 } : item
      ).filter(item => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => setCarrito([]);


  return (
    <CarritoContext.Provider value={{
      carrito, agregarAlCarrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad, vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
