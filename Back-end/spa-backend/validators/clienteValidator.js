const Joi = require('joi');

// Esquema de validación para cliente
const clienteSchema = Joi.object({
    nombre: Joi.string().max(50).required(), // Máximo 50 caracteres, obligatorio
    apellido: Joi.string().max(50).required(),
    telefono: Joi.string().pattern(/^[0-9]{7,15}$/).optional().allow('').allow(null), // Solo números, entre 7 y 15 dígitos
    email: Joi.string().email().required(), // Email válido, obligatorio
    contraseña: Joi.string().required(),
    confirmarContraseña: Joi.string().valid(Joi.ref('contraseña')).required(),
}).with('contraseña', 'confirmarContraseña');

module.exports = { clienteSchema };