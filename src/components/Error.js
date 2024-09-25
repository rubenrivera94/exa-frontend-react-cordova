import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404 - Página no encontrada</h1>
            <p style={styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" style={styles.link}>
                Volver al inicio
            </Link>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '100px',
    },
    title: {
        fontSize: '48px',
        color: '#ff6b6b',
    },
    message: {
        fontSize: '24px',
        color: '#333',
    },
    link: {
        fontSize: '20px',
        color: '#4caf50',
        textDecoration: 'none',
        marginTop: '20px',
        display: 'inline-block',
    },
};

export default Error;
