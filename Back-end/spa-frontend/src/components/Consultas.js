import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const Consultas = () => {
    const [consultas, setConsultas] = useState([]);
    const [nuevaConsulta, setNuevaConsulta] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        estado: '',
    });
    const [consultaEditando, setConsultaEditando] = useState(null); // Guardará la consulta que está siendo editada

    // Obtener lista de consultas al cargar el componente
    useEffect(() => {
        obtenerConsultas();
    }, []);

    const obtenerConsultas = () => {
        api.get('/consultas')
            .then((response) => {
                setConsultas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener consultas:', error);
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (consultaEditando) {
            setConsultaEditando({ ...consultaEditando, [name]: value });
        } else {
            setNuevaConsulta({ ...nuevaConsulta, [name]: value });
        }
    };

    // Agregar una nueva consulta
    const agregarConsulta = () => {
        api.post('/consultas', nuevaConsulta)
            .then(() => {
                Swal.fire('Agregado', 'Consulta agregada exitosamente.', 'success');
                setNuevaConsulta({
                    titulo: '',
                    descripcion: '',
                    fecha: '',
                    estado: '',
                });
                obtenerConsultas(); // Refrescar lista
            })
            .catch((error) => {
                Swal.fire('Error', 'Hubo un problema al agregar la consulta.', 'error');
                console.error('Error al agregar consulta:', error);
            });
    };

    // Eliminar una consulta
    const eliminarConsulta = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: '¿Desea eliminar esta consulta? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/consultas/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'La consulta ha sido eliminada exitosamente.', 'success');
                        obtenerConsultas(); // Refrescar lista
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar la consulta.', 'error');
                        console.error('Error al eliminar consulta:', error);
                    });
            }
        });
    };

    // Iniciar edición de una consulta
    const editarConsulta = (consulta) => {
        setConsultaEditando(consulta);
    };

    // Guardar cambios de edición
    const guardarEdicion = () => {
        // Crear un nuevo objeto sin propiedades innecesarias
        const consultaActualizada = {
            titulo: consultaEditando.titulo,
            descripcion: consultaEditando.descripcion,
            fecha: consultaEditando.fecha,
            estado: consultaEditando.estado,
        };

        api.put(`/consultas/${consultaEditando.id_consulta}`, consultaActualizada)
            .then(() => {
                Swal.fire('Actualizado', 'Consulta actualizada exitosamente.', 'success');
                setConsultaEditando(null);
                obtenerConsultas(); // Refrescar lista
            })
            .catch((error) => {
                Swal.fire('Error', 'Hubo un problema al actualizar la consulta.', 'error');
                console.error('Error al actualizar consulta:', error.response || error.message);
            });
    };

    return (
        <div>
            <h1>Gestión de Consultas</h1>
            <ul>
                {consultas.map((consulta) => (
                    <li key={consulta.id_consulta}>
                        Título: {consulta.titulo} - Descripción: {consulta.descripcion} - Fecha: {consulta.fecha} - Estado: {consulta.estado}
                        <button onClick={() => editarConsulta(consulta)}>Editar</button>
                        <button onClick={() => eliminarConsulta(consulta.id_consulta)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{consultaEditando ? 'Editar Consulta' : 'Agregar Consulta'}</h2>
            <form>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={consultaEditando ? consultaEditando.titulo : nuevaConsulta.titulo}
                    onChange={handleChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={consultaEditando ? consultaEditando.descripcion : nuevaConsulta.descripcion}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="date"
                    name="fecha"
                    value={consultaEditando ? consultaEditando.fecha : nuevaConsulta.fecha}
                    onChange={handleChange}
                />
                <select
                    name="estado"
                    value={consultaEditando ? consultaEditando.estado : nuevaConsulta.estado}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="resuelta">Resuelta</option>
                    <option value="cancelada">Cancelada</option>
                </select>
                {consultaEditando ? (
                    <button type="button" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button type="button" onClick={agregarConsulta}>Agregar Consulta</button>
                )}
            </form>
        </div>
    );
};

export default Consultas;