import React from 'react';
import '../css/Noticias.css';
import imagenNoticias from '../img/noticiasimg.png';
import imagenTortugas from '../img/tortugasmarinas.png';
import imagen1 from '../img/noticia1.png';
import imagen2 from '../img/noticia2.png';
import imagen3 from '../img/noticia3.png';

const Noticias = () => {
  return (
    <div>
      {/* Sección 1 */}
      <div className="inicio1-bg">
        <div className="container mt-4">
          <div className="led1-content-box d-flex align-items-center justify-content-between flex-wrap">
            <div className="led1-text text-white">
              <h2 className="mb-3">NOTICIAS</h2>
              <p className="mb-3">
                Mantente informado sobre las últimas novedades del mundo de los dragones. Actualizaciones, eventos y mucho más.
              </p>
            </div>
            <div className="led-imag">
              <img src={imagenNoticias} alt="Noticias Dragón" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2 */}
      <div className="tortugas-bg py-5">
        <div className="container d-flex align-items-center justify-content-between flex-wrap">
          <div className="tortugas-img col-lg-6 mb-4 mb-lg-0">
            <img src={imagenTortugas} alt="Salva tortugas marinas" className="img-fluid" />
          </div>
          <div className="tortugas-text col-lg-5 text-white">
            <h2>
              SALVA <span className="azul">TORTUGAS MARINAS REALES</span><br />
              CON NUESTRO <span className="azul">PASE DEL DÍA DE LA TIERRA</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Sección 3 */}
      <div className="seccion3-bg py-5">
        <div className="container text-center">
          <div className="row justify-content-center gx-4 gy-4">
            <div className="col-12 col-md-4 d-flex flex-column align-items-center seccion3-img-wrapper">
              <img src={imagen1} alt="Imagen 1" className="img-lateral img-fluid mb-2" />
              <p className="text-white fw-bold fs-5">Planta árboles con nuestro pase día del medioambiente</p>
            </div>

            <div className="col-12 col-md-4 d-flex flex-column align-items-center seccion3-img-wrapper">
              <img src={imagen2} alt="Imagen Central" className="img-central img-fluid mb-4" />
              <p className="text-white fw-bold fs-5">¡Ven a celebrar el 13º cumpleaños de Dragón City!</p>
            </div>

            <div className="col-12 col-md-4 d-flex flex-column align-items-center seccion3-img-wrapper">
              <img src={imagen3} alt="Imagen 3" className="img-lateral img-fluid mb-2" />
              <p className="text-white fw-bold fs-5">Ilusión Elusiva, un nuevo dragón ha aparecido</p>
            </div>
          </div>
          <div className="seccion3-texto mt-4 text-white">
            <h3>Descubre contenido exclusivo en nuestra redes sociales</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticias;