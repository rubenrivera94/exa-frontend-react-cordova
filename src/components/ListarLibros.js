import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListarLibros.css'; // Asegúrate de importar el archivo CSS

function ListarLibros({ libros = [], limite }) {
    const [librosInternos, setLibrosInternos] = useState(libros);
    const navigate = useNavigate();

    useEffect(() => {
        // Solo hacer la solicitud a la API si no se ha pasado la lista de libros como prop
        if (libros.length === 0) {
            axios.get('http://localhost:3000/api/libros')
                .then(response => {
                    if (limite) {
                        setLibrosInternos(response.data.slice(0, limite));
                    } else {
                        setLibrosInternos(response.data);
                    }
                })
                .catch(error => {
                    console.error('Hubo un problema al obtener la lista de libros:', error);
                });
        } else {
            setLibrosInternos(libros);
        }
    }, [libros, limite]);

    const handleFilaClick = (id) => {
        navigate(`/libro/detalle/${id}`);
    };

    const getFotoUrl = (portada) => {
        return `http://localhost:3000/api/upload/${portada}`;
    };

    return (
        <div className="table-container">
            <h2>{limite ? 'Últimos Libros' : 'Lista de Libros'}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Nombre del Libro</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {librosInternos.map(libro => (
                        <tr key={libro._id}>
                            <td>
                                {libro.portada ? (
                                    <img
                                        src={getFotoUrl(libro.portada)}
                                        alt="Portada del libro"
                                        style={{ width: '50px', height: '75px' }} // Tamaño ajustado
                                    />
                                ) : (
                                    <p>Sin portada</p>
                                )}
                            </td>
                            <td>{libro.nombreLibro}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.editorial}</td>
                            <td>
                                <button onClick={() => handleFilaClick(libro._id)}>
                                    Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarLibros;
