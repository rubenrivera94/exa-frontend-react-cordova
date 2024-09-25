import React from 'react';
import ListarLibros from './ListarLibros'; // Asegúrate de importar el componente

function Inicio() {
    return (
        <div>
            <h1>Bienvenido a Mi Biblioteca</h1>
            
            {/* Vista previa de los últimos 5 pacientes */}
            <ListarLibros limite={3} />
        </div>
    );
}

export default Inicio;
