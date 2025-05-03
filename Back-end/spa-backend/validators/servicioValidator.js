const Joi = require('joi');

// Esquema de validación para servicio
const servicioSchema = Joi.object({
    nombre: Joi.string().max(100).required(),
    descripcion: Joi.string().max(1000).optional(), // Descripción opcional
    tipo: Joi.string().valid('individual', 'grupal').required(),
    duracion: Joi.number().integer().min(1).required(), // Duración mínima de 1 minuto
    precio: Joi.number().precision(2).min(0).required(), // Precio mínimo 0, con 2 decimales
});

module.exports = { servicioSchema };