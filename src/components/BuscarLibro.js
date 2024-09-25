import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListarLibros from './ListarLibros'; // Asegúrate de que el path sea correcto
import './BuscarLibro.css'; // Importa el archivo CSS


function BuscarLibro() {
    const navigate = useNavigate(); // Permite realizar la navegación sin recargar la página

    const [filtros, setFiltros] = useState({
        nombreLibro: '',
        autor: '',
        editorial: ''
    });
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Manejar cambios en los campos de filtro
    const handleInputChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la búsqueda por filtros cuando se hace clic en "Buscar"
    const buscarLibros = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Elimina los filtros vacíos
            const params = { ...filtros };
            Object.keys(params).forEach(key => params[key] === '' && delete params[key]);

            // Actualiza la URL con los filtros
            const queryParams = new URLSearchParams(params).toString();
            navigate(`/libro/buscar?${queryParams}`);

            // Realiza la solicitud al backend
            const response = await axios.get('http://localhost:3000/api/libros/buscar', { params });

            setResultados(response.data); // Guardar los resultados de la búsqueda
        } catch (error) {
            setError('Error al buscar libros');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="buscar-libros">
            <h2>Buscar Libros</h2>
            <form onSubmit={buscarLibros}>
                <div className="input-container">
                    <label>Nombre del Libro</label>
                    
                    <input
                        type="text"
                        name="nombreLibro"
                        value={filtros.nombreLibro}
                        onChange={handleInputChange}
                    />

                    <label>Autor</label>
                    <input
                        type="text"
                        name="autor"
                        value={filtros.autor}
                        onChange={handleInputChange}
                    />

                    <label>Editorial</label>
                    <input
                        type="text"
                        name="editorial"
                        value={filtros.editorial}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="buscar-button">Buscar</button>
            </form>

            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : resultados.length > 0 ? (
                <ListarLibros libros={resultados} />
            ) : (
                <p>No se encontraron libros con los criterios seleccionados.</p>
            )}
        </div>
    );
}

export default BuscarLibro;
