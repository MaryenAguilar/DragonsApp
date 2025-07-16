import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/IniciarSesion.css';
import dragonLogin from '../img/dragoninicio.png';

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      setNombreUsuario(usuario.nombre);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch("http://localhost/backend-php/login_usuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensaje && data.usuario) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          setNombreUsuario(data.usuario.nombre);

          Swal.fire({
            title: `¡Hola, ${data.usuario.nombre}!`,
            text: data.mensaje,
            icon: 'success',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0b64fb',
            confirmButtonText: 'Continuar'
          }).then(() => {
            navigate('/');
          });
        } else {
          Swal.fire({
            title: 'Error al iniciar sesión',
            text: data.error || 'Verifica tus datos',
            icon: 'error',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0b64fb',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#0b64fb',
          confirmButtonText: 'Cerrar'
        });
        console.error(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: value
    });
    if (forgotPasswordErrors[name]) {
      setForgotPasswordErrors({
        ...forgotPasswordErrors,
        [name]: ''
      });
    }
  };

  const validateForgotPasswordForm = () => {
    const newErrors = {};
    if (!forgotPasswordData.nombre.trim()) {
      newErrors.nombre = 'El nombre de usuario es obligatorio';
    }
    if (!forgotPasswordData.nuevaPassword) {
      newErrors.nuevaPassword = 'La nueva contraseña es obligatoria';
    } else if (forgotPasswordData.nuevaPassword.length < 6) {
      newErrors.nuevaPassword = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!forgotPasswordData.confirmarPassword) {
      newErrors.confirmarPassword = 'Confirma tu nueva contraseña';
    } else if (forgotPasswordData.nuevaPassword !== forgotPasswordData.confirmarPassword) {
      newErrors.confirmarPassword = 'Las contraseñas no coinciden';
    }
    setForgotPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!validateForgotPasswordForm()) return;

    fetch("http://localhost/backend-php/reset_password.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: forgotPasswordData.nombre,
        nuevaPassword: forgotPasswordData.nuevaPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensaje) {
          Swal.fire({
            title: '¡Contraseña actualizada!',
            text: 'Tu contraseña ha sido cambiada exitosamente',
            icon: 'success',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0b64fb',
            confirmButtonText: 'Continuar'
          }).then(() => {
            setShowForgotPassword(false);
            setForgotPasswordData({
              nombre: '',
              nuevaPassword: '',
              confirmarPassword: ''
            });
            setForgotPasswordErrors({});
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: data.error || 'No se pudo actualizar la contraseña',
            icon: 'error',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#0b64fb',
            confirmButtonText: 'Intentar de nuevo'
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor',
          icon: 'error',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#0b64fb',
          confirmButtonText: 'Cerrar'
        });
        console.error(err);
      });
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setForgotPasswordData({
      nombre: '',
      nuevaPassword: '',
      confirmarPassword: ''
    });
    setForgotPasswordErrors({});
  };
  return (
    <div className="login-container">
      <div className="login-bg">
        <div className="container">
          <div className="login-content">
            <div className="login-image-section">
              <img src={dragonLogin} alt="Dragón de Login" className="login-dragon" />
              <div className="welcome-text">
                <h2>
                  ¡BIENVENIDO DE VUELTA
                  {nombreUsuario ? `, ${nombreUsuario.toUpperCase()}!` : '!'}
                </h2>
                <p>Regresa a tu aventura épica con los dragones más poderosos</p>
              </div>
            </div>
            <div className="login-form-section">
              <div className="login-form-container">
                <h3>Iniciar Sesión</h3>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? 'error' : ''}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                  <button type="submit" className="login-button">INICIAR SESIÓN</button>
                </form>
                <div className="login-footer">
                  <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                  <p>
                    <button 
                      type="button" 
                      className="forgot-password-link"
                      onClick={handleForgotPasswordClick}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Olvidé mi Contraseña */}
      {showForgotPassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Restablecer Contraseña</h3>
              <button 
                type="button" 
                className="close-modal"
                onClick={closeForgotPasswordModal}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre de Usuario</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={forgotPasswordData.nombre}
                  onChange={handleForgotPasswordInputChange}
                  className={forgotPasswordErrors.nombre ? 'error' : ''}
                  placeholder="Ingresa tu nombre de usuario"
                />
                {forgotPasswordErrors.nombre && <span className="error-message">{forgotPasswordErrors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="nuevaPassword">Nueva Contraseña</label>
                <input
                  type="password"
                  id="nuevaPassword"
                  name="nuevaPassword"
                  value={forgotPasswordData.nuevaPassword}
                  onChange={handleForgotPasswordInputChange}
                  className={forgotPasswordErrors.nuevaPassword ? 'error' : ''}
                  placeholder="Ingresa tu nueva contraseña"
                />
                {forgotPasswordErrors.nuevaPassword && <span className="error-message">{forgotPasswordErrors.nuevaPassword}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmarPassword">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  id="confirmarPassword"
                  name="confirmarPassword"
                  value={forgotPasswordData.confirmarPassword}
                  onChange={handleForgotPasswordInputChange}
                  className={forgotPasswordErrors.confirmarPassword ? 'error' : ''}
                  placeholder="Confirma tu nueva contraseña"
                />
                {forgotPasswordErrors.confirmarPassword && <span className="error-message">{forgotPasswordErrors.confirmarPassword}</span>}
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={closeForgotPasswordModal}>
                  Cancelar
                </button>
                <button type="submit" className="submit-button">
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IniciarSesion;
