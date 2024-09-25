import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import './ActualizarLibro.css'; // Asegúrate de importar el archivo CSS

function ActualizarLibro() {
    const { id } = useParams(); // Obtener el id del libro desde la URL
    const navigate = useNavigate();

    const [libro, setLibro] = useState({
        ISBN: '',
        nombreLibro: '',
        autor: '',
        editorial: '',
        portada: '',
        paginas: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validator] = useState(new SimpleReactValidator());

    // Obtener los datos del libro cuando el componente se monta
    useEffect(() => {
        axios.get(`http://localhost:3000/api/libros/${id}`)
            .then(response => {
                setLibro(response.data);
            })
            .catch(error => {
                console.error('Hubo un problema al obtener los datos del libro:', error);
            });
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLibro({
            ...libro,
            portada: file // Guarda el archivo en lugar de una URL
        });
    };
    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        setLibro({
            ...libro,
            [e.target.name]: e.target.value
        });
    };


    // Manejar el envío del formulario para actualizar los datos
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            const formData = new FormData();
            formData.append('ISBN', libro.ISBN);
            formData.append('nombreLibro', libro.nombreLibro);
            formData.append('autor', libro.autor);
            formData.append('editorial', libro.editorial);
            formData.append('portada', libro.portada); // archivo de portada
            formData.append('paginas', libro.paginas);

            axios.put(`http://localhost:3000/api/libros/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(() => {
                    setSuccessMessage('Libro actualizado exitosamente');
                    setErrorMessage('');
                    navigate('/libro/listar'); // Redirigir a la lista de libros
                })
                .catch(error => {
                    console.error('Hubo un problema al actualizar los datos del libro:', error);
                    setErrorMessage('Hubo un problema al actualizar los datos del libro.');
                    setSuccessMessage('');
                });
        } else {
            validator.showMessages();
            setErrorMessage('Por favor, corrige los errores en el formulario.');
            setSuccessMessage('');
        }
    };
    const getFotoUrl = (portada) => {
        return `http://localhost:3000/api/upload/${portada}`;
    };

    return (
        <div className="form-container">
            <h2>Actualizar Libro</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>ISBN</label>
                <input
                    type="text"
                    name="ISBN"
                    value={libro.ISBN}
                    onChange={handleInputChange}
                />
                <span className="error-message">{validator.message('ISBN', libro.ISBN, 'required|alpha_num')}</span>

                <label>Nombre del Libro</label>
                <input
                    type="text"
                    name="nombreLibro"
                    value={libro.nombreLibro}
                    onChange={handleInputChange}
                />
                <span className="error-message">{validator.message('nombreLibro', libro.nombreLibro, 'required|alpha_space')}</span>

                <label>Autor</label>
                <input
                    type="text"
                    name="autor"
                    value={libro.autor}
                    onChange={handleInputChange}
                />
                <span className="error-message">{validator.message('autor', libro.autor, 'required|alpha_space')}</span>

                <label>Editorial</label>
                <input
                    type="text"
                    name="editorial"
                    value={libro.editorial}
                    onChange={handleInputChange}
                />
                <span className="error-message">{validator.message('editorial', libro.editorial, 'required|alpha_space')}</span>

                <div>{libro.portada ? (
                    <img
                        src={getFotoUrl(libro.portada)}
                        alt="Portada del libro"
                    />
                ) : (
                    <p>Sin portada</p>
                )}</div>
                <label>Portada (Imagen)</label>
                <input
                    type="file"
                    name="portada"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <span className="error-message">{validator.message('portada', libro.portada, 'required')}</span>

                <label>Páginas</label>
                <input
                    type="number"
                    name="paginas"
                    value={libro.paginas}
                    onChange={handleInputChange}
                />
                <span className="error-message">{validator.message('paginas', libro.paginas, 'required|numeric')}</span>

                <button type="submit">Actualizar Libro</button>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default ActualizarLibro;
