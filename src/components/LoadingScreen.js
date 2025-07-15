import React, { useEffect, useState } from 'react';
import '../css/LoadingScreen.css';
import imagenFondo from '../img/fondocarga.jpg'; 

const LoadingScreen = ({ onFinish }) => {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    let progresoActual = 0;
    const intervalo = setInterval(() => {
      progresoActual += 1;
      setProgreso(progresoActual);
      if (progresoActual >= 100) {
        clearInterval(intervalo);
        setTimeout(onFinish, 500); 
      }
    }, 30); 

    return () => clearInterval(intervalo);
  }, [onFinish]);

  return (
    <div className="loading-container" style={{ backgroundImage: `url(${imagenFondo})` }}>
      <div className="barra-contenedor">
        <div className="barra" style={{ width: `${progreso}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
