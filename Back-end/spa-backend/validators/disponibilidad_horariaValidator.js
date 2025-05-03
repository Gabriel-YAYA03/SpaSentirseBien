const Joi = require('joi');

// Esquema de validación para disponibilidad horaria
const disponibilidad_horariaValidator = Joi.object({
    id_empleado: Joi.number().integer().required(), // ID del empleado obligatorio
    dia_semana: Joi.number().integer().min(1).max(7).required(), // Día de la semana (1-7)
    hora_inicio: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // Hora en formato HH:mm
    hora_fin: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // Hora en formato HH:mm
});

module.exports = disponibilidad_horariaValidator;