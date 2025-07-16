import React, { useState, useEffect, useMemo } from 'react';
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

  // Hooks para manejar las promociones
  const [promocionActiva, setPromocionActiva] = useState(null);
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);

  // Función para determinar el tipo de dragón
  const determinarTipoDragon = (nombre) => {
    const tipos = {
      'fuego': ['Dragón Fuego', 'Dragón Volcán', 'Pájaro Fuego', 'Dragón Fuego Oscuro'],
      'agua': ['Dragón Agua', 'Dragón Mar Puro', 'Dragón Acuanauta'],
      'hielo': ['Dragón Hielo', 'Dragón Iceberg', 'Dragón Rey Helado'],
      'tierra': ['Dragón Tierra', 'Dragón Tierra Puro', 'Dragón Tierra Doble'],
      'rayo': ['Dragón Eléctrico', 'Dragón Relámpago', 'Dragón Eléctrico Puro'],
      'naturaleza': ['Dragón Natura', 'Dragón Natura Doble', 'Dragón Natura Zombie'],
      'oscuro': ['Dragón Oscuro', 'Dragón Señor Oscuro'],
      'luz': ['Dragón Arcángel', 'Dragón Luz Dorada', 'Dragón Titán Luz']
    };
    
    for (const [tipo, dragones] of Object.entries(tipos)) {
      if (dragones.includes(nombre)) {
        return tipo;
      }
    }
    return 'otro';
  };

  // Hook useMemo para calcular promociones de manera eficiente
  const promociones = useMemo(() => {
    if (carrito.length === 0) {
      return {
        totalSinDescuento: 0,
        totalConDescuento: 0,
        descuentoAplicado: 0,
        tipoDescuento: '',
        ahorroTotal: 0
      };
    }

    const tiposCantidad = {};
    const totalSinDescuento = carrito.reduce((acc, item) => {
      const tipo = determinarTipoDragon(item.nombre);
      tiposCantidad[tipo] = (tiposCantidad[tipo] || 0) + item.cantidad;
      return acc + item.precio * item.cantidad;
    }, 0);

    let descuentoAplicado = 0;
    let tipoDescuento = '';

    // Verificar promoción de 3 tipos diferentes con 1 de cada uno
    const tiposConUno = Object.values(tiposCantidad).filter(cantidad => cantidad >= 1);
    if (tiposConUno.length >= 3) {
      descuentoAplicado = 30;
      tipoDescuento = '🎉 3 tipos diferentes - 30% descuento';
    } else {
      // Verificar promoción de 2 o más del mismo tipo
      for (const [tipo, cantidad] of Object.entries(tiposCantidad)) {
        if (cantidad >= 2) {
          descuentoAplicado = 22;
          tipoDescuento = `🔥 2+ dragones de ${tipo} - 22% descuento`;
          break;
        }
      }
    }

    const totalConDescuento = totalSinDescuento * (1 - descuentoAplicado / 100);
    const ahorroTotal = totalSinDescuento - totalConDescuento;

    return {
      totalSinDescuento,
      totalConDescuento,
      descuentoAplicado,
      tipoDescuento,
      ahorroTotal
    };
  }, [carrito]);

  // Hook useEffect para actualizar el estado cuando cambien las promociones
  useEffect(() => {
    setPromocionActiva(promociones.tipoDescuento);
    setDescuentoAplicado(promociones.descuentoAplicado);
  }, [promociones]);

  const total = promociones.totalConDescuento;

  const finalizarCompra = async () => {
    const datosCompra = {
      items: carrito
    };

    try {
      // Usar el archivo PHP con promociones incluidas
      const response = await axios.post('http://localhost/backend-php/registrarCompra.php', datosCompra);
      const { promociones: promoData } = response.data;
      
      // Mensaje personalizado basado en las promociones
      let mensaje = 'Tus dragones están en camino 🐉🔥';
      if (promoData && promoData.hayPromocion) {
        mensaje += `\n\n¡${promoData.promocionDetalle}!\nAhorraste S/ ${promoData.ahorroTotal}`;
      }

      Swal.fire({
        title: '¡Gracias por tu compra!',
        text: mensaje,
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
            {promociones.descuentoAplicado > 0 && (
              <div className="promocion-info" style={{ 
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
                padding: '15px', 
                borderRadius: '10px', 
                marginBottom: '15px',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                  {promocionActiva}
                </div>
                <div style={{ fontSize: '14px' }}>
                  Precio original: S/ {promociones.totalSinDescuento.toFixed(2)}
                </div>
                <div style={{ fontSize: '14px' }}>
                  Descuento ({descuentoAplicado}%): -S/ {promociones.ahorroTotal.toFixed(2)}
                </div>
              </div>
            )}
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Total: S/ {total.toFixed(2)}
            </div>
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
