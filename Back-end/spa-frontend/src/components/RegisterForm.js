import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api'; // Asegúrate de tener configurado Axios

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        //telefono: '',
        email: '',
        contraseña: '',
        confirmarContraseña: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validar que las contraseñas coincidan
        if (formData.contraseña !== formData.confirmarContraseña) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }
    
        // Enviar datos al backend
        api.post('/clientes', {
            nombre: formData.nombre,
            apellido: formData.apellido,
            telefono: formData.telefono, // Incluye el campo teléfono
            email: formData.email,
            contraseña: formData.contraseña, // Incluye la contraseña encriptada en el backend
        })
        .then(() => {
            Swal.fire('Registro exitoso', 'Usuario registrado correctamente', 'success');
            setFormData({
                nombre: '',
                apellido: '',
                telefono: '',
                email: '',
                contraseña: '',
                confirmarContraseña: '',
            });
        })
        .catch((error) => {
            console.error('Error al registrar:', error);
            Swal.fire('Error', error.response.data.error || 'Hubo un problema con el registro', 'error');
        });
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Regístrate
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
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
                <TextField
                    label="Confirmar Contraseña"
                    type="password"
                    name="confirmarContraseña"
                    value={formData.confirmarContraseña}
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
                    Registrarse
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterForm;