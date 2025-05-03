const express = require('express');
const db = require('../db');
const disponibilidad_horariaValidator = require('../validators/disponibilidad_horariaValidator');
const router = express.Router();

// Obtener disponibilidad horaria (opcionalmente filtrar por día de la semana)
router.get('/disponibilidad_horaria', (req, res) => {
    const { dia_semana } = req.query;

    if (dia_semana && (dia_semana < 1 || dia_semana > 7)) {
        return res.status(400).send({ error: 'El día de la semana debe estar entre 1 y 7' });
    }

    db.query('SELECT * FROM disponibilidad_horaria', (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al obtener disponibilidad horaria' });
        } else {
            res.send(results);
        }
    });
});

// Crear disponibilidad horaria
router.post('/disponibilidad_horaria', (req, res) => {
    const { error } = disponibilidad_horariaValidator.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { id_empleado, dia_semana, hora_inicio, hora_fin } = req.body;
    db.query(
        `INSERT INTO disponibilidad_horaria (id_empleado, dia_semana, hora_inicio, hora_fin)
        VALUES (?, ?, ?, ?)`,
        [id_empleado, dia_semana, hora_inicio, hora_fin],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al agregar disponibilidad horaria' });
            } else {
                res.send({ message: 'Disponibilidad horaria agregada exitosamente' });
            }
        }
    );
});

// Actualizar disponibilidad horaria
router.put('/disponibilidad_horaria/:id', (req, res) => {
    const { error } = disponibilidad_horariaValidator.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const id = req.params.id;
    const { id_empleado, dia_semana, hora_inicio, hora_fin } = req.body;
    db.query(
        `UPDATE disponibilidad_horaria SET id_empleado = ?, dia_semana = ?, hora_inicio = ?, hora_fin = ? WHERE id_disponibilidad = ?`,
        [id_empleado, dia_semana, hora_inicio, hora_fin, id],
        (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al actualizar disponibilidad horaria' });
            } else if (results.affectedRows === 0) {
                res.status(404).send({ error: 'Disponibilidad horaria no encontrada' });
            } else {
                res.send({ message: 'Disponibilidad horaria actualizada exitosamente' });
            }
        }
    );
});

// Eliminar disponibilidad horaria
router.delete('/disponibilidad_horaria/:id', (req, res) => {
    const id = req.params.id;

    // Validar que el ID proporcionado sea válido
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).send({ error: 'El ID proporcionado no es válido' });
    }

    db.query('DELETE FROM disponibilidad_horaria WHERE id_disponibilidad = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar disponibilidad horaria' });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ error: 'Disponibilidad horaria no encontrada' });
        } else {
            res.send({ message: 'Disponibilidad horaria eliminada exitosamente' });
        }
    });
});

module.exports = router;