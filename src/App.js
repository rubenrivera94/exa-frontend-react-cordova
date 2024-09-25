import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Inicio from './components/Inicio';
import AgregarLibro from './components/AgregarLibro';
import ActualizarLibro from './components/ActualizarLibro';
import DetalleLibro from './components/DetalleLibro';
import ListarLibros from './components/ListarLibros';
import BuscarLibro from './components/BuscarLibro';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/libro/nuevo" element={<AgregarLibro />} />
        <Route path="/libro/actualizar/:id" element={<ActualizarLibro />} />
        <Route path="/libro/detalle/:id" element={<DetalleLibro />} />
        <Route path="/libro/listar" element={<ListarLibros />} />
        <Route path="/libro/buscar/:search" element={<BuscarLibro />} />
        <Route path="/libro/buscar" element={<BuscarLibro />} />
        <Route path="/redirect/:search" render={({ props }) => {
          const search = props.match.params.search;
          return <Navigate to={'/libro/buscar/' + search} />;
        }} />
        <Route path="*" element={<Error />} /> {/* Ruta para manejar páginas no encontradas */}
      </Routes>
    </div>
  );
}

export default App;
