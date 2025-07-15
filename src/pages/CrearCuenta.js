import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/IniciarSesion.css';
import dragonLogin from '../img/dragoninicio.png';

const CrearCuenta = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch("http://localhost/backend-php/registrar_usuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensaje) {
          Swal.fire({
            title: '¡Registro Exitoso!',
            text: data.mensaje,
            icon: 'success',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0b64fb',
            confirmButtonText: 'Iniciar sesión'
          }).then(() => {
            navigate("/iniciar-sesion");
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: data.error,
            icon: 'error',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0b64fb',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#0b64fb',
          confirmButtonText: 'Cerrar'
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-bg">
        <div className="container">
          <div className="login-content">
            <div className="login-image-section">
              <img src={dragonLogin} alt="Dragón de Registro" className="login-dragon" />
              <div className="welcome-text">
                <h2>¡ÚNETE A LA AVENTURA!</h2>
                <p>Crea tu cuenta y entrena dragones legendarios</p>
              </div>
            </div>
            <div className="login-form-section">
              <div className="login-form-container">
                <h3>Crear Cuenta</h3>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} className={errors.nombre ? 'error' : ''} />
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="password-input-container">
                      <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleInputChange} className={errors.password ? 'error' : ''} />
                      <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={errors.confirmPassword ? 'error' : ''} />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                  <button type="submit" className="login-button">REGISTRARSE</button>
                </form>
                <div className="login-footer">
                  <p>¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
