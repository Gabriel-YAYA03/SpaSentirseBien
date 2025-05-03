const express = require('express');
const db = require('../db');
const { consultaSchema } = require('../validators/consultaValidator');
const router = express.Router();

// Obtener consultas (opcionalmente filtrar por estado)
router.get('/consultas', (req, res) => {
    const { estado } = req.query;

    if (estado && !['pendiente', 'respondida'].includes(estado)) {
        return res.status(400).send({ error: 'El estado proporcionado no es válido' });
    }

    db.query('SELECT * FROM consulta', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al obtener consultas' });
        } else {
            res.send(results);
        }
    });
});

// Crear consulta
router.post('/consultas', (req, res) => {
    const { error } = consultaSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { nombre, email, mensaje, estado } = req.body;
    db.query(
        `INSERT INTO consulta (nombre, email, mensaje, estado)
        VALUES (?, ?, ?, ?)`,
        [nombre, email, mensaje, estado],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al enviar consulta' });
            } else {
                res.send({ message: 'Consulta enviada exitosamente' });
            }
        }
    );
});

// Actualizar consulta
router.put('/consultas/:id', (req, res) => {
    const { estado } = req.body;

    if (estado && !['pendiente', 'respondida'].includes(estado)) {
        return res.status(400).send({ error: 'El estado proporcionado no es válido' });
    }

    const id = req.params.id;
    db.query(
        `UPDATE consulta SET estado = ? WHERE id_consulta = ?`,
        [estado, id],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al actualizar consulta' });
            } else {
                res.send({ message: 'Consulta actualizada exitosamente' });
            }
        }
    );
});

// Eliminar consulta
router.delete('/consultas/:id', (req, res) => {
    const id = req.params.id;

    // Validar que el ID proporcionado sea válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).send({ error: 'El ID proporcionado no es válido' });
    }

    db.query('DELETE FROM consulta WHERE id_consulta = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar consulta' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: 'Consulta no encontrada' });
        } else {
            res.send({ message: 'Consulta eliminada exitosamente' });
        }
    });
});

module.exports = router;