const jwt = require('jsonwebtoken'); // Importar JWT
const SECRET_KEY = process.env.SECRET_KEY || 'tu_clave_secreta'; // Utiliza la clave secreta desde variables de entorno

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token

    if (!token) {
        return res.status(401).send({ error: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Validar el token
        req.user = decoded; // Añadir la información del usuario a la solicitud
        next();
    } catch (error) {
        res.status(401).send({ error: 'Token inválido o expirado' });
    }
};

module.exports = authenticate;