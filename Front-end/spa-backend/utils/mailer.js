const nodemailer = require('nodemailer');

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña o app password
    },
});

// Función para enviar el código de invitación
const sendInvitationCode = async (email, codigo) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de Invitación para Registro de Administrador',
        text: `Tu código de invitación es: ${codigo}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info); // Registro de éxito
    } catch (error) {
        console.error('Error al enviar el correo:', error); // Registro de error
        throw error; // Re-lanza el error para que el route handler lo capture
    }
};

module.exports = { sendInvitationCode };