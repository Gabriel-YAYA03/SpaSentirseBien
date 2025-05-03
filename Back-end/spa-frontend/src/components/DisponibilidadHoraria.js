import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const DisponibilidadHoraria = () => {
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState({
        id_empleado: '',
        dia: '',
        hora_inicio: '',
        hora_fin: '',
    });
    const [disponibilidadEditando, setDisponibilidadEditando] = useState(null); // Guardará la disponibilidad que está siendo editada

    // Obtener lista de disponibilidades al cargar el componente
    useEffect(() => {
        obtenerDisponibilidades();
    }, []);

    const obtenerDisponibilidades = () => {
        api.get('/disponibilidad_horaria')
            .then((response) => {
                setDisponibilidades(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener disponibilidades horarias:', error);
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (disponibilidadEditando) {
            setDisponibilidadEditando({ ...disponibilidadEditando, [name]: value });
        } else {
            setNuevaDisponibilidad({ ...nuevaDisponibilidad, [name]: value });
        }
    };

    // Agregar una nueva disponibilidad horaria
    const agregarDisponibilidad = () => {
        api.post('/disponibilidad_horaria', nuevaDisponibilidad)
            .then(() => {
                Swal.fire('Agregado', 'Disponibilidad horaria agregada exitosamente.', 'success');
                setNuevaDisponibilidad({
                    id_empleado: '',
                    dia: '',
                    hora_inicio: '',
                    hora_fin: '',
                });
                obtenerDisponibilidades(); // Refrescar lista
            })
            .catch((error) => {
                Swal.fire('Error', 'Hubo un problema al agregar la disponibilidad horaria.', 'error');
                console.error('Error al agregar disponibilidad horaria:', error);
            });
    };

    // Eliminar una disponibilidad horaria
    const eliminarDisponibilidad = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: '¿Desea eliminar este registro? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/disponibilidad_horaria/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'El registro ha sido eliminada exitosamente.', 'success');
                        obtenerDisponibilidades(); // Refrescar lista
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
                        console.error('Error al eliminar el registro:', error);
                    });
            }
        });
    };

    // Iniciar edición de una disponibilidad horaria
    const editarDisponibilidad = (disponibilidad) => {
        setDisponibilidadEditando(disponibilidad);
    };

    // Guardar cambios de edición
    const guardarEdicion = () => {
        // Crear un nuevo objeto sin propiedades innecesarias
        const disponibilidadActualizada = {
            id_empleado: disponibilidadEditando.id_empleado,
            dia: disponibilidadEditando.dia,
            hora_inicio: disponibilidadEditando.hora_inicio,
            hora_fin: disponibilidadEditando.hora_fin,
        };

        api.put(`/disponibilidad_horaria/${disponibilidadEditando.id_disponibilidad}`, disponibilidadActualizada)
            .then(() => {
                Swal.fire('Actualizado', 'Disponibilidad horaria actualizada exitosamente.', 'success');
                setDisponibilidadEditando(null);
                obtenerDisponibilidades(); // Refrescar lista
            })
            .catch((error) => {
                Swal.fire('Error', 'Hubo un problema al actualizar la disponibilidad horaria.', 'error');
                console.error('Error al actualizar disponibilidad horaria:', error.response || error.message);
            });
    };

    return (
        <div>
            <h1>Gestión de Disponibilidad Horaria</h1>
            <ul>
                {disponibilidades.map((disponibilidad) => (
                    <li key={disponibilidad.id_disponibilidad}>
                        Empleado: {disponibilidad.id_empleado} - Día: {disponibilidad.dia} - Inicio: {disponibilidad.hora_inicio} - Fin: {disponibilidad.hora_fin}
                        <button onClick={() => editarDisponibilidad(disponibilidad)}>Editar</button>
                        <button onClick={() => eliminarDisponibilidad(disponibilidad.id_disponibilidad)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{disponibilidadEditando ? 'Editar Disponibilidad' : 'Agregar Disponibilidad'}</h2>
            <form>
                <input
                    type="text"
                    name="id_empleado"
                    placeholder="ID Empleado"
                    value={disponibilidadEditando ? disponibilidadEditando.id_empleado : nuevaDisponibilidad.id_empleado}
                    onChange={handleChange}
                />
                <select
                    name="dia"
                    value={disponibilidadEditando ? disponibilidadEditando.dia : nuevaDisponibilidad.dia}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                </select>
                <input
                    type="time"
                    name="hora_inicio"
                    placeholder="Hora Inicio"
                    value={disponibilidadEditando ? disponibilidadEditando.hora_inicio : nuevaDisponibilidad.hora_inicio}
                    onChange={handleChange}
                />
                <input
                    type="time"
                    name="hora_fin"
                    placeholder="Hora Fin"
                    value={disponibilidadEditando ? disponibilidadEditando.hora_fin : nuevaDisponibilidad.hora_fin}
                    onChange={handleChange}
                />
                {disponibilidadEditando ? (
                    <button type="button" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button type="button" onClick={agregarDisponibilidad}>Agregar Disponibilidad</button>
                )}
            </form>
        </div>
    );
};

export default DisponibilidadHoraria;