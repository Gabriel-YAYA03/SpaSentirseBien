const Joi = require('joi');

// Esquema de validación para turno
const turnoSchema = Joi.object({
    fecha: Joi.date().iso().required(), // Fecha en formato ISO, obligatorio
    hora: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // Hora en formato HH:mm
    estado: Joi.string().valid('pendiente', 'confirmado', 'cancelado').default('pendiente'),
    id_cliente: Joi.number().integer().required(), // ID del cliente, obligatorio
    id_servicio: Joi.number().integer().required(),
    id_empleado: Joi.number().integer().required(),
    comentarios: Joi.string().max(500).optional(), // Comentarios opcionales, máximo 500 caracteres
});

module.exports = { turnoSchema };