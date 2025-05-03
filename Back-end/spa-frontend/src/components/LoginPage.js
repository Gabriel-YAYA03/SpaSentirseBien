import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación interna
import LoginForm from './LoginForm'; // Importamos el formulario de inicio de sesión

const LoginPage = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(https://source.unsplash.com/random)', // Imagen del spa
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Bienvenido al spa "Sentirse Bien"
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Regístrate o inicia sesión para explorar nuestros servicios y reservar tu turno.
                </Typography>
                <div>
                    <LoginForm /> {/* Aquí se muestra el formulario */}
                    <p style={{ marginTop: '20px' }}>
                        O si no tienes una cuenta,{' '}
                        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
                            regístrate aquí
                        </Link>.
                    </p>
                </div>
            </Container>
        </Box>
    );
};

export default LoginPage;