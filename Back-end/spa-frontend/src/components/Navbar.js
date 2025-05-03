import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
    const token = localStorage.getItem('token');

    return (
        <AppBar position="static" sx={{ backgroundColor: '#A5D6A7' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Serif', color: '#2E7D32' }}>
                    Sentirse Bien
                </Typography>
                <Button color="inherit" startIcon={<HomeIcon />} href="/">
                    Home
                </Button>
                <Button color="inherit" startIcon={<ContactMailIcon />} href="/contact">
                    Contact Us
                </Button>
                {token ? (
                    <Button color="inherit" startIcon={<AccountCircleIcon />} href="/cuenta">
                        Cuenta
                    </Button>
                ) : (
                    <Button color="inherit" startIcon={<LoginIcon />} href="/login">
                        Iniciar Sesión
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;