import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [nuevoServicio, setNuevoServicio] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        duracion: '',
        precio: '',
    });
    const [servicioEditando, setServicioEditando] = useState(null); // Guardará el servicio que está siendo editado

    // Obtener lista de servicios al cargar el componente
    useEffect(() => {
        obtenerServicios();
    }, []);

    const obtenerServicios = () => {
        api.get('/servicios')
            .then((response) => {
                setServicios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener servicios:', error);
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (servicioEditando) {
            setServicioEditando({ ...servicioEditando, [name]: value });
        } else {
            setNuevoServicio({ ...nuevoServicio, [name]: value });
        }
    };

    // Agregar un nuevo servicio
    const agregarServicio = () => {
        api.post('/servicios', nuevoServicio)
            .then(() => {
                alert('Servicio agregado exitosamente');
                setNuevoServicio({
                    nombre: '',
                    descripcion: '',
                    tipo: '',
                    duracion: '',
                    precio: '',
                });
                obtenerServicios(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al agregar servicio:', error);
            });
    };

    // Eliminar un servicio
    const eliminarServicio = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Al eliminar este servicio también se eliminarán todos los turnos asociados. Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/servicios/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'El servicio y los registros asociados han sido eliminados exitosamente.', 'success');
                        obtenerServicios(); // Refrescar lista
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el servicio.', 'error');
                        console.error('Error al eliminar servicio:', error);
                    });
            }
        });
    };

    // Iniciar edición de un servicio
    const editarServicio = (servicio) => {
        setServicioEditando(servicio);
    };

    // Guardar cambios de edición
    const guardarEdicion = () => {
        // Crear un nuevo objeto sin propiedades no requeridas
        const servicioActualizado = {
            nombre: servicioEditando.nombre,
            descripcion: servicioEditando.descripcion,
            tipo: servicioEditando.tipo,
            duracion: servicioEditando.duracion,
            precio: servicioEditando.precio,
        };

        api.put(`/servicios/${servicioEditando.id_servicio}`, servicioActualizado)
            .then(() => {
                alert('Servicio actualizado exitosamente');
                setServicioEditando(null);
                obtenerServicios(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al actualizar servicio:', error.response || error.message);
            });
    };

    return (
        <div>
            <h1>Gestión de Servicios</h1>
            <ul>
                {servicios.map((servicio) => (
                    <li key={servicio.id_servicio}>
                        Nombre: {servicio.nombre} - Descripción: {servicio.descripcion} - Tipo: {servicio.tipo} - Duración: {servicio.duracion} minutos - Precio: ${servicio.precio}
                        <button onClick={() => editarServicio(servicio)}>Editar</button>
                        <button onClick={() => eliminarServicio(servicio.id_servicio)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{servicioEditando ? 'Editar Servicio' : 'Agregar Servicio'}</h2>
            <form>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={servicioEditando ? servicioEditando.nombre : nuevoServicio.nombre}
                    onChange={handleChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={servicioEditando ? servicioEditando.descripcion : nuevoServicio.descripcion}
                    onChange={handleChange}
                ></textarea>
                <select
                    name="tipo"
                    value={servicioEditando ? servicioEditando.tipo : nuevoServicio.tipo}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar tipo</option>
                    <option value="individual">Individual</option>
                    <option value="grupal">Grupal</option>
                </select>
                <input
                    type="number"
                    name="duracion"
                    placeholder="Duración (minutos)"
                    value={servicioEditando ? servicioEditando.duracion : nuevoServicio.duracion}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio ($)"
                    value={servicioEditando ? servicioEditando.precio : nuevoServicio.precio}
                    onChange={handleChange}
                />
                {servicioEditando ? (
                    <button type="button" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button type="button" onClick={agregarServicio}>Agregar Servicio</button>
                )}
            </form>
        </div>
    );
};

export default Servicios;