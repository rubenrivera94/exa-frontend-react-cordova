import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Importamos iconos
import './Nav.css'; // Importamos los estilos CSS
import { NavLink } from 'react-router-dom'; // Asegúrate de importar NavLink

function Nav() {
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            navigate('/libro/buscar');
        } else {
            navigate(`/libro/buscar/${searchTerm}`);
        }
        setSearchTerm('');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alternar visibilidad del menú
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Mi Biblioteca</h1>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
            <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to="/inicio" className="nav-link" activeClassName="active">Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/libro/nuevo" className="nav-link" activeClassName="active">Agregar Libro</NavLink>
                </li>
                <li>
                    <NavLink to="/libro/listar" className="nav-link" activeClassName="active">Listar Libros</NavLink>
                </li>
            </ul>

            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar libro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <FaSearch />
                </button>
            </form>
        </nav>
    );
}

export default Nav;
