// src/models/index.js

import Cliente from './cliente.js';
import Compra from './compra.js';
import Ticket from './ticket.js';

// Cliente has many Compras
Cliente.hasMany(Compra, { foreignKey: 'clienteId' });
Compra.belongsTo(Cliente, { foreignKey: 'clienteId' });

// Compra has many Tickets
Compra.hasMany(Ticket, { foreignKey: 'compraId' });
Ticket.belongsTo(Compra, { foreignKey: 'compraId' });


// Cliente has many Tickets (optional, for reporting)
// Implica duplicar guardado de clienteId : compras y tickets
// facilita preguntar cuantos tickets tiene el cliente
Cliente.hasMany(Ticket, { foreignKey: 'clienteId' });
Ticket.belongsTo(Cliente, { foreignKey: 'clienteId' });

// Export all models for use elsewhere
// en el destino: 
// import { Cliente, Compra, Ticket } from '../models/index.js';
export { Cliente, Compra, Ticket };
