import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';

const ServiciosVista = () => {
  const serviciosData = [
    {
      categoria: 'Servicios Individuales',
      subcategorias: [
        {
          nombre: 'Masajes',
          servicios: ['Anti-stress', 'Descontracturantes', 'Masajes con piedras calientes', 'Circulatorios'],
        },
        {
          nombre: 'Belleza',
          servicios: ['Lifting de pestaña', 'Depilación facial', 'Belleza de manos y pies'],
        },
        {
          nombre: 'Tratamientos Faciales',
          servicios: [
            'Punta de Diamante: Microexfoliación',
            'Limpieza profunda + Hidratación',
            'Crio frecuencia facial: efecto lifting instantáneo',
          ],
        },
        {
          nombre: 'Tratamientos Corporales',
          servicios: [
            'VelaSlim: Reducción de la circunferencia corporal y la celulitis',
            'DermoHealth: drenaje linfático',
            'Criofrecuencia: efecto lifting instantáneo',
            'Ultracavitación: Técnica reductora',
          ],
        },
      ],
    },
    {
      categoria: 'Servicios Grupales',
      subcategorias: [
        {
          nombre: '',
          servicios: ['Hidromasajes', 'Yoga'],
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url("/images/background.png")', // Ruta de tu imagen
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro translúcido
          zIndex: 1,
        }}
      />
      {/* Contenido */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '20px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontFamily: 'Serif',
            color: '#ffffff', // Letras más claras
            marginBottom: '30px',
          }}
        >
          Nuestros Servicios
        </Typography>
        {serviciosData.map((categoria, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Serif',
                color: '#ffffff', // Letras más claras
                marginBottom: '20px',
              }}
            >
              {categoria.categoria}
            </Typography>
            <Grid container spacing={4}>
              {categoria.subcategorias.map((subcategoria, subIndex) => (
                <Grid item xs={12} sm={6} md={4} key={subIndex}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco con transparencia
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Sombra más pronunciada
                      borderRadius: '15px', // Bordes más redondeados
                      border: '1px solid rgba(0, 0, 0, 0.1)', // Borde sutil
                      overflow: 'hidden',
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'Cursive',
                          color: '#42671e', // Verde para los títulos
                          marginBottom: '10px',
                          textAlign: 'center',
                        }}
                      >
                        {subcategoria.nombre || 'General'}
                      </Typography>
                      <ul style={{ paddingLeft: '20px', color: '#333' }}>
                        {subcategoria.servicios.map((servicio, servicioIndex) => (
                          <li key={servicioIndex} style={{ marginBottom: '5px' }}>
                            {servicio}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                      <Button
                        size="small"
                        sx={{
                          color: '#42671e',
                          '&:hover': {
                            color: '#5d9229',
                          },
                        }}
                      >
                        Más información
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </Container>
    </Box>
  );
};

export default ServiciosVista;