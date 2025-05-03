import axios from 'axios';

// Configurar Axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // URL base de tu backend
});

// Interceptor para incluir el token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtén el token de localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Manejo de errores en el request
});

// Interceptor para manejar errores en la respuesta
api.interceptors.response.use(
    response => response, // Si la respuesta es exitosa, se devuelve tal cual
    error => {
        console.error('Error en la solicitud:', error.response || error.message); // Mensaje de error
        alert('Ocurrió un error con la solicitud al servidor'); // Notificación al usuario
        return Promise.reject(error); // Rechaza la solicitud para manejarla en cada componente si es necesario
    }
);

export default api;