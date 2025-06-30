import React from 'react';
import './app.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Compra from './pages/ingresar';
import Perfil from './pages/perfil';
import Navbar from './components/navbar'
import Registrar from './pages/registrar';
import Actualizar from './pages/actualizar';
import Tickets from './pages/tickets';
import Comprar from './pages/comprar';
import Evento from './pages/evento';
import Contacto from './pages/contacto';
import CompraRealizada from './pages/compraRealizada';
import Footer from './components/footer'

 
function App() {
  return (
    <div className='contenedor'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/compras' element={<Compra/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/registrar' element={<Registrar/>}/>
        <Route path='/actualizar' element={<Actualizar/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/comprar' element={<Comprar/>}></Route>
        <Route path='/evento' element={<Evento/>}></Route>
        <Route path='/contacto' element={<Contacto/>}></Route>
        <Route path='/compraRealizada' element={<CompraRealizada/>}></Route>
      </Routes>
      <Footer/>      
    </div>
  )
}

export default App
