import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import '../css/Contacto.css';

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost/backend-php/insertar.php', formulario)
      .then(res => {
        Swal.fire({
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos 📨',
          icon: 'success',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#0b64fb'
        });
        // Limpiar formulario
        setFormulario({ nombre: '', email: '', descripcion: '' });
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el mensaje',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#0b64fb'
        });
      });
  };

  return (
    <div className="contacto-container d-flex justify-content-center align-items-center">
      <form className="formulario-contacto p-4 w-100" onSubmit={handleSubmit}>
        <h2 className="text-white mb-4">CONTACTO</h2>
        <div className="mb-3">
          <input
            type="text"
            name="nombre"
            className="form-control custom-input"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control custom-input"
            placeholder="Email"
            value={formulario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="descripcion"
            className="form-control custom-input"
            rows="4"
            placeholder="Descripción"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn custom-btn w-100">ENVIAR</button>
      </form>
    </div>
  );
};

export default Contacto;
