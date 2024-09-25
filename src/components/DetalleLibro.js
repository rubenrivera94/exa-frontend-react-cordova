import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './DetalleLibro.css'; // Asegúrate de importar el archivo CSS

function DetalleLibro() {
    const { id } = useParams(); // Obtener el id del libro desde la URL
    const [libro, setLibro] = useState(null);
    const navigate = useNavigate(); // Para redireccionar después de eliminar

    // Obtener los datos del libro cuando el componente se monta
    useEffect(() => {
        axios.get(`http://localhost:3000/api/libros/${id}`)
            .then(response => {
                setLibro(response.data);
            })
            .catch(error => {
                console.error('Hubo un problema al obtener los detalles del libro:', error);
            });
    }, [id]);

    // Función para manejar la eliminación del libro
    const handleEliminar = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            axios.delete(`http://localhost:3000/api/libros/${id}`)
                .then(() => {
                    alert('Libro eliminado exitosamente.');
                    navigate('/libro/listar'); // Redireccionar a la lista de libros
                })
                .catch(error => {
                    console.error('Hubo un problema al eliminar el libro:', error);
                });
        }
    };

    // Si no se han cargado los datos del libro, mostrar un mensaje de carga
    if (!libro) {
        return <div>Cargando detalles del libro...</div>;
    }

    const getFotoUrl = (portada) => {
        return `http://localhost:3000/api/upload/${portada}`;
    };

    return (
        <div className="detalle-libro-container">
            <h2 className="detalle-libro-titulo">Detalle del Libro</h2>
            <div className="detalle-libro-info">
                {/* Mostrar portada solo si existe */}
                <div className="detalle-libro-portada">
                    {libro.portada ? (
                        <img
                            src={getFotoUrl(libro.portada)}
                            alt="Portada del libro"
                            className="portada-imagen"
                        />
                    ) : (
                        <p className="sin-portada">Sin portada disponible</p>
                    )}
                </div>
                <p><strong>ISBN:</strong> {libro.ISBN}</p>
                <p><strong>Nombre del Libro:</strong> {libro.nombreLibro}</p>
                <p><strong>Autor:</strong> {libro.autor}</p>
                <p><strong>Editorial:</strong> {libro.editorial}</p>
                <p><strong>Número de Páginas:</strong> {libro.paginas}</p>
            </div>

            {/* Links para actualizar o eliminar el libro */}
            <div className="detalle-libro-acciones">
                <Link to={`/libro/actualizar/${id}`} className="boton-actualizar">
                    Actualizar Libro
                </Link>
                <button onClick={handleEliminar} className="boton-eliminar">
                    Eliminar Libro
                </button>
            </div>
        </div>
    );
}

export default DetalleLibro;
