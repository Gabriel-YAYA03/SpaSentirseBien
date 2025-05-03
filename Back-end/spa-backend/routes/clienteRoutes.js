const express = require('express');
const db = require('../db');
const { clienteSchema } = require('../validators/clienteValidator');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate');

// Obtener clientes (protegido con autenticación)
router.get('/clientes', authenticate, (req, res) => {
    const { nombre, email } = req.query;

    if (nombre && nombre.length > 50) {
        return res.status(400).send({ error: 'El filtro de nombre no puede exceder los 50 caracteres' });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send({ error: 'El filtro de email no es válido' });
    }

    db.query('SELECT * FROM cliente', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al obtener clientes' });
        } else {
            res.send(results);
        }
    });
});

// Crear cliente
router.post('/clientes', async (req, res) => {
    console.log('Datos recibidos del frontend:', req.body);
    const { error } = clienteSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { nombre, apellido, telefono, email, contraseña } = req.body; // Incluye contraseña del formulario

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    db.query(
        'INSERT INTO cliente (nombre, apellido, telefono, email, contraseña) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, telefono, email, hashedPassword], // Guarda la contraseña encriptada
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al registrar cliente' });
            } else {
                res.send({ message: 'Cliente registrado exitosamente' });
            }
        }
    );
});

// Actualizar cliente (protegido con autenticación)
router.put('/clientes/:id', authenticate, (req, res) => {
    const { error } = clienteSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const id = req.params.id;
    const { nombre, apellido, telefono, email } = req.body;

    db.query(
        'UPDATE cliente SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE id_cliente = ?',
        [nombre, apellido, telefono, email, id],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al actualizar cliente' });
            } else {
                res.send({ message: 'Cliente actualizado exitosamente' });
            }
        }
    );
});


// Eliminar cliente (protegido con autenticación)
router.delete('/clientes/:id', authenticate, (req, res) => {
    const id = req.params.id;

    // Validar que el ID proporcionado sea válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).send({ error: 'El ID proporcionado no es válido' });
    }

    db.query('DELETE FROM cliente WHERE id_cliente = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar cliente' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: 'Cliente no encontrado' });
        } else {
            res.send({ message: 'Cliente eliminado exitosamente' });
        }
    });
});

// Inicio de sesión (login)
const jwt = require('jsonwebtoken'); // Para generar el token
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave segura

router.post('/login', (req, res) => {
    const { email, contraseña } = req.body;

    // Validar que ambos campos existan
    if (!email || !contraseña) {
        return res.status(400).send({ error: 'Correo y contraseña son obligatorios' });
    }

    // Buscar el cliente en la base de datos
    db.query('SELECT * FROM cliente WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send({ error: 'Correo o contraseña incorrectos' });
        }

        const cliente = results[0];

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, cliente.contraseña);
        if (!contraseñaValida) {
            return res.status(401).send({ error: 'Correo o contraseña incorrectos' });
        }

        // Generar un token
        const token = jwt.sign({ id: cliente.id_cliente, email: cliente.email }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.send({ message: 'Inicio de sesión exitoso', token });
    });
});

module.exports = router;