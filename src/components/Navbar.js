import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import LoadingScreen from './LoadingScreen';

const Navbar = () => {
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState(null); // <- Nuevo estado para el usuario
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const irConCarga = (ruta) => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      navigate(ruta);
    }, 3000);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate('/');
  };

  return (
    <>
      {cargando && (
        <LoadingScreen onFinish={() => {}} />
      )}

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button
            className="navbar-brand btn btn-link d-flex align-items-center"
            onClick={() => irConCarga('/')}
          >
            <img src="logo-dragoncity.png" alt="Logo" className="logo-img" />
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => irConCarga('/')}>
                  INICIO
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => irConCarga('/dragones')}>
                  DRAGONES
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => irConCarga('/noticias')}>
                  NOTICIAS
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => irConCarga('/contacto')}>
                  CONTACTO
                </button>
              </li>
              {usuario ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white">Hola, {usuario.nombre} 👋</span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link text-white" onClick={cerrarSesion}>
                      CERRAR SESIÓN
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link-login btn btn-link" onClick={() => irConCarga('/iniciar-sesion')}>
                    <span className="login-icon">👤</span> INICIAR SESIÓN
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
