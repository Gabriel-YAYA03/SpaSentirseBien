import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        nombre: '',
        apellido: '',
        especialidad: '',
        telefono: '',
        email: '',
    });
    const [empleadoEditando, setEmpleadoEditando] = useState(null); // Guardará el empleado que está siendo editado

    // Obtener lista de empleados al cargar el componente
    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const obtenerEmpleados = () => {
        api.get('/empleados')
            .then((response) => {
                setEmpleados(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener empleados:', error);
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (empleadoEditando) {
            setEmpleadoEditando({ ...empleadoEditando, [name]: value });
        } else {
            setNuevoEmpleado({ ...nuevoEmpleado, [name]: value });
        }
    };

    // Agregar un nuevo empleado
    const agregarEmpleado = () => {
        api.post('/empleados', nuevoEmpleado)
            .then(() => {
                alert('Empleado agregado exitosamente');
                setNuevoEmpleado({
                    nombre: '',
                    apellido: '',
                    especialidad: '',
                    telefono: '',
                    email: '',
                });
                obtenerEmpleados(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al agregar empleado:', error);
            });
    };

    // Eliminar empleado
    const eliminarEmpleado = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Al eliminar este empleado también se eliminarán los registros asociados en turnos y disponibilidad horaria. Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/empleados/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'El empleado y los registros asociados han sido eliminados exitosamente.', 'success');
                        obtenerEmpleados(); // Refrescar lista
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el empleado.', 'error');
                        console.error('Error al eliminar empleado:', error.response || error.message);
                    });
            }
        });
    };
    

    // Iniciar edición de un empleado
    const editarEmpleado = (empleado) => {
        setEmpleadoEditando(empleado);
    };

    // Guardar cambios de edición
    const guardarEdicion = () => {
        // Crear un nuevo objeto sin propiedades no requeridas
        const empleadoActualizado = {
            nombre: empleadoEditando.nombre,
            apellido: empleadoEditando.apellido,
            especialidad: empleadoEditando.especialidad,
            telefono: empleadoEditando.telefono,
            email: empleadoEditando.email,
        };

        api.put(`/empleados/${empleadoEditando.id_empleado}`, empleadoActualizado)
            .then(() => {
                alert('Empleado actualizado exitosamente');
                setEmpleadoEditando(null);
                obtenerEmpleados(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al actualizar empleado:', error.response || error.message);
            });
    };

    return (
        <div>
            <h1>Gestión de Empleados</h1>
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.id_empleado}>
                        {empleado.nombre} {empleado.apellido} - {empleado.especialidad} - {empleado.telefono} - {empleado.email}
                        <button onClick={() => editarEmpleado(empleado)}>Editar</button>
                        <button onClick={() => eliminarEmpleado(empleado.id_empleado)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{empleadoEditando ? 'Editar Empleado' : 'Agregar Empleado'}</h2>
            <form>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={empleadoEditando ? empleadoEditando.nombre : nuevoEmpleado.nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={empleadoEditando ? empleadoEditando.apellido : nuevoEmpleado.apellido}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="especialidad"
                    placeholder="Especialidad"
                    value={empleadoEditando ? empleadoEditando.especialidad : nuevoEmpleado.especialidad}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={empleadoEditando ? empleadoEditando.telefono : nuevoEmpleado.telefono}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={empleadoEditando ? empleadoEditando.email : nuevoEmpleado.email}
                    onChange={handleChange}
                />
                {empleadoEditando ? (
                    <button type="button" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button type="button" onClick={agregarEmpleado}>Agregar Empleado</button>
                )}
            </form>
        </div>
    );
};

export default Empleados;