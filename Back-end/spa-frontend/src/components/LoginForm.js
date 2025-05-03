import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        contraseña: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar datos al backend
        api.post('/login', {
            email: formData.email,
            contraseña: formData.contraseña,
        })
        .then((response) => {
            Swal.fire('Inicio de sesión exitoso', 'Bienvenido a tu cuenta', 'success');
            console.log('Token recibido:', response.data.token); // Guarda el token si usas JWT
            // Redirigir a la página principal
            window.location.href = '/home';
        })
        .catch((error) => {
            console.error('Error al iniciar sesión:', error);
            Swal.fire('Error', error.response.data.error || 'Correo o contraseña incorrectos', 'error');
        });
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Correo Electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Container>
    );
};

export default LoginForm;