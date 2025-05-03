import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8D6E63', // Marrón madera
        },
        secondary: {
            main: '#BDBDBD', // Gris claro
        },
        background: {
            default: '#FAF9F6', // Fondo beige claro
            paper: '#FFFFFF', // Fondo blanco para tarjetas y contenedores
        },
        text: {
            primary: '#333333', // Texto gris oscuro
            secondary: '#757575', // Texto gris medio
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Fuente principal
        h1: {
            fontFamily: 'Playfair Display, serif', // Fuente para títulos grandes
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#333333',
        },
        h2: {
            fontFamily: 'Playfair Display, serif',
            fontWeight: 400,
            fontSize: '2rem',
            color: '#333333',
        },
        body1: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1rem',
            color: '#757575',
        },
        button: {
            textTransform: 'none', // Evita que los botones estén en mayúsculas
        },
    },
    shape: {
        borderRadius: 10, // Bordes redondeados
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '10px 20px',
                    fontSize: '16px',
                },
                containedPrimary: {
                    backgroundColor: '#8D6E63', // Marrón madera
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#6D4C41', // Marrón más oscuro
                    },
                },
            },
        },
    },
});

export default theme;