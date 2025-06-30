import Cliente from '../models/cliente.js';


// SERVICIO: LISTA DE TODOS LOS CLIENTES
export async function getAllClientes() {
  return await Cliente.findAll({ order: [['nombre', 'ASC']] });
}

// SERVICIO: RESPONDER CON UN UNICO CLIENTE
export async function getClienteById(id) {
  return await Cliente.findByPk(id);
}

// SERVICIO: RESPONDER A UNA BUSQUEDA POR DNI
export async function getClienteByDNI(dni) {
  return await Cliente.findOne({ where: { dni } });
}

// SERVICIO: CREAR UN NUEVO CLIENTE
export async function createCliente(data) {
  const { nombre, dni, tarjetaNro, tarjetaMA, codigoPostal } = data;

  const existing = await Cliente.findOne({ where: { dni } });
  if (existing) throw new Error('El DNI ya está registrado');

  return await Cliente.create({ nombre, dni, tarjetaNro, tarjetaMA, codigoPostal });
}

// SERVICIO: ACTUALIZAR UN CLIENTE
export async function updateCliente(id, data) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return null;

  if (data.dni && data.dni !== cliente.dni) {
    const dniExists = await Cliente.findOne({ where: { dni: data.dni } });
    if (dniExists) throw new Error('El DNI ya está registrado por otro cliente');
  }

  return await cliente.update(data);
}

// SERVICIO: BORRAR UN CLIENTE EXISTENTE
export async function deleteCliente(id) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return null;

  await cliente.destroy();
  return true;
}