import React from 'react';
import '../css/Footer.css'; 

const Footer = () => (
  <footer className="text-white text-center py-5">
    <div className="container">
      <div className="row">
        {/* Sección 1: Logo y Nombre */}
        <div className="col-md-4 footer-section mb-4">
          <img src="logo-dragoncity.png" alt="Logo" className="footer-logo" />
          <p className="mt-2">Ana Perez</p>
        </div>

        {/* Sección 2: Redes Sociales */}
        <div className="col-md-4 footer-section mb-4">
          <h5>Redes Sociales</h5>
          <div className="social-icons">
            <a href="https://www.facebook.com/DragonCity/?locale=es_LA" target="_blank" rel="noopener noreferrer">
              <img src="redes2.png" alt="Facebook" />
            </a>
            <a href="https://x.com/DragonCityGame?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
              <img src="redes1.jpg" alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/dragoncity/" target="_blank" rel="noopener noreferrer">
              <img src="redes3.png" alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Sección 3: Contacto */}
        <div className="col-md-4 footer-section mb-4">
          <h5>Contacto</h5>
          <p>tadashiperez83@gmail.com</p>
        </div>
      </div>
      {/* Derechos reservados */}
      <div className="mt-4" style={{ color: 'gray' }}>
        <p>© 2025 Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;