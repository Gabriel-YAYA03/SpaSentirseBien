const express = require('express'); // Importar Express
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Importar configuración de la base de datos
const clienteRoutes = require('./routes/clienteRoutes');
const turnoRoutes = require('./routes/turnoRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const disponibilidad_horariaRoutes = require('./routes/disponibilidad_horariaRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const turnoClienteRoutes = require('./routes/turno_clienteRoutes'); // Ruta al archivo creado
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// Inicializar la aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

// Middleware para rutas de las entidades
app.use('/api', clienteRoutes);
app.use('/api', turnoRoutes);
app.use('/api', consultaRoutes);
app.use('/api', empleadoRoutes);
app.use('/api', disponibilidad_horariaRoutes);
app.use('/api', servicioRoutes);
app.use('/api', turnoClienteRoutes); // Conecta las rutas de turno_cliente

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});