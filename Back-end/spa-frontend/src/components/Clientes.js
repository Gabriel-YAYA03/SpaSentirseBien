import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
    });
    const [clienteEditando, setClienteEditando] = useState(null); // Guardará el cliente que está siendo editado

    // Obtener lista de clientes al cargar el componente
    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = () => {
        api.get('/clientes')
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener clientes:', error);
            });
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (clienteEditando) {
            setClienteEditando({ ...clienteEditando, [name]: value });
        } else {
            setNuevoCliente({ ...nuevoCliente, [name]: value });
        }
    };

    // Agregar un nuevo cliente
    const agregarCliente = () => {
        api.post('/clientes', nuevoCliente)
            .then(() => {
                alert('Cliente agregado exitosamente');
                setNuevoCliente({ nombre: '', apellido: '', telefono: '', email: '' });
                obtenerClientes(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al agregar cliente:', error);
            });
    };

    // Eliminar cliente
    const eliminarCliente = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Al eliminar este cliente también se eliminarán todos los turnos asociados. Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/clientes/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'El cliente y los registros asociados han sido eliminados exitosamente.', 'success');
                        obtenerClientes();
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Hubo un problema al eliminar el cliente.', 'error');
                        console.error('Error al eliminar cliente:', error);
                    });
            }
        });
    };    

    // Iniciar edición de un cliente
    const editarCliente = (cliente) => {
        setClienteEditando(cliente);
    };

    // Guardar cambios de edición
    const guardarEdicion = () => {
        // Crear un nuevo objeto sin propiedades no requeridas
        const clienteActualizado = {
            nombre: clienteEditando.nombre,
            apellido: clienteEditando.apellido,
            telefono: clienteEditando.telefono,
            email: clienteEditando.email,
        };
    
        api.put(`/clientes/${clienteEditando.id_cliente}`, clienteActualizado)
            .then(() => {
                alert('Cliente actualizado exitosamente');
                setClienteEditando(null);
                obtenerClientes(); // Refrescar lista
            })
            .catch((error) => {
                console.error('Error al actualizar cliente:', error.response || error.message);
            });
    };

    return (
        <div>
            <h1>Gestión de Clientes</h1>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id_cliente}>
                        {cliente.nombre} {cliente.apellido} - {cliente.telefono} - {cliente.email}
                        <button onClick={() => editarCliente(cliente)}>Editar</button>
                        <button onClick={() => eliminarCliente(cliente.id_cliente)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{clienteEditando ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <form>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={clienteEditando ? clienteEditando.nombre : nuevoCliente.nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={clienteEditando ? clienteEditando.apellido : nuevoCliente.apellido}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={clienteEditando ? clienteEditando.telefono : nuevoCliente.telefono}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={clienteEditando ? clienteEditando.email : nuevoCliente.email}
                    onChange={handleChange}
                />
                {clienteEditando ? (
                    <button type="button" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button type="button" onClick={agregarCliente}>Agregar Cliente</button>
                )}
            </form>
        </div>
    );
};

export default Clientes;