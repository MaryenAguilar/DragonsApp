import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Inicio.css';
import dragonInicio from '../img/dragoninicio.png';
import zeusImg from '../img/iniciozeus.png';

const dragones = [
  { id: 1, nombre: "Elemento Fuego", poder: "Representa poder, pasión y destrucción", img: require('../img/Fuego.webp') },
  { id: 2, nombre: "Elemento Hielo", poder: "Representa control, calma y fuerza implacable", img: require('../img/Hielo.webp') },
  { id: 3, nombre: "Elemento Tierra", poder: "Representa firmeza, resistencia y origen eterno", img: require('../img/Tierra.webp') },
  { id: 4, nombre: "Elemento Agua", poder: "Representa fluidez, sabiduría y poder en movimiento", img: require('../img/Agua.webp') },
  { id: 5, nombre: "Elemento Rayo", poder: "Representa velocidad, energía pura y poder indomable", img: require('../img/Rayo.webp') },
  { id: 6, nombre: "Elemento Naturaleza", poder: "Representa vida, crecimiento y fuerza silenciosa", img: require('../img/Hierba.webp') },
  { id: 7, nombre: "Elemento Oscuro", poder: "Representa misterio, poder oculto y temible silencio", img: require('../img/Oscuro.webp') },
  { id: 8, nombre: "Elemento Luz", poder: "Representa esperanza, pureza y poder que ilumina las sombras", img: require('../img/Luz.webp') },
];

const Inicio = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Sección 1: Portada principal */}
      <div className="inicio-bg">
        <div className="container mt-4">
          <div className="led-content-box d-flex align-items-center justify-content-between flex-wrap">
            <div className="led-image">
              <img src={dragonInicio} alt="Dragón" />
            </div>
            <div className="led-text">
              <h2>EMPIEZA TU AVENTURA</h2>
              <p>Explora, elige y adopta a tu primer dragón</p>
              <Link to="/dragones" className="led-button">DRAGONES</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2: Información general */}
      <div className="info-section">
        <div className="container text-center py-5">
          <h3 className="info-title">¿Qué puedes hacer en nuestra página?</h3>
          <p className="info-description">
            Aquí podrás comprar dragones inspirados en el universo de <strong>Dragon City</strong>, cada uno con habilidades únicas, elementos mágicos y evoluciones increíbles. Nuestra tienda te permite explorar una colección exclusiva de dragones, ver sus características, precios y realizar compras de forma fácil y segura. También podrás acceder a una sección de <strong>noticias</strong> donde compartimos las novedades del mundo dragón, eventos especiales, lanzamientos y consejos para entrenadores. Si tienes dudas, sugerencias o quieres comunicarte con nosotros, en la sección de <strong>contacto</strong> te ayudaremos encantados. ¡Tu aventura comienza aquí!
          </p>
        </div>
      </div>

      {/* Sección 3: Noticias */}
      <div className="seccion-doble-color">
        <div className="container">
          <div className="seccion-texto">
            <h3>¡ÚLTIMAS NOTICIAS!</h3>
            <p>Descubre actualizaciones semanales sobre nuevos dragones, eventos especiales, y recompensas exclusivas. ¡No te pierdas los torneos de batallas, las islas temporales y las sorpresas que Dragon City tiene preparadas para ti!</p>
            <Link to="/mundos" className="led-button">NOTICIAS</Link>
          </div>
          <div className="seccion-imagen">
            <img src={zeusImg} alt="Mundo de Dragones" />
          </div>
        </div>
      </div>

      {/* Sección 4: Carrusel */}
      <div className="carousel-section">
        <div className="carousel-wrapper">
          <button className="scroll-button left" onClick={() => scroll('left')}>&#8592;</button>
          <div className="carousel-container" ref={scrollRef}>
            {dragones.map((dragon) => (
              <div className="card" key={dragon.id}>
                <img src={dragon.img} alt={dragon.nombre} />
                <h4>{dragon.nombre}</h4>
                <p>{dragon.poder}</p>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right')}>&#8594;</button>
        </div>
      </div>
    </>
  );
};

export default Inicio;
