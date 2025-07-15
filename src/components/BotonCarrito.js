import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const BotonCarrito = () => {
  const navigate = useNavigate();
  const { carrito } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div onClick={() => navigate('/carrito')} style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      cursor: 'pointer',
      zIndex: 1000
    }}>
      <img src={require('../img/dragoncito.webp')} alt="Carrito" style={{ width: '90px' }} />
      {total > 0 && <span style={{
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 7px',
        fontSize: '12px'
      }}>{total}</span>}
    </div>
  );
};

export default BotonCarrito;
