const express = require('express');
const db = require('../db');
const { empleadoSchema } = require('../validators/empleadoValidator');
const router = express.Router();

// Obtener empleados
router.get('/empleados', (req, res) => {
    db.query('SELECT * FROM empleado', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al obtener empleados' });
        } else {
            res.send(results);
        }
    });
});

// Crear empleado
router.post('/empleados', (req, res) => {
    const { error } = empleadoSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { nombre, apellido, especialidad, telefono, email } = req.body;
    db.query(
        `INSERT INTO empleado (nombre, apellido, especialidad, telefono, email)
        VALUES (?, ?, ?, ?, ?)`,
        [nombre, apellido, especialidad, telefono, email],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al agregar empleado' });
            } else {
                res.send({ message: 'Empleado agregado exitosamente' });
            }
        }
    );
});

// Actualizar empleado
router.put('/empleados/:id', (req, res) => {
    const { error } = empleadoSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const id = req.params.id;
    const { nombre, apellido, especialidad, telefono, email } = req.body;
    db.query(
        `UPDATE empleado SET nombre = ?, apellido = ?, especialidad = ?, telefono = ?, email = ? WHERE id_empleado = ?`,
        [nombre, apellido, especialidad, telefono, email, id],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al actualizar empleado' });
            } else {
                res.send({ message: 'Empleado actualizado exitosamente' });
            }
        }
    );
});

// Eliminar empleado
router.delete('/empleados/:id', (req, res) => {
    const id = req.params.id;

    // Validar que el ID proporcionado sea válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).send({ error: 'El ID proporcionado no es válido' });
    }

    db.query('DELETE FROM empleado WHERE id_empleado = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar empleado' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: 'Empleado no encontrado' });
        } else {
            res.send({ message: 'Empleado eliminado exitosamente' });
        }
    });
});

module.exports = router;