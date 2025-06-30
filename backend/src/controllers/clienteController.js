import * as clienteService from '../services/clienteService.js';

// LISTA DE TODOS LOS CLIENTES
export const getClientes = async (req, res) => {
  try {
    const clientes = await clienteService.getAllClientes();
    // Es un json por cada instancia de clientes
    res.json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// RESPONDER CON UN UNICO CLIENTE
export const getClienteById = async (req, res) => {
  try {
    const cliente = await clienteService.getClienteById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json(cliente);
  } catch {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// RESPONDER A UNA BUSQUEDA POR DNI
export const getClienteByDNI = async (req, res) => {
  try {
    const cliente = await clienteService.getClienteByDNI(req.params.dni);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado con ese DNI' });

    res.json(cliente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor al buscar cliente' });
  }
};

// CREAR UN NUEVO CLIENTE
export const postCliente = async (req, res) => {
  try {
    const nuevoCliente = await clienteService.createCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


// ACTUALIZAR UN CLIENTE
export const putCliente = async (req, res) => {
  try {
    const cliente = await clienteService.updateCliente(req.params.id, req.body);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json(cliente);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// BORRAR UN CLIENTE EXISTENTE
export const deleteCliente = async (req, res) => {
  try {
    const eliminado = await clienteService.deleteCliente(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
