import React from 'react';
import '../css/Dragones.css';
import { useCarrito } from '../context/CarritoContext';

const elementos = [
  { id: "fuego", img: require('../img/Fuego.webp') },
  { id: "agua", img: require('../img/Agua.webp') },
  { id: "hielo", img: require('../img/Hielo.webp') },
  { id: "tierra", img: require('../img/Tierra.webp') },
  { id: "rayo", img: require('../img/Rayo.webp') },
  { id: "naturaleza", img: require('../img/Hierba.webp') },
  { id: "oscuro", img: require('../img/Oscuro.webp') },
  { id: "luz", img: require('../img/Luz.webp') },
];

const dragones = {
  fuego: [
    { nombre: "Dragón Fuego", imagen: require('../img/dragonfuego.jpg'), precio: 100 },
    { nombre: "Dragón Volcán", imagen: require('../img/dragonvolcan.jpg'), precio: 150 },
    { nombre: "Pájaro Fuego", imagen: require('../img/pajarofuego.jpg'), precio: 140 },
  ],
  agua: [
    { nombre: "Dragón Agua", imagen: require('../img/dragonagua.jpg'), precio: 110 },
    { nombre: "Dragón Mar Puro", imagen: require('../img/dragonaguapuro.png'), precio: 230 },
    { nombre: "Dragón Acuanauta ", imagen: require('../img/dragonaquanaut.png'), precio: 150 },
  ],
  hielo: [
    { nombre: "Dragón Hielo", imagen: require('../img/dragonhielo.png'), precio: 120 },
    { nombre: "Dragón Iceberg", imagen: require('../img/dragonicerbeg.png'), precio: 140 },
    { nombre: "Dragón Rey Helado", imagen: require('../img/dragonking.png'), precio: 200 },
  ],
  tierra: [
    { nombre: "Dragón Tierra", imagen: require('../img/dragontierra.png'), precio: 88 },
    { nombre: "Dragón Tierra Puro", imagen: require('../img/dragonpurotierra.png'), precio: 135 },
    { nombre: "Dragón Tierra Doble", imagen: require('../img/dragondobletierra.png'), precio: 164 },
  ],
  rayo: [
    { nombre: "Dragón Eléctrico", imagen: require('../img/dragonrayo.png'), precio: 115 },
    { nombre: "Dragón Relámpago", imagen: require('../img/dragonrelampago.png'), precio: 130 },
    { nombre: "Dragón Eléctrico Puro", imagen: require('../img/dragonelectricopuro.png'), precio: 175 },
  ],
  naturaleza: [
    { nombre: "Dragón Natura", imagen: require('../img/dragonnatura.png'), precio: 53 },
    { nombre: "Dragón Natura Doble", imagen: require('../img/dragonnaturadoble.png'), precio: 150 },
    { nombre: "Dragón Natura Zombie", imagen: require('../img/dragonnaturazombie.png'), precio: 190 },
  ],
  oscuro: [
    { nombre: "Dragón Oscuro", imagen: require('../img/dragonoscuro.png'), precio: 179 },
    { nombre: "Dragón Fuego Oscuro", imagen: require('../img/dragonfuegooscuro.png'), precio: 208 },
    { nombre: "Dragón Señor Oscuro", imagen: require('../img/dragonseñoroscuro.png'), precio: 240 },
  ],
  luz: [
    { nombre: "Dragón Arcángel", imagen: require('../img/dragonarcangel.png'), precio: 242 },
    { nombre: "Dragón Luz Dorada", imagen: require('../img/dragondorado.png'), precio: 238 },
    { nombre: "Dragón Titán Luz", imagen: require('../img/dragontitan.png'), precio: 281 },
  ]
};

const Dragones = () => {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="container py-5 text-white">
      {/* Elementos centrados */}
      <div className="elementos-scroll-container mb-5">
        <div className="elementos-wrapper">
          {elementos.map((elem) => (
            <a key={elem.id} href={`#${elem.id}`}>
              <img
                src={elem.img}
                alt={elem.id}
                className="rounded-circle border border-light"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover'
                }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Dragones por tipo */}
      {Object.entries(dragones).map(([tipo, lista]) => (
        <div key={tipo} id={tipo} className="section-dragones">
          <h2 className={`text-center mb-4 titulo-${tipo}`}>
            Dragones de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </h2>
          <div className="row1 justify-content-center">
            {lista.map((dragon, idx) => (
              <div key={idx} className={`dragon-card card-${tipo}`}>
                <div className="card1 bg-dark text-white">
                  <img
                    src={dragon.imagen}
                    className="card-img-top"
                    alt={dragon.nombre}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{dragon.nombre}</h5>
                    <button className="custom-button" onClick={() => agregarAlCarrito(dragon)}>S/ {dragon.precio}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dragones;
