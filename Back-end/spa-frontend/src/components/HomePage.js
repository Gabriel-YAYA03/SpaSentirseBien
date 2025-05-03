import React from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';

const HomePage = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                backgroundImage: 'url("/images/background.png")', // Ruta de tu imagen
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh', // Que cubra toda la pantalla
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Superposición blanca translúcida para opacidad
                    zIndex: 1,
                },
            }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                {/* Títulos y botones */}
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontFamily: 'Serif',
                        color: '#ebe3e1', // Gris claro y apagado
                        letterSpacing: '2px',
                    }}
                >
                    Bienvenido al Spa "Sentirse Bien"
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                        fontFamily: 'Cursive',
                        color: '#ebe3e1', // Gris ligeramente más oscuro
                    }}
                >
                    Explora nuestros servicios, reserva turnos y descubre más acerca de nosotros.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<SpaIcon />}
                            href="/servicios"
                            sx={{
                                backgroundColor: '#42671e', // Gris claro para el fondo del botón
                                color: '#ebe3e1', // Gris oscuro para el texto
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: '#5d9229', // Gris ligeramente más oscuro al hacer hover
                                },
                            }}
                        >
                            Ver Servicios
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<CalendarTodayIcon />}
                            href="/solicitar-turno"
                            sx={{
                                backgroundColor: '#674d1e', // Gris claro
                                color: '#ebe3e1', // Gris oscuro
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: '#928829', // Gris ligeramente más oscuro
                                },
                            }}
                        >
                            Reservar Turno
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            startIcon={<InfoIcon />}
                            href="/info-spa"
                            sx={{
                                color: '#ebe3e1', // Gris oscuro para el texto
                                backgroundColor: '#1e6758', // Gris claro para el borde
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: '#29925b', // Gris muy claro en el fondo
                                },
                            }}
                        >
                            Información del Spa
                        </Button>
                    </Grid>
                </Grid>
    </Container>
</Box>
    );
};

export default HomePage;