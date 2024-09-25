import React, { useState } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate } from 'react-router-dom';
import './AgregarLibro.css'; // Asegúrate de importar el archivo CSS

function AgregarLibro() {
    const navigate = useNavigate();
    const [libro, setLibro] = useState({
        ISBN: '',
        nombreLibro: '',
        autor: '',
        editorial: '',
        portada: '',
        paginas: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validator] = useState(new SimpleReactValidator());

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setLibro({
                ...libro,
                [name]: checked
            });
        } else {
            setLibro({
                ...libro,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLibro({
            ...libro,
            portada: file // Guarda el archivo en lugar de una URL
        });
    };

    const enviarDatos = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            try {
                const formData = new FormData();
                formData.append('ISBN', libro.ISBN);
                formData.append('nombreLibro', libro.nombreLibro);
                formData.append('autor', libro.autor);
                formData.append('editorial', libro.editorial);
                formData.append('portada', libro.portada);
                formData.append('paginas', libro.paginas);

                await axios.post('http://localhost:3000/api/libros', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setSuccessMessage('Libro agregado exitosamente');
                setErrorMessage('');
                navigate('/libro/listar'); // Redirigir al listado de libros
            } catch (error) {
                console.error(error);
                setErrorMessage('Error al agregar el libro');
                setSuccessMessage('');
            }
        } else {
            validator.showMessages();
            setErrorMessage('Por favor, corrige los errores en el formulario.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <h2>Agregar Libro</h2>
            <form onSubmit={enviarDatos} encType="multipart/form-data">
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

                <button type="submit">Agregar Libro</button>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default AgregarLibro;
