import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

// Componentes
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage'; // Página de inicio de sesión
import HomePage from './components/HomePage'; // Página principal
import ServiciosVista from './components/ServiciosVista'; // Página de servicios
import TurnoForm from './components/TurnoForm'; // Página para solicitar un turno

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* Página principal */}
                    <Route path="/login" element={<LoginPage />} /> {/* Página de inicio de sesión */}
                    <Route path="/register" element={<RegisterForm />} /> {/* Página de registro */}
                    <Route path="/servicios" element={<ServiciosVista />} /> {/* Página de servicios */}
                    <Route path="/solicitar-turno" element={<TurnoForm />} /> {/* Página para solicitar turnos */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;