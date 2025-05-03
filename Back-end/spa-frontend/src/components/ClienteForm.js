import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';

const ClienteForm = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const agregarCliente = () => {
        alert(`Cliente agregado: ${JSON.stringify(cliente)}`);
        setCliente({ nombre: '', apellido: '', telefono: '', email: '' });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Agregar Cliente
            </Typography>
            <TextField
                label="Nombre"
                name="nombre"
                value={cliente.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Apellido"
                name="apellido"
                value={cliente.apellido}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Teléfono"
                name="telefono"
                value={cliente.telefono}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                value={cliente.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={agregarCliente}>
                Agregar Cliente
            </Button>
        </Container>
    );
};

export default ClienteForm;