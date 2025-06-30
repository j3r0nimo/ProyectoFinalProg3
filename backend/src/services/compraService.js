import { Compra, Ticket } from '../models/index.js';
import { LIMITE_POR_SECTOR, SECTORES_CON_PRECIOS } from '../constants/ticketConfig.js';
import sequelize from '../config/db.js';

export async function realizarCompra({ clienteId, cantidad, sector }) {
  // El middleware ya garantizó que todos los datos son válidos

  const precioUnitario = SECTORES_CON_PRECIOS[sector];

  const result = await sequelize.transaction(async (t) => {
    const vendidos = await Ticket.count({ where: { sector }, transaction: t });

    if (vendidos + cantidad > LIMITE_POR_SECTOR) {
      const disponibles = LIMITE_POR_SECTOR - vendidos;
      throw new Error(`No hay suficientes entradas. Disponibles: ${disponibles}`);
    }

    const total = cantidad * precioUnitario;

    const compra = await Compra.create({ clienteId, cantidad, total }, { transaction: t });

    const tickets = Array.from({ length: cantidad }, () => ({
      clienteId,
      compraId: compra.id,
      precio: precioUnitario,
      sector
    }));

    await Ticket.bulkCreate(tickets, { transaction: t });

    return {
      compra,
      tickets,
      total,
      precioUnitario,
      sector
    };
  });

  return result;
}
