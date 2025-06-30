import express from 'express';
import { getClientes, getClienteById, getClienteByDNI, postCliente, putCliente, deleteCliente } from '../controllers/clienteController.js';
import { getTicketsPorCliente } from '../controllers/ticketController.js';
import { validateClienteInput } from '../middleware/validateClienteInput.js';
import { validateClienteUpdate } from '../middleware/validateClienteUpdate.js';
import { validateIdParam } from '../middleware/validateIdParam.js';
import { validateDniParam } from '../middleware/validateDniParam.js';
                                            
const router = express.Router();

// Routing order (important!): Primero por id
// Perfecto que /:id viene antes de / 
// esto evita que el get('/') capture rutas como /123.

// Buscar cliente por DNI (antes de '/:id' para evitar conflictos)
router.get('/dni/:dni', validateDniParam, getClienteByDNI);

// Buscar tickets por cliente
router.get('/:id/tickets', validateIdParam, getTicketsPorCliente);

// Obtener un único cliente
router.get('/:id', validateIdParam, getClienteById);

// Obtener todos los clientes
router.get('/', getClientes);

// Crear nuevo cliente, con validación por middleware
router.post('/', validateClienteInput, postCliente);

// Actualizar un cliente por ID, con validación por middleware
router.put('/:id', validateIdParam, validateClienteUpdate, putCliente);

// Eliminar un cliente por ID
router.delete('/:id', validateIdParam, deleteCliente);

export default router;




