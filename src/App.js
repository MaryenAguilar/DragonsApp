import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Dragones from './pages/Dragones';
import Carrito from './pages/Carrito';
import BotonCarrito from './components/BotonCarrito';
import Noticias from './pages/Noticias';
import IniciarSesion from './pages/IniciarSesion';
import CrearCuenta from './pages/CrearCuenta';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/dragones" element={<Dragones />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<CrearCuenta />} />
      </Routes>
      <Footer />
      <BotonCarrito />
    </Router>
  );
}

export default App;