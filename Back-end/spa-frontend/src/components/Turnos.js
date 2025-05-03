import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

// Función para convertir fechas al formato "yyyy-MM-dd"
const formatoFecha = (isoDate) => {
    return isoDate.split('T')[0]; // Extrae solo la parte de la fecha (antes de "T")
};


const Turnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [nuevoTurno, setNuevoTurno] = useState({
        fecha: '',
        hora: '',
        id_empleado: '',
        id_cliente: '',
        id_servicio: '',
    });
    const [turnoEditando, setTurnoEditando] = useState(null); // Guardará el turno que está siendo editado

    // Obtener lista de turnos al cargar el componente
    useEffect(() => {
        obtenerTurnos();
    }, []);

    const obtenerTurnos = () => {
        api.get('/turnos')
            .then((response) => {
                setTurnos(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener turnos:', error);
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (turnoEditando) {
            setTurnoEditando({ ...turnoEditando, [name]: value });
        } else {
            setNuevoTurno({ ...nuevoTurno, [name]: value });
        }
    };

    // Agregar un nuevo turno
    const agregarTurno = () => {
        api.post('/turnos', nuevoTurno)
            .then(() => {
                alert('Turno agregado exitosamente');
                setNuevoTurno({ fecha: '', hora: '', id_empleado: '', id_cliente: '' });
                obtenerTurnos(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al agregar turno:', error);
            });
    };

    // Eliminar turno
    const eliminarTurno = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: '¿Desea eliminar este turno? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/turnos/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'El turno ha sido eliminado exitosamente.', 'success');
                        obtenerTurnos(); // Refrescar lista de turnos
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el turno.', 'error');
                        console.error('Error al eliminar turno:', error);
                    });
            }
        });
    };    

    // Iniciar edición de un turno
    const editarTurno = (turno) => {
        setTurnoEditando({
            fecha: turno.fecha ? formatoFecha(turno.fecha) : '', // Convierte fecha si está definida, si no usa cadena vacía
            hora: turno.hora || '',
            id_empleado: turno.id_empleado || '',
            id_cliente: turno.id_cliente || '',
            id_servicio: turno.id_servicio || '',
        });
    };


    // Guardar cambios de edición
    const guardarEdicion = () => {
        // Crear un nuevo objeto sin propiedades innecesarias
        const turnoActualizado = {
            fecha: turnoEditando.fecha,
            hora: turnoEditando.hora,
            id_empleado: turnoEditando.id_empleado,
            id_cliente: turnoEditando.id_cliente,
            id_servicio: turnoEditando.id_servicio,
        };

        api.put(`/turnos/${turnoEditando.id_turno}`, turnoActualizado)
            .then(() => {
                alert('Turno actualizado exitosamente');
                setTurnoEditando(null);
                obtenerTurnos(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al actualizar turno:', error);
            });
    };

    return (
        <div>
            <h1>Gestión de Turnos</h1>
            <ul>
                {turnos.map((turno) => (
                    <li key={turno.id_turno}>
                        Fecha: {turno.fecha} - Hora: {turno.hora} - Empleado: {turno.id_empleado} - Cliente: {turno.id_cliente} - Servicio: {turno.id_servicio}
                        <button onClick={() => editarTurno(turno)}>Editar</button>
                        <button onClick={() => eliminarTurno(turno.id_turno)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{turnoEditando ? 'Editar Turno' : 'Agregar Turno'}</h2>
            <form>
                <input
                    type="date"
                    name="fecha"
                    value={turnoEditando ? turnoEditando.fecha : nuevoTurno.fecha}
                    onChange={handleChange}
                />
                <input
                    type="time"
                    name="hora"
                    value={turnoEditando ? turnoEditando.hora : nuevoTurno.hora}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="id_empleado"
                    placeholder="ID del empleado"
                    value={turnoEditando ? turnoEditando.id_empleado : nuevoTurno.id_empleado}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="id_cliente"
                    placeholder="ID del cliente"
                    value={turnoEditando ? turnoEditando.id_cliente : nuevoTurno.id_cliente}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="id_servicio"
                    placeholder="ID del servicio"
                    value={turnoEditando ? turnoEditando.id_servicio : nuevoTurno.id_servicio}
                    onChange={handleChange}
                />
                {turnoEditando ? (
                    <button type="button" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button type="button" onClick={agregarTurno}>Agregar Turno</button>
                )}
            </form>
        </div>
    );
};

export default Turnos;