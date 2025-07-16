import React, { useState, useEffect } from 'react'; // <--- Añadimos useState y useEffect
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

// Hemos añadido un 'id' único a cada dragón para que React los pueda rastrear mejor.
// Si tu compañera ya tenía IDs, puedes usar los de ella.
const todosLosDragonesEstaticos = {
  fuego: [
    { id: "df1", nombre: "Dragón Fuego", imagen: require('../img/dragonfuego.jpg'), precio: 100 },
    { id: "dv1", nombre: "Dragón Volcán", imagen: require('../img/dragonvolcan.jpg'), precio: 150 },
    { id: "pf1", nombre: "Pájaro Fuego", imagen: require('../img/pajarofuego.jpg'), precio: 140 },
  ],
  agua: [
    { id: "da1", nombre: "Dragón Agua", imagen: require('../img/dragonagua.jpg'), precio: 110 },
    { id: "dmp1", nombre: "Dragón Mar Puro", imagen: require('../img/dragonaguapuro.png'), precio: 230 },
    { id: "daa1", nombre: "Dragón Acuanauta", imagen: require('../img/dragonaquanaut.png'), precio: 150 },
  ],
  hielo: [
    { id: "dh1", nombre: "Dragón Hielo", imagen: require('../img/dragonhielo.png'), precio: 120 },
    { id: "di1", nombre: "Dragón Iceberg", imagen: require('../img/dragonicerbeg.png'), precio: 140 },
    { id: "drh1", nombre: "Dragón Rey Helado", imagen: require('../img/dragonking.png'), precio: 200 },
  ],
  tierra: [
    { id: "dt1", nombre: "Dragón Tierra", imagen: require('../img/dragontierra.png'), precio: 88 },
    { id: "dtp1", nombre: "Dragón Tierra Puro", imagen: require('../img/dragonpurotierra.png'), precio: 135 },
    { id: "dtd1", nombre: "Dragón Tierra Doble", imagen: require('../img/dragondobletierra.png'), precio: 164 },
  ],
  rayo: [
    { id: "de1", nombre: "Dragón Eléctrico", imagen: require('../img/dragonrayo.png'), precio: 115 },
    { id: "dr1", nombre: "Dragón Relámpago", imagen: require('../img/dragonrelampago.png'), precio: 130 },
    { id: "dep1", nombre: "Dragón Eléctrico Puro", imagen: require('../img/dragonelectricopuro.png'), precio: 175 },
  ],
  naturaleza: [
    { id: "dn1", nombre: "Dragón Natura", imagen: require('../img/dragonnatura.png'), precio: 53 },
    { id: "dnd1", nombre: "Dragón Natura Doble", imagen: require('../img/dragonnaturadoble.png'), precio: 150 },
    { id: "dnz1", nombre: "Dragón Natura Zombie", imagen: require('../img/dragonnaturazombie.png'), precio: 190 },
  ],
  oscuro: [
    { id: "do1", nombre: "Dragón Oscuro", imagen: require('../img/dragonoscuro.png'), precio: 179 },
    { id: "dfo1", nombre: "Dragón Fuego Oscuro", imagen: require('../img/dragonfuegooscuro.png'), precio: 208 },
    { id: "dso1", nombre: "Dragón Señor Oscuro", imagen: require('../img/dragonseñoroscuro.png'), precio: 240 },
  ],
  luz: [
    { id: "da2", nombre: "Dragón Arcángel", imagen: require('../img/dragonarcangel.png'), precio: 242 },
    { id: "dlg1", nombre: "Dragón Luz Dorada", imagen: require('../img/dragondorado.png'), precio: 238 },
    { id: "dtl1", nombre: "Dragón Titán Luz", imagen: require('../img/dragontitan.png'), precio: 281 },
  ]
};

const Dragones = () => {
  const { agregarAlCarrito } = useCarrito();

  // --- INICIO CÓDIGO AÑADIDO PARA LA BÚSQUEDA ---

  // Estado para guardar lo que el usuario escribe en el campo de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para guardar los dragones que se mostrarán después de aplicar el filtro
  const [filteredDragones, setFilteredDragones] = useState(todosLosDragonesEstaticos);

  // useEffect se ejecuta cada vez que 'searchTerm' cambia
  useEffect(() => {
    // Si el campo de búsqueda está vacío, mostramos todos los dragones originales
    if (searchTerm === '') {
      setFilteredDragones(todosLosDragonesEstaticos);
      return; // Salimos de la función
    }

    // Convertimos el término de búsqueda a minúsculas para que la búsqueda no distinga mayúsculas/minúsculas
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredDragones = {}; // Objeto para guardar los dragones que coinciden

    // Recorremos cada categoría de dragones (fuego, agua, etc.)
    for (const tipo in todosLosDragonesEstaticos) {
      // Filtramos los dragones dentro de cada categoría
      newFilteredDragones[tipo] = todosLosDragonesEstaticos[tipo].filter(dragon =>
        // Verificamos si el nombre del dragón (en minúsculas) incluye el término de búsqueda
        dragon.nombre.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    // Actualizamos el estado con los dragones filtrados
    setFilteredDragones(newFilteredDragones);
  }, [searchTerm]); // La dependencia [searchTerm] hace que este efecto se ejecute cuando searchTerm cambie

  // Función que se llama cada vez que el usuario escribe en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualiza el estado 'searchTerm' con lo que el usuario escribe
  };

  // --- FIN CÓDIGO AÑADIDO PARA LA BÚSQUEDA ---


  return (
    <div className="container py-5 text-white">

      {/* --- INICIO JSX AÑADIDO PARA EL CAMPO DE BÚSQUEDA --- */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Buscar dragón por nombre..."
          value={searchTerm} // El valor del input está controlado por el estado 'searchTerm'
          onChange={handleSearchChange} // Cuando el input cambia, se llama a handleSearchChange
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }} // Estilos básicos
        />
      </div>
      {/* --- FIN JSX AÑADIDO PARA EL CAMPO DE BÚSQUEDA --- */}

      {/* Elementos centrados (esto es el código original de tu compañera) */}
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

      {/* Dragones por tipo (AHORA USANDO filteredDragones EN LUGAR DE dragones ORIGINALES) */}
      {/* Si filteredDragones está vacío después de aplicar el filtro, mostramos un mensaje */}
      {Object.values(filteredDragones).flat().length === 0 && searchTerm !== '' ? (
          <p className="text-center text-white">No se encontraron dragones que coincidan con la búsqueda.</p>
      ) : (
        // Si hay dragones filtrados, o si la búsqueda está vacía (mostrando todos), renderizamos esto
        Object.entries(filteredDragones).map(([tipo, lista]) => (
          // Solo muestra la sección del tipo si hay dragones que coinciden con la búsqueda dentro de ese tipo
          lista.length > 0 && (
            <div key={tipo} id={tipo} className="section-dragones">
              <h2 className={`text-center mb-4 titulo-${tipo}`}>
                Dragones de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </h2>
              <div className="row1 justify-content-center">
                {lista.map((dragon, idx) => (
                  // Usamos dragon.id si existe, si no, idx. Es importante para las 'keys' de React.
                  <div key={dragon.id || idx} className={`dragon-card card-${tipo}`}>
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
          )
        ))
      )}
    </div>
  );
};

export default Dragones;