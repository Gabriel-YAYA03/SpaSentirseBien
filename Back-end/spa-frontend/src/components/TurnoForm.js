import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, MenuItem, Box } from '@mui/material';
import api from '../api';
import Swal from 'sweetalert2';

const TurnoForm = () => {
  const [nuevoTurno, setNuevoTurno] = useState({
    fecha: '',
    hora: '',
    tipo_servicio: '',
    email: '',
    telefono: '',
  });

  const servicios = [
    { id: 1, nombre: 'Masajes' },
    { id: 2, nombre: 'Tratamientos Faciales' },
    { id: 3, nombre: 'Tratamientos Corporales' },
    { id: 4, nombre: 'Belleza' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoTurno({ ...nuevoTurno, [name]: value });
  };

  const solicitarTurno = () => {
    // Validar campos obligatorios
    if (!nuevoTurno.fecha || !nuevoTurno.hora || !nuevoTurno.tipo_servicio || !nuevoTurno.email) {
      Swal.fire('Error', 'Por favor complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Datos enviados al backend:', nuevoTurno); // Verifica los datos aquí

    // Enviar datos al backend
    api.post('/turno_cliente', nuevoTurno) // Cambiado a /turno_cliente
      .then(() => {
        Swal.fire('Éxito', 'Su turno ha sido solicitado exitosamente.', 'success');
        setNuevoTurno({
          fecha: '',
          hora: '',
          tipo_servicio: '',
          email: '',
          telefono: '',
        });
      })
      .catch((error) => {
        console.error('Error al solicitar turno:', error);
        Swal.fire('Error', 'Hubo un problema al solicitar el turno. Intente nuevamente.', 'error');
      });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url("/images/background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Fondo translúcido */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />
      {/* Contenido */}
      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontFamily: 'Serif',
            color: '#42671e',
            marginBottom: '20px',
          }}
        >
          Solicitar Turno
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              name="fecha"
              label="Fecha"
              value={nuevoTurno.fecha}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="time"
              name="hora"
              label="Hora"
              value={nuevoTurno.hora}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              name="tipo_servicio"
              label="Tipo de Servicio"
              value={nuevoTurno.tipo_servicio}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiInputLabel-root': {
                  whiteSpace: 'nowrap', // Evita que el texto del label se divida en varias líneas
                  overflow: 'visible', // Asegura que el texto no se corte
                  textOverflow: 'unset', // Permite que el texto se muestre completo
                },
              }}
            >
              {servicios.map((servicio) => (
                <MenuItem key={servicio.id} value={servicio.nombre}>
                  {servicio.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Correo Electrónico"
              value={nuevoTurno.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="tel"
              name="telefono"
              label="Teléfono (opcional)"
              value={nuevoTurno.telefono}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={solicitarTurno}
              sx={{
                backgroundColor: '#42671e',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#5d9229',
                },
              }}
            >
              Solicitar Turno
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TurnoForm;