import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCarrito } from '../context/CarritoContext';
import '../css/Carrito.css';

const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito
  } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const finalizarCompra = async () => {
    const datosCompra = {
      items: carrito
    };

    try {
      await axios.post('http://localhost/backend-php/registrarCompra.php', datosCompra);
      Swal.fire({
        title: '¡Gracias por tu compra!',
        text: 'Tus dragones están en camino 🐉🔥',
        imageUrl: 'https://pa1.aminoapps.com/6772/f4d9b5bbdda99effc6140117c68cdedd01db0a39_hq.gif',
        imageHeight: 200,
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#0b64fb',
        confirmButtonText: 'Aceptar',
      });
      vaciarCarrito();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo registrar la compra", "error");
    }
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de compras</h2>

      {carrito.length === 0 ? (
        <p className="texto-vacio">Tu carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item, index) => (
            <div key={index} className="carrito-item d-flex align-items-center gap-3">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="carrito-img"
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div className="flex-grow-1">
                <strong>{item.nombre}</strong><br />
                <span>S/ {item.precio} x {item.cantidad}</span>
                <div className="botones-cantidad mt-2 d-flex gap-2">
                  <button onClick={() => aumentarCantidad(item.nombre)}>+</button>
                  <button onClick={() => disminuirCantidad(item.nombre)}>-</button>
                  <button onClick={() => eliminarDelCarrito(item.nombre)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}

          <div className="carrito-total">
            Total: S/ {total}
          </div>

          <button className="btn-finalizar" onClick={finalizarCompra}>
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
