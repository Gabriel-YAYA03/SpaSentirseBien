const express = require('express');
const db = require('../db'); // Conexión a la base de datos
const router = express.Router();

// Crear un nuevo turno en turno_cliente
router.post('/turno_cliente', (req, res) => {
    console.log('Datos recibidos del frontend:', req.body); // Verifica los datos aquí
  const { fecha, hora, tipo_servicio, email, telefono } = req.body;

  // Validar campos obligatorios
  if (!fecha || !hora || !tipo_servicio || !email) {
    return res.status(400).send({ error: 'Por favor complete todos los campos obligatorios.' });
  }

  // Insertar el nuevo turno en la tabla turno_cliente
  db.query(
    'INSERT INTO turno_cliente (fecha, hora, tipo_servicio, email, telefono) VALUES (?, ?, ?, ?, ?)',
    [fecha, hora, tipo_servicio, email, telefono || null],
    (err, results) => {
      if (err) {
        console.error('Error al registrar el turno:', err);
        res.status(500).send({ error: 'Hubo un problema al registrar el turno. Intente nuevamente.' });
      } else {
        res.status(201).send({ message: 'Turno registrado exitosamente', id: results.insertId });
      }
    }
  );
});

// Obtener todos los turnos de turno_cliente
router.get('/turno_cliente', (req, res) => {
  db.query('SELECT * FROM turno_cliente', (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los turnos' });
    } else {
      res.send(results);
    }
  });
});

// Actualizar un turno en turno_cliente
router.put('/turno_cliente/:id', (req, res) => {
  const id = req.params.id;
  const { fecha, hora, tipo_servicio, email, telefono } = req.body;

  // Validar campos obligatorios
  if (!fecha || !hora || !tipo_servicio || !email) {
    return res.status(400).send({ error: 'Por favor complete todos los campos obligatorios.' });
  }

  db.query(
    'UPDATE turno_cliente SET fecha = ?, hora = ?, tipo_servicio = ?, email = ?, telefono = ? WHERE id_turno_cliente = ?',
    [fecha, hora, tipo_servicio, email, telefono || null, id],
    (err, results) => {
      if (err) {
        res.status(500).send({ error: 'Error al actualizar el turno' });
      } else if (results.affectedRows === 0) {
        res.status(404).send({ error: 'Turno no encontrado' });
      } else {
        res.send({ message: 'Turno actualizado exitosamente' });
      }
    }
  );
});

// Eliminar un turno en turno_cliente
router.delete('/turno_cliente/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM turno_cliente WHERE id_turno_cliente = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Error al eliminar el turno' });
    } else if (results.affectedRows === 0) {
      res.status(404).send({ error: 'Turno no encontrado' });
    } else {
      res.send({ message: 'Turno eliminado exitosamente' });
    }
  });
});

module.exports = router;