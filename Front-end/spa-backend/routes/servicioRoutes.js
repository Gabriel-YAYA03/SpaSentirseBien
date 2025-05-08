const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM servicio');
        // Asegurarse de que los datos estén en el formato correcto
        const servicios = rows.map(servicio => ({
            ...servicio,
            precio: parseFloat(servicio.precio) || 0.00, // Convertir precio a número o asignar 0.00 si es nulo
        }));
        res.json(servicios);
    } catch (err) {
        console.error('Error al obtener los servicios:', err);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
});

// Crear un nuevo servicio
router.post('/', async (req, res) => {
    console.log('Datos recibidos en POST /api/servicios:', req.body);
    const { nombre, descripcion, duracion, precio, categoria } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO servicio (nombre, descripcion, duracion, precio, categoria) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, duracion, parseFloat(precio), categoria]
        );
        res.json({ message: 'Servicio creado exitosamente', id: result.insertId });
    } catch (err) {
        console.error('Error al crear el servicio:', err);
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
});

// Actualizar un servicio
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido en PUT /api/servicios:', id); // Log para depuración
    const { nombre, descripcion, duracion, precio, categoria } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE servicio SET nombre = ?, descripcion = ?, duracion = ?, precio = ?, categoria = ? WHERE id_servicio = ?',
            [nombre, descripcion, duracion, parseFloat(precio), categoria, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'El servicio no existe.' });
        }
        res.json({ message: 'Servicio actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el servicio:', err);
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
});

// Eliminar un servicio
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM servicio WHERE id_servicio = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'El servicio no existe.' });
        }

        await db.query('DELETE FROM servicio WHERE id_servicio = ?', [id]);
        res.json({ message: 'Servicio eliminado exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar el servicio:', err);
        res.status(500).json({ error: 'Error al eliminar el servicio.' });
    }
});

module.exports = router;