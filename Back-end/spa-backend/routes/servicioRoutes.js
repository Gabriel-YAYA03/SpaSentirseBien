const express = require('express');
const db = require('../db');
const { servicioSchema } = require('../validators/servicioValidator');
const router = express.Router();

// Obtener servicios
router.get('/servicios', (req, res) => {
    db.query('SELECT * FROM servicio', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al obtener servicios' });
        } else {
            res.send(results);
        }
    });
});

// Crear servicio
router.post('/servicios', (req, res) => {
    const { error } = servicioSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { nombre, descripcion, tipo, duracion, precio } = req.body;
    db.query(
        `INSERT INTO servicio (nombre, descripcion, tipo, duracion, precio)
        VALUES (?, ?, ?, ?, ?)`,
        [nombre, descripcion, tipo, duracion, precio],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al agregar servicio' });
            } else {
                res.send({ message: 'Servicio agregado exitosamente' });
            }
        }
    );
});

// Actualizar servicio
router.put('/servicios/:id', (req, res) => {
    const { error } = servicioSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const id = req.params.id;
    const { nombre, descripcion, tipo, duracion, precio } = req.body;
    db.query(
        `UPDATE servicio SET nombre = ?, descripcion = ?, tipo = ?, duracion = ?, precio = ? WHERE id_servicio = ?`,
        [nombre, descripcion, tipo, duracion, precio, id],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al actualizar servicio' });
            } else {
                res.send({ message: 'Servicio actualizado exitosamente' });
            }
        }
    );
});

// Eliminar servicio
router.delete('/servicios/:id', (req, res) => {
    const id = req.params.id;

    // Validar que el ID proporcionado sea válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).send({ error: 'El ID proporcionado no es válido' });
    }

    db.query('DELETE FROM servicio WHERE id_servicio = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar servicio' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: 'Servicio no encontrado' });
        } else {
            res.send({ message: 'Servicio eliminado exitosamente' });
        }
    });
});

module.exports = router;