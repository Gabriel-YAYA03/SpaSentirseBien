const Joi = require('joi');

// Esquema de validación para empleado
const empleadoSchema = Joi.object({
    nombre: Joi.string().max(50).required(),
    apellido: Joi.string().max(50).required(),
    especialidad: Joi.string().max(100).optional(),
    telefono: Joi.string().pattern(/^[0-9]{7,15}$/).optional(),
    email: Joi.string().email().required(),
});

module.exports = { empleadoSchema };