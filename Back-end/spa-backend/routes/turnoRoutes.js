const express = require('express');
const db = require('../db');
const { turnoSchema } = require('../validators/turnoValidator');
const router = express.Router();

// Obtener turnos (opcionalmente filtrar por estado)
router.get('/turnos', (req, res) => {
    const { estado } = req.query;

    if (estado && !['pendiente', 'confirmado', 'cancelado'].includes(estado)) {
        return res.status(400).send({ error: 'El estado proporcionado no es válido' });
    }

    db.query('SELECT * FROM turno', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al obtener turnos' });
        } else {
            res.send(results);
        }
    });
});

// Crear turno
router.post('/turnos', (req, res) => {
    const { error } = turnoSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { fecha, hora, estado, id_cliente, id_servicio, id_empleado, comentarios } = req.body;
    db.query(
        'INSERT INTO turno (fecha, hora, estado, id_cliente, id_servicio, id_empleado, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [fecha, hora, estado, id_cliente, id_servicio, id_empleado, comentarios],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al agregar turno' });
            } else {
                res.send({ message: 'Turno agregado exitosamente' });
            }
        }
    );
});

// Actualizar turno
router.put('/turnos/:id', (req, res) => {
    const { error } = turnoSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const id = req.params.id;
    const { fecha, hora, estado, comentarios } = req.body;
    db.query(
        'UPDATE turno SET fecha = ?, hora = ?, estado = ?, comentarios = ? WHERE id_turno = ?',
        [fecha, hora, estado, comentarios, id],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al actualizar turno' });
            } else {
                res.send({ message: 'Turno actualizado exitosamente' });
            }
        }
    );
});

// Eliminar turno
router.delete('/turnos/:id', (req, res) => {
    const id = req.params.id;

    // Validar que el ID proporcionado sea válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).send({ error: 'El ID proporcionado no es válido' });
    }

    db.query('DELETE FROM turno WHERE id_turno = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar turno' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: 'Turno no encontrado' });
        } else {
            res.send({ message: 'Turno eliminado exitosamente' });
        }
    });
});

module.exports = router;