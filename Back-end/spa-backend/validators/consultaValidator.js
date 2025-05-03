const Joi = require('joi');

// Esquema de validación para consulta
const consultaSchema = Joi.object({
    nombre: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    mensaje: Joi.string().max(1000).required(), // Mensaje obligatorio, máximo 1000 caracteres
    estado: Joi.string().valid('pendiente', 'respondida').default('pendiente'),
});

module.exports = { consultaSchema };